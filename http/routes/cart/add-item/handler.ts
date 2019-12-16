import fastify from 'fastify'
import * as http from 'http'
import { Ecommerce } from 'src/main/Ecommerce/presentation'

export const handler = async (
  req: fastify.FastifyRequest<http.IncomingMessage>,
  reply: fastify.FastifyReply<http.ServerResponse>,
) => {
  const result = await Ecommerce.AddItemToCart.execute({
    cartId: req.params.cartId,
    itemId: req.body.itemId,
    amount: req.body.amount,
  })

  reply.send(result)
}
