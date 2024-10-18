import { db } from '@database/client'
import { Request, Response } from 'express'

interface Params {
  postId: string
}

interface Body {
  content: string
}

export async function updatePost(
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

  if (post.studentId !== studentId) {
    response.status(401).json({
      result: 'error',
      message: 'Operation not allowed',
    })

    return
  }

  db.update('posts', postId, {
    content,
    updatedAt: new Date(),
  })

  response.json({
    result: 'success',
    message: 'Post upated',
  })
}
