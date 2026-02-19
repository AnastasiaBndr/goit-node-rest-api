import Joi from "joi";

export const registerLoginSchema = Joi.object({
  password: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
});
