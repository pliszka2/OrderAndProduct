import { handler } from './handler'
import { HttpMethods } from 'http/config/http-methods'
import { HTTP } from 'http/config/http-codes'

export const healthCheck = {
  method: HttpMethods.GET,
  url: '/healthcheck',
  schema: {
    response: {
      [`${HTTP.OK}`]: {
        type: 'object',
        properties: {
          hello: { type: 'string' },
        },
      },
    },
  },
  handler,
}
