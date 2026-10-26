const validate =
  (schema, source = 'body') =>
  async (request, response, next) => {
    try {
      const valor = await schema.validate(request[source], {
        abortEarly: false,
        stripUnknown: true,
      });

      if (source === 'body') {
        request.body = valor;
      }

      next();
    } catch (error) {
      if (error.name === 'ValidationError') {
        const errorValidacion = new Error(error.errors.join('. '));
        errorValidacion.status = 400;
        return next(errorValidacion);
      }

      next(error);
    }
  };

export default validate;
