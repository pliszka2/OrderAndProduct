import * as uuid from 'uuid'
import { InMemoryRepository } from '../../../../infrastructure/persistence/InMemoryRepository'
import { Cart } from '../../../../domain/Cart/Cart'
import { Exceptions } from '../../../../domain/Exceptions'
import { RemoveItemFromCartCommandHandler } from './RemoveItem'
import { Rate } from '../../../../common/CurrencyCheckerInterface'
import { ItemRemovedEvent } from '../../../../domain/Events/ItemRemoved'
import { MockEventPublisher } from '../../../../infrastructure/communication/MockEventPublisher'

const eventPublisher = new MockEventPublisher()
const getService = (carts: Cart[] = []) => {
  return new RemoveItemFromCartCommandHandler(
    eventPublisher,
    new InMemoryRepository<Cart>(carts),
  )
}

describe('Remove item from Cart', () => {
  describe('If Cart is not found', () => {
    it('Should throw Cart not found error', async () => {
      const service = getService()
      const cartId = uuid.v1()
      const productId = uuid.v1()

      expect(
        service.execute({
          cartId,
          productId,
        }),
      ).rejects.toBeInstanceOf(Exceptions.CartNotFound)
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

      expect(
        service.execute({
          cartId,
          productId,
        }),
      ).rejects.toBeInstanceOf(Exceptions.ItemNotInCart)
    })
  })

  describe('Happy path', () => {
    it('Should emit ItemAddedEvent', async () => {
      const cartId = uuid.v1()
      const productId = uuid.v1()
      const existingCart = new Cart({
        id: cartId,
        items: [
          {
            productId,
            price: {
              amount: 1,
              currency: Rate.BGN,
            },
            name: 'fancy fancy',
          },
        ],
      })

      const service = getService([existingCart])

      await service.execute({
        cartId,
        productId,
      })

      expect(eventPublisher.events.length).toBe(1)
      expect(eventPublisher.events[0]).toBeInstanceOf(ItemRemovedEvent)
    })
  })
})
