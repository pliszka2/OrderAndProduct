import { CreateCartCommandHandler } from './command/CreateCart/CreateCartCommandHandler'
import { AddItemToCartCommandHandler } from './command/AddItemToCart/AddItemToCartCommandHandler'

import { GetCart } from './query/GetCart'

export namespace EcommerceApplicationService {
  export const Command = {
    CreateCartCommandHandler,
    AddItemToCartCommandHandler,
  }
  export const Query = {
    GetCart
  }
}
