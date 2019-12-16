import { EventPublisherInterface } from '../../../common/EventPublisher'
import { AbstractRepositoryInterface } from '../../../infrastructure/persistence/InMemoryRepository'
import { Cart } from '../../../domain/Cart/Cart'
import { Product } from '../../../domain/Product/Product'
import { Exceptions } from '../../../domain/Exceptions'

type AddItemToCartDTO = {
  itemId: string
  amount: number
  cartId: string
}

export class AddItemToCartCommandHandler {
  constructor(
    private eventPublisher: EventPublisherInterface,
    private cartRepository: AbstractRepositoryInterface<Cart>,
    private productRepository: AbstractRepositoryInterface<Product>,
  ) {}

  public async execute(data: AddItemToCartDTO) {
    const cart = await this.cartRepository.get(data.cartId)

    if (!cart) {
      throw new Exceptions.CartNotFound()
    }

    const item = await this.productRepository.get(data.itemId)

    if (!item) {
      throw new Exceptions.ItemNotFound()
    }

    if (!item.isInStock()) {
      throw new Exceptions.ItemNotInStock()
    }

    cart.addItem({
      itemId: data.itemId,
      amount: data.amount,
      price: item.price,
      name: item.name,
    })

    this.eventPublisher.publish(cart.getEvents())

    cart.flushEvents()

    return this.cartRepository.save(cart)
  }
}
