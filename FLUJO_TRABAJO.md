MUEBLERIA-JOTA - FLUJO DE TRABAJO
===================================

1. REQUISITOS

---

- Node.js instalado.
- npm disponible en la terminal.
- Git inicializado en el proyecto.
- Docker Desktop instalado y con el motor de Docker iniciado.

Comprobar versiones:

    node --version
    npm --version
    git --version

La estructura principal del proyecto es:

    /
    |-- backend/
    |-- client/
    |-- package.json
    |-- eslint.config.js
    |-- commitlint.config.js
    |-- .prettierrc.json
    |-- .husky/
    |-- .gitignore

2. CONFIGURACION E INSTALACION INICIAL
----------------------

Copiar la plantilla de variables de entorno en la raíz del proyecto.

En Windows PowerShell:

    Copy-Item .env.example .env

En Git Bash:

    cp .env.example .env

El archivo `.env` es local y está excluido de Git. Contiene credenciales de
desarrollo para MongoDB; no reutilizarlas en otros entornos. `.env.example` es
la plantilla versionada. Si se cambian las credenciales o el puerto, mantener
consistentes las variables `MONGO_ROOT_USERNAME`, `MONGO_ROOT_PASSWORD`,
`MONGO_DATABASE`, `MONGO_PORT` y `MONGODB_URI`.

Luego, ejecutar desde la raíz:

    npm run install:all

Este comando instala las dependencias de la raíz, backend y cliente y levanta
MongoDB en Docker Compose, esperando a que el servicio esté disponible.

Si se necesita instalar cada parte por separado:

    npm install
    npm install --prefix backend
    npm install --prefix client

Si las dependencias ya están instaladas y solo se necesita iniciar MongoDB:

    npm run db:up

Para detener y quitar el contenedor sin borrar los datos persistidos:

    npm run db:down

Los datos se conservan en el volumen Docker `mongodb_data`.

3. CARGAR LOS DATOS INICIALES

---

El catálogo fuente está en `backend/data/productos.js`. Con MongoDB iniciado,
ejecutar el seed:

    npm run db:seed

El script carga los documentos en la colección `productos`, insertando o
actualizando por el campo `id`. Es repetible y no elimina otros documentos.
La API del backend sigue leyendo desde el archivo local; este seed no cambia
las rutas ni las llamadas existentes.

Comprobar el estado del contenedor desde la raíz:

    docker compose ps

Para abrir la consola `mongosh` dentro del contenedor, usar las credenciales de
`MONGO_ROOT_USERNAME` y `MONGO_ROOT_PASSWORD` definidas en `.env`. Con los
valores de ejemplo:

    docker exec -it muebleria-jota-mongodb mongosh --username muebleria_local --password cambiar_esta_clave_local --authenticationDatabase admin

Una vez dentro de `mongosh`, ejecutar estos comandos básicos:

    show dbs
    use muebleria_jota
    db
    show collections
    db.productos.countDocuments()
    db.productos.findOne()
    db.productos.find({}, { _id: 0, id: 1, nombre: 1 }).sort({ id: 1 }).limit(5)

La base `muebleria_jota` aparece en `show dbs` después de que tenga datos. Si se
cambiaron las credenciales o el nombre de la base, reemplazar los valores del
comando y usar el nombre indicado por `MONGO_DATABASE`. Para salir de la consola:

    exit

4. EJECUTAR EL PROYECTO

---

Ejecutar frontend y backend al mismo tiempo:

    npm run dev

Frontend solamente:

    npm run dev --prefix client

El frontend queda disponible normalmente en:

    http://localhost:5173

Backend solamente:

    npm run dev --prefix backend

El backend queda disponible en:

    http://localhost:3000

Nodemon reinicia automaticamente el backend cuando se modifica un archivo.

5. PROBAR EL BACKEND

---

Endpoint de salud:

    curl http://localhost:3000/api/health

En Windows tambien se puede usar:

    curl.exe http://localhost:3000/api/health

La respuesta esperada contiene:

    {
      "success": true,
      "data": {
        "service": "muebleria-jota-backend",
        "status": "ok"
      }
    }

Probar una ruta inexistente:

    curl.exe http://localhost:3000/api/ruta-inexistente

Debe devolver una respuesta 404 con el formato estandar del backend.

El backend usa el puerto 3000 por defecto. Para cambiarlo, definir PORT antes
de iniciar el servidor.

En Git Bash:

    PORT=4000 npm run dev --prefix backend

En PowerShell:

    $env:PORT=4000; npm run dev --prefix backend

6. VALIDAR EL FRONTEND
----------------------

Generar el build de produccion:

    npm run build --prefix client

Previsualizar el build generado:

    npm run preview --prefix client

El frontend tambien tiene su propio lint:

    npm run lint --prefix client

7. VALIDAR CALIDAD DE CODIGO
----------------------------

Ejecutar ESLint en todo el monorepo:

    npm run lint

Comprobar formato sin modificar archivos:

    npm run format:check

Formatear los archivos del proyecto:

    npm run format

Validar manualmente un mensaje de commit convencional:

    printf "feat: add product catalog\n" | npx commitlint

En PowerShell:

    Write-Output "feat: add product catalog" | npx commitlint

8. FLUJO DE COMMIT
------------------

1. Revisar los cambios:

   git status
   git diff

2. Ejecutar las validaciones:

   npm run lint
   npm run format:check
   npm run build --prefix client

3. Agregar los archivos:

   git add .

4. Crear un commit con formato Conventional Commits:

   git commit -m "feat: add furniture catalog"

Husky ejecuta automaticamente lint-staged en pre-commit. lint-staged aplica
Prettier a los archivos staged y ESLint a los archivos JavaScript/TypeScript
staged. Commitlint valida el mensaje del commit.

Para validar todos los archivos del monorepo, usar manualmente:

    npm run lint

Ejemplos validos:

    feat: add product catalog
    fix: correct health endpoint
    chore: update dependencies
    docs: add project workflow

9. ESTADO ACTUAL DEL PROYECTO
-----------------------------

- Frontend: Vite + React.
- Backend: Express + dotenv.
- MongoDB local: disponible en Docker Compose, con volumen persistente y seed manual del catálogo.
- API: continúa leyendo los productos desde `backend/data/productos.js`; la conexión del backend a MongoDB todavía no está implementada.
- CORS y Helmet: retirados temporalmente para esta primera prueba.
- Endpoint disponible: GET /api/health.
- Tests automatizados: aun no configurados.
