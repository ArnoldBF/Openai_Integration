# OpenAI Integration

Sistema avanzado para el análisis y procesamiento de audios y textos, integrando inteligencia artificial (OpenAI) para transcribir, analizar y extraer información clave de grabaciones de llamadas y conversaciones. Su objetivo es identificar patrones relevantes (fechas, palabras clave, datos transaccionales, etc.) y generar insights accionables para la toma de decisiones empresariales.

---

## 🚀 Características principales

-   Transcripción automática de audios usando OpenAI Whisper.
-   Análisis de transcripciones con modelos de lenguaje (OpenAI/LangChain).
-   Extracción de datos estructurados y no estructurados.
-   Gestión de prompts personalizables para análisis.
-   API REST para gestión de prompts y análisis.
-   Migraciones de base de datos con TypeORM.
-   Procesamiento por lotes de archivos de audio y texto.
-   Arquitectura modular y escalable.

---

## 📁 Estructura del proyecto

-   `src/app.ts`: Punto de entrada de la aplicación.
-   `src/config/`: Configuración general, servidor, conexión a base de datos.
-   `src/services/`: Lógica de negocio (transcripción, análisis, audio, prompts).
-   `src/adapters/`: Integraciones con OpenAI y otros servicios.
-   `src/entities/`: Entidades de base de datos (TypeORM).
-   `src/routes/`: Rutas de la API (principalmente `/api/prompts`).
-   `src/db/migrations/`: Migraciones de base de datos.

---

## ⚙️ Instalación

1. Clona el repositorio.
2. Instala las dependencias:
    ```pwsh
    npm install
    ```
3. Crea un archivo `.env` con las siguientes variables:
    ```env
    PORT=3000
    DB_USER=usuario
    DB_PASS=contraseña
    DB_HOST=localhost
    DB_NAME=nombre_db
    DB_PORT=1433
    NODE_ENV=development
    API_KEY=tu_api_key_openai
    ```
4. Ejecuta las migraciones:
    ```pwsh
    npm run migrations:run
    ```

---

## ▶️ Uso

-   Inicia el servidor en modo desarrollo:
    ```pwsh
    npm run dev
    ```
-   Compila y ejecuta en producción:
    ```pwsh
    npm start
    ```

---

## 🛠️ Scripts útiles

-   `npm run dev`: Ejecuta el servidor con nodemon.
-   `npm run build`: Compila TypeScript a JavaScript.
-   `npm start`: Compila y ejecuta el servidor.
-   `npm run migrations:generate`: Genera una nueva migración.
-   `npm run migrations:run`: Ejecuta las migraciones pendientes.
-   `npm run migrations:revert`: Revierte la última migración.

---

## 📡 Endpoints principales

-   `GET /api/prompts`: Lista todos los prompts.
-   `GET /api/prompts/:id`: Obtiene un prompt por ID.
-   `POST /api/prompts`: Crea un nuevo prompt.
-   `PUT /api/prompts/:id`: Actualiza un prompt existente.

---

## 📦 Dependencias principales

-   [Express](https://expressjs.com/)
-   [TypeORM](https://typeorm.io/)
-   [OpenAI](https://www.npmjs.com/package/openai)
-   [LangChain](https://js.langchain.com/)
-   [MSSQL](https://www.npmjs.com/package/mssql)
-   [dotenv](https://www.npmjs.com/package/dotenv)
-   [Joi](https://www.npmjs.com/package/joi)

---

## 🗄️ Migraciones

Para crear una nueva migración:

```pwsh
npm run migrations:generate nombre_migracion
```

---

## 📝 Notas

-   El procesamiento de archivos por lotes está configurado en `src/config/server.ts` y `src/config/fileManager.ts`.
-   El sistema está preparado para ser extendido con nuevas rutas y servicios.
-   Asegúrate de tener una clave válida de OpenAI y la configuración de base de datos correcta en tu `.env`.

---

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Por favor, abre un issue o un pull request para sugerencias o mejoras.

---

## 📄 Licencia

Este proyecto está bajo la licencia ISC.
