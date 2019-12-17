import * as Joi from 'joi'

export const schema = {
  params: Joi.object({
    cartId: Joi.string().required(),
  }),
}
