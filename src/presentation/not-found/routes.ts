import { Router } from 'express'
import { NotFoundController } from './controller'

export class NotFoundRoutes {
  static get routes(): Router {
    const router = Router()
    const controller = new NotFoundController()

    router.use(controller.handleRequest)

    return router
  }
}
