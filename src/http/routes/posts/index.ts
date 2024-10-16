import { Router } from 'express'

import { authentication } from '../../middlewares/auth'
import { createPost } from './create-post'

const postRouter = Router()

postRouter.use(authentication)

postRouter.post('/', createPost)

export { postRouter }
