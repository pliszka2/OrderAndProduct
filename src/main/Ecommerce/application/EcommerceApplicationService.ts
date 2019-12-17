import { CreateCartCommandHandler } from './command/Cart/Create/CreateCart'
import { AddItemToCartCommandHandler } from './command/Cart/AddItem/AddItem'
import { RemoveItemFromCartCommandHandler } from './command/Cart/RemoveItem/RemoveItem'

import { CartViewModel } from './query/Cart'
import { ProductViewModel } from './query/Product'
import { UpdateProductCommandHandler } from './command/Product/Update/Update'

export namespace EcommerceApplicationService {
  export const Command = {
    CreateCartCommandHandler,
    AddItemToCartCommandHandler,
    RemoveItemFromCartCommandHandler,
    UpdateProductCommandHandler,
  }
  export const Query = {
    CartViewModel,
    ProductViewModel,
  }
}
