const logger = (req, res, next) => {
  const url = req.originalUrl;
  const method = req.method;
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}], Llamada a ${url} con método ${method}`);
  next();
};

export default logger;
