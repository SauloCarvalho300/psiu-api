import { Router } from 'express'

import { authentication } from '../../middlewares/auth'
import { authenticateWithPassword } from './authenticate-with-password'
import { updatePassword } from './update-password'

const authRouter = Router()

authRouter.post('/password', authenticateWithPassword)

authRouter.use(authentication)

authRouter.patch('/password', updatePassword)

export { authRouter }
