import { healthCheck } from './health-check/route'
import { createCart } from './cart/create/route'
import { cartAddItem } from './cart/add-item/route'
import { getCart } from './cart/get/route'
import { cartRemoveItem } from './cart/remove-item/route'
import { getProducts } from './product/get-all/route'
import { updateProduct } from './product/update/route'

export const routes = [
  cartAddItem,
  cartRemoveItem,
  createCart,
  getCart,
  getProducts,
  healthCheck,
  updateProduct,
]
