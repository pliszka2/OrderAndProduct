import { AbstractRepositoryInterface } from '../../infrastructure/persistence/InMemoryRepository'
import { Cart } from '../../domain/Cart/Cart'
import { Exceptions } from '../../domain/Exceptions'

export class CartViewModel {
  constructor(private cartRepository: AbstractRepositoryInterface<Cart>) {}

  async getById(cartId: string) {
    const cart = await this.cartRepository.get(cartId)

    if (!cart) {
      throw new Exceptions.CartNotFound()
    }

    return cart.serialize()
  }
}
