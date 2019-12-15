import { DomainEvent } from '../../common/DomainEvent'
import { ExchangeRates } from '../../common/CurrencyCheckerInterface'
import { Price } from '../../common/Price'
import { ItemAddedEvent } from '../Events/ItemAdded'
import { Entity } from '../../common/Entity'

export interface CartRecord {
  id: string
  items: CartItemValueObject[]
}

interface CartItemValueObject {
  itemId: string
  price: Price
  name: string
  amount: number
}

export class Cart extends Entity {
  public items: CartItemValueObject[]
  private domainEvents: DomainEvent[]

  constructor(cartRecord: CartRecord) {
    super(cartRecord.id)

    this.items = cartRecord.items
    this.domainEvents = []
  }

  public addItem(item: CartItemValueObject) {
    this.items = [...this.items, item]

    this.domainEvents.push(
      new ItemAddedEvent({
        itemId: item.itemId,
        cartId: this.id,
        amount: item.amount,
        price: item.price,
      }),
    )

    return this.domainEvents
  }

  public removeItem() {
    throw new Error('Not implemented')
  }

  public calculateTotal(_currentRates: ExchangeRates) {
    throw new Error('Not implemented')
  }
}
