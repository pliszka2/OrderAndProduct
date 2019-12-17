import * as uuid from 'uuid'
import { AbstractRepositoryInterface } from '../../../../infrastructure/persistence/InMemoryRepository'
import { Cart } from '../../../../domain/Cart/Cart'

export class CreateCartCommandHandler {
  constructor(private cartRepository: AbstractRepositoryInterface<Cart>) {}

  public async execute() {
    const cart = new Cart({
      id: uuid.v1(),
      items: [],
    })

    await this.cartRepository.save(cart)

    return cart.id
  }
}
