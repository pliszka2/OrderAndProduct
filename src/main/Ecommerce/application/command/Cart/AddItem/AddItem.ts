import { EventPublisherInterface } from '../../../../common/EventPublisher'
import { AbstractRepositoryInterface } from '../../../../infrastructure/persistence/InMemoryRepository'
import { Cart } from '../../../../domain/Cart/Cart'
import { Product } from '../../../../domain/Product/Product'
import { Exceptions } from '../../../../domain/Exceptions'

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

    const product = await this.productRepository.get(data.productId)

    if (!product) {
      throw new Exceptions.ProductNotFound()
    }

    if (!product.isInStock()) {
      throw new Exceptions.ProductNotInStock()
    }

    if (product.availability < data.amount) {
      throw new Exceptions.ProductAvailabilityExceeded()
    }

    cart.addItem({
      productId: product.id,
      amount: data.amount,
      price: product.price,
      name: product.name,
    })

    this.eventPublisher.publish(cart.getEvents())

    cart.flushEvents()

    return this.cartRepository.save(cart)
  }
}
