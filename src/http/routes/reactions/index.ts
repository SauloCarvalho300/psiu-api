import { authentication } from '@http/middlewares/auth'
import { Router } from 'express'

import { createCommentReaction } from './create-comment-reaction'
import { createPostReaction } from './create-post-reaction'
import { deleteCommentReaction } from './delete-comment-reaction'
import { deletePostReaction } from './delete-post-reactions'

const reactionRouter = Router()

reactionRouter.use(authentication)

reactionRouter.post('/post/:postId', createPostReaction)
reactionRouter.post('/comment/:commentId', createCommentReaction)

reactionRouter.delete('/post/:reactionId', deletePostReaction)
reactionRouter.delete('/comment/:reactionId', deleteCommentReaction)

export { reactionRouter }
