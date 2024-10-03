import { Router } from 'express'

import { authenticateWithPassword } from './authenticate-with-password'

const authRouter = Router()

authRouter.post('/paswword', authenticateWithPassword)

export { authRouter }
