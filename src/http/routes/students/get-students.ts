import { db } from '@database/client'
import { Request, Response } from 'express'

export async function getStudents(
  request: Request,
  response: Response,
): Promise<void> {
  const students = db.findMany('students', { active: true })

  response.json({
    result: 'success',
    data: students,
  })
}
