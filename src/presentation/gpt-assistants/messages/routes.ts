import { Router } from 'express'
import { OpenAiClientPlugin } from '@config/plugins'
import { MessagesService } from '@presentation/services/gpt-assistants'
import { MessagesController } from '@presentation/gpt-assistants'

export class MessagesRoutes {
  static routes(openaiClient: OpenAiClientPlugin) {
    const router = Router()

    const messagesService = new MessagesService(openaiClient)
    const controller = new MessagesController(messagesService)

    return router
  }
}
