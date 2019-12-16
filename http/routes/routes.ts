import { healthCheck } from './health-check/route'
import { createCart } from './cart-create/route'
import { cartAddProduct } from './cart-add-product/route'
import { getCart } from './get-cart/route'

export const routes = [healthCheck, createCart, cartAddProduct, getCart]
