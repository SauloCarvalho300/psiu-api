import { db } from '@database/client'
import { Request, Response } from 'express'

export async function getPosts(
  request: Request,
  response: Response,
): Promise<void> {
  const posts = db.findMany('posts', { active: true })

  const postsWithComments = posts.map((post) => {
    const comments = db.findMany('comments', { postId: post.id, active: true })

    const summaryComments = comments.map((comment) => ({
      id: comment.id,
      postId: comment.postId,
      content: comment.content,
      contentedAt: comment.comentedAt,
      updatedAt: comment.updatedAt,
    }))

    const summaryPost = {
      id: post.id,
      studentId: post.studentId,
      content: post.content,
      publishedAt: post.publishedAt,
      updatedAt: post.updatedAt,
    }

    return { ...summaryPost, comments: summaryComments }
  })

  response.json({
    result: 'success',
    data: postsWithComments,
  })
}
