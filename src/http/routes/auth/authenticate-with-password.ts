import { db } from '@database/client'
import { checkPassword } from '@lib/bcrypt'
import { Request, Response } from 'express'

interface Body {
  ra: string
  password: string
}

export async function authenticateWithPassword(
  request: Request,
  response: Response,
): Promise<void> {
  const { ra, password } = request.body as Body

  const student = db.findUnique('students', { ra })

  if (!student) {
    response.status(401).json({
      result: 'error',
      message: 'RA or password incorrect',
    })

    return
  }

  const passwordMatch = await checkPassword(password, student.passwordHash)

  response.json({
    passwordMatch,
  })
}
