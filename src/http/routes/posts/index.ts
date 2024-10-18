import { authentication } from '@http/middlewares/auth'
import { Router } from 'express'

import { createPost } from './create-post'
import { getPosts } from './get-posts'
import { getPostsByStudent } from './get-posts-by-student'
import { inactivatePost } from './inactivate-post'
import { updatePost } from './update-post'

const postRouter = Router()

postRouter.use(authentication)

postRouter.post('/', createPost)
postRouter.get('/', getPosts)
postRouter.get('/student/:studentId', getPostsByStudent)
postRouter.put('/:postId', updatePost)
postRouter.delete('/:postId', inactivatePost)

export { postRouter }
