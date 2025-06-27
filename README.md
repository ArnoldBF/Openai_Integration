# OpenAI Integration

Solución backend modular y robusta para el procesamiento batch de audios y textos, integrando modelos avanzados de inteligencia artificial (OpenAI) para transcripción automática, análisis semántico y extracción de información relevante. Permite identificar patrones críticos —como fechas, entidades, palabras clave y datos transaccionales— y transformar grandes volúmenes de datos no estructurados en insights accionables, todo a través de una API REST escalable y desacoplada.

---

## 🚀 Características principales

-   Transcripción automática de audios usando OpenAI Whisper.
-   Análisis de transcripciones con modelos de lenguaje (OpenAI/LangChain).
-   Extracción y normalización robusta de datos estructurados y no estructurados.
-   Procesamiento batch desacoplado usando BullMQ y Redis (cola y worker).
-   Gestión de prompts personalizables para análisis.
-   API REST para gestión de prompts, análisis y monitoreo de estado de la cola.
-   Migraciones de base de datos con TypeORM.
-   Arquitectura modular, desacoplada y escalable.
-   Validaciones, manejo de errores y transacciones atómicas.
-   Persistencia de fechas como string corto (`dd/mm/yyyy`), nunca como objeto Date ni string largo.

---

## 📁 Estructura del proyecto

-   `src/app.ts`: Punto de entrada de la aplicación.
-   `src/config/`: Configuración general, servidor, conexión a base de datos, integración de Bull Board.
-   `src/services/`: Lógica de negocio (transcripción, análisis, audio, prompts, batch, workers).
-   `src/adapters/`: Integraciones con OpenAI y otros servicios.
-   `src/entities/`: Entidades de base de datos (TypeORM).
-   `src/routes/`: Rutas de la API (incluye endpoints batch y monitoreo de cola).
-   `src/db/migrations/`: Migraciones de base de datos.
-   `src/helpers/`: Extracción y normalización de datos desde archivos.
-   `src/queues/`: Definición de colas y workers BullMQ.
-   `src/useCases/`: Casos de uso desacoplados para procesamiento batch y unitario.
-   `src/tests/`: Pruebas unitarias y de integración.

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
    REDIS_URL=redis://localhost:6379
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
-   Inicia el worker batch:
    ```pwsh
    npm run worker
    ```
-   Accede al panel de monitoreo de colas (Bull Board):
    -   Visita `http://localhost:3000/admin/queues` (o el puerto configurado)

---

## 🛠️ Scripts útiles

-   `npm run dev`: Ejecuta el servidor con nodemon.
-   `npm run build`: Compila TypeScript a JavaScript.
-   `npm start`: Compila y ejecuta el servidor.
-   `npm run worker`: Inicia el worker batch BullMQ.
-   `npm run migrations:generate`: Genera una nueva migración.
-   `npm run migrations:run`: Ejecuta las migraciones pendientes.
-   `npm run migrations:revert`: Revierte la última migración.

---

## 📡 Endpoints principales

-   `GET /api/prompts`: Lista todos los prompts.
-   `GET /api/prompts/:id`: Obtiene un prompt por ID.
-   `POST /api/prompts`: Crea un nuevo prompt.
-   `PUT /api/prompts/:id`: Actualiza un prompt existente.
-   `POST /api/cola/batch`: Encola un procesamiento batch de archivos.
-   `GET /api/cola/status`: Consulta el estado de la cola batch.

### Ejemplos de uso de endpoints

#### 1. Crear un nuevo prompt

**Request:**

```http
POST /api/prompts
Content-Type: application/json
{
  "name": "Análisis de ventas",
  "template": "Analiza la siguiente transcripción..."
}
```

**Response:**

```json
{
    "id": 1,
    "name": "Análisis de ventas",
    "template": "Analiza la siguiente transcripción..."
}
```

#### 2. Encolar procesamiento batch

**Request:**

```http
POST /api/cola/batch
Content-Type: application/json
{
  "servicio": 1,
  "parametrosAnalisis": 2,
  "filtroArchivos": ["460810323846693422", "460810323846693423"]
}
```

**Response:**

```json
{
    "message": "Lote encolado correctamente",
    "jobId": "1723456789012-1"
}
```

#### 3. Consultar estado de la cola batch

**Request:**

```http
GET /api/cola/status
```

**Response:**

```json
{
    "waiting": 0,
    "active": 1,
    "completed": 5,
    "failed": 0
}
```

#### 4. Obtener resultado de análisis de un audio

**Request:**

```http
GET /api/audios/460810323846693422/analisis
```

**Response:**

```json
{
  "audioId": "460810323846693422",
  "analisis": {
    "FECHA": "16/04/2025",
    "HORA": "11:03:34",
    "CLIENTE": "1000",
    "CAMPANA": "1151",
    ...
  }
}
```

#### 5. Ejemplo de entrada de archivo `.txt` procesado

```
Fecha=20250416
Hora=110334
Cliente=1000
Campaña=1151
...
```

#### 6. Ejemplo de salida normalizada en base de datos

```json
{
    "FECHA": "16/04/2025",
    "HORA": "11:03:34",
    "CLIENTE": "1000",
    "CAMPANA": "1151"
}
```

---

## 📦 Dependencias principales

-   [Express](https://expressjs.com/)
-   [TypeORM](https://typeorm.io/)
-   [OpenAI](https://www.npmjs.com/package/openai)
-   [LangChain](https://js.langchain.com/)
-   [BullMQ](https://docs.bullmq.io/)
-   [Redis](https://redis.io/)
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

-   El procesamiento batch y la arquitectura de colas están configurados en `src/config/server.ts`, `src/queues/` y `src/useCases/`.
-   El sistema está preparado para ser extendido con nuevas rutas, servicios y workers.
-   La fecha extraída de los archivos `.txt` se guarda siempre como string, nunca como objeto Date ni string largo.
-   Asegúrate de tener una clave válida de OpenAI, Redis corriendo y la configuración de base de datos correcta en tu `.env`.

---

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Por favor, abre un issue o un pull request para sugerencias o mejoras.

---

## 📄 Licencia

Este proyecto está bajo la licencia ISC.
