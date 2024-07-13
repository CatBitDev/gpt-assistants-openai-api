import { Router } from 'express'
import { NotFoundController } from '@presentation/not-found/controller'

export class NotFoundRoutes {
  static get routes(): Router {
    const router = Router()
    const controller = new NotFoundController()

    router.use(controller.handleRequest)

    return router
  }
}
