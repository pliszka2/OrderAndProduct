import { handler } from './handler'
import { HttpMethods } from 'http/config/http-methods'
import { validateWith } from 'http/utils/validate'
import { schema } from './schema'

export const getCart = {
  method: HttpMethods.GET,
  url: '/cart/:cartId',
  preHandler: validateWith(schema),
  handler,
}
