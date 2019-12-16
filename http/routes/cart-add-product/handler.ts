import fastify from 'fastify'
import * as http from 'http'
import { Ecommerce } from '../../../src/main/Ecommerce'
import { Cart } from 'src/main/domain/Cart/Cart'
import { InMemoryRepository } from 'src/main/common/InMemoryRepository'
import { EventPublisher } from 'src/main/common/EventPublisher'
import { ProductDomainEventHandler } from 'src/main/domain/Product/ProductDomainEventHandler'
import { Product } from 'src/main/domain/Product/Product'
import { sampleListOfProducts } from 'assets/sample-data'

export const handler = async (
  _req: fastify.FastifyRequest<http.IncomingMessage>,
  reply: fastify.FastifyReply<http.ServerResponse>,
) => {
  const result = await new Ecommerce.AddItemToCartCommandHandler(
    new EventPublisher([new ProductDomainEventHandler()]),
    new InMemoryRepository<Cart>(),
    new InMemoryRepository<Product>(sampleListOfProducts),
  )

  reply.send(result)
}
