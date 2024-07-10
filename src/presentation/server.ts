import express, { Router } from 'express'
import cors from 'cors'
import { ErrorHandlerMiddleware } from '@presentation/middlewares'

interface Options {
  port: number
  routes: Router
}

export class Server {
  public readonly app = express()

  private serverListener?: Server
  private readonly port: number
  private readonly routes: Router

  constructor(options: Options) {
    const { port, routes } = options
    this.port = port
    this.routes = routes
  }

  public async start() {
    //* Middlewares
    this.app.use(cors())
    this.app.use(express.json())

    //* Routes
    this.app.use(this.routes)
    this.app.use(ErrorHandlerMiddleware.handle)

    this.app.listen(this.port, () => {
      console.log(`Server running on port: ${this.port}`)
    })
  }

  public async close() {
    if (!this.serverListener) return
    this.serverListener.close()
  }
}
