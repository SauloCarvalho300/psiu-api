import { db } from '@database/client'
import { Request, Response } from 'express'

interface Params {
  id: string
}

interface Body {
  name: string
  birthdate: string
}

export async function updateStudent(
  request: Request<Params>,
  response: Response,
): Promise<void> {
  const { id } = request.params
  const { name, birthdate } = request.body as Body

  db.update('students', id, {
    name,
    birthdate: new Date(birthdate),
    updatedAT: new Date(),
  })

  response.json({
    result: 'sucess',
    message: 'Student updated',
  })
}
