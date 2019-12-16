import { AbstractRepositoryInterface } from 'src/main/common/InMemoryRepository'
import { Cart } from 'src/main/domain/Cart/Cart'
import { Product } from 'src/main/domain/Product/Product'
import { EventPublisherInterface } from 'src/main/common/EventPublisher'
import { Exceptions } from 'src/main/domain/Exceptions'

type AddItemToCartDTO = {
  productId: string
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

    const item = await this.productRepository.get(data.productId)

    if (!item) {
      throw new Exceptions.ItemNotFound()
    }

    const events = cart.addItem({
      itemId: data.productId,
      amount: data.amount,
      price: item.price,
      name: item.name,
    })

    await this.cartRepository.save(cart)

    this.eventPublisher.publish(events)
  }
}
