import * as Joi from 'joi'

export const schema = {
  params: Joi.object({
    cartId: Joi.string().required(),
  }),
  body: Joi.object({
    productId: Joi.string().required(),
    amount: Joi.number().required(),
  }),
}
