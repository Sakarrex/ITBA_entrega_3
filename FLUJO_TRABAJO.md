MUEBLERIA-JOTA - FLUJO DE TRABAJO
===================================

1. REQUISITOS

---

- Node.js instalado.
- npm disponible en la terminal.
- Git inicializado en el proyecto.

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

2. INSTALACION INICIAL
----------------------

Ejecutar desde la raiz del proyecto:

    npm run install:all

Este comando instala las dependencias de la raiz, backend y cliente.

Si se necesita instalar cada parte por separado:

    npm install
    npm install --prefix backend
    npm install --prefix client

3. EJECUTAR EL PROYECTO
-----------------------

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

4. PROBAR EL BACKEND

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

5. VALIDAR EL FRONTEND
----------------------

Generar el build de produccion:

    npm run build --prefix client

Previsualizar el build generado:

    npm run preview --prefix client

El frontend tambien tiene su propio lint:

    npm run lint --prefix client

6. VALIDAR CALIDAD DE CODIGO
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

7. FLUJO DE COMMIT
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

8. ESTADO ACTUAL DEL PROYECTO
-----------------------------

- Frontend: Vite + React.
- Backend: Express + dotenv.
- Persistencia MongoDB: aun no implementada.
- CORS y Helmet: retirados temporalmente para esta primera prueba.
- Endpoint disponible: GET /api/health.
- Tests automatizados: aun no configurados.
