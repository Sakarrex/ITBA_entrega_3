import { Router } from 'express';
import validate from '../middlewares/validate.js';
import { idParamSchema, productoSchema } from '../validators/producto.js';
import {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from '../controllers/productos.controller.js';

const router = Router();

router.get('/', obtenerProductos);
router.get('/:id', validate(idParamSchema, 'params'), obtenerProductoPorId);
router.post('/', validate(productoSchema), crearProducto);
router.put(
  '/:id',
  validate(idParamSchema, 'params'),
  validate(productoSchema),
  actualizarProducto
);
router.delete('/:id', validate(idParamSchema, 'params'), eliminarProducto);

export default router;
