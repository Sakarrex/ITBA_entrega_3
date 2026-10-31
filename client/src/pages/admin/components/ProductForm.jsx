import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { CATEGORIAS, productoSchema } from '../producto-schema.js';
import './product-form.css';

const CAMPOS = [
  { name: 'nombre', label: 'Nombre', placeholder: 'Sofá Patagonia' },
  { name: 'categoria', label: 'Categoría', opciones: CATEGORIAS },
  { name: 'precio', label: 'Precio', type: 'number', step: '0.01' },
  {
    name: 'precioOriginal',
    label: 'Precio original (opcional)',
    type: 'number',
    step: '0.01',
  },
  { name: 'stock', label: 'Stock', type: 'number', step: '1' },
  {
    name: 'imagenUrl',
    label: 'URL de la imagen',
    placeholder: 'https://... o /assets/img/...',
  },
  { name: 'alt', label: 'Texto alternativo de la imagen' },
  { name: 'material', label: 'Material' },
  {
    name: 'medidas',
    label: 'Medidas',
    placeholder: '85 cm alto x 220 cm ancho',
  },
  { name: 'acabado', label: 'Acabado' },
];

function obtenerMensajeError(error) {
  return (
    error.response?.data?.message ||
    'No pudimos conectar con el servidor. Intentá de nuevo.'
  );
}

export default function ProductForm({
  titulo,
  textoBoton,
  valoresIniciales,
  onGuardar,
}) {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(productoSchema, { stripUnknown: true }),
    defaultValues: valoresIniciales,
  });

  useEffect(() => {
    reset(valoresIniciales);
  }, [valoresIniciales, reset]);

  async function enviarFormulario(datos) {
    try {
      await onGuardar(datos);
    } catch (error) {
      setError('root.serverError', { message: obtenerMensajeError(error) });
    }
  }

  return (
    <form
      className="product-form"
      onSubmit={handleSubmit(enviarFormulario)}
      noValidate
    >
      <h1 className="product-form-title">{titulo}</h1>

      {errors.root?.serverError && (
        <p className="product-form-alert" role="alert">
          {errors.root.serverError.message}
        </p>
      )}

      <div className="product-form-grid">
        {CAMPOS.map(
          ({ name, label, type = 'text', step, placeholder, opciones }) => (
            <div className="product-form-group" key={name}>
              <label htmlFor={name}>{label}</label>
              {opciones ? (
                <select
                  id={name}
                  aria-invalid={Boolean(errors[name])}
                  {...register(name)}
                >
                  <option value="">Elegí una opción</option>
                  {opciones.map((opcion) => (
                    <option key={opcion} value={opcion}>
                      {opcion}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={name}
                  type={type}
                  step={step}
                  placeholder={placeholder}
                  aria-invalid={Boolean(errors[name])}
                  {...register(name)}
                />
              )}
              {errors[name] && (
                <p className="product-form-error">{errors[name].message}</p>
              )}
            </div>
          )
        )}
      </div>

      <div className="product-form-group">
        <label htmlFor="descripcion">Descripción</label>
        <textarea
          id="descripcion"
          rows="5"
          aria-invalid={Boolean(errors.descripcion)}
          {...register('descripcion')}
        />
        {errors.descripcion && (
          <p className="product-form-error">{errors.descripcion.message}</p>
        )}
      </div>

      <label className="product-form-checkbox">
        <input type="checkbox" {...register('oferta')} />
        Producto en oferta
      </label>

      <button
        type="submit"
        className="product-form-button"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'GUARDANDO…' : textoBoton}
      </button>
    </form>
  );
}
