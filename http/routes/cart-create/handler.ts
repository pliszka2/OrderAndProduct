import fastify from 'fastify'
import * as http from 'http'
import { Ecommerce } from '../../../src/main/Ecommerce'

export const handler = (
  _req: fastify.FastifyRequest<http.IncomingMessage>,
  reply: fastify.FastifyReply<http.ServerResponse>,
) => {
  Ecommerce.createCart()

  reply.send()
}
