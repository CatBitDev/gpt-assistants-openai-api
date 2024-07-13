import express, { Router } from 'express'
import cors from 'cors'
import { ErrorHandlerMiddleware } from '@presentation/middlewares'
import { LoggerPlugin } from '@config/plugins'

interface Options {
  logger: LoggerPlugin
  mode: string
  port: number
  routes: Router
}

type Mode = 'development' | 'production'

export class Server {
  public readonly app = express()

  private serverListener?: Server
  private readonly logger: LoggerPlugin
  private readonly mode: Mode
  private readonly port: number
  private readonly routes: Router

  constructor(options: Options) {
    const { port, routes, mode, logger } = options
    this.logger = logger
    this.mode = mode as Mode
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
      if (this.mode === 'development') {
        this.logger.warn(`Current mode is development`, 'server')
        this.logger.info(`Server is running on port ${this.port}`, 'server')
      }
    })
  }

  public async close() {
    if (!this.serverListener) return
    this.serverListener.close()
  }
}
