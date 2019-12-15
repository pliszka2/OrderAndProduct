import fastify from 'fastify'
import * as http from 'http'

export const handler = (
  _req: fastify.FastifyRequest<http.IncomingMessage>,
  reply: fastify.FastifyReply<http.ServerResponse>,
) => {
  reply.send({ hello: 'world' })
}
