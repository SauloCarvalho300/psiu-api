import { Router } from 'express'

import { createStudent } from './create-student'
import { getStudents } from './get-students'
import { inactivateStudent } from './inactivate-student'
import { updateStudent } from './update-student'

const userRouter = Router()

userRouter.post('/', createStudent)
userRouter.get('/', getStudents)
userRouter.put('/:id', updateStudent)
userRouter.delete('/:id', inactivateStudent)

export { userRouter }
