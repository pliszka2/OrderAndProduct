import { CreateCartCommandHandler } from './handlers/CreateCartCommandHandler'
import { AddItemToCartCommandHandler } from './handlers/AddItemToCartCommandHandler'

export namespace EcommerceApplicationService {
  export const Handlers = {
    CreateCartCommandHandler,
    AddItemToCartCommandHandler,
  }
}
