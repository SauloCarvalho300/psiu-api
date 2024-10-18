import { db } from '@database/client'
import { encrytPassword } from '@lib/bcrypt'
// import { generatePassword } from '@utils/generate-password'
import { randomUUID } from 'crypto'
import { Request, Response } from 'express'

interface Body {
  ra: string
  name: string
  birthdate: string
}

export async function createStudent(
  request: Request,
  response: Response,
): Promise<void> {
  const { ra, name, birthdate } = request.body as Body

  const studentByRa = db.findMany('students', { ra })

  if (studentByRa.length) {
    response.status(400).json({
      result: 'error',
      message: `Students register ${ra} already exists`,
    })

    return
  }

  // const password = generatePassword()
  const passwordEncrypt = await encrytPassword('123456')

  const student = {
    id: randomUUID(),
    ra,
    name,
    passwordHash: passwordEncrypt,
    birthdate: new Date(birthdate),
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  db.create('students', student)

  response.status(201).json({
    result: 'success',
    message: 'Student profile created',
  })
}
