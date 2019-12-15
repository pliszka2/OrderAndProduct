import { EventPublisher } from './common/EventPublisher'
import { ProductDomainEventHandler } from './domain/Product/ProductDomainEventHandler'
import { InMemoryRepository } from './common/InMemoryRepository'
import { Cart } from './domain/Cart/Cart'
import { Product } from './domain/Product/Product'
import { EcommerceApplicationService } from './application/EcommerceApplicationService'
import { InMemoryExchangeRateChecker } from './infrastructure/integration/InMemoryExchangeChecker'
import { sampleListOfProducts} from './sample-data'

export const Ecommerce = new EcommerceApplicationService(
  new EventPublisher([new ProductDomainEventHandler()]),
  new InMemoryRepository<Cart>(),
  new InMemoryExchangeRateChecker(),
  new InMemoryRepository<Product>(sampleListOfProducts),
)
