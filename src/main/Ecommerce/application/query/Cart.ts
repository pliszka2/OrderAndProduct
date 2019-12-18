import { AbstractRepositoryInterface } from '../../common/AbstractRepositoryInterface'
import { Cart } from '../../domain/Cart/Cart'
import { Exceptions } from '../../domain/Exceptions'
import { ExchangeRatesCheckerInterface } from '../../common/CurrencyCheckerInterface'

export class CartViewModel {
  constructor(
    private cartRepository: AbstractRepositoryInterface<Cart>,
    private exchangeRatesChecker: ExchangeRatesCheckerInterface,
  ) {}

  async getById(cartId: string) {
    const cart = await this.cartRepository.get(cartId)

    if (!cart) {
      throw new Exceptions.CartNotFound()
    }

    const rates = await this.exchangeRatesChecker.getLatest()

    cart.calculateTotal(rates)

    return cart.serialize()
  }
}
