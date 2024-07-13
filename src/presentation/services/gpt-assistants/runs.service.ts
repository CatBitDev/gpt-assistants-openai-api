import { OpenAiClientPlugin } from '@config/plugins'

export class RunsService {
  constructor(private readonly client: OpenAiClientPlugin) {}
}
