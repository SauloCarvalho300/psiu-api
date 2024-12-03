import cors from 'cors'
import express from 'express'

import { router } from './routes'

const app = express()

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
)

app.use(express.json())

app.use(router) // Registra as rotas da aplicação

app.listen(3333, () => console.log('🚀 Servidor HTTP está rodando!'))
