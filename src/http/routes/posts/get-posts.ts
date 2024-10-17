import { db } from '@database/client'
import { Request, Response } from 'express'

export async function getPosts(
  request: Request,
  response: Response,
): Promise<void> {
  const posts = db.findMany('posts', { active: true })

  response.json({
    result: 'sucess',
    data: posts,
  })
}
