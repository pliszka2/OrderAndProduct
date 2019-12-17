import * as Joi from 'joi'

export const schema = {
  params: Joi.object({
    productId: Joi.string().required(),
  }),
  body: Joi.object({
    name: Joi.string().required(),
    price: Joi.object({
      amount: Joi.number().required(),
      currency: Joi.string().required(),
    }).required(),
  }),
}
