import { useState } from 'react';
import { Link, useLocation, useOutletContext } from 'react-router-dom';

import { eliminarProducto } from '../../services/productos.js';
import './components/product-form.css';

const formatearPrecio = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
});

export default function AdminPage() {
  const { productos, cargando, error, recargarProductos } = useOutletContext();
  const { state } = useLocation();
  const [mensajeExito, setMensajeExito] = useState(state?.mensaje || '');
  const [errorBorrado, setErrorBorrado] = useState('');
  const [eliminandoId, setEliminandoId] = useState(null);

  const arrayProductos = Array.isArray(productos)
    ? productos
    : productos?.data || [];

  async function borrarProducto(producto) {
    if (!window.confirm(`¿Seguro que querés eliminar "${producto.nombre}"?`)) {
      return;
    }

    setEliminandoId(producto._id);
    setMensajeExito('');
    setErrorBorrado('');

    try {
      const respuesta = await eliminarProducto(producto._id);
      await recargarProductos();
      setMensajeExito(respuesta.message);
    } catch (err) {
      setErrorBorrado(
        err.response?.data?.message || 'No pudimos eliminar el producto.'
      );
    } finally {
      setEliminandoId(null);
    }
  }

  return (
    <section className="admin-page">
      <div className="admin-page-container">
        <div className="admin-header">
          <div>
            <h1 className="product-form-title">Administrar productos</h1>
            {!cargando && !error && (
              <p className="admin-subtitle">
                {arrayProductos.length} productos en el catálogo
              </p>
            )}
          </div>
          <Link className="product-form-button" to="/admin/crear-producto">
            + CREAR PRODUCTO
          </Link>
        </div>

        {mensajeExito && (
          <p className="estado-exito" role="status">
            {mensajeExito}
          </p>
        )}

        {errorBorrado && (
          <p className="product-form-alert" role="alert">
            {errorBorrado}
          </p>
        )}

        {cargando && <p className="estado-carga">Cargando productos…</p>}

        {error && <p className="estado-error">{error}</p>}

        {!cargando && !error && arrayProductos.length === 0 && (
          <p className="estado-vacio">Todavía no hay productos cargados.</p>
        )}

        {!cargando && !error && arrayProductos.length > 0 && (
          <ul className="admin-list">
            {arrayProductos.map((producto) => (
              <li className="admin-item" key={producto._id}>
                <img
                  className="admin-item-image"
                  src={producto.imagenUrl}
                  alt=""
                  loading="lazy"
                />

                <div className="admin-item-info">
                  <div className="admin-item-tags">
                    <span className="admin-tag">{producto.categoria}</span>
                    {producto.oferta && (
                      <span className="admin-tag admin-tag-oferta">OFERTA</span>
                    )}
                  </div>
                  <strong className="admin-item-name">{producto.nombre}</strong>
                  <span className="admin-item-price">
                    {formatearPrecio.format(producto.precio)}
                  </span>
                  <span
                    className={`admin-item-stock${producto.stock <= 3 ? ' is-low' : ''}`}
                  >
                    Stock: {producto.stock}
                  </span>
                </div>

                <div className="admin-item-actions">
                  <Link
                    className="admin-button"
                    to={`/admin/editar-producto/${producto._id}`}
                  >
                    Editar
                  </Link>
                  <button
                    type="button"
                    className="admin-button admin-button-danger"
                    onClick={() => borrarProducto(producto)}
                    disabled={eliminandoId === producto._id}
                  >
                    {eliminandoId === producto._id ? 'Eliminando…' : 'Eliminar'}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
