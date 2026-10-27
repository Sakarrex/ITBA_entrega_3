// src/services/productos.js
import api from './api';

// Obtener todos los productos
export const getProductos = async () => {
  const response = await api.get('/productos');
  return response.data;
};

// Obtener un producto por su _id (MongoDB)
export const getProducto = async (id) => {
  const response = await api.get(`/productos/${id}`);
  return response.data;
};

// Crear un producto
export const crearProducto = async (productoData) => {
  const response = await api.post('/productos', productoData);
  return response.data;
};

// Actualizar un producto
export const actualizarProducto = async (id, productoData) => {
  const response = await api.put(`/productos/${id}`, productoData);
  return response.data;
};

// Eliminar un producto
export const eliminarProducto = async (id) => {
  const response = await api.delete(`/productos/${id}`);
  return response.data;
};

// Exportamos también la función antigua para mantener compatibilidad con App.jsx
export const obtenerProductos = getProductos;
