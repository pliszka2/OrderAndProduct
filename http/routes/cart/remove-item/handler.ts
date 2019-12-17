import fastify from 'fastify'
import * as http from 'http'
import { Ecommerce } from 'src/main/Ecommerce/presentation'

export const handler = async (
  req: fastify.FastifyRequest<http.IncomingMessage>,
  reply: fastify.FastifyReply<http.ServerResponse>,
) => {
  await Ecommerce.RemoveItemFromCart.execute({
    cartId: req.params.cartId,
    productId: req.body.productId,
  })

  reply.send()
}
