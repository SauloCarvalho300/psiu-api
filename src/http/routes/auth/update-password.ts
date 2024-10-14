import { db } from '@database/client'
import { checkPassword } from '@lib/bcrypt'
import { Request, Response } from 'express'

interface Body {
  password: string
  newPassword: string
  confirmNewPassword: string
}

export async function authenticateWithPassword(
  request: Request,
  response: Response,
): Promise<void> {
  const { studentId } = request
  const { password, newPassword, confirmNewPassword } = request.body as Body

  const student = db.findUnique('students', { id: studentId })

  if (!student) {
    response.status(401).json({
      result: 'error',
      message: ' Strudent not found',
    })

    return
  }

  const passwordMatch = await checkPassword(password, student.passwordHash)

  if (!passwordMatch) {
    response.status(401).json({
      result: 'error',
      message: ' Incorrect password ',
    })
  }

  if (newPassword !== confirmNewPassword) {
    response.status(400).json({
      result: 'error',
      message: 'Passwords do not macth',
    })
  }
}
