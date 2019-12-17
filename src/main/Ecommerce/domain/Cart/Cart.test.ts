import * as uuid from 'uuid'
import { Cart } from './Cart'
import { ItemAddedEvent } from '../Events/ItemAdded'
import { Rate } from '../../common/CurrencyCheckerInterface'

describe('Cart tests', () => {
  it('Should add an item', () => {
    const cart = new Cart({
      id: uuid.v1(),
      items: [],
    })
    const productId = uuid.v1()
    cart.addItem({
      productId,
      amount: 1,
      name: 'Fancy name',
      price: {
        amount: 1,
        currency: Rate.EUR,
      },
    })

    expect(cart.items.length).toBe(1)
    expect(cart.items[0].productId).toBe(productId)
  })

  it('Should emit ItemAddedEvent', () => {
    const cart = new Cart({
      id: uuid.v1(),
      items: [],
    })
    const productId = uuid.v1()
    cart.addItem({
      productId,
      amount: 1,
      name: 'Fancy name',
      price: {
        amount: 1,
        currency: Rate.EUR,
      },
    })

    expect(cart.getEvents()[0]).toBeInstanceOf(ItemAddedEvent)
    expect(cart.items.length).toBe(1)
    expect(cart.items[0].productId).toBe(productId)
  })
})
