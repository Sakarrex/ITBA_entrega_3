import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import ProductList from './components/ProductList.jsx';
import './products-page.css';

export default function ProductsPage() {
  const { productos, cargando, error, agregarAlCarrito } = useOutletContext();
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState('');
  const [categoria, setCategoria] = useState('');

  const categorias = [
    ...new Set(productos.map((producto) => producto.categoria)),
  ];
  const consulta = busqueda.trim().toLowerCase();

  const productosFiltrados = productos.filter((producto) => {
    if (categoria && producto.categoria !== categoria) {
      return false;
    }

    const campos = `${producto.nombre} ${producto.categoria} ${producto.material}`;
    return campos.toLowerCase().includes(consulta);
  });

  return (
    <section className="catalog">
      <div className="catalog-container">
        <h1 className="catalog-title">NUESTRO CATÁLOGO</h1>
        <p className="catalog-intro">
          Cada mueble se fabrica a mano en nuestra casa taller de San Cristóbal.
          Buscá por nombre, ambiente o material.
        </p>

        <form
          className="search-form"
          role="search"
          onSubmit={(event) => event.preventDefault()}
        >
          <label className="search-label" htmlFor="buscador">
            Buscar muebles
          </label>
          <div className="search-field">
            <img
              className="search-icon"
              src="/assets/icons/search.svg"
              alt=""
              width="24"
              height="24"
            />
            <input
              type="search"
              id="buscador"
              name="buscador"
              placeholder="Ej: sofá, comedor, nogal..."
              autoComplete="off"
              value={busqueda}
              onChange={(event) => setBusqueda(event.target.value)}
            />
          </div>
        </form>

        {cargando && <p className="estado-carga">Cargando productos…</p>}

        {error && <p className="estado-error">{error}</p>}

        {!cargando && !error && (
          <>
            <p className="catalog-count" aria-live="polite">
              {productosFiltrados.length} productos
            </p>

            <select
              className="category-filter"
              aria-label="Filtrar por categoría"
              value={categoria}
              onChange={(event) => setCategoria(event.target.value)}
            >
              <option value="">Todas las categorías</option>
              {categorias.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            {productosFiltrados.length === 0 ? (
              <p className="estado-vacio">
                No encontramos muebles que coincidan con tu búsqueda. Probá con
                otra palabra.
              </p>
            ) : (
              <ProductList
                productos={productosFiltrados}
                onSeleccionar={(producto) =>
                  navigate(`/productos/${producto.id}`)
                }
                onAgregar={agregarAlCarrito}
              />
            )}
          </>
        )}
      </div>
    </section>
  );
}
