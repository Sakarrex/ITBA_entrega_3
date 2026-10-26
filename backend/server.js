import path from 'node:path';
import { fileURLToPath } from 'node:url';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import { connectDB } from './config/db.js';
import logger from './middlewares/logger.js';
import errorMiddleware from './middlewares/error.js';
import healthRouter from './controllers/health.js';
import productosRouter from './routes/productos.routes.js';

const directorioActual = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(directorioActual, '../.env') });

const app = express();
const port = process.env.PORT || 3000;

app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN?.split(','),
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);
app.use(express.json({ limit: '10kb' }));
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

async function iniciarServidor() {
  if (!process.env.CLIENT_ORIGIN) {
    throw new Error('Falta la variable de entorno CLIENT_ORIGIN');
  }

  await connectDB();

  app.listen(port, () => {
    console.log(`Backend escuchando en http://localhost:${port}`);
  });
}

iniciarServidor().catch((error) => {
  console.error(error);
  process.exit(1);
});
