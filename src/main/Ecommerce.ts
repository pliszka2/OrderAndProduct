import { EventPublisher } from './common/EventPublisher'
import { ProductDomainEventHandler } from './domain/Product/ProductDomainEventHandler'
import { InMemoryRepository } from './common/InMemoryRepository'
import { Cart } from './domain/Cart/Cart'
import { Product } from './domain/Product/Product'
import { EcommerceApplicationService } from './application/EcommerceApplicationService'
import { sampleListOfProducts } from './sample-data'

export const Ecommerce = {
  AddCartItemHandler: new EcommerceApplicationService.AddItemToCartCommandHandler(
    new EventPublisher([new ProductDomainEventHandler()]),
    new InMemoryRepository<Cart>(),
    new InMemoryRepository<Product>(sampleListOfProducts),
  ),
  CreateCartHandler: new EcommerceApplicationService.CreateCardCommandHandler(
    new InMemoryRepository<Cart>(),
  ),
}
