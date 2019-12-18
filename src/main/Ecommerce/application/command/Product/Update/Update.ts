import { EventPublisherInterface } from '../../../../common/EventPublisherInterface'
import { AbstractRepositoryInterface } from '../../../../common/AbstractRepositoryInterface'
import { Product } from '../../../../domain/Product/Product'
import { Exceptions } from '../../../../domain/Exceptions'
import { Price } from '../../../../common/Price'

export type UpdateProductDTO = {
  productId: string
  price: Price
  name: string
}

export class UpdateProductCommandHandler {
  constructor(
    private eventPublisher: EventPublisherInterface,
    private productRepository: AbstractRepositoryInterface<Product>,
  ) {}

  public async execute(data: UpdateProductDTO) {
    const product = await this.productRepository.get(data.productId)

    if (!product) {
      throw new Exceptions.ProductNotFound()
    }

    product.update({
      price: data.price,
      name: data.name,
    })

    this.eventPublisher.publish(product.getEvents())

    product.flushEvents()

    return this.productRepository.save(product)
  }
}
