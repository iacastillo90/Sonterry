# Mi-Ecommerce (SonTerry Accesorios)

Plataforma interactiva para taller de personalización textil con técnicas tradicionales de **Serigrafía** y **DTF**.

## Stack Completo

```
┌─────────────┐    ┌──────────────┐    ┌───────────────┐
│   Frontend   │    │    Backend    │    │     n8n       │
│  React+Vite  │───▶│  Express+Node │───▶│  Workflows    │
│ :5173        │    │  :5000        │    │  :5678        │
└─────────────┘    └──────┬───────┘    └───────┬───────┘
                          │                     │
                    ┌─────▼─────┐         ┌─────▼──────┐
                    │  MongoDB   │         │  Evolution  │
                    │  :27017    │         │  API (WS)   │
                    └───────────┘         │  :8080      │
                    ┌───────────┐         └────────────┘
                    │   Redis   │
                    │  :6379    │
                    └───────────┘
```

## Arranque Rápido (Todo el Stack)

```bash
# 1. Copiar y configurar variables de entorno
cp .env.example .env
# Editar .env con tus claves reales

# 2. Levantar toda la infraestructura
docker compose up -d

# 3. Sembrar base de datos con datos iniciales
docker compose exec api node src/seed.js

# 4. Ver logs en vivo
docker compose logs -f
```

### Servicios

| Servicio | Puerto | Descripción |
|---|---|---|
| **MongoDB** | `27017` | Base de datos principal y de Evolution API |
| **Redis** | `6379` | Cache, BullMQ y rate limiting |
| **API** | `5000` | Backend Express |
| **n8n** | `5678` | Automatización de flujos logísticos |
| **Evolution API** | `8080` | Bridge WhatsApp |

### Configurar n8n (primer arranque)

1. Abrir `http://localhost:5678`
2. Crear cuenta de owner
3. Crear un workflow con trigger **Webhook** (`POST /webhook/dispatch-notification`)
4. Para probar la integración completa, agregar un nodo **HTTP Request** que haga POST a `http://api:5000/api/webhooks/n8n/dispatch-callback` con header `x-webhook-secret: ${N8N_API_KEY}` y body `{"orderId":"{{$json.orderId}}","deliveryConfirmed":true}`
5. Activar el workflow

### Desarrollo Local (sin Docker)

```bash
# Backend
cd Back
cp .env.example .env
npm install
npm run seed
npm run dev      # → http://localhost:5000

# Frontend
cd Front
cp .env.example .env
npm install
npm run dev      # → http://localhost:5173
```
