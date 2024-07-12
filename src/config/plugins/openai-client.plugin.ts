import OpenAI from 'openai'
import {
  AssistantsClientPlugin,
  MessagesClientPlugin,
  RunsClientPlugin,
  ThreadsClientPlugin,
} from '@config/plugins/gpt-assistants'
import { LoggerPlugin } from '@config/plugins'

export type OpenAiClient = OpenAI
export interface ClientOptions {
  baseURL?: string
  apiKey?: string
  organization?: string
  project?: string
}

export class OpenAiClientPlugin {
  private readonly openai: OpenAiClient

  private readonly assistantsClientPlugin: AssistantsClientPlugin
  private readonly messagesClientPlugin: MessagesClientPlugin
  private readonly runsClientPlugin: RunsClientPlugin
  private readonly threadsClientPlugin: ThreadsClientPlugin

  private constructor(
    private readonly baseURL: string,
    private readonly apiKey: string,
    private readonly organization: string,
    private readonly project: string
  ) {
    this.openai = new OpenAI({
      baseURL: this.baseURL,
      apiKey: this.apiKey,
      organization: this.organization,
      project: this.project,
    })

    const logger = LoggerPlugin.instance

    this.assistantsClientPlugin = AssistantsClientPlugin.create(
      this.openai,
      logger
    )
    this.messagesClientPlugin = MessagesClientPlugin.create(this.openai, logger)
    this.runsClientPlugin = RunsClientPlugin.create(this.openai, logger)
    this.threadsClientPlugin = ThreadsClientPlugin.create(this.openai, logger)
  }

  public static create(options: ClientOptions): OpenAiClientPlugin {
    const {
      baseURL = '',
      apiKey = '',
      organization = '',
      project = '',
    } = options

    const client = new OpenAiClientPlugin(
      baseURL,
      apiKey,
      organization,
      project
    )

    return client
  }

  public get assistants(): AssistantsClientPlugin {
    return this.assistantsClientPlugin
  }

  public get messages(): MessagesClientPlugin {
    return this.messagesClientPlugin
  }

  public get runs(): RunsClientPlugin {
    return this.runsClientPlugin
  }

  public get threads(): ThreadsClientPlugin {
    return this.threadsClientPlugin
  }
}
