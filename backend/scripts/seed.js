import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { fileURLToPath } from 'node:url';
import { PRODUCTOS } from '../data/productos.js';

dotenv.config({
  path: fileURLToPath(new URL('../../.env', import.meta.url)),
});

const seedProducts = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('Falta definir MONGODB_URI en el archivo .env');
  }

  const connection = mongoose.createConnection(uri);

  try {
    await connection.asPromise();

    const operations = PRODUCTOS.map((producto) => {
      const datos = { ...producto, activo: true };
      delete datos._id;

      return {
        updateOne: {
          filter: { nombre: datos.nombre },
          update: { $set: datos },
          upsert: true,
        },
      };
    });

    const result = await connection
      .collection('productos')
      .bulkWrite(operations);

    console.log(
      `Seed completado: ${result.upsertedCount} insertados, ${result.modifiedCount} actualizados.`
    );
  } catch (error) {
    console.error('No se pudo cargar el catálogo en MongoDB:', error);
    process.exitCode = 1;
  } finally {
    await connection.close();
  }
};

await seedProducts();
