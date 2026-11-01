import * as yup from 'yup';

const texto = (mensaje) => yup.string().trim().required(mensaje);

const numero = (mensaje) =>
  yup
    .number()
    .typeError(mensaje)
    .min(0, 'No puede ser negativo.')
    .required(mensaje);

export const CATEGORIAS = ['Living', 'Comedor', 'Dormitorio', 'Estudio'];

export const VALORES_INICIALES = {
  nombre: '',
  categoria: '',
  precioOriginal: '',
  precioOferta: '',
  oferta: false,
  stock: '',
  imagenUrl: '',
  alt: '',
  descripcion: '',
  material: '',
  medidas: '',
  acabado: '',
};

export const productoSchema = yup.object({
  nombre: texto('Ingresá el nombre.'),
  categoria: yup
    .string()
    .oneOf(CATEGORIAS, 'Elegí una categoría.')
    .required('Elegí una categoría.'),
  precioOriginal: yup
    .number()
    .typeError('Ingresá un precio original válido.')
    .min(0, 'No puede ser negativo.')
    .required('Ingresá un precio original válido.'),
  oferta: yup.boolean().default(false),
  precioOferta: yup
    .number()
    .transform((valor, original) => (original === '' ? null : valor))
    .typeError('Ingresá un precio de oferta válido.')
    .when('oferta', {
      is: true,
      then: (schema) =>
        schema
          .min(0, 'El precio de oferta no puede ser negativo.')
          .lessThan(
            yup.ref('precioOriginal'),
            'El precio de oferta debe ser menor al precio base.'
          )
          .required('Ingresá el precio final de oferta.'),
      otherwise: (schema) => schema.nullable(),
    }),
  stock: numero('Ingresá el stock.').integer('El stock debe ser un entero.'),
  imagenUrl: texto('Ingresá la URL de la imagen.'),
  alt: texto('Ingresá un texto alternativo para la imagen.'),
  descripcion: texto('Ingresá una descripción.'),
  material: texto('Ingresá el material.'),
  medidas: texto('Ingresá las medidas.'),
  acabado: texto('Ingresá el acabado.'),
});
