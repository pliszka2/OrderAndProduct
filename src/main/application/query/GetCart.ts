import { AbstractRepositoryInterface } from 'src/main/common/InMemoryRepository'
import { Cart } from 'src/main/domain/Cart/Cart'
import { Exceptions } from 'src/main/domain/Exceptions'

export class GetCart {
  constructor(private cartRepository: AbstractRepositoryInterface<Cart>) {}

  async getById(cartId: string) {
    const cart = await this.cartRepository.get(cartId)

    if (!cart) {
      throw new Exceptions.CartNotFound()
    }

    return cart
  }
}
