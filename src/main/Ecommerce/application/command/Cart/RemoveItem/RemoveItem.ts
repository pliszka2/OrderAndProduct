import { AbstractRepositoryInterface } from '../../../../infrastructure/persistence/InMemoryRepository'
import { Cart } from '../../../../domain/Cart/Cart'
import { EventPublisherInterface } from '../../../../common/EventPublisher'
import { Exceptions } from '../../../../domain/Exceptions'

interface RemoveItemDTO {
  cartId: string
  productId: string
}

export class RemoveItemFromCartCommandHandler {
  constructor(
    private eventPublisher: EventPublisherInterface,
    private cartRepository: AbstractRepositoryInterface<Cart>,
  ) {}

  public async execute(removeItemDTO: RemoveItemDTO) {
    const cart = await this.cartRepository.get(removeItemDTO.cartId)

    if (!cart) {
      throw new Exceptions.CartNotFound()
    }

    cart.removeItem(removeItemDTO.productId)

    this.eventPublisher.publish(cart.getEvents())

    cart.flushEvents()

    await this.cartRepository.save(cart)
  }
}
