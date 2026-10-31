import { Link, useNavigate, useOutletContext } from 'react-router-dom';

import ProductForm from './components/ProductForm.jsx';
import { VALORES_INICIALES } from './producto-schema.js';
import { crearProducto } from '../../services/productos.js';

export default function CreateProductPage() {
  const { recargarProductos } = useOutletContext();
  const navigate = useNavigate();

  async function guardarProducto(datos) {
    const respuesta = await crearProducto(datos);
    await recargarProductos();
    navigate('/admin', { state: { mensaje: respuesta.message } });
  }

  return (
    <section className="admin-page">
      <div className="admin-page-container">
        <Link className="admin-back" to="/admin">
          ← Volver al panel
        </Link>
        <ProductForm
          titulo="Crear producto"
          textoBoton="CREAR PRODUCTO"
          valoresIniciales={VALORES_INICIALES}
          onGuardar={guardarProducto}
        />
      </div>
    </section>
  );
}
