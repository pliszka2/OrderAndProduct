import * as _ from 'lodash'
import * as Joi from 'joi'
import { ValidationError } from 'http/error-handling/ValidationError'
import fastify from 'fastify'
import * as http from 'http'

export const validateWith = (
  schema: Joi.SchemaLike,
  options: Joi.ValidationOptions = {},
) => (
  request: fastify.FastifyRequest<http.IncomingMessage>,
  _reply: fastify.FastifyReply<http.ServerResponse>,
  done: (err?: Error) => void,
) => {
  if (!schema) {
    throw new Error('Schema is missing.')
  }

  const schemaKeys = Object.keys(schema)
  const validationObj = _.pick(request, schemaKeys)

  return Joi.validate(validationObj, schema, options, error => {
    if (error) {
      return done(new ValidationError(error.details[0].message))
    }

    return done()
  })
}
