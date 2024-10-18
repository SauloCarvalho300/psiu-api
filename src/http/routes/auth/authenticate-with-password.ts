import { db } from '@database/client'
import { checkPassword } from '@lib/bcrypt'
import { Request, Response } from 'express'
import { sign } from 'jsonwebtoken'

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

  if (!student.active) {
    response.status(401).json({
      result: 'error',
      message: 'RA or password incorrect',
    })

    return
  }

  const passwordMatch = await checkPassword(password, student.passwordHash)

  if (!passwordMatch) {
    response.status(401).json({
      result: 'error',
      message: 'RA or password incorrect',
    })

    return
  }

  const token = sign({ id: student.id }, 'psiu', { expiresIn: '3d' })

  response.json({
    result: 'success',
    data: {
      token,
      student: {
        id: student.id,
        ra: student.ra,
        name: student.name,
        birthdate: student.birthdate,
        createdAt: student.createdAt,
        updatedAt: student.updatedAt,
      },
    },
  })
}
