import { DomainEvent } from '../../common/DomainEvent'
import { ExchangeRates } from '../../common/CurrencyCheckerInterface'
import { Price } from '../../common/Price'
import { ItemAddedEvent } from '../Events/ItemAdded'
import { Entity } from '../../common/Entity'
import { Exceptions } from '../Exceptions'
import { ItemRemovedEvent } from '../Events/ItemRemoved'

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
  }

  public removeItem(itemId: string) {
    const isItemInCart = this.items.find(item => item.itemId === itemId)

    if (!isItemInCart) {
      throw new Exceptions.ItemNotInCart()
    }

    this.items = [...this.items.filter(item => item.itemId !== itemId)]

    this.domainEvents.push(
      new ItemRemovedEvent({
        itemId,
        cartId: this.id,
      }),
    )
  }

  public calculateTotal(_currentRates: ExchangeRates) {
    throw new Error('Not implemented')
  }

  public getEvents() {
    return this.domainEvents
  }

  public flushEvents() {
    this.domainEvents = []
  }

  public serialize() {
    return {
      id: this.id,
      items: this.items,
    }
  }
}
