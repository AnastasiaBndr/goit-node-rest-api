import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  phone: Joi.string().min(3).max(30).required(),
  email: Joi.string().min(3).max(30).required(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  phone: Joi.string().min(3).max(30),
  email: Joi.string().min(3).max(30),
})
