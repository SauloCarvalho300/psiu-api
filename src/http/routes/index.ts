import { Router } from 'express'

import { userRouter } from './students'

const router = Router()

router.use('/student', userRouter)

export { router }
