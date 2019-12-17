import { AddItemToCartCommandHandler } from './AddItem'
import { EventPublisher } from '../../../../common/EventPublisher'
import { InMemoryRepository } from '../../../../infrastructure/persistence/InMemoryRepository'
import { Cart } from '../../../../domain/Cart/Cart'
import { Product } from '../../../../domain/Product/Product'
import { ProductDomainEventHandler } from '../../../../domain/Product/DomainEventHandler/DomainEventHandler'
import uuid = require('uuid')
import { Exceptions } from '../../../../domain/Exceptions'
import { Rate } from '../../../../common/CurrencyCheckerInterface'

const getService = (carts: Cart[] = [], products: Product[] = []) => {
  const productRepository = new InMemoryRepository<Product>(products)

  return new AddItemToCartCommandHandler(
    new EventPublisher([new ProductDomainEventHandler(productRepository)]),
    new InMemoryRepository<Cart>(carts),
    productRepository,
  )
}

describe('Add Item to Cart', () => {
  describe('If Cart is not found', () => {
    it('Should throw Cart not found error', async () => {
      const service = getService()
      const cartId = uuid.v1()
      const productId = uuid.v1()

      let error
      let response

      try {
        response = await service.execute({
          cartId,
          productId,
          amount: 1,
        })
      } catch (err) {
        error = err
      }

      expect(error).toBeInstanceOf(Exceptions.CartNotFound)
      expect(response).toBe(undefined)
    })
  })

  describe('If product is not found', () => {
    it('Should throw Product not found error', async () => {
      const cartId = uuid.v1()
      const existingCart = new Cart({
        id: cartId,
        items: [],
      })

      const service = getService([existingCart])

      const productId = uuid.v1()

      let error
      let response

      try {
        response = await service.execute({
          cartId,
          productId,
          amount: 1,
        })
      } catch (err) {
        error = err
      }

      expect(error).toBeInstanceOf(Exceptions.ProductNotFound)
      expect(response).toBe(undefined)
    })
  })

  describe('If product is not in stock', () => {
    it('Should throw Product not in stock error', async () => {
      const cartId = uuid.v1()
      const existingCart = new Cart({
        id: cartId,
        items: [],
      })
      const productId = uuid.v1()
      const product = new Product({
        id: productId,
        name: 'random',
        price: {
          currency: Rate.EUR,
          amount: 11,
        },
        inStock: false,
        quantity: 0,
      })

      const service = getService([existingCart], [product])

      let error
      let response

      try {
        response = await service.execute({
          cartId,
          productId,
          amount: 1,
        })
      } catch (err) {
        error = err
      }

      expect(error).toBeInstanceOf(Exceptions.ProductNotInStock)
      expect(response).toBe(undefined)
    })
  })

  describe('If product availability is less than amount required', () => {
    it('Should throw ProductAvailabilityExceeded error', async () => {
      const cartId = uuid.v1()
      const existingCart = new Cart({
        id: cartId,
        items: [],
      })
      const productId = uuid.v1()
      const product = new Product({
        id: productId,
        name: 'random',
        price: {
          currency: Rate.EUR,
          amount: 11,
        },
        inStock: true,
        quantity: 1,
      })

      const service = getService([existingCart], [product])

      let error
      let response

      try {
        response = await service.execute({
          cartId,
          productId,
          amount: 2,
        })
      } catch (err) {
        error = err
      }

      expect(error).toBeInstanceOf(Exceptions.ProductAvailabilityExceeded)
      expect(response).toBe(undefined)
    })
  })

  describe('Happy path', () => {
    it('Should emit ItemAddedEvent', async () => {
      const cartId = uuid.v1()
      const existingCart = new Cart({
        id: cartId,
        items: [],
      })
      const productId = uuid.v1()
      const product = new Product({
        id: productId,
        name: 'random',
        price: {
          currency: Rate.EUR,
          amount: 11,
        },
        inStock: true,
        quantity: 10,
      })

      const service = getService([existingCart], [product])

      let error
      let response

      try {
        response = await service.execute({
          cartId,
          productId,
          amount: 2,
        })
      } catch (err) {
        error = err
      }

      expect(error).toBe(undefined)
      expect(response).toBe(undefined)
    })
  })
})
