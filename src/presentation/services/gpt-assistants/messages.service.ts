import { OpenAiClientPlugin } from '@config/plugins'

export class MessagesService {
  constructor(private readonly client: OpenAiClientPlugin) {}
}
