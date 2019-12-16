import { Product } from "src/main/Ecommerce/domain/Product/Product"

export const sampleListOfProducts = [
  new Product({
    id: '89316d1f-1350-44d6-9ae7-0467f9451155',
    name: 'Something',
    price: {
      currency: 'EUR',
      amount: 230,
    },
    inStock: true,
    quantity: 12,
  }),
  new Product({
    id: '6da4495e-802a-4273-8bf9-f211bc1f863d',
    name: 'ABC',
    price: {
      currency: 'EUR',
      amount: 111,
    },
    inStock: true,
    quantity: 1,
  }),
  new Product({
    id: '603883ec-b1a9-4eb1-818a-5f8b5d59f34b',
    name: 'Sofdgdffd',
    price: {
      currency: 'EUR',
      amount: 888,
    },
    inStock: true,
    quantity: 199,
  }),
]
