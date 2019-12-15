import * as uuid from 'uuid'
import { EventPublisher } from './common/EventPublisher'
import { ProductDomainEventHandler } from './domain/Product/ProductDomainEventHandler'
import { InMemoryRepository } from './common/InMemoryRepository'
import { Cart } from './domain/Cart/Cart'
import { Product } from './domain/Product/Product'
import { EcommerceApplicationService } from './application/EcommerceApplicationService'
import { InMemoryExchangeRateChecker } from './infrastructure/integration/InMemoryExchangeChecker'

const sampleListOfProducts = [
  new Product({
    id: uuid.v1(),
    name: 'Something',
    price: {
      currency: 'EUR',
      amount: 230,
    },
    inStock: true,
    quantity: 12,
  }),
  new Product({
    id: uuid.v1(),
    name: 'ABC',
    price: {
      currency: 'EUR',
      amount: 111,
    },
    inStock: true,
    quantity: 1,
  }),
  new Product({
    id: uuid.v1(),
    name: 'Sofdgdffd',
    price: {
      currency: 'EUR',
      amount: 888,
    },
    inStock: true,
    quantity: 199,
  }),
]

export const Ecommerce = new EcommerceApplicationService(
  new EventPublisher([new ProductDomainEventHandler()]),
  new InMemoryRepository<Cart>(),
  new InMemoryExchangeRateChecker(),
  new InMemoryRepository<Product>(sampleListOfProducts),
)
