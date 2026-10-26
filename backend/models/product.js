import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
      min: 1,
    },
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    categoria: {
      type: String,
      required: true,
      trim: true,
    },
    precio: {
      type: Number,
      required: true,
      min: 0,
    },
    precioOriginal: {
      type: Number,
      default: null,
      min: 0,
    },
    oferta: {
      type: Boolean,
      required: true,
    },
    imagen: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
    material: {
      type: String,
      required: true,
    },
    medidas: {
      type: String,
      required: true,
    },
    acabado: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      validate: Number.isInteger,
    },
  },
  {
    collection: 'productos',
    versionKey: false,
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
