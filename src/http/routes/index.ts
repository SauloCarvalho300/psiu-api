import { Router } from 'express'

import { authRouter } from './auth'
import { commentRouter } from './comments'
import { postRouter } from './posts'
import { userRouter } from './students'

const router = Router()

router.use('/authenticate', authRouter)
router.use('/student', userRouter)
router.use('/post', postRouter)
router.use('/comment', commentRouter)

export { router }
