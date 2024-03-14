const createHttpError = require('http-errors');

const requestValidator = function (schema) {
  return async function (req, res, next) {
    const method = req.method;
    const dataSource = method === 'GET' ? 'query' : 'body';

    try {
      await schema.validateAsync(req[dataSource]);

      next();
    } catch (err) {
      if (err.isJoi) {
        return next(createHttpError(422, { message: err.message }));
      }

      next(createHttpError(500));
    }
  };
};

module.exports = requestValidator;
