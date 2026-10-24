# Trabajo integrador Fullstack Developer 2026 - ITBA

Repositorio para el trabajo integrador grupal del grupo 6 Comisión 1 TT. Consiste en una página de e-commerce para una mueblería ficticia: Hermanos Jota.

Esta es la **segunda entrega**: la página de la primera entrega (HTML, CSS y JavaScript vanilla) se reescribió con el stack MERN. El frontend ahora es una aplicación React que consume una API propia desarrollada con Node.js y Express.

Integrantes:

- Contreras Valentin Ramiro
- Dorado Escudero Facundo
- García Fontana Sebastián José
- Ramírez Lautaro Agustín
- Retamozo Sequeira Jorge Nicolas

## Ejecución

Se necesita Node.js y npm instalados. Para clonar el repositorio e instalar las
dependencias de la raíz, el backend y el cliente, ejecutar desde la raíz:

```bash
git clone https://github.com/Sakarrex/ITBA_entrega_2.git
cd ITBA_entrega_2
npm run install:all
```

Para iniciar el backend y el cliente juntos:

```bash
npm run dev
```

El frontend queda disponible normalmente en `http://localhost:5173` y el
backend en `http://localhost:3000`. Vite redirige las llamadas a `/api` al
backend durante el desarrollo.

También se puede iniciar cada parte por separado, desde la raíz:

```bash
# Frontend
npm run dev --prefix client

# Backend
npm run dev --prefix backend
```

Para comprobar que el backend responde:

```bash
curl http://localhost:3000/api/health
```

En Windows también se puede usar `curl.exe`:

```powershell
curl.exe http://localhost:3000/api/health
```

Para ejecutar el lint del monorepo y generar el build del frontend:

```bash
npm run lint
npm run build --prefix client
```

El backend usa el puerto `3000` por defecto. Para cambiarlo, definir la
variable de entorno `PORT` antes de iniciar el backend. Por ejemplo, en
PowerShell:

```powershell
$env:PORT=4000; npm run dev --prefix backend
```

Si se cambia el puerto, también hay que actualizar el `proxy` en
`client/vite.config.js`. Para ejecutar el backend sin recarga automática,
usar `npm start --prefix backend`.

La primera entrega sigue desplegada en https://muebleria-hermanos.netlify.app/

## Funcionalidades

- Catálogo de productos cargado desde la API, con estados de carga y error
- Carrusel de productos destacados en la página de inicio
- Vista de detalle de cada producto con material, medidas, acabado y stock
- Carrito de compras: agregar productos, modificar cantidades, quitar productos, vaciar el carrito y ver el total
- Contador del carrito en la barra de navegación
- El carrito se conserva al recargar la página (persistencia en `localStorage`)
- Formulario de contacto con campos controlados, validación en frontend y mensaje de éxito (el envío es simulado, no se guarda en el backend)
- Diseño responsive para distintos tamaños de pantalla

## Tecnologías utilizadas

- React 19 y Vite
- React Router DOM
- Node.js y Express 5
- dotenv
- CSS3
- ESLint para análisis estático y linting
- Prettier para el formato del código
- Husky para ejecutar verificaciones automáticas en los commits
- Git y GitHub para control de versiones

## API

Todas las respuestas tienen el formato `{ success, data, message }`.

| Método | Ruta                 | Descripción                          |
| ------ | -------------------- | ------------------------------------ |
| GET    | `/api/productos`     | Listado completo de productos        |
| GET    | `/api/productos/:id` | Producto por id (`404` si no existe) |

## Estructura del proyecto

- `backend/server.js`: punto de entrada del servidor Express
- `backend/controllers/`: lógica de cada endpoint
- `backend/middlewares/`: middlewares del servidor, incluido el manejador centralizado de errores
- `backend/data/`: datos locales de los productos
- `client/src/App.jsx`: estado global (productos y carrito) y definición de rutas
- `client/src/shared/components/`: componentes reutilizables (`navbar/`, `footer/` y `product-card/`)
- `client/src/pages/`: vistas principales
  - `home-page/home-page.jsx`: inicio con carrusel de destacados
  - `product-list/products-page.jsx`: catálogo completo
  - `product-list/components/ProductList.jsx`: lista de productos
  - `product-detail/product-detail-page.jsx`: detalle de un producto (`/productos/:productoId`)
  - `product-detail/components/ProductDetail.jsx`: detalle y especificaciones del producto
  - `cart-page/cart-page.jsx`: revisión del carrito, gestión de cantidades y total de compra
  - `contact-page/contact-page.jsx`: formulario de contacto
- `client/src/services/`: llamadas a la API centralizadas con `fetch`

## Decisiones técnicas

- **Estado en `App.jsx`:** productos y carrito se comparten con las páginas mediante el contexto del `Outlet` de React Router, sin agregar librerías de estado.
- **Persistencia del carrito:** al iniciar, el carrito se lee de `localStorage` (clave `muebleria_carrito`) y un `useEffect` lo guarda cada vez que cambia. Si los datos guardados están dañados, el carrito empieza vacío.
- **Llamadas a la API en `services/`:** los componentes no conocen las URLs ni el formato de respuesta.
- **Proxy de Vite:** el cliente llama a rutas relativas (`/api/...`) y Vite las reenvía al backend, evitando problemas de CORS en desarrollo.
- **Sin base de datos en esta entrega:** los productos se leen de archivos locales en `backend/data/`. Mongoose ya está instalado, pero la conexión con MongoDB queda para la siguiente etapa.
