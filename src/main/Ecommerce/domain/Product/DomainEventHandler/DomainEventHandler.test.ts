import * as uuid from 'uuid'
import { ProductDomainEventHandler } from './DomainEventHandler'
import {
  InMemoryRepository,
} from '../../../infrastructure/persistence/InMemoryRepository'
import { Product } from '../Product'
import { ItemAddedEvent } from '../../Events/ItemAdded'
import { Rate } from '../../../common/CurrencyCheckerInterface'
import { ItemRemovedEvent } from '../../Events/ItemRemoved'
import { AbstractRepositoryInterface } from '../../../common/AbstractRepositoryInterface'

const getHandler = (productRepsitory: AbstractRepositoryInterface<Product>) =>
  new ProductDomainEventHandler(productRepsitory)

describe('Product Domain Event Handler test', () => {
  describe('On ItemAddedEvent', () => {
    it('Should decrease product quantity', async () => {
      const quantityBefore = 1

      const productId = uuid.v1()
      const product = new Product({
        id: productId,
        name: 'random',
        price: {
          currency: Rate.EUR,
          amount: 11,
        },
        inStock: false,
        quantity: quantityBefore,
      })

      const productRepository = new InMemoryRepository<Product>([product])
      const handler = getHandler(productRepository)
      const event = new ItemAddedEvent({
        cartId: 'ssss',
        productId,
        price: {
          currency: Rate.EUR,
          amount: 11,
        },
      })

      const result = await handler.handleDomainEvent(event)

      expect(result).toBe(undefined)

      const productAfter = (await productRepository.get(productId)) as Product

      expect(productAfter.availability).toBeLessThan(quantityBefore)
    })
  })

  describe('On ItemRemovedEvent', () => {
    it('Should decrease product quantity', async () => {
      const quantityBefore = 1

      const productId = uuid.v1()
      const product = new Product({
        id: productId,
        name: 'random',
        price: {
          currency: Rate.EUR,
          amount: 11,
        },
        inStock: false,
        quantity: quantityBefore,
      })

      const productRepository = new InMemoryRepository<Product>([product])
      const handler = getHandler(productRepository)
      const event = new ItemRemovedEvent({
        cartId: 'ssss',
        productId,
      })

      const result = await handler.handleDomainEvent(event)

      expect(result).toBe(undefined)

      const productAfter = (await productRepository.get(productId)) as Product

      expect(productAfter.availability).toBeGreaterThan(quantityBefore)
    })
  })
})
