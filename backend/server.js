import dotenv from 'dotenv';
import express from 'express';
import logger from './middlewares/logger.js';
import errorMiddleware from './middlewares/error.js';
import healthRouter from './controllers/health.js';
import productosRouter from './controllers/productos.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(logger);
app.use('/api', healthRouter);
app.use('/api/productos', productosRouter);

app.use((request, response, next) => {
  const error = new Error(
    `Ruta no encontrada: ${request.method} ${request.path}`
  );
  error.status = 404;
  next(error);
});

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Backend escuchando en http://localhost:${port}`);
});
