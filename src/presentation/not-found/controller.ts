import { Request, Response } from 'express'

export class NotFoundController {
  handleRequest = async (req: Request, res: Response) => {
    res.status(404).json({ message: `Cannot ${req.method} ${req.baseUrl}` })
  }
}
