import uuid = require('uuid')
import { Cart } from '../../domain/Cart/Cart'
import { Price } from '../../common/Price'
import { Rate } from '../../common/CurrencyCheckerInterface'
import { InMemoryExchangeRateChecker } from '../../infrastructure/integration/InMemoryExchangeChecker'

const exchangeRatesChecker = new InMemoryExchangeRateChecker()

describe('Cart query', () => {
  it('Should calculate total in EUR', async () => {
    const cartId = uuid.v1()
    const productId = uuid.v1()
    const cart = new Cart({
      id: cartId,
      items: [
        {
          productId,
          price: new Price(1, Rate.PLN),
          name: 'fancy fancy',
        },
        {
          productId,
          price: new Price(1, Rate.PLN),
          name: 'fancy fancy',
        },
        {
          productId,
          price: new Price(1, Rate.PLN),
          name: 'fancy fancy',
        },
      ],
    })

    const rates = await exchangeRatesChecker.getLatest()

    cart.calculateTotal(rates)

    expect(cart.serialize().total).not.toBe(undefined)
  })
})
