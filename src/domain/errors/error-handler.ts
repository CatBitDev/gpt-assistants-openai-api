import { Response } from 'express'
import { RequestError, VariableValidatorError } from '@domain/errors'

export class CustomErrorHandling {
  public static handle(error: unknown, res: Response) {
    if (error instanceof VariableValidatorError) {
      return res.status(400).json({ error: error.message })
    }
    if (error instanceof RequestError) {
      return res.status(error.statusCode).json({ error: error.message })
    }
    console.log(`${error}`)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
