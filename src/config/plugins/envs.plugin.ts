import 'dotenv/config'
import { get } from 'env-var'

export class Envs {
  public static readonly OPENAI_API_KEY = get('OPENAI_API_KEY')
    .required()
    .asString()
  public static readonly PORT = get('PORT').required().asPortNumber()
  public static readonly MONGO_URL = get('MONGO_URL').required().asString()
  public static readonly MONGO_DB_NAME = get('MONGO_DB_NAME')
    .required()
    .asString()
}
