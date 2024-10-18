import { db } from '@database/client'
import { Request, Response } from 'express'

interface Params {
  commentId: string
}

interface Body {
  content: string
}

export async function updateComment(
  request: Request<Params>,
  response: Response,
): Promise<void> {
  const { studentId } = request
  const { commentId } = request.params
  const { content } = request.body as Body

  const comment = db.findUnique('comments', { id: commentId })

  if (!comment) {
    response.status(400).json({
      result: 'error',
      message: 'Comment not found',
    })

    return
  }

  if (comment.studentId !== studentId) {
    response.status(401).json({
      result: 'error',
      message: 'Operation not allowed',
    })

    return
  }

  db.update('comments', commentId, {
    content,
    updatedAt: new Date(),
  })

  response.json({
    result: 'success',
    message: 'Comment upated',
  })
}
