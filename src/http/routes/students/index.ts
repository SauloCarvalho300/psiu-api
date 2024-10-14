import { Router } from 'express'

import { authentication } from '../../middlewares/auth'
import { createStudent } from './create-student'
import { getStudents } from './get-students'
import { inactivateStudent } from './inactivate-student'
import { updateStudent } from './update-student'

const userRouter = Router()

userRouter.post('/', createStudent)

userRouter.use(authentication)

userRouter.get('/', getStudents)
userRouter.put('/', updateStudent)
userRouter.delete('/', inactivateStudent)

export { userRouter }
