import { handler } from './handler'
import { HttpMethods } from 'http/config/http-methods'
import { validateWith } from 'http/utils/validate'
import { schema } from './schema'

export const cartAddItem = {
  method: HttpMethods.PUT,
  url: '/cart/:cartId',
  preHandler: validateWith(schema),
  handler,
}
