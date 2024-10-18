import { db } from '@database/client'
import { randomUUID } from 'crypto'
import { Request, Response } from 'express'

interface Params {
  postId: string
}

interface Body {
  content: string
}

export async function createComment(
  request: Request<Params>,
  response: Response,
): Promise<void> {
  const { studentId } = request
  const { postId } = request.params
  const { content } = request.body as Body

  const post = db.findUnique('posts', { id: postId })

  if (!post) {
    response.status(400).json({
      result: 'error',
      message: 'Post not found',
    })

    return
  }

  db.create('comments', {
    id: randomUUID(),
    studentId,
    postId,
    content,
    active: true,
    commentedAt: new Date(),
    updatedAt: null,
  })

  response.status(201).json({
    result: 'success',
    message: 'Comment created',
  })
}
