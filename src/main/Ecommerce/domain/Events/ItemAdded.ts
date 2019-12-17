import { DomainEvent, DomainEventType } from '../../common/DomainEvent'
import { Price } from '../../common/Price'

interface ItemAddedEventInterface {
  cartId: string
  productId: string
  price: Price
}

export class ItemAddedEvent extends DomainEvent {
  public cartId: string
  public productId: string
  public price: Price

  constructor(itemAddedData: ItemAddedEventInterface) {
    super(DomainEventType.ItemAdded)

    this.cartId = itemAddedData.cartId
    this.productId = itemAddedData.productId
    this.price = itemAddedData.price
  }
}
