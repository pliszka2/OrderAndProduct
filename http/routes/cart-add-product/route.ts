import { handler } from './handler'
import { HttpMethods } from 'http/config/http-methods'
import { HTTP } from 'http/config/http-codes'

export const createCart = {
  method: HttpMethods.POST,
  url: '/cart',
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
  handler,
}
