import { sampleListOfProducts } from 'assets/sample-data'
import { InMemoryRepository } from '../infrastructure/persistence/InMemoryRepository'
import { Product } from '../domain/Product/Product'
import { ProductDomainEventHandler } from '../domain/Product/DomainEventHandler'
import { EventPublisher } from '../common/EventPublisher'
import { Cart } from '../domain/Cart/Cart'
import { EcommerceApplicationService } from '../application/EcommerceApplicationService'

const productRepository = new InMemoryRepository<Product>(sampleListOfProducts)
const productDomainEventHandler = new ProductDomainEventHandler(
  productRepository,
)
const eventPublisher = new EventPublisher([productDomainEventHandler])
const cartRepository = new InMemoryRepository<Cart>()

// this is a temporary solution. The object has to be constructed in http because it consumes it

export const Ecommerce = {
  AddItemToCart: new EcommerceApplicationService.Command.AddItemToCartCommandHandler(
    eventPublisher,
    cartRepository,
    productRepository,
  ),
  RemoveItemFromCart: new EcommerceApplicationService.Command.RemoveItemFromCartCommandHandler(
    eventPublisher,
    cartRepository,
  ),
  CreateCart: new EcommerceApplicationService.Command.CreateCartCommandHandler(
    cartRepository,
  ),
  Query: {
    Cart: new EcommerceApplicationService.Query.CartViewModel(cartRepository),
    Product: new EcommerceApplicationService.Query.ProductViewModel(
      productRepository,
    ),
  },
}
