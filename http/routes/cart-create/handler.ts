import fastify from 'fastify'
import * as http from 'http'
import { Ecommerce } from '../../../src/main/Ecommerce'
import { Cart } from 'src/main/domain/Cart/Cart'
import { InMemoryRepository } from 'src/main/common/InMemoryRepository'

export const handler = async (
  _req: fastify.FastifyRequest<http.IncomingMessage>,
  reply: fastify.FastifyReply<http.ServerResponse>,
) => {
  const result = await new Ecommerce.CreateCartHandler(
    new InMemoryRepository<Cart>(),
  ).execute()

  reply.send(result)
}
