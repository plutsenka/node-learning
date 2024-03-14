const Joi = require('joi');

const meteorsRequestSchema = Joi.object({
  start_date: Joi.date().less('now').iso(),
  end_date: Joi.date().less('now').iso(),
  count: Joi.boolean().sensitive(),
  were_dangerous_meteors: Joi.boolean().sensitive(),
});

module.exports = meteorsRequestSchema;
