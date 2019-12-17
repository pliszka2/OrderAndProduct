import { HTTP } from '../config/http-codes'

export class ValidationError extends Error {
  public message: string
  public statusCode: number

  constructor(message: string) {
    super()

    this.message = message
    this.statusCode = HTTP.BAD_REQUEST
  }
}
