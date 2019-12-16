import fastify from 'fastify'
import * as http from 'http'
import { Ecommerce } from '../../../src/main/Ecommerce'

export const handler = async (
  req: fastify.FastifyRequest<http.IncomingMessage>,
  reply: fastify.FastifyReply<http.ServerResponse>,
) => {
  const result = await Ecommerce.Query.Cart.getById(req.params.cartId)

  reply.send(JSON.stringify(result))
}
