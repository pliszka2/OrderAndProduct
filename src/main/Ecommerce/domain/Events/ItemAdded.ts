import { DomainEvent, DomainEventType } from '../../common/DomainEvent'
import { Price } from '../../common/Price'

interface ItemAddedEventInterface {
  cartId: string
  productId: string
  price: Price
  amount: number
}

export class ItemAddedEvent extends DomainEvent {
  public cartId: string
  public productId: string
  public price: Price
  public amount: number

  constructor(itemAddedData: ItemAddedEventInterface) {
    super(DomainEventType.ItemAdded)

    this.cartId = itemAddedData.cartId
    this.productId = itemAddedData.productId
    this.price = itemAddedData.price
    this.amount = itemAddedData.amount
  }
}
