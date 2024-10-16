import { db } from '@database/client'
import { randomUUID } from 'crypto'
import { Request, Response } from 'express'

// ID, publishedAT, updatedAT, content, studentId

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
    publishedAT: new Date(),
    updatedAT: null,
  })

  response.status(201).json({
    result: 'sucess',
    message: 'Post created',
  })
}
