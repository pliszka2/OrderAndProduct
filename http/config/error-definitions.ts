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
  ItemNotInCart: {
    statusCode: HTTP.BAD_REQUEST,
    message: 'Item not found in the cart',
  },
  ItemNotInStock: {
    statusCode: HTTP.BAD_REQUEST,
    message: 'Item not in stock',
  },
}
