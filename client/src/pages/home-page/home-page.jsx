import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import ProductCard from '../../shared/components/product-card/ProductCard.jsx';
import './home-page.css';

function obtenerProductosPorPagina(productos, cantidadPorPagina) {
  const paginas = [];

  for (let indice = 0; indice < productos.length; indice += cantidadPorPagina) {
    paginas.push(productos.slice(indice, indice + cantidadPorPagina));
  }

  return paginas;
}

function obtenerCantidadPorPagina() {
  if (window.matchMedia('(min-width: 1024px)').matches) {
    return 3;
  }

  if (window.matchMedia('(min-width: 768px)').matches) {
    return 2;
  }

  return 1;
}

function obtenerDestacados(productos) {
  const max_productos_destacados = 6;
  if (productos.length <= max_productos_destacados) {
    return productos;
  }
  var productosCopia = [
    ...productos,
  ]; /*copiar array para no modificar el original*/
  const destacados = [];
  for (let i = 0; i < max_productos_destacados; i++) {
    const rand_pos = Math.floor(Math.random() * productosCopia.length);
    destacados.push(productosCopia[rand_pos]);
    productosCopia.splice(rand_pos, 1); /*evitar repetidos*/
  }
  return destacados;
}

export default function HomePage() {
  const { productos, cargando, error, agregarAlCarrito } = useOutletContext();
  const navigate = useNavigate();
  const [cantidadPorPagina, setCantidadPorPagina] = useState(
    obtenerCantidadPorPagina
  );
  const [paginaActual, setPaginaActual] = useState(0);
  const productosDestacados = useMemo(
    () => obtenerDestacados(productos),
    [productos]
  );
  const paginas = obtenerProductosPorPagina(
    productosDestacados,
    cantidadPorPagina
  );
  const paginaVisible = Math.max(0, Math.min(paginaActual, paginas.length - 1));

  useEffect(() => {
    function actualizarCantidadPorPagina() {
      setCantidadPorPagina(obtenerCantidadPorPagina());
      setPaginaActual(0);
    }

    window.addEventListener('resize', actualizarCantidadPorPagina);

    return () => {
      window.removeEventListener('resize', actualizarCantidadPorPagina);
    };
  }, []);

  function cambiarPagina(direccion) {
    setPaginaActual((pagina) =>
      Math.max(0, Math.min(pagina + direccion, paginas.length - 1))
    );
  }

  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="home-hero-content">
          <h1 className="home-hero-title">
            HERMANOS
            <br />
            JOTA
          </h1>
          <p className="home-hero-description">
            Cada pieza cuenta una historia de artesanía que honra el pasado
            mientras abraza el futuro: hechos a mano, con materiales nobles y
            sustentables, para durar toda una vida.
          </p>
          <Link to="/productos" className="home-hero-button">
            VER CATÁLOGO
          </Link>
        </div>
        <div className="home-hero-image">
          <img
            src="/logo.svg"
            alt="Logo Hermanos Jota"
            width="300"
            height="300"
          />
        </div>
      </section>

      <section className="home-about">
        <div className="home-about-container">
          <h2 className="home-section-title">SOBRE NOSOTROS</h2>
          <div className="home-about-card">
            <p>
              En Hermanos Jota creamos muebles que no solo cumplen una función,
              sino que alimentan el alma. Cada pieza combina la calidad del
              optimismo de los años 60 con maderas nativas certificadas y
              acabados naturales, pensada para envejecer con gracia y
              acompañarte por generaciones.
            </p>
          </div>
        </div>
      </section>

      <section className="home-products">
        <div className="home-products-container">
          <h2 className="home-section-title">PRODUCTOS DESTACADOS</h2>

          {cargando ? (
            <p className="home-products-state" role="status">
              Cargando productos…
            </p>
          ) : error ? (
            <p className="home-products-state home-products-error" role="alert">
              {error}
            </p>
          ) : productosDestacados.length === 0 ? (
            <p className="home-products-state">No hay productos disponibles.</p>
          ) : (
            <>
              <div className="home-carousel">
                <button
                  className="home-carousel-button"
                  type="button"
                  aria-label="Productos anteriores"
                  onClick={() => cambiarPagina(-1)}
                  disabled={paginaVisible === 0}
                >
                  &#10094;
                </button>

                <div className="home-carousel-viewport">
                  <div
                    className="home-carousel-track"
                    style={{
                      transform: `translateX(-${paginaVisible * 100}%)`,
                    }}
                  >
                    {paginas.map((pagina, indicePagina) => (
                      <div
                        className="home-carousel-page"
                        key={`pagina-${indicePagina}`}
                        style={{
                          gridTemplateColumns: `repeat(${cantidadPorPagina}, minmax(0, 1fr))`,
                        }}
                      >
                        {pagina.map((producto) => (
                          <ProductCard
                            key={producto.id}
                            producto={producto}
                            onSeleccionar={() =>
                              navigate(`/productos/${producto.id}`)
                            }
                            onAgregar={agregarAlCarrito}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  className="home-carousel-button"
                  type="button"
                  aria-label="Productos siguientes"
                  onClick={() => cambiarPagina(1)}
                  disabled={paginaActual >= paginas.length - 1}
                >
                  &#10095;
                </button>
              </div>

              <div
                className="home-carousel-dots"
                aria-label="Páginas de productos"
              >
                {paginas.map((_, indice) => (
                  <button
                    className={`home-carousel-dot${indice === paginaVisible ? ' is-active' : ''}`}
                    key={indice}
                    type="button"
                    aria-label={`Ver página ${indice + 1} de productos`}
                    aria-current={indice === paginaVisible ? 'page' : undefined}
                    onClick={() => setPaginaActual(indice)}
                  />
                ))}
              </div>
            </>
          )}

          <Link to="/productos" className="home-products-button">
            CATÁLOGO COMPLETO
          </Link>
        </div>
      </section>
    </div>
  );
}
