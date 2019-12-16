import { CreateCartCommandHandler } from './command/CreateCart/CreateCart'
import { AddItemToCartCommandHandler } from './command/AddItemToCart/AddItem'
import { RemoveItemFromCartCommandHandler } from './command/RemoveItem/RemoveItem'

import { CartViewModel } from './query/Cart'
import { ProductViewModel } from './query/Product'

export namespace EcommerceApplicationService {
  export const Command = {
    CreateCartCommandHandler,
    AddItemToCartCommandHandler,
    RemoveItemFromCartCommandHandler,
  }
  export const Query = {
    CartViewModel,
    ProductViewModel,
  }
}
