import * as uuid from 'uuid'
import { Cart } from './Cart'
import { ItemAddedEvent } from '../Events/ItemAdded'

describe('Cart tests', () => {
  it('Should add an item', () => {
    const cart = new Cart({
      id: uuid.v1(),
      items: [],
    })
    const itemId = uuid.v1()
    cart.addItem({
      itemId,
      amount: 1,
      name: 'Fancy name',
      price: {
        amount: 1,
        currency: 'EUR',
      },
    })

    expect(cart.getEvents()[0]).toBeInstanceOf(ItemAddedEvent)
    expect(cart.items.length).toBe(1)
    expect(cart.items[0].itemId).toBe(itemId)
  })
})
