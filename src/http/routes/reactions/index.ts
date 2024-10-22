import { authentication } from '@http/middlewares/auth'
import { Router } from 'express'

import { createPostReaction } from './create-post-reaction'

const reactionRouter = Router()

reactionRouter.use(authentication)

reactionRouter.post('/post/:postId', createPostReaction)

export { reactionRouter }
