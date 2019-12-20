import { Price } from '../../common/Price'
import { Entity } from '../../common/Entity'

type UpdateProduct = {
  price: Price
  name: string
}

export interface ProductRecord {
  id: string
  price: Price
  name: string
  inStock: boolean
  quantity: number
}

export class Product extends Entity {
  public price: Price
  public name: string
  private inStock: boolean
  private quantity: number

  constructor(productRecord: ProductRecord) {
    super(productRecord.id)

    this.price = productRecord.price
    this.name = productRecord.name
    this.inStock = productRecord.inStock
    this.quantity = productRecord.quantity
  }

  public decreaseQuantity() {
    this.quantity = Number(this.quantity) - 1

    if (this.quantity === 0) {
      this.inStock = false
    }
  }

  public increaseQuantity() {
    this.quantity = Number(this.quantity) + 1

    if (this.quantity > 0) {
      this.inStock = true
    }
  }

  public update(updateData: UpdateProduct) {
    this.name = updateData.name
    this.price = new Price(updateData.price.amount, updateData.price.currency)
  }

  public isInStock() {
    return this.inStock
  }

  get availability() {
    return this.quantity
  }
}
