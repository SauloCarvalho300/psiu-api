import { db } from '@database/client'
import { randomUUID } from 'crypto'
import { Request, Response } from 'express'

interface Body {
  content: string
}

export async function createPost(
  request: Request,
  response: Response,
): Promise<void> {
  const { studentId } = request
  const { content } = request.body as Body

  db.create('posts', {
    id: randomUUID(),
    studentId,
    content,
    active: true,
    publishedAt: new Date(),
    updatedAt: null,
  })

  response.status(201).json({
    result: 'success',
    message: 'Post criado',
  })
}
