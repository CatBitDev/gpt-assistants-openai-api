import { Router } from 'express'
import { NotFoundRoutes } from '@presentation/not-found/routes'
import { AuthRoutes } from '@presentation/auth/routes'
import { GptAssistantsRoutes } from '@presentation/gpt-assistants/routes'

export class AppRoutes {
  static get routes(): Router {
    const router = Router()

    router.use('/api/v1', GptAssistantsRoutes.routes)
    router.use('/api/auth', AuthRoutes.routes)
    router.use('*', NotFoundRoutes.routes)

    return router
  }
}
