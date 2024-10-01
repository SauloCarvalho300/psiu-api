import { db } from '@database/client'
import { Request, Response } from 'express'

interface Params {
  id: string
}

export async function inactivateStudent(
  request: Request<Params>,
  response: Response,
): Promise<void> {
  const { id } = request.params

  db.update('students', id, {
    active: false,
    updatedAT: new Date(),
  })

  response.json({
    result: 'sucess',
    message: 'Student Inactivated',
  })
}
