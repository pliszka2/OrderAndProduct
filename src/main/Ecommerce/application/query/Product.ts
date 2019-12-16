import { AbstractRepositoryInterface } from '../../infrastructure/persistence/InMemoryRepository'
import { Product } from '../../domain/Product/Product'

export class ProductViewModel {
  constructor(
    private productRepository: AbstractRepositoryInterface<Product>,
  ) {}

  async getAll() {
    const products = await this.productRepository.getAll()

    return products
  }
}
