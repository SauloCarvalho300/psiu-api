import { Router } from 'express'

import { authentication } from '../../middlewares/auth'
import { createPost } from './create-post'
import { getPostByStudent } from './get-post-by-student'
import { getPosts } from './get-posts'
import { inactivatePost } from './inactivate-post'
import { updatePost } from './update-post'

const postRouter = Router()

postRouter.use(authentication)

postRouter.post('/', createPost)
postRouter.get('/', getPosts)
postRouter.put('/:postId', updatePost)
postRouter.delete('/:postId', inactivatePost)
postRouter.get('/student/:studentId', getPostByStudent)

export { postRouter }
