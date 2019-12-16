import fastify from 'fastify'
import * as http from 'http'
import { Ecommerce } from 'src/main/Ecommerce/presentation'

export const handler = async (
  _req: fastify.FastifyRequest<http.IncomingMessage>,
  reply: fastify.FastifyReply<http.ServerResponse>,
) => {
  const result = await Ecommerce.CreateCart.execute()

  reply.send(result)
}
