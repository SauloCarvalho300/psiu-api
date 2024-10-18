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
      message: 'comment not found',
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

  db.update('Comments', commentId, {
    active: false,
    updatedAT: new Date(),
  })

  response.json({
    result: 'sucess',
    message: 'Comment Inactivated',
  })
}
