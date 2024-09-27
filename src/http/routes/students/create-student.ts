import { randomUUID } from 'crypto'
import { Request, Response } from 'express'

import { Database } from '../../../database'
import { generatePassword } from '../../../utils/generate-random-password'

const database = new Database()

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

  const studentByRa = database.select('students', { ra })

  if (studentByRa.length) {
    response.status(400).json({
      result: 'error',
      message: `Students register ${ra} already exists`,
    })

    return
  }

  const student = {
    id: randomUUID(),
    ra,
    name,
    password: generatePassword(),
    birthdate: new Date(birthdate),
  }

  database.insert('students', student)

  response.status(201).json({
    result: 'sucess',
    message: 'Students profile created',
  })
}
