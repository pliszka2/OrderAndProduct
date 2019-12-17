import { handler } from './handler'
import { HttpMethods } from 'http/config/http-methods'
import { validateWith } from 'http/utils/validate'
import { schema } from './schema'

export const updateProduct = {
  method: HttpMethods.PUT,
  url: '/product/:productId',
  preHandler: validateWith(schema),
  handler,
}
