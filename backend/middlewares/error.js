const obtenerStatus = (err) => {
  if (err.status) return err.status;
  if (err.name === 'ValidationError' || err.name === 'CastError') return 400;
  if (err.code === 11000) return 409;
  return 500;
};

const errorMiddleware = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const statusCode = obtenerStatus(err);
  const esProduccion = process.env.NODE_ENV === 'production';

  console.error(err.message, err.stack);

  res.status(statusCode).json({
    success: false,
    data: null,
    message:
      statusCode >= 500 && esProduccion
        ? 'Ha ocurrido un error en el servidor.'
        : err.message || 'Ha ocurrido un error en el servidor.',
    stack: esProduccion ? null : err.stack,
  });
};

export default errorMiddleware;
