import { handler } from './handler'
import { HttpMethods } from 'http/config/http-methods'
import { HTTP } from 'http/config/http-codes'
import { validation } from './validation'

export const cartAddProduct = {
  method: HttpMethods.POST,
  url: '/cart/:cartId',
  querystring: {
    cartId: { type: 'string' },
  },
  schema: {
    response: {
      [`${HTTP.CREATED}`]: {
        type: 'object',
      },
    },
  },
  beforeHandler: validation,
  handler,
}
