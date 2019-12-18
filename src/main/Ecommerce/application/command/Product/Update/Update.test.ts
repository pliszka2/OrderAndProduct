import * as uuid from 'uuid'
import { UpdateProductCommandHandler } from './Update'
import { InMemoryRepository } from '../../../../infrastructure/persistence/InMemoryRepository'
import { Product } from '../../../../domain/Product/Product'
import { EventPublisher } from '../../../../infrastructure/communication/EventPublisher'
import { Rate } from '../../../../common/CurrencyCheckerInterface'
import { Exceptions } from '../../../../domain/Exceptions'
import { AbstractRepositoryInterface } from '../../../../common/AbstractRepositoryInterface'
import { Price } from '../../../../common/Price'

const getService = (repository: AbstractRepositoryInterface<Product>) =>
  new UpdateProductCommandHandler(new EventPublisher([]), repository)

describe('Update product test', () => {
  describe('If Product is not found', () => {
    it('Should throw Product not found error', async () => {
      const repository = new InMemoryRepository<Product>()
      const service = getService(repository)
      const productId = uuid.v1()

      expect(
        service.execute({
          productId,
          name: 'new name',
          price: new Price(1, Rate.EUR),
        }),
      ).rejects.toBeInstanceOf(Exceptions.ProductNotFound)
    })
  })

  describe('If Product is found', () => {
    it('Should return undefined', async () => {
      const productId = uuid.v1()
      const product = new Product({
        quantity: 1,
        id: productId,
        name: 'new name',
        price: new Price(1, Rate.EUR),
        inStock: true,
      })
      const repository = new InMemoryRepository<Product>([product])
      const service = getService(repository)

      expect(
        service.execute({
          productId,
          name: 'new name',
          price: new Price(1, Rate.EUR),
        }),
      ).resolves.toBe(undefined)
    })
  })
})
