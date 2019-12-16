import { handler } from './handler'
import { HttpMethods } from 'http/config/http-methods'
import { HTTP } from 'http/config/http-codes'
import { validation } from './validation'

export const getCart = {
  method: HttpMethods.GET,
  url: '/cart/:cartId',
  querystring: {
    cartId: { type: 'string' },
  },
  schema: {
    response: {
      [`${HTTP.OK}`]: {
        type: 'object',
      },
    },
  },
  beforeHandler: validation,
  handler,
}
