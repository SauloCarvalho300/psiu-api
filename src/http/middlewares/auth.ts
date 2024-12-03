import { db } from '@database/client'
import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

interface Payload {
  id: string
}

export async function authentication(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const cookieToken = request.headers.cookie

    if (!cookieToken) {
      response.status(401).json({
        result: false,
        message: 'Token is missing',
      })

      return
    }

    const [, token] = cookieToken.split('=')

    const { id } = verify(token, 'psiu') as Payload

    const student = db.findUnique('students', { id })

    if (!student) {
      response.status(401).json({
        result: false,
        message: 'Student not found',
      })

      return
    }

    if (!student.active) {
      response.status(401).json({
        result: false,
        message: 'Student not found',
      })

      return
    }

    request.studentId = id

    next()
  } catch (error) {
    console.log(error)

    response.status(401).json({
      result: false,
      message: 'Authentication failed',
    })
  }
}
