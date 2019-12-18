import * as uuid from 'uuid'
import { AddItemToCartCommandHandler } from './AddItem'
import { InMemoryRepository } from '../../../../infrastructure/persistence/InMemoryRepository'
import { Cart } from '../../../../domain/Cart/Cart'
import { Product } from '../../../../domain/Product/Product'
import { Exceptions } from '../../../../domain/Exceptions'
import { Rate } from '../../../../common/CurrencyCheckerInterface'
import { MockEventPublisher } from '../../../../infrastructure/communication/MockEventPublisher'
import { ItemAddedEvent } from '../../../../domain/Events/ItemAdded'

const eventPublisher = new MockEventPublisher()
const getService = (carts: Cart[] = [], products: Product[] = []) => {
  const productRepository = new InMemoryRepository<Product>(products)

  return new AddItemToCartCommandHandler(
    eventPublisher,
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

      expect(
        service.execute({
          cartId,
          productId,
          amount: 1,
        }),
      ).rejects.toBeInstanceOf(Exceptions.CartNotFound)
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

      expect(
        service.execute({
          cartId,
          productId,
          amount: 1,
        }),
      ).rejects.toBeInstanceOf(Exceptions.ProductNotFound)
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

      expect(
        service.execute({
          cartId,
          productId,
          amount: 1,
        }),
      ).rejects.toBeInstanceOf(Exceptions.ProductNotInStock)
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

      expect(
        service.execute({
          cartId,
          productId,
          amount: 2,
        })
      ).rejects.toBeInstanceOf(Exceptions.ProductAvailabilityExceeded)

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

      await service.execute({
        cartId,
        productId,
        amount: 2,
      })

      expect(eventPublisher.events.length).toBe(1)
      expect(eventPublisher.events[0]).toBeInstanceOf(ItemAddedEvent)
    })
  })
})
