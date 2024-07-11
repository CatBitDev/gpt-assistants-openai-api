import { jwtVerify, SignJWT } from 'jose'
import { RequestError } from '@/domain/errors'

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

  constructor(private readonly jwt_secret: string) {
    this.secret = new TextEncoder().encode(jwt_secret)
  }

  public async generateToken(options: GenerateTokenOptions): Promise<string> {
    const {
      payload,
      duration,
      issuer = 'urn:default:issuer',
      audience = 'urn:default:audience',
    } = options
    return (
      new SignJWT(payload)
        // Algoritmo de encriptación
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        // Fecha de emisión del token
        .setIssuedAt()
        // La aplicación que genera el token
        .setIssuer(issuer)
        // Para quien voy a generar el token
        .setAudience(audience)
        // Fecha de expiración del token
        .setExpirationTime(duration)
        .sign(this.secret)
        .then((token) => token)
        .catch((error) => {
          throw RequestError.internalServerError(error)
        })
    )
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
        throw RequestError.unauthorized(error)
      })
  }
}
