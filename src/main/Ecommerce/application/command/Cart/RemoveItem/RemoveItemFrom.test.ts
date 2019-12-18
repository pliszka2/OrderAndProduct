import { EventPublisher } from '../../../../common/EventPublisher'
import { InMemoryRepository } from '../../../../infrastructure/persistence/InMemoryRepository'
import { Cart } from '../../../../domain/Cart/Cart'
import { Product } from '../../../../domain/Product/Product'
import { ProductDomainEventHandler } from '../../../../domain/Product/DomainEventHandler/DomainEventHandler'
import uuid = require('uuid')
import { Exceptions } from '../../../../domain/Exceptions'
import { Rate } from '../../../../common/CurrencyCheckerInterface'
import { RemoveItemFromCartCommandHandler } from './RemoveItem'

const getService = (carts: Cart[] = [], products: Product[] = []) => {
  const productRepository = new InMemoryRepository<Product>(products)

  return new RemoveItemFromCartCommandHandler(
    new EventPublisher([new ProductDomainEventHandler(productRepository)]),
    new InMemoryRepository<Cart>(carts),
  )
}

describe('Remove item from Cart', () => {
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
        })
      } catch (err) {
        error = err
      }

      expect(error).toBeInstanceOf(Exceptions.CartNotFound)
      expect(response).toBe(undefined)
    })
  })

  describe('If Cart does not contain item with this productId', () => {
    it('Should throw Item not in cart error', async () => {
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
        })
      } catch (err) {
        error = err
      }

      expect(error).toBeInstanceOf(Exceptions.ItemNotInCart)
      expect(response).toBe(undefined)
    })
  })

  xdescribe('Happy path', () => {
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
        })
      } catch (err) {
        error = err
      }

      expect(error).toBe(undefined)
      expect(response).toBe(undefined)
    })
  })
})
