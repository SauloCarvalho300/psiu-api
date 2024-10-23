import { authentication } from '@http/middlewares/auth'
import { Router } from 'express'

import { createPostReaction } from './create-post-reaction'
import { deletePostReaction } from './delete-post-reactions'

const reactionRouter = Router()

reactionRouter.use(authentication)

reactionRouter.post('/post/:postId', createPostReaction)
reactionRouter.delete('/post/:reactionId', deletePostReaction)

export { reactionRouter }
