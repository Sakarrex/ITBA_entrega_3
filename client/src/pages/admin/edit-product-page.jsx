import { useEffect, useState } from 'react';
import {
  Link,
  useNavigate,
  useOutletContext,
  useParams,
} from 'react-router-dom';

import ProductForm from './components/ProductForm.jsx';
import { actualizarProducto, getProducto } from '../../services/productos.js';

export default function EditProductPage() {
  const { productoId } = useParams();
  const { recargarProductos } = useOutletContext();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function cargarProducto() {
      try {
        const respuesta = await getProducto(productoId);
        setProducto({
          ...respuesta.data,
          precioOriginal: respuesta.data.precioOriginal ?? '',
        });
      } catch (err) {
        setError(
          err.response?.data?.message || 'No pudimos cargar el producto.'
        );
      } finally {
        setCargando(false);
      }
    }

    cargarProducto();
  }, [productoId]);

  async function guardarProducto(datos) {
    const respuesta = await actualizarProducto(productoId, datos);
    await recargarProductos();
    navigate('/admin', { state: { mensaje: respuesta.message } });
  }

  if (cargando) {
    return <p className="estado-carga">Cargando producto…</p>;
  }

  if (error) {
    return (
      <section className="admin-page">
        <div className="admin-page-container">
          <p className="estado-error">{error}</p>
          <Link className="admin-back" to="/admin">
            ← Volver al panel
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="admin-page">
      <div className="admin-page-container">
        <Link className="admin-back" to="/admin">
          ← Volver al panel
        </Link>
        <ProductForm
          titulo={`Editar ${producto.nombre}`}
          textoBoton="GUARDAR CAMBIOS"
          valoresIniciales={producto}
          onGuardar={guardarProducto}
        />
      </div>
    </section>
  );
}
