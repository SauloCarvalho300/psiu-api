import { authentication } from '@http/middlewares/auth'
import { Router } from 'express'

import { createComment } from './create-comment'
import { inactivateComment } from './inactivate-comment'
import { updateComment } from './update-comment'

const commentRouter = Router()

commentRouter.use(authentication)

commentRouter.post('/:postId', createComment)
commentRouter.put('/:commentId', updateComment)
commentRouter.delete('/:commentId', inactivateComment)

export { commentRouter }
