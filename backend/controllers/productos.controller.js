import * as productosService from '../services/productos.service.js';

const enviarRespuesta = (response, status, data, message) =>
  response.status(status).json({ success: true, data, message });

const crearErrorNoEncontrado = (id) => {
  const error = new Error(`Producto con id ${id} no encontrado`);
  error.status = 404;
  return error;
};

export async function obtenerProductos(request, response, next) {
  try {
    const productos = await productosService.listarProductos();
    enviarRespuesta(
      response,
      200,
      productos,
      'Productos obtenidos correctamente'
    );
  } catch (error) {
    next(error);
  }
}

export async function obtenerProductoPorId(request, response, next) {
  try {
    const { id } = request.params;
    const producto = await productosService.buscarProducto(id);

    if (!producto) {
      return next(crearErrorNoEncontrado(id));
    }

    enviarRespuesta(response, 200, producto, 'Producto obtenido correctamente');
  } catch (error) {
    next(error);
  }
}

export async function crearProducto(request, response, next) {
  try {
    const producto = await productosService.crearProducto(request.body);
    enviarRespuesta(response, 201, producto, 'Producto creado correctamente');
  } catch (error) {
    next(error);
  }
}

export async function actualizarProducto(request, response, next) {
  try {
    const { id } = request.params;
    const producto = await productosService.actualizarProducto(
      id,
      request.body
    );

    if (!producto) {
      return next(crearErrorNoEncontrado(id));
    }

    enviarRespuesta(
      response,
      200,
      producto,
      'Producto actualizado correctamente'
    );
  } catch (error) {
    next(error);
  }
}

export async function eliminarProducto(request, response, next) {
  try {
    const { id } = request.params;
    const producto = await productosService.eliminarProducto(id);

    if (!producto) {
      return next(crearErrorNoEncontrado(id));
    }

    enviarRespuesta(
      response,
      200,
      producto,
      'Producto eliminado correctamente'
    );
  } catch (error) {
    next(error);
  }
}
