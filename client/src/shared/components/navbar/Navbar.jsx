import { useState } from 'react';
import { Link } from 'react-router-dom';
import menuIcon from '../../../assets/icons/menu.svg';
import shoppingCartIcon from '../../../assets/icons/shopping_cart.svg';
import './Navbar.css';

function Navbar({ cantidadCarrito }) {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <>
      <header className="site-header">
        <nav className="nav">
          <button
            className="nav-toggle"
            type="button"
            aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuAbierto}
            aria-controls="nav-menu"
            onClick={() => setMenuAbierto(!menuAbierto)}
          >
            <img src={menuIcon} alt="" width="24" height="24" />
          </button>

          <Link className="nav-logo" to="/">
            <img src="/logo.svg" alt="" width="44" height="44" />
            <span className="nav-logo-text">Hermanos Jota</span>
          </Link>

          <div className="nav-actions">
            <Link
              className="nav-cart"
              to="/carrito"
              aria-label="Ver carrito de compras"
            >
              <img src={shoppingCartIcon} alt="" width="24" height="24" />
              <span className="nav-cart-count" id="cart-count">
                {cantidadCarrito}
              </span>
            </Link>
          </div>

          <ul
            className={`nav-menu${menuAbierto ? ' is-open' : ''}`}
            id="nav-menu"
          >
            <li>
              <Link to="/" onClick={() => setMenuAbierto(false)}>
                Inicio
              </Link>
            </li>
            <li>
              <Link to="/productos" onClick={() => setMenuAbierto(false)}>
                Catálogo
              </Link>
            </li>
            <li>
              <Link to="/contacto" onClick={() => setMenuAbierto(false)}>
                Contacto
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
