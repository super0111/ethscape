const Joi = require('joi');

const registerSchema = Joi.object({
  username: Joi.string()
    .min(3)
    .max(12)
    .required()
    .regex(/^[a-zA-Z0-9 ]+$/)
    .messages({
      'string.pattern.base': 'Allowed: latin letters, 0-9 and spaces'
    }),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(6).max(50).required(),
  recaptchaValue: Joi.string(),
})

const loginSchema = Joi.object({
  username: Joi.string()
    .min(3)
    .max(12)
    .required()
    .regex(/^[a-zA-Z0-9 ]+$/)
    .messages({
      'string.pattern.base': 'Allowed: latin letters, 0-9 and spaces'
    }),
  password: Joi.string().min(6).max(50).required()
})

module.exports = { registerSchema, loginSchema }
