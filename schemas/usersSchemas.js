import Joi from "joi";

export const contactAuthSchema = Joi.object({
  password: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
});

export const updateSubscriptionSchema = Joi.object({
  subscription: Joi.valid("starter", "pro", "business").required(),
});
