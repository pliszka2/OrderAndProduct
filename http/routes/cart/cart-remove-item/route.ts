import { handler } from './handler'
import { HttpMethods } from 'http/config/http-methods'
import { validation } from './validation'

export const cartRemoveItem = {
  method: HttpMethods.DELETE,
  url: '/cart/:cartId',
  querystring: {
    cartId: { type: 'string' },
  },
  schema: {
    body: {
      itemId: { type: 'string' },
    },
  },
  beforeHandler: validation,
  handler,
}
