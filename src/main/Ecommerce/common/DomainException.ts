export abstract class DomainException extends Error {
  public message: string
  public statusCode: number

  constructor(definition: { message: string; statusCode: number }) {
    super()

    this.message = definition.message
    this.statusCode = definition.statusCode
  }
}
