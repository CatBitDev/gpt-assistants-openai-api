export class RequestError extends Error {
  private constructor(
    public readonly statusCode: number,
    public readonly message: string
  ) {
    super(message)
  }

  static badRequest(message: string) {
    return new RequestError(400, message)
  }

  static unauthorized(message: string) {
    return new RequestError(401, message)
  }

  static forbidden(message: string) {
    return new RequestError(403, message)
  }

  static notFound(message: string) {
    return new RequestError(404, message)
  }

  static internalServerError(message: string) {
    console.log({ error: message })
    return new RequestError(500, 'Internal server error')
  }
}
