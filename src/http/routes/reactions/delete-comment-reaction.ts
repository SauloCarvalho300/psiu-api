import { db } from '@database/client'
import { Request, Response } from 'express'

interface Params {
  reactionId: string
}

export async function deleteCommentReaction(
  request: Request<Params>,
  response: Response,
) {
  const { studentId } = request
  const { reactionId } = request.params

  const reaction = db.findUnique('comments_reactions', { id: reactionId })

  if (!reaction) {
    response.status(400).json({
      result: 'error',
      message: 'Reaction not found',
    })
    return
  }

  if (reaction.studentId !== studentId) {
    response.status(401).json({
      result: 'error',
      message: 'Operation not allowed',
    })
    return
  }

  db.delete('comments_reactions', reactionId)

  response.status(201).json({
    result: 'success',
    message: 'Comment reaction removed',
  })
}
