import { db } from '@database/client'
import { Request, Response } from 'express'

interface Params {
  id: string
}

export async function inactivateStudent(
  request: Request<Params>,
  response: Response,
): Promise<void> {
  const { studentId } = request

  const student = db.findUnique('students', { id: studentId })

  if (!student) {
    response.status(400).json({
      result: 'error',
      message: 'Student not found',
    })

    return
  }

  db.update('students', studentId, {
    active: false,
    updatedAT: new Date(),
  })

  response.json({
    result: 'sucess',
    message: 'Student Inactivated',
  })
}
