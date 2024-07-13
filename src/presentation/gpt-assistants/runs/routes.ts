import { Router } from 'express'
import { OpenAiClientPlugin } from '@config/plugins'
import { RunsService } from '@presentation/services/gpt-assistants'
import { RunsController } from '@presentation/gpt-assistants'

export class RunsRoutes {
  static routes(openaiClient: OpenAiClientPlugin) {
    const router = Router()

    const runsService = new RunsService(openaiClient)
    const controller = new RunsController(runsService)

    return router
  }
}
