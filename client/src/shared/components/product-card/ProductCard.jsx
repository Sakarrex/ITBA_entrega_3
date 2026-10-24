import './ProductCard.css';

const formatearPrecio = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export default function ProductCard({ producto, onSeleccionar, onAgregar }) {
  const { nombre, precio, precioOriginal, oferta, imagen, categoria } =
    producto;

  return (
    <article
      className="product-card"
      role="link"
      tabIndex={0}
      aria-label={`Ver detalle de ${nombre}`}
      onClick={() => onSeleccionar(producto)}
      onKeyDown={(event) => {
        if (
          event.target === event.currentTarget &&
          (event.key === 'Enter' || event.key === ' ')
        ) {
          event.preventDefault();
          onSeleccionar(producto);
        }
      }}
    >
      {oferta && <span className="product-card-badge">OFERTA</span>}
      {imagen && (
        <img
          src={imagen}
          alt={nombre}
          className="product-card-image"
          loading="lazy"
        />
      )}
      <div className="product-card-content">
        {categoria && (
          <span className="product-card-category">{categoria}</span>
        )}
        <h3 className="product-card-title">{nombre}</h3>
        {oferta && precioOriginal && (
          <p className="product-card-price-original">
            <del aria-label="Precio anterior">
              {formatearPrecio.format(precioOriginal)}
            </del>
          </p>
        )}
        <p className="product-card-price">{formatearPrecio.format(precio)}</p>
        <div className="product-card-actions">
          <button
            type="button"
            className="btn btn-primary"
            onClick={(event) => {
              event.stopPropagation();
              onAgregar(producto);
            }}
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </article>
  );
}
