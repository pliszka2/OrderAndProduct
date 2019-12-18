import { sampleListOfProducts } from 'assets/sample-data'
import { InMemoryRepository } from '../infrastructure/persistence/InMemoryRepository'
import { Product } from '../domain/Product/Product'
import { ProductDomainEventHandler } from '../domain/Product/DomainEventHandler/DomainEventHandler'
import { EventPublisher } from '../infrastructure/communication/EventPublisher'
import { Cart } from '../domain/Cart/Cart'
import { EcommerceApplicationService } from '../application/EcommerceApplicationService'
import { InMemoryExchangeRateChecker } from '../infrastructure/integration/InMemoryExchangeChecker'

const productRepository = new InMemoryRepository<Product>(sampleListOfProducts)
const productDomainEventHandler = new ProductDomainEventHandler(
  productRepository,
)
const eventPublisher = new EventPublisher([productDomainEventHandler])
const cartRepository = new InMemoryRepository<Cart>()
const exchangeRatesChecker = new InMemoryExchangeRateChecker()

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
  UpdateProduct: new EcommerceApplicationService.Command.UpdateProductCommandHandler(
    eventPublisher,
    productRepository,
  ),
  Query: {
    Cart: new EcommerceApplicationService.Query.CartViewModel(
      cartRepository,
      exchangeRatesChecker,
    ),
    Product: new EcommerceApplicationService.Query.ProductViewModel(
      productRepository,
    ),
  },
}
