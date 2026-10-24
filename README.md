# Trabajo integrador Fullstack Developer 2026 - ITBA

Repositorio para el trabajo integrador grupal del grupo 6 Comisión 1 TT. Consiste en una página de e-commerce para una mueblería ficticia: Hermanos Jota.

Esta es la **Tercera entrega**: A la aplicación de react creada en la entrega 2 se le añadieron: Almacenamiento de datos en base de datos MongoDB loca (Corriendo dentro de docker para compatibilidad), Axios para las llamadas de la API Backend y React hook form y Yup para la validación de modelos.

Integrantes:

- Contreras Valentin Ramiro
- Dorado Escudero Facundo
- García Fontana Sebastián José
- Ramírez Lautaro Agustín
- Retamozo Sequeira Jorge Nicolas

## Ejecución

Se necesita Node.js y npm instalados. Para clonar el repositorio e instalar las
dependencias de la raíz, el backend y el cliente, además de levantar MongoDB,
se necesita Docker Desktop (con el motor de Docker iniciado). Antes de ejecutar
la instalación, crear el archivo local de variables de entorno:

```bash
git clone https://github.com/Sakarrex/ITBA_entrega_3.git
cd ITBA_entrega_3
cp .env.example .env
npm run install:all
```

En PowerShell, usar `Copy-Item .env.example .env` en lugar de `cp`. El archivo
`.env` contiene credenciales locales de desarrollo y no se sube al repositorio;
`.env.example` sí está versionado. Cambiar las credenciales locales si fuera
necesario y mantener sincronizados `MONGO_ROOT_USERNAME`,
`MONGO_ROOT_PASSWORD` y `MONGODB_URI`.

`npm run install:all` instala las dependencias y ejecuta `docker compose up -d
--wait` para iniciar el contenedor MongoDB. Para operar la base por separado:

```bash
npm run db:up
npm run db:down
```

`db:down` detiene y elimina el contenedor, pero conserva los datos del volumen
Docker `mongodb_data`.

El catálogo actual está definido en `backend/data/productos.js`. Para copiarlo a
la colección `productos` de MongoDB, ejecutar el seed manualmente:

```bash
npm run db:seed
```

El seed inserta o actualiza cada documento usando su campo `id`; se puede
ejecutar más de una vez y no elimina documentos ajenos al catálogo fuente.

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
- MongoDB 8 en Docker Compose
- Mongoose para el script de seed
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
- `backend/scripts/seed.js`: carga idempotente del catálogo local a MongoDB
- `compose.yaml`: servicio MongoDB y volumen persistente de desarrollo
- `.env.example`: plantilla de configuración local (copiar a `.env`)
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
- **API sin conexión a MongoDB por ahora:** los endpoints siguen leyendo los productos desde `backend/data/productos.js`; el contenedor y el seed preparan la base local sin cambiar las llamadas del backend.
