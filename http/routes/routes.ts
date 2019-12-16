import { healthCheck } from './health-check/route'
import { createCart } from './cart/create/route'
import { cartAddItem } from './cart/add-item/route'
import { getCart } from './cart/get/route'
import { cartRemoveItem } from './cart/cart-remove-item/route'
import { getProducts } from './product/get-all/route'

export const routes = [
  healthCheck,
  createCart,
  cartAddItem,
  getCart,
  cartRemoveItem,
  getProducts,
]
