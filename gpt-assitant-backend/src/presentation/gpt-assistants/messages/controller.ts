import { Request, Response } from 'express'
import { MessagesService } from '@presentation/services/gpt-assistants'

export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}
}
