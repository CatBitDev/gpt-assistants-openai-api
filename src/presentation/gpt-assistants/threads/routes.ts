import { Router } from 'express'
import { OpenAiClientPlugin } from '@config/plugins'
import { ThreadsService } from '@presentation/services/gpt-assistants'
import { ThreadsController } from '@presentation/gpt-assistants'

export class ThreadsRoutes {
  static routes(openaiClient: OpenAiClientPlugin) {
    const router = Router()

    const threadsService = new ThreadsService(openaiClient)
    const controller = new ThreadsController(threadsService)

    return router
  }
}
