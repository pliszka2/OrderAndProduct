import { handler } from './handler'
import { HttpMethods } from 'http/config/http-methods'
import { validation } from './validation'

export const getCart = {
  method: HttpMethods.GET,
  url: '/cart/:cartId',
  querystring: {
    cartId: { type: 'string' },
  },
  beforeHandler: validation,
  handler,
}
