// eslint-disable-next-line
const errorHandler = (err, req, res, next) => {
  const errorCode = err.statusCode || 500;
  res.status(errorCode).json({
    code: errorCode,
    message: err.message,
    errors: err.errors,
  });
};

module.exports = errorHandler;
