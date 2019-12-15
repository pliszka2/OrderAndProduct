import { Price } from '../../common/Price'

export interface ProductRecord {
  id: string
  price: Price
  name: string
  inStock: boolean
  quantity: number
}

export class Product {
  public id: string
  public price: Price
  public name: string
  private inStock: boolean
  private quantity: number

  constructor(productRecord: ProductRecord) {
    this.id = productRecord.id
    this.price = productRecord.price
    this.name = productRecord.name
    this.inStock = productRecord.inStock
    this.quantity = productRecord.quantity
  }

  public decreaseQuantity() {
    this.quantity = this.quantity - 1

    if (this.quantity === 0) {
      this.inStock = false
    }
  }

  public isInStock() {
    return this.inStock
  }
}
