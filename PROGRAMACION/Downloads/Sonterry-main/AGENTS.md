# SonTerry — AGENTS.md (Orquestador)

Este archivo sirve como configuración de `GGa` (`.gga`) y como instrucción para agentes OpenCode.

## Estructura del repositorio

```
sonterry/
├── Back/         # API Node.js + Express + MongoDB  (CommonJS)
├── Front/        # React 18 + Vite                 (ESM)
├── docker-compose.yml   # Orquesta todos los servicios
├── .gga          # Code review config (usa este AGENTS.md como rules_file)
└── Doc/          # Documentación de arquitectura
```

No es un monorepo con workspaces. `Back/` y `Front/` tienen `package.json`, `node_modules/` y scripts independientes.

## Comandos Docker (desde la raíz)

| Comando | Descripción |
|---|---|
| `docker compose up -d` | Levanta todos los servicios |
| `docker compose exec api node scripts/seed.js` | Sembrar BD de desarrollo |
| `docker compose exec api node scripts/migrate.js` | Migraciones de esquema |
| `docker compose exec api node scripts/clearCache.js` | Limpiar Redis |

Servicios expuestos por defecto: Frontend `:3000` (nginx), API `:5000`, MinIO Console `:9001`, n8n `:5678`, Evolution API `:8080`.

## Reglas generales

- **Nunca** leer/escribir `.env` — están en `.gitignore`. Usar `.env.example` como referencia.
- **Respuestas API**: todas usan `{ success, message, data, timestamp }` via `formatResponse()`.
- **Convención de commits**: conventional commits (`feat:`, `fix:`, `chore:`, etc.). Sin "Co-Authored-By".
- **PR apunta a `main`**. CI ejecuta `Back: npm test` → `Front: npm run lint && npm run build`.

## Dónde buscar

- **Lógica de negocio, API, BD, workers, webhooks** → ver `Back/AGENTS.md`
- **UI, estado del cliente, rutas, queries** → ver `Front/AGENTS.md`
