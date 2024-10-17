import { db } from '@database/client'
import { Request, Response } from 'express'

interface Body {
  name: string
  birthdate: string
}

export async function updateStudent(
  request: Request,
  response: Response,
): Promise<void> {
  const { studentId } = request
  const { name, birthdate } = request.body as Body

  const student = db.findUnique('students', { id: studentId })

  if (!student) {
    response.status(400).json({
      result: 'error',
      message: 'Student not found',
    })

    return
  }

  db.update('students', studentId, {
    name,
    birthdate: new Date(birthdate),
    updatedAT: new Date(),
  })

  response.json({
    result: 'sucess',
    message: 'Student updated',
  })
}
