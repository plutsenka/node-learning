const Joi = require('joi');

const userDataRequestSchema = Joi.object({
  user_id: Joi.number().required(),
  user_name: Joi.string().min(1).required(),
  api_key: Joi.string().alphanum().max(10).required(),
});

module.exports = userDataRequestSchema;
