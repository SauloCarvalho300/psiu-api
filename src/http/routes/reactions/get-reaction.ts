import { db } from '@database/client'
import { Request, Response } from 'express'

export async function getReactions(
  request: Request,
  response: Response,
): Promise<void> {
  const posts = db.findMany('posts', { active: true })

  const postsResponse = posts.map((post) => {
    const comments = db.findMany('comments', { postId: post.id, active: true })
    const reactions = db.findMany('posts_reactions', { postId: post.id })

    const summaryComments = comments.map((comment) => ({
      id: comment.id,
      postId: comment.postId,
      content: comment.content,
      contentedAt: comment.comentedAt,
      updatedAt: comment.updatedAt,
    }))

    const summaryReactions = reactions.map((reaction) => ({
      id: reaction.id,
      content: reaction.content,
      publishedAt: reaction.publishedAt,
      updatedAt: reaction.updatedAt,
    }))

    const summaryPost = {
      id: post.id,
      studentId: post.studentId,
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