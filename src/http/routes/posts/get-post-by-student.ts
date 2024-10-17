import { db } from '@database/client'
import { Request, Response } from 'express'

interface Params {
  studentId: string
}

export async function getPostByStudent(
  request: Request<Params>,
  response: Response,
): Promise<void> {
  const { studentId } = request.params

  const posts = db.findMany('posts', { active: true, studentId })

  response.json({
    result: 'Success',
    data: posts,
  })
}
