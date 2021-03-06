import { DomainEvent, DomainEventType } from '../../common/DomainEvent'

interface ItemRemovedEventInterface {
  cartId: string
  productId: string
}

export class ItemRemovedEvent extends DomainEvent {
  public cartId: string
  public itemId: string

  constructor(itemAddedData: ItemRemovedEventInterface) {
    super(DomainEventType.ItemRemoved)

    this.cartId = itemAddedData.cartId
    this.itemId = itemAddedData.productId
  }
}
