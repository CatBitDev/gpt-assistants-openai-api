import { Router } from 'express'
import {
  AssistantsRoutes,
  ThreadsRoutes,
  MessagesRoutes,
  RunsRoutes,
} from '@presentation/gpt-assistants'
import { OpenAiClientPlugin, Envs } from '@config/plugins'

export class GptAssistantsRoutes {
  static get routes() {
    const router = Router()

    const openaiClient = OpenAiClientPlugin.create({
      apiKey: Envs.OPENAI_API_KEY,
    })

    router.use('/assistants', AssistantsRoutes.routes(openaiClient))
    router.use('/threads', ThreadsRoutes.routes(openaiClient))
    router.use('/messages', MessagesRoutes.routes(openaiClient))
    router.use('/runs', RunsRoutes.routes(openaiClient))

    return router
  }
}
