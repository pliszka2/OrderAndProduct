import { handler } from './handler'
import { HttpMethods } from 'http/config/http-methods'
import { validateWith } from 'http/utils/validate'
import { schema } from '../get/schema'

export const cartRemoveItem = {
  method: HttpMethods.DELETE,
  url: '/cart/:cartId',
  preHandler: validateWith(schema),
  handler,
}
