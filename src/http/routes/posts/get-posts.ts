import { db } from '@database/client'
import { Request, Response } from 'express'

export async function getPosts(
  request: Request,
  response: Response,
): Promise<void> {
  const { studentId } = request

  const posts = db.findMany('posts', { active: true })

  const sortedPosts = posts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  )

  const postsResponse = sortedPosts.map((post) => {
    const comments = db.findMany('comments', { postId: post.id, active: true })
    const reactions = db.findMany('posts_reactions', { postId: post.id })

    const summaryComments = comments.map((comment) => {
      const reactions = db.findMany('comments_reactions', {
        commentId: comment.id,
      })

      const summaryReactions = reactions.map((reaction) => ({
        id: reaction.id,
        postId: reaction.postId,
        isOwner: reaction.studentId === studentId,
        type: reaction.type,
        reactedAt: reaction.reactedAt,
      }))

      return {
        id: comment.id,
        postId: comment.postId,
        isOwner: comment.studentId === studentId,
        content: comment.content,
        commentedAt: comment.commentedAt,
        updatedAt: comment.updatedAt,
        reactions: summaryReactions,
      }
    })

    const summaryReactions = reactions.map((reaction) => ({
      id: reaction.id,
      postId: reaction.postId,
      isOwner: reaction.studentId === studentId,
      type: reaction.type,
      reactedAt: reaction.reactedAt,
    }))

    const summaryPost = {
      id: post.id,
      isOwner: post.studentId === studentId,
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
