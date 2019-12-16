import { DomainEvent, DomainEventType } from '../../common/DomainEvent'
import { Observer } from '../../common/ObserverInterface'
import { Product } from './Product'
import { ItemAddedEvent } from '../Events/ItemAdded'
import { Exceptions } from '../Exceptions'
import { ItemRemovedEvent } from '../Events/ItemRemoved'
import { AbstractRepositoryInterface } from '../../infrastructure/persistence/InMemoryRepository'

export class ProductDomainEventHandler implements Observer {
  constructor(
    private productRepository: AbstractRepositoryInterface<Product>,
  ) {}

  async handleDomainEvent(event: DomainEvent) {
    switch (event.type) {
      case DomainEventType.ItemAdded:
        return this.handleItemAddedEvent(event as ItemAddedEvent)
      case DomainEventType.ItemRemoved:
        return this.handleItemRemovedEvent(event as ItemRemovedEvent)
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

  private async handleItemRemovedEvent(event: ItemRemovedEvent) {
    const product = await this.productRepository.get(event.itemId)

    if (!product) {
      throw new Exceptions.ProductNotFound()
    }

    product.increaseQuantity()

    return this.productRepository.save(product)
  }
}
