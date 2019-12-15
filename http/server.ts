import fastify from 'fastify'
import { routes } from './routes/routes'
import { CONFIG as C } from './config/environment'

const server = fastify({ logger: true })

for (const route of routes) {
  server.route(route)
}

server.listen(C.NODE_PORT as string, (err: any, address: any) => {
  if (err) {
    console.log(err)
    throw err
  }
  server.log.info(`server listening on ${address}`)
})
