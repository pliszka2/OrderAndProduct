import { tail } from 'lodash'
import { ExchangeRates, Rate } from '../../common/CurrencyCheckerInterface'
import { Price } from '../../common/Price'
import { ItemAddedEvent } from '../Events/ItemAdded'
import { Entity } from '../../common/Entity'
import { Exceptions } from '../Exceptions'
import { ItemRemovedEvent } from '../Events/ItemRemoved'

export interface CartRecord {
  id: string
  items: CartItemValueObject[]
}

type TotalPrice = {
  base: Rate
  amount: number
}

class CartItemValueObject {
  constructor(
    public productId: string,
    public price: Price,
    public name: string,
  ) {}
}

interface AddItem {
  productId: string
  price: Price
  amount: number
  name: string
}

export class Cart extends Entity {
  public items: CartItemValueObject[]
  private total: TotalPrice | undefined

  constructor(cartRecord: CartRecord) {
    super(cartRecord.id)

    this.items = cartRecord.items
  }

  public addItem(addItem: AddItem) {
    this.pushToItems(
      addItem.amount,
      new CartItemValueObject(addItem.productId, addItem.price, addItem.name),
    )

    this.domainEvents.push(
      new ItemAddedEvent({
        productId: addItem.productId,
        cartId: this.id,
        price: addItem.price,
      }),
    )
  }

  public removeItem(productId: string) {
    const isItemInCart = this.items.find(item => item.productId === productId)

    if (!isItemInCart) {
      throw new Exceptions.ItemNotInCart()
    }

    const itemsWithSameProductId = this.items.filter(
      item => item.productId === productId,
    )

    const itemsWithDifferentProductId = this.items.filter(
      item => item.productId !== productId,
    )

    this.items = [
      ...itemsWithDifferentProductId,
      ...tail(itemsWithSameProductId),
    ]

    this.domainEvents.push(
      new ItemRemovedEvent({
        productId,
        cartId: this.id,
      }),
    )
  }

  public calculateTotal(rates: ExchangeRates) {
    const amountInBase = this.items.reduce((acc, curr) => {
      return (acc = acc + curr.price.inBaseCurrency(rates))
    }, 0)

    this.total = {
      base: rates.base,
      amount: amountInBase,
    }
  }

  public serialize() {
    return {
      id: this.id,
      items: this.items,
      total: this.total,
    }
  }

  private pushToItems(amount: number, item: CartItemValueObject) {
    for (let i = 0; i < amount; i++) {
      this.items = [...this.items, item]
    }
  }
}
