import { db } from '@database/client'
import { randomUUID } from 'crypto'
import { Request, Response } from 'express'
import { EnumTypeReaction } from 'src/enums/enum-type-reactions'

interface Params {
  commentId: string
}

interface Body {
  type: EnumTypeReaction
}

export async function createCommentReaction(
  request: Request<Params>,
  response: Response,
) {
  const { studentId } = request
  const { commentId } = request.params
  const { type } = request.body as Body

  const comment = db.findUnique('comments', { id: commentId })

  if (!comment) {
    response.status(400).json({
      result: 'error',
      message: 'comment not found',
    })
    return
  }

  const commentReaction = db.findUnique('comments_reactions', {
    commentId,
    studentId,
  })

  if (commentReaction) {
    if (commentReaction.type !== type) {
      db.update('comments_reactions', commentReaction.id, {
        type,
      })

      return
    } else {
      response.status(201).json({
        result: 'success',
        message: 'Comment reacted',
      })

      return
    }
  }

  db.create('comments_reactions', {
    id: randomUUID(),
    studentId,
    commentId,
    type,
    reactedAt: new Date(),
  })

  response.status(201).json({
    result: 'success',
    message: 'Comment reacted',
  })
}
