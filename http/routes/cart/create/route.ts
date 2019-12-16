import { handler } from './handler'
import { HttpMethods } from 'http/config/http-methods'
import { HTTP } from 'http/config/http-codes'
import { validation } from './validation'

export const createCart = {
  method: HttpMethods.POST,
  url: '/cart',
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
