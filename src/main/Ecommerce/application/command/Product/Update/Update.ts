import { EventPublisherInterface } from '../../../../common/EventPublisher'
import { AbstractRepositoryInterface } from '../../../../infrastructure/persistence/InMemoryRepository'
import { Product } from '../../../../domain/Product/Product'
import { Exceptions } from '../../../../domain/Exceptions'
import { Price } from 'src/main/Ecommerce/common/Price'

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
    console.log(data)
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