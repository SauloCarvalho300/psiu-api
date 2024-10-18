import { db } from '@database/client'
import { Request, Response } from 'express'

interface Params {
  commentId: string
}

export async function inactivateComment(
  request: Request<Params>,
  response: Response,
): Promise<void> {
  const { studentId } = request
  const { commentId } = request.params

  const comment = db.findUnique('comments', { id: commentId })

  if (!comment) {
    response.status(400).json({
      result: 'error',
      message: 'Comment not found',
    })

    return
  }

  const post = db.findUnique('posts', { id: comment.postId })

  if (!post) {
    response.status(400).json({
      result: 'error',
      message: 'The post for this comment was not found',
    })

    return
  }

  if (comment.studentId !== studentId && post.studentId !== studentId) {
    response.status(401).json({
      result: 'error',
      message: 'Operation not allowed',
    })

    return
  }

  db.update('comments', commentId, {
    active: false,
    updatedAt: new Date(),
  })

  response.json({
    result: 'success',
    message: 'Comment deleted',
  })
}
