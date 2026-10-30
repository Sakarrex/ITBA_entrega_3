import Product from '../models/product.js';

const soloActivos = { activo: { $ne: false } };

export const listarProductos = () =>
  Product.find(soloActivos).sort({ _id: 1 }).lean();

export const buscarProducto = (id) =>
  Product.findOne({ _id: id, ...soloActivos }).lean();

export const crearProducto = async (datos) => {
  const producto = await Product.create(datos);
  return producto.toObject();
};

export const actualizarProducto = (id, datos) =>
  Product.findOneAndUpdate({ _id: id, ...soloActivos }, datos, {
    new: true,
    runValidators: true,
  }).lean();

export const eliminarProducto = (id) =>
  Product.findOneAndUpdate(
    { _id: id, ...soloActivos },
    { activo: false },
    { new: true }
  ).lean();
