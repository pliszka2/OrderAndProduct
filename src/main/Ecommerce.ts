import { EcommerceApplicationService } from './application/EcommerceApplicationService'
import { EventPublisher } from './common/EventPublisher'
import { ProductDomainEventHandler } from './domain/Product/ProductDomainEventHandler'
import { Cart } from './domain/Cart/Cart'
import { InMemoryRepository } from './common/InMemoryRepository'
import { Product } from './domain/Product/Product'
import { sampleListOfProducts } from 'assets/sample-data'

const productRepository = new InMemoryRepository<Product>(sampleListOfProducts)
const productDomainEventHandler = new ProductDomainEventHandler(productRepository)
const eventPublisher = new EventPublisher([productDomainEventHandler])
const cartRepository = new InMemoryRepository<Cart>()

export const Ecommerce = {
  AddItemToCart: new EcommerceApplicationService.Command.AddItemToCartCommandHandler(
    eventPublisher,
    cartRepository,
    productRepository,
  ),
  CreateCart: new EcommerceApplicationService.Command.CreateCartCommandHandler(
    cartRepository,
  ),
  Query: {
    Cart: new EcommerceApplicationService.Query.GetCart(cartRepository)
  }
}
