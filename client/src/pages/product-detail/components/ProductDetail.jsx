import './product-detail.css';

function ProductDetail({ producto, onVolver, onAgregar }) {
  if (!producto) {
    return null;
  }

  const formatearPrecio = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <section className="product-detail">
      <button type="button" onClick={onVolver} className="product-detail-back">
        ← Volver al catálogo
      </button>

      <div className="product-detail-card">
        <div className="product-detail-main">
          <div className="product-detail-media">
            <img src={producto.imagen} alt={producto.alt || producto.nombre} />
          </div>

          <div className="product-detail-info">
            {producto.oferta && (
              <span className="product-card-badge">OFERTA</span>
            )}

            <span className="product-detail-category">
              {producto.categoria}
            </span>

            <h1>{producto.nombre}</h1>

            {producto.precioOriginal && (
              <p className="product-card-price-original">
                <del>{formatearPrecio.format(producto.precioOriginal)}</del>
              </p>
            )}

            <p className="product-detail-price">
              {formatearPrecio.format(producto.precio)}
            </p>

            <p className="product-detail-description">{producto.descripcion}</p>

            <button
              type="button"
              className="btn btn-primary"
              onClick={() => onAgregar(producto)}
            >
              Agregar al carrito
            </button>
          </div>
        </div>

        <div className="product-detail-specs">
          <h2>Especificaciones</h2>

          <div className="product-detail-specs-grid">
            <div>
              <span>Material</span>
              <strong>{producto.material}</strong>
            </div>

            <div>
              <span>Medidas</span>
              <strong>{producto.medidas}</strong>
            </div>

            <div>
              <span>Acabado</span>
              <strong>{producto.acabado}</strong>
            </div>

            <div>
              <span>Stock disponible</span>
              <strong>{producto.stock} unidades</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;
