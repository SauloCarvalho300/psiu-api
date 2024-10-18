import { db } from '@database/client'
import { Request, Response } from 'express'

export async function inactivateStudent(
  request: Request,
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
    updatedAt: new Date(),
  })

  response.json({
    result: 'success',
    message: 'Student deleted',
  })
}
