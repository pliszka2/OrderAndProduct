import * as uuid from 'uuid'
import { UpdateProductCommandHandler } from './Update'
import {
  InMemoryRepository,
  AbstractRepositoryInterface,
} from '../../../../infrastructure/persistence/InMemoryRepository'
import { Product } from '../../../../domain/Product/Product'
import { EventPublisher } from '../../../../common/EventPublisher'
import { Rate } from '../../../../common/CurrencyCheckerInterface'
import { Exceptions } from '../../../../domain/Exceptions'

const getService = (repository: AbstractRepositoryInterface<Product>) =>
  new UpdateProductCommandHandler(new EventPublisher([]), repository)

describe('Update product test', () => {
  describe('If Product is not found', () => {
    it('Should throw Product not found error', async () => {
      const repository = new InMemoryRepository<Product>()
      const service = getService(repository)
      const productId = uuid.v1()
      let error
      let response

      try {
        response = await service.execute({
          productId,
          name: 'new name',
          price: {
            currency: Rate.EUR,
            amount: 1
          }
        })
      } catch (err) {
        error = err
      }

      expect(error).toBeInstanceOf(Exceptions.ProductNotFound)
      expect(response).toBe(undefined)
    })
  })

  describe('If Product is found', () => {
    it('Should return undefined', async () => {
      const productId = uuid.v1()
      const product = new Product({
        quantity: 1,
        id: productId,
        name: 'new name',
        price: {
          currency: Rate.EUR,
          amount: 1
        },
        inStock: true
      })
      const repository = new InMemoryRepository<Product>([product])
      const service = getService(repository)

      let error
      let response

      try {
        response = await service.execute({
          productId,
          name: 'new name',
          price: {
            currency: Rate.EUR,
            amount: 1
          }
        })
      } catch (err) {
        error = err
      }

      expect(error).toBe(undefined)
      expect(response).toBe(undefined)
    })
  })
})
