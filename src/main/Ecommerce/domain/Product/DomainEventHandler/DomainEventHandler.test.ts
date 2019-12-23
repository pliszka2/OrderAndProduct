import * as uuid from 'uuid'
import { ProductDomainEventHandler } from './DomainEventHandler'
import { InMemoryRepository } from '../../../infrastructure/persistence/InMemoryRepository'
import { Product } from '../Product'
import { ItemAddedEvent } from '../../Events/ItemAdded'
import { Rate } from '../../../common/CurrencyCheckerInterface'
import { ItemRemovedEvent } from '../../Events/ItemRemoved'
import { AbstractRepositoryInterface } from '../../../common/AbstractRepositoryInterface'
import { Price } from '../../../common/Price'

const getHandler = (productRepsitory: AbstractRepositoryInterface<Product>) =>
  new ProductDomainEventHandler(productRepsitory)

describe('Product Domain Event Handler test', () => {
  describe('On ItemAddedEvent', () => {
    it('Should decrease product quantity', async () => {
      const quantityBefore = 12
      const productId = uuid.v1()
      const product = new Product({
        id: productId,
        name: 'random',
        price: new Price(11, Rate.EUR),
        inStock: false,
        quantity: quantityBefore,
      })
      const productRepository = new InMemoryRepository<Product>([product])
      const handler = getHandler(productRepository)
      const event = new ItemAddedEvent({
        cartId: 'ssss',
        productId,
        price: new Price(10, Rate.EUR),
        amount: 2,
      })

      const result = await handler.handleDomainEvent(event)

      expect(result).toBe(undefined)

      const productAfter = (await productRepository.get(productId)) as Product

      expect(productAfter.availability).toBe(quantityBefore - event.amount)
    })

    it('Should set inStock to false if quantity equals 0', async () => {
      const quantityBefore = 1
      const productId = uuid.v1()
      const price = new Price(11, Rate.EUR)
      const product = new Product({
        id: productId,
        name: 'random',
        price,
        inStock: false,
        quantity: quantityBefore,
      })
      const productRepository = new InMemoryRepository<Product>([product])
      const handler = getHandler(productRepository)
      const event = new ItemAddedEvent({
        cartId: 'ssss',
        productId,
        amount: 1,
        price,
      })
      const result = await handler.handleDomainEvent(event)

      expect(result).toBe(undefined)

      const productAfter = (await productRepository.get(productId)) as Product

      expect(productAfter.isInStock()).toBe(false)
    })
  })

  describe('On ItemRemovedEvent', () => {
    it('Should decrease product quantity', async () => {
      const quantityBefore = 10
      const productId = uuid.v1()
      const product = new Product({
        id: productId,
        name: 'random',
        price: new Price(11, Rate.EUR),
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

    it('Should set inStock to true if quantity is greater than 1', async () => {
      const quantityBefore = 0
      const productId = uuid.v1()
      const product = new Product({
        id: productId,
        name: 'random',
        price: new Price(11, Rate.EUR),
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

      expect(productAfter.isInStock()).toBe(true)
    })
  })
})
