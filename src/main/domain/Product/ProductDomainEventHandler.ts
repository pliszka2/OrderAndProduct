import { DomainEvent, DomainEventType } from '../../common/DomainEvent'
import { Observer } from '../../common/ObserverInterface'
import {
  AbstractRepositoryInterface,
  InMemoryRepository,
} from 'src/main/common/InMemoryRepository'
import { Product } from './Product'
import { ItemAddedEvent } from '../Events/ItemAdded'
import { Exceptions } from '../Exceptions'

export class ProductDomainEventHandler implements Observer {
  constructor(
    private productRepository: AbstractRepositoryInterface<
      Product
    > = new InMemoryRepository<Product>(),
  ) {}

  async handleDomainEvent(event: DomainEvent) {
    switch (event.type) {
      case DomainEventType.ItemAdded:
        this.handleItemAddedEvent(event as ItemAddedEvent)
        break
      default:
        return
    }
  }

  private async handleItemAddedEvent(event: ItemAddedEvent) {
    const product = await this.productRepository.get(event.itemId)

    if (!product) {
      throw new Exceptions.ProductNotFound()
    }

    product.decreaseQuantity()

    return this.productRepository.save(product)
  }
}
