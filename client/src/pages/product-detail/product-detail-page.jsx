import {
  Link,
  useNavigate,
  useOutletContext,
  useParams,
} from 'react-router-dom';
import ProductDetail from './components/ProductDetail.jsx';

export default function ProductDetailPage() {
  const { productoId } = useParams();
  const { productos, cargando, error, agregarAlCarrito } = useOutletContext();
  const navigate = useNavigate();

  if (cargando) {
    return <p className="estado-carga">Cargando productos…</p>;
  }

  if (error) {
    return <p className="estado-error">{error}</p>;
  }

  const producto = productos.find((item) => String(item.id) === productoId);

  if (!producto) {
    return (
      <section>
        <h1>Producto no encontrado</h1>
        <Link to="/productos">Volver al catálogo</Link>
      </section>
    );
  }

  return (
    <ProductDetail
      producto={producto}
      onVolver={() => navigate('/productos')}
      onAgregar={agregarAlCarrito}
    />
  );
}
