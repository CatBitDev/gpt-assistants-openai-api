import { OpenAiClientPlugin } from '@config/plugins'

export class ThreadsService {
  constructor(private readonly client: OpenAiClientPlugin) {}
}
