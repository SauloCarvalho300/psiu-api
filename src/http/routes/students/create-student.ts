import { Request, Response } from 'express'

interface Body {
  ra: string
  name: string
  birthdate: string
}

export async function createStudent(
  request: Request,
  response: Response,
): Promise<void> {
  const { ra, name, birthdate } = request.body as Body

  response.json({
    data: {
      ra,
      name,
      birthdate,
    },
  })
}
