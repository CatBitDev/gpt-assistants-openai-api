import { Request, Response } from 'express'
import { ThreadsService } from '@presentation/services/gpt-assistants'

export class ThreadsController {
  constructor(private readonly threadsService: ThreadsService) {}
}
