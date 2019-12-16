import { EcommerceApplicationService } from './application/EcommerceApplicationService'

export const Ecommerce = {
  AddCartItemHandler: EcommerceApplicationService.AddItemToCartCommandHandler,
  CreateCartHandler: EcommerceApplicationService.CreateCardCommandHandler,
}
