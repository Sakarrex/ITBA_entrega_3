import { Link, useOutletContext } from 'react-router-dom';
import './cart-page.css';

const formatearPrecio = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export default function CartPage() {
  const { carrito, cambiarCantidad, quitarDelCarrito, vaciarCarrito } =
    useOutletContext();

  const total = carrito.reduce(
    (acumulado, item) => acumulado + item.precio * item.cantidad,
    0
  );

  if (carrito.length === 0) {
    return (
      <section className="cart-page cart-page-empty">
        <div className="cart-container">
          <h1 className="cart-title">TU CARRITO DE COMPRAS</h1>

          <div className="cart-empty-content">
            <div className="cart-empty-state">
              <h2>Tu carrito está vacío</h2>

              <p>Parece que aún no agregaste ningún producto.</p>

              <Link to="/productos" className="cart-btn-primary">
                Explorar Catálogo
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="cart-page">
      <div className="cart-container">
        <h1 className="cart-title">TU CARRITO DE COMPRAS</h1>

        <div className="cart-layout">
          <div className="cart-list">
            {carrito.map((item) => (
              <article className="cart-item-card" key={item.id}>
                <div className="cart-item-img">
                  <img src={item.imagen} alt={item.nombre} />
                </div>

                <div className="cart-item-details">
                  <h2 className="cart-item-title">{item.nombre}</h2>

                  <p className="cart-item-price">
                    {formatearPrecio.format(item.precio)}
                  </p>
                </div>

                <div className="cart-item-actions">
                  <div className="cart-quantity-controls">
                    <button
                      type="button"
                      onClick={() =>
                        cambiarCantidad(item.id, item.cantidad - 1)
                      }
                      aria-label="Restar una unidad"
                    >
                      -
                    </button>

                    <input
                      type="number"
                      min="1"
                      value={item.cantidad}
                      onChange={(event) => {
                        const cantidad = Number(event.target.value);

                        if (Number.isInteger(cantidad) && cantidad >= 1) {
                          cambiarCantidad(item.id, cantidad);
                        }
                      }}
                      aria-label={`Cantidad de ${item.nombre}`}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        cambiarCantidad(item.id, item.cantidad + 1)
                      }
                      aria-label="Sumar una unidad"
                    >
                      +
                    </button>
                  </div>

                  <span className="cart-item-subtotal">
                    {formatearPrecio.format(item.precio * item.cantidad)}
                  </span>

                  <button
                    type="button"
                    className="cart-btn-remove"
                    onClick={() => quitarDelCarrito(item.id)}
                    aria-label={`Eliminar ${item.nombre}`}
                  >
                    ×
                  </button>
                </div>
              </article>
            ))}

            <div className="cart-list-actions">
              <button
                type="button"
                className="cart-btn-secondary"
                onClick={vaciarCarrito}
              >
                Vaciar carrito
              </button>

              <Link to="/productos" className="cart-btn-secondary">
                Seguir comprando
              </Link>
            </div>
          </div>

          <aside className="cart-summary-card">
            <h2>Resumen de Compra</h2>

            <div className="cart-summary-row">
              <span>Subtotal</span>

              <span>{formatearPrecio.format(total)}</span>
            </div>

            <div className="cart-summary-row cart-summary-total">
              <span>Total</span>

              <span>{formatearPrecio.format(total)}</span>
            </div>

            <button
              type="button"
              className="cart-btn-primary cart-btn-checkout"
              onClick={() => alert('¡Gracias por tu compra!')}
            >
              Finalizar Compra
            </button>
          </aside>
        </div>
      </div>
    </section>
  );
}
