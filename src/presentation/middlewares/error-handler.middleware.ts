import { ErrorRequestHandler } from 'express'

export class ErrorHandlerMiddleware {
  public static handle: ErrorRequestHandler = (error, req, res, next) => {
    if (res.headersSent) {
      return next(error)
    }

    const status = error.status || 500

    if (error instanceof Error) {
      let message = error.message

      if (status === 500) {
        console.log(error)
        message = 'Internal server error'
      }

      return res.status(status).json({ message })
    }

    next()
  }
}
