import Product from '../models/product.js';

export const listarProductos = () => Product.find().sort({ _id: 1 }).lean();

export const buscarProducto = (id) => Product.findById(id).lean();

export const crearProducto = async (datos) => {
  const producto = await Product.create(datos);
  return producto.toObject();
};

export const actualizarProducto = (id, datos) =>
  Product.findByIdAndUpdate(id, datos, {
    new: true,
    runValidators: true,
  }).lean();

export const eliminarProducto = (id) => Product.findByIdAndDelete(id).lean();
