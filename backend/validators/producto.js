import * as yup from 'yup';

const texto = (nombre) =>
  yup.string().trim().required(`${nombre} es obligatorio`);

export const idParamSchema = yup.object({
  id: yup
    .string()
    .matches(/^[0-9a-fA-F]{24}$/, 'El id no es válido')
    .required(),
});

export const productoSchema = yup.object({
  nombre: texto('El nombre'),
  categoria: texto('La categoría'),
  precio: yup
    .number()
    .typeError('El precio debe ser un número')
    .min(0, 'El precio no puede ser negativo')
    .required('El precio es obligatorio'),
  precioOriginal: yup
    .number()
    .typeError('El precio original debe ser un número')
    .min(0, 'El precio original no puede ser negativo')
    .nullable()
    .default(null),
  oferta: yup
    .boolean()
    .typeError('Oferta debe ser verdadero o falso')
    .required('Oferta es obligatorio'),
  imagenUrl: texto('La URL de la imagen'),
  alt: texto('El texto alternativo'),
  descripcion: texto('La descripción'),
  material: texto('El material'),
  medidas: texto('Las medidas'),
  acabado: texto('El acabado'),
  stock: yup
    .number()
    .typeError('El stock debe ser un número')
    .integer('El stock debe ser un entero')
    .min(0, 'El stock no puede ser negativo')
    .required('El stock es obligatorio'),
});
