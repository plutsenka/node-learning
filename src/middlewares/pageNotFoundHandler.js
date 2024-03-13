const createHttpError = require('http-errors');

const pageNotFoundHandler = (req, res, next) => {
  next(createHttpError(404, { message: 'Page not found' }));
};

module.exports = pageNotFoundHandler;
