const errorMiddleware = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const statusCode = err.status || 500;

  console.error(err.message, err.stack);

  res.status(statusCode).json({
    success: false,
    data: null,
    message: err.message || 'Ha ocurrido un error en el servidor.',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export default errorMiddleware;
