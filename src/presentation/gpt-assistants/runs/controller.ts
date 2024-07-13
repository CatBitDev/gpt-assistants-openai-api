import { Request, Response } from 'express'
import { RunsService } from '@presentation/services/gpt-assistants'
export class RunsController {
  constructor(private readonly runsService: RunsService) {}
}
