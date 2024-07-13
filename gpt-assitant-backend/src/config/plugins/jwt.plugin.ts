import { jwtVerify, SignJWT } from 'jose'
import { LoggerPlugin } from '@config/plugins'

export interface UnauthorizedError {
  code: string
  claim: string
  reason: string
  payload: string
}

interface GenerateTokenOptions {
  payload: { [key: string]: any }
  duration: string
  issuer?: string
  audience?: string
}

interface ValidateTokenOptions {
  token: string
  issuer?: string
  audience?: string
}

export class JwtPlugin {
  private readonly secret: Uint8Array

  constructor(
    private readonly jwt_secret: string,
    private readonly logger: LoggerPlugin,
    private readonly service: string = 'jwt-plugin'
  ) {
    this.secret = new TextEncoder().encode(this.jwt_secret)
  }

  public async generateToken(options: GenerateTokenOptions): Promise<string> {
    const {
      payload,
      duration,
      issuer = 'urn:default:issuer',
      audience = 'urn:default:audience',
    } = options
    return new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
      .setIssuedAt()
      .setIssuer(issuer)
      .setAudience(audience)
      .setExpirationTime(duration)
      .sign(this.secret)
      .then((token) => token)
      .catch((error) => {
        this.logger.error(`${error}`, this.service, {
          error: error.stack,
        })
        throw error
      })
  }

  public async validateToken<T>(options: ValidateTokenOptions): Promise<T> {
    const {
      token,
      issuer = 'urn:default:issuer',
      audience = 'urn:default:audience',
    } = options
    return jwtVerify(token, this.secret, {
      issuer,
      audience,
    })
      .then((result) => {
        return result.payload as T
      })
      .catch((error) => {
        const unauthorized: UnauthorizedError = {
          code: error.code,
          claim: error.claim,
          reason: error.reason,
          payload: error.payload,
        }
        return unauthorized as T
      })
  }
}
