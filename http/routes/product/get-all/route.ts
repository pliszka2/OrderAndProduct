import { handler } from './handler'
import { HttpMethods } from 'http/config/http-methods'
import { validation } from './validation'

export const getProducts = {
  method: HttpMethods.GET,
  url: '/product',
  beforeHandler: validation,
  handler,
}
