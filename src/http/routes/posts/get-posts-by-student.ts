import { db } from '@database/client'
import { Request, Response } from 'express'

interface Params {
  studentId: string
}

export async function getPostsByStudent(
  request: Request<Params>,
  response: Response,
): Promise<void> {
  const { studentId } = request.params

  const posts = db.findMany('posts', { active: true, studentId })

  const postsResponse = posts.map((post) => {
    const comments = db.findMany('comments', { postId: post.id, active: true })
    const reactions = db.findMany('posts_reactions', { postId: post.id })

    const summaryComments = comments.map((comment) => ({
      id: comment.id,
      postId: comment.postId,
      content: comment.content,
      commentedAt: comment.commentedAt,
      updatedAt: comment.updatedAt,
    }))

    const summaryReactions = reactions.map((reaction) => ({
      id: reaction.id,
      postId: reaction.postId,
      type: reaction.type,
      reactedAt: reaction.reactedAt,
    }))

    const summaryPost = {
      id: post.id,
      content: post.content,
      publishedAt: post.publishedAt,
      updatedAt: post.updatedAt,
    }

    return {
      ...summaryPost,
      comments: summaryComments,
      reactions: summaryReactions,
    }
  })

  response.json({
    result: 'success',
    data: postsResponse,
  })
}
