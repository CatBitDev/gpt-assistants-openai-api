import { Response } from 'express'
import { RequestError, VariableValidatorError } from '@domain/errors'

export class CustomErrorHandling {
  public static handle(error: unknown, res: Response) {
    let message = ''
    let stack = ''
    if (error instanceof Error) stack = `${error.stack}`
    if (res.headersSent) {
      message = 'Headers already sent'
      return { message, stack }
    }
    if (error instanceof VariableValidatorError) {
      res.status(400).json({ error: error.message })
      message = error.message
      return { message, stack }
    }
    if (error instanceof RequestError) {
      res.status(error.statusCode).json({ error: error.message })
      message = error.message
      return { message, stack }
    }
    res.status(500).json({ error: 'Internal server error' })
    return { message, stack }
  }
}
