import fastify from 'fastify'
import * as http from 'http'
import { Ecommerce } from 'src/main/Ecommerce/presentation'

export const handler = async (
  req: fastify.FastifyRequest<http.IncomingMessage>,
  reply: fastify.FastifyReply<http.ServerResponse>,
) => {
  const result = await Ecommerce.UpdateProduct.execute({
    productId: req.params.productId,
    name: req.body.name,
    price: req.body.price,
  })

  reply.send(result)
}
