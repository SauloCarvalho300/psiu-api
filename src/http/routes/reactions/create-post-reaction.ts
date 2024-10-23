import { db } from '@database/client'
import { randomUUID } from 'crypto'
import { Request, Response } from 'express'
import { EnumTypeReaction } from 'src/enums/enum-type-reactions'

interface Params {
  postId: string
}

interface Body {
  type: EnumTypeReaction
}

export async function createPostReaction(
  request: Request<Params>,
  response: Response,
) {
  const { studentId } = request
  const { postId } = request.params
  const { type } = request.body as Body

  const post = db.findUnique('posts', { id: postId })

  if (!post) {
    response.status(400).json({
      result: 'error',
      message: 'Post not found',
    })
    return
  }

  const postReaction = db.findUnique('posts_reactions', {
    postId,
    studentId,
  })

  if (postReaction) {
    if (postReaction.type !== type) {
      db.update('posts_reactions', postReaction.id, {
        type,
      })

      return
    } else {
      response.status(201).json({
        result: 'success',
        message: 'Post reacted',
      })

      return
    }
  }

  db.create('posts_reactions', {
    id: randomUUID(),
    studentId,
    postId,
    type,
    reactedAt: new Date(),
  })

  response.status(201).json({
    result: 'success',
    message: 'Post reacted',
  })
}
