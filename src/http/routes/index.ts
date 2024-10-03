import { Router } from 'express'

import { authRouter } from './auth'
import { userRouter } from './students'

const router = Router()

router.use('/authenticate', authRouter)
router.use('/student', userRouter)

export { router }
