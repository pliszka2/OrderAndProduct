import { DomainEvent, DomainEventType } from '../../common/DomainEvent'
import { Price } from '../../common/Price'

interface ItemAddedEventInterface {
  cartId: string
  itemId: string
  amount: number
  price: Price
}

export class ItemAddedEvent extends DomainEvent {
  public cartId: string
  public itemId: string
  public price: Price

  constructor(itemAddedData: ItemAddedEventInterface) {
    super(DomainEventType.ItemAdded)

    this.cartId = itemAddedData.cartId
    this.itemId = itemAddedData.itemId
    this.price = itemAddedData.price
  }
}
