import { Router } from 'express'

import { createStudent } from './create-student'

const userRouter = Router()

userRouter.post('/', createStudent)

export { userRouter }
