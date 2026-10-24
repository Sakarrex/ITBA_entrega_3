import { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
  Outlet,
  useLocation,
} from 'react-router-dom';

import Navbar from './shared/components/navbar/Navbar.jsx';
import Footer from './shared/components/footer/Footer.jsx';
import CartPage from './pages/cart-page/cart-page.jsx';
import ContactPage from './pages/contact-page/contact-page.jsx';
import HomePage from './pages/home-page/home-page.jsx';
import ProductDetailPage from './pages/product-detail/product-detail-page.jsx';
import ProductsPage from './pages/product-list/products-page.jsx';
import { obtenerProductos } from './services/productos.js';

const CLAVE_LOCAL_STORAGE = 'muebleria_carrito';

function cargarCarritoInicial() {
  try {
    const carritoGuardado = localStorage.getItem(CLAVE_LOCAL_STORAGE);

    if (!carritoGuardado) {
      return [];
    }

    const carrito = JSON.parse(carritoGuardado);

    return Array.isArray(carrito) ? carrito : [];
  } catch (error) {
    console.error('Error al cargar el carrito:', error);
    return [];
  }
}

function AppLayout({
  productos,
  cargando,
  error,
  carrito,
  agregarAlCarrito,
  cambiarCantidad,
  quitarDelCarrito,
  vaciarCarrito,
}) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const cantidadCarrito = carrito.reduce(
    (total, item) => total + item.cantidad,
    0
  );

  return (
    <>
      <Navbar cantidadCarrito={cantidadCarrito} />

      <main>
        <Outlet
          context={{
            productos,
            cargando,
            error,
            carrito,
            agregarAlCarrito,
            cambiarCantidad,
            quitarDelCarrito,
            vaciarCarrito,
          }}
        />
      </main>

      <Footer />
    </>
  );
}

function App() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const [carrito, setCarrito] = useState(cargarCarritoInicial);

  useEffect(() => {
    async function cargarProductos() {
      try {
        const datos = await obtenerProductos();
        setProductos(datos);
      } catch (err) {
        console.error('Error al cargar los productos:', err);

        setError(
          'No se han cargado los datos. Recargá la página para intentar de nuevo.'
        );
      } finally {
        setCargando(false);
      }
    }

    cargarProductos();
  }, []);

  useEffect(() => {
    localStorage.setItem(CLAVE_LOCAL_STORAGE, JSON.stringify(carrito));
  }, [carrito]);

  function agregarAlCarrito(producto) {
    setCarrito((carritoActual) => {
      const existe = carritoActual.find((item) => item.id === producto.id);

      if (existe) {
        return carritoActual.map((item) =>
          item.id === producto.id
            ? {
                ...item,
                cantidad: item.cantidad + 1,
              }
            : item
        );
      }

      return [
        ...carritoActual,
        {
          id: producto.id,
          nombre: producto.nombre,
          precio: producto.precio,
          imagen: producto.imagen,
          cantidad: 1,
        },
      ];
    });
  }

  function cambiarCantidad(idProducto, nuevaCantidad) {
    const cantidad = Number(nuevaCantidad);

    if (!Number.isInteger(cantidad) || cantidad <= 0) {
      quitarDelCarrito(idProducto);
      return;
    }

    setCarrito((carritoActual) =>
      carritoActual.map((item) =>
        item.id === idProducto
          ? {
              ...item,
              cantidad,
            }
          : item
      )
    );
  }

  function quitarDelCarrito(idProducto) {
    setCarrito((carritoActual) =>
      carritoActual.filter((item) => item.id !== idProducto)
    );
  }

  function vaciarCarrito() {
    setCarrito([]);
  }

  const layoutProps = {
    productos,
    cargando,
    error,
    carrito,
    agregarAlCarrito,
    cambiarCantidad,
    quitarDelCarrito,
    vaciarCarrito,
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout {...layoutProps} />}>
          <Route index element={<HomePage />} />

          <Route path="productos" element={<ProductsPage />} />

          <Route path="productos/:productoId" element={<ProductDetailPage />} />

          <Route path="carrito" element={<CartPage />} />

          <Route path="contacto" element={<ContactPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
