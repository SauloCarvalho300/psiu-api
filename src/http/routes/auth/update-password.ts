import { db } from '@database/client'
import { checkPassword, encrytPassword } from '@lib/bcrypt'
import { Request, Response } from 'express'

interface Body {
  password: string
  newPassword: string
  confirmNewPassword: string
}

export async function updatePassword(
  request: Request,
  response: Response,
): Promise<void> {
  const { studentId } = request
  const { password, newPassword, confirmNewPassword } = request.body as Body

  const student = db.findUnique('students', { id: studentId })

  if (!student) {
    response.status(400).json({
      result: 'error',
      message: 'Student not found',
    })

    return
  }

  const passwordMatch = await checkPassword(password, student.passwordHash)

  if (!passwordMatch) {
    response.status(401).json({
      result: 'error',
      message: 'Incorrect password',
    })

    return
  }

  if (newPassword !== confirmNewPassword) {
    response.status(400).json({
      result: 'error',
      message: 'Passwords do not match',
    })

    return
  }

  if (
    !newPassword.match(
      /(?=^.{8,}$)((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    )
  ) {
    response.status(400).json({
      result: 'error',
      message: 'The new password is weak',
    })

    return
  }

  const passwordEncrypt = await encrytPassword(newPassword)

  db.update('students', studentId, {
    passwordHash: passwordEncrypt,
    updatedAt: new Date(),
  })

  response.json({
    result: 'success',
    message: 'Password updated',
  })
}
