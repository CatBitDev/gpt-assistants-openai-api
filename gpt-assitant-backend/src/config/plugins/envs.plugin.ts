import 'dotenv/config'
import { get } from 'env-var'

export class Envs {
  public static readonly OPENAI_API_KEY = get('OPENAI_API_KEY')
    .required()
    .asString()
  public static readonly PORT = get('PORT').required().asPortNumber()
  public static readonly MONGO_URL = get('MONGO_URL').required().asString()
  public static readonly MONGO_DB_NAME_ASSISTANTS = get(
    'MONGO_DB_NAME_ASSISTANTS'
  )
    .required()
    .asString()
  public static readonly MONGO_DB_NAME_LOGS = get('MONGO_DB_NAME_LOGS')
    .required()
    .asString()
  public static readonly JWT_SECRET = get('JWT_SECRET').required().asString()
}
