import { HTTP } from './http-codes'

export const ErrorDefinitions = {
  CartNotFound: {
    statusCode: HTTP.NOT_FOUND,
    message: 'Cart not found.',
  },
  ItemNotFound: {
    statusCode: HTTP.NOT_FOUND,
    message: 'Item not found.',
  },
  ProductNotFound: {
    statusCode: HTTP.NOT_FOUND,
    message: 'Product not found.',
  },
}
