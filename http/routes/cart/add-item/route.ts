import { handler } from './handler'
import { HttpMethods } from 'http/config/http-methods'
import { validation } from './validation'

export const cartAddItem = {
  method: HttpMethods.PUT,
  url: '/cart/:cartId',
  querystring: {
    cartId: { type: 'string' },
  },
  schema: {
    body: {
      itemId: { type: 'string' },
      amount: { type: 'number' },
    },
  },
  beforeHandler: validation,
  handler,
}
