import { Product } from "src/main/Ecommerce/domain/Product/Product"
import { Rate } from 'src/main/Ecommerce/common/CurrencyCheckerInterface'
import { Price } from "src/main/Ecommerce/common/Price"

export const sampleListOfProducts = [
  new Product({
    id: '89316d1f-1350-44d6-9ae7-0467f9451155',
    name: 'Something',
    price: new Price(11, Rate.EUR),
    inStock: true,
    quantity: 12,
  }),
  new Product({
    id: '6da4495e-802a-4273-8bf9-f211bc1f863d',
    name: 'ABC',
    price: new Price(11, Rate.USD),
    inStock: true,
    quantity: 10,
  }),
  new Product({
    id: '603883ec-b1a9-4eb1-818a-5f8b5d59f34b',
    name: 'Sofdgdffd',
    price: new Price(777, Rate.PLN),
    inStock: true,
    quantity: 199,
  }),
]
