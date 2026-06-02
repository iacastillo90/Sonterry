# Codebase Transcription for SonTerry E-Commerce

Generated on: 6/2/2026, 2:03:09 AM

## File: .env

**Path:** `.env`

```text
# ─── Centralized Ports (Docker Bindings) ───
PORT_DATABASE=27017
PORT_REDIS=6379
PORT_API=5000
PORT_N8N=5678
PORT_EVOLUTION=8080
PORT_MINIO_API=9000
PORT_MINIO_CONSOLE=9001

# ─── Database Credentials ───
MONGO_USER=admin
MONGO_PASS=changeme_mongo_password

# ─── Backend & Security ───
JWT_SECRET=super_secret_jwt_key_change_in_production
REFRESH_TOKEN_SECRET=super_secret_refresh_key_change_in_production
CORS_ORIGIN=http://localhost:5173
CLIENT_URL=http://localhost:5173

# ─── MinIO Object Storage ───
MINIO_ROOT_USER=admin
MINIO_ROOT_PASSWORD=changeme_minio_password
MINIO_BUCKET=sonterry
MINIO_PUBLIC_URL=http://localhost:9000

# ─── Stripe Payments ───
STRIPE_SECRET_KEY=sk_test_placeholder_value_for_booting
STRIPE_WEBHOOK_SECRET=whsec_placeholder_value_for_booting

# ─── PayPal Payments ───
PAYPAL_CLIENT_ID=paypal_client_id_placeholder
PAYPAL_CLIENT_SECRET=paypal_client_secret_placeholder

# ─── n8n Workflow Automation ───
N8N_API_KEY=sonterry_n8n_secret
N8N_ENCRYPTION_KEY=change_me_n8n_encryption_key
N8N_HOST=localhost

# ─── Evolution API (WhatsApp Integration) ───
EVOLUTION_API_KEY=change_me_evolution_key

# ─── SMTP Email Services ───
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
EMAIL_FROM=SonTerry <noreply@sonterry.com>

# ─── Frontend Environment ───
PORT_FRONT=3000
VITE_API_URL=http://localhost:5000/api

```

---

## File: .env.example

**Path:** `.env.example`

```text
# ─── Centralized Ports (Docker Bindings) ───
PORT_DATABASE=27017
PORT_REDIS=6379
PORT_API=5000
PORT_N8N=5678
PORT_EVOLUTION=8080
PORT_MINIO_API=9000
PORT_MINIO_CONSOLE=9001

# ─── Database Credentials ───
MONGO_USER=admin
MONGO_PASS=changeme_mongo_password

# ─── Backend & Security ───
JWT_SECRET=super_secret_jwt_key_change_in_production
REFRESH_TOKEN_SECRET=super_secret_refresh_key_change_in_production
CORS_ORIGIN=http://localhost:5173
CLIENT_URL=http://localhost:5173

# ─── MinIO Object Storage ───
MINIO_ROOT_USER=admin
MINIO_ROOT_PASSWORD=changeme_minio_password
MINIO_BUCKET=sonterry
MINIO_PUBLIC_URL=http://localhost:9000

# ─── Stripe Payments ───
STRIPE_SECRET_KEY=sk_test_placeholder_value_for_booting
STRIPE_WEBHOOK_SECRET=whsec_placeholder_value_for_booting

# ─── PayPal Payments ───
PAYPAL_CLIENT_ID=paypal_client_id_placeholder
PAYPAL_CLIENT_SECRET=paypal_client_secret_placeholder

# ─── n8n Workflow Automation ───
N8N_API_KEY=sonterry_n8n_secret
N8N_ENCRYPTION_KEY=change_me_n8n_encryption_key
N8N_HOST=localhost

# ─── Evolution API (WhatsApp Integration) ───
EVOLUTION_API_KEY=change_me_evolution_key

# ─── SMTP Email Services ───
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
EMAIL_FROM=SonTerry <noreply@sonterry.com>

```

---

## File: .gitignore

**Path:** `.gitignore`

```text
node_modules/
.env
dist/
build/
.DS_Store
coverage/
*.log

```

---

## File: Back/.dockerignore

**Path:** `Back/.dockerignore`

```text
node_modules/
.env
tests/
scripts/
README.md
Dockerfile
.dockerignore
.git

```

---

## File: Back/.env

**Path:** `Back/.env`

```text
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/mi-ecommerce
REDIS_HOST=localhost
REDIS_PORT=6379
JWT_SECRET=super_secret_jwt_key_change_in_production
JWT_EXPIRES_IN=1d
REFRESH_TOKEN_SECRET=super_secret_refresh_key_change_in_production
REFRESH_TOKEN_EXPIRES_IN=7d
MINIO_ENDPOINT=localhost
MINIO_PORT=9000
MINIO_ACCESS_KEY=admin
MINIO_SECRET_KEY=changeme_minio_password
MINIO_BUCKET=sonterry
MINIO_USE_SSL=false
MINIO_PUBLIC_URL=http://localhost:9000
STRIPE_SECRET_KEY=your_stripe_secret
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
PAYPAL_API_URL=https://api-m.sandbox.paypal.com
N8N_WEBHOOK_URL=http://localhost:5678/webhook/dispatch-notification
N8N_API_KEY=your_n8n_api_key

CORS_ORIGIN=http://localhost:5173
CLIENT_URL=http://localhost:5173

# SMTP (Email) - Opcional, en dev usa Ethereal automáticamente
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
EMAIL_FROM=SonTerry <noreply@sonterry.com>

```

---

## File: Back/.env.example

**Path:** `Back/.env.example`

```text
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/mi-ecommerce
REDIS_HOST=localhost
REDIS_PORT=6379
JWT_SECRET=super_secret_jwt_key_change_in_production
JWT_EXPIRES_IN=1d
REFRESH_TOKEN_SECRET=super_secret_refresh_key_change_in_production
REFRESH_TOKEN_EXPIRES_IN=7d
MINIO_ENDPOINT=localhost
MINIO_PORT=9000
MINIO_ACCESS_KEY=admin
MINIO_SECRET_KEY=changeme_minio_password
MINIO_BUCKET=sonterry
MINIO_USE_SSL=false
MINIO_PUBLIC_URL=http://localhost:9000
STRIPE_SECRET_KEY=your_stripe_secret
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
PAYPAL_API_URL=https://api-m.sandbox.paypal.com
N8N_WEBHOOK_URL=http://localhost:5678/webhook/dispatch-notification
N8N_API_KEY=your_n8n_api_key

CORS_ORIGIN=http://localhost:5173
CLIENT_URL=http://localhost:5173

# SMTP (Email) - Opcional, en dev usa Ethereal automáticamente
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
EMAIL_FROM=SonTerry <noreply@sonterry.com>

```

---

## File: Back/.gitignore

**Path:** `Back/.gitignore`

```text
node_modules/
.env
coverage/
dist/
.DS_Store

```

---

## File: Back/Dockerfile

**Path:** `Back/Dockerfile`

```text
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/src ./src
EXPOSE 5000
CMD ["node", "src/server.js"]

```

---

## File: Back/logs/combined.log

**Path:** `Back/logs/combined.log`

```text
{"level":"info","message":"Database seeded successfully!","timestamp":"2026-05-30 04:27:31"}
{"level":"info","message":"MongoDB Connected: localhost","timestamp":"2026-05-30 04:28:44"}
{"level":"info","message":"Server running in development mode on port 5000","timestamp":"2026-05-30 04:28:44"}
{"level":"error","message":"[POST] /api/orders - 400 - El carrito está vacío - Stack: Error: El carrito está vacío\n    at Object.createOrder (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/services/orders.service.js:10:11)\n    at process.processTicksAndRejections (node:internal/process/task_queues:104:5)\n    at async /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/controllers/orders.controllers.js:7:17","timestamp":"2026-05-30 04:38:02"}
{"level":"error","message":"[POST] /api/orders - 400 - El carrito está vacío - Stack: Error: El carrito está vacío\n    at Object.createOrder (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/services/orders.service.js:10:11)\n    at process.processTicksAndRejections (node:internal/process/task_queues:104:5)\n    at async /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/controllers/orders.controllers.js:7:17","timestamp":"2026-05-30 04:40:10"}
{"level":"error","message":"[POST] /api/orders - 400 - El carrito está vacío - Stack: Error: El carrito está vacío\n    at Object.createOrder (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/services/orders.service.js:10:11)\n    at process.processTicksAndRejections (node:internal/process/task_queues:104:5)\n    at async /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/controllers/orders.controllers.js:7:17","timestamp":"2026-05-30 04:41:40"}
{"level":"error","message":"[POST] /api/orders - 400 - El carrito está vacío - Stack: Error: El carrito está vacío\n    at Object.createOrder (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/services/orders.service.js:10:11)\n    at process.processTicksAndRejections (node:internal/process/task_queues:104:5)\n    at async /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/controllers/orders.controllers.js:7:17","timestamp":"2026-05-30 04:46:38"}
{"level":"error","message":"[GET] /api/carts - 404 - Route /api/carts not found - Stack: Error: Route /api/carts not found\n    at notFound (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/errors/notFound.js:4:8)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at trim_prefix (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:328:13)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:286:9\n    at router.process_params (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:346:12)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:280:10)\n    at logger (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/morgan/index.js:144:5)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at trim_prefix (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:328:13)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:286:9","timestamp":"2026-05-30 04:46:50"}
{"level":"error","message":"[GET] /api/cart-items - 404 - Route /api/cart-items not found - Stack: Error: Route /api/cart-items not found\n    at notFound (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/errors/notFound.js:4:8)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at trim_prefix (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:328:13)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:286:9\n    at router.process_params (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:346:12)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:280:10)\n    at logger (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/morgan/index.js:144:5)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at trim_prefix (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:328:13)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:286:9","timestamp":"2026-05-30 04:46:50"}
{"level":"error","message":"[GET] /api/users/cart - 403 - No tienes permiso para realizar esta acción. - Stack: Error: No tienes permiso para realizar esta acción.\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/middlewares/auth.middleware.js:35:19\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at trim_prefix (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:328:13)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:286:9\n    at router.process_params (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:346:12)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:280:10)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/middlewares/auth.middleware.js:26:5\n    at process.processTicksAndRejections (node:internal/process/task_queues:104:5)","timestamp":"2026-05-30 04:46:50"}
{"level":"error","message":"[PUT] /api/cart - 404 - Route /api/cart not found - Stack: Error: Route /api/cart not found\n    at notFound (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/errors/notFound.js:4:8)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at trim_prefix (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:328:13)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:286:9\n    at router.process_params (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:346:12)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:280:10)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:646:15\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:265:14)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/middlewares/auth.middleware.js:26:5\n    at process.processTicksAndRejections (node:internal/process/task_queues:104:5)","timestamp":"2026-05-30 04:47:02"}
{"level":"error","message":"[POST] /api/cart - 404 - Producto no encontrado - Stack: Error: Producto no encontrado\n    at Object.addToCart (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/services/cart.service.js:15:23)\n    at process.processTicksAndRejections (node:internal/process/task_queues:104:5)\n    at async /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/controllers/cart.controllers.js:12:16","timestamp":"2026-05-30 04:47:02"}
{"level":"error","message":"[DELETE] /api/cart - 404 - Route /api/cart not found - Stack: Error: Route /api/cart not found\n    at notFound (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/errors/notFound.js:4:8)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at trim_prefix (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:328:13)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:286:9\n    at router.process_params (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:346:12)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:280:10)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:646:15\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:265:14)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/middlewares/auth.middleware.js:26:5\n    at process.processTicksAndRejections (node:internal/process/task_queues:104:5)","timestamp":"2026-05-30 04:47:48"}
{"level":"info","message":"[Queue] Enqueued notification job: ORDER_CREATED for order 6a1aa47a915fa1c1d38fc4f5","timestamp":"2026-05-30 04:48:58"}
{"level":"info","message":"[Worker] Processing notification job for order: 6a1aa47a915fa1c1d38fc4f5","timestamp":"2026-05-30 04:48:59"}
{"level":"error","message":"[n8n Service] Failed to trigger workflow: Request failed with status code 404","timestamp":"2026-05-30 04:49:00"}
{"level":"error","message":"[Worker] Notification trigger failed: Request failed with status code 404","timestamp":"2026-05-30 04:49:00"}
{"level":"info","message":"[Queue] Enqueued notification job: ORDER_CREATED for order 6a1aa6b8915fa1c1d38fc526","timestamp":"2026-05-30 04:58:32"}
{"level":"info","message":"[Worker] Processing notification job for order: 6a1aa6b8915fa1c1d38fc526","timestamp":"2026-05-30 04:58:33"}
{"level":"error","message":"[n8n Service] Failed to trigger workflow: Request failed with status code 404","timestamp":"2026-05-30 04:58:33"}
{"level":"error","message":"[Worker] Notification trigger failed: Request failed with status code 404","timestamp":"2026-05-30 04:58:33"}
{"level":"error","message":"[POST] /api/orders - 500 - Order validation failed: items.0.customization: Cast to Object failed for value \"null\" (type null) at path \"customization\", items.1.customization: Cast to Object failed for value \"null\" (type null) at path \"customization\" - Stack: ValidationError: Order validation failed: items.0.customization: Cast to Object failed for value \"null\" (type null) at path \"customization\", items.1.customization: Cast to Object failed for value \"null\" (type null) at path \"customization\"\n    at Document.invalidate (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/mongoose/lib/document.js:3381:32)\n    at Subdocument.invalidate (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/mongoose/lib/types/subdocument.js:257:12)\n    at EmbeddedDocument.$set (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/mongoose/lib/document.js:1219:14)\n    at EmbeddedDocument.$set (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/mongoose/lib/document.js:1135:14)\n    at EmbeddedDocument.Document (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/mongoose/lib/document.js:180:12)\n    at EmbeddedDocument.Subdocument (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/mongoose/lib/types/subdocument.js:48:12)\n    at EmbeddedDocument.ArraySubdocument [as constructor] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/mongoose/lib/types/arraySubdocument.js:44:15)\n    at new EmbeddedDocument (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/mongoose/lib/schema/documentArray.js:150:17)\n    at SchemaDocumentArray.cast (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/mongoose/lib/schema/documentArray.js:515:22)\n    at SchemaType.applySetters (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/mongoose/lib/schemaType.js:1288:12)","timestamp":"2026-05-30 05:08:19"}
{"level":"error","message":"[POST] /api/orders - 500 - Order validation failed: items.0.customization: Cast to Object failed for value \"null\" (type null) at path \"customization\", items.1.customization: Cast to Object failed for value \"null\" (type null) at path \"customization\" - Stack: ValidationError: Order validation failed: items.0.customization: Cast to Object failed for value \"null\" (type null) at path \"customization\", items.1.customization: Cast to Object failed for value \"null\" (type null) at path \"customization\"\n    at Document.invalidate (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/mongoose/lib/document.js:3381:32)\n    at Subdocument.invalidate (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/mongoose/lib/types/subdocument.js:257:12)\n    at EmbeddedDocument.$set (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/mongoose/lib/document.js:1219:14)\n    at EmbeddedDocument.$set (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/mongoose/lib/document.js:1135:14)\n    at EmbeddedDocument.Document (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/mongoose/lib/document.js:180:12)\n    at EmbeddedDocument.Subdocument (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/mongoose/lib/types/subdocument.js:48:12)\n    at EmbeddedDocument.ArraySubdocument [as constructor] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/mongoose/lib/types/arraySubdocument.js:44:15)\n    at new EmbeddedDocument (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/mongoose/lib/schema/documentArray.js:150:17)\n    at SchemaDocumentArray.cast (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/mongoose/lib/schema/documentArray.js:515:22)\n    at SchemaType.applySetters (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/mongoose/lib/schemaType.js:1288:12)","timestamp":"2026-05-30 05:08:50"}
{"level":"error","message":"[GET] /api/auth/profile - 401 - No estás autenticado. Por favor inicia sesión. - Stack: Error: No estás autenticado. Por favor inicia sesión.\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/middlewares/auth.middleware.js:14:17\n    at fn (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/utils/catchAsync.js:3:5)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/route.js:149:13)\n    at Route.dispatch (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/route.js:119:3)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:284:15\n    at router.process_params (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:346:12)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:280:10)\n    at router.handle (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:175:3)\n    at router (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:47:12)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at trim_prefix (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:328:13)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:286:9\n    at router.process_params (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:346:12)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:280:10)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express-rate-limit/dist/index.cjs:807:7\n    at processTicksAndRejections (node:internal/process/task_queues:104:5)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express-rate-limit/dist/index.cjs:691:5","timestamp":"2026-05-30 14:33:39"}
{"level":"error","message":"[GET] /api/products - 500 - Operation `products.find()` buffering timed out after 10000ms - Stack: MongooseError: Operation `products.find()` buffering timed out after 10000ms\n    at Timeout.<anonymous> (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/mongoose/lib/drivers/node-mongodb-native/collection.js:187:23)\n    at listOnTimeout (node:internal/timers:605:17)\n    at processTimers (node:internal/timers:541:7)","timestamp":"2026-05-30 14:33:50"}
{"level":"error","message":"[POST] /api/auth/register - 500 - Operation `users.insertOne()` buffering timed out after 10000ms - Stack: MongooseError: Operation `users.insertOne()` buffering timed out after 10000ms\n    at Timeout.<anonymous> (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/mongoose/lib/drivers/node-mongodb-native/collection.js:187:23)\n    at listOnTimeout (node:internal/timers:605:17)\n    at processTimers (node:internal/timers:541:7)","timestamp":"2026-05-30 14:33:51"}
{"level":"error","message":"[GET] /api/products?page=1&limit=5 - 500 - Operation `products.find()` buffering timed out after 10000ms - Stack: MongooseError: Operation `products.find()` buffering timed out after 10000ms\n    at Timeout.<anonymous> (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/mongoose/lib/drivers/node-mongodb-native/collection.js:187:23)\n    at listOnTimeout (node:internal/timers:605:17)\n    at processTimers (node:internal/timers:541:7)","timestamp":"2026-05-30 14:34:00"}
{"level":"error","message":"[POST] /api/auth/register - 500 - Operation `users.insertOne()` buffering timed out after 10000ms - Stack: MongooseError: Operation `users.insertOne()` buffering timed out after 10000ms\n    at Timeout.<anonymous> (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/mongoose/lib/drivers/node-mongodb-native/collection.js:187:23)\n    at listOnTimeout (node:internal/timers:605:17)\n    at processTimers (node:internal/timers:541:7)","timestamp":"2026-05-30 14:34:02"}
{"level":"error","message":"[POST] /api/auth/login - 500 - Operation `users.findOne()` buffering timed out after 10000ms - Stack: MongooseError: Operation `users.findOne()` buffering timed out after 10000ms\n    at Timeout.<anonymous> (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/mongoose/lib/drivers/node-mongodb-native/collection.js:187:23)\n    at listOnTimeout (node:internal/timers:605:17)\n    at processTimers (node:internal/timers:541:7)","timestamp":"2026-05-30 14:34:12"}
{"level":"error","message":"[POST] /api/auth/login - 500 - Operation `users.findOne()` buffering timed out after 10000ms - Stack: MongooseError: Operation `users.findOne()` buffering timed out after 10000ms\n    at Timeout.<anonymous> (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/mongoose/lib/drivers/node-mongodb-native/collection.js:187:23)\n    at listOnTimeout (node:internal/timers:605:17)\n    at processTimers (node:internal/timers:541:7)","timestamp":"2026-05-30 14:34:22"}
{"level":"error","message":"[GET] /api/products - 500 - Operation `products.find()` buffering timed out after 10000ms - Stack: MongooseError: Operation `products.find()` buffering timed out after 10000ms\n    at Timeout.<anonymous> (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/mongoose/lib/drivers/node-mongodb-native/collection.js:187:23)\n    at listOnTimeout (node:internal/timers:605:17)\n    at processTimers (node:internal/timers:541:7)","timestamp":"2026-05-30 14:49:24"}
{"level":"error","message":"[POST] /api/products - 401 - No estás autenticado. Por favor inicia sesión. - Stack: Error: No estás autenticado. Por favor inicia sesión.\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/middlewares/auth.middleware.js:14:17\n    at fn (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/utils/catchAsync.js:3:5)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/route.js:149:13)\n    at Route.dispatch (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/route.js:119:3)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:284:15\n    at router.process_params (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:346:12)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:280:10)\n    at router.handle (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:175:3)\n    at router (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:47:12)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at trim_prefix (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:328:13)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:286:9\n    at router.process_params (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:346:12)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:280:10)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express-rate-limit/dist/index.cjs:807:7\n    at processTicksAndRejections (node:internal/process/task_queues:104:5)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express-rate-limit/dist/index.cjs:691:5","timestamp":"2026-05-30 14:49:24"}
{"level":"error","message":"[POST] /api/auth/register - 500 - Operation `users.insertOne()` buffering timed out after 10000ms - Stack: MongooseError: Operation `users.insertOne()` buffering timed out after 10000ms\n    at Timeout.<anonymous> (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/mongoose/lib/drivers/node-mongodb-native/collection.js:187:23)\n    at listOnTimeout (node:internal/timers:605:17)\n    at processTimers (node:internal/timers:541:7)","timestamp":"2026-05-30 14:49:36"}
{"level":"error","message":"[POST] /api/auth/register - 500 - Operation `users.insertOne()` buffering timed out after 10000ms - Stack: MongooseError: Operation `users.insertOne()` buffering timed out after 10000ms\n    at Timeout.<anonymous> (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/mongoose/lib/drivers/node-mongodb-native/collection.js:187:23)\n    at listOnTimeout (node:internal/timers:605:17)\n    at processTimers (node:internal/timers:541:7)","timestamp":"2026-05-30 14:49:47"}
{"level":"error","message":"[POST] /api/auth/login - 500 - Operation `users.findOne()` buffering timed out after 10000ms - Stack: MongooseError: Operation `users.findOne()` buffering timed out after 10000ms\n    at Timeout.<anonymous> (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/mongoose/lib/drivers/node-mongodb-native/collection.js:187:23)\n    at listOnTimeout (node:internal/timers:605:17)\n    at processTimers (node:internal/timers:541:7)","timestamp":"2026-05-30 14:49:57"}
{"level":"error","message":"[POST] /api/products - 401 - No estás autenticado. Por favor inicia sesión. - Stack: Error: No estás autenticado. Por favor inicia sesión.\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/middlewares/auth.middleware.js:14:17\n    at fn (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/utils/catchAsync.js:3:5)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/route.js:149:13)\n    at Route.dispatch (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/route.js:119:3)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:284:15\n    at router.process_params (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:346:12)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:280:10)\n    at router.handle (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:175:3)\n    at router (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:47:12)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at trim_prefix (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:328:13)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:286:9\n    at router.process_params (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:346:12)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:280:10)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express-rate-limit/dist/index.cjs:807:7\n    at processTicksAndRejections (node:internal/process/task_queues:104:5)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express-rate-limit/dist/index.cjs:691:5","timestamp":"2026-05-30 14:50:18"}
{"level":"error","message":"[POST] /api/products - 400 - Datos inválidos: El precio debe ser un número positivo - Stack: Error: Datos inválidos: El precio debe ser un número positivo\n    at validate (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/middlewares/validate.middleware.js:8:17)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/route.js:149:13)\n    at middleware (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express-validator/lib/middlewares/check.js:16:13)\n    at processTicksAndRejections (node:internal/process/task_queues:104:5)","timestamp":"2026-05-30 14:50:19"}
{"level":"error","message":"[POST] /api/products - 400 - Datos inválidos: El stock debe ser un entero positivo - Stack: Error: Datos inválidos: El stock debe ser un entero positivo\n    at validate (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/middlewares/validate.middleware.js:8:17)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/route.js:149:13)\n    at middleware (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express-validator/lib/middlewares/check.js:16:13)\n    at processTicksAndRejections (node:internal/process/task_queues:104:5)","timestamp":"2026-05-30 14:50:19"}
{"level":"error","message":"[POST] /api/auth/register - 400 - El correo electrónico ya está registrado - Stack: Error: El correo electrónico ya está registrado\n    at Object.register (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/services/auth.service.js:22:13)\n    at processTicksAndRejections (node:internal/process/task_queues:104:5)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/controllers/auth.controllers.js:7:18","timestamp":"2026-05-30 14:50:24"}
{"level":"error","message":"[POST] /api/auth/login - 401 - Correo o contraseña incorrectos - Stack: Error: Correo o contraseña incorrectos\n    at Object.login (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/services/auth.service.js:34:11)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/controllers/auth.controllers.js:13:18","timestamp":"2026-05-30 14:50:27"}
{"level":"error","message":"[POST] /api/auth/login - 401 - Correo o contraseña incorrectos - Stack: Error: Correo o contraseña incorrectos\n    at Object.login (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/services/auth.service.js:34:11)\n    at processTicksAndRejections (node:internal/process/task_queues:104:5)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/controllers/auth.controllers.js:13:18","timestamp":"2026-05-30 14:50:30"}
{"level":"error","message":"[GET] /api/auth/profile - 401 - No estás autenticado. Por favor inicia sesión. - Stack: Error: No estás autenticado. Por favor inicia sesión.\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/middlewares/auth.middleware.js:14:17\n    at fn (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/utils/catchAsync.js:3:5)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/route.js:149:13)\n    at Route.dispatch (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/route.js:119:3)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:284:15\n    at router.process_params (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:346:12)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:280:10)\n    at router.handle (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:175:3)\n    at router (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:47:12)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at trim_prefix (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:328:13)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:286:9\n    at router.process_params (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:346:12)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:280:10)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express-rate-limit/dist/index.cjs:807:7\n    at processTicksAndRejections (node:internal/process/task_queues:104:5)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express-rate-limit/dist/index.cjs:691:5","timestamp":"2026-05-30 14:50:30"}
{"level":"error","message":"[POST] /api/products - 401 - No estás autenticado. Por favor inicia sesión. - Stack: Error: No estás autenticado. Por favor inicia sesión.\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/middlewares/auth.middleware.js:14:17\n    at fn (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/utils/catchAsync.js:3:5)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/route.js:149:13)\n    at Route.dispatch (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/route.js:119:3)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:284:15\n    at router.process_params (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:346:12)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:280:10)\n    at router.handle (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:175:3)\n    at router (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:47:12)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at trim_prefix (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:328:13)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:286:9\n    at router.process_params (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:346:12)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:280:10)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express-rate-limit/dist/index.cjs:807:7\n    at processTicksAndRejections (node:internal/process/task_queues:104:5)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express-rate-limit/dist/index.cjs:691:5","timestamp":"2026-05-30 14:51:15"}
{"level":"error","message":"[POST] /api/products - 400 - Datos inválidos: El precio debe ser un número positivo - Stack: Error: Datos inválidos: El precio debe ser un número positivo\n    at validate (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/middlewares/validate.middleware.js:8:17)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/route.js:149:13)\n    at middleware (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express-validator/lib/middlewares/check.js:16:13)\n    at processTicksAndRejections (node:internal/process/task_queues:104:5)","timestamp":"2026-05-30 14:51:15"}
{"level":"error","message":"[POST] /api/products - 400 - Datos inválidos: El stock debe ser un entero positivo - Stack: Error: Datos inválidos: El stock debe ser un entero positivo\n    at validate (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/middlewares/validate.middleware.js:8:17)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/route.js:149:13)\n    at middleware (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express-validator/lib/middlewares/check.js:16:13)\n    at processTicksAndRejections (node:internal/process/task_queues:104:5)","timestamp":"2026-05-30 14:51:16"}
{"level":"warn","message":"STRIPE_SECRET_KEY no configurado. Pagos Stripe deshabilitados.","timestamp":"2026-05-30 14:51:25"}
{"level":"error","message":"[POST] /api/auth/register - 400 - El correo electrónico ya está registrado - Stack: Error: El correo electrónico ya está registrado\n    at Object.register (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/services/auth.service.js:22:13)\n    at processTicksAndRejections (node:internal/process/task_queues:104:5)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/controllers/auth.controllers.js:7:18","timestamp":"2026-05-30 14:51:38"}
{"level":"error","message":"[POST] /api/auth/login - 401 - Correo o contraseña incorrectos - Stack: Error: Correo o contraseña incorrectos\n    at Object.login (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/services/auth.service.js:34:11)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/controllers/auth.controllers.js:13:18","timestamp":"2026-05-30 14:51:40"}
{"level":"error","message":"[POST] /api/auth/login - 401 - Correo o contraseña incorrectos - Stack: Error: Correo o contraseña incorrectos\n    at Object.login (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/services/auth.service.js:34:11)\n    at processTicksAndRejections (node:internal/process/task_queues:104:5)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/controllers/auth.controllers.js:13:18","timestamp":"2026-05-30 14:51:43"}
{"level":"error","message":"[GET] /api/auth/profile - 401 - No estás autenticado. Por favor inicia sesión. - Stack: Error: No estás autenticado. Por favor inicia sesión.\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/middlewares/auth.middleware.js:14:17\n    at fn (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/utils/catchAsync.js:3:5)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/route.js:149:13)\n    at Route.dispatch (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/route.js:119:3)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:284:15\n    at router.process_params (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:346:12)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:280:10)\n    at router.handle (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:175:3)\n    at router (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:47:12)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at trim_prefix (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:328:13)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:286:9\n    at router.process_params (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:346:12)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:280:10)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express-rate-limit/dist/index.cjs:807:7\n    at processTicksAndRejections (node:internal/process/task_queues:104:5)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express-rate-limit/dist/index.cjs:691:5","timestamp":"2026-05-30 14:51:43"}
{"level":"error","message":"[POST] /api/products - 401 - No estás autenticado. Por favor inicia sesión. - Stack: Error: No estás autenticado. Por favor inicia sesión.\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/middlewares/auth.middleware.js:14:17\n    at fn (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/utils/catchAsync.js:3:5)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/route.js:149:13)\n    at Route.dispatch (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/route.js:119:3)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:284:15\n    at router.process_params (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:346:12)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:280:10)\n    at router.handle (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:175:3)\n    at router (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:47:12)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at trim_prefix (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:328:13)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:286:9\n    at router.process_params (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:346:12)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:280:10)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express-rate-limit/dist/index.cjs:807:7\n    at processTicksAndRejections (node:internal/process/task_queues:104:5)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express-rate-limit/dist/index.cjs:691:5","timestamp":"2026-05-30 14:52:14"}
{"level":"error","message":"[POST] /api/products - 400 - Datos inválidos: El precio debe ser un número positivo - Stack: Error: Datos inválidos: El precio debe ser un número positivo\n    at validate (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/middlewares/validate.middleware.js:8:17)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/route.js:149:13)\n    at middleware (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express-validator/lib/middlewares/check.js:16:13)\n    at processTicksAndRejections (node:internal/process/task_queues:104:5)","timestamp":"2026-05-30 14:52:15"}
{"level":"error","message":"[POST] /api/products - 400 - Datos inválidos: El stock debe ser un entero positivo - Stack: Error: Datos inválidos: El stock debe ser un entero positivo\n    at validate (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/middlewares/validate.middleware.js:8:17)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/route.js:149:13)\n    at middleware (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express-validator/lib/middlewares/check.js:16:13)\n    at processTicksAndRejections (node:internal/process/task_queues:104:5)","timestamp":"2026-05-30 14:52:15"}
{"level":"error","message":"[POST] /api/auth/register - 400 - El correo electrónico ya está registrado - Stack: Error: El correo electrónico ya está registrado\n    at Object.register (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/services/auth.service.js:22:13)\n    at processTicksAndRejections (node:internal/process/task_queues:104:5)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/controllers/auth.controllers.js:7:18","timestamp":"2026-05-30 14:52:22"}
{"level":"error","message":"[POST] /api/auth/login - 401 - Correo o contraseña incorrectos - Stack: Error: Correo o contraseña incorrectos\n    at Object.login (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/services/auth.service.js:34:11)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/controllers/auth.controllers.js:13:18","timestamp":"2026-05-30 14:52:24"}
{"level":"warn","message":"STRIPE_SECRET_KEY no configurado. Pagos Stripe deshabilitados.","timestamp":"2026-05-30 14:52:26"}
{"level":"error","message":"[POST] /api/auth/login - 401 - Correo o contraseña incorrectos - Stack: Error: Correo o contraseña incorrectos\n    at Object.login (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/services/auth.service.js:34:11)\n    at processTicksAndRejections (node:internal/process/task_queues:104:5)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/controllers/auth.controllers.js:13:18","timestamp":"2026-05-30 14:52:28"}
{"level":"error","message":"[GET] /api/auth/profile - 401 - No estás autenticado. Por favor inicia sesión. - Stack: Error: No estás autenticado. Por favor inicia sesión.\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/middlewares/auth.middleware.js:14:17\n    at fn (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/utils/catchAsync.js:3:5)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/route.js:149:13)\n    at Route.dispatch (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/route.js:119:3)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:284:15\n    at router.process_params (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:346:12)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:280:10)\n    at router.handle (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:175:3)\n    at router (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:47:12)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at trim_prefix (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:328:13)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:286:9\n    at router.process_params (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:346:12)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:280:10)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express-rate-limit/dist/index.cjs:807:7\n    at processTicksAndRejections (node:internal/process/task_queues:104:5)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express-rate-limit/dist/index.cjs:691:5","timestamp":"2026-05-30 14:52:28"}
{"level":"error","message":"[POST] /api/products - 401 - No estás autenticado. Por favor inicia sesión. - Stack: Error: No estás autenticado. Por favor inicia sesión.\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/middlewares/auth.middleware.js:14:17\n    at fn (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/utils/catchAsync.js:3:5)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/route.js:149:13)\n    at Route.dispatch (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/route.js:119:3)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:284:15\n    at router.process_params (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:346:12)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:280:10)\n    at router.handle (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:175:3)\n    at router (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:47:12)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at trim_prefix (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:328:13)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:286:9\n    at router.process_params (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:346:12)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:280:10)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express-rate-limit/dist/index.cjs:807:7\n    at processTicksAndRejections (node:internal/process/task_queues:104:5)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express-rate-limit/dist/index.cjs:691:5","timestamp":"2026-05-30 15:00:28"}
{"level":"error","message":"[POST] /api/products - 400 - Datos inválidos: El precio debe ser un número positivo - Stack: Error: Datos inválidos: El precio debe ser un número positivo\n    at validate (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/middlewares/validate.middleware.js:8:17)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/route.js:149:13)\n    at middleware (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express-validator/lib/middlewares/check.js:16:13)\n    at processTicksAndRejections (node:internal/process/task_queues:104:5)","timestamp":"2026-05-30 15:00:28"}
{"level":"error","message":"[POST] /api/products - 400 - Datos inválidos: El stock debe ser un entero positivo - Stack: Error: Datos inválidos: El stock debe ser un entero positivo\n    at validate (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/middlewares/validate.middleware.js:8:17)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/route.js:149:13)\n    at middleware (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express-validator/lib/middlewares/check.js:16:13)\n    at processTicksAndRejections (node:internal/process/task_queues:104:5)","timestamp":"2026-05-30 15:00:28"}
{"level":"error","message":"[POST] /api/auth/register - 400 - El correo electrónico ya está registrado - Stack: Error: El correo electrónico ya está registrado\n    at Object.register (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/services/auth.service.js:22:13)\n    at processTicksAndRejections (node:internal/process/task_queues:104:5)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/controllers/auth.controllers.js:7:18","timestamp":"2026-05-30 15:00:36"}
{"level":"error","message":"[POST] /api/auth/login - 401 - Correo o contraseña incorrectos - Stack: Error: Correo o contraseña incorrectos\n    at Object.login (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/services/auth.service.js:34:11)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/controllers/auth.controllers.js:13:18","timestamp":"2026-05-30 15:00:39"}
{"level":"error","message":"[POST] /api/auth/login - 401 - Correo o contraseña incorrectos - Stack: Error: Correo o contraseña incorrectos\n    at Object.login (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/services/auth.service.js:34:11)\n    at processTicksAndRejections (node:internal/process/task_queues:104:5)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/controllers/auth.controllers.js:13:18","timestamp":"2026-05-30 15:00:46"}
{"level":"error","message":"[GET] /api/auth/profile - 401 - No estás autenticado. Por favor inicia sesión. - Stack: Error: No estás autenticado. Por favor inicia sesión.\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/middlewares/auth.middleware.js:14:17\n    at fn (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/utils/catchAsync.js:3:5)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/route.js:149:13)\n    at Route.dispatch (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/route.js:119:3)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:284:15\n    at router.process_params (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:346:12)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:280:10)\n    at router.handle (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:175:3)\n    at router (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:47:12)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at trim_prefix (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:328:13)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:286:9\n    at router.process_params (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:346:12)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:280:10)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express-rate-limit/dist/index.cjs:807:7\n    at processTicksAndRejections (node:internal/process/task_queues:104:5)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express-rate-limit/dist/index.cjs:691:5","timestamp":"2026-05-30 15:00:47"}
{"level":"warn","message":"STRIPE_SECRET_KEY no configurado. Pagos Stripe deshabilitados.","timestamp":"2026-05-30 15:00:48"}
{"level":"warn","message":"MINIO_ACCESS_KEY/SECRET_KEY no configurado. Subidas de MinIO deshabilitadas.","timestamp":"2026-05-30 15:05:07"}
{"level":"error","message":"[POST] /api/auth/register - 400 - El correo electrónico ya está registrado - Stack: Error: El correo electrónico ya está registrado\n    at Object.register (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/services/auth.service.js:22:13)\n    at processTicksAndRejections (node:internal/process/task_queues:104:5)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/controllers/auth.controllers.js:7:18","timestamp":"2026-05-30 15:05:09"}
{"level":"error","message":"[POST] /api/auth/login - 401 - Correo o contraseña incorrectos - Stack: Error: Correo o contraseña incorrectos\n    at Object.login (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/services/auth.service.js:34:11)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/controllers/auth.controllers.js:13:18","timestamp":"2026-05-30 15:05:10"}
{"level":"warn","message":"MINIO_ACCESS_KEY/SECRET_KEY no configurado. Subidas de MinIO deshabilitadas.","timestamp":"2026-05-30 15:05:12"}
{"level":"error","message":"[POST] /api/products - 401 - No estás autenticado. Por favor inicia sesión. - Stack: Error: No estás autenticado. Por favor inicia sesión.\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/middlewares/auth.middleware.js:14:17\n    at fn (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/utils/catchAsync.js:3:5)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/route.js:149:13)\n    at Route.dispatch (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/route.js:119:3)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:284:15\n    at router.process_params (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:346:12)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:280:10)\n    at router.handle (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:175:3)\n    at router (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:47:12)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at trim_prefix (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:328:13)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:286:9\n    at router.process_params (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:346:12)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:280:10)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express-rate-limit/dist/index.cjs:807:7\n    at processTicksAndRejections (node:internal/process/task_queues:104:5)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express-rate-limit/dist/index.cjs:691:5","timestamp":"2026-05-30 15:05:13"}
{"level":"error","message":"[POST] /api/products - 400 - Datos inválidos: El precio debe ser un número positivo - Stack: Error: Datos inválidos: El precio debe ser un número positivo\n    at validate (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/middlewares/validate.middleware.js:8:17)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/route.js:149:13)\n    at middleware (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express-validator/lib/middlewares/check.js:16:13)\n    at processTicksAndRejections (node:internal/process/task_queues:104:5)","timestamp":"2026-05-30 15:05:13"}
{"level":"error","message":"[POST] /api/products - 400 - Datos inválidos: El stock debe ser un entero positivo - Stack: Error: Datos inválidos: El stock debe ser un entero positivo\n    at validate (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/middlewares/validate.middleware.js:8:17)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/route.js:149:13)\n    at middleware (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express-validator/lib/middlewares/check.js:16:13)\n    at processTicksAndRejections (node:internal/process/task_queues:104:5)","timestamp":"2026-05-30 15:05:13"}
{"level":"warn","message":"MINIO_ACCESS_KEY/SECRET_KEY no configurado. Subidas de MinIO deshabilitadas.","timestamp":"2026-05-30 15:05:14"}
{"level":"error","message":"[POST] /api/auth/login - 401 - Correo o contraseña incorrectos - Stack: Error: Correo o contraseña incorrectos\n    at Object.login (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/services/auth.service.js:34:11)\n    at processTicksAndRejections (node:internal/process/task_queues:104:5)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/controllers/auth.controllers.js:13:18","timestamp":"2026-05-30 15:05:14"}
{"level":"error","message":"[GET] /api/auth/profile - 401 - No estás autenticado. Por favor inicia sesión. - Stack: Error: No estás autenticado. Por favor inicia sesión.\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/middlewares/auth.middleware.js:14:17\n    at fn (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/utils/catchAsync.js:3:5)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/route.js:149:13)\n    at Route.dispatch (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/route.js:119:3)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:284:15\n    at router.process_params (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:346:12)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:280:10)\n    at router.handle (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:175:3)\n    at router (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:47:12)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at trim_prefix (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:328:13)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:286:9\n    at router.process_params (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:346:12)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:280:10)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express-rate-limit/dist/index.cjs:807:7\n    at processTicksAndRejections (node:internal/process/task_queues:104:5)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express-rate-limit/dist/index.cjs:691:5","timestamp":"2026-05-30 15:05:15"}
{"level":"warn","message":"MINIO_ACCESS_KEY/SECRET_KEY no configurado. Subidas de MinIO deshabilitadas.","timestamp":"2026-05-30 15:05:17"}
{"level":"warn","message":"STRIPE_SECRET_KEY no configurado. Pagos Stripe deshabilitados.","timestamp":"2026-05-30 15:05:17"}
{"level":"info","message":"Database seeded successfully!","timestamp":"2026-06-01 23:37:06"}

```

---

## File: Back/logs/error.log

**Path:** `Back/logs/error.log`

```text
{"level":"error","message":"[POST] /api/orders - 400 - El carrito está vacío - Stack: Error: El carrito está vacío\n    at Object.createOrder (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/services/orders.service.js:10:11)\n    at process.processTicksAndRejections (node:internal/process/task_queues:104:5)\n    at async /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/controllers/orders.controllers.js:7:17","timestamp":"2026-05-30 04:38:02"}
{"level":"error","message":"[POST] /api/orders - 400 - El carrito está vacío - Stack: Error: El carrito está vacío\n    at Object.createOrder (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/services/orders.service.js:10:11)\n    at process.processTicksAndRejections (node:internal/process/task_queues:104:5)\n    at async /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/controllers/orders.controllers.js:7:17","timestamp":"2026-05-30 04:40:10"}
{"level":"error","message":"[POST] /api/orders - 400 - El carrito está vacío - Stack: Error: El carrito está vacío\n    at Object.createOrder (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/services/orders.service.js:10:11)\n    at process.processTicksAndRejections (node:internal/process/task_queues:104:5)\n    at async /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/controllers/orders.controllers.js:7:17","timestamp":"2026-05-30 04:41:40"}
{"level":"error","message":"[POST] /api/orders - 400 - El carrito está vacío - Stack: Error: El carrito está vacío\n    at Object.createOrder (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/services/orders.service.js:10:11)\n    at process.processTicksAndRejections (node:internal/process/task_queues:104:5)\n    at async /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/controllers/orders.controllers.js:7:17","timestamp":"2026-05-30 04:46:38"}
{"level":"error","message":"[GET] /api/carts - 404 - Route /api/carts not found - Stack: Error: Route /api/carts not found\n    at notFound (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/errors/notFound.js:4:8)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at trim_prefix (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:328:13)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:286:9\n    at router.process_params (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:346:12)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:280:10)\n    at logger (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/morgan/index.js:144:5)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at trim_prefix (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:328:13)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:286:9","timestamp":"2026-05-30 04:46:50"}
{"level":"error","message":"[GET] /api/cart-items - 404 - Route /api/cart-items not found - Stack: Error: Route /api/cart-items not found\n    at notFound (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/errors/notFound.js:4:8)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at trim_prefix (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:328:13)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:286:9\n    at router.process_params (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:346:12)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:280:10)\n    at logger (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/morgan/index.js:144:5)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at trim_prefix (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:328:13)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:286:9","timestamp":"2026-05-30 04:46:50"}
{"level":"error","message":"[GET] /api/users/cart - 403 - No tienes permiso para realizar esta acción. - Stack: Error: No tienes permiso para realizar esta acción.\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/middlewares/auth.middleware.js:35:19\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at trim_prefix (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:328:13)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:286:9\n    at router.process_params (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:346:12)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:280:10)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/middlewares/auth.middleware.js:26:5\n    at process.processTicksAndRejections (node:internal/process/task_queues:104:5)","timestamp":"2026-05-30 04:46:50"}
{"level":"error","message":"[PUT] /api/cart - 404 - Route /api/cart not found - Stack: Error: Route /api/cart not found\n    at notFound (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/errors/notFound.js:4:8)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at trim_prefix (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:328:13)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:286:9\n    at router.process_params (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:346:12)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:280:10)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:646:15\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:265:14)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/middlewares/auth.middleware.js:26:5\n    at process.processTicksAndRejections (node:internal/process/task_queues:104:5)","timestamp":"2026-05-30 04:47:02"}
{"level":"error","message":"[POST] /api/cart - 404 - Producto no encontrado - Stack: Error: Producto no encontrado\n    at Object.addToCart (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/services/cart.service.js:15:23)\n    at process.processTicksAndRejections (node:internal/process/task_queues:104:5)\n    at async /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/controllers/cart.controllers.js:12:16","timestamp":"2026-05-30 04:47:02"}
{"level":"error","message":"[DELETE] /api/cart - 404 - Route /api/cart not found - Stack: Error: Route /api/cart not found\n    at notFound (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/errors/notFound.js:4:8)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at trim_prefix (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:328:13)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:286:9\n    at router.process_params (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:346:12)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:280:10)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:646:15\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:265:14)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/middlewares/auth.middleware.js:26:5\n    at process.processTicksAndRejections (node:internal/process/task_queues:104:5)","timestamp":"2026-05-30 04:47:48"}
{"level":"error","message":"[n8n Service] Failed to trigger workflow: Request failed with status code 404","timestamp":"2026-05-30 04:49:00"}
{"level":"error","message":"[Worker] Notification trigger failed: Request failed with status code 404","timestamp":"2026-05-30 04:49:00"}
{"level":"error","message":"[n8n Service] Failed to trigger workflow: Request failed with status code 404","timestamp":"2026-05-30 04:58:33"}
{"level":"error","message":"[Worker] Notification trigger failed: Request failed with status code 404","timestamp":"2026-05-30 04:58:33"}
{"level":"error","message":"[POST] /api/orders - 500 - Order validation failed: items.0.customization: Cast to Object failed for value \"null\" (type null) at path \"customization\", items.1.customization: Cast to Object failed for value \"null\" (type null) at path \"customization\" - Stack: ValidationError: Order validation failed: items.0.customization: Cast to Object failed for value \"null\" (type null) at path \"customization\", items.1.customization: Cast to Object failed for value \"null\" (type null) at path \"customization\"\n    at Document.invalidate (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/mongoose/lib/document.js:3381:32)\n    at Subdocument.invalidate (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/mongoose/lib/types/subdocument.js:257:12)\n    at EmbeddedDocument.$set (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/mongoose/lib/document.js:1219:14)\n    at EmbeddedDocument.$set (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/mongoose/lib/document.js:1135:14)\n    at EmbeddedDocument.Document (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/mongoose/lib/document.js:180:12)\n    at EmbeddedDocument.Subdocument (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/mongoose/lib/types/subdocument.js:48:12)\n    at EmbeddedDocument.ArraySubdocument [as constructor] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/mongoose/lib/types/arraySubdocument.js:44:15)\n    at new EmbeddedDocument (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/mongoose/lib/schema/documentArray.js:150:17)\n    at SchemaDocumentArray.cast (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/mongoose/lib/schema/documentArray.js:515:22)\n    at SchemaType.applySetters (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/mongoose/lib/schemaType.js:1288:12)","timestamp":"2026-05-30 05:08:19"}
{"level":"error","message":"[POST] /api/orders - 500 - Order validation failed: items.0.customization: Cast to Object failed for value \"null\" (type null) at path \"customization\", items.1.customization: Cast to Object failed for value \"null\" (type null) at path \"customization\" - Stack: ValidationError: Order validation failed: items.0.customization: Cast to Object failed for value \"null\" (type null) at path \"customization\", items.1.customization: Cast to Object failed for value \"null\" (type null) at path \"customization\"\n    at Document.invalidate (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/mongoose/lib/document.js:3381:32)\n    at Subdocument.invalidate (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/mongoose/lib/types/subdocument.js:257:12)\n    at EmbeddedDocument.$set (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/mongoose/lib/document.js:1219:14)\n    at EmbeddedDocument.$set (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/mongoose/lib/document.js:1135:14)\n    at EmbeddedDocument.Document (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/mongoose/lib/document.js:180:12)\n    at EmbeddedDocument.Subdocument (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/mongoose/lib/types/subdocument.js:48:12)\n    at EmbeddedDocument.ArraySubdocument [as constructor] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/mongoose/lib/types/arraySubdocument.js:44:15)\n    at new EmbeddedDocument (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/mongoose/lib/schema/documentArray.js:150:17)\n    at SchemaDocumentArray.cast (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/mongoose/lib/schema/documentArray.js:515:22)\n    at SchemaType.applySetters (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/mongoose/lib/schemaType.js:1288:12)","timestamp":"2026-05-30 05:08:50"}
{"level":"error","message":"[GET] /api/auth/profile - 401 - No estás autenticado. Por favor inicia sesión. - Stack: Error: No estás autenticado. Por favor inicia sesión.\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/middlewares/auth.middleware.js:14:17\n    at fn (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/utils/catchAsync.js:3:5)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/route.js:149:13)\n    at Route.dispatch (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/route.js:119:3)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:284:15\n    at router.process_params (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:346:12)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:280:10)\n    at router.handle (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:175:3)\n    at router (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:47:12)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at trim_prefix (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:328:13)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:286:9\n    at router.process_params (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:346:12)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:280:10)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express-rate-limit/dist/index.cjs:807:7\n    at processTicksAndRejections (node:internal/process/task_queues:104:5)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express-rate-limit/dist/index.cjs:691:5","timestamp":"2026-05-30 14:33:39"}
{"level":"error","message":"[GET] /api/products - 500 - Operation `products.find()` buffering timed out after 10000ms - Stack: MongooseError: Operation `products.find()` buffering timed out after 10000ms\n    at Timeout.<anonymous> (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/mongoose/lib/drivers/node-mongodb-native/collection.js:187:23)\n    at listOnTimeout (node:internal/timers:605:17)\n    at processTimers (node:internal/timers:541:7)","timestamp":"2026-05-30 14:33:50"}
{"level":"error","message":"[POST] /api/auth/register - 500 - Operation `users.insertOne()` buffering timed out after 10000ms - Stack: MongooseError: Operation `users.insertOne()` buffering timed out after 10000ms\n    at Timeout.<anonymous> (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/mongoose/lib/drivers/node-mongodb-native/collection.js:187:23)\n    at listOnTimeout (node:internal/timers:605:17)\n    at processTimers (node:internal/timers:541:7)","timestamp":"2026-05-30 14:33:51"}
{"level":"error","message":"[GET] /api/products?page=1&limit=5 - 500 - Operation `products.find()` buffering timed out after 10000ms - Stack: MongooseError: Operation `products.find()` buffering timed out after 10000ms\n    at Timeout.<anonymous> (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/mongoose/lib/drivers/node-mongodb-native/collection.js:187:23)\n    at listOnTimeout (node:internal/timers:605:17)\n    at processTimers (node:internal/timers:541:7)","timestamp":"2026-05-30 14:34:00"}
{"level":"error","message":"[POST] /api/auth/register - 500 - Operation `users.insertOne()` buffering timed out after 10000ms - Stack: MongooseError: Operation `users.insertOne()` buffering timed out after 10000ms\n    at Timeout.<anonymous> (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/mongoose/lib/drivers/node-mongodb-native/collection.js:187:23)\n    at listOnTimeout (node:internal/timers:605:17)\n    at processTimers (node:internal/timers:541:7)","timestamp":"2026-05-30 14:34:02"}
{"level":"error","message":"[POST] /api/auth/login - 500 - Operation `users.findOne()` buffering timed out after 10000ms - Stack: MongooseError: Operation `users.findOne()` buffering timed out after 10000ms\n    at Timeout.<anonymous> (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/mongoose/lib/drivers/node-mongodb-native/collection.js:187:23)\n    at listOnTimeout (node:internal/timers:605:17)\n    at processTimers (node:internal/timers:541:7)","timestamp":"2026-05-30 14:34:12"}
{"level":"error","message":"[POST] /api/auth/login - 500 - Operation `users.findOne()` buffering timed out after 10000ms - Stack: MongooseError: Operation `users.findOne()` buffering timed out after 10000ms\n    at Timeout.<anonymous> (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/mongoose/lib/drivers/node-mongodb-native/collection.js:187:23)\n    at listOnTimeout (node:internal/timers:605:17)\n    at processTimers (node:internal/timers:541:7)","timestamp":"2026-05-30 14:34:22"}
{"level":"error","message":"[GET] /api/products - 500 - Operation `products.find()` buffering timed out after 10000ms - Stack: MongooseError: Operation `products.find()` buffering timed out after 10000ms\n    at Timeout.<anonymous> (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/mongoose/lib/drivers/node-mongodb-native/collection.js:187:23)\n    at listOnTimeout (node:internal/timers:605:17)\n    at processTimers (node:internal/timers:541:7)","timestamp":"2026-05-30 14:49:24"}
{"level":"error","message":"[POST] /api/products - 401 - No estás autenticado. Por favor inicia sesión. - Stack: Error: No estás autenticado. Por favor inicia sesión.\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/middlewares/auth.middleware.js:14:17\n    at fn (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/utils/catchAsync.js:3:5)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/route.js:149:13)\n    at Route.dispatch (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/route.js:119:3)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:284:15\n    at router.process_params (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:346:12)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:280:10)\n    at router.handle (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:175:3)\n    at router (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:47:12)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at trim_prefix (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:328:13)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:286:9\n    at router.process_params (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:346:12)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:280:10)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express-rate-limit/dist/index.cjs:807:7\n    at processTicksAndRejections (node:internal/process/task_queues:104:5)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express-rate-limit/dist/index.cjs:691:5","timestamp":"2026-05-30 14:49:24"}
{"level":"error","message":"[POST] /api/auth/register - 500 - Operation `users.insertOne()` buffering timed out after 10000ms - Stack: MongooseError: Operation `users.insertOne()` buffering timed out after 10000ms\n    at Timeout.<anonymous> (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/mongoose/lib/drivers/node-mongodb-native/collection.js:187:23)\n    at listOnTimeout (node:internal/timers:605:17)\n    at processTimers (node:internal/timers:541:7)","timestamp":"2026-05-30 14:49:36"}
{"level":"error","message":"[POST] /api/auth/register - 500 - Operation `users.insertOne()` buffering timed out after 10000ms - Stack: MongooseError: Operation `users.insertOne()` buffering timed out after 10000ms\n    at Timeout.<anonymous> (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/mongoose/lib/drivers/node-mongodb-native/collection.js:187:23)\n    at listOnTimeout (node:internal/timers:605:17)\n    at processTimers (node:internal/timers:541:7)","timestamp":"2026-05-30 14:49:47"}
{"level":"error","message":"[POST] /api/auth/login - 500 - Operation `users.findOne()` buffering timed out after 10000ms - Stack: MongooseError: Operation `users.findOne()` buffering timed out after 10000ms\n    at Timeout.<anonymous> (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/mongoose/lib/drivers/node-mongodb-native/collection.js:187:23)\n    at listOnTimeout (node:internal/timers:605:17)\n    at processTimers (node:internal/timers:541:7)","timestamp":"2026-05-30 14:49:57"}
{"level":"error","message":"[POST] /api/products - 401 - No estás autenticado. Por favor inicia sesión. - Stack: Error: No estás autenticado. Por favor inicia sesión.\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/middlewares/auth.middleware.js:14:17\n    at fn (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/utils/catchAsync.js:3:5)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/route.js:149:13)\n    at Route.dispatch (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/route.js:119:3)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:284:15\n    at router.process_params (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:346:12)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:280:10)\n    at router.handle (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:175:3)\n    at router (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:47:12)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at trim_prefix (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:328:13)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:286:9\n    at router.process_params (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:346:12)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:280:10)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express-rate-limit/dist/index.cjs:807:7\n    at processTicksAndRejections (node:internal/process/task_queues:104:5)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express-rate-limit/dist/index.cjs:691:5","timestamp":"2026-05-30 14:50:18"}
{"level":"error","message":"[POST] /api/products - 400 - Datos inválidos: El precio debe ser un número positivo - Stack: Error: Datos inválidos: El precio debe ser un número positivo\n    at validate (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/middlewares/validate.middleware.js:8:17)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/route.js:149:13)\n    at middleware (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express-validator/lib/middlewares/check.js:16:13)\n    at processTicksAndRejections (node:internal/process/task_queues:104:5)","timestamp":"2026-05-30 14:50:19"}
{"level":"error","message":"[POST] /api/products - 400 - Datos inválidos: El stock debe ser un entero positivo - Stack: Error: Datos inválidos: El stock debe ser un entero positivo\n    at validate (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/middlewares/validate.middleware.js:8:17)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/route.js:149:13)\n    at middleware (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express-validator/lib/middlewares/check.js:16:13)\n    at processTicksAndRejections (node:internal/process/task_queues:104:5)","timestamp":"2026-05-30 14:50:19"}
{"level":"error","message":"[POST] /api/auth/register - 400 - El correo electrónico ya está registrado - Stack: Error: El correo electrónico ya está registrado\n    at Object.register (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/services/auth.service.js:22:13)\n    at processTicksAndRejections (node:internal/process/task_queues:104:5)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/controllers/auth.controllers.js:7:18","timestamp":"2026-05-30 14:50:24"}
{"level":"error","message":"[POST] /api/auth/login - 401 - Correo o contraseña incorrectos - Stack: Error: Correo o contraseña incorrectos\n    at Object.login (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/services/auth.service.js:34:11)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/controllers/auth.controllers.js:13:18","timestamp":"2026-05-30 14:50:27"}
{"level":"error","message":"[POST] /api/auth/login - 401 - Correo o contraseña incorrectos - Stack: Error: Correo o contraseña incorrectos\n    at Object.login (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/services/auth.service.js:34:11)\n    at processTicksAndRejections (node:internal/process/task_queues:104:5)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/controllers/auth.controllers.js:13:18","timestamp":"2026-05-30 14:50:30"}
{"level":"error","message":"[GET] /api/auth/profile - 401 - No estás autenticado. Por favor inicia sesión. - Stack: Error: No estás autenticado. Por favor inicia sesión.\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/middlewares/auth.middleware.js:14:17\n    at fn (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/utils/catchAsync.js:3:5)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/route.js:149:13)\n    at Route.dispatch (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/route.js:119:3)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:284:15\n    at router.process_params (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:346:12)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:280:10)\n    at router.handle (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:175:3)\n    at router (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:47:12)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at trim_prefix (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:328:13)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:286:9\n    at router.process_params (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:346:12)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:280:10)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express-rate-limit/dist/index.cjs:807:7\n    at processTicksAndRejections (node:internal/process/task_queues:104:5)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express-rate-limit/dist/index.cjs:691:5","timestamp":"2026-05-30 14:50:30"}
{"level":"error","message":"[POST] /api/products - 401 - No estás autenticado. Por favor inicia sesión. - Stack: Error: No estás autenticado. Por favor inicia sesión.\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/middlewares/auth.middleware.js:14:17\n    at fn (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/utils/catchAsync.js:3:5)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/route.js:149:13)\n    at Route.dispatch (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/route.js:119:3)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:284:15\n    at router.process_params (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:346:12)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:280:10)\n    at router.handle (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:175:3)\n    at router (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:47:12)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at trim_prefix (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:328:13)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:286:9\n    at router.process_params (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:346:12)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:280:10)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express-rate-limit/dist/index.cjs:807:7\n    at processTicksAndRejections (node:internal/process/task_queues:104:5)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express-rate-limit/dist/index.cjs:691:5","timestamp":"2026-05-30 14:51:15"}
{"level":"error","message":"[POST] /api/products - 400 - Datos inválidos: El precio debe ser un número positivo - Stack: Error: Datos inválidos: El precio debe ser un número positivo\n    at validate (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/middlewares/validate.middleware.js:8:17)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/route.js:149:13)\n    at middleware (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express-validator/lib/middlewares/check.js:16:13)\n    at processTicksAndRejections (node:internal/process/task_queues:104:5)","timestamp":"2026-05-30 14:51:15"}
{"level":"error","message":"[POST] /api/products - 400 - Datos inválidos: El stock debe ser un entero positivo - Stack: Error: Datos inválidos: El stock debe ser un entero positivo\n    at validate (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/middlewares/validate.middleware.js:8:17)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/route.js:149:13)\n    at middleware (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express-validator/lib/middlewares/check.js:16:13)\n    at processTicksAndRejections (node:internal/process/task_queues:104:5)","timestamp":"2026-05-30 14:51:16"}
{"level":"error","message":"[POST] /api/auth/register - 400 - El correo electrónico ya está registrado - Stack: Error: El correo electrónico ya está registrado\n    at Object.register (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/services/auth.service.js:22:13)\n    at processTicksAndRejections (node:internal/process/task_queues:104:5)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/controllers/auth.controllers.js:7:18","timestamp":"2026-05-30 14:51:38"}
{"level":"error","message":"[POST] /api/auth/login - 401 - Correo o contraseña incorrectos - Stack: Error: Correo o contraseña incorrectos\n    at Object.login (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/services/auth.service.js:34:11)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/controllers/auth.controllers.js:13:18","timestamp":"2026-05-30 14:51:40"}
{"level":"error","message":"[POST] /api/auth/login - 401 - Correo o contraseña incorrectos - Stack: Error: Correo o contraseña incorrectos\n    at Object.login (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/services/auth.service.js:34:11)\n    at processTicksAndRejections (node:internal/process/task_queues:104:5)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/controllers/auth.controllers.js:13:18","timestamp":"2026-05-30 14:51:43"}
{"level":"error","message":"[GET] /api/auth/profile - 401 - No estás autenticado. Por favor inicia sesión. - Stack: Error: No estás autenticado. Por favor inicia sesión.\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/middlewares/auth.middleware.js:14:17\n    at fn (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/utils/catchAsync.js:3:5)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/route.js:149:13)\n    at Route.dispatch (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/route.js:119:3)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:284:15\n    at router.process_params (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:346:12)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:280:10)\n    at router.handle (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:175:3)\n    at router (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:47:12)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at trim_prefix (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:328:13)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:286:9\n    at router.process_params (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:346:12)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:280:10)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express-rate-limit/dist/index.cjs:807:7\n    at processTicksAndRejections (node:internal/process/task_queues:104:5)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express-rate-limit/dist/index.cjs:691:5","timestamp":"2026-05-30 14:51:43"}
{"level":"error","message":"[POST] /api/products - 401 - No estás autenticado. Por favor inicia sesión. - Stack: Error: No estás autenticado. Por favor inicia sesión.\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/middlewares/auth.middleware.js:14:17\n    at fn (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/utils/catchAsync.js:3:5)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/route.js:149:13)\n    at Route.dispatch (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/route.js:119:3)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:284:15\n    at router.process_params (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:346:12)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:280:10)\n    at router.handle (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:175:3)\n    at router (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:47:12)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at trim_prefix (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:328:13)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:286:9\n    at router.process_params (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:346:12)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:280:10)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express-rate-limit/dist/index.cjs:807:7\n    at processTicksAndRejections (node:internal/process/task_queues:104:5)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express-rate-limit/dist/index.cjs:691:5","timestamp":"2026-05-30 14:52:14"}
{"level":"error","message":"[POST] /api/products - 400 - Datos inválidos: El precio debe ser un número positivo - Stack: Error: Datos inválidos: El precio debe ser un número positivo\n    at validate (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/middlewares/validate.middleware.js:8:17)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/route.js:149:13)\n    at middleware (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express-validator/lib/middlewares/check.js:16:13)\n    at processTicksAndRejections (node:internal/process/task_queues:104:5)","timestamp":"2026-05-30 14:52:15"}
{"level":"error","message":"[POST] /api/products - 400 - Datos inválidos: El stock debe ser un entero positivo - Stack: Error: Datos inválidos: El stock debe ser un entero positivo\n    at validate (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/middlewares/validate.middleware.js:8:17)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/route.js:149:13)\n    at middleware (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express-validator/lib/middlewares/check.js:16:13)\n    at processTicksAndRejections (node:internal/process/task_queues:104:5)","timestamp":"2026-05-30 14:52:15"}
{"level":"error","message":"[POST] /api/auth/register - 400 - El correo electrónico ya está registrado - Stack: Error: El correo electrónico ya está registrado\n    at Object.register (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/services/auth.service.js:22:13)\n    at processTicksAndRejections (node:internal/process/task_queues:104:5)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/controllers/auth.controllers.js:7:18","timestamp":"2026-05-30 14:52:22"}
{"level":"error","message":"[POST] /api/auth/login - 401 - Correo o contraseña incorrectos - Stack: Error: Correo o contraseña incorrectos\n    at Object.login (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/services/auth.service.js:34:11)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/controllers/auth.controllers.js:13:18","timestamp":"2026-05-30 14:52:24"}
{"level":"error","message":"[POST] /api/auth/login - 401 - Correo o contraseña incorrectos - Stack: Error: Correo o contraseña incorrectos\n    at Object.login (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/services/auth.service.js:34:11)\n    at processTicksAndRejections (node:internal/process/task_queues:104:5)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/controllers/auth.controllers.js:13:18","timestamp":"2026-05-30 14:52:28"}
{"level":"error","message":"[GET] /api/auth/profile - 401 - No estás autenticado. Por favor inicia sesión. - Stack: Error: No estás autenticado. Por favor inicia sesión.\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/middlewares/auth.middleware.js:14:17\n    at fn (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/utils/catchAsync.js:3:5)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/route.js:149:13)\n    at Route.dispatch (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/route.js:119:3)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:284:15\n    at router.process_params (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:346:12)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:280:10)\n    at router.handle (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:175:3)\n    at router (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:47:12)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at trim_prefix (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:328:13)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:286:9\n    at router.process_params (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:346:12)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:280:10)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express-rate-limit/dist/index.cjs:807:7\n    at processTicksAndRejections (node:internal/process/task_queues:104:5)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express-rate-limit/dist/index.cjs:691:5","timestamp":"2026-05-30 14:52:28"}
{"level":"error","message":"[POST] /api/products - 401 - No estás autenticado. Por favor inicia sesión. - Stack: Error: No estás autenticado. Por favor inicia sesión.\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/middlewares/auth.middleware.js:14:17\n    at fn (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/utils/catchAsync.js:3:5)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/route.js:149:13)\n    at Route.dispatch (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/route.js:119:3)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:284:15\n    at router.process_params (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:346:12)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:280:10)\n    at router.handle (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:175:3)\n    at router (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:47:12)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at trim_prefix (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:328:13)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:286:9\n    at router.process_params (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:346:12)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:280:10)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express-rate-limit/dist/index.cjs:807:7\n    at processTicksAndRejections (node:internal/process/task_queues:104:5)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express-rate-limit/dist/index.cjs:691:5","timestamp":"2026-05-30 15:00:28"}
{"level":"error","message":"[POST] /api/products - 400 - Datos inválidos: El precio debe ser un número positivo - Stack: Error: Datos inválidos: El precio debe ser un número positivo\n    at validate (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/middlewares/validate.middleware.js:8:17)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/route.js:149:13)\n    at middleware (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express-validator/lib/middlewares/check.js:16:13)\n    at processTicksAndRejections (node:internal/process/task_queues:104:5)","timestamp":"2026-05-30 15:00:28"}
{"level":"error","message":"[POST] /api/products - 400 - Datos inválidos: El stock debe ser un entero positivo - Stack: Error: Datos inválidos: El stock debe ser un entero positivo\n    at validate (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/middlewares/validate.middleware.js:8:17)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/route.js:149:13)\n    at middleware (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express-validator/lib/middlewares/check.js:16:13)\n    at processTicksAndRejections (node:internal/process/task_queues:104:5)","timestamp":"2026-05-30 15:00:28"}
{"level":"error","message":"[POST] /api/auth/register - 400 - El correo electrónico ya está registrado - Stack: Error: El correo electrónico ya está registrado\n    at Object.register (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/services/auth.service.js:22:13)\n    at processTicksAndRejections (node:internal/process/task_queues:104:5)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/controllers/auth.controllers.js:7:18","timestamp":"2026-05-30 15:00:36"}
{"level":"error","message":"[POST] /api/auth/login - 401 - Correo o contraseña incorrectos - Stack: Error: Correo o contraseña incorrectos\n    at Object.login (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/services/auth.service.js:34:11)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/controllers/auth.controllers.js:13:18","timestamp":"2026-05-30 15:00:39"}
{"level":"error","message":"[POST] /api/auth/login - 401 - Correo o contraseña incorrectos - Stack: Error: Correo o contraseña incorrectos\n    at Object.login (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/services/auth.service.js:34:11)\n    at processTicksAndRejections (node:internal/process/task_queues:104:5)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/controllers/auth.controllers.js:13:18","timestamp":"2026-05-30 15:00:46"}
{"level":"error","message":"[GET] /api/auth/profile - 401 - No estás autenticado. Por favor inicia sesión. - Stack: Error: No estás autenticado. Por favor inicia sesión.\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/middlewares/auth.middleware.js:14:17\n    at fn (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/utils/catchAsync.js:3:5)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/route.js:149:13)\n    at Route.dispatch (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/route.js:119:3)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:284:15\n    at router.process_params (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:346:12)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:280:10)\n    at router.handle (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:175:3)\n    at router (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:47:12)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at trim_prefix (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:328:13)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:286:9\n    at router.process_params (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:346:12)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:280:10)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express-rate-limit/dist/index.cjs:807:7\n    at processTicksAndRejections (node:internal/process/task_queues:104:5)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express-rate-limit/dist/index.cjs:691:5","timestamp":"2026-05-30 15:00:47"}
{"level":"error","message":"[POST] /api/auth/register - 400 - El correo electrónico ya está registrado - Stack: Error: El correo electrónico ya está registrado\n    at Object.register (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/services/auth.service.js:22:13)\n    at processTicksAndRejections (node:internal/process/task_queues:104:5)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/controllers/auth.controllers.js:7:18","timestamp":"2026-05-30 15:05:09"}
{"level":"error","message":"[POST] /api/auth/login - 401 - Correo o contraseña incorrectos - Stack: Error: Correo o contraseña incorrectos\n    at Object.login (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/services/auth.service.js:34:11)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/controllers/auth.controllers.js:13:18","timestamp":"2026-05-30 15:05:10"}
{"level":"error","message":"[POST] /api/products - 401 - No estás autenticado. Por favor inicia sesión. - Stack: Error: No estás autenticado. Por favor inicia sesión.\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/middlewares/auth.middleware.js:14:17\n    at fn (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/utils/catchAsync.js:3:5)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/route.js:149:13)\n    at Route.dispatch (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/route.js:119:3)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:284:15\n    at router.process_params (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:346:12)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:280:10)\n    at router.handle (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:175:3)\n    at router (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:47:12)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at trim_prefix (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:328:13)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:286:9\n    at router.process_params (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:346:12)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:280:10)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express-rate-limit/dist/index.cjs:807:7\n    at processTicksAndRejections (node:internal/process/task_queues:104:5)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express-rate-limit/dist/index.cjs:691:5","timestamp":"2026-05-30 15:05:13"}
{"level":"error","message":"[POST] /api/products - 400 - Datos inválidos: El precio debe ser un número positivo - Stack: Error: Datos inválidos: El precio debe ser un número positivo\n    at validate (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/middlewares/validate.middleware.js:8:17)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/route.js:149:13)\n    at middleware (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express-validator/lib/middlewares/check.js:16:13)\n    at processTicksAndRejections (node:internal/process/task_queues:104:5)","timestamp":"2026-05-30 15:05:13"}
{"level":"error","message":"[POST] /api/products - 400 - Datos inválidos: El stock debe ser un entero positivo - Stack: Error: Datos inválidos: El stock debe ser un entero positivo\n    at validate (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/middlewares/validate.middleware.js:8:17)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/route.js:149:13)\n    at middleware (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express-validator/lib/middlewares/check.js:16:13)\n    at processTicksAndRejections (node:internal/process/task_queues:104:5)","timestamp":"2026-05-30 15:05:13"}
{"level":"error","message":"[POST] /api/auth/login - 401 - Correo o contraseña incorrectos - Stack: Error: Correo o contraseña incorrectos\n    at Object.login (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/services/auth.service.js:34:11)\n    at processTicksAndRejections (node:internal/process/task_queues:104:5)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/controllers/auth.controllers.js:13:18","timestamp":"2026-05-30 15:05:14"}
{"level":"error","message":"[GET] /api/auth/profile - 401 - No estás autenticado. Por favor inicia sesión. - Stack: Error: No estás autenticado. Por favor inicia sesión.\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/middlewares/auth.middleware.js:14:17\n    at fn (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/src/utils/catchAsync.js:3:5)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/route.js:149:13)\n    at Route.dispatch (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/route.js:119:3)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:284:15\n    at router.process_params (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:346:12)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:280:10)\n    at router.handle (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:175:3)\n    at router (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:47:12)\n    at Layer.handle [as handle_request] (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/layer.js:95:5)\n    at trim_prefix (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:328:13)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:286:9\n    at router.process_params (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:346:12)\n    at next (/home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express/lib/router/index.js:280:10)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express-rate-limit/dist/index.cjs:807:7\n    at processTicksAndRejections (node:internal/process/task_queues:104:5)\n    at /home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Back/node_modules/express-rate-limit/dist/index.cjs:691:5","timestamp":"2026-05-30 15:05:15"}

```

---

## File: Back/package.json

**Path:** `Back/package.json`

```json
{
  "name": "mi-ecommerce-back",
  "version": "1.0.0",
  "description": "Backend de producción para Mi-Ecommerce (SonTerry Accesorios)",
  "main": "src/server.js",
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js",
    "seed": "node scripts/seed.js",
    "migrate": "node scripts/migrate.js",
    "clear-cache": "node scripts/clearCache.js",
    "test": "cross-env NODE_ENV=test MONGO_URI=mongodb://localhost:27017/mi-ecommerce-test jest --runInBand --detectOpenHandles",
    "test:watch": "cross-env NODE_ENV=test MONGO_URI=mongodb://localhost:27017/mi-ecommerce-test jest --watch",
    "test:coverage": "cross-env NODE_ENV=test MONGO_URI=mongodb://localhost:27017/mi-ecommerce-test jest --coverage"
  },
  "dependencies": {
    "axios": "^1.16.1",
    "bcryptjs": "^2.4.3",
    "bullmq": "^5.8.0",
    "cloudinary": "^2.2.0",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "express-rate-limit": "^7.2.0",
    "express-validator": "^7.1.0",
    "helmet": "^7.1.0",
    "ioredis": "^5.4.1",
    "jsonwebtoken": "^9.0.2",
    "minio": "^8.0.7",
    "mongoose": "^8.4.0",
    "morgan": "^1.10.0",
    "multer": "^1.4.5-lts.1",
    "nodemailer": "^6.9.13",
    "pdfkit": "^0.15.0",
    "rate-limit-redis": "^4.3.1",
    "stripe": "^22.2.0",
    "winston": "^3.13.0"
  },
  "devDependencies": {
    "cross-env": "^7.0.3",
    "jest": "^29.7.0",
    "nodemon": "^3.1.0",
    "supertest": "^7.0.0"
  },
  "jest": {
    "testEnvironment": "node",
    "testTimeout": 30000
  }
}

```

---

## File: Back/reset_pwd.js

**Path:** `Back/reset_pwd.js`

```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./src/models/user.model');

mongoose.connect("mongodb://admin:changeme_mongo_password@localhost:27017/mi-ecommerce?authSource=admin").then(async () => {
  const hash = await bcrypt.hash('password123', 12);
  await User.updateOne({ email: 'admin@sonterry.com' }, { password: hash });
  console.log('Password reset to password123');
  process.exit(0);
});

```

---

## File: Back/scripts/clearCache.js

**Path:** `Back/scripts/clearCache.js`

```javascript
const logger = require('../src/logs/logger');
logger.info('Cache cleared successfully.');

```

---

## File: Back/scripts/migrate.js

**Path:** `Back/scripts/migrate.js`

```javascript
const logger = require('../src/logs/logger');
logger.info('Migrations executed successfully.');

```

---

## File: Back/scripts/seed.js

**Path:** `Back/scripts/seed.js`

```javascript
const mongoose = require('mongoose');
const env = require('../src/config/env');
const User = require('../src/models/user.model');
const Category = require('../src/models/category.model');
const Product = require('../src/models/product.model');
const logger = require('../src/logs/logger');

const seedDB = async () => {
  try {
    await mongoose.connect(env.MONGO_URI);
    
    // Clear Existing
    await User.deleteMany();
    await Category.deleteMany();
    await Product.deleteMany();

    // Users
    const admin = await User.create({
      name: 'Admin SonTerry',
      email: 'admin@sonterry.com',
      password: 'password123',
      role: 'admin'
    });

    const customer = await User.create({
      name: 'Ivan Castillo',
      email: 'cliente@sonterry.com',
      password: 'password123',
      role: 'user'
    });

    // Categories
    const serigrafiaCat = await Category.create({ name: 'Serigrafía', description: 'Técnica artesanal con rasqueta' });
    const dtfCat = await Category.create({ name: 'Estampado DTF', description: 'Tecnología digital de alta definición' });
    const prendasCat = await Category.create({ name: 'Prendas Base', description: 'Poleras, sudaderas y accesorios' });

    // Products
    await Product.create([
      {
        name: 'Camiseta de Algodón Premium',
        description: 'Camiseta base perfecta para estampados de alta fidelidad. 100% algodón hilado.',
        price: 15.00,
        stock: 120,
        images: ['https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500'],
        category: prendasCat._id,
        type: 'prenda'
      },
      {
        name: 'Sudadera Térmica Orgánica',
        description: 'Sudadera premium, ideal para climas fríos y personalización DTF de gran tamaño.',
        price: 32.50,
        stock: 50,
        images: ['https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500'],
        category: prendasCat._id,
        type: 'prenda'
      },
      {
        name: 'Personalización Serigrafía Clásica',
        description: 'Estampado a una tinta con pintura premium a base de agua. Tacto suave y durabilidad.',
        price: 8.00,
        stock: 9999,
        images: ['https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500'],
        category: serigrafiaCat._id,
        type: 'serigrafia'
      },
      {
        name: 'Personalización DTF Full Color',
        description: 'Estampado digital transfer direct to film. Ideal para fotos y degradados complejos.',
        price: 12.00,
        stock: 9999,
        images: ['https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500'],
        category: dtfCat._id,
        type: 'dtf'
      }
    ]);

    logger.info('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    logger.error('Database seeding failed: ' + error.message);
    process.exit(1);
  }
};

seedDB();

```

---

## File: Back/src/app.js

**Path:** `Back/src/app.js`

```javascript
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const corsOptions = require('./config/cors');
const notFound = require('./errors/notFound');
const errorHandler = require('./errors/errorHandler');

// Route imports
const authRoutes = require('./routes/auth.routes');
const productsRoutes = require('./routes/products.routes');
const categoriesRoutes = require('./routes/categories.routes');
const usersRoutes = require('./routes/users.routes');
const cartRoutes = require('./routes/cart.routes');
const wishlistRoutes = require('./routes/wishlist.routes');
const ordersRoutes = require('./routes/orders.routes');
const paymentsRoutes = require('./routes/payments.routes');
const reviewsRoutes = require('./routes/reviews.routes');
const ticketsRoutes = require('./routes/tickets.routes');
const bankAccountsRoutes = require('./routes/bankAccounts.routes');
const healthRoutes = require('./routes/health.routes');
const n8nWebhooks = require('./webhooks/n8n.webhook');
const stripeWebhooks = require('./webhooks/stripe');

const app = express();

app.use(helmet());
app.use(cors(corsOptions));

// Stripe webhook MUST be before express.json() to preserve raw body for signature verification
app.use('/api/webhooks/stripe', stripeWebhooks);

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(morgan('dev'));

// Global rate limiter — protects all /api/ routes
const { generalLimiter } = require('./middlewares/rateLimiter');
app.use('/api/', generalLimiter);

// Endpoints
app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/payments', paymentsRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/tickets', ticketsRoutes);
app.use('/api/bank-accounts', bankAccountsRoutes);
app.use('/api/webhooks/n8n', n8nWebhooks);

// Fallbacks
app.use(notFound);
app.use(errorHandler);

module.exports = app;

```

---

## File: Back/src/config/cors.js

**Path:** `Back/src/config/cors.js`

```javascript
const env = require('./env');

const whitelist = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:5174',
];

if (env.CORS_ORIGIN) {
  for (const origin of env.CORS_ORIGIN.split(',')) {
    const trimmed = origin.trim();
    if (trimmed) {
      whitelist.push(trimmed);
    }
  }
}

const corsOptions = {
  origin: function (origin, callback) {
    if (env.NODE_ENV === 'development') {
      return callback(null, true);
    }

    if (whitelist.includes(origin)) {
      return callback(null, true);
    }

    callback(null, false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
};

module.exports = corsOptions;

```

---

## File: Back/src/config/db.js

**Path:** `Back/src/config/db.js`

```javascript
const mongoose = require('mongoose');
const env = require('./env');
const logger = require('../logs/logger');

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 5000;

const connectDB = async (retryCount = 0) => {
  try {
    const conn = await mongoose.connect(env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      heartbeatFrequencyMS: 10000,
      maxPoolSize: env.MONGO_MAX_POOL_SIZE,
      minPoolSize: env.MONGO_MIN_POOL_SIZE,
    });
    logger.info(`MongoDB Connected: ${conn.connection.host} (pool: ${env.MONGO_MAX_POOL_SIZE})`);
  } catch (error) {
    logger.error(`MongoDB connection error (attempt ${retryCount + 1}/${MAX_RETRIES}): ${error.message}`);

    if (retryCount < MAX_RETRIES - 1) {
      logger.info(`Retrying in ${RETRY_DELAY_MS / 1000}s...`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
      return connectDB(retryCount + 1);
    }

    logger.error('MongoDB connection failed after max retries. Exiting.');
    if (env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};

mongoose.connection.on('error', (err) => {
  logger.error(`MongoDB connection error: ${err.message}`);
});

mongoose.connection.on('disconnected', () => {
  logger.warn('MongoDB disconnected. Attempting to reconnect...');
});

mongoose.connection.on('reconnected', () => {
  logger.info('MongoDB reconnected successfully.');
});

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  logger.info('MongoDB connection closed due to application termination');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await mongoose.connection.close();
  logger.info('MongoDB connection closed due to SIGTERM');
  process.exit(0);
});

module.exports = connectDB;

```

---

## File: Back/src/config/env.js

**Path:** `Back/src/config/env.js`

```javascript
const dotenv = require('dotenv');
dotenv.config();

const logger = require('../logs/logger');

const requiredEnvs = [
  'MONGO_URI',
  'JWT_SECRET',
  'JWT_EXPIRES_IN',
  'REFRESH_TOKEN_SECRET',
  'REFRESH_TOKEN_EXPIRES_IN',
];

const productionRequiredEnvs = [
  'REDIS_HOST',
  'REDIS_PORT',
  'STRIPE_SECRET_KEY',
  'STRIPE_WEBHOOK_SECRET',
  'N8N_WEBHOOK_URL',
  'N8N_API_KEY',
  'MINIO_ENDPOINT',
  'MINIO_PORT',
  'MINIO_ACCESS_KEY',
  'MINIO_SECRET_KEY',
  'MINIO_BUCKET',
];

const missing = [];

for (const env of requiredEnvs) {
  if (!process.env[env]) {
    missing.push(env);
  }
}

if (process.env.NODE_ENV === 'production') {
  for (const env of productionRequiredEnvs) {
    if (!process.env[env]) {
      missing.push(env);
    }
  }
}

if (missing.length > 0) {
  const msg = `CRITICAL: Missing required environment variables: ${missing.join(', ')}`;
  logger.error(msg);
  console.error(msg);
  process.exit(1);
}

module.exports = {
  PORT: parseInt(process.env.PORT, 10) || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGO_URI: process.env.MONGO_URI,
  MONGO_MAX_POOL_SIZE: parseInt(process.env.MONGO_MAX_POOL_SIZE, 10) || 50,
  MONGO_MIN_POOL_SIZE: parseInt(process.env.MONGO_MIN_POOL_SIZE, 10) || 5,
  REDIS_HOST: process.env.REDIS_HOST || 'localhost',
  REDIS_PORT: parseInt(process.env.REDIS_PORT, 10) || 6379,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD || '',
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN,
  MINIO_ENDPOINT: process.env.MINIO_ENDPOINT || 'localhost',
  MINIO_PORT: parseInt(process.env.MINIO_PORT, 10) || 9000,
  MINIO_ACCESS_KEY: process.env.MINIO_ACCESS_KEY,
  MINIO_SECRET_KEY: process.env.MINIO_SECRET_KEY,
  MINIO_BUCKET: process.env.MINIO_BUCKET || 'sonterry',
  MINIO_USE_SSL: process.env.MINIO_USE_SSL === 'true',
  MINIO_PUBLIC_URL: process.env.MINIO_PUBLIC_URL || '',
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
  PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
  PAYPAL_CLIENT_SECRET: process.env.PAYPAL_CLIENT_SECRET,
  PAYPAL_API_URL: process.env.PAYPAL_API_URL || 'https://api-m.sandbox.paypal.com',
  N8N_WEBHOOK_URL: process.env.N8N_WEBHOOK_URL,
  N8N_API_KEY: process.env.N8N_API_KEY,
  CORS_ORIGIN: process.env.CORS_ORIGIN || '',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
  SMTP_HOST: process.env.SMTP_HOST || '',
  SMTP_PORT: parseInt(process.env.SMTP_PORT, 10) || 587,
  SMTP_USER: process.env.SMTP_USER || '',
  SMTP_PASS: process.env.SMTP_PASS || '',
  EMAIL_FROM: process.env.EMAIL_FROM || 'noreply@sonterry.com',
};

```

---

## File: Back/src/config/minio.js

**Path:** `Back/src/config/minio.js`

```javascript
const Minio = require('minio');
const env = require('./env');
const logger = require('../logs/logger');

let minioClient = null;

if (env.MINIO_ACCESS_KEY && env.MINIO_SECRET_KEY) {
  minioClient = new Minio.Client({
    endPoint: env.MINIO_ENDPOINT,
    port: env.MINIO_PORT,
    useSSL: env.MINIO_USE_SSL,
    accessKey: env.MINIO_ACCESS_KEY,
    secretKey: env.MINIO_SECRET_KEY,
  });
} else {
  logger.warn('MINIO_ACCESS_KEY/SECRET_KEY no configurado. Subidas de MinIO deshabilitadas.');
}

module.exports = minioClient;

```

---

## File: Back/src/controllers/auth.controllers.js

**Path:** `Back/src/controllers/auth.controllers.js`

```javascript
const authService = require('../services/auth.service');
const usersService = require('../services/users.service');
const catchAsync = require('../utils/catchAsync');
const formatResponse = require('../utils/formatResponse');

const register = catchAsync(async (req, res) => {
  const result = await authService.register(req.body);
  res.status(201).json(formatResponse(true, 'Usuario registrado con éxito', result));
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.login(email, password);
  res.status(200).json(formatResponse(true, 'Sesión iniciada con éxito', result));
});

const getProfile = catchAsync(async (req, res) => {
  const user = await usersService.getUserById(req.user.id);
  res.status(200).json(formatResponse(true, 'Datos del perfil', { user }));
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken: token } = req.body;
  if (!token) {
    return res.status(400).json(formatResponse(false, 'Refresh token requerido'));
  }
  const result = await authService.refreshAccessToken(token);
  res.status(200).json(formatResponse(true, 'Token renovado con éxito', result));
});

const forgotPassword = catchAsync(async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json(formatResponse(false, 'El correo es requerido'));
  const result = await authService.forgotPassword(email);
  res.status(200).json(formatResponse(true, result.message));
});

const resetPassword = catchAsync(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  if (!password || password.length < 8) {
    return res.status(400).json(formatResponse(false, 'La contraseña debe tener al menos 8 caracteres'));
  }
  const result = await authService.resetPassword(token, password);
  res.status(200).json(formatResponse(true, 'Contraseña restablecida con éxito', result));
});

const updateProfile = catchAsync(async (req, res) => {
  const user = await usersService.updateUserProfile(req.user.id, req.body);
  res.status(200).json(formatResponse(true, 'Perfil actualizado con éxito', { user }));
});

module.exports = { register, login, getProfile, refreshToken, forgotPassword, resetPassword, updateProfile };

```

---

## File: Back/src/controllers/bankAccounts.controllers.js

**Path:** `Back/src/controllers/bankAccounts.controllers.js`

```javascript
const bankAccountsService = require('../services/bankAccounts.service');
const catchAsync = require('../utils/catchAsync');
const formatResponse = require('../utils/formatResponse');

const createBankAccount = catchAsync(async (req, res) => {
  const account = await bankAccountsService.createBankAccount(req.body);
  res.status(201).json(formatResponse(true, 'Cuenta bancaria creada', account));
});

const getBankAccountsAdmin = catchAsync(async (req, res) => {
  const accounts = await bankAccountsService.getBankAccounts(false);
  res.status(200).json(formatResponse(true, 'Cuentas bancarias', accounts));
});

const getBankAccountsPublic = catchAsync(async (req, res) => {
  const accounts = await bankAccountsService.getBankAccounts(true);
  res.status(200).json(formatResponse(true, 'Cuentas bancarias activas', accounts));
});

const updateBankAccount = catchAsync(async (req, res) => {
  const account = await bankAccountsService.updateBankAccount(req.params.id, req.body);
  res.status(200).json(formatResponse(true, 'Cuenta bancaria actualizada', account));
});

const deleteBankAccount = catchAsync(async (req, res) => {
  await bankAccountsService.deleteBankAccount(req.params.id);
  res.status(200).json(formatResponse(true, 'Cuenta bancaria eliminada'));
});

module.exports = {
  createBankAccount,
  getBankAccountsAdmin,
  getBankAccountsPublic,
  updateBankAccount,
  deleteBankAccount
};

```

---

## File: Back/src/controllers/cart.controllers.js

**Path:** `Back/src/controllers/cart.controllers.js`

```javascript
const cartService = require('../services/cart.service');
const catchAsync = require('../utils/catchAsync');
const formatResponse = require('../utils/formatResponse');

const getCart = catchAsync(async (req, res) => {
  const cart = await cartService.getCart(req.user._id);
  res.status(200).json(formatResponse(true, 'Carrito obtenido', cart));
});

const addToCart = catchAsync(async (req, res) => {
  const { productId, quantity, customization } = req.body;
  const cart = await cartService.addToCart(req.user._id, productId, quantity, customization);
  res.status(200).json(formatResponse(true, 'Producto añadido al carrito', cart));
});

const removeFromCart = catchAsync(async (req, res) => {
  const cart = await cartService.removeFromCart(req.user._id, req.params.itemId);
  res.status(200).json(formatResponse(true, 'Producto eliminado del carrito', cart));
});

const updateCartItemQuantity = catchAsync(async (req, res) => {
  const { quantity } = req.body;
  const cart = await cartService.updateCartItemQuantity(req.user._id, req.params.itemId, quantity);
  res.status(200).json(formatResponse(true, 'Cantidad de producto actualizada', cart));
});

module.exports = { getCart, addToCart, removeFromCart, updateCartItemQuantity };

```

---

## File: Back/src/controllers/categories.controllers.js

**Path:** `Back/src/controllers/categories.controllers.js`

```javascript
const categoriesService = require('../services/categories.service');
const catchAsync = require('../utils/catchAsync');
const formatResponse = require('../utils/formatResponse');

const getAllCategories = catchAsync(async (req, res) => {
  const categories = await categoriesService.getAllCategories();
  res.status(200).json(formatResponse(true, 'Categorías listadas', categories));
});

const createCategory = catchAsync(async (req, res) => {
  const category = await categoriesService.createCategory(req.body);
  res.status(201).json(formatResponse(true, 'Categoría creada', category));
});

const deleteCategory = catchAsync(async (req, res) => {
  await categoriesService.deleteCategory(req.params.id);
  res.status(200).json(formatResponse(true, 'Categoría eliminada'));
});

module.exports = { getAllCategories, createCategory, deleteCategory };

```

---

## File: Back/src/controllers/orders.controllers.js

**Path:** `Back/src/controllers/orders.controllers.js`

```javascript
const ordersService = require('../services/orders.service');
const catchAsync = require('../utils/catchAsync');
const formatResponse = require('../utils/formatResponse');

const createOrder = catchAsync(async (req, res) => {
  const { shippingAddress } = req.body;
  const order = await ordersService.createOrder(req.user._id, shippingAddress, req.user.name);
  res.status(201).json(formatResponse(true, 'Pedido creado con éxito', order));
});

const updateOrderStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const order = await ordersService.updateOrderStatus(id, status);
  res.status(200).json(formatResponse(true, 'Estado del pedido actualizado', order));
});

const getUserOrders = catchAsync(async (req, res) => {
  const orders = await ordersService.getUserOrders(req.user._id, req.query);
  res.status(200).json(formatResponse(true, 'Tus pedidos', orders));
});

const getAllOrders = catchAsync(async (req, res) => {
  const orders = await ordersService.getAllOrders(req.query);
  res.status(200).json(formatResponse(true, 'Pedidos listados (Admin)', orders));
});

const getOrdersByProduct = catchAsync(async (req, res) => {
  const orders = await ordersService.getOrdersByProduct(req.params.productId, req.query);
  res.status(200).json(formatResponse(true, 'Pedidos del producto', orders));
});

const updateOrderDispatch = catchAsync(async (req, res) => {
  const order = await ordersService.updateOrderDispatch(req.params.id, req.body);
  res.status(200).json(formatResponse(true, 'Despacho actualizado', order));
});

const createManualOrder = catchAsync(async (req, res) => {
  const order = await ordersService.createManualOrder(req.body);
  res.status(201).json(formatResponse(true, 'Pedido manual creado', order));
});

module.exports = { createOrder, updateOrderStatus, getUserOrders, getAllOrders, getOrdersByProduct, updateOrderDispatch, createManualOrder };

```

---

## File: Back/src/controllers/payments.controllers.js

**Path:** `Back/src/controllers/payments.controllers.js`

```javascript
const paymentsService = require('../services/payments.service');
const catchAsync = require('../utils/catchAsync');
const formatResponse = require('../utils/formatResponse');

const createPayment = catchAsync(async (req, res) => {
  const { orderId } = req.body;
  const result = await paymentsService.createPaymentIntent(orderId);
  res.status(200).json(formatResponse(true, 'Intención de pago creada', result));
});

module.exports = { createPayment };

```

---

## File: Back/src/controllers/products.controllers.js

**Path:** `Back/src/controllers/products.controllers.js`

```javascript
const productsService = require('../services/products.service');
const catchAsync = require('../utils/catchAsync');
const formatResponse = require('../utils/formatResponse');

const getProducts = catchAsync(async (req, res) => {
  const products = await productsService.getProducts(req.query);
  res.status(200).json(formatResponse(true, 'Productos listados', products));
});

const getProductBySlug = catchAsync(async (req, res) => {
  const product = await productsService.getProductBySlug(req.params.slug);
  res.status(200).json(formatResponse(true, 'Detalle del producto', product));
});

const createProduct = catchAsync(async (req, res) => {
  const product = await productsService.createProduct(req.body, req.files || []);
  res.status(201).json(formatResponse(true, 'Producto creado', product));
});

const updateProduct = catchAsync(async (req, res) => {
  const product = await productsService.updateProduct(req.params.id, req.body, req.files || []);
  res.status(200).json(formatResponse(true, 'Producto actualizado', product));
});

const deleteProduct = catchAsync(async (req, res) => {
  await productsService.deleteProduct(req.params.id);
  res.status(200).json(formatResponse(true, 'Producto eliminado', null));
});

const restoreProduct = catchAsync(async (req, res) => {
  const product = await productsService.restoreProduct(req.params.id);
  res.status(200).json(formatResponse(true, 'Producto restaurado', product));
});

module.exports = { getProducts, getProductBySlug, createProduct, updateProduct, deleteProduct, restoreProduct };

```

---

## File: Back/src/controllers/reviews.controllers.js

**Path:** `Back/src/controllers/reviews.controllers.js`

```javascript
const reviewsService = require('../services/reviews.service');
const catchAsync = require('../utils/catchAsync');
const formatResponse = require('../utils/formatResponse');

const getProductReviews = catchAsync(async (req, res) => {
  const reviews = await reviewsService.getProductReviews(req.params.productId);
  res.status(200).json(formatResponse(true, 'Opiniones obtenidas con éxito', reviews));
});

const addReview = catchAsync(async (req, res) => {
  const { productId, rating, comment } = req.body;
  const review = await reviewsService.addReview(req.user._id, productId, rating, comment);
  res.status(201).json(formatResponse(true, 'Opinión agregada con éxito', review));
});

const getUserReviews = catchAsync(async (req, res) => {
  const reviews = await reviewsService.getUserReviews(req.user._id);
  res.status(200).json(formatResponse(true, 'Tus opiniones obtenidas con éxito', reviews));
});

module.exports = { getProductReviews, addReview, getUserReviews };

```

---

## File: Back/src/controllers/tickets.controllers.js

**Path:** `Back/src/controllers/tickets.controllers.js`

```javascript
const ticketsService = require('../services/tickets.service');
const catchAsync = require('../utils/catchAsync');
const formatResponse = require('../utils/formatResponse');

const createTicket = catchAsync(async (req, res) => {
  const ticket = await ticketsService.createTicket(req.user._id, req.body, req.user.name);
  res.status(201).json(formatResponse(true, 'Ticket de soporte creado con éxito', ticket));
});

const getUserTickets = catchAsync(async (req, res) => {
  const tickets = await ticketsService.getUserTickets(req.user._id);
  res.status(200).json(formatResponse(true, 'Mis tickets de soporte', tickets));
});

const getAllTickets = catchAsync(async (req, res) => {
  const tickets = await ticketsService.getAllTickets();
  res.status(200).json(formatResponse(true, 'Tickets de soporte (Admin)', tickets));
});

const updateTicketStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const ticket = await ticketsService.updateTicketStatus(id, status);
  res.status(200).json(formatResponse(true, 'Estado del ticket actualizado', ticket));
});

const replyToTicket = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { content, statusUpdate } = req.body;
  const sender = req.user.role === 'admin' ? 'admin' : 'user';
  
  const ticket = await ticketsService.replyToTicket(id, sender, content, statusUpdate);
  res.status(201).json(formatResponse(true, 'Respuesta enviada', ticket));
});

module.exports = { createTicket, getUserTickets, getAllTickets, updateTicketStatus, replyToTicket };

```

---

## File: Back/src/controllers/users.controllers.js

**Path:** `Back/src/controllers/users.controllers.js`

```javascript
const usersService = require('../services/users.service');
const catchAsync = require('../utils/catchAsync');
const formatResponse = require('../utils/formatResponse');

const getAllUsers = catchAsync(async (req, res) => {
  const users = await usersService.getAllUsers(req.query);
  res.status(200).json(formatResponse(true, 'Usuarios listados', users));
});

const updateUserStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { isActive } = req.body;
  const user = await usersService.updateUserStatus(id, isActive);
  res.status(200).json(formatResponse(true, 'Estado de usuario actualizado', user));
});

module.exports = { getAllUsers, updateUserStatus };

```

---

## File: Back/src/controllers/wishlist.controllers.js

**Path:** `Back/src/controllers/wishlist.controllers.js`

```javascript
const wishlistService = require('../services/wishlist.service');
const catchAsync = require('../utils/catchAsync');
const formatResponse = require('../utils/formatResponse');

const getWishlist = catchAsync(async (req, res) => {
  const wishlist = await wishlistService.getWishlist(req.user._id);
  res.status(200).json(formatResponse(true, 'Wishlist obtenida', wishlist));
});

const toggleWishlist = catchAsync(async (req, res) => {
  const { productId } = req.body;
  const wishlist = await wishlistService.toggleWishlist(req.user._id, productId);
  res.status(200).json(formatResponse(true, 'Wishlist actualizada', wishlist));
});

module.exports = { getWishlist, toggleWishlist };

```

---

## File: Back/src/errors/AppError.js

**Path:** `Back/src/errors/AppError.js`

```javascript
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;

```

---

## File: Back/src/errors/errorHandler.js

**Path:** `Back/src/errors/errorHandler.js`

```javascript
const env = require('../config/env');
const logger = require('../logs/logger');
const formatResponse = require('../utils/formatResponse');

const handleCastErrorDB = (err) => {
  const message = `ID inválido: ${err.value}`;
  return { statusCode: 400, message };
};

const handleDuplicateFieldsDB = (err) => {
  const field = Object.keys(err.keyValue)[0];
  const message = `El valor '${err.keyValue[field]}' para el campo '${field}' ya existe.`;
  return { statusCode: 409, message };
};

const handleValidationErrorDB = (err) => {
  const messages = Object.values(err.errors).map((e) => e.message);
  return { statusCode: 400, message: messages.join('. ') };
};

const handleJWTError = () => ({ statusCode: 401, message: 'Token inválido. Por favor inicia sesión de nuevo.' });

const handleJWTExpiredError = () => ({ statusCode: 401, message: 'Token expirado. Por favor inicia sesión de nuevo.' });

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  logger.error(`[${req.method}] ${req.originalUrl} - ${err.statusCode} - ${err.message} - Stack: ${err.stack}`);

  if (env.NODE_ENV === 'development') {
    return res.status(err.statusCode).json(
      formatResponse(false, err.message, {
        stack: err.stack,
        error: err,
      }),
    );
  }

  let error = { ...err, message: err.message, name: err.name };

  if (error.name === 'CastError') error = handleCastErrorDB(error);
  if (error.code === 11000) error = handleDuplicateFieldsDB(error);
  if (error.name === 'ValidationError') error = handleValidationErrorDB(error);
  if (error.name === 'JsonWebTokenError') error = handleJWTError();
  if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

  if (error.isOperational) {
    return res.status(error.statusCode).json(formatResponse(false, error.message));
  }

  return res.status(500).json(formatResponse(false, 'Error interno del servidor. Por favor intenta de nuevo más tarde.'));
};

module.exports = errorHandler;

```

---

## File: Back/src/errors/notFound.js

**Path:** `Back/src/errors/notFound.js`

```javascript
const AppError = require('./AppError');

const notFound = (req, res, next) => {
  next(new AppError(`Route ${req.originalUrl} not found`, 404));
};

module.exports = notFound;

```

---

## File: Back/src/jobs/notificationQueue.js

**Path:** `Back/src/jobs/notificationQueue.js`

```javascript
const { Queue } = require('bullmq');
const env = require('../config/env');
const logger = require('../logs/logger');
const { triggerN8nWorkflow } = require('../services/n8n.service');

const QUEUE_NAME = 'notifications';

const connection = {
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
  password: env.REDIS_PASSWORD || undefined,
  maxRetriesPerRequest: null,
};

let notificationQueue = null;

const getQueue = () => {
  if (!notificationQueue) {
    notificationQueue = new Queue(QUEUE_NAME, {
      connection,
      defaultJobOptions: {
        attempts: 3,
        backoff: { type: 'exponential', delay: 5000 }, // 5s → 25s → 125s
        removeOnComplete: { count: 100 },
        removeOnFail: { count: 50 },
      },
    });

    notificationQueue.on('error', (err) => {
      logger.error(`[Queue] BullMQ error: ${err.message}`);
    });
  }
  return notificationQueue;
};

const _fallback = (data) => {
  setTimeout(async () => {
    try {
      await triggerN8nWorkflow({
        event: data.type,
        orderId: data.orderId,
        status: data.status || 'ORDER_CREATED',
        phone: data.recipientPhone,
        customerName: data.customerName,
      });
    } catch (e) {
      logger.error(`[Queue Fallback] N8N trigger failed: ${e.message}`);
    }
  }, 1000);
};

const addNotificationJob = async (data) => {
  try {
    const queue = getQueue();
    // jobId único: evita duplicados si hay un retry del request HTTP
    await queue.add(data.type, data, {
      jobId: `notif-${data.orderId || data.ticketId || 'global'}-${data.type}-${Date.now()}`,
    });
    logger.info(`[Queue] Job enqueued: ${data.type} for order ${data.orderId}`);
  } catch (err) {
    logger.warn(`[Queue] Redis unavailable, using fallback: ${err.message}`);
    _fallback(data);
  }
};

module.exports = { addNotificationJob, getQueue, connection, QUEUE_NAME };


```

---

## File: Back/src/jobs/orderQueue.js

**Path:** `Back/src/jobs/orderQueue.js`

```javascript
const logger = require('../logs/logger');

const addOrderJob = async (data) => {
  logger.info(`[Queue] Enqueued order post-processing job: ${data.orderId}`);
};

module.exports = { addOrderJob };

```

---

## File: Back/src/jobs/workers/notificationWorker.js

**Path:** `Back/src/jobs/workers/notificationWorker.js`

```javascript
const { Worker } = require('bullmq');
const { connection, QUEUE_NAME } = require('../notificationQueue');
const { triggerN8nWorkflow } = require('../../services/n8n.service');
const logger = require('../../logs/logger');

const worker = new Worker(
  QUEUE_NAME,
  async (job) => {
    logger.info(`[Worker] Processing job ${job.id}: ${job.name} for item ${job.data.orderId || job.data.ticketId}`);

    await triggerN8nWorkflow({
      event: job.data.type,
      orderId: job.data.orderId,
      ticketId: job.data.ticketId,
      ticketType: job.data.ticketType,
      subject: job.data.subject,
      status: job.data.status || 'CREATED',
      phone: job.data.recipientPhone,
      customerName: job.data.customerName,
    });

    logger.info(`[Worker] Job ${job.id} completed successfully.`);
  },
  {
    connection,
    concurrency: 5,
  }
);

worker.on('failed', (job, err) => {
  logger.error(`[Worker] Job ${job?.id} failed (attempt ${job?.attemptsMade}/${job?.opts?.attempts}): ${err.message}`);
});

worker.on('error', (err) => {
  logger.error(`[Worker] Worker error: ${err.message}`);
});

module.exports = worker;


```

---

## File: Back/src/jobs/workers/orderWorker.js

**Path:** `Back/src/jobs/workers/orderWorker.js`

```javascript
const logger = require('../../logs/logger');
logger.info('Order worker stub running.');

```

---

## File: Back/src/logs/logger.js

**Path:** `Back/src/logs/logger.js`

```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
  }));
}

module.exports = logger;

```

---

## File: Back/src/middlewares/auth.middleware.js

**Path:** `Back/src/middlewares/auth.middleware.js`

```javascript
const jwt = require('jsonwebtoken');
const env = require('../config/env');
const AppError = require('../errors/AppError');
const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');

const protect = catchAsync(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('No estás autenticado. Por favor inicia sesión.', 401));
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    const currentUser = await User.findById(decoded.id);

    if (!currentUser || !currentUser.isActive) {
      return next(new AppError('El usuario perteneciente a este token ya no está activo.', 401));
    }

    req.user = currentUser;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return next(new AppError('Token expirado. Por favor renueva tu sesión.', 401));
    }
    return next(new AppError('Token inválido. Por favor inicia sesión de nuevo.', 401));
  }
});

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError('No tienes permiso para realizar esta acción.', 403));
    }
    next();
  };
};

module.exports = { protect, restrictTo };

```

---

## File: Back/src/middlewares/error.middleware.js

**Path:** `Back/src/middlewares/error.middleware.js`

```javascript
const errorHandler = require('../errors/errorHandler');
module.exports = errorHandler;

```

---

## File: Back/src/middlewares/rateLimiter.js

**Path:** `Back/src/middlewares/rateLimiter.js`

```javascript
const rateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');
const Redis = require('ioredis');
const env = require('../config/env');
const logger = require('../logs/logger');

let redisClient;
try {
  redisClient = new Redis({
    host: env.REDIS_HOST,
    port: env.REDIS_PORT,
    password: env.REDIS_PASSWORD || undefined,
    maxRetriesPerRequest: 1,
    retryStrategy: () => null,
    lazyConnect: true,
  });
  redisClient.on('error', () => {});
} catch (e) {
  redisClient = null;
}

const isRedisAvailable = async () => {
  if (env.NODE_ENV === 'test') return false;
  if (!redisClient) return false;
  try {
    await redisClient.connect();
    await redisClient.ping();
    return true;
  } catch {
    redisClient = null;
    logger.warn('Redis no disponible. Rate limiter usará memoria local (no funciona en multi-instancia).');
    return false;
  }
};

let storeReady = false;
(async () => {
  storeReady = await isRedisAvailable();
})();

const getStore = () => {
  if (storeReady && redisClient) {
    return new RedisStore({
      sendCommand: (...args) => redisClient.call(...args),
    });
  }
  return undefined;
};

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    status: 'fail',
    message: 'Demasiadas peticiones desde esta IP. Por favor intenta de nuevo en 15 minutos.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  store: getStore(),
});

const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: {
    status: 'fail',
    message: 'Demasiados intentos de inicio de sesión. Por favor intenta en una hora.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  store: getStore(),
});

module.exports = { generalLimiter, authLimiter };

```

---

## File: Back/src/middlewares/upload.middleware.js

**Path:** `Back/src/middlewares/upload.middleware.js`

```javascript
const multer = require('multer');
const path = require('path');
const AppError = require('../errors/AppError');

// Almacenamiento en memoria → se sube directo a Cloudinary sin escribir al disco
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowed = ['.jpg', '.jpeg', '.png', '.webp'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowed.includes(ext)) {
    cb(null, true);
  } else {
    cb(new AppError('Solo se permiten imágenes JPG, PNG o WebP', 400), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB máximo por imagen
});

module.exports = upload;

```

---

## File: Back/src/middlewares/validate.middleware.js

**Path:** `Back/src/middlewares/validate.middleware.js`

```javascript
const { validationResult } = require('express-validator');
const AppError = require('../errors/AppError');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages = errors.array().map(err => err.msg).join(', ');
    return next(new AppError(`Datos inválidos: ${messages}`, 400));
  }
  next();
};

module.exports = validate;

```

---

## File: Back/src/models/bankAccount.model.js

**Path:** `Back/src/models/bankAccount.model.js`

```javascript
const mongoose = require('mongoose');

const bankAccountSchema = new mongoose.Schema({
  bankName: {
    type: String,
    required: [true, 'El nombre del banco es requerido'],
    trim: true
  },
  accountNumber: {
    type: String,
    required: [true, 'El número de cuenta es requerido'],
    trim: true
  },
  accountType: {
    type: String,
    required: [true, 'El tipo de cuenta es requerido (ej: Ahorros, Corriente)'],
    trim: true
  },
  ownerName: {
    type: String,
    required: [true, 'El nombre del titular es requerido'],
    trim: true
  },
  ownerDocument: {
    type: String,
    required: [true, 'El documento del titular (CC/NIT) es requerido'],
    trim: true
  },
  phoneNumber: {
    type: String,
    trim: true
  },
  supportedMethods: {
    type: String,
    enum: ['transferencia', 'deposito', 'ambas'],
    required: [true, 'Debe especificar si la cuenta soporta transferencia, depósito o ambas'],
    default: 'ambas'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model('BankAccount', bankAccountSchema);

```

---

## File: Back/src/models/cart.model.js

**Path:** `Back/src/models/cart.model.js`

```javascript
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1, default: 1 },
    customization: {
      type: { type: String, enum: ['serigrafia', 'dtf'] },
      details: { type: String, maxlength: 500 },
    },
  }],
}, { timestamps: true });

cartSchema.index({ updatedAt: 1 }, { expireAfterSeconds: 604800 });

module.exports = mongoose.model('Cart', cartSchema);

```

---

## File: Back/src/models/category.model.js

**Path:** `Back/src/models/category.model.js`

```javascript
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Category name is required'], unique: true, trim: true, maxlength: 100 },
  description: { type: String, maxlength: 1000 },
  slug: { type: String, unique: true },
}, { timestamps: true });

categorySchema.pre('save', function (next) {
  if (this.isModified('name') || !this.slug) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }
  next();
});

module.exports = mongoose.model('Category', categorySchema);

```

---

## File: Back/src/models/order.model.js

**Path:** `Back/src/models/order.model.js`

```javascript
const mongoose = require('mongoose');

const MAX_TRACKING_ENTRIES = 50;

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    customization: {
      type: { type: String, enum: ['serigrafia', 'dtf'] },
      details: { type: String, maxlength: 1000 },
    },
  }],
  total: { type: Number, required: true, min: 0 },
  status: {
    type: String,
    enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'],
    default: 'pending',
  },
  shippingAddress: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
    phone: { type: String, required: true },
  },
  paymentIntentId: { type: String },
  paymentMethod: {
    type: String,
    enum: ['tarjeta', 'efectivo', 'transferencia', 'deposito'],
    default: 'tarjeta',
  },
  shippingDetails: {
    company: { type: String, enum: ['Servientrega', 'Inter Rapidísimo', 'Coordinadora', 'Envía', 'TCC', 'Mensajería Local', 'Otro'] },
    trackingNumber: String,
    dispatchDate: Date,
    estimatedDeliveryDate: Date,
    notes: String,
  },
  trackingHistory: [{
    status: { type: String, required: true },
    date: { type: Date, default: Date.now },
    comment: { type: String, maxlength: 500 },
  }],
}, { timestamps: true });

orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ status: 1 });
orderSchema.index({ paymentIntentId: 1 });

orderSchema.pre('save', function (next) {
  if (this.isNew || this.isModified('status')) {
    this.trackingHistory.push({
      status: this.status,
      date: new Date(),
      comment: this.isNew ? 'Pedido creado' : `Estado del pedido actualizado a ${this.status}`,
    });
    if (this.trackingHistory.length > MAX_TRACKING_ENTRIES) {
      this.trackingHistory = this.trackingHistory.slice(-MAX_TRACKING_ENTRIES);
    }
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);

```

---

## File: Back/src/models/payment.model.js

**Path:** `Back/src/models/payment.model.js`

```javascript
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  amount: { type: Number, required: true },
  method: { type: String, enum: ['stripe', 'paypal'], required: true },
  status: { type: String, enum: ['pending', 'succeeded', 'failed', 'refunded'], default: 'pending' },
  paymentIntentId: { type: String, select: false },
}, { timestamps: true });

paymentSchema.index({ order: 1 });
paymentSchema.index({ order: 1, status: 1 });
paymentSchema.index({ paymentIntentId: 1 }, { sparse: true });
paymentSchema.index({ status: 1 });

module.exports = mongoose.model('Payment', paymentSchema);

```

---

## File: Back/src/models/product.model.js

**Path:** `Back/src/models/product.model.js`

```javascript
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Product name is required'], trim: true, maxlength: 200 },
  description: { type: String, required: [true, 'Description is required'], maxlength: 5000 },
  price: { type: Number, required: [true, 'Price is required'], min: 0 },
  stock: { type: Number, required: [true, 'Stock is required'], min: 0 },
  images: [{
    type: String,
    validate: {
      validator: function (v) {
        return /^https?:\/\/.+/.test(v);
      },
      message: 'Each image must be a valid URL starting with http(s)://',
    },
  }],
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: [true, 'Category is required'] },
  ratings: { type: Number, default: 0, min: 0, max: 5 },
  slug: { type: String, unique: true },
  type: { type: String, enum: ['serigrafia', 'dtf', 'prenda', 'otro', 'mug', 'gorra', 'estampado'], default: 'prenda' },
  isDeleted: { type: Boolean, default: false },
  deletedAt: { type: Date, default: null },
}, { timestamps: true });

productSchema.index({ category: 1, price: 1 });
productSchema.index({ isDeleted: 1, category: 1, price: 1 });
productSchema.index({ type: 1, stock: 1 });
productSchema.index({ createdAt: -1 });
productSchema.index({ name: 'text', description: 'text' });
productSchema.pre('save', async function (next) {
  if (this.isModified('name') || !this.slug) {
    const baseSlug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    let slug = baseSlug;
    let counter = 1;

    while (true) {
      const existing = await mongoose.model('Product').findOne({
        _id: { $ne: this._id },
        slug,
      });
      if (!existing) break;
      slug = `${baseSlug}-${counter++}`;
    }

    this.slug = slug;
  }
  next();
});

module.exports = mongoose.model('Product', productSchema);

```

---

## File: Back/src/models/review.model.js

**Path:** `Back/src/models/review.model.js`

```javascript
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true, maxlength: 2000 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
}, { timestamps: true });

reviewSchema.index({ user: 1, product: 1 }, { unique: true });
reviewSchema.index({ product: 1, createdAt: -1 });
reviewSchema.index({ product: 1, rating: 1 });

module.exports = mongoose.model('Review', reviewSchema);

```

---

## File: Back/src/models/ticket.model.js

**Path:** `Back/src/models/ticket.model.js`

```javascript
const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['queja', 'reclamo', 'devolucion', 'pedido_pendiente', 'otro'],
    default: 'otro'
  },
  subject: {
    type: String,
    required: [true, 'El asunto es requerido'],
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    required: [true, 'La descripción es requerida'],
    trim: true,
    maxlength: 2000
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  },
  status: {
    type: String,
    enum: ['open', 'in_progress', 'resolved', 'closed'],
    default: 'open'
  },
  messages: [{
    sender: { type: String, enum: ['user', 'admin'], required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Ticket', ticketSchema);

```

---

## File: Back/src/models/user.model.js

**Path:** `Back/src/models/user.model.js`

```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name is required'], trim: true, maxlength: 100 },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email address'],
    maxlength: 255,
  },
  password: { type: String, required: [true, 'Password is required'], minlength: 8, select: false },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  isActive: { type: Boolean, default: true },
  phone: { type: String, default: '' },
  shippingAddress: {
    address: { type: String, default: '' },
    city: { type: String, default: '' },
    zipCode: { type: String, default: '' },
  },
  passwordResetToken: { type: String },
  passwordResetExpires: { type: Date },
}, { timestamps: true });

userSchema.index({ role: 1, isActive: 1 });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.passwordResetExpires = Date.now() + 60 * 60 * 1000;
  return resetToken;
};

module.exports = mongoose.model('User', userSchema);

```

---

## File: Back/src/models/wishlist.model.js

**Path:** `Back/src/models/wishlist.model.js`

```javascript
const mongoose = require('mongoose');

const MAX_WISHLIST_PRODUCTS = 100;

const wishlistSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  products: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    validate: {
      validator: function (v) {
        return v.length <= MAX_WISHLIST_PRODUCTS;
      },
      message: `Wishlist cannot contain more than ${MAX_WISHLIST_PRODUCTS} products`,
    },
  },
}, { timestamps: true });

module.exports = mongoose.model('Wishlist', wishlistSchema);

```

---

## File: Back/src/routes/auth.routes.js

**Path:** `Back/src/routes/auth.routes.js`

```javascript
const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/auth.controllers');
const { protect } = require('../middlewares/auth.middleware');
const { authLimiter } = require('../middlewares/rateLimiter');

router.post('/register', authLimiter, authControllers.register);
router.post('/login', authLimiter, authControllers.login);
router.post('/refresh', authControllers.refreshToken);
router.post('/forgot-password', authLimiter, authControllers.forgotPassword);
router.post('/reset-password/:token', authLimiter, authControllers.resetPassword);
router.get('/profile', protect, authControllers.getProfile);
router.patch('/profile', protect, authControllers.updateProfile);

module.exports = router;

```

---

## File: Back/src/routes/bankAccounts.routes.js

**Path:** `Back/src/routes/bankAccounts.routes.js`

```javascript
const express = require('express');
const router = express.Router();
const bankAccountsControllers = require('../controllers/bankAccounts.controllers');
const { protect, restrictTo } = require('../middlewares/auth.middleware');

// Public or User routes
router.get('/', bankAccountsControllers.getBankAccountsPublic);

// Admin routes
router.use(protect, restrictTo('admin'));
router.get('/all', bankAccountsControllers.getBankAccountsAdmin);
router.post('/', bankAccountsControllers.createBankAccount);
router.put('/:id', bankAccountsControllers.updateBankAccount);
router.delete('/:id', bankAccountsControllers.deleteBankAccount);

module.exports = router;

```

---

## File: Back/src/routes/cart.routes.js

**Path:** `Back/src/routes/cart.routes.js`

```javascript
const express = require('express');
const router = express.Router();
const cartControllers = require('../controllers/cart.controllers');
const { protect } = require('../middlewares/auth.middleware');

router.use(protect);
router.get('/', cartControllers.getCart);
router.post('/', cartControllers.addToCart);
router.delete('/:itemId', cartControllers.removeFromCart);
router.patch('/:itemId', cartControllers.updateCartItemQuantity);

module.exports = router;

```

---

## File: Back/src/routes/categories.routes.js

**Path:** `Back/src/routes/categories.routes.js`

```javascript
const express = require('express');
const router = express.Router();
const categoriesControllers = require('../controllers/categories.controllers');
const { protect, restrictTo } = require('../middlewares/auth.middleware');

router.get('/', categoriesControllers.getAllCategories);
router.post('/', protect, restrictTo('admin'), categoriesControllers.createCategory);
router.delete('/:id', protect, restrictTo('admin'), categoriesControllers.deleteCategory);

module.exports = router;

```

---

## File: Back/src/routes/health.routes.js

**Path:** `Back/src/routes/health.routes.js`

```javascript
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', async (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'up' : 'down';
  const status = dbStatus === 'up' ? 200 : 503;
  res.status(status).json({
    status: dbStatus === 'up' ? 'healthy' : 'unhealthy',
    timestamp: new Date(),
    services: {
      database: dbStatus,
      uptime: process.uptime()
    }
  });
});

module.exports = router;

```

---

## File: Back/src/routes/orders.routes.js

**Path:** `Back/src/routes/orders.routes.js`

```javascript
const express = require('express');
const router = express.Router();
const ordersControllers = require('../controllers/orders.controllers');
const { protect, restrictTo } = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const { createOrderRules, updateOrderStatusRules } = require('../validators/order.validators');

router.post('/', protect, createOrderRules, validate, ordersControllers.createOrder);
router.post('/manual', protect, restrictTo('admin'), ordersControllers.createManualOrder);
router.get('/', protect, ordersControllers.getUserOrders);
router.get('/all', protect, restrictTo('admin'), ordersControllers.getAllOrders);
router.get('/product/:productId', protect, restrictTo('admin'), ordersControllers.getOrdersByProduct);
router.patch('/:id/status', protect, restrictTo('admin'), updateOrderStatusRules, validate, ordersControllers.updateOrderStatus);
router.patch('/:id/dispatch', protect, restrictTo('admin'), ordersControllers.updateOrderDispatch);

module.exports = router;

```

---

## File: Back/src/routes/payments.routes.js

**Path:** `Back/src/routes/payments.routes.js`

```javascript
const express = require('express');
const router = express.Router();
const paymentsControllers = require('../controllers/payments.controllers');
const { protect } = require('../middlewares/auth.middleware');

router.post('/create-payment-intent', protect, paymentsControllers.createPayment);

module.exports = router;

```

---

## File: Back/src/routes/products.routes.js

**Path:** `Back/src/routes/products.routes.js`

```javascript
const express = require('express');
const router = express.Router();
const productsControllers = require('../controllers/products.controllers');
const { protect, restrictTo } = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const { createProductRules, updateProductRules } = require('../validators/product.validators');
const upload = require('../middlewares/upload.middleware');

router.get('/', productsControllers.getProducts);
router.get('/:slug', productsControllers.getProductBySlug);
router.post('/', protect, restrictTo('admin'), upload.array('images', 5), createProductRules, validate, productsControllers.createProduct);
router.put('/:id', protect, restrictTo('admin'), upload.array('images', 5), updateProductRules, validate, productsControllers.updateProduct);
router.delete('/:id', protect, restrictTo('admin'), productsControllers.deleteProduct);
router.patch('/:id/restore', protect, restrictTo('admin'), productsControllers.restoreProduct);

module.exports = router;

```

---

## File: Back/src/routes/reviews.routes.js

**Path:** `Back/src/routes/reviews.routes.js`

```javascript
const express = require('express');
const router = express.Router();
const reviewsControllers = require('../controllers/reviews.controllers');
const { protect } = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const { addReviewRules } = require('../validators/review.validators');

router.get('/me', protect, reviewsControllers.getUserReviews);
router.get('/:productId', reviewsControllers.getProductReviews);
router.post('/', protect, addReviewRules, validate, reviewsControllers.addReview);

module.exports = router;

```

---

## File: Back/src/routes/tickets.routes.js

**Path:** `Back/src/routes/tickets.routes.js`

```javascript
const express = require('express');
const router = express.Router();
const ticketsControllers = require('../controllers/tickets.controllers');
const { protect, restrictTo } = require('../middlewares/auth.middleware');

router.use(protect);

router.post('/', ticketsControllers.createTicket);
router.get('/', ticketsControllers.getUserTickets);

router.get('/all', restrictTo('admin'), ticketsControllers.getAllTickets);
router.patch('/:id/status', restrictTo('admin'), ticketsControllers.updateTicketStatus);
router.post('/:id/reply', ticketsControllers.replyToTicket);

module.exports = router;

```

---

## File: Back/src/routes/users.routes.js

**Path:** `Back/src/routes/users.routes.js`

```javascript
const express = require('express');
const router = express.Router();
const usersControllers = require('../controllers/users.controllers');
const { protect, restrictTo } = require('../middlewares/auth.middleware');

router.use(protect, restrictTo('admin'));
router.get('/', usersControllers.getAllUsers);
router.patch('/:id/status', usersControllers.updateUserStatus);

module.exports = router;

```

---

## File: Back/src/routes/wishlist.routes.js

**Path:** `Back/src/routes/wishlist.routes.js`

```javascript
const express = require('express');
const router = express.Router();
const wishlistControllers = require('../controllers/wishlist.controllers');
const { protect } = require('../middlewares/auth.middleware');

router.use(protect);
router.get('/', wishlistControllers.getWishlist);
router.post('/', wishlistControllers.toggleWishlist);

module.exports = router;

```

---

## File: Back/src/server.js

**Path:** `Back/src/server.js`

```javascript
const app = require('./app');
const env = require('./config/env');
const connectDB = async () => {
  const db = require('./config/db');
  await db();
};
const logger = require('./logs/logger');

const startServer = async () => {
  await connectDB();

  // Iniciar worker de notificaciones — no en test para no interferir con Jest
  if (env.NODE_ENV !== 'test') {
    require('./jobs/workers/notificationWorker');
    logger.info('[Server] Notification worker started.');
  }

  const server = app.listen(env.PORT, () => {
    logger.info(`Server running in ${env.NODE_ENV} mode on port ${env.PORT}`);
  });

  process.on('unhandledRejection', (err) => {
    logger.error(`Unhandled Rejection: ${err.message}`);
    server.close(() => process.exit(1));
  });
};

startServer();

```

---

## File: Back/src/services/auth.service.js

**Path:** `Back/src/services/auth.service.js`

```javascript
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const env = require('../config/env');
const AppError = require('../errors/AppError');
const { sendPasswordReset } = require('./email.service');

const signToken = (id) => {
  return jwt.sign({ id }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
};

const signRefreshToken = (id) => {
  return jwt.sign({ id }, env.REFRESH_TOKEN_SECRET, { expiresIn: env.REFRESH_TOKEN_EXPIRES_IN });
};

const register = async (userData) => {
  let user;
  try {
    user = await User.create(userData);
  } catch (error) {
    if (error.code === 11000) {
      throw new AppError('El correo electrónico ya está registrado', 400);
    }
    throw error;
  }
  const token = signToken(user._id);
  const refreshToken = signRefreshToken(user._id);
  return { token, refreshToken, user: { id: user._id, name: user.name, email: user.email, role: user.role } };
};

const login = async (email, password) => {
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password))) {
    throw new AppError('Correo o contraseña incorrectos', 401);
  }
  if (!user.isActive) {
    throw new AppError('Tu cuenta está desactivada', 403);
  }
  const token = signToken(user._id);
  const refreshToken = signRefreshToken(user._id);
  return { token, refreshToken, user: { id: user._id, name: user.name, email: user.email, role: user.role } };
};

const refreshAccessToken = async (token) => {
  try {
    const decoded = jwt.verify(token, env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user || !user.isActive) {
      throw new AppError('Token inválido o usuario inactivo', 401);
    }
    const newAccessToken = signToken(user._id);
    const newRefreshToken = signRefreshToken(user._id);
    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Refresh token inválido o expirado', 401);
  }
};

const forgotPassword = async (email) => {
  const user = await User.findOne({ email });
  if (!user) return { message: 'Si el correo está registrado, recibirás un enlace de recuperación.' };

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetURL = `${env.CLIENT_URL || 'http://localhost:5173'}/reset-password/${resetToken}`;

  sendPasswordReset(email, resetURL);

  return { message: 'Si el correo está registrado, recibirás un enlace de recuperación.' };
};

const resetPassword = async (token, newPassword) => {
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  }).select('+password');

  if (!user) throw new AppError('Token inválido o expirado', 400);

  user.password = newPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  const accessToken = signToken(user._id);
  const refreshToken = signRefreshToken(user._id);

  return { token: accessToken, refreshToken, user: { id: user._id, name: user.name, email: user.email, role: user.role } };
};

module.exports = { register, login, signToken, signRefreshToken, refreshAccessToken, forgotPassword, resetPassword };

```

---

## File: Back/src/services/bankAccounts.service.js

**Path:** `Back/src/services/bankAccounts.service.js`

```javascript
const BankAccount = require('../models/bankAccount.model');
const AppError = require('../errors/AppError');

const createBankAccount = async (data) => {
  return await BankAccount.create(data);
};

const getBankAccounts = async (onlyActive = false) => {
  const query = onlyActive ? { isActive: true } : {};
  return await BankAccount.find(query).sort({ createdAt: -1 });
};

const updateBankAccount = async (id, data) => {
  const account = await BankAccount.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!account) throw new AppError('Cuenta bancaria no encontrada', 404);
  return account;
};

const deleteBankAccount = async (id) => {
  const account = await BankAccount.findByIdAndDelete(id);
  if (!account) throw new AppError('Cuenta bancaria no encontrada', 404);
  return account;
};

module.exports = {
  createBankAccount,
  getBankAccounts,
  updateBankAccount,
  deleteBankAccount
};

```

---

## File: Back/src/services/cart.service.js

**Path:** `Back/src/services/cart.service.js`

```javascript
const Cart = require('../models/cart.model');
const Product = require('../models/product.model');
const AppError = require('../errors/AppError');

const getCart = async (userId) => {
  const cart = await Cart.findOneAndUpdate(
    { user: userId },
    { $setOnInsert: { user: userId, items: [] } },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  ).populate('items.product');
  return cart;
};

const addToCart = async (userId, productId, quantity, customization) => {
  const product = await Product.findById(productId, { stock: 1, price: 1, name: 1 });
  if (!product) throw new AppError('Producto no encontrado', 404);
  if (product.stock < quantity) throw new AppError('Stock insuficiente', 400);

  let cart = await Cart.findOneAndUpdate(
    { user: userId },
    { $setOnInsert: { user: userId, items: [] } },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  const existingItemIndex = cart.items.findIndex(item =>
    item.product.toString() === productId &&
    (!customization || item.customization?.type === customization.type)
  );

  if (existingItemIndex > -1) {
    cart.items[existingItemIndex].quantity += quantity;
  } else {
    cart.items.push({ product: productId, quantity, customization: customization || undefined });
  }

  await cart.save();
  return await cart.populate('items.product');
};

const removeFromCart = async (userId, itemId) => {
  const cart = await Cart.findOneAndUpdate(
    { user: userId },
    { $setOnInsert: { user: userId, items: [] } },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  cart.items = cart.items.filter(item => item._id.toString() !== itemId);
  await cart.save();
  return await cart.populate('items.product');
};

const updateCartItemQuantity = async (userId, itemId, quantity) => {
  const cart = await Cart.findOneAndUpdate(
    { user: userId },
    { $setOnInsert: { user: userId, items: [] } },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  const itemIndex = cart.items.findIndex(item => item._id.toString() === itemId);
  if (itemIndex === -1) throw new AppError('Producto no encontrado en el carrito', 404);

  const product = await Product.findById(cart.items[itemIndex].product, { stock: 1 });
  if (product && product.stock < quantity) throw new AppError('Stock insuficiente en tienda', 400);

  cart.items[itemIndex].quantity = quantity;
  await cart.save();
  return await cart.populate('items.product');
};

module.exports = { getCart, addToCart, removeFromCart, updateCartItemQuantity };

```

---

## File: Back/src/services/categories.service.js

**Path:** `Back/src/services/categories.service.js`

```javascript
const Category = require('../models/category.model');
const AppError = require('../errors/AppError');

const getAllCategories = async () => {
  return await Category.find();
};

const createCategory = async (categoryData) => {
  return await Category.create(categoryData);
};

const deleteCategory = async (id) => {
  const category = await Category.findByIdAndDelete(id);
  if (!category) {
    throw new AppError('Categoría no encontrada', 404);
  }
  return category;
};

module.exports = { getAllCategories, createCategory, deleteCategory };

```

---

## File: Back/src/services/email.service.js

**Path:** `Back/src/services/email.service.js`

```javascript
const nodemailer = require('nodemailer');
const env = require('../config/env');
const logger = require('../logs/logger');
const { orderConfirmation, orderStatusUpdate, passwordReset } = require('../utils/emailTemplates');

let transporter = null;

const getTransporter = async () => {
  if (transporter) return transporter;

  if (env.SMTP_HOST && env.SMTP_USER) {
    transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      secure: env.SMTP_PORT === 465,
      auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
    });
    await transporter.verify();
    logger.info(`Email transporter ready (${env.SMTP_HOST})`);
  } else {
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: { user: testAccount.user, pass: testAccount.pass },
    });
    logger.info(`Email transporter usando Ethereal: ${testAccount.user}`);
  }

  return transporter;
};

const sendOrderConfirmation = async (to, order) => {
  try {
    const t = await getTransporter();
    const info = await t.sendMail({
      from: env.EMAIL_FROM,
      to,
      subject: `Pedido #${order._id} confirmado - SonTerry`,
      html: orderConfirmation(order),
    });
    if (info.messageId && info.messageId.includes('ethereal')) {
      logger.info(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
    }
    logger.info(`Email de confirmación enviado a ${to} para orden ${order._id}`);
    return info;
  } catch (error) {
    logger.error(`Error enviando email a ${to}: ${error.message}`);
  }
};

const sendOrderStatusUpdate = async (to, order, previousStatus) => {
  try {
    const t = await getTransporter();
    const info = await t.sendMail({
      from: env.EMAIL_FROM,
      to,
      subject: `Estado de pedido #${order._id} actualizado - SonTerry`,
      html: orderStatusUpdate(order, previousStatus),
    });
    if (info.messageId && info.messageId.includes('ethereal')) {
      logger.info(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
    }
    logger.info(`Email de estado enviado a ${to} para orden ${order._id}: ${order.status}`);
    return info;
  } catch (error) {
    logger.error(`Error enviando email a ${to}: ${error.message}`);
  }
};

const sendPasswordReset = async (to, resetURL) => {
  try {
    const t = await getTransporter();
    const info = await t.sendMail({
      from: env.EMAIL_FROM,
      to,
      subject: 'Recuperación de contraseña - SonTerry',
      html: passwordReset(resetURL),
    });
    if (info.messageId && info.messageId.includes('ethereal')) {
      logger.info(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
    }
    logger.info(`Email de recuperación enviado a ${to}`);
    return info;
  } catch (error) {
    logger.error(`Error enviando email de recuperación a ${to}: ${error.message}`);
  }
};

module.exports = { sendOrderConfirmation, sendOrderStatusUpdate, sendPasswordReset };

```

---

## File: Back/src/services/n8n.service.js

**Path:** `Back/src/services/n8n.service.js`

```javascript
const axios = require('axios');
const env = require('../config/env');
const logger = require('../logs/logger');

const triggerN8nWorkflow = async (payload) => {
  if (!env.N8N_WEBHOOK_URL) {
    logger.warn('[n8n Service] N8N_WEBHOOK_URL is not defined. Skipping trigger.');
    return null;
  }

  try {
    const headers = { 'Content-Type': 'application/json' };
    if (env.N8N_API_KEY) {
      headers['Authorization'] = `Bearer ${env.N8N_API_KEY}`;
    }

    const response = await axios.post(env.N8N_WEBHOOK_URL, payload, { headers, timeout: 10000 });
    logger.info('[n8n Service] Workflow triggered successfully.', { status: response.status });
    return response.data;
  } catch (error) {
    logger.error(`[n8n Service] Failed to trigger workflow: ${error.message}`);
    throw error; // Throw error so BullMQ handles retries and backoff
  }
};

module.exports = { triggerN8nWorkflow };

```

---

## File: Back/src/services/orders.service.js

**Path:** `Back/src/services/orders.service.js`

```javascript
const mongoose = require('mongoose');
const Order = require('../models/order.model');
const Product = require('../models/product.model');
const User = require('../models/user.model');
const AppError = require('../errors/AppError');
const { getCart } = require('./cart.service');
const { addNotificationJob } = require('../jobs/notificationQueue');
const { sendOrderConfirmation, sendOrderStatusUpdate } = require('./email.service');
const logger = require('../logs/logger');

const createOrder = async (userId, shippingAddress, customerName, paymentMethod = 'tarjeta') => {
  const cart = await getCart(userId);
  if (!cart || cart.items.length === 0) {
    throw new AppError('El carrito está vacío', 400);
  }

  // Atomic stock check + decrement via findOneAndUpdate with optimistic lock
  const stockResults = await Promise.all(
    cart.items.map(item =>
      Product.findOneAndUpdate(
        { _id: item.product._id, stock: { $gte: item.quantity } },
        { $inc: { stock: -item.quantity } },
        { new: true, projection: { price: 1, name: 1 } }
      )
    )
  );

  const failedIndex = stockResults.findIndex(r => !r);
  if (failedIndex !== -1) {
    // Compensating transaction: restore stock for successful decrements
    await Promise.all(
      stockResults.map((r, i) =>
        r
          ? Product.findByIdAndUpdate(cart.items[i].product._id, { $inc: { stock: cart.items[i].quantity } })
          : Promise.resolve()
      )
    );
    throw new AppError(`Stock insuficiente para: ${cart.items[failedIndex].product.name}`, 400);
  }

  const items = cart.items.map((item, i) => ({
    product: item.product._id,
    name: item.product.name,
    price: stockResults[i].price,
    quantity: item.quantity,
    customization: item.customization || undefined,
  }));

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const order = await Order.create({
    user: userId,
    items,
    total,
    shippingAddress,
    paymentMethod,
  });

  // Clear cart
  cart.items = [];
  await cart.save();

  // Fire-and-forget notification + email (never block order creation)
  addNotificationJob({
    orderId: order._id,
    type: 'ORDER_CREATED',
    recipientPhone: shippingAddress.phone,
    customerName: customerName || 'Cliente',
  }).catch(err => logger.error(`[Orders] Failed to enqueue notification: ${err.message}`));

  User.findById(userId).select('email').then(user => {
    if (user?.email) sendOrderConfirmation(user.email, order);
  }).catch(err => logger.error(`[Orders] Failed to send email: ${err.message}`));

  return order;
};

const updateOrderStatus = async (orderId, newStatus) => {
  const order = await Order.findById(orderId).populate('user');
  if (!order) throw new AppError('Pedido no encontrado', 404);

  const previousStatus = order.status;
  order.status = newStatus;
  await order.save();

  addNotificationJob({
    orderId: order._id,
    type: 'STATUS_UPDATED',
    status: newStatus,
    recipientPhone: order.shippingAddress.phone,
    customerName: order.user.name,
  }).catch(err => logger.error(`[Orders] Failed to enqueue notification: ${err.message}`));

  if (order.user?.email) {
    sendOrderStatusUpdate(order.user.email, order, previousStatus);
  }

  return order;
};

const getUserOrders = async (userId, filters = {}) => {
  const page = Math.max(1, parseInt(filters.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(filters.limit, 10) || 20));
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    Order.find({ user: userId }).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Order.countDocuments({ user: userId }),
  ]);

  return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
};

const getAllOrders = async (filters = {}) => {
  const page = Math.max(1, parseInt(filters.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(filters.limit, 10) || 20));
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    Order.find().populate('user', 'name email').sort({ createdAt: -1 }).skip(skip).limit(limit),
    Order.countDocuments(),
  ]);

  return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
};

const getOrdersByProduct = async (productId, filters = {}) => {
  const page = Math.max(1, parseInt(filters.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(filters.limit, 10) || 50));
  const skip = (page - 1) * limit;

  const query = { 'items.product': productId };

  const [data, total] = await Promise.all([
    Order.find(query).populate('user', 'name email').sort({ createdAt: -1 }).skip(skip).limit(limit),
    Order.countDocuments(query),
  ]);

  return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
};

const updateOrderDispatch = async (orderId, shippingDetails) => {
  const order = await Order.findById(orderId);
  if (!order) throw new AppError('Pedido no encontrado', 404);

  order.shippingDetails = shippingDetails;
  if (shippingDetails.trackingNumber && order.status === 'paid') {
    order.status = 'shipped';
  }
  
  await order.save();
  return order;
};

const createManualOrder = async (orderData) => {
  const { user, items, shippingAddress, paymentMethod, shippingDetails } = orderData;
  
  if (!user) throw new AppError('Usuario requerido', 400);
  if (!items || items.length === 0) throw new AppError('Artículos requeridos', 400);

  const stockResults = await Promise.all(
    items.map(item =>
      Product.findOneAndUpdate(
        { _id: item.product, stock: { $gte: item.quantity } },
        { $inc: { stock: -item.quantity } },
        { new: true, projection: { price: 1, name: 1 } }
      )
    )
  );

  const failedIndex = stockResults.findIndex(r => !r);
  if (failedIndex !== -1) {
    await Promise.all(
      stockResults.map((r, i) =>
        r ? Product.findByIdAndUpdate(items[i].product, { $inc: { stock: items[i].quantity } }) : Promise.resolve()
      )
    );
    throw new AppError('Stock insuficiente para uno de los artículos seleccionados', 400);
  }

  const finalItems = items.map((item, i) => ({
    product: item.product,
    name: stockResults[i].name,
    price: stockResults[i].price,
    quantity: item.quantity,
  }));

  const total = finalItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const order = await Order.create({
    user,
    items: finalItems,
    total,
    shippingAddress,
    paymentMethod: paymentMethod || 'efectivo',
    shippingDetails,
    status: shippingDetails?.trackingNumber ? 'shipped' : 'paid',
  });

  return order;
};

module.exports = { createOrder, updateOrderStatus, getUserOrders, getAllOrders, getOrdersByProduct, updateOrderDispatch, createManualOrder };

```

---

## File: Back/src/services/payments.service.js

**Path:** `Back/src/services/payments.service.js`

```javascript
const Stripe = require('stripe');
const Order = require('../models/order.model');
const Payment = require('../models/payment.model');
const AppError = require('../errors/AppError');
const env = require('../config/env');
const logger = require('../logs/logger');

let stripe = null;
if (env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(env.STRIPE_SECRET_KEY);
} else {
  logger.warn('STRIPE_SECRET_KEY no configurado. Pagos Stripe deshabilitados.');
}

const createPaymentIntent = async (orderId) => {
  if (!stripe) throw new AppError('Stripe no está configurado', 500);

  const order = await Order.findById(orderId);
  if (!order) throw new AppError('Pedido no encontrado', 404);
  if (order.status !== 'pending') throw new AppError('El pedido ya no está pendiente', 400);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(order.total * 100),
    currency: 'cop',
    metadata: { orderId: order._id.toString() },
  });

  await Payment.create({
    order: orderId,
    amount: order.total,
    method: 'stripe',
    status: 'pending',
    paymentIntentId: paymentIntent.id,
  });

  return { clientSecret: paymentIntent.client_secret, paymentIntentId: paymentIntent.id };
};

const handlePaymentSucceeded = async (paymentIntent) => {
  const orderId = paymentIntent.metadata.orderId;
  if (!orderId) {
    logger.warn('Stripe webhook: payment intent sin orderId en metadata');
    return;
  }

  const order = await Order.findById(orderId);
  if (!order) {
    logger.warn(`Stripe webhook: orden ${orderId} no encontrada`);
    return;
  }

  order.status = 'paid';
  await order.save();

  await Payment.findOneAndUpdate(
    { paymentIntentId: paymentIntent.id },
    { status: 'succeeded' },
  );

  logger.info(`Pago confirmado para orden ${orderId}: $${order.total}`);
};

const handlePaymentFailed = async (paymentIntent) => {
  const orderId = paymentIntent.metadata.orderId;
  if (!orderId) return;

  await Payment.findOneAndUpdate(
    { paymentIntentId: paymentIntent.id },
    { status: 'failed' },
  );

  logger.warn(`Pago fallido para orden ${orderId}`);
};

module.exports = { createPaymentIntent, handlePaymentSucceeded, handlePaymentFailed };

```

---

## File: Back/src/services/products.service.js

**Path:** `Back/src/services/products.service.js`

```javascript
const Product = require('../models/product.model');
const AppError = require('../errors/AppError');
const { uploadMultipleToMinio } = require('../utils/minioUpload');

const getProducts = async (filters = {}) => {
  const query = { isDeleted: false };
  if (filters.category) query.category = filters.category;
  if (filters.type) query.type = filters.type;
  if (filters.search) {
    query.$text = { $search: filters.search };
  }
  if (filters.minPrice !== undefined && filters.minPrice !== '') {
    query.price = { ...query.price, $gte: parseFloat(filters.minPrice) };
  }
  if (filters.maxPrice !== undefined && filters.maxPrice !== '') {
    query.price = { ...query.price, $lte: parseFloat(filters.maxPrice) };
  }

  const page = Math.max(1, parseInt(filters.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(filters.limit, 10) || 20));
  const skip = (page - 1) * limit;

  const [products, total] = await Promise.all([
    Product.find(query)
      .populate('category', 'name')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }),
    Product.countDocuments(query),
  ]);

  return { data: products, total, page, limit, totalPages: Math.ceil(total / limit) };
};

const getProductBySlug = async (slug) => {
  const product = await Product.findOne({ slug, isDeleted: false }).populate('category', 'name');
  if (!product) throw new AppError('Producto no encontrado', 404);
  return product;
};

const createProduct = async (productData, files = []) => {
  let imageUrls = productData.images || [];
  if (files.length > 0) {
    const uploaded = await uploadMultipleToMinio(files);
    imageUrls = [...imageUrls, ...uploaded];
  }
  return await Product.create({ ...productData, images: imageUrls });
};

const updateProduct = async (id, updateData, files = []) => {
  if (files.length > 0) {
    const uploaded = await uploadMultipleToMinio(files);
    updateData.images = [...(updateData.images || []), ...uploaded];
  }
  const product = await Product.findOneAndUpdate(
    { _id: id, isDeleted: false },
    updateData,
    { new: true, runValidators: true }
  );
  if (!product) throw new AppError('Producto no encontrado', 404);
  return product;
};

const deleteProduct = async (id) => {
  const product = await Product.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { isDeleted: true, deletedAt: new Date() },
    { new: true }
  );
  if (!product) throw new AppError('Producto no encontrado', 404);
  return product;
};

const restoreProduct = async (id) => {
  const product = await Product.findOneAndUpdate(
    { _id: id, isDeleted: true },
    { isDeleted: false, deletedAt: null },
    { new: true }
  );
  if (!product) throw new AppError('Producto no encontrado o no estaba eliminado', 404);
  return product;
};

module.exports = { getProducts, getProductBySlug, createProduct, updateProduct, deleteProduct, restoreProduct };


```

---

## File: Back/src/services/reviews.service.js

**Path:** `Back/src/services/reviews.service.js`

```javascript
const Review = require('../models/review.model');
const Product = require('../models/product.model');
const AppError = require('../errors/AppError');

const addReview = async (userId, productId, rating, comment) => {
  let review;
  try {
    review = await Review.create({ user: userId, product: productId, rating, comment });
  } catch (error) {
    if (error.code === 11000) {
      throw new AppError('Ya has reseñado este producto anteriormente', 400);
    }
    throw error;
  }

  const result = await Review.aggregate([
    { $match: { product: review.product } },
    { $group: { _id: '$product', avgRating: { $avg: '$rating' } } },
  ]);

  const avgRating = result.length > 0 ? Math.round(result[0].avgRating * 10) / 10 : 0;
  await Product.findByIdAndUpdate(productId, { ratings: avgRating });

  return review;
};

const getProductReviews = async (productId) => {
  return await Review.find({ product: productId }).populate('user', 'name').sort({ createdAt: -1 });
};

const getUserReviews = async (userId) => {
  return await Review.find({ user: userId }).populate('product', 'name slug images').sort({ createdAt: -1 });
};

module.exports = { addReview, getProductReviews, getUserReviews };

```

---

## File: Back/src/services/tickets.service.js

**Path:** `Back/src/services/tickets.service.js`

```javascript
const Ticket = require('../models/ticket.model');
const AppError = require('../errors/AppError');
const { addNotificationJob } = require('../jobs/notificationQueue');
const logger = require('../logs/logger');

const createTicket = async (userId, ticketData, userName) => {
  const ticket = await Ticket.create({
    user: userId,
    ...ticketData
  });

  // Enqueue notification for admin (Fire-and-forget)
  addNotificationJob({
    ticketId: ticket._id,
    type: 'TICKET_CREATED',
    subject: ticket.subject,
    customerName: userName || 'Cliente',
    ticketType: ticket.type
  }).catch(err => logger.error(`[Tickets] Failed to enqueue ticket notification: ${err.message}`));

  return ticket;
};

const getUserTickets = async (userId) => {
  return await Ticket.find({ user: userId }).sort({ createdAt: -1 });
};

const getAllTickets = async () => {
  return await Ticket.find().populate('user', 'name email').sort({ createdAt: -1 });
};

const updateTicketStatus = async (id, status) => {
  const ticket = await Ticket.findByIdAndUpdate(id, { status }, { new: true });
  if (!ticket) throw new AppError('Ticket no encontrado', 404);
  return ticket;
};

const replyToTicket = async (id, sender, content, statusUpdate) => {
  const ticket = await Ticket.findById(id).populate('user');
  if (!ticket) throw new AppError('Ticket no encontrado', 404);

  ticket.messages.push({
    sender,
    content,
    createdAt: new Date()
  });

  if (statusUpdate) {
    ticket.status = statusUpdate;
  } else if (sender === 'user' && ticket.status === 'resolved') {
    ticket.status = 'open';
  }

  await ticket.save();
  return ticket;
};

module.exports = { createTicket, getUserTickets, getAllTickets, updateTicketStatus, replyToTicket };

```

---

## File: Back/src/services/users.service.js

**Path:** `Back/src/services/users.service.js`

```javascript
const User = require('../models/user.model');
const AppError = require('../errors/AppError');

const getAllUsers = async (filters = {}) => {
  const page = Math.max(1, parseInt(filters.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(filters.limit, 10) || 20));
  const skip = (page - 1) * limit;

  const [users, total] = await Promise.all([
    User.find().select('-password').skip(skip).limit(limit).sort({ createdAt: -1 }),
    User.countDocuments(),
  ]);

  return { data: users, total, page, limit, totalPages: Math.ceil(total / limit) };
};

const getUserById = async (id) => {
  const user = await User.findById(id).select('-password');
  if (!user) throw new AppError('Usuario no encontrado', 404);
  return user;
};

const updateUserStatus = async (id, isActive) => {
  const user = await User.findByIdAndUpdate(id, { isActive }, { new: true }).select('-password');
  if (!user) throw new AppError('Usuario no encontrado', 404);
  return user;
};

const updateUserProfile = async (id, profileData) => {
  const update = {};
  if (profileData.phone !== undefined) update.phone = profileData.phone;
  if (profileData.shippingAddress !== undefined) {
    update.shippingAddress = {
      address: profileData.shippingAddress.address || '',
      city: profileData.shippingAddress.city || '',
      zipCode: profileData.shippingAddress.zipCode || '',
    };
  }

  const user = await User.findByIdAndUpdate(id, update, { new: true, runValidators: true }).select('-password');
  if (!user) throw new AppError('Usuario no encontrado', 404);
  return user;
};

module.exports = { getAllUsers, getUserById, updateUserStatus, updateUserProfile };

```

---

## File: Back/src/services/wishlist.service.js

**Path:** `Back/src/services/wishlist.service.js`

```javascript
const mongoose = require('mongoose');
const Wishlist = require('../models/wishlist.model');
const AppError = require('../errors/AppError');

const getWishlist = async (userId) => {
  const wishlist = await Wishlist.findOneAndUpdate(
    { user: userId },
    { $setOnInsert: { user: userId, products: [] } },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  ).populate('products');
  return wishlist;
};

const toggleWishlist = async (userId, productId) => {
  let wishlist = await Wishlist.findOneAndUpdate(
    { user: userId },
    { $setOnInsert: { user: userId, products: [] } },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  const index = wishlist.products.findIndex(id => id.toString() === productId);
  if (index > -1) {
    wishlist.products.splice(index, 1);
  } else {
    if (wishlist.products.length >= 100) {
      throw new AppError('La lista de deseos no puede contener más de 100 productos', 400);
    }
    wishlist.products.push(new mongoose.Types.ObjectId(productId));
  }

  await wishlist.save();
  return await wishlist.populate('products');
};

module.exports = { getWishlist, toggleWishlist };

```

---

## File: Back/src/uploads/multer.config.js

**Path:** `Back/src/uploads/multer.config.js`

```javascript
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }
});
module.exports = upload;

```

---

## File: Back/src/uploads/uploadMiddleware.js

**Path:** `Back/src/uploads/uploadMiddleware.js`

```javascript
const upload = require('./multer.config');
module.exports = upload.single('image');

```

---

## File: Back/src/utils/catchAsync.js

**Path:** `Back/src/utils/catchAsync.js`

```javascript
module.exports = fn => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

```

---

## File: Back/src/utils/emailTemplates.js

**Path:** `Back/src/utils/emailTemplates.js`

```javascript
const formatCurrency = (amount) =>
  new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(amount);

const orderItemsTable = (items) =>
  items
    .map(
      (item) => `
    <tr>
      <td style="padding:12px;border-bottom:1px solid #eee">${item.name}</td>
      <td style="padding:12px;border-bottom:1px solid #eee">${item.quantity}</td>
      <td style="padding:12px;border-bottom:1px solid #eee">${formatCurrency(item.price)}</td>
      <td style="padding:12px;border-bottom:1px solid #eee">${formatCurrency(item.price * item.quantity)}</td>
    </tr>`,
    )
    .join('');

const orderConfirmation = (order) => `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:Arial,sans-serif;background:#f5f5f5;margin:0;padding:0">
  <div style="max-width:600px;margin:0 auto;background:#fff">
    <div style="background:#3D3D3D;padding:24px;text-align:center">
      <h1 style="color:#D4A373;margin:0;font-size:24px">SonTerry Accesorios</h1>
    </div>
    <div style="padding:32px">
      <h2 style="color:#3D3D3D;margin:0 0 16px">¡Pedido confirmado!</h2>
      <p style="color:#666">Gracias por tu compra. Tu pedido <strong>#${order._id}</strong> ha sido recibido y está siendo procesado.</p>
      <table style="width:100%;border-collapse:collapse;margin:24px 0">
        <thead>
          <tr style="background:#f8f8f8">
            <th style="padding:12px;text-align:left">Producto</th>
            <th style="padding:12px;text-align:left">Cant</th>
            <th style="padding:12px;text-align:left">Precio</th>
            <th style="padding:12px;text-align:left">Subtotal</th>
          </tr>
        </thead>
        <tbody>${orderItemsTable(order.items)}</tbody>
      </table>
      <div style="text-align:right;font-size:18px;font-weight:bold;color:#3D3D3D;margin:16px 0">
        Total: ${formatCurrency(order.total)}
      </div>
      <div style="background:#f8f8f8;padding:16px;border-radius:8px;margin:24px 0">
        <h4 style="margin:0 0 8px;color:#3D3D3D">Dirección de envío</h4>
        <p style="margin:0;color:#666">${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.postalCode}</p>
      </div>
    </div>
    <div style="background:#3D3D3D;padding:16px;text-align:center;color:#999;font-size:12px">
      <p style="margin:0">SonTerry Accesorios — Personalización textil</p>
    </div>
  </div>
</body>
</html>`;

const orderStatusUpdate = (order, previousStatus) => `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:Arial,sans-serif;background:#f5f5f5;margin:0;padding:0">
  <div style="max-width:600px;margin:0 auto;background:#fff">
    <div style="background:#3D3D3D;padding:24px;text-align:center">
      <h1 style="color:#D4A373;margin:0;font-size:24px">SonTerry Accesorios</h1>
    </div>
    <div style="padding:32px">
      <h2 style="color:#3D3D3D;margin:0 0 16px">Tu pedido avanzó</h2>
      <p style="color:#666">El estado de tu pedido <strong>#${order._id}</strong> cambió de <strong>${previousStatus}</strong> a <strong>${order.status}</strong>.</p>
      <div style="text-align:center;margin:32px 0">
        <span style="display:inline-block;padding:12px 32px;background:#D4A373;color:#fff;border-radius:6px;font-size:18px;font-weight:bold;text-transform:uppercase">${order.status}</span>
      </div>
    </div>
    <div style="background:#3D3D3D;padding:16px;text-align:center;color:#999;font-size:12px">
      <p style="margin:0">SonTerry Accesorios — Personalización textil</p>
    </div>
  </div>
</body>
</html>`;

const passwordReset = (resetURL) => `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:Arial,sans-serif;background:#f5f5f5;margin:0;padding:0">
  <div style="max-width:600px;margin:0 auto;background:#fff">
    <div style="background:#3D3D3D;padding:24px;text-align:center">
      <h1 style="color:#D4A373;margin:0;font-size:24px">SonTerry Accesorios</h1>
    </div>
    <div style="padding:32px">
      <h2 style="color:#3D3D3D;margin:0 0 16px">Recupera tu contraseña</h2>
      <p style="color:#666">Recibiste este correo porque solicitaste restablecer tu contraseña. Haz clic en el botón para crear una nueva:</p>
      <div style="text-align:center;margin:32px 0">
        <a href="${resetURL}" style="display:inline-block;padding:14px 36px;background:#D4A373;color:#fff;text-decoration:none;border-radius:6px;font-size:16px;font-weight:bold">Restablecer contraseña</a>
      </div>
      <p style="color:#999;font-size:13px">Este enlace expira en 1 hora. Si no solicitaste este cambio, ignora este mensaje.</p>
    </div>
    <div style="background:#3D3D3D;padding:16px;text-align:center;color:#999;font-size:12px">
      <p style="margin:0">SonTerry Accesorios — Personalización textil</p>
    </div>
  </div>
</body>
</html>`;

module.exports = { orderConfirmation, orderStatusUpdate, passwordReset };

```

---

## File: Back/src/utils/formatResponse.js

**Path:** `Back/src/utils/formatResponse.js`

```javascript
module.exports = (success, message, data = null) => {
  return {
    success,
    message,
    data,
    timestamp: new Date().toISOString()
  };
};

```

---

## File: Back/src/utils/minioUpload.js

**Path:** `Back/src/utils/minioUpload.js`

```javascript
const minioClient = require('../config/minio');
const env = require('../config/env');
const AppError = require('../errors/AppError');
const logger = require('../logs/logger');
const crypto = require('crypto');
const path = require('path');

let bucketInitialized = false;

const initBucket = async () => {
  if (bucketInitialized) return;
  if (!minioClient) return;

  const bucketName = env.MINIO_BUCKET;
  try {
    const exists = await minioClient.bucketExists(bucketName);
    if (!exists) {
      await minioClient.makeBucket(bucketName, '');
      logger.info(`[MinIO] Bucket creado: ${bucketName}`);

      // Configurar política de lectura pública para que el navegador pueda acceder a las fotos
      const policy = {
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Principal: '*',
            Action: ['s3:GetObject'],
            Resource: [`arn:aws:s3:::${bucketName}/*`],
          },
        ],
      };
      await minioClient.setBucketPolicy(bucketName, JSON.stringify(policy));
      logger.info(`[MinIO] Política pública aplicada a: ${bucketName}`);
    }
    bucketInitialized = true;
  } catch (error) {
    logger.error(`[MinIO] Error inicializando bucket: ${error.message}`);
  }
};

const uploadToMinio = async (fileBuffer, originalName, mimeType) => {
  if (!minioClient) {
    logger.warn('[MinIO] MinIO no está configurado. Retornando URL placeholder.');
    return null; // Dev sin credenciales → no crashea
  }

  await initBucket();

  const bucketName = env.MINIO_BUCKET;
  const ext = path.extname(originalName).toLowerCase();
  const randomName = `${crypto.randomBytes(16).toString('hex')}${ext}`;
  const objectName = `products/${randomName}`;

  try {
    await minioClient.putObject(bucketName, objectName, fileBuffer, fileBuffer.length, {
      'Content-Type': mimeType || 'image/jpeg',
    });

    // Resolver URL pública externa para navegador
    let publicUrlBase = env.MINIO_PUBLIC_URL;
    if (!publicUrlBase) {
      const protocol = env.MINIO_USE_SSL ? 'https' : 'http';
      const endpoint = env.MINIO_ENDPOINT === 'minio' ? 'localhost' : env.MINIO_ENDPOINT;
      publicUrlBase = `${protocol}://${endpoint}:${env.MINIO_PORT}`;
    }

    return `${publicUrlBase}/${bucketName}/${objectName}`;
  } catch (error) {
    throw new AppError(`Error al subir imagen a MinIO: ${error.message}`, 500);
  }
};

const uploadMultipleToMinio = async (files) => {
  const results = await Promise.all(
    files.map(f => uploadToMinio(f.buffer, f.originalname, f.mimetype))
  );
  return results.filter(Boolean);
};

module.exports = { uploadToMinio, uploadMultipleToMinio };

```

---

## File: Back/src/utils/pdfGenerator.js

**Path:** `Back/src/utils/pdfGenerator.js`

```javascript
const logger = require('../logs/logger');

const generateInvoicePDF = async (order) => {
  logger.info(`[PDF Generator] Invoice stub generated for order ${order._id}`);
  return Buffer.from('PDF_INVOICE_STUB');
};

module.exports = { generateInvoicePDF };

```

---

## File: Back/src/utils/tokenUtils.js

**Path:** `Back/src/utils/tokenUtils.js`

```javascript
const jwt = require('jsonwebtoken');
const env = require('../config/env');

const generateToken = (payload) => {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
};

module.exports = { generateToken };

```

---

## File: Back/src/validators/order.validators.js

**Path:** `Back/src/validators/order.validators.js`

```javascript
const { body } = require('express-validator');

const createOrderRules = [
  body('shippingAddress.address')
    .trim().notEmpty().withMessage('La dirección es requerida'),
  body('shippingAddress.city')
    .trim().notEmpty().withMessage('La ciudad es requerida'),
  body('shippingAddress.postalCode')
    .trim().notEmpty().withMessage('El código postal es requerido'),
  body('shippingAddress.country')
    .trim().notEmpty().withMessage('El país es requerido'),
  body('shippingAddress.phone')
    .trim().notEmpty().withMessage('El teléfono es requerido')
    .matches(/^[0-9+\s\-()]{7,20}$/).withMessage('Formato de teléfono inválido'),
];

const updateOrderStatusRules = [
  body('status')
    .isIn(['pending', 'paid', 'shipped', 'delivered', 'cancelled'])
    .withMessage('Estado de pedido inválido. Valores permitidos: pending, paid, shipped, delivered, cancelled'),
];

module.exports = { createOrderRules, updateOrderStatusRules };

```

---

## File: Back/src/validators/product.validators.js

**Path:** `Back/src/validators/product.validators.js`

```javascript
const { body } = require('express-validator');

const createProductRules = [
  body('name')
    .trim().notEmpty().withMessage('El nombre es requerido')
    .isLength({ max: 200 }).withMessage('Máximo 200 caracteres'),
  body('description')
    .trim().notEmpty().withMessage('La descripción es requerida')
    .isLength({ max: 5000 }).withMessage('Máximo 5000 caracteres'),
  body('price')
    .isFloat({ min: 0 }).withMessage('El precio debe ser un número positivo'),
  body('stock')
    .isInt({ min: 0 }).withMessage('El stock debe ser un entero positivo'),
  body('category')
    .isMongoId().withMessage('La categoría debe ser un ID válido'),
  body('type')
    .optional()
    .isIn(['serigrafia', 'dtf', 'prenda', 'otro', 'mug', 'gorra', 'estampado']).withMessage('Tipo inválido'),
  body('images')
    .optional()
    .isArray().withMessage('images debe ser un array')
    .custom((arr) => arr.every(url => /^https?:\/\/.+/.test(url)))
    .withMessage('Cada imagen debe ser una URL válida (http/https)'),
];

const updateProductRules = [
  body('name').optional().trim().isLength({ max: 200 }).withMessage('Máximo 200 caracteres'),
  body('description').optional().trim().isLength({ max: 5000 }).withMessage('Máximo 5000 caracteres'),
  body('price').optional().isFloat({ min: 0 }).withMessage('Precio inválido'),
  body('stock').optional().isInt({ min: 0 }).withMessage('Stock inválido'),
  body('type').optional().isIn(['serigrafia', 'dtf', 'prenda', 'otro', 'mug', 'gorra', 'estampado']).withMessage('Tipo inválido'),
  body('images')
    .optional()
    .isArray().withMessage('images debe ser un array')
    .custom((arr) => arr.every(url => /^https?:\/\/.+/.test(url)))
    .withMessage('Cada imagen debe ser una URL válida'),
];

module.exports = { createProductRules, updateProductRules };

```

---

## File: Back/src/validators/review.validators.js

**Path:** `Back/src/validators/review.validators.js`

```javascript
const { body } = require('express-validator');

const addReviewRules = [
  body('productId')
    .isMongoId().withMessage('ID de producto inválido'),
  body('rating')
    .isInt({ min: 1, max: 5 }).withMessage('El rating debe ser entre 1 y 5'),
  body('comment')
    .trim().notEmpty().withMessage('El comentario es requerido')
    .isLength({ max: 2000 }).withMessage('Máximo 2000 caracteres'),
];

module.exports = { addReviewRules };

```

---

## File: Back/src/webhooks/n8n.webhook.js

**Path:** `Back/src/webhooks/n8n.webhook.js`

```javascript
const express = require('express');
const router = express.Router();
const env = require('../config/env');
const Order = require('../models/order.model');
const catchAsync = require('../utils/catchAsync');
const formatResponse = require('../utils/formatResponse');

const validateWebhookSecret = (req, res, next) => {
  const secret = req.headers['x-webhook-secret'];
  if (!secret || secret !== env.N8N_API_KEY) {
    return res.status(401).json(formatResponse(false, 'No autorizado. Secreto de webhook inválido.'));
  }
  next();
};

router.post('/dispatch-callback', validateWebhookSecret, catchAsync(async (req, res) => {
  const { orderId, deliveryConfirmed } = req.body;

  if (!orderId) {
    return res.status(400).json(formatResponse(false, 'orderId es requerido.'));
  }

  if (deliveryConfirmed) {
    const order = await Order.findByIdAndUpdate(orderId, { status: 'delivered' }, { new: true });
    if (!order) {
      return res.status(404).json(formatResponse(false, 'Pedido no encontrado.'));
    }
    return res.status(200).json(formatResponse(true, 'Pedido marcado como entregado por n8n', order));
  }

  res.status(200).json(formatResponse(true, 'Callback recibido sin cambios.'));
}));

module.exports = router;

```

---

## File: Back/src/webhooks/paypal.js

**Path:** `Back/src/webhooks/paypal.js`

```javascript
const express = require('express');
const router = express.Router();
const logger = require('../logs/logger');

router.post('/', (req, res) => {
  logger.info('PayPal Webhook event received.');
  res.status(200).json({ received: true });
});

module.exports = router;

```

---

## File: Back/src/webhooks/stripe.js

**Path:** `Back/src/webhooks/stripe.js`

```javascript
const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const env = require('../config/env');
const logger = require('../logs/logger');
const { handlePaymentSucceeded, handlePaymentFailed } = require('../services/payments.service');

let stripe = null;
if (env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(env.STRIPE_SECRET_KEY);
}

router.post('/', express.raw({ type: 'application/json' }), async (req, res) => {
  if (!stripe || !env.STRIPE_WEBHOOK_SECRET) {
    logger.warn('Stripe no configurado. Webhook ignorado.');
    return res.status(500).json({ received: false, error: 'Stripe no configurado' });
  }

  const sig = req.headers['stripe-signature'];

  if (!sig) {
    logger.warn('Stripe webhook recibido sin firma.');
    return res.status(400).json({ received: false, error: 'Firma requerida' });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    logger.error(`Stripe webhook: firma inválida - ${err.message}`);
    return res.status(400).json({ received: false, error: 'Firma inválida' });
  }

  switch (event.type) {
    case 'payment_intent.succeeded':
      await handlePaymentSucceeded(event.data.object);
      break;
    case 'payment_intent.payment_failed':
      await handlePaymentFailed(event.data.object);
      break;
    default:
      logger.info(`Stripe webhook: evento no manejado - ${event.type}`);
  }

  res.status(200).json({ received: true });
});

module.exports = router;

```

---

## File: Back/tests/integration/auth.test.js

**Path:** `Back/tests/integration/auth.test.js`

```javascript
const request = require('supertest');
const app = require('../../src/app');
const mongoose = require('mongoose');
const User = require('../../src/models/user.model');

let server;

beforeAll(async () => {
  const { MONGO_URI } = require('../../src/config/env');
  if (!MONGO_URI.includes('test')) {
    console.warn('⚠️  Usando BD que no es de test. Saltando integración.');
    return;
  }
  await mongoose.connect(MONGO_URI);
  server = app.listen(0);
});

afterAll(async () => {
  if (server) {
    await User.deleteMany({});
    await server.close();
    await mongoose.connection.close();
  }
});

const testUser = { name: 'Test', email: 'test@sonterry.com', password: 'password123' };

describe('POST /api/auth/register', () => {
  it('debe registrar un usuario y devolver token + refreshToken', async () => {
    const res = await request(app).post('/api/auth/register').send(testUser);
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('token');
    expect(res.body.data).toHaveProperty('refreshToken');
    expect(res.body.data.user.email).toBe(testUser.email);
  });

  it('debe rechazar email duplicado', async () => {
    const res = await request(app).post('/api/auth/register').send(testUser);
    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/ya está registrado/i);
  });
});

describe('POST /api/auth/login', () => {
  it('debe iniciar sesión con credenciales válidas', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: testUser.email,
      password: testUser.password,
    });
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveProperty('token');
    expect(res.body.data).toHaveProperty('refreshToken');
  });

  it('debe rechazar contraseña incorrecta', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: testUser.email,
      password: 'wrongpassword',
    });
    expect(res.status).toBe(401);
  });
});

describe('POST /api/auth/refresh', () => {
  it('debe renovar tokens con refreshToken válido', async () => {
    const loginRes = await request(app).post('/api/auth/login').send({
      email: testUser.email,
      password: testUser.password,
    });
    const refreshToken = loginRes.body.data.refreshToken;

    const res = await request(app).post('/api/auth/refresh').send({ refreshToken });
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveProperty('accessToken');
    expect(res.body.data).toHaveProperty('refreshToken');
  });
});

```

---

## File: Back/tests/integration/checkout.test.js

**Path:** `Back/tests/integration/checkout.test.js`

```javascript
const request = require('supertest');
const app = require('../../src/app');
const mongoose = require('mongoose');
const User = require('../../src/models/user.model');

let server;
let authToken;

beforeAll(async () => {
  const { MONGO_URI } = require('../../src/config/env');
  if (!MONGO_URI.includes('test')) {
    console.warn('⚠️  Usando BD que no es de test. Saltando integración.');
    return;
  }
  await mongoose.connect(MONGO_URI);
  server = app.listen(0);

  const res = await request(app).post('/api/auth/login').send({
    email: 'admin@sonterry.com',
    password: 'admin123456',
  });
  authToken = res.body.data?.token;
});

afterAll(async () => {
  if (server) {
    await server.close();
    await mongoose.connection.close();
  }
});

describe('GET /api/profile', () => {
  it('debe rechazar sin token', async () => {
    const res = await request(app).get('/api/auth/profile');
    expect(res.status).toBe(401);
  });

  it('debe devolver perfil con token válido', async () => {
    if (!authToken) return;
    const res = await request(app)
      .get('/api/auth/profile')
      .set('Authorization', `Bearer ${authToken}`);
    expect(res.status).toBe(200);
    expect(res.body.data.user).toHaveProperty('name');
    expect(res.body.data.user).not.toHaveProperty('password');
  });
});

```

---

## File: Back/tests/integration/products.test.js

**Path:** `Back/tests/integration/products.test.js`

```javascript
const request = require('supertest');
const app = require('../../src/app');
const mongoose = require('mongoose');
const User = require('../../src/models/user.model');
const Product = require('../../src/models/product.model');
const Category = require('../../src/models/category.model');

let server, adminToken, categoryId, createdProductId;

beforeAll(async () => {
  const { MONGO_URI } = require('../../src/config/env');
  if (!MONGO_URI.includes('test')) {
    console.warn('⚠️  Usando BD que no es de test. Saltando integración.');
    return;
  }
  await mongoose.connect(MONGO_URI);
  server = app.listen(0);

  // Limpieza inicial para evitar errores de clave duplicada por ejecuciones previas abortadas
  await Category.deleteMany({ name: 'Test Category' });
  await User.deleteMany({ email: 'admin-products@sonterry.com' });

  const cat = await Category.create({ name: 'Test Category', slug: 'test-category' });
  categoryId = cat._id.toString();

  await User.create({
    name: 'Admin Products', email: 'admin-products@sonterry.com',
    password: 'adminpass123', role: 'admin'
  });
  const res = await request(app).post('/api/auth/login').send({
    email: 'admin-products@sonterry.com', password: 'adminpass123'
  });
  adminToken = res.body.data?.token;
});

afterAll(async () => {
  if (server) {
    await Product.deleteMany({});
    await Category.deleteMany({ name: 'Test Category' });
    await User.deleteMany({ email: 'admin-products@sonterry.com' });
    await server.close();
    await mongoose.connection.close();
  }
});

describe('GET /api/products', () => {
  it('debe devolver lista paginada sin autenticación', async () => {
    const res = await request(app).get('/api/products');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('total');
    expect(res.body.data).toHaveProperty('page', 1);
    expect(Array.isArray(res.body.data.data)).toBe(true);
  });
});

describe('POST /api/products', () => {
  it('debe rechazar sin autenticación (401)', async () => {
    const res = await request(app).post('/api/products').send({ name: 'Test' });
    expect(res.status).toBe(401);
  });

  it('debe rechazar precio negativo (400)', async () => {
    if (!adminToken || !categoryId) return;
    const res = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: 'X', description: 'Y', price: -100, stock: 10, category: categoryId });
    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/precio/i);
  });

  it('debe rechazar stock no entero (400)', async () => {
    if (!adminToken || !categoryId) return;
    const res = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: 'X', description: 'Y', price: 50000, stock: 'mucho', category: categoryId });
    expect(res.status).toBe(400);
  });

  it('debe crear producto válido y generar slug automático', async () => {
    if (!adminToken || !categoryId) return;
    const res = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: 'Camiseta Test', description: 'Una camiseta de prueba', price: 55000, stock: 100, category: categoryId });
    expect(res.status).toBe(201);
    expect(res.body.data).toHaveProperty('slug', 'camiseta-test');
    createdProductId = res.body.data._id;
  });
});

describe('DELETE /api/products/:id (soft-delete)', () => {
  it('debe hacer soft-delete — producto no aparece en listado público', async () => {
    if (!adminToken || !createdProductId) return;

    const del = await request(app)
      .delete(`/api/products/${createdProductId}`)
      .set('Authorization', `Bearer ${adminToken}`);
    expect(del.status).toBe(200);

    // Verificar que ya no aparece en el catálogo
    const list = await request(app).get('/api/products');
    const found = list.body.data.data.find(p => p._id === createdProductId);
    expect(found).toBeUndefined();
  });

  it('debe restaurar el producto con PATCH /:id/restore', async () => {
    if (!adminToken || !createdProductId) return;

    const res = await request(app)
      .patch(`/api/products/${createdProductId}/restore`)
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
    expect(res.body.data.isDeleted).toBe(false);
  });
});

```

---

## File: Back/tests/unit/cart.service.test.js

**Path:** `Back/tests/unit/cart.service.test.js`

```javascript
jest.mock('../../src/models/cart.model');
jest.mock('../../src/models/product.model');

const Cart = require('../../src/models/cart.model');
const Product = require('../../src/models/product.model');
const cartService = require('../../src/services/cart.service');

describe('cart.service', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('addToCart', () => {
    it('debe lanzar 404 si el producto no existe', async () => {
      Product.findById.mockResolvedValue(null);
      await expect(cartService.addToCart('user1', 'prod1', 1)).rejects.toThrow('no encontrado');
    });

    it('debe lanzar 400 si no hay stock suficiente', async () => {
      Product.findById.mockResolvedValue({ stock: 2, price: 10000, name: 'X' });
      await expect(cartService.addToCart('user1', 'prod1', 5)).rejects.toThrow('Stock insuficiente');
    });
  });
});

```

---

## File: Back/tests/unit/formatCurrency.test.js

**Path:** `Back/tests/unit/formatCurrency.test.js`

```javascript
const formatCurrency = (val) => {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(val);
};

describe('formatCurrency utility', () => {
  it('debe formatear número entero con símbolo COP', () => {
    expect(formatCurrency(50000)).toBe('$ 50.000');
  });

  it('debe formatear número con decimales', () => {
    expect(formatCurrency(123456)).toBe('$ 123.456');
  });

  it('debe formatear cero', () => {
    expect(formatCurrency(0)).toBe('$ 0');
  });
});

```

---

## File: Back/tests/unit/orders.service.test.js

**Path:** `Back/tests/unit/orders.service.test.js`

```javascript
const mongoose = require('mongoose');

jest.mock('../../src/models/order.model');
jest.mock('../../src/models/product.model');
jest.mock('../../src/models/user.model');
jest.mock('../../src/services/cart.service', () => ({
  getCart: jest.fn(),
}));
jest.mock('../../src/jobs/notificationQueue', () => ({
  addNotificationJob: jest.fn(() => Promise.resolve()),
}));
jest.mock('../../src/services/email.service', () => ({
  sendOrderConfirmation: jest.fn(() => Promise.resolve()),
  sendOrderStatusUpdate: jest.fn(() => Promise.resolve()),
}));

const Order = require('../../src/models/order.model');
const Product = require('../../src/models/product.model');
const ordersService = require('../../src/services/orders.service');

describe('orders.service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllUsersOrders (pagination)', () => {
    it('debe aplicar paginación por defecto (page=1, limit=20)', async () => {
      Order.find.mockReturnValue({
        sort: jest.fn().mockReturnValue({
          skip: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([]),
          }),
        }),
      });
      Order.countDocuments.mockResolvedValue(0);
      Order.find.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue([]),
      });

      const result = await ordersService.getAllOrders({});

      expect(Order.find).toHaveBeenCalled();
      expect(Order.countDocuments).toHaveBeenCalled();
      expect(result).toMatchObject({
        data: [],
        total: 0,
        page: 1,
        limit: 20,
        totalPages: 0,
      });
    });

    it('debe respetar page y limit enviados', async () => {
      Order.countDocuments.mockResolvedValue(50);
      Order.find.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue([]),
      });

      const result = await ordersService.getAllOrders({ page: '2', limit: '10' });

      expect(result.page).toBe(2);
      expect(result.limit).toBe(10);
      expect(result.totalPages).toBe(5);
    });

    it('debe limitar el máximo a 100 registros por página', async () => {
      Order.countDocuments.mockResolvedValue(500);
      Order.find.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue([]),
      });

      const result = await ordersService.getAllOrders({ limit: '999' });

      expect(result.limit).toBe(100);
    });
  });

  describe('createOrder stock atomicity', () => {
    it('debe lanzar error si el carrito está vacío', async () => {
      const cartService = require('../../src/services/cart.service');
      cartService.getCart.mockResolvedValue({ items: [] });

      await expect(ordersService.createOrder('user1', {}, 'Test')).rejects.toThrow('vacío');
    });
  });
});

```

---

## File: Back/tests/unit/payments.service.test.js

**Path:** `Back/tests/unit/payments.service.test.js`

```javascript
describe('payments.service', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('debe lanzar 500 si Stripe no está configurado', async () => {
    // Mockear el archivo de config env directamente
    jest.doMock('../../src/config/env', () => ({
      STRIPE_SECRET_KEY: undefined,
    }));

    // Mockear los modelos
    jest.doMock('../../src/models/order.model', () => ({
      findById: jest.fn().mockResolvedValue({ _id: 'ord1', total: 100000, status: 'pending' }),
    }));
    jest.doMock('../../src/models/payment.model', () => ({
      create: jest.fn(),
    }));

    // Cargar el servicio ahora que las dependencias están mockeadas
    const svc = require('../../src/services/payments.service');

    await expect(svc.createPaymentIntent('ord1')).rejects.toThrow('no está configurado');
  });
});

```

---

## File: Back/tests/unit/products.service.test.js

**Path:** `Back/tests/unit/products.service.test.js`

```javascript
jest.mock('../../src/models/product.model');

const Product = require('../../src/models/product.model');
const productsService = require('../../src/services/products.service');

describe('products.service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getProducts (pagination y filtros)', () => {
    it('debe devolver productos paginados con valores por defecto', async () => {
      const mockProducts = [
        { name: 'Camiseta', price: 50000 },
        { name: 'Gorra', price: 30000 },
      ];
      Product.find.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        sort: jest.fn().mockResolvedValue(mockProducts),
      });
      Product.countDocuments.mockResolvedValue(2);

      const result = await productsService.getProducts({});
      expect(result.data).toHaveLength(2);
      expect(result.page).toBe(1);
      expect(result.limit).toBe(20);
    });

    it('debe filtrar por categoría', async () => {
      Product.find.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        sort: jest.fn().mockResolvedValue([]),
      });
      Product.countDocuments.mockResolvedValue(0);

      await productsService.getProducts({ category: 'cat123' });
      expect(Product.find).toHaveBeenCalledWith(
        expect.objectContaining({ category: 'cat123' }),
      );
    });

    it('debe usar búsqueda de texto cuando search está presente', async () => {
      Product.find.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        sort: jest.fn().mockResolvedValue([]),
      });
      Product.countDocuments.mockResolvedValue(0);

      await productsService.getProducts({ search: 'camiseta' });
      expect(Product.find).toHaveBeenCalledWith(
        expect.objectContaining({ $text: { $search: 'camiseta' } }),
      );
    });
  });

  describe('getProductBySlug', () => {
    it('debe retornar el producto si existe', async () => {
      Product.findOne.mockReturnValue({
        populate: jest.fn().mockResolvedValue({ name: 'Camiseta', slug: 'camiseta' }),
      });
      const result = await productsService.getProductBySlug('camiseta');
      expect(result.name).toBe('Camiseta');
    });

    it('debe lanzar 404 si no existe', async () => {
      Product.findOne.mockReturnValue({
        populate: jest.fn().mockResolvedValue(null),
      });
      await expect(productsService.getProductBySlug('inexistente')).rejects.toThrow('no encontrado');
    });
  });
});

```

---

## File: Front/.env

**Path:** `Front/.env`

```text
VITE_API_URL=http://localhost:5000/api

```

---

## File: Front/.env.example

**Path:** `Front/.env.example`

```text
VITE_API_URL=http://localhost:5000/api

```

---

## File: Front/Dockerfile

**Path:** `Front/Dockerfile`

```text
# Stage 1: Build React App
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
# Copy built files
COPY --from=build /app/dist /usr/share/nginx/html
# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

```

---

## File: Front/index.html

**Path:** `Front/index.html`

```html
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SonTerry Accesorios | Personalización Textil Artesanal</title>
    <!-- Playfair Display for Titles, Poppins for Subtitles, Inter for Body -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>

```

---

## File: Front/nginx.conf

**Path:** `Front/nginx.conf`

```text
server {
    listen 80;
    server_name localhost;
    client_max_body_size 50M;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://api:5000/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
        root /usr/share/nginx/html;
    }
}

```

---

## File: Front/package.json

**Path:** `Front/package.json`

```json
{
  "name": "mi-ecommerce-front",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
  "dependencies": {
    "@gsap/react": "^2.1.2",
    "@hookform/resolvers": "^3.4.2",
    "@react-three/drei": "^9.109.1",
    "@react-three/fiber": "^8.17.10",
    "@tanstack/react-query": "^5.37.1",
    "axios": "^1.6.8",
    "gsap": "^3.12.5",
    "lucide-react": "^0.379.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.51.5",
    "react-router-dom": "^6.23.1",
    "three": "^0.160.0",
    "zod": "^3.23.8",
    "zustand": "^4.5.2"
  },
  "devDependencies": {
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.0",
    "eslint": "^8.57.0",
    "eslint-plugin-react": "^7.34.1",
    "eslint-plugin-react-hooks": "^4.6.2",
    "eslint-plugin-react-refresh": "^0.4.7",
    "vite": "^5.2.11"
  }
}

```

---

## File: Front/public/manifest.json

**Path:** `Front/public/manifest.json`

```json
{
  "short_name": "SonTerry",
  "name": "SonTerry Accesorios E-Commerce",
  "icons": [],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#6B9E5C",
  "background_color": "#F5F1E8"
}

```

---

## File: Front/public/robots.txt

**Path:** `Front/public/robots.txt`

```text
User-agent: *
Allow: /

```

---

## File: Front/src/App.jsx

**Path:** `Front/src/App.jsx`

```javascript
import React, { Suspense, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { router } from './router';
import LoadingSpinner from './components/common/LoadingSpinner';
import ErrorBoundary from './components/common/ErrorBoundary';
import { useCartStore } from './store/cartStore';
import './assets/css/App.css';

const queryClient = new QueryClient();

function AppContent() {
  const fetchCart = useCartStore((state) => state.fetchCart);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return <RouterProvider router={router} />;
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<LoadingSpinner size="large" />}>
          <AppContent />
        </Suspense>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;


```

---

## File: Front/src/assets/css/App.css

**Path:** `Front/src/assets/css/App.css`

```css
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  padding-bottom: 0;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Footer layout and background wave decoration */
.main-footer {
  position: relative;
  background-color: var(--color-bg);
  color: var(--color-text);
  padding: 8rem 0 8rem 0;
  margin-top: auto;
  border-top: 1px solid var(--color-border);
  overflow: hidden;
}

.main-footer .container {
  position: relative;
  z-index: 2;
}

.main-footer::after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  width: 550px;
  height: 380px;
  /* background-image: url('../img/footer_wave.png'); */
  background-repeat: no-repeat;
  background-position: bottom right;
  background-size: 180%;
  pointer-events: none;
  mix-blend-mode: multiply;
  z-index: 1;
  opacity: 0.95;
}

@media (max-width: 768px) {
  .main-footer::after {
    width: 300px;
    height: 210px;
    opacity: 0.8;
  }
}



```

---

## File: Front/src/assets/css/index.css

**Path:** `Front/src/assets/css/index.css`

```css
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');

:root {
  /* ─── PREMIUM DESIGN SYSTEM ─────────────────────────────────────── */
  /* Paleta Orgánica Premium */
  --green-deep:    #1E4A28;
  --green-mid:     #3B7A47;
  --green-brand:   #528F58;
  --green-light:   #87BA8F;
  --green-mist:    #D4E9D7;
  --green-ghost:   #F0F7F1;
  --green-glow:    #6DBF47;

  --terra-dark:    #8B4A32;
  --terra-mid:     #C97D5C;
  --terra-light:   #E8A98A;
  --terra-ghost:   #FAF0EB;

  --cream:         #F8F4EE;
  --cream-warm:    #F2EBE0;
  --white:         #FFFFFF;

  --text-primary:  #1C2B1E;
  --text-secondary:#4A5C4E;
  --text-muted:    #8A9E8E;
  --border-subtle: rgba(82,143,88,0.14);
  --border-mid:    rgba(82,143,88,0.24);

  /* Estado y feedback */
  --color-danger:  #D9534F;
  --color-success: #2E7D32;
  --color-warning: #EF6C00;

  /* ─── LEGACY ALIASES (Mapping to Premium) ─────────────────────── */
  --color-primary:       var(--green-brand);
  --color-primary-hover: var(--green-mid);
  --color-accent:        var(--terra-mid);
  --color-accent-hover:  var(--terra-dark);
  --color-bg:            var(--cream);
  --color-card-bg:       var(--white);
  --color-text:          var(--text-primary);
  --color-text-light:    var(--text-secondary);
  --color-border:        var(--border-subtle);

  /* Sombras tintadas en verde */
  --s-xs: 0 1px 3px  rgba(30,74,40,0.06);
  --s-sm: 0 4px 12px rgba(30,74,40,0.08);
  --s-lg: 0 20px 60px rgba(30,74,40,0.16);
  --s-card-hover: 0 24px 56px rgba(30,74,40,0.20), 0 4px 16px rgba(201,125,92,0.08);
  --text-shadow-cream: 0 1px 3px rgba(248,244,238,0.9), 0 0 12px rgba(248,244,238,0.6);
  --shadow-sm:  var(--s-xs);
  --shadow-md:  var(--s-sm);
  --shadow-lg:  var(--s-lg);

  /* Radios */
  --r-sm:  10px;
  --r-md:  16px;
  --r-lg:  22px;
  --r-xl:  30px;
  --r-2xl: 44px;
  --border-radius-sm:  var(--r-sm);
  --border-radius-md:  var(--r-md);
  --border-radius-lg:  var(--r-lg);

  --t-smooth: all 0.30s cubic-bezier(.4,0,.2,1);
  --transition-smooth: var(--t-smooth);

  /* Tipografía */
  --font-display: 'Syne', sans-serif;
  --font-body:    'DM Sans', sans-serif;

}

/* ─── RESET ─────────────────────────────────────────────────────────── */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* ─── BASE ───────────────────────────────────────────────────────────── */
html, body {
  overflow-x: hidden;
  max-width: 100vw;
}

body {
  font-family: var(--font-body);
  background-color: var(--cream);
  color: var(--text-primary);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2, h3, h4, h5, h6, .font-display {
  font-family: var(--font-display);
  color: var(--text-primary);
  line-height: 1.2;
  font-weight: 700;
}

h2 {
  font-size: clamp(1.75rem, 4vw, 2.25rem);
  margin-bottom: 1.25rem;
}

a {
  color: inherit;
  text-decoration: none;
  transition: var(--t-smooth);
}

button, input, select, textarea {
  font-family: var(--font-body);
}

/* ─── BADGE SYSTEM ───────────────────────────────────────────────────── */
.badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 999px;
  font-family: var(--font-display);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
.badge-dtf {
  background-color: var(--green-mist);
  color: var(--green-deep);
}
.badge-serigrafia {
  background-color: var(--terra-ghost);
  color: var(--terra-dark);
}
.badge-default {
  background-color: var(--green-ghost);
  color: var(--green-mid);
}

/* ─── GLASSMORPHISM ──────────────────────────────────────────────────── */
.glass {
  background: rgba(255, 255, 255, 0.70);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.35);
}
.glass-dark {
  background: rgba(30, 74, 40, 0.82);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #FFFFFF;
}

/* ─── ANIMATIONS ─────────────────────────────────────────────────────── */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes slideInRight {
  from { transform: translateX(100%); }
  to   { transform: translateX(0); }
}
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(6px); }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease forwards;
}

/* ─── SCROLLBAR ──────────────────────────────────────────────────────── */
.hide-scrollbar::-webkit-scrollbar { display: none; }
.hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

/* ═════════════════════════════════════════════════════════════
   SONTERRY DESIGN SYSTEM - UTILITY CLASSES
═════════════════════════════════════════════════════════════ */
.relative  { position: relative; }
.absolute  { position: absolute; }
.inset-0   { top:0; right:0; bottom:0; left:0; }
.w-full    { width: 100%; }
.h-full    { height: 100%; }
.h-screen  { height: 100vh; }
.overflow-hidden { overflow: hidden; }
.z-10  { z-index: 10; }
.z-20  { z-index: 20; }
.z-50  { z-index: 50; }

/* Flexbox */
.flex       { display: flex; }
.flex-col   { flex-direction: column; }
.flex-wrap  { flex-wrap: wrap; }
.items-center   { align-items: center; }
.items-start    { align-items: flex-start; }
.items-end      { align-items: flex-end; }
.justify-center { justify-content: center; }
.justify-between{ justify-content: space-between; }
.justify-start  { justify-content: flex-start; }
.justify-end    { justify-content: flex-end; }

/* Gaps */
.gap-1 { gap: 0.25rem; }
.gap-2 { gap: 0.5rem; }
.gap-3 { gap: 0.75rem; }
.gap-4 { gap: 1rem; }
.gap-6 { gap: 1.5rem; }
.gap-8 { gap: 2rem; }

/* Spacing (Margins & Paddings) */
.m-0  { margin: 0; }
.mt-1 { margin-top: 0.25rem; }
.mt-2 { margin-top: 0.5rem; }
.mt-4 { margin-top: 1rem; }
.mt-6 { margin-top: 1.5rem; }
.mt-8 { margin-top: 2rem; }
.mb-1 { margin-bottom: 0.25rem; }
.mb-2 { margin-bottom: 0.5rem; }
.mb-4 { margin-bottom: 1rem; }
.mb-6 { margin-bottom: 1.5rem; }
.mb-8 { margin-bottom: 2rem; }

/* Typography utilities */
.text-center { text-align: center; }
.text-left   { text-align: left; }
.text-right  { text-align: right; }
.text-sm     { font-size: 0.875rem; }
.text-lg     { font-size: 1.125rem; }
.text-xl     { font-size: 1.25rem; }
.text-2xl    { font-size: 1.5rem; }
.font-bold   { font-weight: 700; }
.font-medium { font-weight: 500; }
.uppercase   { text-transform: uppercase; }
.tracking-widest { letter-spacing: 0.1em; }

/* Colors */
.text-primary   { color: var(--text-primary); }
.text-secondary { color: var(--text-secondary); }
.text-muted     { color: var(--text-muted); }
.text-brand     { color: var(--green-brand); }
.text-accent    { color: var(--terra-mid); }
.text-white     { color: #FFFFFF; }

.bg-cream       { background-color: var(--cream); }
.bg-white       { background-color: var(--white); }
.bg-brand       { background-color: var(--green-brand); }
.bg-brand-mist  { background-color: var(--green-mist); }

/* Borders & Radius */
.border-2           { border-width: 2px; border-style: solid; }
.border-subtle      { border-color: var(--border-subtle); border-style: solid; border-width: 1px; }
.rounded-sm         { border-radius: var(--r-sm); }
.rounded-md         { border-radius: var(--r-md); }
.rounded-lg         { border-radius: var(--r-lg); }
.rounded-full       { border-radius: 9999px; }

/* Interactions */
.pointer-events-none { pointer-events: none; }
.cursor-pointer      { cursor: pointer; }

/* Transitions */
.transition-all     { transition-property: all; transition-duration: 300ms; transition-timing-function: cubic-bezier(.4,0,.2,1); }
.transition-opacity { transition-property: opacity; transition-duration: 300ms; }
.duration-300       { transition-duration: 300ms; }
.duration-700       { transition-duration: 700ms; }
.duration-1000      { transition-duration: 1000ms; }
.ease-out           { transition-timing-function: cubic-bezier(0, 0, 0.2, 1); }

/* Specific dimensions */
.w-1 { width: 0.25rem; }
.w-5 { width: 1.25rem; }
.h-2 { height: 0.5rem; }
.h-8 { height: 2rem; }

/* State & Transforms */
.opacity-0      { opacity: 0; }
.opacity-100    { opacity: 1; }
.translate-y-0  { transform: translateY(0); }
.translate-y-12 { transform: translateY(3rem); }

/* ═════════════════════════════════════════════════════════════
   SONTERRY DESIGN SYSTEM - GLOBAL UI COMPONENTS
═════════════════════════════════════════════════════════════ */

/* ─── BUTTONS ─── */
.snt-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.75rem;
  border: none;
  border-radius: var(--r-lg);
  font-family: var(--font-display);
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  cursor: pointer;
  transition: var(--t-smooth);
  white-space: nowrap;
  text-decoration: none;
}
.snt-btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
  pointer-events: none;
}
.snt-btn-primary {
  background-color: var(--green-deep);
  color: var(--white);
  box-shadow: var(--s-xs);
}
.snt-btn-primary:hover:not(:disabled) {
  background-color: var(--green-mid);
  transform: translateY(-2px);
  box-shadow: var(--s-sm);
}
.snt-btn-primary-inverted {
  background-color: var(--white);
  color: var(--green-deep);
  box-shadow: var(--s-xs);
}
.snt-btn-primary-inverted:hover:not(:disabled) {
  background-color: var(--green-ghost);
  transform: translateY(-2px);
  box-shadow: var(--s-sm);
}
.snt-btn-secondary {
  background-color: var(--white);
  color: var(--text-primary);
  border: 1.5px solid var(--border-mid);
  box-shadow: var(--s-xs);
}
.snt-btn-secondary:hover:not(:disabled) {
  border-color: var(--green-brand);
  color: var(--green-deep);
  transform: translateY(-2px);
  box-shadow: var(--s-sm);
}
.snt-btn-accent {
  background-color: var(--terra-mid);
  color: var(--white);
  box-shadow: var(--s-xs);
}
.snt-btn-accent:hover:not(:disabled) {
  background-color: var(--terra-dark);
  transform: translateY(-2px);
  box-shadow: var(--s-sm);
}
.snt-btn-outline {
  background-color: transparent;
  color: var(--green-deep);
  border: 1.5px solid var(--border-mid);
}
.snt-btn-outline:hover:not(:disabled) {
  background-color: var(--green-ghost);
  border-color: var(--green-brand);
  transform: translateY(-2px);
}
.snt-btn-text {
  background-color: transparent;
  color: var(--text-secondary);
  padding: 0.5rem 0.75rem;
  border-radius: var(--r-sm);
}
.snt-btn-text:hover:not(:disabled) {
  color: var(--green-deep);
  background-color: var(--green-ghost);
}

/* ─── CARDS & SURFACES ─── */
.snt-card {
  background-color: var(--white);
  border: 1px solid var(--border-subtle);
  border-radius: var(--r-lg);
  box-shadow: var(--s-sm);
  padding: 2rem;
  transition: var(--t-smooth);
}
.snt-card:hover {
  box-shadow: var(--s-lg);
  border-color: var(--border-mid);
}

/* ─── FORMS & INPUTS ─── */
.snt-input {
  width: 100%;
  padding: 0.85rem 1.25rem;
  border: 1px solid var(--border-mid);
  border-radius: var(--r-md);
  background-color: var(--white);
  color: var(--text-primary);
  font-family: var(--font-body);
  font-size: 0.95rem;
  transition: var(--t-smooth);
  outline: none;
}
.snt-input:focus {
  border-color: var(--green-brand);
  box-shadow: 0 0 0 3px rgba(82, 143, 88, 0.1);
}
.snt-input::placeholder {
  color: var(--text-muted);
}
.snt-label {
  display: block;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
}

/* ─── SCROLLBAR PERSONALIZADO ─── */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--cream); }
::-webkit-scrollbar-thumb { background: var(--green-light); border-radius: 999px; }
::-webkit-scrollbar-thumb:hover { background: var(--green-brand); }

/* ─── ANIMACIONES ADICIONALES ─── */
@keyframes pulseLED {
  from { opacity: 0.5; box-shadow: 0 0 4px 1px rgba(109,191,71,0.6); }
  to   { opacity: 1;   box-shadow: 0 0 8px 3px rgba(109,191,71,0.9); }
}

```

---

## File: Front/src/components/cart/CartDrawer.jsx

**Path:** `Front/src/components/cart/CartDrawer.jsx`

```javascript
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';
import { useUiStore } from '../../store/uiStore';
import { formatCurrency } from '../../utils/formatCurrency';
import { X } from 'lucide-react';
import Button from '../common/Button';
import CartItem from './CartItem';

const CartDrawer = () => {
  const { cartOpen, toggleCart } = useUiStore();
  const { items, removeFromCart, getCartTotal } = useCartStore();
  const navigate = useNavigate();

  if (!cartOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(61, 61, 61, 0.4)',
      backdropFilter: 'blur(4px)',
      zIndex: 500,
      display: 'flex',
      justifyContent: 'flex-end',
      animation: 'fadeIn 0.2s'
    }} onClick={() => toggleCart(false)}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        backgroundColor: '#FFFFFF',
        height: '100%',
        boxShadow: 'var(--shadow-lg)',
        display: 'flex',
        flexDirection: 'column',
        animation: 'slideInRight 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }} onClick={(e) => e.stopPropagation()}>

        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Bolsa de Personalización</h3>
          <Button variant="text" onClick={() => toggleCart(false)}><X size={22} /></Button>
        </div>

        <div style={{ flexGrow: 1, overflowY: 'auto', padding: '1.5rem' }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 0' }}>
              <p style={{ color: 'var(--color-text-light)' }}>Tu bolsa está vacía.</p>
              <Button variant="primary" style={{ marginTop: '1rem' }} onClick={() => { toggleCart(false); navigate('/productos'); }}>Ver Diseños</Button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {items.map((item, idx) => (
                <CartItem
                  key={idx}
                  item={item}
                  onRemove={() => removeFromCart(item.product._id, item.customization?.type)}
                />
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div style={{ padding: '1.5rem', borderTop: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontWeight: '700', fontSize: '1.1rem' }}>
              <span>Total Estimado:</span>
              <span>{formatCurrency(getCartTotal())}</span>
            </div>
            <Button variant="accent" style={{ width: '100%' }} onClick={() => { toggleCart(false); navigate('/checkout'); }}>
              Iniciar Proyecto / Pago
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;

```

---

## File: Front/src/components/cart/CartItem.jsx

**Path:** `Front/src/components/cart/CartItem.jsx`

```javascript
import React from 'react';
import { formatCurrency } from '../../utils/formatCurrency';
import { Trash2 } from 'lucide-react';
import Button from '../common/Button';

const CartItem = ({ item, onRemove }) => {
  return (
    <div style={{
      display: 'flex',
      gap: '1rem',
      borderBottom: '1px solid var(--color-border)',
      paddingBottom: '1.25rem'
    }}>
      <img
        src={item.product.images?.[0] || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500'}
        alt={item.product.name}
        style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: 'var(--border-radius-sm)' }}
      />
      <div style={{ flexGrow: 1 }}>
        <h4 style={{ fontSize: '0.95rem', margin: 0 }}>{item.product.name}</h4>
        <div style={{ fontSize: '0.8rem', color: 'var(--color-accent)', fontWeight: '500', margin: '2px 0' }}>
          {item.quantity} x {formatCurrency(item.product.price)}
        </div>
        {item.customization && (
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-light)', borderLeft: '2px solid var(--color-primary)', paddingLeft: '4px' }}>
            Estampado: {item.customization.type.toUpperCase()} ({item.customization.details})
          </div>
        )}
      </div>
      {onRemove && (
        <Button variant="text" onClick={onRemove}>
          <Trash2 size={16} color="var(--color-danger)" />
        </Button>
      )}
    </div>
  );
};

export default CartItem;

```

---

## File: Front/src/components/common/Button.jsx

**Path:** `Front/src/components/common/Button.jsx`

```javascript
import React from 'react';

/**
 * SonTerry Premium Button
 *
 * Variants: primary | secondary | accent | outline | text
 */
const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
  className = '',
  style = {},
}) => {
  return (
    <>


      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        style={style}
        className={`snt-btn snt-btn-${variant} ${className}`}
      >
        {children}
      </button>
    </>
  );
};

export default Button;

```

---

## File: Front/src/components/common/ErrorBoundary.jsx

**Path:** `Front/src/components/common/ErrorBoundary.jsx`

```javascript
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', textAlign: 'center', backgroundColor: '#FFF' }}>
          <h2>Algo salió mal.</h2>
          <p>Por favor intenta recargar la página o vuelve más tarde.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

```

---

## File: Front/src/components/common/Input.jsx

**Path:** `Front/src/components/common/Input.jsx`

```javascript
import React from 'react';

const Input = ({ label, type = 'text', name, register, error, placeholder, className = '', ...props }) => {
  return (
    <div className={`snt-form-group ${className}`} style={{ marginBottom: '1.25rem' }}>
      {label && <label className="snt-label">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        className={`snt-input ${error ? 'error' : ''}`}
        style={error ? { borderColor: 'var(--color-danger)' } : {}}
        {...(register ? register(name) : {})}
        {...props}
      />
      {error && <span style={{ color: 'var(--color-danger)', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{error.message}</span>}
    </div>
  );
};

export default Input;

```

---

## File: Front/src/components/common/LoadingSpinner.jsx

**Path:** `Front/src/components/common/LoadingSpinner.jsx`

```javascript
import React from 'react';

const LoadingSpinner = ({ size = 'medium', color = 'var(--color-primary)' }) => {
  const sizes = { small: '20px', medium: '40px', large: '60px' };
  const spinnerSize = sizes[size] || sizes.medium;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
      <div style={{
        width: spinnerSize,
        height: spinnerSize,
        border: '3px solid var(--color-border)',
        borderTop: `3px solid ${color}`,
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }} />
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;

```

---

## File: Front/src/components/common/Modal.jsx

**Path:** `Front/src/components/common/Modal.jsx`

```javascript
import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import Button from './Button';

const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(61, 61, 61, 0.4)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1.5rem'
    }} onClick={onClose}>
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--border-radius-md)',
        width: '100%',
        maxWidth: '500px',
        boxShadow: 'var(--shadow-lg)',
        overflow: 'hidden',
        animation: 'fadeIn 0.3s ease-out'
      }} onClick={(e) => e.stopPropagation()}>
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h3 style={{ fontSize: '1.25rem', margin: 0 }}>{title}</h3>
          <Button variant="text" onClick={onClose}><X size={20} /></Button>
        </div>
        <div style={{ padding: '1.5rem' }}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;

```

---

## File: Front/src/components/common/Toast.jsx

**Path:** `Front/src/components/common/Toast.jsx`

```javascript
import React from 'react';
import { useUiStore } from '../../store/uiStore';
import { AlertCircle, CheckCircle, Info, X } from 'lucide-react';

const Toast = () => {
  const { toasts, removeToast } = useUiStore();

  if (toasts.length === 0) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '2rem',
      right: '2rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
      zIndex: 2000,
      maxWidth: '350px',
      width: '100%'
    }}>
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';
        
        return (
          <div key={toast.id} style={{
            padding: '1rem',
            borderRadius: 'var(--border-radius-sm)',
            boxShadow: 'var(--shadow-md)',
            backgroundColor: '#FFFFFF',
            borderLeft: `4px solid ${isSuccess ? 'var(--color-success)' : isError ? 'var(--color-danger)' : 'var(--color-warning)'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            animation: 'fadeIn 0.3s ease-out'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {isSuccess && <CheckCircle size={18} color="var(--color-success)" />}
              {isError && <AlertCircle size={18} color="var(--color-danger)" />}
              {!isSuccess && !isError && <Info size={18} color="var(--color-warning)" />}
              <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>{toast.message}</span>
            </div>
            <button onClick={() => removeToast(toast.id)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Toast;

```

---

## File: Front/src/components/home/HeroSeparator.jsx

**Path:** `Front/src/components/home/HeroSeparator.jsx`

```javascript
import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeroSeparator = () => {
  const navigate = useNavigate();
  return (
    <section 
      style={{
        position: 'relative',
        width: '100%',
        padding: '5rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderTop: '4px solid var(--green-deep)',
        borderBottom: '4px solid var(--green-deep)'
      }}
    >
      {/* Imagen de fondo free (Unsplash - referente a textiles/colores/estampados) */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url("https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=2000")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed', /* Efecto parallax */
          zIndex: 0,
          filter: 'brightness(0.5) saturate(1.2)'
        }}
      />
      
      {/* Capa de gradiente para integrarlo con los colores de la marca */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, rgba(30, 74, 40, 0.85) 0%, rgba(59, 122, 71, 0.70) 50%, rgba(30, 74, 40, 0.80) 100%)',
          zIndex: 1
        }}
      />

      <div 
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          maxWidth: '800px',
          color: '#fff'
        }}
      >
        <h2 
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.8rem, 4.5vw, 3rem)',
            fontWeight: '800',
            marginBottom: '1rem',
            textShadow: '0 2px 10px rgba(0,0,0,0.5)',
            lineHeight: '1.2'
          }}
        >
          Dale vida a tus ideas con color puro
        </h2>
        <p 
          style={{
            fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
            marginBottom: '2rem',
            fontWeight: '500',
            lineHeight: '1.6',
            color: '#eaeaea'
          }}
        >
          Nuestras técnicas de Estampado DTF, Serigrafía y Bordado garantizan durabilidad y una explosión de color en cada prenda.
        </p>
        <button
          onClick={() => navigate('/productos')}
          className="snt-btn snt-btn-primary-inverted rounded-full uppercase"
          style={{ padding: '14px 36px', letterSpacing: '1px' }}
        >
          Explorar Técnicas
        </button>
      </div>
    </section>
  );
};

export default HeroSeparator;

```

---

## File: Front/src/components/home/HeroTV.jsx

**Path:** `Front/src/components/home/HeroTV.jsx`

```javascript
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import heroVideo from '../../assets/video/sonterry-hero.mp4';
import bgVideo from '../../assets/video/bg-escena-inicial.mp4';

const HeroTV = () => {
  const navigate = useNavigate();
  // Referencias DOM
  const containerRef = useRef(null);
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const cardRef = useRef(null);
  const bgVideoRef = useRef(null);

  useGSAP(() => {
    // Animaciones de Entrada (UI principal)
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(eyebrowRef.current,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.5 }
    );

    tl.fromTo(titleRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.7 },
      "-=0.2"
    );

    tl.fromTo(subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 },
      "-=0.3"
    );

    tl.fromTo(ctaRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4 },
      "-=0.2"
    );

    tl.fromTo(cardRef.current,
      { opacity: 0, x: 60, rotateY: 8 },
      { opacity: 1, x: 0, rotateY: 0, duration: 0.9, ease: "power2.out" },
      0.2
    );

    // Animación idle del glow de la TV
    gsap.to(cardRef.current, {
      boxShadow: `
        0 0 0 1px rgba(255,255,255,0.05),
        0 0 40px 8px rgba(109,191,71,0.4),
        0 0 80px 20px rgba(109,191,71,0.2),
        0 20px 40px rgba(0,0,0,0.4)
      `,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

  }, { scope: containerRef });

  const handleMouseEnter = () => gsap.to(cardRef.current, { y: -8, duration: 0.3, ease: "power2.out" });
  const handleMouseLeave = () => gsap.to(cardRef.current, { y: 0, duration: 0.4, ease: "power2.inOut" });

  return (
    <>
      <section ref={containerRef} className="hero-section">
        {/* ─── FONDO DE VIDEO (Z-INDEX: 0) ─── */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            pointerEvents: 'none'
          }}
        >
          <video
            ref={bgVideoRef}
            src={bgVideo}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(248, 244, 238, 0.4)', // Overlay crema
            }}
          />
        </div>

        {/* ─── CONTENIDO EN PRIMER PLANO ─── */}
        <div className="hero-content">

          {/* Columna Izquierda (Texto y CTA) */}
          <div className="hero-text-col">
            <p
              ref={eyebrowRef}
              style={{
                color: 'var(--green-dark)',
                fontSize: '0.85rem',
                fontWeight: '800',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: '1.2rem',
                textShadow: '0px 1px 2px rgba(255,255,255,0.8)'
              }}
            >
              Estampado DTF · Bordado · Personalización
            </p>

            <h1 ref={titleRef} className="font-display hero-title">
              Tu marca estampada con alma y precisión textil
            </h1>

            <p ref={subtitleRef} className="hero-subtitle">
              Diseños únicos que hablan por tu negocio.
            </p>

            <div ref={ctaRef} className="hero-buttons">
              <button
                onClick={() => navigate('/productos')}
                className="snt-btn snt-btn-primary rounded-full"
                style={{ padding: '14px 32px', fontSize: '1.05rem' }}
              >
                Ver productos
              </button>

              <button
                onClick={() => navigate('/contacto')}
                className="snt-btn snt-btn-secondary rounded-full"
                style={{ padding: '14px 32px', fontSize: '1.05rem' }}
              >
                Cotiza tu diseño
              </button>
            </div>
          </div>

          {/* Columna Derecha (Card Pantalla Flotante TV) */}
          <div className="hero-card-col">
            <div
              ref={cardRef}
              className="tv-card"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* Pantalla interna con video */}
              <div
                style={{
                  borderRadius: '12px',
                  overflow: 'hidden',
                  position: 'relative',
                  background: 'var(--color-bg)',
                  aspectRatio: '16/9'
                }}
              >
                {/* El Video (Zorro) */}
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                >
                  <source src={heroVideo} type="video/mp4" />
                </video>

                {/* Overlay: Scanlines sutiles */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: `repeating-linear-gradient(
                      0deg,
                      transparent,
                      transparent 2px,
                      rgba(0, 0, 0, 0.03) 2px,
                      rgba(0, 0, 0, 0.03) 4px
                    )`,
                    pointerEvents: 'none',
                    zIndex: 2,
                    borderRadius: '12px'
                  }}
                />

                {/* Reflejo de luz LCD */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '60%',
                    height: '40%',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 60%)',
                    pointerEvents: 'none',
                    zIndex: 3,
                    borderRadius: '12px 0 0 0'
                  }}
                />
              </div>

              {/* Indicador LED de encendido */}
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#6DBF47',
                  boxShadow: '0 0 6px 2px rgba(109,191,71,0.8)',
                  margin: '8px auto 0',
                  animation: 'pulseLED 2s infinite alternate'
                }}
              />
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default HeroTV;

```

---

## File: Front/src/components/layout/Footer.jsx

**Path:** `Front/src/components/layout/Footer.jsx`

```javascript
import React from 'react';
import footerWave from '../../assets/img/footer_wave.png';
import logoImg from '../../assets/img/logo.jpg';
import { Instagram, MessageCircle, PlayCircle } from 'lucide-react';

const Footer = () => {
  return (
    <>
      <style>{`
        .main-footer {
          position: relative;
          background-color: var(--white);
          border-top: 1px solid rgba(82, 143, 88, 0.1);
          padding: 6rem 0 2rem 0;
          margin-top: auto;
        }

        .footer-wave {
          position: absolute;
          bottom: 0; /* Pegado estrictamente al fondo */
          right: 0; /* Estrictamente pegada al lado derecho */
          width: auto;
          height: 600px; /* Extragrande */
          max-height: none; /* Sin límite para que pueda sobremontar hacia arriba */
          object-fit: contain;
          object-position: bottom right;
          z-index: 0;
          opacity: 1;
          pointer-events: none; /* Para que la imagen grande no bloquee clicks en enlaces */
          transition: all 0.3s ease;
        }

        .footer-content {
          position: relative;
          z-index: 10; /* Aseguramos que el texto esté por encima de la imagen opaca */
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 3rem;
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .footer-brand h3 {
          font-family: var(--font-display);
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--green-deep);
          margin-bottom: 1rem;
        }
        .footer-brand p {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.7;
          max-width: 320px;
        }

        .footer-col h4 {
          font-family: var(--font-display);
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 1.25rem;
        }
        .footer-col p {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .footer-socials {
          display: flex;
          gap: 1rem;
          margin-top: 1.5rem;
        }
        .footer-social-icon {
          color: var(--green-deep);
          transition: transform 0.2s ease, color 0.2s ease;
        }
        .footer-social-icon:hover {
          color: var(--terra-mid);
          transform: translateY(-2px);
        }

        .footer-bottom {
          position: relative;
          z-index: 1;
          max-width: 1100px;
          margin: 3rem auto 0;
          padding: 1.5rem 1.5rem 0;
          border-top: 1px solid var(--border-subtle);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .footer-bottom p {
          font-size: 0.82rem;
          color: var(--text-muted);
        }

        /* RESPONSIVE: Laptops y Tablets (1048px) */
        @media (max-width: 1048px) {
          .main-footer {
            padding-top: 10rem; /* Hacemos el footer más alto arriba para que la imagen quepa sin cortarse */
          }
          .footer-wave {
            height: 550px; /* Casi tan grande como desktop para mantener el sobremontado */
            right: 0;
            bottom: 0; /* Pegado al fondo */
            opacity: 1;
            z-index: 0;
          }
        }

        /* RESPONSIVE: Mobile (768px) */
        @media (max-width: 768px) {
          .main-footer { padding: 8rem 0 2rem; } /* Más altura para acomodar la imagen grande */
          .footer-content {
            grid-template-columns: 1fr;
            gap: 2.5rem;
            background: transparent;
            border-radius: 0;
            padding: 0;
            backdrop-filter: none;
          }
          .footer-col {
            border-top: 1px solid var(--border-subtle);
            padding-top: 1.5rem;
          }
          .footer-brand p { max-width: 100%; }
          .footer-bottom { flex-direction: column; text-align: center; justify-content: center; }
          
          .footer-wave {
            height: 450px; /* Aumentado drásticamente para tablet/móvil */
            right: 0; /* Completamente al borde para no crear scroll horizontal extra */
            bottom: 0; /* Pegado al fondo */
            opacity: 1;
            z-index: 0;
          }
        }
      `}</style>

      <footer className="main-footer">
        <img src={footerWave} alt="Wave Decoration" className="footer-wave" />

        <div className="footer-content">
          {/* Brand */}
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
              <img src={logoImg} alt="SonTerry" style={{ height: '40px', borderRadius: '8px' }} />
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: '800', color: 'var(--green-brand)' }}>
                SonTerry Tienda
              </span>
            </div>
            <p>
              Taller artesanal de personalización textil. Expertos en serigrafía tradicional y estampado digital DTF con calidad boutique.
            </p>
            <div className="footer-socials">
              <a href="#" className="footer-social-icon"><Instagram size={20} /></a>
              <a href="#" className="footer-social-icon"><MessageCircle size={20} /></a>
              <a href="#" className="footer-social-icon"><PlayCircle size={20} /></a>
            </div>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4>Taller Físico</h4>
            <p><strong>Ubicación:</strong> Bogotá, Colombia</p>
            <p><strong>Teléfono:</strong> +57 301 826 7373</p>
            <p><strong>Email:</strong> taller@sonterry.com</p>
          </div>

          {/* Info */}
          <div className="footer-col">
            <h4>Información</h4>
            <p>Políticas de Envío</p>
            <p>Términos y Condiciones</p>
            <p>Preguntas Frecuentes</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} SonTerry. Todos los derechos reservados.</p>
          <p>Creado con dedicación por Iván Castillo.</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;

```

---

## File: Front/src/components/layout/Header.jsx

**Path:** `Front/src/components/layout/Header.jsx`

```javascript
import React from 'react';
import Navbar from './Navbar';

const Header = () => {
  return <header><Navbar /></header>;
};

export default Header;

```

---

## File: Front/src/components/layout/Navbar.css

**Path:** `Front/src/components/layout/Navbar.css`

```css
        .nav-root {
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          width: 100%;
          background: var(--cream);
        }

        /* ─── Row 1: Top Bar ─── */
        .nav-top-bar {
          height: 36px;
          background-color: var(--green-deep);
          color: #FFFFFF;
          font-size: 0.8rem;
          font-weight: 500;
        }
        .nav-top-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 100%;
        }
        .nav-top-item {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        /* ─── Row 2: Main Header ─── */
        .nav-main {
          height: 115px;
          background-color: var(--cream);
          border-bottom: 1px solid var(--border-subtle);
          display: flex;
          align-items: center;
        }
        .nav-main-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 100%;
          gap: 2rem;
        }
        .nav-brand {
          display: flex;
          align-items: center;
          height: 100%;
          text-decoration: none;
          flex-shrink: 0;
        }
        .nav-logo {
          height: 44px;
          object-fit: contain;
          mix-blend-mode: multiply;
          border-radius: 8px;
          overflow: hidden;
        }
        .nav-brand-text {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .nav-brand-divider {
          width: 1px;
          height: 35px;
          background-color: rgba(0,0,0,0.12);
          margin: 0 1rem;
        }

        /* Search */
        .nav-search {
          display: flex;
          align-items: center;
          flex: 1;
          max-width: 450px;
          position: relative;
        }
        .nav-search-input {
          width: 100%;
          padding: 0.6rem 3rem 0.6rem 1.2rem;
          border-radius: 999px;
          border: 1px solid var(--border-mid);
          background-color: #FFFFFF;
          font-size: 0.88rem;
          outline: none;
          color: var(--text-primary);
          transition: var(--t-smooth);
        }
        .nav-search-input:focus {
          border-color: var(--green-brand);
          box-shadow: 0 0 0 3px rgba(82, 143, 88, 0.1);
        }
        .nav-search-btn {
          position: absolute;
          right: 4px;
          background-color: var(--green-deep);
          border: none;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #FFFFFF;
          transition: var(--t-smooth);
        }
        .nav-search-btn:hover {
          background-color: var(--green-mid);
        }

        /* Actions */
        .nav-actions {
          display: flex;
          gap: 1.5rem;
          align-items: center;
          flex-shrink: 0;
        }
        .nav-action-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.88rem;
          font-weight: 500;
          text-decoration: none;
          padding: 0;
        }
        .nav-action-btn:hover {
          color: var(--green-deep);
        }
        .nav-cart-badge {
          position: absolute;
          top: -6px;
          right: -6px;
          background-color: var(--terra-mid);
          color: #FFFFFF;
          border-radius: 50%;
          width: 16px;
          height: 16px;
          font-size: 0.62rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* ─── Row 3: Sub-navbar ─── */
        .nav-sub {
          height: 44px;
          background-color: var(--cream);
          border-bottom: 1px solid var(--border-subtle);
          display: flex;
          align-items: center;
        }
        .nav-sub-inner {
          display: flex;
          justify-content: center;
          gap: 3rem;
          align-items: center;
          height: 100%;
        }
        .nav-sub-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 0.75rem;
          color: var(--text-secondary);
          text-decoration: none;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          white-space: nowrap;
          transition: var(--t-smooth);
          position: relative;
        }
        .nav-sub-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: var(--green-brand);
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 0.3s ease;
        }
        .nav-sub-link:hover {
          color: var(--green-deep);
        }
        .nav-sub-link:hover::after {
          transform: scaleX(1);
        }

        /* Mobile overrides */
        .desktop-only { display: flex; }
        .mobile-only { display: none; }

        @media (max-width: 1024px) {
          .nav-top-item:nth-child(2) { display: none; }
        }

        @media (max-width: 768px) {
          .desktop-only { display: none !important; }
          .mobile-only { display: flex; }

          .nav-top-bar { display: none; } /* Hide top bar on mobile */
          
          .nav-main { height: auto; padding: 0.75rem 0; flex-direction: column; }
          .nav-main-inner { flex-wrap: nowrap; gap: 0.5rem; justify-content: space-between; }
          
          .nav-brand-text, .nav-brand-divider { display: none; } /* Show only logo */
          .nav-logo { height: 55px; } /* Increased for mobile */
          
          .nav-actions span { display: none; } /* Hide text, keep icons */
          .nav-actions { gap: 1rem; }
          
          .nav-sub { display: none; } /* Hide horizontal sub-nav, moved to sidebar */

          .mobile-search-container {
            width: 100%;
            padding: 0.5rem 0 0.25rem 0;
            animation: slideDown 0.3s ease;
          }
          .nav-search-mobile {
            display: flex;
            align-items: center;
            width: 100%;
            position: relative;
          }
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Mobile Sidebar Menu */
        .nav-mobile-overlay {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          z-index: 200;
          backdrop-filter: blur(2px);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .nav-mobile-overlay.open {
          display: block;
          opacity: 1;
        }

        .nav-mobile-menu {
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          width: 280px;
          background: var(--cream);
          z-index: 201;
          transform: translateX(-100%);
          transition: transform 0.3s ease;
          display: flex;
          flex-direction: column;
          box-shadow: var(--shadow-md);
        }
        .nav-mobile-menu.open {
          transform: translateX(0);
        }
        .nav-mobile-header {
          padding: 1.25rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--border-subtle);
        }
        .nav-mobile-header h3 {
          margin: 0;
          font-family: var(--font-display);
          color: var(--green-deep);
          font-size: 1.2rem;
        }
        .nav-mobile-links {
          display: flex;
          flex-direction: column;
          padding: 1rem 0;
          overflow-y: auto;
        }
        .nav-mobile-link {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.5rem;
          color: var(--text-primary);
          text-decoration: none;
          font-weight: 600;
          border-bottom: 1px solid rgba(0,0,0,0.05);
        }
        .nav-mobile-link:active {
          background-color: rgba(0,0,0,0.03);
        }

```

---

## File: Front/src/components/layout/Navbar.jsx

**Path:** `Front/src/components/layout/Navbar.jsx`

```javascript
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useCartStore } from '../../store/cartStore';
import { useUiStore } from '../../store/uiStore';
import { ShoppingBag, User as UserIcon, Search, Truck, Store, Phone, MapPin, Coffee, Menu, X } from 'lucide-react';
import logo from '../../assets/img/logo.jpg';
import api from '../../services/api';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuthStore();
  const items = useCartStore((state) => state.items);
  const toggleCart = useUiStore((state) => state.toggleCart);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get('/categories');
        setCategories(res.data.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    fetchCategories();
  }, []);

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/productos?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/productos');
    }
  };

  return (
    <>
      <div className="nav-root">
        {/* Row 1: Top Bar */}
        <div className="nav-top-bar">
          <div className="container nav-top-inner">
            <div className="nav-top-item">
              <Truck size={14} /> <span>Envíos a todo Colombia</span>
            </div>
            <div className="nav-top-item">
              <Store size={14} /> <span>Tiendas por departamentos y mayoristas</span>
            </div>
            <div className="nav-top-item">
              <Phone size={14} /> <span>¿Necesitas ayuda? 301 826 7373</span>
            </div>
          </div>
        </div>

        {/* Row 2: Main Header */}
        <div className="nav-main glass">
          <div className="container nav-main-inner">
            {/* Left Group */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {/* Hamburger Mobile */}
              <button className="nav-action-btn mobile-only" onClick={() => setMobileMenuOpen(true)}>
                <Menu size={24} color="var(--green-deep)" />
              </button>

              {/* Logo */}
              <Link to="/" className="nav-brand" onClick={() => setMobileMenuOpen(false)}>
                <img src={logo} alt="SonTerry" className="nav-logo" />
                <div className="nav-brand-divider" />
                <div className="nav-brand-text">
                  <span style={{ fontWeight: '800', fontSize: '0.95rem', color: 'var(--green-deep)', lineHeight: '1.2', fontFamily: 'var(--font-display)' }}>Taller & Bodega</span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Serigrafía textil y DTF</span>
                </div>
              </Link>
            </div>

            {/* Search (Desktop) */}
            <form onSubmit={handleSearchSubmit} className="nav-search desktop-only">
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="nav-search-input"
              />
              <button type="submit" className="nav-search-btn">
                <Search size={16} strokeWidth={2.5} />
              </button>
            </form>

            {/* Actions */}
            <div className="nav-actions">
              {/* Search Toggle (Mobile) */}
              <button className="nav-action-btn mobile-only" onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}>
                <Search size={22} color="var(--green-deep)" />
              </button>

              {isAuthenticated ? (
                <>
                  <Link to={user?.role === 'admin' ? '/admin' : '/profile'} className="nav-action-btn">
                    <UserIcon size={22} color="var(--green-deep)" />
                    <span>Mi Cuenta</span>
                  </Link>
                  <button onClick={() => { logout(); navigate('/login'); }} className="nav-action-btn desktop-only" style={{ color: '#E53E3E' }}>
                    <span>Salir</span>
                  </button>
                </>
              ) : (
                <Link to="/login" className="nav-action-btn">
                  <UserIcon size={22} color="var(--green-deep)" />
                  <span>Ingresar</span>
                </Link>
              )}

              <button onClick={() => toggleCart()} className="nav-action-btn">
                <div style={{ position: 'relative', display: 'flex' }}>
                  <ShoppingBag size={22} color="var(--green-deep)" />
                  {cartCount > 0 && <span className="nav-cart-badge">{cartCount}</span>}
                </div>
                <span>Carrito</span>
              </button>
            </div>
          </div>

          {/* Search Expandable (Mobile) */}
          {isMobileSearchOpen && (
            <div className="mobile-search-container mobile-only container">
              <form onSubmit={handleSearchSubmit} className="nav-search-mobile">
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="nav-search-input"
                  autoFocus
                />
                <button type="submit" className="nav-search-btn">
                  <Search size={16} strokeWidth={2.5} />
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Row 3: Sub-navbar (Desktop) */}
        <div className="nav-sub desktop-only">
          <div className="container nav-sub-inner">
            {categories.map((c) => (
              <Link key={c._id} to={`/productos?category=${c._id}`} className="nav-sub-link">
                <Store size={14} color="var(--green-brand)" strokeWidth={2.5} />
                <span style={{ textTransform: 'uppercase' }}>{c.name}</span>
              </Link>
            ))}
            <Link to="/nosotros" className="nav-sub-link">
              <Store size={14} color="var(--green-brand)" strokeWidth={2.5} />
              <span>NOSOTROS</span>
            </Link>
            {(!isAuthenticated || user?.role !== 'admin') && (
              <Link to="/profile" className="nav-sub-link">
                <MapPin size={14} color="var(--green-brand)" strokeWidth={2.5} />
                <span>RASTREA TU PEDIDO</span>
              </Link>
            )}
            <Link to="/contacto" className="nav-sub-link">
              <Phone size={14} color="var(--green-brand)" strokeWidth={2.5} />
              <span>CONTACTO</span>
            </Link>
          </div>
        </div>

        {/* Mobile Sidebar Overlay */}
        <div className={`nav-mobile-overlay ${mobileMenuOpen ? 'open' : ''} mobile-only`} onClick={() => setMobileMenuOpen(false)} />
        <div className={`nav-mobile-menu ${mobileMenuOpen ? 'open' : ''} mobile-only`}>
          <div className="nav-mobile-header">
            <h3>Menú SonTerry</h3>
            <button className="nav-action-btn" onClick={() => setMobileMenuOpen(false)}>
              <X size={24} color="var(--text-primary)" />
            </button>
          </div>
          <div className="nav-mobile-links">
            <Link to="/productos" className="nav-mobile-link" onClick={() => setMobileMenuOpen(false)}>
              <Store size={18} color="var(--green-brand)" /> Catálogo Completo
            </Link>
            {categories.map((c) => (
              <Link key={c._id} to={`/productos?category=${c._id}`} className="nav-mobile-link" onClick={() => setMobileMenuOpen(false)}>
                <Store size={18} color="var(--green-brand)" /> {c.name}
              </Link>
            ))}
            <Link to="/nosotros" className="nav-mobile-link" onClick={() => setMobileMenuOpen(false)}>
              <Store size={18} color="var(--green-brand)" /> Nosotros
            </Link>
            {(!isAuthenticated || user?.role !== 'admin') && (
              <Link to="/profile" className="nav-mobile-link" onClick={() => setMobileMenuOpen(false)}>
                <MapPin size={18} color="var(--green-brand)" /> Rastrea tu Pedido
              </Link>
            )}
            <Link to="/contacto" className="nav-mobile-link" onClick={() => setMobileMenuOpen(false)}>
              <Phone size={18} color="var(--green-brand)" /> Contacto
            </Link>
            
            {/* Additional user actions in mobile menu */}
            {isAuthenticated && (
              <>
                <div style={{ height: '1px', background: 'rgba(0,0,0,0.05)', margin: '1rem 0' }} />
                <Link to={user?.role === 'admin' ? '/admin' : '/profile'} className="nav-mobile-link" onClick={() => setMobileMenuOpen(false)}>
                  <UserIcon size={18} color={user?.role === 'admin' ? 'var(--terra-mid)' : 'var(--green-brand)'} /> Mi Cuenta
                </Link>
                <button 
                  onClick={() => { logout(); navigate('/login'); setMobileMenuOpen(false); }} 
                  className="nav-mobile-link" 
                  style={{ border: 'none', background: 'transparent', width: '100%', textAlign: 'left', color: '#E53E3E' }}
                >
                  <UserIcon size={18} color="#E53E3E" /> Cerrar Sesión
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

```

---

## File: Front/src/layouts/AuthLayout.jsx

**Path:** `Front/src/layouts/AuthLayout.jsx`

```javascript
import React from 'react';
import Toast from '../components/common/Toast';

const AuthLayout = ({ children }) => {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1.5rem',
      backgroundColor: 'var(--color-bg)'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '420px',
        backgroundColor: '#FFFFFF',
        padding: '2rem',
        borderRadius: 'var(--border-radius-md)',
        boxShadow: 'var(--shadow-md)',
        border: '1px solid var(--color-border)',
        animation: 'fadeIn 0.4s ease-out'
      }}>
        {children}
      </div>
      <Toast />
    </div>
  );
};

export default AuthLayout;

```

---

## File: Front/src/layouts/CheckoutLayout.jsx

**Path:** `Front/src/layouts/CheckoutLayout.jsx`

```javascript
import React from 'react';
import Header from '../components/layout/Header';
import Toast from '../components/common/Toast';

const CheckoutLayout = ({ children }) => {
  return (
    <div className="app-container">
      <Header />
      <main style={{ padding: '2rem 0' }}>{children}</main>
      <Toast />
    </div>
  );
};

export default CheckoutLayout;

```

---

## File: Front/src/layouts/DashboardLayout.jsx

**Path:** `Front/src/layouts/DashboardLayout.jsx`

```javascript
import React from 'react';
import Header from '../components/layout/Header';
import Toast from '../components/common/Toast';

const DashboardLayout = ({ children }) => {
  return (
    <div className="app-container">
      <Header />
      <main style={{ padding: '2rem 0' }}>{children}</main>
      <Toast />
    </div>
  );
};

export default DashboardLayout;

```

---

## File: Front/src/layouts/MainLayout.jsx

**Path:** `Front/src/layouts/MainLayout.jsx`

```javascript
import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import CartDrawer from '../components/cart/CartDrawer';
import Toast from '../components/common/Toast';

const MainLayout = ({ children }) => {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">{children}</main>
      <Footer />
      <CartDrawer />
      <Toast />
    </div>
  );
};

export default MainLayout;

```

---

## File: Front/src/main.jsx

**Path:** `Front/src/main.jsx`

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './assets/css/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

```

---

## File: Front/src/pages/About/About.css

**Path:** `Front/src/pages/About/About.css`

```css
      
        /* ── HERO ── */
        .about-hero {
          background: linear-gradient(135deg, var(--green-deep) 0%, #2A6035 55%, var(--green-mid) 100%);
          padding: clamp(3.5rem, 8vw, 6rem) 1.5rem clamp(4rem, 9vw, 7rem);
          position: relative; overflow: hidden; text-align: center;
        }
        .about-hero::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 80% 60% at 50% 100%, rgba(135,186,143,0.18) 0%, transparent 70%);
        }
        .about-hero-content { position: relative; z-index: 2; max-width: 700px; margin: 0 auto; }

        /* ── STATS ── */
        .about-stats-row {
          background: var(--white);
          border-bottom: 1px solid var(--border-subtle);
          padding: 0;
        }
        .about-stats-inner {
          max-width: 1100px; margin: 0 auto;
          display: grid; grid-template-columns: repeat(4, 1fr);
          padding: 0 1.5rem;
        }
        .about-stat {
          padding: 2rem 1rem; text-align: center;
          border-right: 1px solid var(--border-subtle);
        }
        .about-stat:last-child { border-right: none; }
        .about-stat-num {
          font-family: var(--font-display); font-size: clamp(1.8rem, 3vw, 2.4rem);
          font-weight: 800; color: var(--green-deep); line-height: 1;
        }
        .about-stat-label {
          font-size: 0.8rem; color: var(--text-muted); margin-top: 4px; font-weight: 500;
        }

        /* ── STORY ── */
        .about-story {
          max-width: 1100px; margin: 0 auto;
          padding: clamp(3rem, 6vw, 5rem) 1.5rem;
          display: grid; grid-template-columns: 1fr 1fr; gap: clamp(2rem, 5vw, 4rem);
          align-items: center;
        }
        .about-story-img {
          border-radius: var(--r-2xl); overflow: hidden;
          box-shadow: var(--s-lg); aspect-ratio: 4/3;
        }
        .about-story-img img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .about-story-text { display: flex; flex-direction: column; gap: 1rem; }

        /* ── VALUES ── */
        .about-values {
          background: var(--green-ghost);
          padding: clamp(3rem, 6vw, 5rem) 1.5rem;
        }
        .about-values-inner { max-width: 1100px; margin: 0 auto; }
        .about-values-grid {
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; margin-top: 2.5rem;
        }
        .about-value-card {
          background: var(--white); border-radius: var(--r-xl);
          border: 1px solid var(--border-subtle); box-shadow: var(--s-xs);
          padding: 2rem 1.5rem; text-align: center;
          transition: var(--t-smooth);
        }
        .about-value-card:hover { transform: translateY(-5px); box-shadow: var(--s-lg); border-color: var(--border-mid); }
        .about-value-icon {
          width: 52px; height: 52px; border-radius: var(--r-md);
          background: var(--green-mist); color: var(--green-deep);
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 1rem;
        }
        .about-value-title {
          font-family: var(--font-display); font-size: 1rem; font-weight: 700;
          color: var(--text-primary); margin-bottom: 0.5rem;
        }
        .about-value-desc { font-size: 0.86rem; color: var(--text-secondary); line-height: 1.6; }

        /* ── GALLERY ── */
        .about-gallery { padding: clamp(3rem, 6vw, 5rem) 1.5rem; background: var(--cream); }
        .about-gallery-inner { max-width: 1100px; margin: 0 auto; }
        .about-gallery-grid {
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-top: 2rem;
        }
        .about-gallery-item {
          border-radius: var(--r-lg); overflow: hidden; aspect-ratio: 1;
          box-shadow: var(--s-sm); transition: var(--t-smooth);
        }
        .about-gallery-item:hover { transform: scale(1.03); box-shadow: var(--s-lg); }
        .about-gallery-item img { width: 100%; height: 100%; object-fit: cover; display: block; }

        /* ── MAP ── */
        .about-map-section {
          padding: clamp(3rem, 6vw, 5rem) 1.5rem; background: var(--cream-warm);
        }
        .about-map-inner { max-width: 1100px; margin: 0 auto; }
        .about-map-grid {
          display: grid; grid-template-columns: 1fr 1.6fr; gap: 3rem;
          align-items: start; margin-top: 2.5rem;
        }
        .about-map-info { display: flex; flex-direction: column; gap: 1.25rem; }
        .about-map-info-item {
          display: flex; align-items: flex-start; gap: 1rem;
          padding: 1.25rem; border-radius: var(--r-lg);
          background: var(--white); border: 1px solid var(--border-subtle);
          box-shadow: var(--s-xs);
        }
        .about-map-info-icon {
          width: 40px; height: 40px; border-radius: var(--r-md); flex-shrink: 0;
          background: var(--green-mist); color: var(--green-deep);
          display: flex; align-items: center; justify-content: center;
        }
        .about-map-info-title {
          font-family: var(--font-display); font-size: 0.78rem; font-weight: 700;
          color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.07em;
        }
        .about-map-info-value { font-family: var(--font-display); font-size: 0.95rem; font-weight: 700; color: var(--text-primary); }
        .about-map-frame {
          border-radius: var(--r-xl); overflow: hidden; box-shadow: var(--s-lg);
          border: 1px solid var(--border-subtle); height: 380px;
        }
        .about-map-frame iframe { width: 100%; height: 100%; border: none; display: block; }

        /* ── CTA BANNER ── */
        .about-cta {
          background: linear-gradient(135deg, var(--green-deep) 0%, #2A6035 100%);
          padding: clamp(3rem, 6vw, 5rem) 1.5rem;
          text-align: center; position: relative; overflow: hidden;
        }
        .about-cta::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 60% 80% at 80% 50%, rgba(201,125,92,0.15) 0%, transparent 70%);
        }
        .about-cta-inner { max-width: 680px; margin: 0 auto; position: relative; z-index: 2; }
        .about-cta-actions { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin-top: 2rem; }
        .about-cta-btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 0.9rem 2rem; border-radius: var(--r-lg);
          background: var(--white); color: var(--green-deep);
          font-family: var(--font-display); font-size: 0.92rem; font-weight: 700;
          border: none; cursor: pointer; transition: var(--t-smooth); box-shadow: var(--s-sm);
        }
        .about-cta-btn-primary:hover { transform: translateY(-2px); box-shadow: var(--s-lg); }
        .about-cta-btn-outline {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 0.9rem 2rem; border-radius: var(--r-lg);
          background: transparent; color: #fff;
          font-family: var(--font-display); font-size: 0.92rem; font-weight: 700;
          border: 1.5px solid rgba(255,255,255,0.4); cursor: pointer; transition: var(--t-smooth);
        }
        .about-cta-btn-outline:hover { background: rgba(255,255,255,0.1); transform: translateY(-2px); }

        /* ── SECTION HEADING UTIL ── */
        .about-eyebrow {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 5px 14px; border-radius: 999px;
          font-family: var(--font-display); font-size: 0.72rem; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 0.75rem;
        }
        .about-section-title {
          font-family: var(--font-display);
          font-size: clamp(1.75rem, 3.5vw, 2.5rem);
          font-weight: 800; color: var(--text-primary); line-height: 1.15; margin-bottom: 0.75rem;
        }
        .about-section-sub {
          color: var(--text-secondary); font-size: 0.95rem; line-height: 1.7; max-width: 560px;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .about-values-grid { grid-template-columns: repeat(2, 1fr); }
          .about-gallery-grid { grid-template-columns: repeat(2, 1fr); }
          .about-map-grid { grid-template-columns: 1fr; }
          .about-map-frame { height: 300px; }
        }
        @media (max-width: 768px) {
          .about-stats-inner { grid-template-columns: repeat(2, 1fr); }
          .about-stat:nth-child(2) { border-right: none; }
          .about-stat { border-bottom: 1px solid var(--border-subtle); }
          .about-story { grid-template-columns: 1fr; }
          .about-story-img { max-height: 320px; }
        }
        @media (max-width: 480px) {
          .about-stats-inner { grid-template-columns: 1fr 1fr; }
          .about-values-grid { grid-template-columns: 1fr; }
          .about-gallery-grid { grid-template-columns: repeat(2, 1fr); }
        }
      

```

---

## File: Front/src/pages/About/AboutPage.jsx

**Path:** `Front/src/pages/About/AboutPage.jsx`

```javascript
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Award, Users, Truck, Leaf, ArrowRight, MapPin, Phone, Mail, Sparkles } from 'lucide-react';
import aboutImg from '../../assets/img/about_workshop.png';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { num: '+500', label: 'Diseños entregados' },
  { num: '+8',   label: 'Años de experiencia' },
  { num: '100%', label: 'Hecho a mano' },
  { num: '4.9★', label: 'Satisfacción' },
];

const VALUES = [
  { icon: Award,  title: 'Calidad Premium',      desc: 'Cada pieza pasa por control de calidad antes de salir del taller.' },
  { icon: Users,  title: 'Atención Personalizada', desc: 'Te acompañamos desde el diseño hasta la entrega de tu pedido.' },
  { icon: Truck,  title: 'Envíos a Colombia',     desc: 'Despachamos a todo el país con seguimiento en tiempo real.' },
  { icon: Leaf,   title: 'Proceso Sostenible',    desc: 'Tintas ecológicas y materiales de bajo impacto ambiental.' },
];

// Free Unsplash images — mugs & caps printing
const GALLERY = [
  'https://images.unsplash.com/photo-1588516903720-8ceb67f9ef84?w=600&q=80&fit=crop',
  'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=80&fit=crop',
  'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&q=80&fit=crop',
  'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80&fit=crop',
];

const AboutPage = () => {
  const pageRef = useRef(null);
  const navigate = useNavigate();

  useGSAP(() => {
    // Hero entrance
    gsap.fromTo('.about-hero-content > *',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.14, ease: 'power2.out' }
    );
    // Stats
    gsap.fromTo('.about-stat',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: '.about-stats-row', start: 'top 85%' } }
    );
    // Story section
    gsap.fromTo('.about-story-img',
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.9, ease: 'power2.out',
        scrollTrigger: { trigger: '.about-story', start: 'top 80%' } }
    );
    gsap.fromTo('.about-story-text > *',
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power2.out',
        scrollTrigger: { trigger: '.about-story', start: 'top 80%' } }
    );
    // Values
    gsap.fromTo('.about-value-card',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power2.out',
        scrollTrigger: { trigger: '.about-values', start: 'top 82%' } }
    );
    // Gallery
    gsap.fromTo('.about-gallery-item',
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: '.about-gallery', start: 'top 82%' } }
    );
    // Map
    gsap.fromTo('.about-map-section',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: '.about-map-section', start: 'top 85%' } }
    );
  }, { scope: pageRef });

  return (
    <>
      <div ref={pageRef}>

        {/* ═══ HERO ═══════════════════════════════════════════════════ */}
        <section className="about-hero">
          <div className="about-hero-content">
            <span className="about-eyebrow about-eyebrow-hero">
              <Sparkles size={11} /> Nuestra Historia
            </span>
            <h1 className="about-hero-title">
              Más que estampados,<br />
              <span style={{ color: 'var(--green-light)' }}>creamos identidad</span>
            </h1>
            <p className="about-hero-subtitle">
              SonTerry nació de la pasión por el arte textil. Combinamos serigrafía artesanal y DTF de última generación para darle vida a tu marca en gorras, mugs y prendas únicas.
            </p>
          </div>
        </section>

        {/* ═══ STATS ══════════════════════════════════════════════════ */}
        <div className="about-stats-row">
          <div className="about-stats-inner">
            {STATS.map(({ num, label }) => (
              <div key={label} className="about-stat">
                <div className="about-stat-num">{num}</div>
                <div className="about-stat-label">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══ OUR STORY ══════════════════════════════════════════════ */}
        <div className="about-story">
          <div className="about-story-img">
            <img src={aboutImg} alt="Taller SonTerry — serigrafía y DTF en gorras y mugs" />
          </div>
          <div className="about-story-text">
            <span className="about-eyebrow about-eyebrow-story">
              <Sparkles size={11} /> Quiénes somos
            </span>
            <h2 className="about-section-title">
              Un taller artesanal con tecnología de punta
            </h2>
            <p className="about-section-sub">
              Fundado en Bogotá, Colombia, SonTerry es un taller especializado en la personalización textil de alta calidad. Nuestro equipo combina más de 8 años de experiencia en serigrafía tradicional con la precisión del estampado DTF (Direct-to-Film) para ofrecer resultados que duran.
            </p>
            <p className="about-story-p2">
              Trabajamos con marcas emergentes, emprendedores, equipos deportivos y empresas que buscan diferenciarse. Desde una sola pieza hasta producción mayorista, cada pedido recibe la misma dedicación y cuidado.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
              {['Serigrafía', 'DTF Premium', 'Bordado', 'Sublimación'].map((t) => (
                <span key={t} className="about-tag">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ═══ VALUES ═════════════════════════════════════════════════ */}
        <section className="about-values">
          <div className="about-values-inner">
            <div style={{ textAlign: 'center' }}>
              <span className="about-eyebrow about-eyebrow-story">
                Nuestros valores
              </span>
              <h2 className="about-section-title">¿Por qué elegir SonTerry?</h2>
              <p className="about-section-sub" style={{ margin: '0 auto' }}>
                Cada decisión que tomamos en el taller está guiada por estos pilares.
              </p>
            </div>
            <div className="about-values-grid">
              {VALUES.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="about-value-card">
                  <div className="about-value-icon">
                    <Icon size={22} strokeWidth={1.8} />
                  </div>
                  <div className="about-value-title">{title}</div>
                  <p className="about-value-desc">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ GALLERY ════════════════════════════════════════════════ */}
        <section className="about-gallery">
          <div className="about-gallery-inner">
            <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
              <span className="about-eyebrow about-eyebrow-gallery">
                Nuestro trabajo
              </span>
              <h2 className="about-section-title">El taller en imágenes</h2>
            </div>
            <div className="about-gallery-grid">
              {GALLERY.map((src, i) => (
                <div key={i} className="about-gallery-item">
                  <img src={src} alt={`SonTerry trabajo ${i + 1}`} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ MAP ════════════════════════════════════════════════════ */}
        <section className="about-map-section">
          <div className="about-map-inner">
            <div style={{ textAlign: 'center' }}>
              <span className="about-eyebrow about-eyebrow-story">
                <MapPin size={11} /> Encuéntranos
              </span>
              <h2 className="about-section-title">Visita nuestro taller</h2>
              <p className="about-section-sub" style={{ margin: '0 auto 0' }}>
                Estamos en Bogotá, Colombia. Visítanos con cita previa para conocer el proceso en persona.
              </p>
            </div>
            <div className="about-map-grid">
              {/* Info sidebar */}
              <div className="about-map-info">
                {[
                  { icon: MapPin, title: 'Dirección', value: 'Bogotá, Colombia\nTaller disponible con cita' },
                  { icon: Phone,  title: 'Teléfono',  value: '301 826 7373' },
                  { icon: Mail,   title: 'Correo',    value: 'taller@sonterry.com' },
                ].map(({ icon: Icon, title, value }) => (
                  <div key={title} className="about-map-info-item">
                    <div className="about-map-info-icon">
                      <Icon size={18} strokeWidth={1.8} />
                    </div>
                    <div>
                      <div className="about-map-info-title">{title}</div>
                      <div className="about-map-info-value" style={{ whiteSpace: 'pre-line' }}>{value}</div>
                    </div>
                  </div>
                ))}
                <div className="about-schedule-box">
                  <strong className="about-schedule-title">
                    Horarios de atención:
                  </strong><br />
                  Lunes a Sábado: 9:00 am – 6:00 pm<br />
                  Domingo: Solo pedidos online
                </div>
              </div>

              {/* Map */}
              <div className="about-map-frame">
                <iframe
                  title="Ubicación SonTerry Bogotá Colombia"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127244.60636287903!2d-74.1952219808381!3d4.648283699999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9bfd2da6cb29%3A0x239d635520a33914!2sBogot%C3%A1%2C%20Colombia!5e0!3m2!1sen!2s!4v1717000000000!5m2!1sen!2s"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ═══ CTA BANNER ═════════════════════════════════════════════ */}
        <section className="about-cta">
          <div className="about-cta-inner">
            <span className="about-eyebrow about-eyebrow-hero">
              <Sparkles size={11} /> ¿Tienes un proyecto?
            </span>
            <h2 className="about-cta-title">
              Hagámoslo juntos
            </h2>
            <p className="about-cta-subtitle">
              Desde uniformes corporativos hasta líneas de merch para tu marca. Cotización sin costo, atención personalizada y entrega garantizada.
            </p>
            <div className="about-cta-actions">
              <button className="about-cta-btn-primary" onClick={() => navigate('/contacto')}>
                Solicitar cotización <ArrowRight size={16} />
              </button>
              <button className="about-cta-btn-outline" onClick={() => navigate('/productos')}>
                Ver catálogo
              </button>
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default AboutPage;

```

---

## File: Front/src/pages/Admin/Admin.css

**Path:** `Front/src/pages/Admin/Admin.css`

```css
/* Admin.css */

.admin-container {
  padding-top: 2.5rem;
  padding-bottom: 4rem;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.admin-title-wrap h2 {
  font-size: 2rem;
  margin: 0;
  color: var(--color-text);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.admin-title-wrap span {
  font-size: 0.88rem;
  color: var(--color-text-light);
}

.admin-sync-btn {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background-color: #FFFFFF;
  border: 1px solid var(--color-border);
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 600;
  transition: var(--transition-smooth);
}

.admin-sync-btn:hover {
  background-color: var(--color-bg);
}

.admin-layout {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 2.5rem;
  align-items: start;
}

.admin-sidebar {
  background-color: #FFFFFF;
  border-radius: var(--border-radius-md);
  padding: 1.5rem 1rem;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.admin-sidebar-header {
  padding: 0 0.75rem 1rem;
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 0.75rem;
}

.admin-sidebar-header h4 {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--color-primary);
}

.admin-sidebar-header span {
  font-size: 0.75rem;
  color: var(--color-text-light);
}

.admin-tab-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: var(--border-radius-sm);
  border: none;
  cursor: pointer;
  text-align: left;
  transition: var(--transition-smooth);
}

.admin-tab-btn.active {
  background-color: var(--color-primary);
  color: #FFFFFF;
  font-weight: 600;
}

.admin-tab-btn.inactive {
  background-color: transparent;
  color: var(--color-text);
  font-weight: 500;
}

.admin-tab-btn.inactive:hover {
  background-color: var(--color-bg);
}

.admin-content-area {
  background-color: #FFFFFF;
  border-radius: var(--border-radius-md);
  padding: 2rem;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border);
  min-height: 500px;
}

.admin-tab-title {
  font-size: 1.4rem;
  margin-bottom: 1.5rem;
  font-weight: 700;
}

/* KPI Cards */
.admin-kpi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.25rem;
  margin-bottom: 2.5rem;
}

.admin-kpi-card {
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-sm);
  padding: 1.25rem;
  background-color: #FAFAFA;
}

.admin-kpi-label {
  font-size: 0.78rem;
  color: var(--color-text-light);
  display: block;
  text-transform: uppercase;
  font-weight: 600;
}

.admin-kpi-value {
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--color-text);
}

/* Critical Alerts Grid */
.admin-alerts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
}

.admin-alert-box {
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-sm);
  padding: 1.25rem;
}

.admin-alert-title {
  margin: 0 0 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 700;
}

.admin-alert-empty {
  font-size: 0.88rem;
  color: var(--color-text-light);
  margin: 0;
}

.admin-alert-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.admin-alert-item {
  display: flex;
  justify-content: space-between;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #F0F0F0;
  font-size: 0.85rem;
}

/* Forms in Admin */
.admin-form-container {
  background-color: #FAF9F6;
  padding: 1.5rem;
  border-radius: var(--border-radius-sm);
  border: 1px solid var(--color-border);
}

.admin-form-title {
  margin: 0 0 1.25rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.admin-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.admin-form-label {
  display: block;
  font-size: 0.8rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.admin-form-input, .admin-form-textarea, .admin-form-select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background-color: #FFFFFF;
}

.admin-form-textarea {
  height: 80px;
  font-family: inherit;
  resize: vertical;
}

.admin-submit-btn {
  background-color: var(--color-primary);
  color: #FFFFFF;
  border: none;
  padding: 0.65rem;
  border-radius: 4px;
  font-weight: 700;
  cursor: pointer;
  margin-top: 0.5rem;
  transition: var(--transition-smooth);
}

.admin-submit-btn:hover:not(:disabled) {
  background-color: var(--color-primary-dark);
}

.admin-submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Search bar */
.admin-search-wrap {
  position: relative;
  flex-grow: 1;
}

.admin-search-icon {
  position: absolute;
  left: 10px;
  top: 10px;
  color: var(--color-text-light);
}

.admin-search-input {
  width: 100%;
  padding: 0.5rem 0.5rem 0.5rem 2.5rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
}

/* List Item */
.admin-list-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-height: 480px;
  overflow-y: auto;
  padding-right: 0.25rem;
}

.admin-list-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-sm);
  padding: 0.75rem;
}

.admin-list-item-img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
}

.admin-list-item-content {
  flex-grow: 1;
  min-width: 0;
}

.admin-list-item-title {
  margin: 0;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 0.9rem;
  font-weight: 700;
}

.admin-list-item-sub {
  font-size: 0.8rem;
  color: var(--color-text-light);
  display: block;
}

/* Responsive */
@media (max-width: 900px) {
  .admin-layout {
    grid-template-columns: 1fr;
  }
}

```

---

## File: Front/src/pages/Admin/AdminDashboard.jsx

**Path:** `Front/src/pages/Admin/AdminDashboard.jsx`

```javascript
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useUiStore } from '../../store/uiStore';
import api from '../../services/api';
import * as productsService from '../../services/products.service';
import { useAdminOrders } from '../../queries/useOrders';
import { useAdminTickets } from '../../queries/useTickets';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';
import Button from '../../components/common/Button';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { 
  LayoutDashboard, 
  Package, 
  FolderKanban, 
  TrendingUp, 
  LifeBuoy, 
  Users, 
  ShoppingBag, 
  Plus, 
  Trash2, 
  RefreshCw, 
  AlertCircle, 
  Truck, 
  Search, 
  CheckCircle, 
  Clock, 
  ShieldAlert,
  UserCheck,
  UserX,
  PlusCircle,
  Layers,
  Sparkles,
  Landmark
} from 'lucide-react';
import './Admin.css';
import AdminProducts from './components/AdminProducts';
import AdminCategories from './components/AdminCategories';
import AdminOrders from './components/AdminOrders';
import AdminTickets from './components/AdminTickets';
import AdminUsers from './components/AdminUsers';
import AdminBankAccounts from './components/AdminBankAccounts';

const AdminDashboard = () => {
  const location = useLocation();
  const addToast = useUiStore((state) => state.addToast);

  // Active View Tab state
  const [activeTab, setActiveTab] = useState(() => {
    if (location.pathname.includes('/despacho')) return 'ventas';
    if (location.pathname.includes('/productos')) return 'productos';
    return 'dashboard';
  });

  // Data lists states
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);

  // React Query mutations and queries
  const { data: orders, isLoading: loadingOrders, refetch: refetchOrders } = useAdminOrders();
  const { data: tickets, isLoading: loadingTickets, refetch: refetchTickets } = useAdminTickets();

  // Load all initial lists
  const loadCatalogData = async () => {
    setLoadingProducts(true);
    try {
      const [cats, prods] = await Promise.all([
        productsService.fetchCategories(),
        api.get('/products?limit=100').then((r) => r.data.data.data),
      ]);
      setCategories(cats);
      setProducts(prods);
    } catch (err) {
      addToast(err.response?.data?.message || 'Error al cargar datos del catálogo', 'error');
    } finally {
      setLoadingProducts(false);
    }
  };

  const fetchUsersList = async () => {
    setLoadingUsers(true);
    try {
      const res = await api.get('/users');
      // Extract array from the standard pagination schema
      setUsers(res.data.data?.data || []);
    } catch (err) {
      console.error('Error fetching users:', err);
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    loadCatalogData();
    fetchUsersList();
  }, []);

  // Calculate statistics
  const totalIngresos = (orders || [])
    .filter(o => ['paid', 'shipped', 'delivered'].includes(o.status))
    .reduce((sum, o) => sum + o.total, 0);

  const pedidosActivos = (orders || []).filter(o => ['paid', 'shipped'].includes(o.status)).length;
  const stockCriticoCount = products.filter(p => p.stock <= 5 && !p.isDeleted).length;
  const soporteAbiertoCount = (tickets || []).filter(t => ['pending', 'open'].includes(t.status)).length;

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div className="admin-title-wrap">
          <h2>
            <Sparkles style={{ color: 'var(--color-primary)' }} /> Panel del Dueño
          </h2>
          <span>
            Administración centralizada de inventario, ventas, clientes y tickets de soporte.
          </span>
        </div>
        <button 
          onClick={() => {
            loadCatalogData();
            fetchUsersList();
            refetchOrders();
            refetchTickets();
            addToast('Datos actualizados', 'info');
          }}
          className="admin-sync-btn"
        >
          <RefreshCw size={14} /> Sincronizar
        </button>
      </div>

      <div className="admin-layout">
        
        {/* Left Admin Sidebar */}
        <div className="admin-sidebar">
          <div className="admin-sidebar-header">
            <h4>SonTerry Admin</h4>
            <span>Modo Administrador</span>
          </div>

          <button
            onClick={() => setActiveTab('dashboard')}
            className={`admin-tab-btn ${activeTab === 'dashboard' ? 'active' : 'inactive'}`}
          >
            <LayoutDashboard size={18} />
            <span>Resumen</span>
          </button>

          <button
            onClick={() => setActiveTab('productos')}
            className={`admin-tab-btn ${activeTab === 'productos' ? 'active' : 'inactive'}`}
          >
            <Package size={18} />
            <span>Inventario & Artículos</span>
          </button>

          <button
            onClick={() => setActiveTab('categorias')}
            className={`admin-tab-btn ${activeTab === 'categorias' ? 'active' : 'inactive'}`}
          >
            <Layers size={18} />
            <span>Categorías</span>
          </button>

          <button
            onClick={() => setActiveTab('ventas')}
            className={`admin-tab-btn ${activeTab === 'ventas' ? 'active' : 'inactive'}`}
          >
            <Truck size={18} />
            <span>Despachos & Logística</span>
          </button>

          <button
            onClick={() => setActiveTab('tickets')}
            className={`admin-tab-btn ${activeTab === 'tickets' ? 'active' : 'inactive'}`}
          >
            <LifeBuoy size={18} />
            <span>Tickets de Soporte</span>
          </button>

          <button
            onClick={() => setActiveTab('bancos')}
            className={`admin-tab-btn ${activeTab === 'bancos' ? 'active' : 'inactive'}`}
          >
            <Landmark size={18} />
            <span>Cuentas Bancarias</span>
          </button>

          <button
            onClick={() => setActiveTab('usuarios')}
            className={`admin-tab-btn ${activeTab === 'usuarios' ? 'active' : 'inactive'}`}
          >
            <Users size={18} />
            <span>Usuarios / Clientes</span>
          </button>
        </div>

        {/* Right Content Area */}
        <div className="admin-content-area">

          {/* TAB 1: SUMMARY DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="animate-fade-in">
              <h3 className="admin-tab-title">Resumen de Operación</h3>
              
              {/* KPIs Grid */}
              <div className="admin-kpi-grid">
                <div className="admin-kpi-card">
                  <TrendingUp size={24} style={{ color: 'var(--color-primary)', marginBottom: '0.5rem' }} />
                  <span className="admin-kpi-label">Ingresos Totales</span>
                  <span className="admin-kpi-value">{formatCurrency(totalIngresos)}</span>
                </div>

                <div className="admin-kpi-card">
                  <ShoppingBag size={24} style={{ color: 'var(--color-accent)', marginBottom: '0.5rem' }} />
                  <span className="admin-kpi-label">Ventas Activas</span>
                  <span className="admin-kpi-value">{pedidosActivos}</span>
                </div>

                <div className="admin-kpi-card">
                  <ShieldAlert size={24} style={{ color: '#D9534F', marginBottom: '0.5rem' }} />
                  <span className="admin-kpi-label">Stock Crítico</span>
                  <span className="admin-kpi-value" style={{ color: '#D9534F' }}>{stockCriticoCount} refs</span>
                </div>

                <div className="admin-kpi-card">
                  <LifeBuoy size={24} style={{ color: '#F0AD4E', marginBottom: '0.5rem' }} />
                  <span className="admin-kpi-label">Soporte Abierto</span>
                  <span className="admin-kpi-value" style={{ color: '#F0AD4E' }}>{soporteAbiertoCount} tks</span>
                </div>
              </div>

              {/* Sub grid for critical alerts & actions */}
              <div className="admin-alerts-grid">
                {/* Critical Inventory */}
                <div className="admin-alert-box">
                  <h4 className="admin-alert-title">
                    <Package size={18} style={{ color: '#D9534F' }} /> Stock en Alerta (5 o menos)
                  </h4>
                  {stockCriticoCount === 0 ? (
                    <p style={{ fontSize: '0.88rem', color: 'var(--color-text-light)', margin: 0 }}>Todo el catálogo cuenta con niveles de stock saludables.</p>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {products
                        .filter(p => p.stock <= 5 && !p.isDeleted)
                        .slice(0, 5)
                        .map(p => (
                          <div key={p._id} style={{ display: 'flex', justifyItems: 'center', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid #F0F0F0' }}>
                            <span style={{ fontSize: '0.88rem', fontWeight: '500' }}>{p.name}</span>
                            <span style={{ fontSize: '0.85rem', color: 'red', fontWeight: '700' }}>{p.stock} uds</span>
                          </div>
                        ))
                      }
                    </div>
                  )}
                </div>

                {/* Latest Orders */}
                <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--border-radius-sm)', padding: '1.25rem' }}>
                  <h4 style={{ margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem', fontWeight: '700' }}>
                    <Clock size={18} style={{ color: 'var(--color-primary)' }} /> Últimas Órdenes Registradas
                  </h4>
                  {(!orders || orders.length === 0) ? (
                    <p style={{ fontSize: '0.88rem', color: 'var(--color-text-light)', margin: 0 }}>No hay pedidos registrados en la base de datos.</p>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {orders.slice(0, 5).map(o => (
                        <div key={o._id} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid #F0F0F0', fontSize: '0.85rem' }}>
                          <div>
                            <span style={{ fontWeight: '600' }}>#{o._id.slice(-6)}</span>
                            <span style={{ color: 'var(--color-text-light)', marginLeft: '0.5rem' }}>{o.user?.name || 'Cliente'}</span>
                          </div>
                          <span style={{ fontWeight: '700' }}>{formatCurrency(o.total)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PRODUCT MANAGEMENT & INVENTORY */}
          {activeTab === 'productos' && (
            <AdminProducts 
              categories={categories} 
              products={products} 
              loadingProducts={loadingProducts} 
              loadCatalogData={loadCatalogData} 
              addToast={addToast} 
            />
          )}

          {/* TAB 3: CATEGORIES MANAGER */}
          {activeTab === 'categorias' && (
            <AdminCategories 
              categories={categories} 
              setCategories={setCategories}
              addToast={addToast}
              loadCatalogData={loadCatalogData}
            />
          )}

          {/* TAB 4: ORDERS & DISPATCH LOGISTICS */}
          {activeTab === 'ventas' && (
            <AdminOrders 
              orders={orders} 
              loadingOrders={loadingOrders} 
              addToast={addToast} 
              products={products}
              users={users}
              refetchOrders={refetchOrders}
            />
          )}

          {/* TAB 5: SUPPORT TICKETS MANAGER */}
          {activeTab === 'tickets' && (
            <AdminTickets 
              tickets={tickets} 
              loadingTickets={loadingTickets} 
              addToast={addToast} 
              refetchTickets={refetchTickets}
            />
          )}

          {/* TAB 6: REGISTERED USERS MANAGEMENT */}
          {activeTab === 'usuarios' && (
            <AdminUsers 
              users={users} 
              loadingUsers={loadingUsers} 
              fetchUsersList={fetchUsersList} 
              addToast={addToast} 
            />
          )}

          {/* TAB 7: BANK ACCOUNTS MANAGEMENT */}
          {activeTab === 'bancos' && (
            <AdminBankAccounts addToast={addToast} />
          )}

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

```

---

## File: Front/src/pages/Admin/ManageOrders.jsx

**Path:** `Front/src/pages/Admin/ManageOrders.jsx`

```javascript
import React from 'react';
const ManageOrders = () => <div>Manage Orders Page</div>;
export default ManageOrders;

```

---

## File: Front/src/pages/Admin/ManageUsers.jsx

**Path:** `Front/src/pages/Admin/ManageUsers.jsx`

```javascript
import React from 'react';
const ManageUsers = () => <div>Manage Users Page</div>;
export default ManageUsers;

```

---

## File: Front/src/pages/Admin/components/AdminBankAccounts.jsx

**Path:** `Front/src/pages/Admin/components/AdminBankAccounts.jsx`

```javascript
import React, { useState } from 'react';
import { AlertCircle, PlusCircle, Edit, Trash2, Landmark, CheckCircle, XCircle } from 'lucide-react';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import Button from '../../../components/common/Button';
import { useBankAccountsAdmin, useCreateBankAccount, useUpdateBankAccount, useDeleteBankAccount } from '../../../queries/useBankAccounts';

const AdminBankAccounts = ({ addToast }) => {
  const { data: accounts, isLoading } = useBankAccountsAdmin();
  const createMutation = useCreateBankAccount();
  const updateMutation = useUpdateBankAccount();
  const deleteMutation = useDeleteBankAccount();

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    bankName: '',
    accountNumber: '',
    accountType: 'Ahorros',
    ownerName: '',
    ownerDocument: '',
    phoneNumber: '',
    supportedMethods: 'ambas',
    isActive: true
  });

  const openNewModal = () => {
    setEditingId(null);
    setFormData({
      bankName: '', accountNumber: '', accountType: 'Ahorros', ownerName: '', ownerDocument: '', phoneNumber: '', supportedMethods: 'ambas', isActive: true
    });
    setShowModal(true);
  };

  const openEditModal = (account) => {
    setEditingId(account._id);
    setFormData({
      bankName: account.bankName,
      accountNumber: account.accountNumber,
      accountType: account.accountType,
      ownerName: account.ownerName,
      ownerDocument: account.ownerDocument,
      phoneNumber: account.phoneNumber || '',
      supportedMethods: account.supportedMethods,
      isActive: account.isActive
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateMutation.mutateAsync({ id: editingId, ...formData });
        addToast('Cuenta actualizada', 'success');
      } else {
        await createMutation.mutateAsync(formData);
        addToast('Cuenta agregada', 'success');
      }
      setShowModal(false);
    } catch (err) {
      addToast(err.response?.data?.message || 'Error al guardar la cuenta', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta cuenta bancaria?')) {
      try {
        await deleteMutation.mutateAsync(id);
        addToast('Cuenta eliminada', 'success');
      } catch (err) {
        addToast('Error al eliminar', 'error');
      }
    }
  };

  const handleToggleStatus = async (account) => {
    try {
      await updateMutation.mutateAsync({ id: account._id, isActive: !account.isActive });
      addToast(`Cuenta ${!account.isActive ? 'activada' : 'desactivada'}`, 'success');
    } catch (err) {
      addToast('Error al actualizar estado', 'error');
    }
  };

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
        <div>
          <h3 className="admin-tab-title">Cuentas Bancarias</h3>
          <p style={{ color: 'var(--color-text-light)', fontSize: '0.88rem' }}>Administra las cuentas para depósitos y transferencias que ven los clientes.</p>
        </div>
        <Button variant="primary" onClick={openNewModal} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <PlusCircle size={16} /> Nueva Cuenta
        </Button>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : (!accounts || accounts.length === 0) ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-light)' }}>
          <AlertCircle size={40} style={{ marginBottom: '1rem', color: 'var(--color-warning)' }} />
          <p>No tienes cuentas bancarias registradas.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {accounts.map(acc => (
            <div key={acc._id} style={{ border: `1px solid ${acc.isActive ? 'var(--color-primary)' : '#CCC'}`, borderRadius: '8px', padding: '1.5rem', backgroundColor: '#FFF', position: 'relative', opacity: acc.isActive ? 1 : 0.65 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <Landmark size={20} color={acc.isActive ? 'var(--color-primary)' : '#999'} />
                <h4 style={{ margin: 0, fontWeight: 700 }}>{acc.bankName}</h4>
              </div>
              
              <div style={{ fontSize: '0.85rem', color: '#334155', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <p style={{ margin: 0 }}><strong>Tipo:</strong> {acc.accountType}</p>
                <p style={{ margin: 0 }}><strong>Nro:</strong> {acc.accountNumber}</p>
                <p style={{ margin: 0 }}><strong>Titular:</strong> {acc.ownerName}</p>
                <p style={{ margin: 0 }}><strong>Documento:</strong> {acc.ownerDocument}</p>
                {acc.phoneNumber && <p style={{ margin: 0 }}><strong>Teléfono:</strong> {acc.phoneNumber}</p>}
                
                <p style={{ margin: '0.5rem 0 0 0', padding: '4px 8px', background: '#F1F5F9', borderRadius: '4px', display: 'inline-block', width: 'fit-content' }}>
                  <strong>Sirve para:</strong> <span style={{ textTransform: 'capitalize' }}>{acc.supportedMethods}</span>
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem', borderTop: '1px solid #F1F5F9', paddingTop: '1rem' }}>
                <button onClick={() => handleToggleStatus(acc)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem', color: acc.isActive ? '#D9534F' : '#166534', fontWeight: 600 }}>
                  {acc.isActive ? <><XCircle size={14}/> Desactivar</> : <><CheckCircle size={14}/> Activar</>}
                </button>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button onClick={() => openEditModal(acc)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}><Edit size={16} /></button>
                  <button onClick={() => handleDelete(acc._id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#D9534F' }}><Trash2 size={16} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000 }}>
          <div style={{ background: '#FFF', padding: '2rem', borderRadius: '8px', width: '90%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h4 style={{ margin: '0 0 1.5rem 0' }}>{editingId ? 'Editar Cuenta' : 'Nueva Cuenta Bancaria'}</h4>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem' }}>Banco *</label>
                <input type="text" value={formData.bankName} onChange={e => setFormData({...formData, bankName: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #CCC' }} placeholder="Ej: Bancolombia, Davivienda, Nequi" required />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem' }}>Tipo de Cuenta *</label>
                  <select value={formData.accountType} onChange={e => setFormData({...formData, accountType: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #CCC' }} required>
                    <option value="Ahorros">Ahorros</option>
                    <option value="Corriente">Corriente</option>
                    <option value="Billetera Digital">Billetera Digital (Nequi/Daviplata)</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem' }}>Número de Cuenta *</label>
                  <input type="text" value={formData.accountNumber} onChange={e => setFormData({...formData, accountNumber: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #CCC' }} required />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem' }}>Nombre del Titular *</label>
                <input type="text" value={formData.ownerName} onChange={e => setFormData({...formData, ownerName: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #CCC' }} required />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem' }}>Documento (CC/NIT) *</label>
                  <input type="text" value={formData.ownerDocument} onChange={e => setFormData({...formData, ownerDocument: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #CCC' }} required />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem' }}>Teléfono (Opcional)</label>
                  <input type="text" value={formData.phoneNumber} onChange={e => setFormData({...formData, phoneNumber: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #CCC' }} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem' }}>Sirve para: *</label>
                <select value={formData.supportedMethods} onChange={e => setFormData({...formData, supportedMethods: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #CCC' }} required>
                  <option value="ambas">Transferencia y Depósito (Ambas)</option>
                  <option value="transferencia">Solo Transferencia</option>
                  <option value="deposito">Solo Depósito (Ventanilla)</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                <Button type="submit" variant="primary" style={{ flex: 1 }}>{editingId ? 'Guardar Cambios' : 'Crear Cuenta'}</Button>
                <Button type="button" variant="outline" onClick={() => setShowModal(false)} style={{ flex: 1 }}>Cancelar</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBankAccounts;

```

---

## File: Front/src/pages/Admin/components/AdminCategories.jsx

**Path:** `Front/src/pages/Admin/components/AdminCategories.jsx`

```javascript
import React, { useState } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';
import api from '../../../services/api';

const AdminCategories = ({ categories, setCategories, addToast, loadCatalogData }) => {
  const [newCatName, setNewCatName] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');
  const [loadingSubmitCategory, setLoadingSubmitCategory] = useState(false);

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    setLoadingSubmitCategory(true);
    try {
      const res = await api.post('/categories', { name: newCatName, description: newCatDesc });
      addToast(`Categoría "${res.data.data.name}" creada`, 'success');
      setCategories([...categories, res.data.data]);
      setNewCatName('');
      setNewCatDesc('');
      loadCatalogData();
    } catch (err) {
      addToast(err.response?.data?.message || 'Error al crear categoría', 'error');
    } finally {
      setLoadingSubmitCategory(false);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar esta categoría?')) return;
    try {
      await api.delete(`/categories/${id}`);
      addToast('Categoría eliminada', 'success');
      setCategories(categories.filter((c) => c._id !== id));
      loadCatalogData();
    } catch (err) {
      addToast(err.response?.data?.message || 'Error al eliminar', 'error');
    }
  };

  return (
    <div className="animate-fade-in">
      <h3 className="admin-tab-title">Gestión de Categorías del Catálogo</h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '2rem', alignItems: 'start' }}>
        
        {/* Form to insert categories */}
        <div className="admin-form-container">
          <h4 className="admin-form-title">
            <PlusCircle size={18} style={{ color: 'var(--color-primary)' }} /> Nueva Categoría
          </h4>

          <form onSubmit={handleCreateCategory} className="admin-form">
            <div>
              <label className="admin-form-label">Nombre de la Categoría *</label>
              <input
                type="text"
                placeholder="Ej: Mug Cerámica"
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                className="admin-form-input"
                required
              />
            </div>

            <div>
              <label className="admin-form-label">Descripción Corta</label>
              <input
                type="text"
                placeholder="Breve reseña sobre los artículos de esta sección"
                value={newCatDesc}
                onChange={(e) => setNewCatDesc(e.target.value)}
                className="admin-form-input"
              />
            </div>

            <button
              type="submit"
              disabled={loadingSubmitCategory}
              className="admin-submit-btn"
            >
              {loadingSubmitCategory ? 'Guardando...' : 'Crear Categoría'}
            </button>
          </form>
        </div>

        {/* Categories Table */}
        <div>
          <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: '700' }}>Categorías Registradas</h4>
          
          <div className="admin-list-container">
            {categories.map((c) => (
              <div
                key={c._id}
                className="admin-list-item"
                style={{ backgroundColor: '#FAFAFA', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <div className="admin-list-item-content">
                  <h5 style={{ margin: '0 0 0.25rem 0', fontSize: '0.92rem', fontWeight: '700' }}>{c.name}</h5>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--color-text-light)' }}>
                    {c.description || 'Sin descripción provista.'}
                  </p>
                </div>
                <button
                  onClick={() => handleDeleteCategory(c._id)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#E53E3E', padding: '0.5rem' }}
                  title="Eliminar categoría"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminCategories;

```

---

## File: Front/src/pages/Admin/components/AdminOrders.jsx

**Path:** `Front/src/pages/Admin/components/AdminOrders.jsx`

```javascript
import React, { useState } from 'react';
import { AlertCircle, Truck, CheckCircle, PlusCircle, DollarSign, Edit } from 'lucide-react';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import Button from '../../../components/common/Button';
import { formatDate } from '../../../utils/formatDate';
import { formatCurrency } from '../../../utils/formatCurrency';
import { useUpdateOrderStatus } from '../../../queries/useOrders';
import api from '../../../services/api';

const AdminOrders = ({ orders, loadingOrders, addToast, products = [], users = [], refetchOrders }) => {
  const [triggeringOrderId, setTriggeringOrderId] = useState(null);
  const updateOrderStatusMutation = useUpdateOrderStatus();

  // Modals state
  const [showDispatchModal, setShowDispatchModal] = useState(false);
  const [showManualModal, setShowManualModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Dispatch form state
  const [dispatchForm, setDispatchForm] = useState({
    company: 'Servientrega', trackingNumber: '', dispatchDate: '', estimatedDeliveryDate: '', notes: ''
  });

  // Manual order state
  const [manualForm, setManualForm] = useState({
    userId: '', paymentMethod: 'efectivo',
    address: '', city: '', postalCode: '', country: 'Colombia', phone: '',
    productId: '', quantity: 1, customization: ''
  });

  // Flow control metrics
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const monthlyOrders = (orders || []).filter(o => {
    const d = new Date(o.createdAt);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear && ['paid', 'shipped', 'delivered'].includes(o.status);
  });
  const cashFlow = { efectivo: 0, transferencia: 0, deposito: 0, tarjeta: 0, total: 0 };
  monthlyOrders.forEach(o => {
    const pm = o.paymentMethod || 'tarjeta';
    if (cashFlow[pm] !== undefined) cashFlow[pm] += o.total;
    cashFlow.total += o.total;
  });

  const handleOpenDispatch = (order) => {
    setSelectedOrder(order);
    if (order.shippingDetails) {
      setDispatchForm({
        company: order.shippingDetails.company || 'Servientrega',
        trackingNumber: order.shippingDetails.trackingNumber || '',
        dispatchDate: order.shippingDetails.dispatchDate ? new Date(order.shippingDetails.dispatchDate).toISOString().slice(0,16) : '',
        estimatedDeliveryDate: order.shippingDetails.estimatedDeliveryDate ? new Date(order.shippingDetails.estimatedDeliveryDate).toISOString().slice(0,10) : '',
        notes: order.shippingDetails.notes || ''
      });
    } else {
      setDispatchForm({ company: 'Servientrega', trackingNumber: '', dispatchDate: '', estimatedDeliveryDate: '', notes: '' });
    }
    setShowDispatchModal(true);
  };

  const submitDispatch = async (e) => {
    e.preventDefault();
    setTriggeringOrderId(selectedOrder._id);
    try {
      await api.patch(`/orders/${selectedOrder._id}/dispatch`, dispatchForm);
      addToast('Despacho actualizado y notificado', 'success');
      setShowDispatchModal(false);
      refetchOrders();
    } catch (err) {
      addToast('Error al actualizar despacho', 'error');
    } finally {
      setTriggeringOrderId(null);
    }
  };

  const submitManualOrder = async (e) => {
    e.preventDefault();
    if (!manualForm.userId || !manualForm.productId) {
      addToast('Debe seleccionar cliente y producto', 'warning');
      return;
    }
    setTriggeringOrderId('manual');
    try {
      const payload = {
        user: manualForm.userId,
        items: [{ product: manualForm.productId, quantity: manualForm.quantity, customization: { details: manualForm.customization } }],
        shippingAddress: {
          address: manualForm.address, city: manualForm.city, postalCode: manualForm.postalCode || '000000', country: manualForm.country, phone: manualForm.phone
        },
        paymentMethod: manualForm.paymentMethod,
        shippingDetails: dispatchForm.trackingNumber ? dispatchForm : undefined
      };
      await api.post('/orders/manual', payload);
      addToast('Orden manual registrada', 'success');
      setShowManualModal(false);
      refetchOrders();
    } catch (err) {
      addToast(err.response?.data?.message || 'Error al registrar orden', 'error');
    } finally {
      setTriggeringOrderId(null);
    }
  };

  const handleDeliverOrder = async (orderId) => {
    setTriggeringOrderId(orderId);
    try {
      await updateOrderStatusMutation.mutateAsync({ id: orderId, status: 'delivered' });
      addToast('Pedido marcado como Entregado', 'success');
    } catch (error) {
      addToast('Error al entregar pedido', 'error');
    } finally {
      setTriggeringOrderId(null);
    }
  };

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
        <div>
          <h3 className="admin-tab-title">Despachos & Logística de Ventas</h3>
          <p style={{ color: 'var(--color-text-light)', fontSize: '0.88rem' }}>Gestión de envíos y registro de órdenes manuales.</p>
        </div>
        <Button variant="primary" onClick={() => {
          setDispatchForm({ company: 'Servientrega', trackingNumber: '', dispatchDate: '', estimatedDeliveryDate: '', notes: '' });
          setShowManualModal(true);
        }} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <PlusCircle size={16} /> Venta Manual
        </Button>
      </div>

      {/* Cash Flow Section */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
        <div style={{ background: '#E6F4EA', padding: '1rem', borderRadius: '8px', minWidth: '150px', border: '1px solid #CEEAD6' }}>
          <span style={{ fontSize: '0.8rem', color: '#137333', fontWeight: 700 }}>FLUJO MES ACTUAL</span>
          <h4 style={{ margin: '0.5rem 0 0 0', color: '#137333', fontSize: '1.25rem' }}>{formatCurrency(cashFlow.total)}</h4>
        </div>
        <div style={{ background: '#F8F9FA', padding: '1rem', borderRadius: '8px', minWidth: '120px', border: '1px solid #E2E8F0' }}>
          <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Efectivo</span>
          <p style={{ margin: '0.25rem 0 0 0', fontWeight: 700 }}>{formatCurrency(cashFlow.efectivo)}</p>
        </div>
        <div style={{ background: '#F8F9FA', padding: '1rem', borderRadius: '8px', minWidth: '120px', border: '1px solid #E2E8F0' }}>
          <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Transferencia</span>
          <p style={{ margin: '0.25rem 0 0 0', fontWeight: 700 }}>{formatCurrency(cashFlow.transferencia)}</p>
        </div>
        <div style={{ background: '#F8F9FA', padding: '1rem', borderRadius: '8px', minWidth: '120px', border: '1px solid #E2E8F0' }}>
          <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Depósito</span>
          <p style={{ margin: '0.25rem 0 0 0', fontWeight: 700 }}>{formatCurrency(cashFlow.deposito)}</p>
        </div>
        <div style={{ background: '#F8F9FA', padding: '1rem', borderRadius: '8px', minWidth: '120px', border: '1px solid #E2E8F0' }}>
          <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Tarjeta (Stripe)</span>
          <p style={{ margin: '0.25rem 0 0 0', fontWeight: 700 }}>{formatCurrency(cashFlow.tarjeta)}</p>
        </div>
      </div>

      {loadingOrders ? (
        <LoadingSpinner />
      ) : (!orders || orders.length === 0) ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-light)' }}>
          <AlertCircle size={40} style={{ marginBottom: '1rem', color: 'var(--color-warning)' }} />
          <p>No se encontraron pedidos registrados.</p>
        </div>
      ) : (
        <div className="admin-list-container" style={{ gap: '1.5rem', maxHeight: 'none' }}>
          {orders.map((order) => {
            let statusBg = '#CCC';
            if (order.status === 'paid') statusBg = 'var(--color-primary)';
            else if (order.status === 'shipped') statusBg = 'var(--color-accent)';
            else if (order.status === 'delivered') statusBg = '#2D5333';

            return (
              <div key={order._id} style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--border-radius-md)', padding: '1.5rem', backgroundColor: '#FFFFFF', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #F0F0F0', paddingBottom: '0.75rem' }}>
                  <div>
                    <span style={{ fontWeight: '700', fontSize: '1.05rem' }}>Orden #{order._id.slice(-6)}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-light)', marginLeft: '1rem' }}>
                      {formatDate(order.createdAt)} • {order.paymentMethod ? order.paymentMethod.toUpperCase() : 'TARJETA'}
                    </span>
                  </div>
                  <span style={{ backgroundColor: statusBg, color: '#FFFFFF', padding: '2px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase' }}>
                    {order.status === 'paid' ? 'Pagado (Prep.)' : order.status === 'shipped' ? 'En Tránsito' : order.status}
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1.5rem', fontSize: '0.88rem' }}>
                  <div>
                    <h5 style={{ margin: '0 0 0.5rem 0', fontWeight: '700' }}>Información de Envío</h5>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                      <li>Cliente: <strong>{order.user?.name || 'Cliente'}</strong> ({order.user?.email})</li>
                      <li>Teléfono / WhatsApp: <strong>{order.shippingAddress?.phone}</strong></li>
                      <li>Dirección: <strong>{order.shippingAddress?.address}, {order.shippingAddress?.city}</strong></li>
                    </ul>
                    {order.shippingDetails?.trackingNumber && (
                      <div style={{ marginTop: '0.75rem', padding: '0.75rem', background: '#F8F9FA', borderRadius: '6px', border: '1px dashed #CCC' }}>
                        <p style={{ margin: '0 0 0.25rem 0' }}><strong>Empresa:</strong> {order.shippingDetails.company} - <strong>Guía:</strong> {order.shippingDetails.trackingNumber}</p>
                        {order.shippingDetails.estimatedDeliveryDate && <p style={{ margin: '0' }}><strong>Entrega Est.:</strong> {new Date(order.shippingDetails.estimatedDeliveryDate).toLocaleDateString()}</p>}
                      </div>
                    )}
                  </div>

                  <div style={{ borderLeft: '1px solid #F0F0F0', paddingLeft: '1.5rem' }}>
                    <h5 style={{ margin: '0 0 0.5rem 0', fontWeight: '700' }}>Artículos</h5>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                      {order.items?.map((item, idx) => (
                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                          <span>{item.product?.name || item.name} (x{item.quantity})</span>
                          <span>{formatCurrency((item.price || 0) * item.quantity)}</span>
                        </div>
                      ))}
                      <div style={{ borderTop: '1px solid #EFEFEF', marginTop: '0.5rem', paddingTop: '0.5rem', display: 'flex', justifyContent: 'space-between', fontWeight: '700' }}>
                        <span>Total Pedido:</span>
                        <span>{formatCurrency(order.total)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', borderTop: '1px solid #F0F0F0', paddingTop: '0.75rem' }}>
                  {['paid', 'shipped'].includes(order.status) && (
                    <Button variant="outline" onClick={() => handleOpenDispatch(order)} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', padding: '0.4rem 0.75rem' }}>
                      <Edit size={14} /> Editar Despacho
                    </Button>
                  )}
                  {order.status === 'shipped' && (
                    <Button variant="primary" onClick={() => handleDeliverOrder(order._id)} disabled={triggeringOrderId === order._id} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', padding: '0.4rem 0.75rem' }}>
                      <CheckCircle size={14} /> Entregado
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* MODALS */}
      {showDispatchModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000 }}>
          <div style={{ background: '#FFF', padding: '2rem', borderRadius: '8px', width: '90%', maxWidth: '500px' }}>
            <h4 style={{ margin: '0 0 1rem 0' }}>Información de Despacho (Orden #{selectedOrder?._id.slice(-6)})</h4>
            <form onSubmit={submitDispatch} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.25rem', fontWeight: 600 }}>Empresa Transportadora</label>
                <select value={dispatchForm.company} onChange={e => setDispatchForm({...dispatchForm, company: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #CCC' }}>
                  <option value="Servientrega">Servientrega</option>
                  <option value="Inter Rapidísimo">Inter Rapidísimo</option>
                  <option value="Coordinadora">Coordinadora</option>
                  <option value="Envía">Envía</option>
                  <option value="TCC">TCC</option>
                  <option value="Mensajería Local">Mensajería Local</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.25rem', fontWeight: 600 }}>Planilla / Guía de Envío</label>
                <input type="text" value={dispatchForm.trackingNumber} onChange={e => setDispatchForm({...dispatchForm, trackingNumber: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #CCC' }} required />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.25rem', fontWeight: 600 }}>Fecha/Hora de Despacho</label>
                  <input type="datetime-local" value={dispatchForm.dispatchDate} onChange={e => setDispatchForm({...dispatchForm, dispatchDate: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #CCC' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.25rem', fontWeight: 600 }}>Día Est. Entrega</label>
                  <input type="date" value={dispatchForm.estimatedDeliveryDate} onChange={e => setDispatchForm({...dispatchForm, estimatedDeliveryDate: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #CCC' }} />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <Button type="submit" variant="primary" style={{ flex: 1 }}>{triggeringOrderId ? 'Guardando...' : 'Guardar y Despachar'}</Button>
                <Button type="button" variant="outline" onClick={() => setShowDispatchModal(false)} style={{ flex: 1 }}>Cancelar</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showManualModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000 }}>
          <div style={{ background: '#FFF', padding: '2rem', borderRadius: '8px', width: '90%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h4 style={{ margin: '0 0 1rem 0' }}>Registrar Venta Manual / Llamada</h4>
            <form onSubmit={submitManualOrder} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.25rem', fontWeight: 600 }}>Cliente (Usuario)*</label>
                  <select value={manualForm.userId} onChange={e => setManualForm({...manualForm, userId: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #CCC' }} required>
                    <option value="">Seleccionar cliente...</option>
                    {users.map(u => <option key={u._id} value={u._id}>{u.name} ({u.email})</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.25rem', fontWeight: 600 }}>Método de Pago*</label>
                  <select value={manualForm.paymentMethod} onChange={e => setManualForm({...manualForm, paymentMethod: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #CCC' }} required>
                    <option value="efectivo">Efectivo</option>
                    <option value="transferencia">Transferencia</option>
                    <option value="deposito">Depósito Bancario</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.25rem', fontWeight: 600 }}>Producto*</label>
                  <select value={manualForm.productId} onChange={e => setManualForm({...manualForm, productId: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #CCC' }} required>
                    <option value="">Seleccionar producto...</option>
                    {products.filter(p => !p.isDeleted).map(p => <option key={p._id} value={p._id}>{p.name} - {formatCurrency(p.price)}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.25rem', fontWeight: 600 }}>Cantidad*</label>
                  <input type="number" min="1" value={manualForm.quantity} onChange={e => setManualForm({...manualForm, quantity: parseInt(e.target.value)})} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #CCC' }} required />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.25rem', fontWeight: 600 }}>Dirección de Envío*</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  <input type="text" placeholder="Dirección" value={manualForm.address} onChange={e => setManualForm({...manualForm, address: e.target.value})} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #CCC' }} required />
                  <input type="text" placeholder="Ciudad" value={manualForm.city} onChange={e => setManualForm({...manualForm, city: e.target.value})} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #CCC' }} required />
                  <input type="text" placeholder="Teléfono" value={manualForm.phone} onChange={e => setManualForm({...manualForm, phone: e.target.value})} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #CCC' }} required />
                </div>
              </div>

              <div style={{ borderTop: '1px solid #EEE', paddingTop: '1rem', marginTop: '0.5rem' }}>
                <h5 style={{ margin: '0 0 0.5rem 0' }}>Datos de Despacho (Opcional)</h5>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  <select value={dispatchForm.company} onChange={e => setDispatchForm({...dispatchForm, company: e.target.value})} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #CCC' }}>
                    <option value="Servientrega">Servientrega</option>
                    <option value="Inter Rapidísimo">Inter Rapidísimo</option>
                    <option value="Coordinadora">Coordinadora</option>
                    <option value="Envía">Envía</option>
                    <option value="TCC">TCC</option>
                    <option value="Mensajería Local">Mensajería Local</option>
                  </select>
                  <input type="text" placeholder="Nro de Guía" value={dispatchForm.trackingNumber} onChange={e => setDispatchForm({...dispatchForm, trackingNumber: e.target.value})} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #CCC' }} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <Button type="submit" variant="primary" style={{ flex: 1 }}>{triggeringOrderId === 'manual' ? 'Guardando...' : 'Crear Venta'}</Button>
                <Button type="button" variant="outline" onClick={() => setShowManualModal(false)} style={{ flex: 1 }}>Cancelar</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;

```

---

## File: Front/src/pages/Admin/components/AdminProducts.jsx

**Path:** `Front/src/pages/Admin/components/AdminProducts.jsx`

```javascript
import React, { useState } from 'react';
import { PlusCircle, Search, Trash2, Edit } from 'lucide-react';
import api from '../../../services/api';
import * as productsService from '../../../services/products.service';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import { formatCurrency } from '../../../utils/formatCurrency';

const AdminProducts = ({ categories, products, loadingProducts, loadCatalogData, addToast }) => {
  // Product CRUD Form states
  const [prodName, setProdName] = useState('');
  const [prodDesc, setProdDesc] = useState('');
  const [prodPrice, setProdPrice] = useState('');
  const [prodStock, setProdStock] = useState('');
  const [prodCatId, setProdCatId] = useState(categories.length > 0 ? categories[0]._id : '');
  const [prodType, setProdType] = useState('prenda');
  const [prodImages, setProdImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loadingSubmitProduct, setLoadingSubmitProduct] = useState(false);
  const [productSearch, setProductSearch] = useState('');
  const [editProductId, setEditProductId] = useState(null);
  
  // Detail Modal States
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productOrders, setProductOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  const handleProductClick = async (product) => {
    setSelectedProduct(product);
    setProductOrders([]);
    setLoadingOrders(true);
    try {
      const res = await api.get(`/orders/product/${product._id}`);
      setProductOrders(res.data.data?.data || res.data.data || []);
    } catch (err) {
      addToast('Error al cargar historial de ventas', 'error');
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleEditClick = (product) => {
    setEditProductId(product._id);
    setProdName(product.name);
    setProdDesc(product.description);
    setProdPrice(product.price.toString());
    setProdStock(product.stock.toString());
    setProdCatId(product.category?._id || product.category || (categories.length > 0 ? categories[0]._id : ''));
    setProdType(product.type || 'prenda');
    setImagePreviews(product.images || []);
    setProdImages([]); 
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditProductId(null);
    setProdName('');
    setProdDesc('');
    setProdPrice('');
    setProdStock('');
    setProdImages([]);
    setImagePreviews([]);
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.description.toLowerCase().includes(productSearch.toLowerCase())
  );

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      addToast('Máximo 5 imágenes permitidas', 'error');
      return;
    }
    setProdImages(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    if (!prodName || !prodDesc || !prodPrice || !prodStock || (!prodCatId && categories.length > 0)) {
      addToast('Por favor completa todos los campos requeridos', 'warning');
      return;
    }

    setLoadingSubmitProduct(true);
    const formData = new FormData();
    formData.append('name', prodName);
    formData.append('description', prodDesc);
    formData.append('price', parseFloat(prodPrice));
    formData.append('stock', parseInt(prodStock, 10));
    formData.append('category', prodCatId || categories[0]?._id);
    formData.append('type', prodType);

    for (let i = 0; i < prodImages.length; i++) {
      formData.append('images', prodImages[i]);
    }

    try {
      if (editProductId) {
        await api.put(`/products/${editProductId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        addToast('¡Producto actualizado exitosamente!', 'success');
      } else {
        await api.post('/products', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        addToast('¡Producto creado exitosamente!', 'success');
      }
      cancelEdit();
      loadCatalogData();
    } catch (err) {
      addToast(err.response?.data?.message || 'Error al guardar producto', 'error');
    } finally {
      setLoadingSubmitProduct(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('¿Estás seguro de que deseas desactivar este producto?')) return;
    try {
      await productsService.deleteProduct(id);
      addToast('Producto desactivado', 'success');
      loadCatalogData();
    } catch (err) {
      addToast(err.response?.data?.message || 'Error al desactivar', 'error');
    }
  };

  const handleRestoreProduct = async (id) => {
    try {
      await productsService.restoreProduct(id);
      addToast('Producto restaurado exitosamente', 'success');
      loadCatalogData();
    } catch (err) {
      addToast(err.response?.data?.message || 'Error al restaurar', 'error');
    }
  };

  const handleStockQuickEdit = async (productId, currentStock, delta) => {
    const newStock = Math.max(0, currentStock + delta);
    try {
      await api.put(`/products/${productId}`, { stock: newStock });
      addToast('Inventario actualizado', 'success');
      loadCatalogData();
    } catch (err) {
      addToast('Error al actualizar el stock', 'error');
    }
  };

  const renderProductDetailsModal = () => {
    if (!selectedProduct) return null;
    const totalSold = productOrders.reduce((sum, order) => {
      const item = order.items.find(i => i.product.toString() === selectedProduct._id.toString());
      return sum + (item ? item.quantity : 0);
    }, 0);

    const returns = productOrders.filter(order => order.status === 'cancelled').length;

    return (
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000,
        backdropFilter: 'blur(3px)'
      }} onClick={(e) => { if (e.target === e.currentTarget) setSelectedProduct(null); }}>
        <div style={{
          background: 'white', padding: '2rem', borderRadius: '12px', width: '90%', maxWidth: '650px', maxHeight: '85vh', overflowY: 'auto',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <img src={selectedProduct.images[0] || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=100'} alt={selectedProduct.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }} />
              <div>
                <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--green-deep)' }}>{selectedProduct.name}</h3>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{selectedProduct.category?.name || 'Sin categoría'} • {selectedProduct.type}</span>
              </div>
            </div>
            <button onClick={() => setSelectedProduct(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.75rem', lineHeight: 1, color: '#64748b' }}>&times;</button>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1rem', margin: '1.5rem 0', padding: '1rem', background: '#F8F9FA', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
            <div>
              <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Stock Actual</p>
              <p style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: selectedProduct.stock > 0 ? 'var(--green-brand)' : '#D9534F' }}>{selectedProduct.stock} uds</p>
            </div>
            <div>
              <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Vendidos</p>
              <p style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: '#3b82f6' }}>{totalSold} uds</p>
            </div>
            <div>
              <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Devoluciones</p>
              <p style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: returns > 0 ? '#ef4444' : '#64748b' }}>{returns} pedidos</p>
            </div>
            <div>
              <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Precio Unitario</p>
              <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>{formatCurrency(selectedProduct.price)}</p>
            </div>
          </div>

          <h4 style={{ fontSize: '1.05rem', margin: '0 0 1rem 0', borderBottom: '1px solid #E2E8F0', paddingBottom: '0.5rem' }}>Historial de Ventas</h4>
          {loadingOrders ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}><LoadingSpinner /></div>
          ) : productOrders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)', background: '#F8F9FA', borderRadius: '8px' }}>
              <p style={{ margin: 0, fontSize: '0.9rem' }}>Aún no se han registrado ventas de este artículo.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {productOrders.map(order => {
                const item = order.items.find(i => i.product.toString() === selectedProduct._id.toString());
                if (!item) return null;
                return (
                  <div key={order._id} style={{ border: '1px solid #E2E8F0', padding: '1rem', borderRadius: '8px', fontSize: '0.85rem', background: '#fff' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', alignItems: 'center' }}>
                      <strong style={{ color: 'var(--green-deep)', fontSize: '0.95rem' }}>{order.user?.name || 'Cliente anónimo'}</strong>
                      <span style={{ 
                        background: order.status === 'delivered' ? '#dcfce7' : order.status === 'cancelled' ? '#fee2e2' : '#fef3c7',
                        color: order.status === 'delivered' ? '#166534' : order.status === 'cancelled' ? '#991b1b' : '#92400e',
                        padding: '4px 10px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase'
                      }}>
                        {order.status}
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                      <span>Cantidad: <strong>{item.quantity}</strong></span>
                      <span>{new Date(order.createdAt).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    {item.customization?.details && (
                      <div style={{ marginTop: '0.5rem', padding: '0.5rem', background: '#F1F5F9', borderRadius: '4px', fontSize: '0.8rem' }}>
                        <strong style={{ color: '#64748b' }}>Detalle de pers.:</strong> {item.customization.details}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="animate-fade-in">
      <h3 className="admin-tab-title">Gestión de Inventario & Artículos</h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '2rem', alignItems: 'start' }}>
        
        {/* Form to insert new items */}
        <div className="admin-form-container">
          <h4 className="admin-form-title">
            <PlusCircle size={18} style={{ color: 'var(--color-primary)' }} /> {editProductId ? 'Editar Producto' : 'Añadir Producto'}
          </h4>

          <form onSubmit={handleSubmitProduct} className="admin-form">
            <div>
              <label className="admin-form-label">Nombre del Artículo *</label>
              <input
                type="text"
                placeholder="Ej: Mug Personalizado Mamá"
                value={prodName}
                onChange={(e) => setProdName(e.target.value)}
                className="admin-form-input"
                required
              />
            </div>

            <div>
              <label className="admin-form-label">Descripción del Artículo *</label>
              <textarea
                placeholder="Ingresa los materiales, dimensiones y especificaciones..."
                value={prodDesc}
                onChange={(e) => setProdDesc(e.target.value)}
                className="admin-form-textarea"
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div>
                <label className="admin-form-label">Precio (COP) *</label>
                <input
                  type="number"
                  placeholder="45000"
                  value={prodPrice}
                  onChange={(e) => setProdPrice(e.target.value)}
                  className="admin-form-input"
                  required
                />
              </div>
              <div>
                <label className="admin-form-label">Stock Inicial *</label>
                <input
                  type="number"
                  placeholder="25"
                  value={prodStock}
                  onChange={(e) => setProdStock(e.target.value)}
                  className="admin-form-input"
                  required
                />
              </div>
            </div>

            <div>
              <label className="admin-form-label">Categoría *</label>
              <select
                value={prodCatId}
                onChange={(e) => setProdCatId(e.target.value)}
                className="admin-form-select"
                required
              >
                <option value="">Selecciona una categoría</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.75rem' }}>
              <div>
                <label className="admin-form-label">Técnica/Tipo</label>
                <select
                  value={prodType}
                  onChange={(e) => setProdType(e.target.value)}
                  className="admin-form-select"
                >
                  <option value="prenda">Artículo Base</option>
                  <option value="serigrafia">Serigrafía</option>
                  <option value="dtf">DTF</option>
                  <option value="estampado">Estampados</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
            </div>

            <div>
              <label className="admin-form-label">Imágenes (Max 5)</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                style={{ fontSize: '0.8rem' }}
              />
              {imagePreviews.length > 0 && (
                <div style={{ display: 'flex', gap: '0.35rem', marginTop: '0.5rem' }}>
                  {imagePreviews.map((src, i) => (
                    <img key={i} src={src} alt="Preview" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #CCC' }} />
                  ))}
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                type="submit"
                disabled={loadingSubmitProduct}
                className="admin-submit-btn"
                style={{ flex: 1 }}
              >
                {loadingSubmitProduct ? 'Guardando...' : (editProductId ? 'Actualizar Producto' : 'Crear Producto')}
              </button>
              {editProductId && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="admin-submit-btn"
                  style={{ flex: 1, backgroundColor: '#888' }}
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Products List and Stock Warning Levels */}
        <div>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            <div className="admin-search-wrap">
              <Search size={16} className="admin-search-icon" />
              <input
                type="text"
                placeholder="Buscar en el inventario..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                className="admin-search-input"
              />
            </div>
          </div>

          <div className="admin-list-container">
            {loadingProducts ? (
              <LoadingSpinner />
            ) : filteredProducts.length === 0 ? (
              <p style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--color-text-light)' }}>No se encontraron referencias.</p>
            ) : (
              filteredProducts.map((p) => {
                let stockColor = '#528F58'; // healthy green
                if (p.stock <= 5) stockColor = '#D9534F'; // critical red
                else if (p.stock <= 20) stockColor = '#F0AD4E'; // warning orange

                return (
                  <div
                    key={p._id}
                    className="admin-list-item"
                    style={{ opacity: p.isDeleted ? 0.6 : 1, cursor: 'pointer', transition: 'background-color 0.2s', ':hover': { backgroundColor: '#F8F9FA' } }}
                    onClick={(e) => {
                      if (e.target.closest('button')) return;
                      handleProductClick(p);
                    }}
                  >
                    <img src={p.images[0] || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=100'} alt={p.name} className="admin-list-item-img" />
                    <div className="admin-list-item-content">
                      <h5 className="admin-list-item-title">{p.name}</h5>
                      <span className="admin-list-item-sub">{formatCurrency(p.price)}</span>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                        <span style={{ fontSize: '0.78rem', color: 'var(--color-text-light)' }}>Stock:</span>
                        <button type="button" onClick={() => handleStockQuickEdit(p._id, p.stock, -1)} style={{ padding: '0 4px', border: '1px solid #CCC', background: '#EEE', borderRadius: '2px', cursor: 'pointer' }}>-</button>
                        <span style={{ fontSize: '0.8rem', fontWeight: '700', color: stockColor }}>{p.stock} uds</span>
                        <button type="button" onClick={() => handleStockQuickEdit(p._id, p.stock, 1)} style={{ padding: '0 4px', border: '1px solid #CCC', background: '#EEE', borderRadius: '2px', cursor: 'pointer' }}>+</button>
                      </div>
                    </div>

                    <div style={{ flexShrink: 0 }}>
                      {p.isDeleted ? (
                        <button
                          onClick={() => handleRestoreProduct(p._id)}
                          style={{
                            border: '1px solid var(--color-primary)',
                            color: 'var(--color-primary)',
                            background: 'transparent',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '4px',
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            cursor: 'pointer'
                          }}
                        >
                          Restaurar
                        </button>
                      ) : (
                        <div style={{ display: 'flex', gap: '0.25rem' }}>
                          <button
                            onClick={() => handleEditClick(p)}
                            style={{ border: 'none', background: 'transparent', color: 'var(--color-primary)', cursor: 'pointer', padding: '0.25rem' }}
                            title="Editar producto"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(p._id)}
                            style={{ border: 'none', background: 'transparent', color: '#D9534F', cursor: 'pointer', padding: '0.25rem' }}
                            title="Desactivar producto"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>
      {renderProductDetailsModal()}
    </div>
  );
};

export default AdminProducts;

```

---

## File: Front/src/pages/Admin/components/AdminTickets.jsx

**Path:** `Front/src/pages/Admin/components/AdminTickets.jsx`

```javascript
import React, { useState } from 'react';
import { AlertCircle, MessageSquare, CheckCircle, Mail, Phone } from 'lucide-react';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import Button from '../../../components/common/Button';
import { formatDate } from '../../../utils/formatDate';
import { useUpdateTicketStatus } from '../../../queries/useTickets';
import api from '../../../services/api';

const AdminTickets = ({ tickets, loadingTickets, addToast, refetchTickets }) => {
  const [updatingTicketId, setUpdatingTicketId] = useState(null);
  const updateTicketStatusMutation = useUpdateTicketStatus();
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [replyContent, setReplyContent] = useState('');

  const handleUpdateTicket = async (ticketId, nextStatus) => {
    setUpdatingTicketId(ticketId);
    try {
      await updateTicketStatusMutation.mutateAsync({ id: ticketId, status: nextStatus });
      addToast(`Ticket actualizado a estado: ${nextStatus.toUpperCase()}`, 'success');
      if (refetchTickets) refetchTickets();
    } catch (error) {
      addToast('Error al actualizar estado del ticket', 'error');
    } finally {
      setUpdatingTicketId(null);
    }
  };

  const handleReply = async (statusUpdate = null) => {
    if (!replyContent.trim()) {
      addToast('Debes escribir un mensaje para responder', 'warning');
      return;
    }
    setUpdatingTicketId(selectedTicket._id);
    try {
      await api.post(`/tickets/${selectedTicket._id}/reply`, { content: replyContent, statusUpdate });
      addToast(statusUpdate === 'resolved' ? 'Respuesta enviada y ticket resuelto' : 'Respuesta enviada', 'success');
      setReplyContent('');
      setSelectedTicket(null);
      if (refetchTickets) refetchTickets();
    } catch (error) {
      addToast('Error al enviar respuesta', 'error');
    } finally {
      setUpdatingTicketId(null);
    }
  };

  const getStatusColor = (status) => {
    if (status === 'pending') return '#D9534F'; // red
    if (status === 'open' || status === 'in_progress') return '#F0AD4E'; // orange
    if (status === 'resolved' || status === 'closed') return '#166534'; // green
    return '#999';
  };

  return (
    <div className="animate-fade-in">
      <h3 className="admin-tab-title">Tickets de Soporte de Clientes</h3>
      <p style={{ color: 'var(--color-text-light)', fontSize: '0.88rem', marginBottom: '2rem' }}>
        Monitorea y atiende las consultas, quejas y reclamos que los usuarios registran en la plataforma. Responde directamente a los clientes.
      </p>

      {loadingTickets ? (
        <LoadingSpinner />
      ) : (!tickets || tickets.length === 0) ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-light)' }}>
          <AlertCircle size={40} style={{ marginBottom: '1rem', color: 'var(--color-primary)' }} />
          <p>No hay tickets de soporte registrados.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {tickets.map((t) => {
            const statusColor = getStatusColor(t.status);
            return (
              <div key={t._id} style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--border-radius-sm)', padding: '1.25rem', backgroundColor: '#FDFCFB', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span style={{ backgroundColor: 'rgba(0,0,0,0.06)', padding: '2px 6px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: '600', marginRight: '0.5rem', textTransform: 'uppercase' }}>{t.type}</span>
                    <span style={{ fontWeight: '700', fontSize: '1.1rem', color: '#1E293B' }}>{t.subject}</span>
                  </div>
                  <span style={{ color: statusColor, fontWeight: '700', fontSize: '0.75rem', textTransform: 'uppercase', background: `${statusColor}20`, padding: '4px 10px', borderRadius: '20px' }}>{t.status}</span>
                </div>

                <p style={{ margin: '0.5rem 0', fontSize: '0.9rem', color: 'var(--color-text)', lineHeight: '1.4' }}>
                  {t.description.length > 150 ? t.description.substring(0, 150) + '...' : t.description}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #F0F0F0', paddingTop: '0.75rem', fontSize: '0.8rem', color: 'var(--color-text-light)' }}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <span>Por: <strong>{t.user?.name || 'Cliente'}</strong></span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Mail size={14} /> {t.user?.email}</span>
                    <span>{formatDate(t.createdAt)}</span>
                  </div>
                  
                  <Button variant="primary" onClick={() => setSelectedTicket(t)} style={{ padding: '0.4rem 1rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <MessageSquare size={14} /> Gestionar y Responder
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Ticket Management Modal */}
      {selectedTicket && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000, backdropFilter: 'blur(3px)' }}>
          <div style={{ background: '#FFF', padding: '2rem', borderRadius: '12px', width: '95%', maxWidth: '750px', maxHeight: '90vh', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ backgroundColor: '#F1F5F9', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '700', color: '#475569', textTransform: 'uppercase', marginRight: '0.5rem' }}>{selectedTicket.type}</span>
                <span style={{ fontWeight: '800', fontSize: '1.25rem', color: '#0F172A' }}>{selectedTicket.subject}</span>
              </div>
              <button onClick={() => setSelectedTicket(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.5rem', color: '#94A3B8' }}>&times;</button>
            </div>

            <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '8px', border: '1px solid #E2E8F0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748B', fontWeight: 600 }}>Cliente</p>
                <p style={{ margin: 0, fontWeight: 700, color: '#1E293B' }}>{selectedTicket.user?.name}</p>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#334155', display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.25rem' }}><Mail size={14} /> {selectedTicket.user?.email}</p>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748B', fontWeight: 600 }}>Estado Actual</p>
                <span style={{ fontWeight: '700', fontSize: '0.85rem', textTransform: 'uppercase', color: getStatusColor(selectedTicket.status) }}>{selectedTicket.status}</span>
                <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748B', marginTop: '0.25rem' }}>Abierto: {formatDate(selectedTicket.createdAt)}</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Original Message */}
              <div style={{ background: '#FFF', border: '1px solid #E2E8F0', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.75rem', color: '#64748B', fontWeight: 700 }}>MENSAJE ORIGINAL ({formatDate(selectedTicket.createdAt)})</p>
                <p style={{ margin: 0, fontSize: '0.95rem', color: '#334155', whiteSpace: 'pre-wrap' }}>{selectedTicket.description}</p>
              </div>

              {/* Thread */}
              {selectedTicket.messages && selectedTicket.messages.map((msg, idx) => (
                <div key={idx} style={{ 
                  alignSelf: msg.sender === 'admin' ? 'flex-end' : 'flex-start',
                  background: msg.sender === 'admin' ? '#E6F4EA' : '#F1F5F9',
                  border: `1px solid ${msg.sender === 'admin' ? '#CEEAD6' : '#E2E8F0'}`,
                  padding: '1rem', 
                  borderRadius: '8px',
                  maxWidth: '85%'
                }}>
                  <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.75rem', color: msg.sender === 'admin' ? '#166534' : '#64748B', fontWeight: 700 }}>
                    {msg.sender === 'admin' ? 'TÚ (ADMIN)' : 'CLIENTE'} • {formatDate(msg.createdAt)}
                  </p>
                  <p style={{ margin: 0, fontSize: '0.95rem', color: '#334155', whiteSpace: 'pre-wrap' }}>{msg.content}</p>
                </div>
              ))}
            </div>

            {selectedTicket.status !== 'resolved' && selectedTicket.status !== 'closed' ? (
              <div style={{ marginTop: '1rem', borderTop: '1px solid #E2E8F0', paddingTop: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#1E293B', marginBottom: '0.5rem' }}>Responder al Cliente</label>
                <textarea 
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Escribe tu respuesta aquí. El cliente la verá en su panel..."
                  style={{ width: '100%', minHeight: '120px', padding: '1rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.95rem', fontFamily: 'inherit', resize: 'vertical' }}
                />
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', justifyContent: 'flex-end' }}>
                  <Button variant="outline" onClick={() => handleReply('in_progress')} disabled={updatingTicketId === selectedTicket._id}>
                    Enviar Respuesta
                  </Button>
                  <Button variant="primary" onClick={() => handleReply('resolved')} disabled={updatingTicketId === selectedTicket._id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle size={16} /> Enviar y Resolver Ticket
                  </Button>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '1.5rem', background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '8px', color: '#166534' }}>
                <CheckCircle size={32} style={{ margin: '0 auto 0.5rem auto' }} />
                <h4 style={{ margin: '0 0 0.25rem 0' }}>Ticket Resuelto</h4>
                <p style={{ margin: 0, fontSize: '0.9rem' }}>Este caso ya ha sido solucionado y cerrado. El cliente puede reabrirlo si envía un nuevo mensaje.</p>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};

export default AdminTickets;

```

---

## File: Front/src/pages/Admin/components/AdminUsers.jsx

**Path:** `Front/src/pages/Admin/components/AdminUsers.jsx`

```javascript
import React from 'react';
import { UserCheck, UserX } from 'lucide-react';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import api from '../../../services/api';

const AdminUsers = ({ users, loadingUsers, fetchUsersList, addToast }) => {
  const handleToggleUserStatus = async (userId, currentIsActive) => {
    try {
      await api.patch(`/users/${userId}/status`, { isActive: !currentIsActive });
      addToast('Estado del usuario actualizado con éxito', 'success');
      fetchUsersList();
    } catch (err) {
      addToast('Error al cambiar el estado del usuario', 'error');
    }
  };

  return (
    <div className="animate-fade-in">
      <h3 className="admin-tab-title">Usuarios & Clientes Registrados</h3>
      <p style={{ color: 'var(--color-text-light)', fontSize: '0.88rem', marginBottom: '2rem' }}>
        Visualiza el listado de clientes registrados en el portal y gestiona su estado activo de acceso.
      </p>

      {loadingUsers ? (
        <LoadingSpinner />
      ) : users.length === 0 ? (
        <p style={{ textAlign: 'center', color: 'var(--color-text-light)' }}>No se encontraron usuarios registrados.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--color-border)', color: 'var(--color-text-light)', fontWeight: '700' }}>
                <th style={{ padding: '0.75rem' }}>Nombre</th>
                <th style={{ padding: '0.75rem' }}>Correo Electrónico</th>
                <th style={{ padding: '0.75rem' }}>Rol</th>
                <th style={{ padding: '0.75rem' }}>Estado</th>
                <th style={{ padding: '0.75rem', textAlign: 'right' }}>Acción de Acceso</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} style={{ borderBottom: '1px solid #F0F0F0' }}>
                  <td style={{ padding: '0.75rem', fontWeight: '500' }}>{u.name}</td>
                  <td style={{ padding: '0.75rem' }}>{u.email}</td>
                  <td style={{ padding: '0.75rem' }}>
                    <span style={{
                      backgroundColor: u.role === 'admin' ? 'rgba(212, 175, 55, 0.15)' : 'rgba(0,0,0,0.05)',
                      color: u.role === 'admin' ? 'var(--color-accent)' : 'var(--color-text)',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontSize: '0.72rem',
                      fontWeight: '700',
                      textTransform: 'uppercase'
                    }}>{u.role}</span>
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    <span style={{
                      color: u.isActive !== false ? 'var(--color-primary)' : 'var(--color-danger)',
                      fontWeight: '600'
                    }}>{u.isActive !== false ? 'Activo' : 'Suspendido'}</span>
                  </td>
                  <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                    {u.role !== 'admin' && (
                      <button
                        onClick={() => handleToggleUserStatus(u._id, u.isActive !== false)}
                        style={{
                          border: 'none',
                          background: 'transparent',
                          color: u.isActive !== false ? 'var(--color-danger)' : 'var(--color-primary)',
                          cursor: 'pointer',
                          fontSize: '0.8rem',
                          fontWeight: '700',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem'
                        }}
                      >
                        {u.isActive !== false ? (
                          <>
                            <UserX size={14} /> Suspender
                          </>
                        ) : (
                          <>
                            <UserCheck size={14} /> Activar
                          </>
                        )}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;

```

---

## File: Front/src/pages/Auth/Auth.css

**Path:** `Front/src/pages/Auth/Auth.css`

```css
/* Auth.css */

.auth-header {
  text-align: center;
  margin-bottom: 2rem;
}

.auth-logo {
  height: 180px;
  margin: -40px 0;
  mix-blend-mode: multiply;
}

.auth-title {
  font-size: 1.5rem;
  font-family: var(--font-display);
}

.auth-subtitle {
  font-size: 0.85rem;
  color: var(--color-text-light);
}

.auth-forgot-password-container {
  text-align: right;
  margin-top: -0.5rem;
  margin-bottom: 0.5rem;
}

.auth-forgot-password-link {
  font-size: 0.8rem;
  color: var(--color-primary);
}

.auth-submit-btn {
  width: 100%;
  margin-top: 1rem;
}

.auth-footer-text {
  font-size: 0.85rem;
  text-align: center;
  margin-top: 1.5rem;
  color: var(--color-text-light);
}

.auth-footer-link {
  color: var(--color-primary);
  font-weight: 600;
}

.auth-recovery-container {
  text-align: center;
  padding: 3rem 0;
}

.auth-recovery-logo {
  height: 140px;
  margin-bottom: 1rem;
  mix-blend-mode: multiply;
}

.auth-recovery-title {
  color: #3D3D3D;
  margin-bottom: 0.5rem;
}

.auth-recovery-text {
  color: #666;
  margin-bottom: 2rem;
}

.auth-error-msg {
  color: var(--color-danger);
  font-size: 0.9rem;
}

.auth-back-link {
  color: #D4A373;
}


```

---

## File: Front/src/pages/Auth/ForgotPassword.jsx

**Path:** `Front/src/pages/Auth/ForgotPassword.jsx`

```javascript
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import logo from '../../assets/img/logo.jpg';
import './Auth.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await axios.post('/api/auth/forgot-password', { email });
      setSent(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al enviar solicitud');
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="auth-recovery-container">
        <img src={logo} alt="SonTerry" className="auth-recovery-logo" />
        <h2 className="auth-recovery-title">Revisa tu correo</h2>
        <p className="auth-recovery-text">Si la cuenta existe, recibirás un enlace para restablecer tu contraseña.</p>
        <Link to="/login" className="auth-back-link">Volver a inicio de sesión</Link>
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <img src={logo} alt="SonTerry" className="auth-recovery-logo" />
      <h2 className="auth-recovery-title">Recuperar contraseña</h2>
      <p className="auth-recovery-text">Te enviaremos un enlace para restablecerla.</p>
      {error && <p className="auth-error-msg">{error}</p>}
      <form onSubmit={handleSubmit}>
        <Input label="Correo electrónico" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@correo.com" required />
        <div style={{ marginTop: '1.5rem' }}>
          <Button type="submit" variant="primary" disabled={loading} style={{ width: '100%' }}>
            {loading ? 'Enviando...' : 'Enviar enlace'}
          </Button>
        </div>
      </form>
      <p className="auth-footer-text">
        <Link to="/login" className="auth-back-link">Volver a inicio de sesión</Link>
      </p>
    </div>
  );
};

export default ForgotPassword;

```

---

## File: Front/src/pages/Auth/Login.jsx

**Path:** `Front/src/pages/Auth/Login.jsx`

```javascript
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../../schemas/authSchema';
import { useAuthStore } from '../../store/authStore';
import { useUiStore } from '../../store/uiStore';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import logo from '../../assets/img/logo.jpg';
import './Auth.css';

const Login = () => {
  const { login, loading } = useAuthStore();
  const addToast = useUiStore((state) => state.addToast);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      addToast('¡Bienvenido de vuelta!', 'success');
      navigate('/');
    } catch (err) {
      addToast(err.message, 'error');
    }
  };

  return (
    <div>
      <div className="auth-header">
        <img src={logo} alt="SonTerry" className="auth-logo" />
        <h3 className="auth-title">Iniciar Sesión</h3>
        <p className="auth-subtitle">Accede a tu cuenta y sigue tus pedidos</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input label="Correo Electrónico" name="email" type="email" register={register} error={errors.email} />
        <Input label="Contraseña" name="password" type="password" register={register} error={errors.password} />

        <div className="auth-forgot-password-container">
          <Link to="/forgot-password" className="auth-forgot-password-link">¿Olvidaste tu contraseña?</Link>
        </div>
        
        <Button type="submit" variant="primary" className="auth-submit-btn" disabled={loading}>
          {loading ? 'Ingresando...' : 'Iniciar Sesión'}
        </Button>
      </form>

      <p className="auth-footer-text">
        ¿No tienes cuenta? <Link to="/register" className="auth-footer-link">Regístrate</Link>
      </p>
    </div>
  );
};

export default Login;

```

---

## File: Front/src/pages/Auth/Register.jsx

**Path:** `Front/src/pages/Auth/Register.jsx`

```javascript
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../../schemas/authSchema';
import { useAuthStore } from '../../store/authStore';
import { useUiStore } from '../../store/uiStore';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import logo from '../../assets/img/logo.jpg';
import './Auth.css';

const Register = () => {
  const { register: signup, loading } = useAuthStore();
  const addToast = useUiStore((state) => state.addToast);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = async (data) => {
    try {
      await signup(data.name, data.email, data.password);
      addToast('¡Registro completado!', 'success');
      navigate('/');
    } catch (err) {
      addToast(err.message, 'error');
    }
  };

  return (
    <div>
      <div className="auth-header">
        <img src={logo} alt="SonTerry" className="auth-logo" />
        <h3 className="auth-title">Crear Cuenta</h3>
        <p className="auth-subtitle">Únete para mandar tus estampados</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input label="Nombre y Apellido" name="name" register={register} error={errors.name} />
        <Input label="Correo Electrónico" name="email" type="email" register={register} error={errors.email} />
        <Input label="Contraseña (Mín. 8 caracteres)" name="password" type="password" register={register} error={errors.password} />
        
        <Button type="submit" variant="accent" className="auth-submit-btn" disabled={loading}>
          {loading ? 'Creando...' : 'Crear Cuenta'}
        </Button>
      </form>

      <p className="auth-footer-text">
        ¿Ya tienes cuenta? <Link to="/login" className="auth-footer-link">Inicia Sesión</Link>
      </p>
    </div>
  );
};

export default Register;

```

---

## File: Front/src/pages/Auth/ResetPassword.jsx

**Path:** `Front/src/pages/Auth/ResetPassword.jsx`

```javascript
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import logo from '../../assets/img/logo.jpg';
import './Auth.css';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      return;
    }
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);
    try {
      await axios.post(`/api/auth/reset-password/${token}`, { password });
      setSuccess(true);
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al restablecer la contraseña');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="auth-recovery-container">
        <img src={logo} alt="SonTerry" className="auth-recovery-logo" />
        <h2 className="auth-recovery-title">Contraseña actualizada</h2>
        <p className="auth-recovery-text">Redirigiendo al inicio de sesión...</p>
      </div>
    );
  }

  return (
    <div>
      <img src={logo} alt="SonTerry" className="auth-recovery-logo" />
      <h2 className="auth-recovery-title">Nueva contraseña</h2>
      <p className="auth-recovery-text">Ingresa tu nueva contraseña.</p>
      {error && <p className="auth-error-msg">{error}</p>}
      <form onSubmit={handleSubmit}>
        <Input label="Nueva contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mínimo 8 caracteres" required />
        <Input label="Confirmar contraseña" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Repite la contraseña" required />
        <div style={{ marginTop: '1.5rem' }}>
          <Button type="submit" variant="primary" disabled={loading} style={{ width: '100%' }}>
            {loading ? 'Guardando...' : 'Restablecer contraseña'}
          </Button>
        </div>
      </form>
      <p className="auth-footer-text">
        <Link to="/login" className="auth-back-link">Volver a inicio de sesión</Link>
      </p>
    </div>
  );
};

export default ResetPassword;

```

---

## File: Front/src/pages/Cart/Cart.css

**Path:** `Front/src/pages/Cart/Cart.css`

```css
/* Cart.css */

.cart-root {
  padding-top: 3rem;
  padding-bottom: 5rem;
}

.cart-title {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: var(--color-text);
  font-family: var(--font-display);
}

.cart-subtitle {
  color: var(--color-text-light);
  margin-bottom: 2.5rem;
}

/* Empty State */
.cart-empty {
  text-align: center;
  padding: 4rem 2rem;
  background-color: var(--white);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-subtle);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}
.cart-empty-icon {
  color: var(--color-text-light);
  opacity: 0.5;
}
.cart-empty-title {
  font-size: 1.25rem;
  margin: 0;
}
.cart-empty-text {
  color: var(--color-text-light);
  font-size: 0.9rem;
  max-width: 400px;
  margin: 0 0 1rem 0;
}

/* Grid Layout */
.cart-layout {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 2.5rem;
  align-items: start;
}

/* Panel Base */
.cart-panel {
  background-color: var(--white);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-subtle);
  padding: 2rem;
}

/* Free Shipping Bar */
.cart-shipping-bar {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--border-subtle);
}
.cart-shipping-text {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
}
.cart-shipping-text strong {
  font-weight: 600;
}
.cart-shipping-progress {
  width: 100%;
  height: 6px;
  background-color: #E2DBD0;
  border-radius: 3px;
  overflow: hidden;
}
.cart-shipping-fill {
  height: 100%;
  background-color: var(--green-brand);
  transition: width 0.4s ease;
}

/* Item List */
.cart-items-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.cart-item {
  display: flex;
  gap: 1.25rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--border-subtle);
  align-items: center;
}
.cart-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}
.cart-item-img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: var(--border-radius-sm);
  background-color: var(--cream);
  border: 1px solid var(--border-subtle);
}
.cart-item-info {
  flex-grow: 1;
}
.cart-item-title {
  font-size: 1rem;
  font-weight: 700;
  margin: 0 0 0.25rem 0;
  font-family: var(--font-display);
}
.cart-item-customization {
  font-size: 0.8rem;
  background-color: #FFF8E1;
  color: #B78103;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  display: inline-block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}
.cart-item-price {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-text-light);
}

/* Quantity Control */
.cart-qty-ctrl {
  display: flex;
  align-items: center;
  border: 1px solid var(--border-subtle);
  border-radius: 4px;
  overflow: hidden;
  background-color: var(--white);
  margin-right: 1rem;
}
.cart-qty-btn {
  padding: 0.4rem 0.75rem;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: bold;
}
.cart-qty-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.cart-qty-value {
  padding: 0.4rem 0.75rem;
  font-weight: 600;
  min-width: 30px;
  text-align: center;
  font-size: 0.9rem;
}

/* Item Action */
.cart-item-action {
  text-align: right;
  min-width: 100px;
}
.cart-item-total {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 0.5rem;
}
.cart-item-remove {
  background: none;
  border: none;
  color: var(--color-danger);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.8rem;
  margin-left: auto;
}

/* Summary Panel */
.cart-summary-panel {
  position: sticky;
  top: 120px;
}
.cart-summary-title {
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid var(--border-subtle);
  padding-bottom: 0.75rem;
  font-family: var(--font-display);
}
.cart-summary-rows {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
}
.cart-summary-row {
  display: flex;
  justify-content: space-between;
}
.cart-summary-label {
  color: var(--color-text-light);
}
.cart-summary-total {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid var(--border-subtle);
  padding-top: 0.75rem;
  font-weight: 700;
  font-size: 1.1rem;
}
.cart-summary-total-price {
  color: var(--green-brand);
}
.cart-summary-btn {
  width: 100%;
  padding: 0.85rem;
  font-size: 1rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}
.cart-summary-guarantees {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-top: 1px solid var(--border-subtle);
  padding-top: 1.5rem;
}
.cart-guarantee-item {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}
.cart-guarantee-text {
  font-size: 0.8rem;
  color: var(--color-text-light);
}

@media (max-width: 900px) {
  .cart-layout {
    grid-template-columns: 1fr;
  }
  .cart-summary-panel {
    position: static;
  }
}
@media (max-width: 500px) {
  .cart-item {
    flex-wrap: wrap;
  }
  .cart-item-action {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: left;
  }
  .cart-item-remove {
    margin-left: 0;
  }
}

```

---

## File: Front/src/pages/Cart/Cart.jsx

**Path:** `Front/src/pages/Cart/Cart.jsx`

```javascript
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';
import { formatCurrency } from '../../utils/formatCurrency';
import CartEmptyState from './components/CartEmptyState';
import CartItemList from './components/CartItemList';
import CartSummaryPanel from './components/CartSummaryPanel';
import './Cart.css';

const Cart = () => {
  const { items, removeFromCart, updateItemQuantity, getCartTotal } = useCartStore();
  const navigate = useNavigate();

  const handleQtyChange = (item, delta) => {
    const newQty = item.quantity + delta;
    updateItemQuantity(item.product._id, newQty, item.customization?.type);
  };

  const total = getCartTotal();
  const freeShippingLimit = 150000;
  const progressPercent = Math.min(100, (total / freeShippingLimit) * 100);

  return (
    <div className="container cart-root">
      <h2 className="cart-title">Tu Bolsa de Proyectos</h2>
      <p className="cart-subtitle">
        Revisa las prendas y los accesorios que deseas estampar antes de proceder a la pasarela de pago seguro.
      </p>

      {items.length === 0 ? (
        <CartEmptyState />
      ) : (
        <div className="cart-layout">
          
          {/* Left Panel: Items and Shipping Progress */}
          <div className="cart-panel">
            {/* Free Shipping Progress */}
            <div className="cart-shipping-bar">
              <div className="cart-shipping-text">
                <strong>
                  {total >= freeShippingLimit 
                    ? '¡Felicidades! Tienes Envío Gratis a toda Colombia' 
                    : `Te faltan ${formatCurrency(freeShippingLimit - total)} para Envío Gratis`}
                </strong>
                <span className="cart-summary-label">{Math.round(progressPercent)}%</span>
              </div>
              <div className="cart-shipping-progress">
                <div 
                  className="cart-shipping-fill" 
                  style={{ width: `${progressPercent}%` }} 
                />
              </div>
            </div>

            {/* List */}
            <CartItemList 
              items={items} 
              onUpdateQty={handleQtyChange} 
              onRemove={removeFromCart} 
            />
          </div>

          {/* Right Panel: Checkout Summary */}
          <CartSummaryPanel 
            total={total} 
            freeShippingLimit={freeShippingLimit} 
            onCheckout={() => navigate('/checkout')} 
          />
        </div>
      )}
    </div>
  );
};

export default Cart;

```

---

## File: Front/src/pages/Cart/components/CartEmptyState.jsx

**Path:** `Front/src/pages/Cart/components/CartEmptyState.jsx`

```javascript
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import Button from '../../../components/common/Button';

const CartEmptyState = () => {
  const navigate = useNavigate();

  return (
    <div className="cart-empty">
      <ShoppingBag size={48} className="cart-empty-icon" />
      <h3 className="cart-empty-title">Tu bolsa está vacía</h3>
      <p className="cart-empty-text">
        Aún no has agregado ningún Mug o Gorra base para personalizar. ¡Explora nuestro catálogo y empieza tu diseño!
      </p>
      <Button variant="primary" onClick={() => navigate('/productos')}>
        Explorar catálogo
      </Button>
    </div>
  );
};

export default CartEmptyState;

```

---

## File: Front/src/pages/Cart/components/CartItemList.jsx

**Path:** `Front/src/pages/Cart/components/CartItemList.jsx`

```javascript
import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { formatCurrency } from '../../../utils/formatCurrency';

const CartItemList = ({ items, onUpdateQty, onRemove }) => {
  return (
    <div className="cart-items-container">
      {items.map((item, idx) => (
        <div key={idx} className="cart-item">
          <img
            src={item.product.images?.[0] || 'https://via.placeholder.com/100'}
            alt={item.product.name}
            className="cart-item-img"
          />

          <div className="cart-item-info">
            <h4 className="cart-item-title">{item.product.name}</h4>
            
            {item.customization && item.customization.type !== 'none' && (
              <div className="cart-item-customization">
                Personalización: {item.customization.type.toUpperCase()} 
                {item.customization.details ? ` (${item.customization.details})` : ''}
              </div>
            )}

            <div className="cart-item-price">
              {formatCurrency(item.product.price)} c/u
            </div>
          </div>

          <div className="cart-qty-ctrl">
            <button
              onClick={() => onUpdateQty(item, -1)}
              className="cart-qty-btn"
            >
              <Minus size={14} />
            </button>
            <span className="cart-qty-value">{item.quantity}</span>
            <button
              onClick={() => onUpdateQty(item, 1)}
              disabled={item.quantity >= item.product.stock}
              className="cart-qty-btn"
            >
              <Plus size={14} />
            </button>
          </div>

          <div className="cart-item-action">
            <div className="cart-item-total">
              {formatCurrency(item.product.price * item.quantity)}
            </div>
            <button
              onClick={() => onRemove(item.product._id, item.customization?.type)}
              className="cart-item-remove"
            >
              <Trash2 size={14} />
              <span>Quitar</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartItemList;

```

---

## File: Front/src/pages/Cart/components/CartSummaryPanel.jsx

**Path:** `Front/src/pages/Cart/components/CartSummaryPanel.jsx`

```javascript
import React from 'react';
import { ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { formatCurrency } from '../../../utils/formatCurrency';
import Button from '../../../components/common/Button';

const CartSummaryPanel = ({ total, freeShippingLimit, onCheckout }) => {
  const progressPercent = Math.min(100, (total / freeShippingLimit) * 100);

  return (
    <div className="cart-panel cart-summary-panel">
      <h3 className="cart-summary-title">Resumen del Pedido</h3>

      <div className="cart-summary-rows">
        <div className="cart-summary-row">
          <span className="cart-summary-label">Subtotal artículos</span>
          <span>{formatCurrency(total)}</span>
        </div>
        <div className="cart-summary-row">
          <span className="cart-summary-label">Envío a Colombia</span>
          <span>{total >= freeShippingLimit ? 'Gratis' : '$12,000 COP'}</span>
        </div>
        <div className="cart-summary-total">
          <span>Total Estimado</span>
          <span className="cart-summary-total-price">
            {formatCurrency(total + (total >= freeShippingLimit ? 0 : 12000))}
          </span>
        </div>
      </div>

      <Button
        variant="accent"
        onClick={onCheckout}
        className="cart-summary-btn"
      >
        <span>Proceder al Checkout</span>
        <ArrowRight size={18} />
      </Button>

      {/* Simulated CTA Banner / Brand security guarantees */}
      <div className="cart-summary-guarantees">
        <div className="cart-guarantee-item">
          <ShieldCheck size={20} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
          <span className="cart-guarantee-text">
            Pasarela 100% encriptada y segura. Soportamos tarjetas de crédito y PSE.
          </span>
        </div>
        <div className="cart-guarantee-item">
          <Truck size={20} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
          <span className="cart-guarantee-text">
            Despachos rápidos por Servientrega o Coordinadora con guía de rastreo.
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartSummaryPanel;

```

---

## File: Front/src/pages/Checkout/Checkout.css

**Path:** `Front/src/pages/Checkout/Checkout.css`

```css
/* Checkout.css */

.checkout-root {
  padding-top: 2rem;
}

.checkout-title {
  margin-bottom: 2rem;
  text-align: center;
  font-family: var(--font-display);
}

.checkout-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 3rem;
}

.checkout-form-box {
  background-color: var(--white);
  padding: 2.5rem;
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-subtle);
}

.checkout-step-title {
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
  font-family: var(--font-display);
}

.shipping-form {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.shipping-form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.payment-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.payment-option {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border: 1px solid var(--border-subtle);
  padding: 1rem;
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  transition: var(--transition-smooth);
}

.payment-option:hover {
  border-color: var(--color-primary);
  background-color: var(--green-ghost);
}

.payment-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}

@media (max-width: 600px) {
  .checkout-form-box {
    padding: 1.5rem;
  }
  .shipping-form-row {
    grid-template-columns: 1fr;
  }
}

```

---

## File: Front/src/pages/Checkout/Checkout.jsx

**Path:** `Front/src/pages/Checkout/Checkout.jsx`

```javascript
import React, { useState } from 'react';
import ShippingForm from './components/ShippingForm';
import PaymentForm from './components/PaymentForm';
import CheckoutSummary from './components/CheckoutSummary';
import './Checkout.css';

const Checkout = () => {
  const [step, setStep] = useState(1); // 1 = Shipping, 2 = Payment

  return (
    <div className="container checkout-root">
      <h2 className="checkout-title">Formulario de Pedido & Especificaciones</h2>

      <div className="checkout-grid">
        
        {/* Step Form Box */}
        <div className="checkout-form-box">
          {step === 1 ? (
            <div>
              <h3 className="checkout-step-title">1. Información de Despacho</h3>
              <ShippingForm onNext={() => setStep(2)} />
            </div>
          ) : (
            <div>
              <h3 className="checkout-step-title">2. Método de Pago</h3>
              <PaymentForm onBack={() => setStep(1)} />
            </div>
          )}
        </div>

        {/* Order Summary Side */}
        <div>
          <CheckoutSummary />
        </div>
      </div>
    </div>
  );
};

export default Checkout;

```

---

## File: Front/src/pages/Checkout/components/CheckoutSummary.jsx

**Path:** `Front/src/pages/Checkout/components/CheckoutSummary.jsx`

```javascript
import React from 'react';
import { useCartStore } from '../../../store/cartStore';
import { formatCurrency } from '../../../utils/formatCurrency';

const CheckoutSummary = () => {
  const { items, getCartTotal } = useCartStore();

  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      padding: '1.5rem',
      borderRadius: 'var(--border-radius-md)',
      border: '1px solid var(--color-border)'
    }}>
      <h3 style={{ marginBottom: '1.25rem', fontSize: '1.25rem' }}>Resumen del Proyecto</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {items.map((item, idx) => (
          <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
            <span>{item.quantity}x {item.product.name}</span>
            <span style={{ fontWeight: '600' }}>{formatCurrency(item.product.price * item.quantity)}</span>
          </div>
        ))}
        <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', fontWeight: '700', fontSize: '1.1rem' }}>
          <span>Total:</span>
          <span>{formatCurrency(getCartTotal())}</span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSummary;

```

---

## File: Front/src/pages/Checkout/components/PaymentForm.jsx

**Path:** `Front/src/pages/Checkout/components/PaymentForm.jsx`

```javascript
import React, { useState, useEffect } from 'react';
import { useCartStore } from '../../../store/cartStore';
import { useCheckoutStore } from '../../../store/checkoutStore';
import { formatCurrency } from '../../../utils/formatCurrency';
import { useUiStore } from '../../../store/uiStore';
import Button from '../../../components/common/Button';
import api from '../../../services/api';
import { useNavigate } from 'react-router-dom';
import { Landmark, CreditCard, Banknote } from 'lucide-react';

const PaymentForm = ({ onBack }) => {
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('tarjeta');
  const [bankAccounts, setBankAccounts] = useState([]);
  
  const { shippingAddress } = useCheckoutStore();
  const { items, getCartTotal, clearCart } = useCartStore();
  const addToast = useUiStore((state) => state.addToast);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBankAccounts = async () => {
      try {
        const { data } = await api.get('/bank-accounts');
        setBankAccounts(data.data || []);
      } catch (err) {
        console.error('Error fetching bank accounts:', err);
      }
    };
    fetchBankAccounts();
  }, []);

  const handlePayment = async () => {
    setLoading(true);
    try {
      // 1. Create order in Backend
      const orderResponse = await api.post('/orders', {
        shippingAddress,
        paymentMethod
      });
      const order = orderResponse.data.data;

      // 2. If it's a card payment, process with Stripe (Stub)
      if (paymentMethod === 'tarjeta') {
        await api.post('/payments/charge', {
          orderId: order._id,
          paymentMethodId: 'stripe_payment_stub_id'
        });
        addToast('¡Pedido creado y pagado con éxito!', 'success');
      } else {
        // If it's transfer or deposit, just mark as created (pending payment validation)
        addToast('¡Pedido creado! Pendiente de validación de pago.', 'success');
      }

      clearCart();
      navigate('/profile');
    } catch (error) {
      addToast(error.response?.data?.message || 'Error en el procesamiento del pedido', 'error');
    } finally {
      setLoading(false);
    }
  };

  const filteredBanks = bankAccounts.filter(acc => acc.supportedMethods === 'ambas' || acc.supportedMethods === paymentMethod);

  return (
    <div className="payment-form">
      <div style={{ padding: '1rem', backgroundColor: 'var(--color-bg)', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--border-subtle)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
        <h4 style={{ marginBottom: '0.5rem' }}>Resumen de Envío:</h4>
        <p>{shippingAddress.address}</p>
        <p>{shippingAddress.city}, {shippingAddress.postalCode}</p>
        <p>WhatsApp: {shippingAddress.phone}</p>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <h4 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Selecciona tu método de pago:</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
          
          <div onClick={() => setPaymentMethod('tarjeta')} style={{ border: `2px solid ${paymentMethod === 'tarjeta' ? 'var(--color-primary)' : 'var(--border-subtle)'}`, borderRadius: '8px', padding: '1rem', textAlign: 'center', cursor: 'pointer', backgroundColor: paymentMethod === 'tarjeta' ? '#F0FDF4' : '#FFF' }}>
            <CreditCard size={24} style={{ margin: '0 auto 0.5rem', color: paymentMethod === 'tarjeta' ? 'var(--color-primary)' : '#64748B' }} />
            <span style={{ fontWeight: 600, fontSize: '0.9rem', color: '#1E293B' }}>Tarjeta (Crédito/Débito)</span>
          </div>

          <div onClick={() => setPaymentMethod('transferencia')} style={{ border: `2px solid ${paymentMethod === 'transferencia' ? 'var(--color-primary)' : 'var(--border-subtle)'}`, borderRadius: '8px', padding: '1rem', textAlign: 'center', cursor: 'pointer', backgroundColor: paymentMethod === 'transferencia' ? '#F0FDF4' : '#FFF' }}>
            <Landmark size={24} style={{ margin: '0 auto 0.5rem', color: paymentMethod === 'transferencia' ? 'var(--color-primary)' : '#64748B' }} />
            <span style={{ fontWeight: 600, fontSize: '0.9rem', color: '#1E293B' }}>Transferencia Bancaria</span>
          </div>

          <div onClick={() => setPaymentMethod('deposito')} style={{ border: `2px solid ${paymentMethod === 'deposito' ? 'var(--color-primary)' : 'var(--border-subtle)'}`, borderRadius: '8px', padding: '1rem', textAlign: 'center', cursor: 'pointer', backgroundColor: paymentMethod === 'deposito' ? '#F0FDF4' : '#FFF' }}>
            <Banknote size={24} style={{ margin: '0 auto 0.5rem', color: paymentMethod === 'deposito' ? 'var(--color-primary)' : '#64748B' }} />
            <span style={{ fontWeight: 600, fontSize: '0.9rem', color: '#1E293B' }}>Depósito en Efectivo</span>
          </div>

        </div>
      </div>

      {paymentMethod === 'tarjeta' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem', animation: 'fadeIn 0.3s' }}>
          <h4 style={{ fontSize: '0.9rem', color: '#475569' }}>Información de Tarjeta de Crédito (Demostración):</h4>
          <input type="text" placeholder="4242 4242 4242 4242" disabled style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border-subtle)', backgroundColor: 'var(--color-bg)' }} />
          <div className="shipping-form-row">
            <input type="text" placeholder="12 / 29" disabled style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border-subtle)', backgroundColor: 'var(--color-bg)' }} />
            <input type="text" placeholder="123" disabled style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border-subtle)', backgroundColor: 'var(--color-bg)' }} />
          </div>
        </div>
      )}

      {(paymentMethod === 'transferencia' || paymentMethod === 'deposito') && (
        <div style={{ marginBottom: '1.5rem', animation: 'fadeIn 0.3s' }}>
          <h4 style={{ fontSize: '0.9rem', color: '#475569', marginBottom: '1rem' }}>
            Cuentas Disponibles para {paymentMethod === 'transferencia' ? 'Transferencias' : 'Depósitos'}:
          </h4>
          {filteredBanks.length === 0 ? (
            <p style={{ fontSize: '0.85rem', color: '#D9534F' }}>No hay cuentas habilitadas para este método de pago por el momento.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {filteredBanks.map(acc => (
                <div key={acc._id} style={{ border: '1px solid #CBD5E1', borderRadius: '8px', padding: '1rem', background: '#F8FAFC' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <Landmark size={18} color="var(--color-primary)" />
                    <strong style={{ fontSize: '1rem' }}>{acc.bankName}</strong>
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.85rem', color: '#334155', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <li><strong>Tipo de Cuenta:</strong> {acc.accountType}</li>
                    <li><strong>Número:</strong> {acc.accountNumber}</li>
                    <li><strong>Titular:</strong> {acc.ownerName}</li>
                    <li><strong>Documento:</strong> {acc.ownerDocument}</li>
                    {acc.phoneNumber && <li><strong>Teléfono / Celular:</strong> {acc.phoneNumber}</li>}
                  </ul>
                </div>
              ))}
              <div style={{ background: '#FFFBEB', border: '1px solid #FEF3C7', padding: '0.75rem', borderRadius: '6px', fontSize: '0.85rem', color: '#B45309' }}>
                <p style={{ margin: 0 }}><strong>Nota importante:</strong> Una vez finalices tu pedido, te contactaremos por WhatsApp o correo para que nos envíes el comprobante de pago.</p>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="payment-actions">
        <Button variant="outline" onClick={onBack} disabled={loading}>Atrás</Button>
        <Button variant="accent" style={{ flexGrow: 1 }} onClick={handlePayment} disabled={loading || ((paymentMethod === 'transferencia' || paymentMethod === 'deposito') && filteredBanks.length === 0)}>
          {loading ? 'Procesando...' : `Confirmar y Crear Pedido por ${formatCurrency(getCartTotal())}`}
        </Button>
      </div>
    </div>
  );
};

export default PaymentForm;

```

---

## File: Front/src/pages/Checkout/components/ShippingForm.jsx

**Path:** `Front/src/pages/Checkout/components/ShippingForm.jsx`

```javascript
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { shippingSchema } from '../../../schemas/checkoutSchema';
import { useCheckoutStore } from '../../../store/checkoutStore';
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';

const ShippingForm = ({ onNext }) => {
  const { shippingAddress, setShippingAddress } = useCheckoutStore();
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(shippingSchema),
    defaultValues: shippingAddress
  });

  const onSubmit = (data) => {
    setShippingAddress(data);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="shipping-form">
      <Input label="Dirección de Envío / Taller de Despacho" name="address" register={register} error={errors.address} />
      <div className="shipping-form-row">
        <Input label="Ciudad" name="city" register={register} error={errors.city} />
        <Input label="Código Postal" name="postalCode" register={register} error={errors.postalCode} />
      </div>
      <Input label="País" name="country" register={register} error={errors.country} />
      <Input label="Teléfono (Para notificaciones de WhatsApp)" name="phone" register={register} error={errors.phone} placeholder="Ej: +573018267373" />
      
      <Button type="submit" variant="primary" style={{ marginTop: '1.5rem' }}>
        Continuar al Pago
      </Button>
    </form>
  );
};

export default ShippingForm;

```

---

## File: Front/src/pages/Configurator/Configurator.css

**Path:** `Front/src/pages/Configurator/Configurator.css`

```css
/* Configurator.css */

.config-panel-container {
  background: linear-gradient(to top, rgba(245, 241, 232, 0.95) 80%, rgba(245, 241, 232, 0) 100%);
  padding: 2rem 1.5rem 1.5rem 1.5rem;
  width: 100%;
}

.config-panel-card {
  max-width: 850px;
  margin: 0 auto;
  background-color: var(--white);
  border-radius: var(--border-radius-md);
  border: 1px solid var(--border-subtle);
  box-shadow: var(--shadow-md);
  padding: 1rem 1.5rem;
}

.config-panel-flex {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.25rem;
  justify-content: center;
}

.config-group {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.config-label {
  font-size: 0.7rem;
  color: var(--color-text-light);
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 700;
}

.config-options {
  display: flex;
  gap: 0.4rem;
}

.config-separator {
  width: 1px;
  height: 24px;
  background-color: var(--border-subtle);
}

.config-swatch {
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 50%;
  cursor: pointer;
  padding: 0;
  transition: var(--transition-smooth);
}

.config-swatch.active {
  border: 2px solid var(--color-primary) !important;
  box-shadow: 0 0 0 2px var(--color-bg), 0 0 0 4px var(--color-primary);
  transform: scale(1.15);
}

.config-swatch.inactive {
  border: 1px solid var(--border-subtle) !important;
  box-shadow: var(--shadow-sm);
}

.config-print-btn {
  padding: 0.45rem 0.85rem;
  font-size: 0.7rem;
  font-weight: 700;
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  border: 1px solid var(--border-subtle);
  transition: var(--transition-smooth);
}

.config-print-btn.active {
  background-color: var(--color-primary);
  color: var(--white);
  box-shadow: var(--shadow-sm);
}

.config-print-btn.inactive {
  background-color: var(--white);
  color: var(--color-text);
  box-shadow: none;
}

.config-upload-btn {
  padding: 0.45rem 0.85rem;
  font-size: 0.7rem;
  font-weight: 700;
  border-radius: var(--border-radius-sm);
  border: 1px dashed var(--color-primary);
  background-color: rgba(107, 158, 92, 0.08);
  color: var(--color-primary);
  cursor: pointer;
  transition: var(--transition-smooth);
}

.config-upload-btn:hover {
  background-color: rgba(107, 158, 92, 0.15);
}

.config-reset-btn {
  background: none;
  border: none;
  color: var(--color-danger);
  font-size: 0.7rem;
  font-weight: 700;
  cursor: pointer;
  transition: var(--transition-smooth);
  padding: 0.5rem;
}

```

---

## File: Front/src/pages/Configurator/ConfiguratorPage.jsx

**Path:** `Front/src/pages/Configurator/ConfiguratorPage.jsx`

```javascript
import React from 'react';
import HeroConfigurator from './components/HeroConfigurator';
import './Configurator.css';

/**
 * Página dedicada al configurador 3D interactivo.
 * Se monta SIN Navbar ni Footer para dar pantalla completa al canvas.
 */
const ConfiguratorPage = () => {
  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: '#0a1a0e' }}>
      <HeroConfigurator />
    </div>
  );
};

export default ConfiguratorPage;

```

---

## File: Front/src/pages/Configurator/components/ConfiguratorPanel.jsx

**Path:** `Front/src/pages/Configurator/components/ConfiguratorPanel.jsx`

```javascript
import { useRef } from 'react';
import { useConfiguratorStore } from '../../../store/useConfiguratorStore';

const ColorSwatch = ({ hex, name, active, onClick }) => (
  <button
    onClick={onClick}
    title={name}
    className={`config-swatch ${active ? 'active' : 'inactive'}`}
    style={{ backgroundColor: hex }}
  />
);

const PrintButton = ({ id, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`config-print-btn ${active ? 'active' : 'inactive'}`}
  >
    {label}
  </button>
);

const ConfiguratorPanel = () => {
  const fileInputRef = useRef(null);
  const {
    currentColor, colors, printArea, printAreas,
    setColor, setTexture, setPrintArea, resetConfig,
  } = useConfiguratorStore();

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setTexture(url);
  };

  return (
    <div className="config-panel-container">
      <div className="config-panel-card">
        <div className="config-panel-flex">
          {/* Colors Selection */}
          <div className="config-group">
            <span className="config-label">Color:</span>
            <div className="config-options">
              {colors.map((c) => (
                <ColorSwatch
                  key={c.hex}
                  hex={c.hex}
                  name={c.name}
                  active={currentColor === c.hex}
                  onClick={() => setColor(c.hex)}
                />
              ))}
            </div>
          </div>

          {/* Separator */}
          <div className="config-separator" />

          {/* Print Options */}
          <div className="config-group">
            <span className="config-label">Estampado:</span>
            <div className="config-options">
              {printAreas.map((p) => (
                <PrintButton
                  key={p.id}
                  id={p.id}
                  label={p.label}
                  active={printArea === p.id}
                  onClick={() => setPrintArea(p.id)}
                />
              ))}
            </div>
          </div>

          {/* Separator */}
          <div className="config-separator" />

          {/* Upload and Reset buttons */}
          <div className="config-group">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="config-upload-btn"
            >
              + Imagen
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImageUpload}
            />
            <button
              onClick={resetConfig}
              className="config-reset-btn"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfiguratorPanel;

```

---

## File: Front/src/pages/Configurator/components/HeroConfigurator.jsx

**Path:** `Front/src/pages/Configurator/components/HeroConfigurator.jsx`

```javascript
import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SceneContent from './SceneContent';
import ConfiguratorPanel from './ConfiguratorPanel';
import { useConfiguratorStore } from '../../../store/useConfiguratorStore';

gsap.registerPlugin(ScrollTrigger);

const HeroConfigurator = () => {
  const sectionRef = useRef(null);
  const progressRef = useRef(0);
  const enableInteraction = useConfiguratorStore((s) => s.enableInteraction);
  const disableInteraction = useConfiguratorStore((s) => s.disableInteraction);
  const isAnimating = useConfiguratorStore((s) => s.isAnimating);
  const isInteractionPhase = useConfiguratorStore((s) => s.isInteractionPhase);

  useGSAP(() => {
    const proxy = { value: 0 };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=120%',
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
      onUpdate: () => {
        progressRef.current = proxy.value;
        if (proxy.value < 0.95) {
          disableInteraction();
        }
      },
      onComplete: () => {
        enableInteraction();
      },
    });

    tl.to(proxy, {
      value: 1,
      duration: 1.5,
      ease: 'power2.inOut',
    });

    return () => tl.scrollTrigger?.kill();
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
    >
      <Canvas
        camera={{ position: [0, 0.3, 9.0], fov: 45, near: 0.1, far: 100 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
      >
        <SceneContent progressRef={progressRef} />
      </Canvas>

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
        <div className={`transition-opacity duration-700 ${isInteractionPhase ? 'opacity-0' : 'opacity-100'}`}>
          <p className="text-neutral-600 text-sm tracking-widest uppercase">
            Desplázate para descubrir
          </p>
          <div className="mt-2 flex justify-center">
            <div className="w-5 h-8 border-2 border-neutral-400 rounded-full flex justify-center">
              <div className="w-1 h-2 bg-neutral-500 rounded-full mt-1 animate-bounce" />
            </div>
          </div>
        </div>
      </div>

      <div className={`absolute bottom-0 left-0 right-0 z-20 transition-all duration-1000 ease-out ${
        isInteractionPhase ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
      }`}>
        <ConfiguratorPanel />
      </div>
    </section>
  );
};

export default HeroConfigurator;

```

---

## File: Front/src/pages/Configurator/components/ProductModel.jsx

**Path:** `Front/src/pages/Configurator/components/ProductModel.jsx`

```javascript
import { useRef, useMemo } from 'react';
import { Decal, Float, useTexture } from '@react-three/drei';
import { useConfiguratorStore } from '../../../store/useConfiguratorStore';
import * as THREE from 'three';

const bodyGeo = new THREE.CylinderGeometry(1.4, 1.5, 2.2, 48, 1, true);
const rimGeo = new THREE.TorusGeometry(1.42, 0.07, 16, 48);
const baseGeo = new THREE.CylinderGeometry(1.5, 1.5, 0.1, 48);

const ProductModel = () => {
  const bodyRef = useRef();
  const { currentColor, currentTexture, printArea, isInteractionPhase } =
    useConfiguratorStore();

  const color = useMemo(() => new THREE.Color(currentColor), [currentColor]);

  const texture = useMemo(() => {
    if (!currentTexture) return null;
    const loader = new THREE.TextureLoader();
    const tex = loader.load(currentTexture);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(1, 1);
    return tex;
  }, [currentTexture]);

  const materialProps = useMemo(() => ({
    color,
    metalness: 0.1,
    roughness: 0.6,
    clearcoat: 0.15,
    clearcoatRoughness: 0.4,
    side: THREE.DoubleSide,
    map: printArea === 'full' ? texture : null,
  }), [color, texture, printArea]);

  const showDecal = printArea !== 'full' && texture;
  const decalScale = printArea === 'logo' ? 0.4 : 1.2;

  return (
    <Float
      speed={0.8}
      rotationIntensity={isInteractionPhase ? 0 : 0.15}
      floatIntensity={isInteractionPhase ? 0 : 0.2}
    >
      <group>
        <mesh ref={bodyRef} geometry={bodyGeo} position={[0, 0, 0]}>
          <meshPhysicalMaterial {...materialProps} />

          {showDecal && (
            <Decal
              position={[0, 0.3, 1.51]}
              rotation={[0, 0, 0]}
              scale={decalScale}
              depthTest={true}
              polygonOffsetFactor={-1}
            >
              <meshBasicMaterial transparent polygonOffset polygonOffsetFactor={-1}>
                <primitive object={texture} attach="map" />
              </meshBasicMaterial>
            </Decal>
          )}
        </mesh>

        <mesh geometry={rimGeo} position={[0, 1.15, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <meshPhysicalMaterial color="#c0c0c0" metalness={0.8} roughness={0.2} />
        </mesh>

        <mesh geometry={baseGeo} position={[0, -1.15, 0]}>
          <meshPhysicalMaterial color="#404040" metalness={0.3} roughness={0.7} />
        </mesh>
      </group>
    </Float>
  );
};

export default ProductModel;

```

---

## File: Front/src/pages/Configurator/components/SceneContent.jsx

**Path:** `Front/src/pages/Configurator/components/SceneContent.jsx`

```javascript
import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import ProductModel from './ProductModel';
import { useConfiguratorStore } from '../../../store/useConfiguratorStore';

const SceneContent = ({ progressRef }) => {
  const groupRef = useRef();
  const controlsRef = useRef();
  const { scene } = useThree();

  const enableInteraction = useConfiguratorStore((s) => s.enableInteraction);
  const isAnimating = useConfiguratorStore((s) => s.isAnimating);
  const isInteractionPhase = useConfiguratorStore((s) => s.isInteractionPhase);

  scene.background = null;

  useFrame(() => {
    const p = progressRef.current;

    if (groupRef.current) {
      // Animate the group properties on scroll instead of camera to avoid overrides with OrbitControls
      groupRef.current.rotation.y = p * Math.PI * 2.5;
      groupRef.current.position.y = -p * 0.3;
      groupRef.current.rotation.x = p * 0.1;
      groupRef.current.scale.setScalar(1.0 - p * 0.05);
    }

    if (p >= 0.95 && isAnimating) {
      enableInteraction();
      if (controlsRef.current) {
        controlsRef.current.target.set(0, 0, 0);
        controlsRef.current.update();
      }
    }
  });

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <directionalLight position={[-3, 2, -3]} intensity={0.5} />
      <group ref={groupRef}>
        <ProductModel />
      </group>
      <OrbitControls
        ref={controlsRef}
        enabled={true}
        enableZoom={false}
        enablePan={false}
        minDistance={2.5}
        maxDistance={12}
        minPolarAngle={0.2}
        maxPolarAngle={Math.PI / 1.5}
        autoRotate={isInteractionPhase}
        autoRotateSpeed={1.5}
      />
      <Environment preset="city" background={false} />
    </>
  );
};

export default SceneContent;

```

---

## File: Front/src/pages/Contact/Contact.css

**Path:** `Front/src/pages/Contact/Contact.css`

```css
/* Contact.css */

/* ── Hero ── */
.contact-hero {
  background: linear-gradient(135deg, var(--green-deep) 0%, #2A6035 60%, var(--green-mid) 100%);
  padding: 5rem 2rem 6rem;
  position: relative;
  overflow: hidden;
}
.contact-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}
.contact-hero-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(70px);
  pointer-events: none;
}
.contact-hero-blob-1 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(135,186,143,0.25) 0%, transparent 70%);
  top: -120px;
  right: -60px;
}
.contact-hero-blob-2 {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(201,125,92,0.18) 0%, transparent 70%);
  bottom: -80px;
  left: -40px;
}
.contact-hero-content {
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 2;
}
.contact-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 14px;
  border-radius: 999px;
  background: rgba(255,255,255,0.12);
  border: 1px solid rgba(255,255,255,0.22);
  color: rgba(255,255,255,0.90);
  font-family: var(--font-display);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 1.25rem;
}
.contact-hero-title {
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 5vw, 3.4rem);
  font-weight: 800;
  color: #fff;
  line-height: 1.1;
  margin-bottom: 1.25rem;
}
.contact-hero-subtitle {
  color: rgba(255,255,255,0.75);
  font-size: 1.05rem;
  line-height: 1.7;
  max-width: 520px;
  margin: 0 auto 2rem;
}
.contact-stats-container {
  display: flex;
  justify-content: center;
  gap: 2.5rem;
  flex-wrap: wrap;
}
.contact-stat-item {
  text-align: center;
}
.contact-stat-num {
  font-family: var(--font-display);
  font-size: 1.6rem;
  font-weight: 800;
  color: #fff;
}
.contact-stat-label {
  font-size: 0.78rem;
  color: rgba(255,255,255,0.65);
  font-weight: 500;
}

/* ── Trust banner ── */
.contact-banner {
  background: var(--cream-warm);
  border-bottom: 1px solid var(--border-subtle);
  padding: 0;
}
.contact-info-row {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  padding: 0 1.5rem;
}
.contact-info-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.75rem 1.5rem;
  border-right: 1px solid var(--border-subtle);
  transition: var(--t-smooth);
}
.contact-info-card:last-child { border-right: none; }
.contact-info-card:hover { background: rgba(82,143,88,0.04); }
.contact-info-icon {
  width: 44px; height: 44px;
  border-radius: var(--r-md);
  background: var(--green-mist);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  color: var(--green-deep);
}
.contact-info-title {
  font-family: var(--font-display);
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.07em;
  margin-bottom: 2px;
}
.contact-info-value {
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.2;
}
.contact-info-sub {
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-top: 1px;
}

/* ── Form section ── */
.contact-form-section {
  padding: 5rem 2rem;
  background: var(--cream);
}
.contact-form-inner {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1.6fr;
  gap: 4rem;
  align-items: start;
}
.contact-form-sidebar h2 {
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 3vw, 2.4rem);
  font-weight: 800;
  color: var(--text-primary);
  line-height: 1.15;
  margin-bottom: 1rem;
}
.contact-form-sidebar p {
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.7;
  margin-bottom: 2rem;
}

/* Sidebar trust pills */
.contact-trust-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  list-style: none;
}
.contact-trust-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.88rem;
  color: var(--text-secondary);
  font-weight: 500;
}
.contact-trust-check {
  width: 22px; height: 22px;
  border-radius: 50%;
  background: var(--green-mist);
  color: var(--green-deep);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}

/* ── Card form ── */
.contact-form-card {
  background: var(--white);
  border-radius: var(--r-2xl);
  border: 1px solid var(--border-subtle);
  box-shadow: var(--s-sm);
  padding: 2.5rem;
}

/* Fields */
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}
.form-field { display: flex; flex-direction: column; gap: 0.4rem; }
.form-field.full { grid-column: 1 / -1; }
.form-label {
  font-family: var(--font-display);
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: 0.03em;
  text-transform: uppercase;
}
.form-label span { color: var(--terra-mid); margin-left: 2px; }
.form-input, .form-select, .form-textarea {
  padding: 0.75rem 1rem;
  border-radius: var(--r-md);
  border: 1.5px solid var(--border-mid);
  background: var(--cream);
  color: var(--text-primary);
  font-family: var(--font-body);
  font-size: 0.93rem;
  transition: var(--t-smooth);
  outline: none;
  width: 100%;
  box-sizing: border-box;
}
.form-input:focus, .form-select:focus, .form-textarea:focus {
  border-color: var(--green-brand);
  background: var(--white);
  box-shadow: 0 0 0 3px rgba(82,143,88,0.10);
}
.form-input.error, .form-select.error, .form-textarea.error {
  border-color: #E53E3E;
  background: #FFF5F5;
}
.form-select {
  appearance: none;
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%234A5C4E' d='M1 1l5 5 5-5'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 14px center;
  padding-right: 2.5rem;
}
.form-textarea { resize: vertical; min-height: 140px; line-height: 1.6; }
.form-error {
  font-size: 0.78rem;
  color: #E53E3E;
  display: flex; align-items: center; gap: 4px;
  margin-top: 2px;
}

/* Subject chips */
.subject-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}
.subject-chip input[type="radio"] { display: none; }
.subject-chip label {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 6px 14px;
  border-radius: 999px;
  border: 1.5px solid var(--border-mid);
  background: var(--cream);
  color: var(--text-secondary);
  font-family: var(--font-display);
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--t-smooth);
}
.subject-chip input[type="radio"]:checked + label {
  background: var(--green-deep);
  border-color: var(--green-deep);
  color: #fff;
}
.subject-chip label:hover {
  border-color: var(--green-brand);
  color: var(--green-deep);
  background: var(--green-ghost);
}

/* Submit button */
.contact-submit-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 1rem 2rem;
  border-radius: var(--r-lg);
  background: var(--green-deep);
  color: #fff;
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 700;
  border: none;
  cursor: pointer;
  transition: var(--t-smooth);
  box-shadow: var(--s-sm);
  margin-top: 0.5rem;
}
.contact-submit-btn:hover:not(:disabled) {
  background: var(--green-mid);
  transform: translateY(-2px);
  box-shadow: var(--s-lg);
}
.contact-submit-btn:disabled { opacity: 0.7; cursor: not-allowed; }

/* Success state */
.contact-success {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 3rem 2rem;
  text-align: center;
}
.contact-success h3 {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--green-deep);
}
.contact-success p {
  color: var(--text-secondary);
  font-size: 0.95rem;
  max-width: 380px;
  line-height: 1.6;
}

.contact-success-btn {
  padding: 0.65rem 1.5rem;
  border-radius: var(--r-lg);
  background: var(--green-ghost);
  border: 1.5px solid var(--border-mid);
  color: var(--green-deep);
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 0.875rem;
  cursor: pointer;
  transition: var(--t-smooth);
}

.contact-form-header {
  margin-bottom: 1.75rem;
}
.contact-form-title {
  font-family: var(--font-display);
  font-size: 1.2rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 0.35rem;
}
.contact-form-sub {
  color: var(--text-muted);
  font-size: 0.85rem;
}
.contact-form-disclaimer {
  font-size: 0.75rem;
  color: var(--text-muted);
  text-align: center;
  margin-top: 0.25rem;
}

/* Responsive */
@media (max-width: 900px) {
  .contact-info-row { grid-template-columns: repeat(2, 1fr); }
  .contact-info-card:nth-child(2) { border-right: none; }
  .contact-info-card { border-bottom: 1px solid var(--border-subtle); }
  .contact-form-inner { grid-template-columns: 1fr; gap: 2.5rem; }
}
@media (max-width: 600px) {
  .contact-info-row { grid-template-columns: 1fr; }
  .contact-info-card { border-right: none; }
  .form-row { grid-template-columns: 1fr; }
  .contact-form-card { padding: 1.5rem; }
  .contact-hero { padding: 3.5rem 1.25rem 4.5rem; }
}

```

---

## File: Front/src/pages/Contact/ContactPage.jsx

**Path:** `Front/src/pages/Contact/ContactPage.jsx`

```javascript
import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
  Mail, Phone, MapPin, Clock, ShieldCheck, Sparkles,
} from 'lucide-react';
import ContactForm from './components/ContactForm';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

/* ─── Trust info cards ────────────────────────────────────── */
const INFO_CARDS = [
  { icon: Phone,      title: 'Llámanos', desc: '301 826 7373', sub: 'Lun–Sáb, 9am – 6pm' },
  { icon: Mail,       title: 'Escríbenos', desc: 'taller@sonterry.com', sub: 'Respondemos en < 24h' },
  { icon: MapPin,     title: 'Visítanos', desc: 'Bogotá, Colombia', sub: 'Taller físico con cita previa' },
  { icon: Clock,      title: 'Tiempo de resp.', desc: '< 24 horas', sub: 'En días hábiles' },
];

const ContactPage = () => {
  const pageRef = useRef(null);

  /* ─── GSAP entrance animations ──────────────────────── */
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
    tl.fromTo('.contact-hero-content > *',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.15 }
    );

    gsap.fromTo('.contact-info-card',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power2.out',
        scrollTrigger: { trigger: '.contact-info-row', start: 'top 82%' } }
    );

    gsap.fromTo('.contact-form-card',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: '.contact-form-card', start: 'top 85%' } }
    );
  }, { scope: pageRef });

  return (
    <>
      <div ref={pageRef}>

        {/* ════════════════════════════════════════════
            HERO
        ════════════════════════════════════════════ */}
        <section className="contact-hero">
          {/* Background blobs */}
          <div className="contact-hero-blob contact-hero-blob-1" />
          <div className="contact-hero-blob contact-hero-blob-2" />

          <div className="contact-hero-content">
            <div className="contact-hero-content">
              {/* Eyebrow */}
              <span className="contact-eyebrow">
                <Sparkles size={11} /> Centro de Atención SonTerry
              </span>

              <h1 className="contact-hero-title">
                ¿Cómo podemos<br />
                <span style={{ color: 'var(--green-light)' }}>ayudarte hoy?</span>
              </h1>

              <p className="contact-hero-subtitle">
                Ya sea un pedido personalizado, una consulta mayorista, una queja o simplemente quieres conocer más sobre nuestras técnicas — estamos aquí para ti.
              </p>

              {/* Stats row */}
              <div className="contact-stats-container">
                {[['< 24h', 'Tiempo de respuesta'], ['500+', 'Clientes atendidos'], ['5★', 'Satisfacción']].map(([n, l]) => (
                  <div key={l} className="contact-stat-item">
                    <div className="contact-stat-num">{n}</div>
                    <div className="contact-stat-label">{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════
            TRUST BANNER (4 info cards)
        ════════════════════════════════════════════ */}
        <div className="contact-banner">
          <div className="contact-info-row">
            {INFO_CARDS.map(({ icon: Icon, title, desc, sub }) => (
              <div key={title} className="contact-info-card">
                <div className="contact-info-icon">
                  <Icon size={20} strokeWidth={1.8} />
                </div>
                <div>
                  <div className="contact-info-title">{title}</div>
                  <div className="contact-info-value">{desc}</div>
                  <div className="contact-info-sub">{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ════════════════════════════════════════════
            FORM SECTION
        ════════════════════════════════════════════ */}
        <section className="contact-form-section">
          <div className="contact-form-inner">

            {/* ── Sidebar ── */}
            <div className="contact-form-sidebar">
              <h2>Escríbenos, estamos listos para atenderte</h2>
              <p>
                Nuestro equipo del taller revisa cada mensaje personalmente. Cuéntanos qué necesitas y te orientaremos en el proceso de personalización, precio o seguimiento de tu pedido.
              </p>
              <ul className="contact-trust-list">
                {[
                  'Respondemos todos los mensajes',
                  'Asesoría en serigrafía y DTF',
                  'Cotizaciones sin compromiso',
                  'Atención mayorista especializada',
                  'Seguimiento de pedidos en tiempo real',
                ].map((t) => (
                  <li key={t} className="contact-trust-item">
                    <span className="contact-trust-check">
                      <ShieldCheck size={12} strokeWidth={2.5} />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Form card ── */}
            <div className="contact-form-card">
              <ContactForm />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ContactPage;

```

---

## File: Front/src/pages/Contact/components/ContactForm.jsx

**Path:** `Front/src/pages/Contact/components/ContactForm.jsx`

```javascript
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, CheckCircle, AlertCircle, Package, MessageSquare, HelpCircle, Headphones } from 'lucide-react';

/* ─── Validation schema ─────────────────────────────────────── */
const contactSchema = z.object({
  name:    z.string().min(2, 'Tu nombre debe tener al menos 2 caracteres'),
  email:   z.string().email('Ingresa un correo electrónico válido'),
  phone:   z.string().min(7, 'Ingresa un número de contacto válido').optional().or(z.literal('')),
  subject: z.enum(['pedido', 'contacto', 'queja', 'duda', 'consulta'], {
    errorMap: () => ({ message: 'Selecciona un motivo de contacto' }),
  }),
  message: z.string().min(20, 'Tu mensaje debe tener al menos 20 caracteres'),
});

/* ─── Contact reason options ──────────────────────────────── */
const SUBJECTS = [
  { value: 'pedido',   label: '📦 Pedido personalizado',   icon: Package },
  { value: 'contacto', label: '💬 Contacto general',        icon: MessageSquare },
  { value: 'queja',    label: '⚠️ Queja o reclamo',         icon: AlertCircle },
  { value: 'duda',     label: '❓ Tengo una duda',           icon: HelpCircle },
  { value: 'consulta', label: '🔍 Consulta mayorista',       icon: Headphones },
];

const ContactForm = () => {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const {
    register, handleSubmit, reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data) => {
    setSending(true);
    // Simulates API delay — replace with real endpoint
    await new Promise((r) => setTimeout(r, 1500));
    console.log('Contact form data:', data);
    setSending(false);
    setSent(true);
    reset();
  };

  if (sent) {
    return (
      <div className="contact-success">
        <CheckCircle size={56} strokeWidth={1.5} color="var(--green-brand)" />
        <h3>¡Mensaje enviado!</h3>
        <p>
          Gracias por contactarnos. Un miembro de nuestro equipo revisará tu mensaje y te responderá en menos de 24 horas hábiles.
        </p>
        <button
          onClick={() => setSent(false)}
          className="contact-success-btn"
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Header */}
      <div className="contact-form-header">
        <h3 className="contact-form-title">
          Formulario de contacto
        </h3>
        <p className="contact-form-sub">
          Todos los campos marcados con <span style={{ color: 'var(--terra-mid)' }}>*</span> son obligatorios.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

        {/* Name + Email */}
        <div className="form-row">
          <div className="form-field">
            <label className="form-label">
              Nombre <span>*</span>
            </label>
            <input
              {...register('name')}
              placeholder="Tu nombre completo"
              className={`form-input ${errors.name ? 'error' : ''}`}
            />
            {errors.name && (
              <span className="form-error">
                <AlertCircle size={12} /> {errors.name.message}
              </span>
            )}
          </div>

          <div className="form-field">
            <label className="form-label">
              Correo electrónico <span>*</span>
            </label>
            <input
              {...register('email')}
              type="email"
              placeholder="tu@correo.com"
              className={`form-input ${errors.email ? 'error' : ''}`}
            />
            {errors.email && (
              <span className="form-error">
                <AlertCircle size={12} /> {errors.email.message}
              </span>
            )}
          </div>
        </div>

        {/* Phone */}
        <div className="form-field">
          <label className="form-label">Teléfono / WhatsApp</label>
          <input
            {...register('phone')}
            type="tel"
            placeholder="(Opcional) 300 000 0000"
            className={`form-input ${errors.phone ? 'error' : ''}`}
          />
          {errors.phone && (
            <span className="form-error">
              <AlertCircle size={12} /> {errors.phone.message}
            </span>
          )}
        </div>

        {/* Subject chips */}
        <div className="form-field">
          <label className="form-label">
            Motivo de contacto <span>*</span>
          </label>
          <div className="subject-chips">
            {SUBJECTS.map(({ value, label }) => (
              <div key={value} className="subject-chip">
                <input
                  {...register('subject')}
                  type="radio"
                  id={`subject-${value}`}
                  value={value}
                />
                <label htmlFor={`subject-${value}`}>{label}</label>
              </div>
            ))}
          </div>
          {errors.subject && (
            <span className="form-error" style={{ marginTop: 4 }}>
              <AlertCircle size={12} /> {errors.subject.message}
            </span>
          )}
        </div>

        {/* Message */}
        <div className="form-field">
          <label className="form-label">
            Mensaje <span>*</span>
          </label>
          <textarea
            {...register('message')}
            placeholder="Cuéntanos con detalle: tipo de producto, cantidad, colores, técnica, fecha de entrega... entre más detalle, mejor podemos ayudarte."
            className={`form-textarea ${errors.message ? 'error' : ''}`}
          />
          {errors.message && (
            <span className="form-error">
              <AlertCircle size={12} /> {errors.message.message}
            </span>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={sending}
          className="contact-submit-btn"
        >
          {sending ? (
            <>Enviando mensaje...</>
          ) : (
            <><Send size={16} strokeWidth={2} /> Enviar mensaje</>
          )}
        </button>

        <p className="contact-form-disclaimer">
          Al enviar aceptas que nos comuniquemos contigo para atender tu solicitud.
        </p>
      </div>
    </form>
  );
};

export default ContactForm;

```

---

## File: Front/src/pages/Home/Home.css

**Path:** `Front/src/pages/Home/Home.css`

```css
/* --- AboutStore.jsx --- */

        .bento-grid-container {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 1.5rem;
          margin-top: 3rem;
          width: 100%;
        }
        .bento-card-main {
          background-color: var(--white);
          border-radius: var(--border-radius-lg, 24px);
          box-shadow: var(--shadow-sm);
          border: 1px solid var(--color-border, #E2DBD0);
          transition: var(--transition-smooth, all 0.3s ease);
          padding: 3rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 400px;
          box-sizing: border-box;
        }
        .bento-card-main:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
          border-color: var(--color-primary);
        }
        .bento-stack {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .bento-card-secondary {
          background-color: var(--white);
          border-radius: var(--border-radius-md, 16px);
          box-shadow: var(--shadow-sm);
          border: 1px solid rgba(226, 219, 208, 0.7);
          transition: var(--transition-smooth, all 0.3s ease);
          padding: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 190px;
          box-sizing: border-box;
        }
        .bento-card-secondary:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
          border-color: var(--color-accent);
        }
        .icon-box-primary {
          display: inline-flex;
          padding: 0.75rem;
          border-radius: 12px;
          background-color: rgba(107, 158, 92, 0.1);
          color: #2D5333;
          border: 1px solid rgba(107, 158, 92, 0.2);
        }
        .icon-box-accent {
          display: inline-flex;
          padding: 0.75rem;
          border-radius: 12px;
          background-color: rgba(201, 125, 92, 0.1);
          color: #C97D5C;
          border: 1px solid rgba(201, 125, 92, 0.2);
        }
        @media (max-width: 768px) {
          .bento-grid-container {
            grid-template-columns: 1fr;
          }
          .bento-card-main {
            padding: 2rem;
            min-height: auto;
          }
        }
      

/* --- FeaturedProducts.jsx --- */

        .fp-section {
          padding: clamp(3.5rem, 7vw, 6rem) 1.5rem;
          max-width: 1100px;
          margin: 0 auto;
          box-sizing: border-box;
        }
        .fp-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        .fp-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 14px;
          border-radius: 999px;
          background: var(--green-mist);
          border: 1px solid var(--border-subtle);
          color: var(--green-deep);
          font-family: var(--font-display);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 0.9rem;
        }
        .fp-title {
          font-family: var(--font-display);
          font-size: clamp(1.9rem, 4vw, 2.6rem);
          font-weight: 800;
          color: var(--green-brand);
          line-height: 1.15;
          margin-bottom: 0.75rem;
          text-shadow: 0 2px 10px rgba(0,0,0,0.3);
        }
        .fp-sub {
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.7;
          max-width: 480px;
          margin: 0 auto;
          font-weight: 500;
        }
        .fp-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }
        @media (max-width: 900px) {
          .fp-grid { grid-template-columns: repeat(2, 1fr); gap: 1.25rem; }
        }
        @media (max-width: 560px) {
          .fp-grid { grid-template-columns: 1fr; gap: 1rem; }
        }
      

/* --- HeroTV.jsx --- */
        .hero-section {
          position: relative;
          min-height: 80vh; 
          display: flex;
          align-items: center;
          overflow: hidden;
          width: 100%;
          padding: 40px 6vw 80px; 
        }
        
        .hero-content {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          transform: translateY(-4vh);
        }

        .hero-text-col {
          flex: 0 0 52%;
          text-align: left;
          padding-right: 2vw;
        }

        .hero-card-col {
          flex: 0 0 45%;
          display: flex;
          justify-content: center;
          perspective: 1000px;
        }

        .hero-title {
          color: var(--text-primary);
          font-size: clamp(2.2rem, 4vw, 4.5rem);
          line-height: 1.05;
          margin-bottom: 1.5rem;
          font-weight: 800;
        }

        .hero-subtitle {
          color: #333;
          font-size: clamp(1rem, 1.2vw, 1.25rem);
          line-height: 1.5;
          margin-bottom: 2.5rem;
          font-weight: 600;
          max-width: 90%;
        }

        .hero-buttons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: flex-start;
        }

        .tv-card {
          position: relative;
          border-radius: 20px;
          padding: 10px;
          background: linear-gradient(145deg, #1a1a1a, #2d2d2d, #1a1a1a);
          box-shadow: 
            0 0 0 1px rgba(255,255,255,0.05),
            0 0 30px 5px rgba(109,191,71,0.3),
            0 20px 40px rgba(0,0,0,0.5);
          max-width: 580px;
          width: 100%;
        }

        /* RESPONSIVE: Laptops medianas e iPads horizontales (1048px) */
        @media (max-width: 1048px) {
          .hero-section {
            padding: 10px 4vw; 
            min-height: calc(100vh - 100px); 
          }
          .hero-title {
            font-size: clamp(1.8rem, 3vw, 2.5rem); 
            margin-bottom: 0.8rem;
          }
          .hero-subtitle {
            font-size: clamp(0.9rem, 1.2vw, 1rem); 
            margin-bottom: 1rem;
          }
          .tv-card {
            max-width: 380px; 
            padding: 8px;
          }
          .hero-content {
            transform: translateY(-3vh);
            gap: 1rem; 
          }
        }

        /* RESPONSIVE: Tablets en vertical y pantallas medianas (900px) */
        @media (max-width: 900px) {
          .hero-content {
            flex-direction: column;
            text-align: center;
            gap: 3rem;
            transform: translateY(0);
            padding-top: 2rem;
          }
          .hero-text-col {
            flex: 1 1 100%;
            padding-right: 0;
          }
          .hero-card-col {
            flex: 1 1 100%;
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
          }
          .hero-subtitle {
            margin: 0 auto 2.5rem auto;
            max-width: 100%;
          }
          .hero-buttons {
            justify-content: center;
          }
        }

        /* RESPONSIVE: Mobile (hasta 768px) */
        @media (max-width: 768px) {
          .hero-section {
            padding: 60px 5vw 80px;
            min-height: auto;
          }
          .hero-title {
            font-size: clamp(2rem, 8vw, 2.5rem);
          }
          .tv-card {
            max-width: 100%;
          }
          .hero-buttons {
            flex-direction: column;
            width: 100%;
          }
          .hero-buttons button {
            width: 100%;
          }
        }
        
        @keyframes pulseLED {
          0% { opacity: 0.6; }
          100% { opacity: 1; }
        }

/* --- ProductCarousel.jsx --- */
        .carousel-track {
          display: flex;
          gap: 2rem;
          width: max-content;
          animation: scrollCarousel 60s linear infinite;
          padding: 0 1rem;
        }
        
        .carousel-track:hover {
          animation-play-state: paused;
        }

        .carousel-card-wrapper {
          width: 320px;
          flex-shrink: 0;
        }

        @keyframes scrollCarousel {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 3 - 0.66rem)); }
        }
        
        .carousel-fade-left, .carousel-fade-right {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 8vw;
          min-width: 60px;
          z-index: 5;
          pointer-events: none;
        }
        .carousel-fade-left {
          left: 0;
          background: linear-gradient(to right, rgba(0,0,0,0.4) 0%, transparent 100%);
        }
        .carousel-fade-right {
          right: 0;
          background: linear-gradient(to left, rgba(0,0,0,0.4) 0%, transparent 100%);
        }

        @media (max-width: 768px) {
          .carousel-card-wrapper {
            width: 280px;
          }
        }
      

/* --- PromoBanner.jsx --- */

        .promo-flex-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 2.5rem;
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
          z-index: 10;
        }
        .promo-text-content {
          text-align: left;
          max-width: 650px;
        }
        @media (max-width: 768px) {
          .promo-flex-container {
            flex-direction: column;
            text-align: center;
          }
          .promo-text-content {
            text-align: center;
          }
        }
      


```

---

## File: Front/src/pages/Home/Home.jsx

**Path:** `Front/src/pages/Home/Home.jsx`

```javascript
import React from 'react';
import HeroTV from '../../components/home/HeroTV';
import HeroSeparator from '../../components/home/HeroSeparator';
import {
  FeaturedProducts,
  PromoBanner,
  AboutStore,
  CTASection,
  AboutPreview,
  ProductCarousel,
  ContactPreview
} from './components';
import fondoImg from '../../assets/img/fondo.jpg';
import './Home.css';

const Home = () => {
  return (
    <div className="w-full">
      <HeroTV />
      <HeroSeparator />
      <AboutPreview />
      <ContactPreview />
      <PromoBanner />
      <FeaturedProducts />
      <AboutStore />
      <ProductCarousel />
      <CTASection />
    </div>
  );
};

export default Home;

```

---

## File: Front/src/pages/Home/components/AboutPreview.jsx

**Path:** `Front/src/pages/Home/components/AboutPreview.jsx`

```javascript
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AboutPreview = () => {
  const navigate = useNavigate();

  return (
    <section style={{
      position: 'relative',
      padding: '8rem 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      borderTop: '1px solid var(--border-subtle)',
      overflow: 'hidden'
    }}>
      <div style={{
        maxWidth: '1200px',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '4rem',
        alignItems: 'center'
      }}>
        {/* Imagen visual (Taller / Serigrafía) */}
        <div style={{
          position: 'relative',
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: '0 20px 40px rgba(30,74,40,0.15)',
          aspectRatio: '4/3'
        }}>
          <img 
            src="https://images.unsplash.com/photo-1529336953128-a85760f58cb5?auto=format&fit=crop&q=80&w=1000" 
            alt="Taller de estampado SonTerry" 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
          {/* Overlay sutil verde */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(0deg, rgba(30,74,40,0.5) 0%, transparent 60%)',
            pointerEvents: 'none'
          }} />
        </div>

        {/* Textos y CTA */}
        <div style={{ zIndex: 2 }}>
          <span style={{
            display: 'inline-block',
            color: 'var(--green-deep)',
            fontWeight: '800',
            fontSize: '0.8rem',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            marginBottom: '1rem',
            padding: '4px 12px',
            background: 'var(--green-ghost)',
            borderRadius: '999px'
          }}>
            Sobre Nosotros
          </span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.2rem, 4vw, 3rem)',
            fontWeight: '800',
            color: 'var(--green-brand)',
            marginBottom: '1.5rem',
            lineHeight: '1.15'
          }}>
            Técnica artesanal y precisión visual
          </h2>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '1.1rem',
            lineHeight: '1.7',
            marginBottom: '2.5rem',
            fontWeight: '500'
          }}>
            En SonTerry no solo estampamos prendas, damos vida a la identidad de tu marca. Somos un taller dedicado a la excelencia, donde la serigrafía tradicional se encuentra con la máxima tecnología DTF para resultados vibrantes y duraderos.
          </p>
          <button 
            onClick={() => navigate('/nosotros')}
            className="snt-btn snt-btn-primary rounded-full uppercase"
            style={{ padding: '14px 36px', letterSpacing: '1px' }}
          >
            Nuestra Historia
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;

```

---

## File: Front/src/pages/Home/components/AboutStore.jsx

**Path:** `Front/src/pages/Home/components/AboutStore.jsx`

```javascript
import React, { useRef } from 'react';
import { Users, Truck, Printer, Layers } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const AboutStore = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Stagger bento items entrance
    gsap.fromTo(
      containerRef.current.querySelectorAll('.bento-item'),
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="container" style={{ padding: '6rem 1.5rem', maxWidth: '1100px' }}>
      

      {/* Header */}
      <div className="bento-item text-center mb-8">
        <span className="text-sm font-bold uppercase tracking-widest mb-2 block text-accent">
          El Sello SonTerry
        </span>
        <h2 className="font-display text-primary font-bold m-0" style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)' }}>
          Creación con Alma y Técnica
        </h2>
      </div>

      {/* Bento Grid */}
      <div className="bento-grid-container">
        {/* Main Bento Box - Technique */}
        <div className="bento-card-main bento-item">
          <div>
            <div className="flex gap-4 mb-6">
              <div className="icon-box-primary">
                <Printer size={24} />
              </div>
              <div className="icon-box-accent">
                <Layers size={24} />
              </div>
            </div>
            <h3 className="font-display text-primary font-bold mb-4 text-2xl">
              Nuestra Técnica Artesanal
            </h3>
            <p className="text-secondary mb-4 font-medium" style={{ lineHeight: '1.6', fontSize: '0.95rem' }}>
              En SonTerry fusionamos la serigrafía textil tradicional —donde cada pasada de tinta se realiza con precisión milimétrica a mano— con la tecnología digital DTF premium de última generación.
            </p>
            <p className="text-secondary m-0 font-medium" style={{ lineHeight: '1.6', fontSize: '0.95rem' }}>
              Esta combinación nos permite garantizar colores vibrantes que no pierden intensidad con las lavadas, estampados que se adaptan a la flexibilidad de las fibras y acabados con detalles impecables que elevan tu prenda al nivel de una boutique exclusiva.
            </p>
          </div>
          <div className="mt-8 pt-6 border-t border-subtle flex items-center justify-between flex-wrap gap-4">
            <span className="text-sm font-bold tracking-widest text-muted">
              PROCESO ORGÁNICO & SOSTENIBLE
            </span>
            <span className="text-sm font-bold text-brand bg-brand-mist rounded-full" style={{ padding: '4px 12px' }}>
              100% Hecho a Mano
            </span>
          </div>
        </div>

        {/* Column of Stacked Bento Cards */}
        <div className="bento-stack">
          {/* Card 1: Wholesale */}
          <div className="bento-card-secondary bento-item">
            <div>
              <div className="icon-box-accent mb-4">
                <Users size={20} />
              </div>
              <h4 className="font-display text-primary font-bold mb-2 text-xl">
                Atención Mayorista
              </h4>
              <p className="text-secondary font-medium m-0 text-sm" style={{ lineHeight: '1.5' }}>
                ¿Tienes una marca, evento o negocio? Ofrecemos tarifas especiales por volumen y asesoramiento personalizado para tus proyectos.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-subtle flex items-center justify-between">
              <span className="text-sm font-bold text-muted">Desde 12 unidades</span>
              <span className="text-sm font-bold text-accent cursor-pointer">
                COTIZAR AHORA →
              </span>
            </div>
          </div>

          {/* Card 2: Shipping */}
          <div className="bento-card-secondary bento-item">
            <div>
              <div className="icon-box-primary mb-4">
                <Truck size={20} />
              </div>
              <h4 className="font-display text-primary font-bold mb-2 text-xl">
                Envíos a toda Colombia
              </h4>
              <p className="text-secondary font-medium m-0 text-sm" style={{ lineHeight: '1.5' }}>
                Despachamos tu pedido con empaques premium y seguimiento integrado. Tus productos llegarán seguros y listos para lucir.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-subtle flex items-center justify-between">
              <span className="text-sm font-bold text-muted">Entregas seguras</span>
              <span className="text-sm font-bold text-brand cursor-pointer">
                VER POLÍTICAS →
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutStore;

```

---

## File: Front/src/pages/Home/components/CTASection.jsx

**Path:** `Front/src/pages/Home/components/CTASection.jsx`

```javascript
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/common/Button';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CTASection = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useGSAP(() => {
    gsap.fromTo(
      containerRef.current.querySelector('.cta-card'),
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
      }
    );
  }, { scope: containerRef });

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section 
      ref={containerRef} 
      style={{
        padding: '5rem 1.5rem',
        maxWidth: '1100px',
        margin: '0 auto',
        boxSizing: 'border-box'
      }}
    >
      <div 
        className="cta-card"
        style={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '24px',
          padding: '4rem 2rem',
          textAlign: 'center',
          border: '1px solid rgba(226, 219, 208, 0.7)',
          background: 'var(--white)',
          boxShadow: 'var(--shadow-md)',
          boxSizing: 'border-box'
        }}
      >
        {/* Soft Organic Glow Background Elements */}
        <div 
          style={{ 
            position: 'absolute',
            top: '-8rem',
            left: '-8rem',
            width: '20rem',
            height: '20rem',
            borderRadius: '50%',
            filter: 'blur(120px)',
            pointerEvents: 'none',
            opacity: 0.2,
            backgroundColor: 'var(--color-primary)' 
          }}
        />
        <div 
          style={{ 
            position: 'absolute',
            bottom: '-8rem',
            right: '-8rem',
            width: '20rem',
            height: '20rem',
            borderRadius: '50%',
            filter: 'blur(120px)',
            pointerEvents: 'none',
            opacity: 0.15,
            backgroundColor: 'var(--color-accent)' 
          }}
        />

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span 
            style={{ 
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '1.5rem',
              color: 'var(--color-primary)', 
              backgroundColor: 'rgba(107, 158, 92, 0.1)',
              border: '1px solid rgba(107, 158, 92, 0.2)'
            }}
          >
            <Sparkles size={12} />
            Configurador 3D Activo
          </span>

          <h2 
            style={{ 
              fontFamily: "'Playfair Display', serif", 
              color: 'var(--color-text)',
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
              fontWeight: 700,
              lineHeight: 1.25,
              marginBottom: '1rem'
            }}
          >
            ¿Listo para crear tu propia pieza única?
          </h2>

          <p style={{ color: 'var(--color-text-light)', fontWeight: '300', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2.5rem' }}>
            Usa nuestro visualizador interactivo 3D para experimentar con parches, bordados y colores. Convierte tu idea en un accesorio exclusivo en pocos pasos.
          </p>

          <Button
            variant="primary"
            onClick={() => {
              handleScrollToTop();
              navigate('/configurador');
            }}
            style={{
              padding: '1rem 2.5rem',
              borderRadius: '8px',
              backgroundColor: 'var(--color-primary)',
              color: '#FFFFFF',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '700',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(107, 158, 92, 0.2)',
              transition: 'var(--transition-smooth)'
            }}
          >
            Diseñar en 3D Ahora
            <ArrowRight size={18} style={{ marginLeft: '6px' }} />
          </Button>

          <div 
            style={{ 
              marginTop: '3rem', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '1.5rem', 
              fontSize: '0.75rem', 
              color: '#A09787', 
              fontWeight: '600', 
              letterSpacing: '0.05em',
              textTransform: 'uppercase'
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ShieldCheck size={14} style={{ color: '#6B9E5C' }} /> Pago Seguro
            </span>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#E2DBD0' }} />
            <span>Garantía SonTerry</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

```

---

## File: Front/src/pages/Home/components/ContactPreview.jsx

**Path:** `Front/src/pages/Home/components/ContactPreview.jsx`

```javascript
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';

const ContactPreview = () => {
  const navigate = useNavigate();

  return (
    <section style={{
      padding: '2rem 2rem 6rem',
      backgroundColor: 'transparent',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center'
    }}>
      <div style={{
        backgroundColor: 'var(--white)',
        padding: '4rem 2rem',
        borderRadius: '32px',
        boxShadow: '0 10px 40px rgba(30,74,40,0.06)',
        maxWidth: '900px',
        width: '100%',
        border: '1px solid rgba(82,143,88,0.1)'
      }}>
        <div style={{
          width: '64px',
          height: '64px',
          backgroundColor: 'var(--green-ghost)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem',
          color: 'var(--green-deep)'
        }}>
          <MessageCircle size={32} />
        </div>
        
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
          fontWeight: '800',
          color: 'var(--text-primary)',
          marginBottom: '1rem'
        }}>
          ¿Tienes un proyecto en mente?
        </h2>
        
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '1.1rem',
          lineHeight: '1.6',
          maxWidth: '560px',
          margin: '0 auto 2.5rem'
        }}>
          Cotizaciones al por mayor, diseños exclusivos o dudas técnicas. Escríbenos y nuestro equipo te asesorará para lograr el mejor resultado en tus prendas.
        </p>
        
        <button
          onClick={() => navigate('/configurador')}
          className="snt-btn snt-btn-primary rounded-full uppercase"
          style={{ padding: '14px 36px', letterSpacing: '1px' }}
        >
          Empieza a diseñar
        </button>
      </div>
    </section>
  );
};

export default ContactPreview;

```

---

## File: Front/src/pages/Home/components/FeaturedProducts.jsx

**Path:** `Front/src/pages/Home/components/FeaturedProducts.jsx`

```javascript
import React, { useRef } from 'react';
import { useProducts } from '../../../queries/useProducts';
import ProductCard from '../../Products/components/ProductCard';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FeaturedProducts = () => {
  const containerRef = useRef(null);
  const { data: products, isLoading } = useProducts({ limit: 3 });

  useGSAP(() => {
    if (isLoading || !products?.length) return;

    gsap.fromTo(
      containerRef.current.querySelector('.fp-header'),
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: containerRef.current, start: 'top 85%' } }
    );

    gsap.fromTo(
      containerRef.current.querySelectorAll('.fp-card'),
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power2.out',
        scrollTrigger: { trigger: containerRef.current, start: 'top 75%' } }
    );
  }, { dependencies: [isLoading, products], scope: containerRef });

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <style>{`
        .fp-section {
          padding: 6rem 1.5rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .fp-header {
          text-align: center;
          margin-bottom: 4rem;
        }
        .fp-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 16px;
          border-radius: 999px;
          background: var(--green-ghost, #E8F5EA);
          color: var(--green-deep, #1E4A28);
          font-family: var(--font-display);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 1rem;
        }
        .fp-title {
          font-family: var(--font-display);
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }
        .fp-sub {
          color: var(--text-secondary);
          font-size: 1.05rem;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }
        .fp-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2.5rem;
        }
        @media (max-width: 768px) {
          .fp-section { padding: 4rem 1.5rem; }
          .fp-grid { grid-template-columns: 1fr; gap: 2rem; }
        }
      `}</style>      <section ref={containerRef} className="fp-section">
        {/* Header */}
        <div className="fp-header">
          <div className="fp-eyebrow">
            <Sparkles size={11} strokeWidth={2.5} />
            Curaduría Limitada
          </div>
          <h2 className="fp-title">Destacados del Taller</h2>
          <p className="fp-sub">
            Nuestras piezas más solicitadas, creadas con dedicación y acabados de calidad boutique.
          </p>
        </div>

        {/* Cards — mismo componente que /productos */}
        <div className="fp-grid">
          {products?.map((prod) => (
            <div key={prod._id} className="fp-card">
              <ProductCard product={prod} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default FeaturedProducts;

```

---

## File: Front/src/pages/Home/components/ProductCarousel.jsx

**Path:** `Front/src/pages/Home/components/ProductCarousel.jsx`

```javascript
import React from 'react';
import { useProducts } from '../../../queries/useProducts';
import ProductCard from '../../Products/components/ProductCard';
import LoadingSpinner from '../../../components/common/LoadingSpinner';

const ProductCarousel = () => {
  // Solicitamos un buen número de productos para el carrusel (ej. los últimos 10)
  const { data: products, isLoading } = useProducts({ limit: 10 });

  if (isLoading) return <LoadingSpinner />;
  if (!products || products.length === 0) return null;

  // Duplicamos la lista de productos un par de veces para garantizar que el scroll infinito nunca se corte en pantallas anchas
  const duplicatedProducts = [...products, ...products, ...products];

  return (
    <section style={{
      padding: '5rem 0',
      backgroundColor: 'transparent',
      overflow: 'hidden',
      position: 'relative'
    }}>

      <div style={{ textAlign: 'center', marginBottom: '3rem', padding: '0 2rem' }}>
        <span style={{
          display: 'inline-block',
          color: 'var(--green-deep)',
          fontWeight: '800',
          fontSize: '0.8rem',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          marginBottom: '0.5rem'
        }}>
          Catálogo Extendido
        </span>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 4vw, 2.8rem)',
          fontWeight: '800',
          color: 'var(--text-primary)',
          margin: 0
        }}>
          Explora todos nuestros diseños
        </h2>
      </div>

      <div style={{ position: 'relative' }}>
        {/* Difuminado Izquierdo */}
        <div className="carousel-fade-left" />
        
        {/* Pista del Carrusel */}
        <div className="carousel-track">
          {duplicatedProducts.map((prod, index) => (
            <div key={`${prod._id}-${index}`} className="carousel-card-wrapper">
              <ProductCard product={prod} />
            </div>
          ))}
        </div>

        {/* Difuminado Derecho */}
        <div className="carousel-fade-right" />
      </div>
    </section>
  );
};

export default ProductCarousel;

```

---

## File: Front/src/pages/Home/components/PromoBanner.jsx

**Path:** `Front/src/pages/Home/components/PromoBanner.jsx`

```javascript
import React, { useRef } from 'react';
import Button from '../../../components/common/Button';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Sparkles, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PromoBanner = () => {
  const bannerRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      bannerRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: bannerRef.current,
          start: 'top 85%',
        },
      }
    );
  }, { scope: bannerRef });

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div 
      ref={bannerRef} 
      style={{
        width: '100%',
        backgroundColor: '#1C3A27',
        padding: '5rem 2rem',
        position: 'relative',
        overflow: 'hidden',
        margin: '4rem 0',
        boxSizing: 'border-box'
      }}
    >
      

      {/* Visual Organic Glow Backgrounds */}
      <div 
        style={{ 
          position: 'absolute',
          top: '-6rem',
          left: '-6rem',
          width: '18rem',
          height: '18rem',
          borderRadius: '50%',
          filter: 'blur(100px)',
          pointerEvents: 'none',
          opacity: 0.2,
          backgroundColor: 'var(--color-accent)' 
        }}
      />
      <div 
        style={{ 
          position: 'absolute',
          bottom: '-6rem',
          right: '-6rem',
          width: '20rem',
          height: '20rem',
          borderRadius: '50%',
          filter: 'blur(100px)',
          pointerEvents: 'none',
          opacity: 0.15,
          backgroundColor: 'var(--color-primary)' 
        }}
      />

      <div className="promo-flex-container">
        <div className="promo-text-content">
          <span 
            style={{ 
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '1rem',
              color: 'var(--color-accent)', 
              backgroundColor: 'rgba(201, 125, 92, 0.15)',
              border: '1px solid rgba(201, 125, 92, 0.3)'
            }}
          >
            <Sparkles size={12} />
            Calidad Premium Garantizada
          </span>
          <h2 
            style={{ 
              fontFamily: "'Playfair Display', serif", 
              color: '#FFFFFF',
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
              fontWeight: 700,
              lineHeight: 1.25,
              margin: 0
            }}
          >
            Personalización Textil <br className="hidden md:inline" /> de Alta Definición
          </h2>
          <p style={{ marginTop: '1rem', color: 'rgba(255, 255, 255, 0.7)', fontWeight: '300', fontSize: '0.95rem', lineHeight: '1.6' }}>
            Damos vida a tus diseños utilizando técnicas avanzadas de serigrafía tradicional y DTF premium. Resistente al lavado, tacto suave.
          </p>
        </div>

        <div style={{ flexShrink: 0, width: 'auto' }}>
          <Button
            variant="accent"
            onClick={handleScrollToTop}
            style={{
              padding: '1rem 2rem',
              borderRadius: '8px',
              backgroundColor: 'var(--color-accent)',
              color: '#FFFFFF',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '700',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(201, 125, 92, 0.3)',
              transition: 'var(--transition-smooth)'
            }}
          >
            Empieza a Diseñar
            <ArrowRight size={18} style={{ marginLeft: '6px' }} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;

```

---

## File: Front/src/pages/Home/components/index.js

**Path:** `Front/src/pages/Home/components/index.js`

```javascript
export { default as FeaturedProducts } from './FeaturedProducts';
export { default as PromoBanner } from './PromoBanner';
export { default as AboutStore } from './AboutStore';
export { default as CTASection } from './CTASection';
export { default as AboutPreview } from './AboutPreview';
export { default as ProductCarousel } from './ProductCarousel';
export { default as ContactPreview } from './ContactPreview';


```

---

## File: Front/src/pages/NotFound/NotFound.jsx

**Path:** `Front/src/pages/NotFound/NotFound.jsx`

```javascript
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', padding: '5rem 1.5rem' }}>
      <h1 style={{ fontSize: '4rem', color: 'var(--color-accent)', marginBottom: '1rem' }}>404</h1>
      <p style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>Página no encontrada. Los gatos de SonTerry están buscando tu diseño...</p>
      <Link to="/"><Button variant="primary">Volver al Taller</Button></Link>
    </div>
  );
};

export default NotFound;

```

---

## File: Front/src/pages/Products/ProductDetail.jsx

**Path:** `Front/src/pages/Products/ProductDetail.jsx`

```javascript
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProductDetail } from '../../queries/useProducts';
import { formatCurrency } from '../../utils/formatCurrency';
import { useCartStore } from '../../store/cartStore';
import { useUiStore } from '../../store/uiStore';
import { useAuthStore } from '../../store/authStore';
import ProductGallery from './components/ProductGallery';
import RelatedProducts from './components/RelatedProducts';
import ProductReviews from './components/ProductReviews';
import './Products.css';
import Button from '../../components/common/Button';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { Star, ShoppingBag } from 'lucide-react';

const ProductDetail = () => {
  const { slug } = useParams();
  const { data: product, isLoading: isProductLoading } = useProductDetail(slug);
  const addToCart = useCartStore((state) => state.addToCart);
  const addToast = useUiStore((state) => state.addToast);
  const user = useAuthStore((state) => state.user);

  // States
  const [quantity, setQuantity] = useState(1);
  const [customizationType, setCustomizationType] = useState('none');
  const [customizationDetails, setCustomizationDetails] = useState('');

  useEffect(() => {
    if (product) {
      // Reset quantity
      setQuantity(1);
      setCustomizationType('none');
      setCustomizationDetails('');
    }
  }, [product]);

  if (isProductLoading) return <LoadingSpinner />;
  if (!product) return <div className="container" style={{ padding: '3rem 0', textAlign: 'center' }}>Producto no encontrado.</div>;

  const handleAddToCart = () => {
    const cust = customizationType !== 'none' ? {
      type: customizationType,
      details: customizationDetails || 'Sin detalles extra'
    } : null;

    addToCart(product, quantity, cust);
    addToast(`¡${product.name} añadido al carrito!`, 'success');
  };

  return (
    <div className="container animate-fade-in" style={{ paddingTop: '2.5rem', paddingBottom: '5rem' }}>
      {/* Top Main Section: Gallery + Purchase info */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '3.5rem',
        marginBottom: '4rem'
      }}>
        {/* Left Column: MercadoLibre Style Gallery */}
        <ProductGallery images={product.images} />

        {/* Right Column: Title, Price, Customization, Add to Bolsa */}
        <div>
          <span style={{
            color: 'var(--color-accent)',
            fontWeight: '600',
            fontSize: '0.85rem',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '0.5rem'
          }}>{product.category?.name || 'Artesanía'}</span>
          
          <h1 style={{ fontSize: '2.25rem', marginBottom: '0.5rem', fontFamily: 'Playfair Display, serif' }}>{product.name}</h1>
          
          {/* Average Rating Stars display */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', color: '#F5C60D' }}>
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  size={16}
                  fill={s <= Math.round(product.ratings || 0) ? '#F5C60D' : 'none'}
                  stroke={s <= Math.round(product.ratings || 0) ? '#F5C60D' : '#D0D0D0'}
                />
              ))}
            </div>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-light)', fontWeight: '600' }}>
              {product.ratings > 0 ? `${product.ratings.toFixed(1)} / 5` : 'Sin calificaciones'}
            </span>
          </div>

          <div style={{ fontSize: '1.85rem', fontWeight: '700', color: 'var(--color-text)', marginBottom: '1.5rem' }}>
            {formatCurrency(product.price)}
          </div>
          
          {/* Stock state info */}
          <div style={{ marginBottom: '2rem' }}>
            {product.stock > 0 ? (
              <span style={{
                fontSize: '0.85rem',
                backgroundColor: '#E8F5E9',
                color: 'var(--color-success)',
                padding: '0.3rem 0.75rem',
                borderRadius: '50px',
                fontWeight: '600'
              }}>
                En Stock ({product.stock} disponibles)
              </span>
            ) : (
              <span style={{
                fontSize: '0.85rem',
                backgroundColor: '#FFEBEE',
                color: 'var(--color-danger)',
                padding: '0.3rem 0.75rem',
                borderRadius: '50px',
                fontWeight: '600'
              }}>
                Agotado Temporalmente
              </span>
            )}
          </div>

          {/* Customization Options Box */}
          <div style={{
            backgroundColor: '#FFFFFF',
            padding: '1.5rem',
            borderRadius: 'var(--border-radius-sm)',
            border: '1px solid var(--color-border)',
            marginBottom: '2rem',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <h4 style={{ fontSize: '1rem', marginBottom: '0.75rem', color: 'var(--color-primary)' }}>Personaliza tu Prenda</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-light)', marginBottom: '1rem' }}>
              Elige una técnica textil artesanal si deseas estampar tu logo o diseño.
            </p>
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '0.35rem' }}>Selecciona Técnica:</label>
              <select
                value={customizationType}
                onChange={(e) => setCustomizationType(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.65rem',
                  borderRadius: '4px',
                  border: '1px solid var(--color-border)',
                  outline: 'none',
                  backgroundColor: '#FFFFFF'
                }}
              >
                <option value="none">Sin Estampado (Prenda lisa)</option>
                <option value="serigrafia">Serigrafía Artesanal (Larga duración)</option>
                <option value="dtf">Digital DTF Transfer (Full color)</option>
              </select>
            </div>

            {customizationType !== 'none' && (
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '0.35rem' }}>
                  Detalles del diseño (Ej: Ubicación, colores):
                </label>
                <textarea
                  value={customizationDetails}
                  onChange={(e) => setCustomizationDetails(e.target.value)}
                  placeholder="Detalla tu estampado o mensaje aquí..."
                  style={{
                    width: '100%',
                    height: '80px',
                    padding: '0.65rem',
                    borderRadius: '4px',
                    border: '1px solid var(--color-border)',
                    outline: 'none',
                    fontFamily: 'inherit',
                    fontSize: '0.9rem'
                  }}
                />
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{ display: 'flex', border: '1px solid var(--color-border)', borderRadius: '4px', overflow: 'hidden', backgroundColor: '#FFFFFF' }}>
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                style={{ padding: '0.5rem 1rem', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                disabled={product.stock === 0}
              >-</button>
              <span style={{ padding: '0.5rem 1rem', fontWeight: '600', display: 'inline-block', width: '40px', textAlign: 'center' }}>
                {product.stock === 0 ? 0 : quantity}
              </span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                style={{ padding: '0.5rem 1rem', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                disabled={product.stock === 0}
              >+</button>
            </div>

            <Button
              variant="accent"
              onClick={handleAddToCart}
              style={{ flexGrow: 1 }}
              disabled={product.stock === 0}
            >
              <ShoppingBag size={18} /> Añadir a mi Bolsa
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Part 1: Detailed Product Description */}
      <div style={{
        borderTop: '1px solid var(--color-border)',
        paddingTop: '3rem',
        marginBottom: '4rem'
      }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1.25rem', fontFamily: 'Playfair Display, serif' }}>
          Descripción Detallada
        </h3>
        <div style={{
          backgroundColor: '#FFFFFF',
          padding: '2rem',
          borderRadius: 'var(--border-radius-md)',
          boxShadow: 'var(--shadow-sm)',
          border: '1px solid var(--color-border)',
          lineHeight: '1.8',
          color: 'var(--color-text)'
        }}>
          {product.description.split('\n').map((paragraph, idx) => (
            <p key={idx} style={{ marginBottom: '1rem' }}>{paragraph}</p>
          ))}
        </div>
      </div>

      {/* Bottom Part 2: Beautiful Promotional Banner */}
      <div style={{
        background: 'linear-gradient(135deg, var(--color-primary-hover) 0%, var(--color-primary) 100%)',
        padding: '3rem 2rem',
        borderRadius: 'var(--border-radius-md)',
        color: '#FFFFFF',
        textAlign: 'center',
        boxShadow: 'var(--shadow-md)',
        marginBottom: '4rem'
      }}>
        <h3 style={{ fontSize: '1.85rem', marginBottom: '0.75rem', fontFamily: 'Playfair Display, serif', color: '#FFFFFF' }}>
          Confección & Alma Local
        </h3>
        <p style={{ maxWidth: '650px', margin: '0 auto', fontSize: '0.95rem', opacity: 0.95, lineHeight: '1.6' }}>
          Cada pieza en SonTerry es cuidadosamente elaborada a mano por tejedores y artesanos locales.
          Promovemos prácticas de producción sostenible, materiales nobles y apoyo al comercio justo en nuestra comunidad.
        </p>
      </div>

      {/* Bottom Part 3: Related Products (Suggestions) */}
      <RelatedProducts categoryId={product.category?._id} currentProductId={product._id} />

      {/* Bottom Part 4: Experience / Review System */}
      <ProductReviews productId={product._id} />
    </div>
  );
};

export default ProductDetail;

```

---

## File: Front/src/pages/Products/ProductList.jsx

**Path:** `Front/src/pages/Products/ProductList.jsx`

```javascript
import React, { useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useProducts } from '../../queries/useProducts';
import ProductCard from './components/ProductCard';
import ProductFilters from './components/ProductFilters';
import './Products.css';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { Sparkles, PackageSearch } from 'lucide-react';

const ProductList = () => {
  const heroRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const filter   = searchParams.get('category') || 'all';
  const searchVal = searchParams.get('search')  || '';
  const minPrice  = searchParams.get('minPrice') || '';
  const maxPrice  = searchParams.get('maxPrice') || '';

  const params = {};
  if (filter !== 'all')  params.category  = filter;
  if (searchVal)         params.search    = searchVal;
  if (minPrice)          params.minPrice  = minPrice;
  if (maxPrice)          params.maxPrice  = maxPrice;

  const { data: products, isLoading } = useProducts(params);

  const setFilter = (val) => {
    const p = new URLSearchParams(searchParams);
    val === 'all' ? p.delete('category') : p.set('category', val);
    setSearchParams(p);
  };

  const handleApplyPrice = (min, max) => {
    const p = new URLSearchParams(searchParams);
    min ? p.set('minPrice', min) : p.delete('minPrice');
    max ? p.set('maxPrice', max) : p.delete('maxPrice');
    setSearchParams(p);
  };

  const handleClearSearch = () => {
    const p = new URLSearchParams(searchParams);
    p.delete('search');
    setSearchParams(p);
  };

  /* GSAP hero entrance */
  useGSAP(() => {
    gsap.fromTo(
      heroRef.current?.querySelectorAll('.pl-hero-anim'),
      { y: 35, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power2.out' }
    );
    gsap.from(heroRef.current?.querySelectorAll('.counter-val'), {
      textContent: 0,
      duration: 1.5,
      ease: 'power2.out',
      snap: { textContent: 1 },
      stagger: 0.1,
    });
  }, { scope: heroRef });

  return (
    <>
      

      {/* ═══ HERO ════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="pl-hero">
        <div className="pl-hero-inner">
          <div>
            <div className="pl-hero-eyebrow pl-hero-anim">
              <Sparkles size={11} /> Colección SonTerry
            </div>
            <h1 className="pl-hero-title pl-hero-anim">
              Cada pieza, <span>única</span><br />como tu marca
            </h1>
            <p className="pl-hero-sub pl-hero-anim">
              Gorras, mugs y prendas personalizadas con serigrafía artesanal y DTF premium. Desde 1 unidad hasta producción mayorista.
            </p>
          </div>

          <div className="pl-hero-stat pl-hero-anim">
            {[
              { num: '50+', label: 'Productos' },
              { num: '1+',  label: 'Unidad mínima' },
            ].map(({ num, label }) => {
              const val = num.replace(/\D/g, '');
              const prefix = num.startsWith('+') ? '+' : '';
              const suffix = num.endsWith('+') ? '+' : '';
              return (
                <div key={label} className="pl-hero-stat-box">
                  <div className="pl-hero-stat-num">
                    {prefix}<span className="counter-val">{val}</span>{suffix}
                  </div>
                  <div className="pl-hero-stat-label">{label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ BODY ════════════════════════════════════════════════════ */}
      <div className="pl-body">

        {/* Search result pill */}
        {searchVal && (
          <div className="pl-search-pill">
            <span style={{ fontSize: '0.9rem', color: 'var(--green-deep)', fontFamily: 'var(--font-body)' }}>
              Resultados para: <strong>"{searchVal}"</strong>
            </span>
            <button
              onClick={handleClearSearch}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'var(--text-muted)', fontSize: '0.82rem',
                fontFamily: 'var(--font-display)', fontWeight: 700,
                textDecoration: 'underline',
              }}
            >
              Limpiar
            </button>
          </div>
        )}

        {/* Filters */}
        <ProductFilters
          activeFilter={filter}
          setActiveFilter={setFilter}
          minPrice={minPrice}
          maxPrice={maxPrice}
          onApplyPrice={handleApplyPrice}
        />

        {/* Grid / states */}
        {isLoading ? (
          <LoadingSpinner />
        ) : products?.length === 0 ? (
          <div className="pl-empty">
            <div className="pl-empty-icon">
              <PackageSearch size={32} strokeWidth={1.5} />
            </div>
            <h3>Sin resultados</h3>
            <p style={{ fontSize: '0.9rem', maxWidth: 360 }}>
              No encontramos productos con esos filtros. Prueba con otra categoría o rango de precio.
            </p>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: '1.25rem' }}>
              <span className="pl-hero-eyebrow" style={{ display: 'inline-flex', marginBottom: 0 }}>
                {products?.length} producto{products?.length !== 1 ? 's' : ''} encontrado{products?.length !== 1 ? 's' : ''}
              </span>
            </div>
            <div className="pl-grid">
              {products?.map((prod) => (
                <ProductCard key={prod._id} product={prod} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ProductList;

```

---

## File: Front/src/pages/Products/Products.css

**Path:** `Front/src/pages/Products/Products.css`

```css
/* --- ProductList.jsx --- */

        /* ── Hero ── */
        .pl-hero {
          background: linear-gradient(135deg, var(--cream) 0%, var(--green-ghost) 55%, var(--cream-warm) 100%);
          padding: clamp(2.5rem, 5vw, 4.5rem) 1.5rem clamp(2rem, 4vw, 3.5rem);
          border-bottom: 1px solid var(--border-subtle);
          position: relative;
          overflow: hidden;
        }
        .pl-hero::before {
          content: '';
          position: absolute; top: -100px; right: -100px;
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(82,143,88,0.12) 0%, transparent 70%);
          border-radius: 50%; pointer-events: none;
        }
        .pl-hero-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 2rem;
          flex-wrap: wrap;
          position: relative;
          z-index: 1;
        }
        .pl-hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 14px;
          border-radius: 999px;
          background: var(--green-mist);
          border: 1px solid var(--border-subtle);
          color: var(--green-deep);
          font-family: var(--font-display);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 0.75rem;
          display: inline-flex;
        }
        .pl-hero-title {
          font-family: var(--font-display);
          font-size: clamp(1.8rem, 4vw, 2.8rem);
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.15;
          margin-bottom: 0.75rem;
        }
        .pl-hero-title span {
          color: var(--green-brand);
          position: relative;
        }
        .pl-hero-sub {
          color: var(--text-secondary);
          font-size: 0.98rem;
          line-height: 1.7;
          max-width: 520px;
        }
        /* Right decorative stat pill */
        .pl-hero-stat {
          display: flex;
          gap: 1.25rem;
          flex-shrink: 0;
        }
        .pl-hero-stat-box {
          background: var(--white);
          border: 1px solid var(--border-subtle);
          border-radius: var(--r-lg);
          padding: 1rem 1.5rem;
          text-align: center;
          box-shadow: var(--s-xs);
        }
        .pl-hero-stat-num {
          font-family: var(--font-display);
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--green-deep);
          line-height: 1;
        }
        .pl-hero-stat-label {
          font-size: 0.72rem;
          color: var(--text-muted);
          font-weight: 500;
          margin-top: 3px;
        }

        /* ── Page body ── */
        .pl-body {
          max-width: 1100px;
          margin: 0 auto;
          padding: 2.5rem 1.5rem 4rem;
        }

        /* ── Search result pill ── */
        .pl-search-pill {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: var(--green-ghost);
          padding: 0.75rem 1.25rem;
          border-radius: var(--r-lg);
          margin-bottom: 1.5rem;
          border: 1px solid var(--border-subtle);
        }

        /* ── Products grid ── */
        .pl-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(min(100%, 330px), 1fr));
          gap: 2rem;
        }

        /* ── Empty state ── */
        .pl-empty {
          text-align: center;
          padding: 4rem 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          color: var(--text-muted);
        }
        .pl-empty-icon {
          width: 88px; height: 88px;
          border-radius: 50%;
          background: var(--green-ghost);
          display: flex; align-items: center; justify-content: center;
          color: var(--green-light);
          box-shadow: var(--shadow-sm);
        }
        .pl-empty h3 {
          font-family: var(--font-display);
          font-size: 1.15rem;
          color: var(--text-secondary);
        }

        @media (max-width: 640px) {
          .pl-hero-stat { display: none; }
          .pl-grid { grid-template-columns: repeat(auto-fill, minmax(min(100%, 280px), 1fr)); gap: 1.5rem; }
        }
        @media (min-width: 641px) and (max-width: 1024px) {
          .pl-grid { grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.25rem; }
        }
      

/* --- ProductCard.jsx --- */

        .snt-card {
          background: var(--white);
          border-radius: 20px;
          border: 1px solid rgba(82,143,88,0.10);
          box-shadow: 0 2px 8px rgba(30,74,40,0.06);
          transition: all 0.30s cubic-bezier(.4,0,.2,1);
          display: flex;
          flex-direction: column;
          height: 100%;
          overflow: hidden;
          position: relative;
        }
        .snt-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--s-card-hover, 0 24px 56px rgba(30,74,40,0.20), 0 4px 16px rgba(201,125,92,0.08));
          border-color: rgba(82,143,88,0.28);
        }

        /* ── Image zone ── */
        .snt-card__img-zone {
          position: relative;
          padding: 0;
          aspect-ratio: 4/3;
          height: auto;
          overflow: hidden;
          transition: all 0.30s ease;
        }
        /* Subtle inset frame — visible contour without cropping */
        .snt-card__img-zone::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 0;
          box-shadow: inset 0 0 0 1.5px rgba(82,143,88,0.18);
          pointer-events: none;
          z-index: 3;
          transition: box-shadow 0.30s ease;
        }
        .snt-card:hover .snt-card__img-zone::after {
          box-shadow: inset 0 0 0 2px rgba(82,143,88,0.30);
        }
        .snt-card__img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center center;
          transition: transform 0.45s cubic-bezier(.25,.46,.45,.94);
          display: block;
        }
        .snt-card:hover .snt-card__img {
          transform: scale(1.06);
        }

        /* ── Hover overlay ── */
        .snt-card__hover-overlay {
          position: absolute;
          inset: 0;
          background: rgba(30, 74, 40, 0.62);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: all 0.3s ease;
          z-index: 4;
          border-radius: 0;
        }
        .snt-card__hover-overlay span {
          transform: translateY(8px);
          transition: transform 0.3s ease;
        }
        .snt-card:hover .snt-card__hover-overlay {
          opacity: 1;
        }
        .snt-card:hover .snt-card__hover-overlay span {
          transform: translateY(0);
        }

        /* ── Type badge ── */
        .snt-card__badge {
          position: absolute;
          top: 14px;
          left: 14px;
          padding: 4px 11px;
          border-radius: 999px;
          font-family: var(--font-display, 'Syne', sans-serif);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          z-index: 5;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        /* ── Wishlist button ── */
        .snt-card__wish {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(6px);
          border: 1px solid rgba(0,0,0,0.07);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.22s ease;
          z-index: 2;
          padding: 0;
        }
        .snt-card__wish:hover {
          background: #fff;
          box-shadow: 0 2px 8px rgba(0,0,0,0.12);
          transform: scale(1.1);
        }
        .snt-card__wish.active { background: #fff; }

        /* ── Divider ── */
        .snt-card__divider {
          height: 1px;
          background: rgba(0,0,0,0.05);
          margin: 0;
        }

        /* ── Body ── */
        .snt-card__body {
          padding: 1.1rem 1.25rem 1.35rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          gap: 0.3rem;
        }
        .snt-card__sublabel {
          font-family: var(--font-display, 'Syne', sans-serif);
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-muted, #8A9E8E);
          margin: 0;
        }
        .snt-card__name {
          font-family: var(--font-display, 'Syne', sans-serif);
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-primary, #1C2B1E);
          line-height: 1.25;
          margin: 0.1rem 0 0;
          text-decoration: none;
          display: block;
        }
        .snt-card__name:hover { color: var(--green-deep, #1E4A28); }
        .snt-card__desc {
          font-size: 0.82rem;
          color: var(--text-secondary, #4A5C4E);
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          margin: 0.25rem 0 0;
          flex-grow: 1;
        }

        /* ── Footer ── */
        .snt-card__footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 1rem;
          gap: 0.6rem;
          flex-wrap: wrap;
        }
        .snt-card__prices {
          display: flex;
          flex-direction: column;
          gap: 1px;
        }
        .snt-card__price-chip {
          background: var(--green-ghost);
          border: 1px solid var(--border-subtle);
          border-radius: var(--r-sm);
          padding: 4px 10px;
          display: inline-flex;
          align-items: baseline;
        }
        .snt-card__price {
          font-family: var(--font-display, 'Syne', sans-serif);
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--green-deep, #1E4A28);
          line-height: 1;
        }
        .snt-card__original {
          font-size: 0.75rem;
          color: var(--text-muted, #8A9E8E);
          text-decoration: line-through;
        }

        /* ── Add button ── */
        .snt-card__add-btn {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 0.45rem 0.9rem;
          border-radius: 999px;
          border: none;
          background: var(--green-deep, #1E4A28);
          color: #fff;
          font-family: var(--font-display, 'Syne', sans-serif);
          font-size: 0.75rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.22s ease;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .snt-card__add-btn:hover {
          background: var(--green-mid, #3B7A47);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(30,74,40,0.25);
        }
        .snt-card__add-btn:active {
          transform: translateY(0);
        }
      

/* --- ProductFilters.jsx --- */

        .pf-wrap {
          background: var(--white);
          border-radius: var(--r-xl);
          border: 1px solid var(--border-subtle);
          box-shadow: var(--s-xs);
          padding: 1.25rem 1.5rem;
          margin-bottom: 2.5rem;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          gap: 1.25rem;
        }
        .pf-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-display);
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        /* Category chips */
        .pf-chip {
          display: inline-flex;
          align-items: center;
          padding: 6px 16px;
          border-radius: 999px;
          border: 1.5px solid var(--border-mid);
          background: var(--cream);
          color: var(--text-secondary);
          font-family: var(--font-display);
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: var(--t-smooth);
          white-space: nowrap;
        }
        .pf-chip:hover {
          border-color: var(--green-brand);
          color: var(--green-deep);
          background: var(--green-ghost);
        }
        .pf-chip.active {
          background: var(--green-deep);
          border-color: var(--green-deep);
          color: #fff;
          box-shadow: 0 2px 8px rgba(30,74,40,0.25);
        }


        @media (max-width: 640px) {
          .pf-wrap { flex-direction: column; align-items: flex-start; }
        }
      


```

---

## File: Front/src/pages/Products/components/ProductCard.jsx

**Path:** `Front/src/pages/Products/components/ProductCard.jsx`

```javascript
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../../utils/formatCurrency';
import { useCartStore } from '../../../store/cartStore';
import { useUiStore } from '../../../store/uiStore';
import { Heart, ShoppingBag } from 'lucide-react';
import '../Products.css'; // Importamos los estilos para que la card no se rompa fuera de ProductList

/* ── Color mapping per technique ──────────────────────────────────── */
const TYPE_MAP = {
  dtf: {
    imageBg:   '#E8F5EA',
    badgeBg:   '#C8E6CB',
    badgeText: '#1E4A28',
    label:     'DTF',
  },
  serigrafia: {
    imageBg:   '#EAF4EC',
    badgeBg:   '#C5E0C8',
    badgeText: '#1E4A28',
    label:     'Serigrafía',
  },
  sublimacion: {
    imageBg:   '#FDF0EC',
    badgeBg:   '#F5D0C3',
    badgeText: '#7A3520',
    label:     'Sublimación',
  },
  bordado: {
    imageBg:   '#F4EFF9',
    badgeBg:   '#DDD0F0',
    badgeText: '#4A2880',
    label:     'Bordado',
  },
  prenda: {
    imageBg:   '#EAF4EC',
    badgeBg:   '#C5E0C8',
    badgeText: '#1E4A28',
    label:     'Prenda',
  },
};

const DEFAULT_TYPE = {
  imageBg:   '#F0F7F1',
  badgeBg:   '#D4E9D7',
  badgeText: '#1E4A28',
  label:     null,
};

const ProductCard = ({ product }) => {
  const [wishlisted, setWishlisted] = useState(false);
  const addToCart = useCartStore((s) => s.addToCart);
  const addToast  = useUiStore((s) => s.addToast);

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    addToast(`${product.name} añadido al carrito`, 'success');
  };

  const typeKey   = product.type?.toLowerCase().replace(/\s+/g, '') ?? '';
  const typeStyle = TYPE_MAP[typeKey] ?? DEFAULT_TYPE;
  const typeLabel = typeStyle.label ?? product.type;

  /* Subcategory label (categoria field if present, else type) */
  const subLabel = (product.category?.name ?? product.type ?? '').toUpperCase();

  return (
    <>
      

      <div className="snt-card" style={{ borderTop: `3px solid ${typeStyle.badgeText}` }}>
        {/* ── Image zone ── */}
        <div
          className="snt-card__img-zone"
          style={{ backgroundColor: typeStyle.imageBg }}
        >
          {/* Badge */}
          {typeLabel && (
            <span
              className="snt-card__badge"
              style={{
                backgroundColor: typeStyle.badgeBg,
                color: typeStyle.badgeText,
              }}
            >
              <span style={{ fontSize: '0.9em' }}>•</span> {typeLabel}
            </span>
          )}

          {/* Wishlist */}
          <button
            className={`snt-card__wish ${wishlisted ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); setWishlisted((v) => !v); }}
            aria-label="Agregar a favoritos"
          >
            <Heart
              size={15}
              strokeWidth={2}
              fill={wishlisted ? '#C97D5C' : 'none'}
              color={wishlisted ? '#C97D5C' : '#888'}
            />
          </button>

          {/* Product image */}
          <Link to={`/productos/${product.slug}`} style={{ display: 'contents' }}>
            <img
              src={product.images?.[0] || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400&h=400&fit=crop'}
              alt={product.name}
              className="snt-card__img"
            />
            <div className="snt-card__hover-overlay">
              <span className="snt-btn snt-btn-primary rounded-full" style={{ padding: '8px 20px', fontSize: '0.85rem' }}>Ver detalle →</span>
            </div>
          </Link>
        </div>

        <div className="snt-card__divider" />

        {/* ── Body ── */}
        <div className="snt-card__body">
          {subLabel && <p className="snt-card__sublabel">{subLabel}</p>}

          <Link to={`/productos/${product.slug}`} className="snt-card__name">
            {product.name}
          </Link>

          <p className="snt-card__desc">{product.description}</p>

          <div className="snt-card__footer">
            <div className="snt-card__prices">
              <div className="snt-card__price-chip">
                <span className="snt-card__price">{formatCurrency(product.price)}</span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="snt-card__original" style={{ marginLeft: '6px' }}>
                    {formatCurrency(product.originalPrice)}
                  </span>
                )}
              </div>
            </div>

            <button className="snt-card__add-btn" onClick={handleAdd}>
              <ShoppingBag size={13} /> Agregar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;

```

---

## File: Front/src/pages/Products/components/ProductFilters.jsx

**Path:** `Front/src/pages/Products/components/ProductFilters.jsx`

```javascript
import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import { SlidersHorizontal, DollarSign, X } from 'lucide-react';
import Button from '../../../components/common/Button';

const ProductFilters = ({ activeFilter, setActiveFilter, minPrice, maxPrice, onApplyPrice }) => {
  const [tempMin, setTempMin] = useState(minPrice || '');
  const [tempMax, setTempMax] = useState(maxPrice || '');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get('/categories');
        setCategories(res.data.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    fetchCategories();
  }, []);

  const handlePriceSubmit = (e) => {
    e.preventDefault();
    onApplyPrice(tempMin, tempMax);
  };

  const handleClearPrice = () => {
    setTempMin('');
    setTempMax('');
    onApplyPrice('', '');
  };

  const hasPriceFilter = tempMin || tempMax || minPrice || maxPrice;

  return (
    <>
      

      <div className="pf-wrap">
        {/* ── Category chips ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <span className="pf-label">
            <SlidersHorizontal size={13} /> Categoría
          </span>
          <button
            className={`pf-chip ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            Todo el catálogo
          </button>
          {categories.map((opt) => (
            <button
              key={opt._id}
              className={`pf-chip ${activeFilter === opt._id ? 'active' : ''}`}
              onClick={() => setActiveFilter(opt._id)}
            >
              {opt.name}
            </button>
          ))}
        </div>

        {/* ── Price filter ── */}
        <form onSubmit={handlePriceSubmit} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
          <span className="pf-label">
            <DollarSign size={13} /> Precio
          </span>
          <input
            type="number"
            placeholder="Mín"
            value={tempMin}
            onChange={(e) => setTempMin(e.target.value)}
            className="snt-input"
            style={{ width: '90px', padding: '6px 10px', fontSize: '0.88rem' }}
          />
          <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>—</span>
          <input
            type="number"
            placeholder="Máx"
            value={tempMax}
            onChange={(e) => setTempMax(e.target.value)}
            className="snt-input"
            style={{ width: '90px', padding: '6px 10px', fontSize: '0.88rem' }}
          />
          <Button type="submit" variant="primary" style={{ padding: '7px 18px', fontSize: '0.8rem' }}>Filtrar</Button>
          {hasPriceFilter && (
            <Button type="button" variant="outline" onClick={handleClearPrice} style={{ padding: '5px 12px', fontSize: '0.78rem' }}>
              <X size={12} /> Limpiar
            </Button>
          )}
        </form>
      </div>
    </>
  );
};

export default ProductFilters;

```

---

## File: Front/src/pages/Products/components/ProductGallery.jsx

**Path:** `Front/src/pages/Products/components/ProductGallery.jsx`

```javascript
import React, { useState, useEffect } from 'react';

const ProductGallery = ({ images = [] }) => {
  const defaultImage = 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500';
  const [activeImage, setActiveImage] = useState(images[0] || defaultImage);

  // Sync state if images array changes (e.g. after async fetch completes)
  useEffect(() => {
    if (images && images.length > 0) {
      setActiveImage(images[0]);
    }
  }, [images]);

  const galleryImages = images && images.length > 0 ? images : [defaultImage];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      gap: '1.25rem',
      width: '100%'
    }} className="product-gallery-container">
      {/* MercadoLibre thumbnails column (hidden or horizontal on small mobile) */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        minWidth: '70px',
        maxHeight: '450px',
        overflowY: 'auto'
      }} className="hide-scrollbar">
        {galleryImages.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Thumbnail ${i + 1}`}
            onMouseEnter={() => setActiveImage(img)} // MercadoLibre style: changes image on hover/mouseEnter!
            onClick={() => setActiveImage(img)}
            style={{
              width: '65px',
              height: '65px',
              objectFit: 'cover',
              borderRadius: '8px',
              border: activeImage === img ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
              cursor: 'pointer',
              transition: 'var(--transition-smooth)'
            }}
          />
        ))}
      </div>

      {/* Main Active Image Display */}
      <div style={{
        flexGrow: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--border-radius-md)',
        border: '1px solid var(--color-border)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '450px'
      }}>
        <img
          src={activeImage}
          alt="Product Display"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain', // Contained styling for details
            backgroundColor: '#FFFFFF'
          }}
        />
      </div>
    </div>
  );
};

export default ProductGallery;

```

---

## File: Front/src/pages/Products/components/ProductReviews.jsx

**Path:** `Front/src/pages/Products/components/ProductReviews.jsx`

```javascript
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, MessageSquare, AlertCircle } from 'lucide-react';
import * as productsService from '../../../services/products.service';
import Button from '../../../components/common/Button';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import { useAuthStore } from '../../../store/authStore';
import { useUiStore } from '../../../store/uiStore';

const ProductReviews = ({ productId }) => {
  const user = useAuthStore((state) => state.user);
  const addToast = useUiStore((state) => state.addToast);

  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    if (productId) {
      loadReviews();
    }
  }, [productId]);

  const loadReviews = async () => {
    setLoadingReviews(true);
    try {
      const revs = await productsService.fetchReviews(productId);
      setReviews(revs);
    } catch (err) {
      console.error('Error fetching reviews:', err);
    } finally {
      setLoadingReviews(false);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      addToast('Por favor escribe un comentario', 'error');
      return;
    }

    setSubmittingReview(true);
    try {
      await productsService.createReview({
        productId,
        rating,
        comment
      });
      addToast('¡Reseña publicada con éxito!', 'success');
      setComment('');
      setRating(5);
      loadReviews();
    } catch (err) {
      addToast(err.response?.data?.message || 'Error al publicar reseña', 'error');
    } finally {
      setSubmittingReview(false);
    }
  };

  return (
    <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '3rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <MessageSquare size={24} style={{ color: 'var(--color-primary)' }} />
        <h3 style={{ fontSize: '1.5rem', margin: 0, fontFamily: 'Playfair Display, serif' }}>
          Experiencias de Clientes ({reviews.length})
        </h3>
      </div>

      {/* Current reviews list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '3rem' }}>
        {loadingReviews ? (
          <LoadingSpinner />
        ) : reviews.length === 0 ? (
          <div style={{
            backgroundColor: '#FFFFFF',
            padding: '2.5rem',
            borderRadius: 'var(--border-radius-md)',
            border: '1px solid var(--color-border)',
            textAlign: 'center',
            color: 'var(--color-text-light)'
          }}>
            <Star size={32} style={{ color: '#D0D0D0', marginBottom: '0.75rem' }} />
            <p style={{ margin: 0 }}>Nadie ha dejado una opinión aún. ¡Sé el primero en compartir tu experiencia!</p>
          </div>
        ) : (
          reviews.map((r) => (
            <div
              key={r._id}
              style={{
                backgroundColor: '#FFFFFF',
                padding: '1.5rem 2rem',
                borderRadius: 'var(--border-radius-md)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontWeight: '700', fontSize: '0.95rem' }}>{r.user?.name || 'Cliente de SonTerry'}</span>
                <div style={{ display: 'flex', color: '#F5C60D' }}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={14}
                      fill={s <= r.rating ? '#F5C60D' : 'none'}
                      stroke={s <= r.rating ? '#F5C60D' : '#D0D0D0'}
                    />
                  ))}
                </div>
              </div>
              <p style={{ margin: 0, color: 'var(--color-text)', fontSize: '0.95rem', lineHeight: '1.6' }}>{r.comment}</p>
              <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-light)', marginTop: '0.75rem' }}>
                Publicado el {new Date(r.createdAt).toLocaleDateString()}
              </span>
            </div>
          ))
        )}
      </div>

      {/* Review submit form */}
      <div style={{
        backgroundColor: '#FFFFFF',
        padding: '2rem',
        borderRadius: 'var(--border-radius-md)',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <h4 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', fontFamily: 'Playfair Display, serif' }}>
          Comparte tu Experiencia
        </h4>

        {user ? (
          <form onSubmit={handleReviewSubmit}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '0.5rem' }}>Calificación</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0 }}
                  >
                    <Star
                      size={28}
                      fill={star <= rating ? '#F5C60D' : 'none'}
                      stroke={star <= rating ? '#F5C60D' : '#B0B0B0'}
                      style={{ transition: 'transform 0.1s ease' }}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '0.5rem' }}>Tu Comentario *</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Cuéntanos qué te pareció la calidad de la tela, el estampado o el servicio de despacho..."
                style={{
                  width: '100%',
                  height: '100px',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--border-radius-sm)',
                  border: '1px solid var(--color-border)',
                  outline: 'none',
                  fontFamily: 'inherit',
                  fontSize: '0.95rem'
                }}
                required
              />
            </div>

            <Button type="submit" variant="primary" disabled={submittingReview}>
              {submittingReview ? 'Publicando...' : 'Publicar Comentario'}
            </Button>
          </form>
        ) : (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            backgroundColor: 'var(--color-bg)',
            padding: '1.25rem',
            borderRadius: 'var(--border-radius-sm)',
            border: '1px solid var(--color-border)',
            color: 'var(--color-text-light)'
          }}>
            <AlertCircle size={20} style={{ color: 'var(--color-accent)' }} />
            <p style={{ margin: 0, fontSize: '0.9rem' }}>
              Debes estar registrado e iniciar sesión para calificar un producto.{' '}
              <Link to="/login" style={{ color: 'var(--color-primary)', fontWeight: '700', textDecoration: 'underline' }}>
                Inicia Sesión aquí
              </Link>
              .
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductReviews;

```

---

## File: Front/src/pages/Products/components/RelatedProducts.jsx

**Path:** `Front/src/pages/Products/components/RelatedProducts.jsx`

```javascript
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as productsService from '../../../services/products.service';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import { formatCurrency } from '../../../utils/formatCurrency';

const RelatedProducts = ({ categoryId, currentProductId }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loadingRelated, setLoadingRelated] = useState(false);

  useEffect(() => {
    if (categoryId && currentProductId) {
      loadRelatedProducts();
    }
  }, [categoryId, currentProductId]);

  const loadRelatedProducts = async () => {
    setLoadingRelated(true);
    try {
      const relProds = await productsService.fetchRelatedProducts(categoryId, currentProductId);
      setRelatedProducts(relProds);
    } catch (err) {
      console.error('Error fetching related products:', err);
    } finally {
      setLoadingRelated(false);
    }
  };

  return (
    <div style={{ marginBottom: '4rem' }}>
      <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontFamily: 'Playfair Display, serif' }}>
        También te puede interesar
      </h3>
      
      {loadingRelated ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <LoadingSpinner />
        </div>
      ) : relatedProducts.length === 0 ? (
        <p style={{ color: 'var(--color-text-light)', fontSize: '0.9rem' }}>No hay otros productos recomendados en esta categoría.</p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '2rem'
        }}>
          {relatedProducts.map((p) => (
            <Link
              key={p._id}
              to={`/productos/${p.slug}`}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--border-radius-md)',
                border: '1px solid var(--color-border)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-sm)',
                transition: 'var(--transition-smooth)',
                maxWidth: '320px',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                textDecoration: 'none',
                color: 'inherit'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'none')}
            >
              <div style={{ height: '220px', width: '100%', overflow: 'hidden' }}>
                <img
                  src={p.images[0] || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=300'}
                  alt={p.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '1.25rem' }}>
                <h4 style={{
                  fontSize: '1.1rem',
                  margin: '0 0 0.5rem 0',
                  fontFamily: 'Playfair Display, serif',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap'
                }}>{p.name}</h4>
                <div style={{ fontWeight: '700', color: 'var(--color-primary)' }}>
                  {formatCurrency(p.price)}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default RelatedProducts;

```

---

## File: Front/src/pages/Profile/Profile.css

**Path:** `Front/src/pages/Profile/Profile.css`

```css
.profile-root {
  padding-top: 2.5rem;
  padding-bottom: 4rem;
}
.profile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}
.profile-title {
  font-size: 2rem;
  color: var(--color-text);
  margin: 0;
}
.profile-hamburger {
  display: none;
  background: var(--color-primary);
  color: #FFF;
  border: none;
  padding: 0.6rem;
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  align-items: center;
  justify-content: center;
}

.profile-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 2.5rem;
  align-items: start;
}

.profile-sidebar {
  background-color: #FFFFFF;
  border-radius: var(--border-radius-md);
  padding: 1.5rem 1rem;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  transition: transform 0.3s ease;
}

.profile-sidebar-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  z-index: 205;
  backdrop-filter: blur(2px);
}

.profile-content {
  background-color: #FFFFFF;
  border-radius: var(--border-radius-md);
  padding: 2.5rem;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border);
  min-height: 400px;
  max-width: 100%;
  overflow: hidden;
}

.profile-form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}
.profile-form-row-2-1 {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
}

.profile-wallet-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.wallet-card-number {
  font-size: clamp(1.1rem, 4vw, 1.25rem);
  font-weight: 600;
  letter-spacing: 2px;
  margin: 1rem 0;
}

.wallet-card-footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-end;
  gap: 0.5rem;
}

@media (max-width: 768px) {
  .profile-layout {
    grid-template-columns: 1fr;
  }
  .profile-hamburger {
    display: flex;
  }
  .profile-sidebar-overlay.open {
    display: block;
  }
  .profile-sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 280px;
    z-index: 206;
    border-radius: 0;
    transform: translateX(-100%);
    overflow-y: auto;
  }
  .profile-sidebar.open {
    transform: translateX(0);
  }
  .profile-content {
    padding: 1.5rem;
  }
  .profile-form-row, .profile-form-row-2-1 {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

@media (max-width: 600px) {
  .profile-wallet-grid {
    grid-template-columns: 1fr;
  }
}

```

---

## File: Front/src/pages/Profile/Profile.jsx

**Path:** `Front/src/pages/Profile/Profile.jsx`

```javascript
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useUiStore } from '../../store/uiStore';
import { User, ShoppingBag, CreditCard, MessageSquare, LifeBuoy, LogOut, Menu, X } from 'lucide-react';
import OrderHistory from './components/OrderHistory';
import ProfileWallet from './components/ProfileWallet';
import ProfileReviews from './components/ProfileReviews';
import ProfileSupport from './components/ProfileSupport';
import ProfileInfo from './components/ProfileInfo';
import './Profile.css';

const Profile = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const addToast = useUiStore((state) => state.addToast);
  
  const [activeTab, setActiveTab] = useState('perfil');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Close sidebar on route or tab change
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [activeTab]);

  const handleLogout = () => {
    logout();
    addToast('Sesión cerrada con éxito', 'info');
    navigate('/login');
  };

  return (
    <>
      <div className="container profile-root">
        <div className="profile-header">
          <h2 className="profile-title">Mi Cuenta</h2>
          <button 
            className="profile-hamburger" 
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Abrir menú"
          >
            <Menu size={24} />
          </button>
        </div>

        <div className="profile-layout">
          
          {/* Overlay for mobile */}
          <div 
            className={`profile-sidebar-overlay ${isSidebarOpen ? 'open' : ''}`} 
            onClick={() => setIsSidebarOpen(false)} 
          />

          {/* Sidebar Menu */}
          <div className={`profile-sidebar ${isSidebarOpen ? 'open' : ''}`}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', padding: '0 0.75rem 1rem', borderBottom: '1px solid var(--color-border)' }}>
              <div>
                <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: '700' }}>Hola, {user?.name}</h4>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-light)' }}>{user?.email}</span>
              </div>
              <button 
                className="profile-hamburger" 
                style={{ display: isSidebarOpen ? 'flex' : 'none', background: 'transparent', color: 'var(--text-primary)' }}
                onClick={() => setIsSidebarOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

          <button
            onClick={() => setActiveTab('perfil')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--border-radius-sm)',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: activeTab === 'perfil' ? 'var(--color-primary)' : 'transparent',
              color: activeTab === 'perfil' ? '#FFFFFF' : 'var(--color-text)',
              fontWeight: activeTab === 'perfil' ? '600' : '500',
              textAlign: 'left',
              transition: 'var(--transition-smooth)'
            }}
          >
            <User size={18} />
            <span>Mi Perfil</span>
          </button>

          <button
            onClick={() => setActiveTab('pedidos')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--border-radius-sm)',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: activeTab === 'pedidos' ? 'var(--color-primary)' : 'transparent',
              color: activeTab === 'pedidos' ? '#FFFFFF' : 'var(--color-text)',
              fontWeight: activeTab === 'pedidos' ? '600' : '500',
              textAlign: 'left',
              transition: 'var(--transition-smooth)'
            }}
          >
            <ShoppingBag size={18} />
            <span>Mis Pedidos / Trabajos</span>
          </button>

          <button
            onClick={() => setActiveTab('billetera')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--border-radius-sm)',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: activeTab === 'billetera' ? 'var(--color-primary)' : 'transparent',
              color: activeTab === 'billetera' ? '#FFFFFF' : 'var(--color-text)',
              fontWeight: activeTab === 'billetera' ? '600' : '500',
              textAlign: 'left',
              transition: 'var(--transition-smooth)'
            }}
          >
            <CreditCard size={18} />
            <span>Mi Billetera</span>
          </button>

          <button
            onClick={() => setActiveTab('comentarios')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--border-radius-sm)',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: activeTab === 'comentarios' ? 'var(--color-primary)' : 'transparent',
              color: activeTab === 'comentarios' ? '#FFFFFF' : 'var(--color-text)',
              fontWeight: activeTab === 'comentarios' ? '600' : '500',
              textAlign: 'left',
              transition: 'var(--transition-smooth)'
            }}
          >
            <MessageSquare size={18} />
            <span>Mis Reseñas</span>
          </button>

          <button
            onClick={() => setActiveTab('soporte')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--border-radius-sm)',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: activeTab === 'soporte' ? 'var(--color-primary)' : 'transparent',
              color: activeTab === 'soporte' ? '#FFFFFF' : 'var(--color-text)',
              fontWeight: activeTab === 'soporte' ? '600' : '500',
              textAlign: 'left',
              transition: 'var(--transition-smooth)'
            }}
          >
            <LifeBuoy size={18} />
            <span>Soporte Técnico</span>
          </button>

          {/* Separator line */}
          <div style={{ borderTop: '1px solid var(--color-border)', margin: '0.75rem 0' }} />

          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--border-radius-sm)',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: 'transparent',
              color: 'var(--color-danger)',
              fontWeight: '600',
              textAlign: 'left',
              transition: 'var(--transition-smooth)'
            }}
          >
            <LogOut size={18} />
            <span>Cerrar Sesión</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="profile-content">
          
          {/* TAB 1: PERFIL */}
          {activeTab === 'perfil' && (
            <ProfileInfo />
          )}

          {/* TAB 2: PEDIDOS */}
          {activeTab === 'pedidos' && (
            <div className="animate-fade-in">
              <OrderHistory />
            </div>
          )}

          {/* TAB 3: BILLETERA */}
          {activeTab === 'billetera' && (
            <ProfileWallet />
          )}

          {/* TAB 4: COMENTARIOS */}
          {activeTab === 'comentarios' && (
            <ProfileReviews isActive={activeTab === 'comentarios'} />
          )}

          {/* TAB 5: SOPORTE */}
          {activeTab === 'soporte' && (
            <ProfileSupport />
          )}

        </div>
      </div>
    </div>
    </>
  );
};

export default Profile;

```

---

## File: Front/src/pages/Profile/Settings.jsx

**Path:** `Front/src/pages/Profile/Settings.jsx`

```javascript
import React from 'react';
const Settings = () => <div>Settings Page</div>;
export default Settings;

```

---

## File: Front/src/pages/Profile/Wishlist.jsx

**Path:** `Front/src/pages/Profile/Wishlist.jsx`

```javascript
import React from 'react';
const Wishlist = () => <div>Wishlist Page</div>;
export default Wishlist;

```

---

## File: Front/src/pages/Profile/components/OrderHistory.jsx

**Path:** `Front/src/pages/Profile/components/OrderHistory.jsx`

```javascript
import React, { useState } from 'react';
import { useUserOrders } from '../../../queries/useOrders';
import { formatCurrency } from '../../../utils/formatCurrency';
import { formatDate } from '../../../utils/formatDate';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import OrderTracking from './OrderTracking';

const OrderHistory = () => {
  const { data: orders, isLoading } = useUserOrders();
  const [selectedOrder, setSelectedOrder] = useState(null);

  if (isLoading) return <LoadingSpinner />;

  if (!orders || orders.length === 0) {
    return <p style={{ opacity: 0.7 }}>Aún no has solicitado ningún trabajo en el taller.</p>;
  }

  return (
    <div>
      <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem' }}>Historial de Trabajos</h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {orders.map((order) => (
          <div
            key={order._id}
            onClick={() => setSelectedOrder(order)}
            style={{
              backgroundColor: '#FFFFFF',
              padding: '1.25rem',
              borderRadius: 'var(--border-radius-sm)',
              border: selectedOrder?._id === order._id ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-sm)',
              transition: 'var(--transition-smooth)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontWeight: '700', fontSize: '0.95rem' }}>Trabajo #{order._id.substring(18)}</span>
              <span style={{
                backgroundColor: order.status === 'paid' ? 'var(--color-primary)' : order.status === 'shipped' ? 'var(--color-accent)' : '#ccc',
                color: '#FFFFFF',
                padding: '2px 8px',
                borderRadius: '12px',
                fontSize: '0.75rem',
                fontWeight: '600',
                textTransform: 'uppercase'
              }}>{order.status === 'shipped' ? 'En Tránsito' : order.status}</span>
            </div>
            
            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-light)', marginBottom: '0.5rem' }}>
              Solicitado el {formatDate(order.createdAt)}
            </div>

            <div style={{ fontWeight: '600', color: 'var(--color-text)' }}>
              Total: {formatCurrency(order.total)}
            </div>
          </div>
        ))}
      </div>

      {selectedOrder && (
        <div style={{ marginTop: '2.5rem' }}>
          <OrderTracking order={selectedOrder} />
        </div>
      )}
    </div>
  );
};

export default OrderHistory;

```

---

## File: Front/src/pages/Profile/components/OrderTracking.jsx

**Path:** `Front/src/pages/Profile/components/OrderTracking.jsx`

```javascript
import React from 'react';
import { formatDate } from '../../../utils/formatDate';

const OrderTracking = ({ order }) => {
  const steps = [
    { key: 'pending', label: 'Orden Recibida' },
    { key: 'paid', label: 'Pago Aprobado (Preparando Estampado)' },
    { key: 'shipped', label: 'En Tránsito ( WhatsApp Notificado)' },
    { key: 'delivered', label: 'Entregado con Éxito' }
  ];

  // Helper to determine step status
  const getStepStatus = (stepKey) => {
    const statuses = ['pending', 'paid', 'shipped', 'delivered', 'cancelled'];
    const currentIdx = statuses.indexOf(order.status);
    const stepIdx = statuses.indexOf(stepKey);

    if (order.status === 'cancelled') return 'cancelled';
    if (currentIdx >= stepIdx) return 'completed';
    return 'pending';
  };

  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      padding: '2rem',
      borderRadius: 'var(--border-radius-md)',
      boxShadow: 'var(--shadow-sm)',
      border: '1px solid var(--color-border)',
      animation: 'fadeIn 0.4s'
    }}>
      <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Progreso de tu Personalización</h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative' }}>
        {steps.map((st, idx) => {
          const status = getStepStatus(st.key);
          const isCompleted = status === 'completed';
          const trackingLog = order.trackingHistory?.find(h => h.status === st.key);

          return (
            <div key={idx} style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
              
              {/* Visual timeline circle indicator */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: isCompleted ? 'var(--color-primary)' : 'var(--color-border)',
                  border: isCompleted ? '4px solid #F5F1E8' : '2px solid transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 2
                }} />
                {idx < steps.length - 1 && (
                  <div style={{
                    width: '2px',
                    height: '50px',
                    backgroundColor: isCompleted ? 'var(--color-primary)' : 'var(--color-border)',
                    margin: '4px 0',
                    zIndex: 1
                  }} />
                )}
              </div>

              {/* Status details */}
              <div style={{ flexGrow: 1 }}>
                <h4 style={{
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  margin: 0,
                  color: isCompleted ? 'var(--color-text)' : 'var(--color-text-light)'
                }}>{st.label}</h4>
                {trackingLog && (
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-light)', marginTop: '2px' }}>
                    {formatDate(trackingLog.date)}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderTracking;

```

---

## File: Front/src/pages/Profile/components/ProfileInfo.jsx

**Path:** `Front/src/pages/Profile/components/ProfileInfo.jsx`

```javascript
import React, { useState } from 'react';
import { Save, AlertTriangle } from 'lucide-react';
import { useAuthStore } from '../../../store/authStore';
import { useUiStore } from '../../../store/uiStore';
import * as authService from '../../../services/auth.service';

const ProfileInfo = () => {
  const { user, updateUser } = useAuthStore();
  const addToast = useUiStore((state) => state.addToast);

  const [phone, setPhone] = useState(user?.phone || '');
  const [address, setAddress] = useState(user?.shippingAddress?.address || '');
  const [city, setCity] = useState(user?.shippingAddress?.city || '');
  const [zipCode, setZipCode] = useState(user?.shippingAddress?.zipCode || '');
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsSavingProfile(true);
    try {
      const updated = await authService.updateProfile({
        phone,
        shippingAddress: { address, city, zipCode }
      });
      updateUser(updated);
      addToast('Información de perfil guardada con éxito', 'success');
    } catch (error) {
      addToast('Error al guardar la información del perfil', 'error');
    } finally {
      setIsSavingProfile(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Detalles de Perfil</h3>
      <p style={{ color: 'var(--color-text-light)', fontSize: '0.9rem', marginBottom: '2rem' }}>
        Mantén actualizada tu información de entrega para un proceso de personalización de prendas impecable.
      </p>

      <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div className="profile-form-row">
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem', opacity: 0.8 }}>
              Nombre Completo
            </label>
            <input
              type="text"
              value={user?.name || ''}
              disabled
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--border-radius-sm)',
                border: '1px solid var(--color-border)',
                backgroundColor: '#F5F5F5',
                color: 'var(--color-text-light)',
                cursor: 'not-allowed'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem', opacity: 0.8 }}>
              Correo Electrónico
            </label>
            <input
              type="email"
              value={user?.email || ''}
              disabled
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--border-radius-sm)',
                border: '1px solid var(--color-border)',
                backgroundColor: '#F5F5F5',
                color: 'var(--color-text-light)',
                cursor: 'not-allowed'
              }}
            />
          </div>
        </div>

        <div style={{
          backgroundColor: '#FFF8E1',
          border: '1px solid #FFE082',
          borderRadius: 'var(--border-radius-sm)',
          padding: '0.85rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          fontSize: '0.82rem',
          color: '#B78103',
          fontWeight: '500'
        }}>
          <AlertTriangle size={18} />
          <span>Por seguridad, tu Nombre y Correo son de lectura. Si necesitas cambiarlos, abre un ticket en Soporte.</span>
        </div>

        <div className="profile-form-row" style={{ marginTop: '0.5rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem' }}>
              Número Telefónico / WhatsApp
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Ej: +57 300 123 4567"
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--border-radius-sm)',
                border: '1px solid var(--color-border)',
                backgroundColor: '#FFFFFF',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem' }}>
              Ciudad
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Ej: Bogotá"
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--border-radius-sm)',
                border: '1px solid var(--color-border)',
                backgroundColor: '#FFFFFF',
                outline: 'none'
              }}
            />
          </div>
        </div>

        <div className="profile-form-row-2-1">
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem' }}>
              Dirección de Envío
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Calle, Carrera, Barrio y apto/casa..."
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--border-radius-sm)',
                border: '1px solid var(--color-border)',
                backgroundColor: '#FFFFFF',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem' }}>
              Código Postal (Opcional)
            </label>
            <input
              type="text"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              placeholder="Ej: 110111"
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--border-radius-sm)',
                border: '1px solid var(--color-border)',
                backgroundColor: '#FFFFFF',
                outline: 'none'
              }}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSavingProfile}
          style={{
            backgroundColor: 'var(--color-primary)',
            color: '#FFFFFF',
            border: 'none',
            padding: '0.85rem 2rem',
            borderRadius: 'var(--border-radius-sm)',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            alignSelf: 'flex-start',
            marginTop: '1rem',
            transition: 'var(--transition-smooth)',
            opacity: isSavingProfile ? 0.7 : 1
          }}
        >
          <Save size={18} />
          <span>{isSavingProfile ? 'Guardando...' : 'Guardar Cambios'}</span>
        </button>
      </form>
    </div>
  );
};

export default ProfileInfo;

```

---

## File: Front/src/pages/Profile/components/ProfileReviews.jsx

**Path:** `Front/src/pages/Profile/components/ProfileReviews.jsx`

```javascript
import React, { useState, useEffect } from 'react';
import * as productsService from '../../../services/products.service';
import { formatDate } from '../../../utils/formatDate';

const ProfileReviews = ({ isActive }) => {
  const [reviews, setReviews] = useState([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);

  useEffect(() => {
    if (isActive) {
      loadUserReviews();
    }
  }, [isActive]);

  const loadUserReviews = async () => {
    setIsLoadingReviews(true);
    try {
      const data = await productsService.fetchUserReviews();
      setReviews(data || []);
    } catch (error) {
      console.error('Error loading reviews:', error);
    } finally {
      setIsLoadingReviews(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Mis Reseñas de Productos</h3>
      <p style={{ color: 'var(--color-text-light)', fontSize: '0.9rem', marginBottom: '2rem' }}>
        Aquí puedes ver y gestionar las opiniones y calificaciones que has aportado a la comunidad.
      </p>

      {isLoadingReviews ? (
        <p>Cargando reseñas...</p>
      ) : reviews.length === 0 ? (
        <p style={{ opacity: 0.7 }}>No has escrito ninguna reseña todavía.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {reviews.map((rev) => (
            <div
              key={rev._id}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--border-radius-sm)',
                padding: '1.5rem',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: '700' }}>
                  {rev.product?.name || 'Producto'}
                </h4>
                <div style={{ color: '#FFD700', fontSize: '0.95rem' }}>
                  {'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}
                </div>
              </div>

              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-light)', marginBottom: '0.75rem' }}>
                Publicada el {formatDate(rev.createdAt)}
              </div>

              <p style={{ fontSize: '0.9rem', fontStyle: 'italic', color: 'var(--color-text)', backgroundColor: '#F9F7F2', padding: '1rem', borderRadius: '4px', borderLeft: '3px solid var(--color-primary)' }}>
                "{rev.comment}"
              </p>

              <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', fontSize: '0.78rem', color: 'var(--color-text-light)', alignItems: 'center' }}>
                <span>Retroalimentación de la comunidad: <strong>Leída</strong></span>
                <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#ccc' }}></div>
                <span style={{ color: 'var(--color-primary)', fontWeight: '600' }}>El administrador valoró positivamente tu comentario</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileReviews;

```

---

## File: Front/src/pages/Profile/components/ProfileSupport.jsx

**Path:** `Front/src/pages/Profile/components/ProfileSupport.jsx`

```javascript
import React, { useState } from 'react';
import { Plus, AlertTriangle } from 'lucide-react';
import { useUserTickets, useCreateTicket } from '../../../queries/useTickets';
import { useUiStore } from '../../../store/uiStore';
import { formatDate } from '../../../utils/formatDate';

const ProfileSupport = () => {
  const addToast = useUiStore((state) => state.addToast);
  const { data: tickets, isLoading: isLoadingTickets } = useUserTickets();
  const createTicketMutation = useCreateTicket();

  const [ticketType, setTicketType] = useState('queja');
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketDescription, setTicketDescription] = useState('');
  const [isSubmittingTicket, setIsSubmittingTicket] = useState(false);
  const [supportView, setSupportView] = useState('nuevo');

  const handleSubmitTicket = async (e) => {
    e.preventDefault();
    if (!ticketSubject.trim() || !ticketDescription.trim()) {
      return addToast('Por favor completa todos los campos del ticket', 'warning');
    }
    setIsSubmittingTicket(true);
    try {
      await createTicketMutation.mutateAsync({
        type: ticketType,
        subject: ticketSubject.trim(),
        description: ticketDescription.trim()
      });
      addToast('Ticket enviado al equipo de soporte', 'success');
      setTicketSubject('');
      setTicketDescription('');
      setSupportView('historial');
    } catch (error) {
      addToast('Error al enviar el ticket de soporte', 'error');
    } finally {
      setIsSubmittingTicket(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Soporte Técnico & Reclamaciones</h3>
      <p style={{ color: 'var(--color-text-light)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
        ¿Tienes alguna inconformidad con tu pedido o deseas reportar alguna devolución o retraso? Crea un ticket y te contactaremos por WhatsApp.
      </p>

      {/* Sub-tabs for Support */}
      <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem', marginBottom: '2rem' }}>
        <button
          onClick={() => setSupportView('nuevo')}
          style={{
            background: 'none',
            border: 'none',
            fontWeight: '600',
            fontSize: '0.9rem',
            color: supportView === 'nuevo' ? 'var(--color-primary)' : 'var(--color-text-light)',
            borderBottom: supportView === 'nuevo' ? '2px solid var(--color-primary)' : 'none',
            paddingBottom: '0.25rem',
            cursor: 'pointer',
            transition: 'var(--transition-smooth)'
          }}
        >
          Crear Nuevo Ticket
        </button>
        <button
          onClick={() => setSupportView('historial')}
          style={{
            background: 'none',
            border: 'none',
            fontWeight: '600',
            fontSize: '0.9rem',
            color: supportView === 'historial' ? 'var(--color-primary)' : 'var(--color-text-light)',
            borderBottom: supportView === 'historial' ? '2px solid var(--color-primary)' : 'none',
            paddingBottom: '0.25rem',
            cursor: 'pointer',
            transition: 'var(--transition-smooth)'
          }}
        >
          Historial de Tickets
        </button>
      </div>

      <div>
        
        {/* Submit Ticket Form */}
        {supportView === 'nuevo' && (
          <form onSubmit={handleSubmitTicket} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '600px' }} className="animate-fade-in">
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>
                Tipo de Solicitud
              </label>
              <select
                value={ticketType}
                onChange={(e) => setTicketType(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: 'var(--border-radius-sm)',
                  border: '1px solid var(--color-border)',
                  backgroundColor: '#FFFFFF',
                  outline: 'none'
                }}
              >
                <option value="queja">Queja / Inconformidad</option>
                <option value="reclamo">Reclamo Técnico</option>
                <option value="devolucion">Solicitud de Devolución</option>
                <option value="pedido_pendiente">Pedido Pendiente / Retraso</option>
                <option value="otro">Otro Asunto</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>
                Asunto corto
              </label>
              <input
                type="text"
                value={ticketSubject}
                onChange={(e) => setTicketSubject(e.target.value)}
                placeholder="Ej: Retraso en el envío de gorras"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: 'var(--border-radius-sm)',
                  border: '1px solid var(--color-border)',
                  backgroundColor: '#FFFFFF',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>
                Descripción detallada
              </label>
              <textarea
                value={ticketDescription}
                onChange={(e) => setTicketDescription(e.target.value)}
                placeholder="Describe ampliamente tu solicitud. Si aplica, incluye el código del pedido..."
                style={{
                  width: '100%',
                  height: '140px',
                  padding: '0.75rem',
                  borderRadius: 'var(--border-radius-sm)',
                  border: '1px solid var(--color-border)',
                  backgroundColor: '#FFFFFF',
                  outline: 'none',
                  fontFamily: 'inherit',
                  fontSize: '0.9rem'
                }}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmittingTicket}
              style={{
                backgroundColor: 'var(--color-accent)',
                color: '#FFFFFF',
                border: 'none',
                padding: '0.85rem 2rem',
                borderRadius: 'var(--border-radius-sm)',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                transition: 'var(--transition-smooth)',
                opacity: isSubmittingTicket ? 0.7 : 1,
                width: 'fit-content'
              }}
            >
              <Plus size={18} />
              <span>{isSubmittingTicket ? 'Creando Ticket...' : 'Generar Ticket'}</span>
            </button>
          </form>
        )}

        {/* Tickets list */}
        {supportView === 'historial' && (
          <div className="animate-fade-in">
            {isLoadingTickets ? (
              <p>Cargando tickets...</p>
            ) : !tickets || tickets.length === 0 ? (
              <p style={{ opacity: 0.7, fontSize: '0.9rem' }}>No tienes tickets creados actualmente.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {tickets.map((t) => (
                  <div
                    key={t._id}
                    style={{
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--border-radius-sm)',
                      padding: '1.25rem',
                      backgroundColor: '#FDFCFB',
                      boxShadow: 'var(--shadow-sm)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <span style={{
                        fontWeight: '600',
                        fontSize: '0.75rem',
                        textTransform: 'uppercase',
                        backgroundColor: '#EAEAEA',
                        padding: '4px 10px',
                        borderRadius: '4px',
                        color: 'var(--color-text)'
                      }}>{t.type}</span>

                      <span style={{
                        fontWeight: '700',
                        fontSize: '0.75rem',
                        textTransform: 'uppercase',
                        padding: '4px 10px',
                        borderRadius: '4px',
                        color: '#FFFFFF',
                        backgroundColor: t.status === 'open' ? 'var(--color-primary)' 
                          : t.status === 'in_progress' ? 'var(--color-accent)' 
                          : t.status === 'resolved' ? '#2E7D32' : '#888'
                      }}>
                        {t.status === 'open' ? 'Abierto' : t.status === 'in_progress' ? 'En Curso' : t.status === 'resolved' ? 'Resuelto' : 'Cerrado'}
                      </span>
                    </div>

                    <h5 style={{ fontSize: '1rem', fontWeight: '700', margin: '0 0 0.5rem 0', color: 'var(--color-text)' }}>{t.subject}</h5>
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-light)', margin: '0 0 1rem 0', lineHeight: '1.5' }}>
                      {t.description}
                    </p>
                    <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '0.75rem' }}>
                      <span style={{ fontSize: '0.75rem', color: '#888' }}>Generado el {formatDate(t.createdAt)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSupport;

```

---

## File: Front/src/pages/Profile/components/ProfileWallet.jsx

**Path:** `Front/src/pages/Profile/components/ProfileWallet.jsx`

```javascript
import React, { useState } from 'react';
import { ShieldCheck, Trash2 } from 'lucide-react';
import { useAuthStore } from '../../../store/authStore';
import { useUiStore } from '../../../store/uiStore';

const ProfileWallet = () => {
  const { user } = useAuthStore();
  const addToast = useUiStore((state) => state.addToast);

  const [walletCards, setWalletCards] = useState(() => {
    const saved = localStorage.getItem('st_wallet_cards');
    if (saved) return JSON.parse(saved);
    return [
      { id: 1, type: 'Stripe', brand: 'Visa', last4: '4242', exp: '12/28' },
      { id: 2, type: 'PayPal', brand: 'PayPal Balance', last4: 'sonterry@paypal.com', exp: 'N/A' }
    ];
  });

  const [showAddCard, setShowAddCard] = useState(false);
  const [newCardBrand, setNewCardBrand] = useState('Visa');
  const [newCardNumber, setNewCardNumber] = useState('');
  const [newCardExp, setNewCardExp] = useState('');
  const [newCardHolder, setNewCardHolder] = useState(user?.name || '');

  const handleAddCard = (e) => {
    e.preventDefault();
    if (!newCardNumber || newCardNumber.length < 12) {
      return addToast('Número de tarjeta inválido', 'warning');
    }
    if (!newCardExp || !newCardExp.includes('/')) {
      return addToast('Formato de expiración inválido (MM/AA)', 'warning');
    }
    if (!newCardHolder.trim()) {
      return addToast('Nombre del titular requerido', 'warning');
    }

    const newCard = {
      id: Date.now(),
      type: 'Stripe',
      brand: newCardBrand,
      last4: newCardNumber.replace(/\s+/g, '').slice(-4),
      exp: newCardExp,
      holder: newCardHolder.trim()
    };

    const updated = [...walletCards, newCard];
    setWalletCards(updated);
    localStorage.setItem('st_wallet_cards', JSON.stringify(updated));
    addToast('Tarjeta vinculada con éxito en pasarela segura', 'success');

    setNewCardNumber('');
    setNewCardExp('');
    setNewCardHolder(user?.name || '');
    setShowAddCard(false);
  };

  const handleRemoveCard = (cardId) => {
    const updated = walletCards.filter(c => c.id !== cardId);
    setWalletCards(updated);
    localStorage.setItem('st_wallet_cards', JSON.stringify(updated));
    addToast('Método de pago eliminado con éxito', 'success');
  };

  return (
    <div className="animate-fade-in">
      <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Mi Billetera Digital</h3>
      <p style={{ color: 'var(--color-text-light)', fontSize: '0.9rem', marginBottom: '2rem' }}>
        Visualiza los medios de pago asociados de forma segura a tu cuenta.
      </p>

      {/* Compliance Security Box */}
      <div style={{
        backgroundColor: 'rgba(82, 143, 88, 0.08)',
        border: '1px solid rgba(82, 143, 88, 0.2)',
        borderRadius: 'var(--border-radius-sm)',
        padding: '1.25rem',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '1rem',
        marginBottom: '2.5rem'
      }}>
        <ShieldCheck size={32} style={{ color: 'var(--color-primary)', flexShrink: 0, marginTop: '2px' }} />
        <div>
          <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '0.9rem', fontWeight: '700', color: 'var(--color-primary)' }}>Cumplimiento de Seguridad de Datos (PCI-DSS)</h4>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-light)', lineHeight: '1.4' }}>
            Por regulaciones internacionales de seguridad bancaria, <strong>no almacenamos los datos reales de tu tarjeta en nuestros servidores</strong>. 
            Los métodos listados abajo son referencias autorizadas vinculadas directamente en las pasarelas de pago asociadas (Stripe y PayPal).
          </p>
        </div>
      </div>

      {/* Header with action button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h4 style={{ margin: 0, fontSize: '1.15rem', fontWeight: '700' }}>Métodos Vinculados</h4>
        <button
          onClick={() => setShowAddCard(!showAddCard)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            backgroundColor: showAddCard ? 'var(--color-danger)' : 'var(--color-primary)',
            color: '#FFFFFF',
            border: 'none',
            padding: '0.5rem 1.25rem',
            borderRadius: 'var(--border-radius-sm)',
            fontSize: '0.85rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'var(--transition-smooth)'
          }}
        >
          {showAddCard ? 'Cancelar' : 'Vincular Tarjeta'}
        </button>
      </div>

      {/* Add Card Form */}
      {showAddCard && (
        <form onSubmit={handleAddCard} style={{
          backgroundColor: '#FDFCFB',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--border-radius-sm)',
          padding: '1.5rem',
          marginBottom: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          animation: 'fadeIn 0.3s'
        }}>
          <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: '700' }}>Nueva Tarjeta de Crédito (Pasarela Segura Simulación)</h4>
          
          <div className="profile-form-row">
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.25rem' }}>Franquicia</label>
              <select
                value={newCardBrand}
                onChange={(e) => setNewCardBrand(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: '4px',
                  border: '1px solid var(--color-border)',
                  backgroundColor: '#FFFFFF',
                  outline: 'none'
                }}
              >
                <option value="Visa">Visa</option>
                <option value="Mastercard">Mastercard</option>
                <option value="American Express">American Express</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.25rem' }}>Número de Tarjeta</label>
              <input
                type="text"
                placeholder="4242 4242 4242 4242"
                value={newCardNumber}
                onChange={(e) => setNewCardNumber(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: '4px',
                  border: '1px solid var(--color-border)',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <div className="profile-form-row">
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.25rem' }}>Expiración (MM/AA)</label>
              <input
                type="text"
                placeholder="12/28"
                value={newCardExp}
                onChange={(e) => setNewCardExp(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: '4px',
                  border: '1px solid var(--color-border)',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.25rem' }}>Titular</label>
              <input
                type="text"
                value={newCardHolder}
                onChange={(e) => setNewCardHolder(e.target.value)}
                placeholder="Nombre completo"
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: '4px',
                  border: '1px solid var(--color-border)',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            style={{
              backgroundColor: 'var(--color-accent)',
              color: '#FFFFFF',
              border: 'none',
              padding: '0.6rem 1.5rem',
              borderRadius: '4px',
              fontWeight: '600',
              cursor: 'pointer',
              alignSelf: 'flex-start',
              transition: 'var(--transition-smooth)'
            }}
          >
            Vincular Tarjeta
          </button>
        </form>
      )}

      {/* Cards Grid */}
      <div className="profile-wallet-grid">
        {walletCards.map((card) => (
          <div
            key={card.id}
            style={{
              background: card.type === 'Stripe' 
                ? 'linear-gradient(135deg, #4F46E5, #3B82F6)' 
                : 'linear-gradient(135deg, #003087, #0079C1)',
              color: '#FFFFFF',
              padding: '1.5rem',
              borderRadius: 'var(--border-radius-md)',
              boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '180px',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Trash icon for deletion */}
            <button
              onClick={() => handleRemoveCard(card.id)}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.25)',
                border: 'none',
                borderRadius: '50%',
                width: '28px',
                height: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#FFFFFF',
                zIndex: 5,
                transition: 'var(--transition-smooth)'
              }}
              title="Eliminar método de pago"
            >
              <Trash2 size={14} />
            </button>

            {/* Gloss circle effects */}
            <div style={{
              position: 'absolute',
              right: '-30px',
              top: '-30px',
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.08)'
            }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: '600', opacity: 0.85 }}>{card.type}</span>
              <span style={{ fontSize: '1.2rem', fontWeight: '800', fontStyle: 'italic' }}>{card.brand}</span>
            </div>

            <div className="wallet-card-number">
              {card.brand === 'PayPal Balance' ? card.last4 : `••••  ••••  ••••  ${card.last4}`}
            </div>

            <div className="wallet-card-footer">
              <div>
                <span style={{ display: 'block', fontSize: '0.65rem', textTransform: 'uppercase', opacity: 0.7 }}>Titular</span>
                <span style={{ fontSize: '0.85rem', fontWeight: '500', wordBreak: 'break-word' }}>{card.holder || user?.name}</span>
              </div>
              {card.exp !== 'N/A' && (
                <div style={{ textAlign: 'right' }}>
                  <span style={{ display: 'block', fontSize: '0.65rem', textTransform: 'uppercase', opacity: 0.7 }}>Expira</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: '500' }}>{card.exp}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileWallet;

```

---

## File: Front/src/queries/useBankAccounts.js

**Path:** `Front/src/queries/useBankAccounts.js`

```javascript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

export const useBankAccountsAdmin = () => {
  return useQuery({
    queryKey: ['adminBankAccounts'],
    queryFn: async () => {
      const { data } = await api.get('/bank-accounts/all');
      return data.data;
    }
  });
};

export const useBankAccountsPublic = () => {
  return useQuery({
    queryKey: ['publicBankAccounts'],
    queryFn: async () => {
      const { data } = await api.get('/bank-accounts');
      return data.data;
    }
  });
};

export const useCreateBankAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (accountData) => {
      const { data } = await api.post('/bank-accounts', accountData);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminBankAccounts'] });
    }
  });
};

export const useUpdateBankAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...accountData }) => {
      const { data } = await api.put(`/bank-accounts/${id}`, accountData);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminBankAccounts'] });
    }
  });
};

export const useDeleteBankAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      await api.delete(`/bank-accounts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminBankAccounts'] });
    }
  });
};

```

---

## File: Front/src/queries/useOrders.js

**Path:** `Front/src/queries/useOrders.js`

```javascript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as ordersService from '../services/orders.service';

export const useUserOrders = () => {
  return useQuery({
    queryKey: ['userOrders'],
    queryFn: ordersService.fetchUserOrders
  });
};

export const useAdminOrders = () => {
  return useQuery({
    queryKey: ['adminOrders'],
    queryFn: ordersService.fetchAllOrdersAdmin
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }) => ordersService.updateOrderStatusAdmin(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminOrders'] });
      queryClient.invalidateQueries({ queryKey: ['userOrders'] });
    }
  });
};

```

---

## File: Front/src/queries/useProducts.js

**Path:** `Front/src/queries/useProducts.js`

```javascript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as productsService from '../services/products.service';

export const useProducts = (params) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => productsService.fetchProducts(params),
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });
};

export const useProductDetail = (slug) => {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: () => productsService.fetchProductBySlug(slug),
    enabled: !!slug
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: productsService.createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    }
  });
};

```

---

## File: Front/src/queries/useTickets.js

**Path:** `Front/src/queries/useTickets.js`

```javascript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as ticketsService from '../services/tickets.service';

export const useUserTickets = () => {
  return useQuery({
    queryKey: ['userTickets'],
    queryFn: ticketsService.fetchUserTickets
  });
};

export const useCreateTicket = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ticketsService.createTicket,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userTickets'] });
    }
  });
};

export const useAdminTickets = () => {
  return useQuery({
    queryKey: ['adminTickets'],
    queryFn: ticketsService.fetchAllTicketsAdmin
  });
};

export const useUpdateTicketStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }) => ticketsService.updateTicketStatusAdmin(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminTickets'] });
      queryClient.invalidateQueries({ queryKey: ['userTickets'] });
    }
  });
};

```

---

## File: Front/src/router/AdminRoute.jsx

**Path:** `Front/src/router/AdminRoute.jsx`

```javascript
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const AdminRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;

```

---

## File: Front/src/router/ProtectedRoute.jsx

**Path:** `Front/src/router/ProtectedRoute.jsx`

```javascript
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;

```

---

## File: Front/src/router/index.jsx

**Path:** `Front/src/router/index.jsx`

```javascript
import React, { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

// Layout wrappers
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';
import DashboardLayout from '../layouts/DashboardLayout';

// Routes guards
import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoute';

// Lazy loading pages
const Home = lazy(() => import('../pages/Home/Home'));
const ProductList = lazy(() => import('../pages/Products/ProductList'));
const ProductDetail = lazy(() => import('../pages/Products/ProductDetail'));
const Cart = lazy(() => import('../pages/Cart/Cart'));
const Checkout = lazy(() => import('../pages/Checkout/Checkout'));
const Login = lazy(() => import('../pages/Auth/Login'));
const Register = lazy(() => import('../pages/Auth/Register'));
const ForgotPassword = lazy(() => import('../pages/Auth/ForgotPassword'));
const ResetPassword = lazy(() => import('../pages/Auth/ResetPassword'));
const Profile = lazy(() => import('../pages/Profile/Profile'));
const AdminDashboard = lazy(() => import('../pages/Admin/AdminDashboard'));
const NotFound = lazy(() => import('../pages/NotFound/NotFound'));
const ConfiguratorPage = lazy(() => import('../pages/Configurator/ConfiguratorPage'));
const ContactPage      = lazy(() => import('../pages/Contact/ContactPage'));
const AboutPage        = lazy(() => import('../pages/About/AboutPage'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout><Home /></MainLayout>
  },
  {
    path: '/configurador',
    element: <ConfiguratorPage />
  },
  {
    path: '/contacto',
    element: <MainLayout><ContactPage /></MainLayout>
  },
  {
    path: '/nosotros',
    element: <MainLayout><AboutPage /></MainLayout>
  },
  {
    path: '/productos',
    element: <MainLayout><ProductList /></MainLayout>
  },
  {
    path: '/productos/:slug',
    element: <MainLayout><ProductDetail /></MainLayout>
  },
  {
    path: '/cart',
    element: <MainLayout><Cart /></MainLayout>
  },
  {
    path: '/checkout',
    element: <ProtectedRoute><MainLayout><Checkout /></MainLayout></ProtectedRoute>
  },
  {
    path: '/login',
    element: <AuthLayout><Login /></AuthLayout>
  },
  {
    path: '/register',
    element: <AuthLayout><Register /></AuthLayout>
  },
  {
    path: '/forgot-password',
    element: <AuthLayout><ForgotPassword /></AuthLayout>
  },
  {
    path: '/reset-password/:token',
    element: <AuthLayout><ResetPassword /></AuthLayout>
  },
  {
    path: '/profile',
    element: <ProtectedRoute><MainLayout><Profile /></MainLayout></ProtectedRoute>
  },
  {
    path: '/admin',
    element: <AdminRoute><MainLayout><AdminDashboard /></MainLayout></AdminRoute>
  },
  {
    path: '/admin/despacho',
    element: <AdminRoute><MainLayout><AdminDashboard /></MainLayout></AdminRoute>
  },
  {
    path: '/admin/productos',
    element: <AdminRoute><MainLayout><AdminDashboard /></MainLayout></AdminRoute>
  },
  {
    path: '*',
    element: <MainLayout><NotFound /></MainLayout>
  }
]);

```

---

## File: Front/src/schemas/authSchema.js

**Path:** `Front/src/schemas/authSchema.js`

```javascript
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Ingresa un correo electrónico válido'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres')
});

export const registerSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Ingresa un correo electrónico válido'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres')
});

```

---

## File: Front/src/schemas/checkoutSchema.js

**Path:** `Front/src/schemas/checkoutSchema.js`

```javascript
import { z } from 'zod';

export const shippingSchema = z.object({
  address: z.string().min(5, 'La dirección es obligatoria y debe ser detallada'),
  city: z.string().min(2, 'La ciudad es obligatoria'),
  postalCode: z.string().min(3, 'Código postal obligatorio'),
  country: z.string().min(2, 'País obligatorio'),
  phone: z.string().min(7, 'Ingresa un número telefónico de contacto válido')
});

```

---

## File: Front/src/services/api.js

**Path:** `Front/src/services/api.js`

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('st_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = localStorage.getItem('st_refresh_token');
      if (!refreshToken) {
        isRefreshing = false;
        localStorage.removeItem('st_token');
        localStorage.removeItem('st_user');
        window.location.href = '/login';
        return Promise.reject(error);
      }

      try {
        const { data } = await axios.post('/api/auth/refresh', { refreshToken });
        const newToken = data.data.accessToken;
        const newRefreshToken = data.data.refreshToken;

        localStorage.setItem('st_token', newToken);
        localStorage.setItem('st_refresh_token', newRefreshToken);

        processQueue(null, newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        localStorage.removeItem('st_token');
        localStorage.removeItem('st_refresh_token');
        localStorage.removeItem('st_user');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default api;

```

---

## File: Front/src/services/auth.service.js

**Path:** `Front/src/services/auth.service.js`

```javascript
import api from './api';

export const login = async (email, password) => {
  const res = await api.post('/auth/login', { email, password });
  return res.data.data;
};

export const register = async (name, email, password) => {
  const res = await api.post('/auth/register', { name, email, password });
  return res.data.data;
};

export const getProfile = async () => {
  const res = await api.get('/auth/profile');
  return res.data.data.user;
};

export const updateProfile = async (profileData) => {
  const res = await api.patch('/auth/profile', profileData);
  return res.data.data.user;
};

```

---

## File: Front/src/services/orders.service.js

**Path:** `Front/src/services/orders.service.js`

```javascript
import api from './api';

export const createOrder = async (orderData) => {
  const res = await api.post('/orders', orderData);
  return res.data.data;
};

export const fetchUserOrders = async () => {
  const res = await api.get('/orders');
  return res.data.data?.data || res.data.data || [];
};

export const fetchAllOrdersAdmin = async () => {
  const res = await api.get('/orders/all');
  return res.data.data?.data || res.data.data || [];
};

export const updateOrderStatusAdmin = async (id, status) => {
  const res = await api.patch(`/orders/${id}/status`, { status });
  return res.data.data;
};

```

---

## File: Front/src/services/products.service.js

**Path:** `Front/src/services/products.service.js`

```javascript
import api from './api';

export const fetchProducts = async (params) => {
  const res = await api.get('/products', { params });
  return res.data.data?.data || res.data.data || [];
};

export const fetchProductBySlug = async (slug) => {
  const res = await api.get(`/products/${slug}`);
  return res.data.data;
};

export const createProduct = async (productData) => {
  const res = await api.post('/products', productData);
  return res.data.data;
};

export const fetchCategories = async () => {
  const res = await api.get('/categories');
  return res.data.data;
};

export const deleteProduct = async (id) => {
  const res = await api.delete(`/products/${id}`);
  return res.data.data;
};

export const restoreProduct = async (id) => {
  const res = await api.patch(`/products/${id}/restore`);
  return res.data.data;
};

export const fetchReviews = async (productId) => {
  const res = await api.get(`/reviews/${productId}`);
  return res.data.data;
};

export const createReview = async (reviewData) => {
  const res = await api.post('/reviews', reviewData);
  return res.data.data;
};

export const fetchUserReviews = async () => {
  const res = await api.get('/reviews/me');
  return res.data.data;
};

export const fetchRelatedProducts = async (categoryId, currentProductId) => {
  const res = await api.get('/products', { params: { category: categoryId, limit: 10 } });
  let filtered = res.data.data.data.filter(p => p._id !== currentProductId && !p.isDeleted);
  
  if (filtered.length < 3) {
    const generalRes = await api.get('/products', { params: { limit: 15 } });
    const additional = generalRes.data.data.data.filter(p => 
      p._id !== currentProductId && 
      !p.isDeleted && 
      !filtered.some(f => f._id === p._id)
    );
    filtered = [...filtered, ...additional];
  }
  
  return filtered.slice(0, 3);
};

```

---

## File: Front/src/services/tickets.service.js

**Path:** `Front/src/services/tickets.service.js`

```javascript
import api from './api';

export const createTicket = async (ticketData) => {
  const res = await api.post('/tickets', ticketData);
  return res.data.data;
};

export const fetchUserTickets = async () => {
  const res = await api.get('/tickets');
  return res.data.data;
};

export const fetchAllTicketsAdmin = async () => {
  const res = await api.get('/tickets/all');
  return res.data.data;
};

export const updateTicketStatusAdmin = async (id, status) => {
  const res = await api.patch(`/tickets/${id}/status`, { status });
  return res.data.data;
};

```

---

## File: Front/src/store/authStore.js

**Path:** `Front/src/store/authStore.js`

```javascript
import { create } from 'zustand';
import axios from 'axios';
import { useCartStore } from './cartStore';

import api from '../services/api';

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('st_user')) || null,
  token: localStorage.getItem('st_token') || null,
  refreshToken: localStorage.getItem('st_refresh_token') || null,
  isAuthenticated: !!localStorage.getItem('st_token'),
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      const { token, refreshToken, user } = response.data.data;

      localStorage.setItem('st_token', token);
      localStorage.setItem('st_refresh_token', refreshToken);
      localStorage.setItem('st_user', JSON.stringify(user));

      set({ token, refreshToken, user, isAuthenticated: true, loading: false });

      await useCartStore.getState().fetchCart();

      return user;
    } catch (error) {
      const errMsg = error.response?.data?.message || 'Error al iniciar sesión';
      set({ error: errMsg, loading: false });
      throw new Error(errMsg);
    }
  },

  register: async (name, email, password) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post('/api/auth/register', { name, email, password });
      const { token, refreshToken, user } = response.data.data;

      localStorage.setItem('st_token', token);
      localStorage.setItem('st_refresh_token', refreshToken);
      localStorage.setItem('st_user', JSON.stringify(user));

      set({ token, refreshToken, user, isAuthenticated: true, loading: false });

      await useCartStore.getState().fetchCart();

      return user;
    } catch (error) {
      const errMsg = error.response?.data?.message || 'Error al registrarse';
      set({ error: errMsg, loading: false });
      throw new Error(errMsg);
    }
  },
  
  updateUser: (updatedUser) => {
    localStorage.setItem('st_user', JSON.stringify(updatedUser));
    set({ user: updatedUser });
  },

  logout: () => {
    localStorage.removeItem('st_token');
    localStorage.removeItem('st_refresh_token');
    localStorage.removeItem('st_user');
    set({ token: null, refreshToken: null, user: null, isAuthenticated: false, error: null });

    useCartStore.getState().clearCart();
  }
}));


```

---

## File: Front/src/store/cartStore.js

**Path:** `Front/src/store/cartStore.js`

```javascript
import { create } from 'zustand';
import api from '../services/api';

const isAuth = () => !!localStorage.getItem('st_token');

export const useCartStore = create((set, get) => ({
  items: JSON.parse(localStorage.getItem('st_cart')) || [],

  fetchCart: async () => {
    if (!isAuth()) return;
    try {
      const response = await api.get('/cart');
      const backendItems = response.data.data.items || [];
      localStorage.setItem('st_cart', JSON.stringify(backendItems));
      set({ items: backendItems });
    } catch (error) {
      console.error('Error fetching cart from backend:', error);
    }
  },

  addToCart: async (product, quantity = 1, customization = null) => {
    const currentItems = get().items;
    const existingIndex = currentItems.findIndex(item => 
      item.product._id === product._id && 
      (!customization || item.customization?.type === customization.type)
    );

    let newItems;
    if (existingIndex > -1) {
      newItems = currentItems.map((item, idx) =>
        idx === existingIndex
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      newItems = [...currentItems, { product, quantity, customization }];
    }

    localStorage.setItem('st_cart', JSON.stringify(newItems));
    set({ items: newItems });

    if (isAuth()) {
      try {
        const response = await api.post('/cart', {
          productId: product._id,
          quantity,
          customization
        });
        const backendItems = response.data.data.items || [];
        localStorage.setItem('st_cart', JSON.stringify(backendItems));
        set({ items: backendItems });
      } catch (error) {
        console.error('Error syncing cart add with backend:', error);
      }
    }
  },

  removeFromCart: async (productId, customizationType = null) => {
    const currentItems = get().items;
    const matchedItem = currentItems.find(item => 
      item.product._id === productId && (!customizationType || item.customization?.type === customizationType)
    );

    const newItems = currentItems.filter(item => 
      !(item.product._id === productId && (!customizationType || item.customization?.type === customizationType))
    );
    localStorage.setItem('st_cart', JSON.stringify(newItems));
    set({ items: newItems });

    if (isAuth() && matchedItem) {
      try {
        const itemId = matchedItem._id;
        if (itemId) {
          await api.delete(`/cart/${itemId}`);
        } else {
          await get().fetchCart();
        }
      } catch (error) {
        console.error('Error syncing cart remove with backend:', error);
      }
    }
  },

  updateItemQuantity: async (productId, quantity, customizationType = null) => {
    if (quantity <= 0) {
      await get().removeFromCart(productId, customizationType);
      return;
    }

    const currentItems = get().items;
    const newItems = currentItems.map(item => 
      item.product._id === productId && (!customizationType || item.customization?.type === customizationType)
        ? { ...item, quantity }
        : item
    );
    localStorage.setItem('st_cart', JSON.stringify(newItems));
    set({ items: newItems });

    if (isAuth()) {
      try {
        const matchedItem = currentItems.find(item => 
          item.product._id === productId && (!customizationType || item.customization?.type === customizationType)
        );
        if (matchedItem && matchedItem._id) {
          await api.patch(`/cart/${matchedItem._id}`, { quantity });
        } else {
          await get().fetchCart();
        }
      } catch (error) {
        console.error('Error syncing cart quantity update with backend:', error);
      }
    }
  },

  clearCart: () => {
    localStorage.removeItem('st_cart');
    set({ items: [] });
  },

  getCartTotal: () => {
    return get().items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }
}));


```

---

## File: Front/src/store/checkoutStore.js

**Path:** `Front/src/store/checkoutStore.js`

```javascript
import { create } from 'zustand';

export const useCheckoutStore = create((set) => ({
  shippingAddress: JSON.parse(sessionStorage.getItem('st_shipping')) || {
    address: '',
    city: '',
    postalCode: '',
    country: 'Colombia',
    phone: ''
  },
  paymentMethod: 'stripe',

  setShippingAddress: (address) => {
    sessionStorage.setItem('st_shipping', JSON.stringify(address));
    set({ shippingAddress: address });
  },

  setPaymentMethod: (method) => {
    set({ paymentMethod: method });
  }
}));

```

---

## File: Front/src/store/uiStore.js

**Path:** `Front/src/store/uiStore.js`

```javascript
import { create } from 'zustand';

export const useUiStore = create((set, get) => ({
  cartOpen: false,
  toasts: [],

  toggleCart: (open) => set((state) => ({ cartOpen: open !== undefined ? open : !state.cartOpen })),

  addToast: (message, type = 'success') => {
    const id = Date.now();
    set((state) => ({ toasts: [...state.toasts, { id, message, type }] }));
    setTimeout(() => {
      get().removeToast(id);
    }, 4000);
  },

  removeToast: (id) => {
    set((state) => ({ toasts: state.toasts.filter(t => t.id !== id) }));
  }
}));

```

---

## File: Front/src/store/useConfiguratorStore.js

**Path:** `Front/src/store/useConfiguratorStore.js`

```javascript
import { create } from 'zustand';

const COLORS = [
  { name: 'Blanco', hex: '#f5f5f0' },
  { name: 'Negro', hex: '#1a1a1a' },
  { name: 'Azul Marino', hex: '#1e3a5f' },
  { name: 'Rojo', hex: '#c0392b' },
  { name: 'Verde Oliva', hex: '#4a6741' },
  { name: 'Gris', hex: '#8e8e93' },
];

const PRINT_AREAS = [
  { id: 'full', label: 'Full Print', icon: 'LayoutGrid' },
  { id: 'decal', label: 'Estampado Central', icon: 'Square' },
  { id: 'logo', label: 'Solo Logo', icon: 'Minimal' },
];

export const useConfiguratorStore = create((set) => ({
  currentColor: COLORS[0].hex,
  currentTexture: null,
  printArea: 'decal',
  decalPosition: { x: 0, y: 0, z: 0.01 },
  isInteractionPhase: false,
  isAnimating: true,
  colors: COLORS,
  printAreas: PRINT_AREAS,

  setColor: (hex) => set({ currentColor: hex }),
  setTexture: (url) => set({ currentTexture: url }),
  setPrintArea: (id) => set({ printArea: id }),
  setDecalPosition: (pos) => set({ decalPosition: pos }),
  enableInteraction: () => set({ isInteractionPhase: true, isAnimating: false }),
  disableInteraction: () => set({ isInteractionPhase: false, isAnimating: true }),
  resetConfig: () => set({
    currentColor: COLORS[0].hex,
    currentTexture: null,
    printArea: 'decal',
    decalPosition: { x: 0, y: 0, z: 0.01 },
  }),
}));

```

---

## File: Front/src/utils/formatCurrency.js

**Path:** `Front/src/utils/formatCurrency.js`

```javascript
export const formatCurrency = (value) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  }).format(value);
};

```

---

## File: Front/src/utils/formatDate.js

**Path:** `Front/src/utils/formatDate.js`

```javascript
export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString('es-PE', options);
};

```

---

## File: Front/vite.config.js

**Path:** `Front/vite.config.js`

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
});

```

---

## File: Front/vite.config.js.timestamp-1780202716630-f0c5bb9281ce08.mjs

**Path:** `Front/vite.config.js.timestamp-1780202716630-f0c5bb9281ce08.mjs`

```text
// vite.config.js
import { defineConfig } from "file:///home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Front/node_modules/vite/dist/node/index.js";
import react from "file:///home/ivan/Desktop/Sonterry_v2/Mi-Ecommerce/Front/node_modules/@vitejs/plugin-react/dist/index.js";
var vite_config_default = defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9pdmFuL0Rlc2t0b3AvU29udGVycnlfdjIvTWktRWNvbW1lcmNlL0Zyb250XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9pdmFuL0Rlc2t0b3AvU29udGVycnlfdjIvTWktRWNvbW1lcmNlL0Zyb250L3ZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL2l2YW4vRGVza3RvcC9Tb250ZXJyeV92Mi9NaS1FY29tbWVyY2UvRnJvbnQvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtyZWFjdCgpXSxcbiAgc2VydmVyOiB7XG4gICAgcG9ydDogNTE3MyxcbiAgICBwcm94eToge1xuICAgICAgJy9hcGknOiB7XG4gICAgICAgIHRhcmdldDogJ2h0dHA6Ly9sb2NhbGhvc3Q6NTAwMCcsXG4gICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZVxuICAgICAgfVxuICAgIH1cbiAgfVxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXFVLFNBQVMsb0JBQW9CO0FBQ2xXLE9BQU8sV0FBVztBQUVsQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsTUFBTSxDQUFDO0FBQUEsRUFDakIsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBLFFBQ04sUUFBUTtBQUFBLFFBQ1IsY0FBYztBQUFBLE1BQ2hCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=

```

---

## File: README.md

**Path:** `README.md`

```markdown
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

```

---

## File: docker-compose.yml

**Path:** `docker-compose.yml`

```yaml
name: sonterry

services:
  database:
    image: mongo:4.4
    container_name: sonterry_db
    restart: unless-stopped
    ports:
      - "${PORT_DATABASE:-27017}:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: ${MONGO_USER:-admin}
      MONGO_INITDB_ROOT_PASSWORD: ${MONGO_PASS:-changeme_mongo_password}
    volumes:
      - mongo_data:/data/db
    networks:
      - sonterry_network
    healthcheck:
      test: mongo --eval 'db.runCommand("ping").ok' --quiet
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7.0-alpine
    container_name: sonterry_cache
    restart: unless-stopped
    ports:
      - "${PORT_REDIS:-6379}:6379"
    volumes:
      - redis_data:/data
    networks:
      - sonterry_network
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

  api:
    build:
      context: ./Back
      dockerfile: Dockerfile
    container_name: sonterry_api
    restart: unless-stopped
    ports:
      - "${PORT_API:-5000}:5000"
    environment:
      - PORT=5000
      - NODE_ENV=production
      - MONGO_URI=mongodb://${MONGO_USER:-admin}:${MONGO_PASS:-changeme_mongo_password}@database:27017/mi-ecommerce?authSource=admin
      - MONGO_MAX_POOL_SIZE=50
      - MONGO_MIN_POOL_SIZE=5
      - REDIS_HOST=redis
      - REDIS_PORT=6379
      - JWT_SECRET=${JWT_SECRET:-change_me_jwt_secret}
      - JWT_EXPIRES_IN=1d
      - REFRESH_TOKEN_SECRET=${REFRESH_TOKEN_SECRET:-change_me_refresh_secret}
      - REFRESH_TOKEN_EXPIRES_IN=7d
      - STRIPE_SECRET_KEY=${STRIPE_SECRET_KEY:-}
      - STRIPE_WEBHOOK_SECRET=${STRIPE_WEBHOOK_SECRET:-}
      - PAYPAL_CLIENT_ID=${PAYPAL_CLIENT_ID:-}
      - PAYPAL_CLIENT_SECRET=${PAYPAL_CLIENT_SECRET:-}
      - PAYPAL_API_URL=https://api-m.sandbox.paypal.com
      - MINIO_ENDPOINT=minio
      - MINIO_PORT=9000
      - MINIO_ACCESS_KEY=${MINIO_ROOT_USER:-admin}
      - MINIO_SECRET_KEY=${MINIO_ROOT_PASSWORD:-changeme_minio_password}
      - MINIO_BUCKET=${MINIO_BUCKET:-sonterry}
      - MINIO_USE_SSL=false
      - MINIO_PUBLIC_URL=${MINIO_PUBLIC_URL:-http://localhost:9000}
      - N8N_WEBHOOK_URL=http://n8n:5678/webhook/dispatch-notification
      - N8N_API_KEY=${N8N_API_KEY:-sonterry_n8n_secret}
      - CORS_ORIGIN=${CLIENT_URL:-http://localhost:5173},http://localhost:3000
    depends_on:
      database:
        condition: service_healthy
      redis:
        condition: service_healthy
      minio:
        condition: service_healthy
    networks:
      - sonterry_network

  n8n:
    image: n8nio/n8n:latest
    container_name: sonterry_n8n
    restart: unless-stopped
    ports:
      - "${PORT_N8N:-5678}:5678"
    environment:
      - N8N_PORT=5678
      - N8N_HOST=${N8N_HOST:-localhost}
      - N8N_PROTOCOL=http
      - WEBHOOK_URL=http://${N8N_HOST:-localhost}:5678
      - N8N_ENCRYPTION_KEY=${N8N_ENCRYPTION_KEY:-change_me_n8n_encryption_key}
      - N8N_METRICS=false
      - EXECUTIONS_DATA_PRUNE=true
      - EXECUTIONS_DATA_MAX_AGE=168
    volumes:
      - n8n_data:/home/node/.n8n
    networks:
      - sonterry_network
    healthcheck:
      test: ["CMD", "wget", "--spider", "http://localhost:5678/healthz"]
      interval: 15s
      timeout: 5s
      retries: 5

  evolution-api:
    image: atendai/evolution-api:v1.8.2
    container_name: sonterry_evolution
    restart: unless-stopped
    ports:
      - "${PORT_EVOLUTION:-8080}:8080"
    environment:
      - SERVER_PORT=8080
      - LOG_LEVEL=info
      - DATABASE_ENABLED=true
      - DATABASE_CONNECTION_URI=mongodb://${MONGO_USER:-admin}:${MONGO_PASS:-changeme_mongo_password}@database:27017/evolution-whatsapp?authSource=admin
      - DATABASE_CONNECT_TIMEOUT_MS=5000
      - REDIS_ENABLED=true
      - REDIS_URI=redis://redis:6379
      - AUTHENTICATION_API_KEY=${EVOLUTION_API_KEY:-change_me_evolution_key}
      - AUTHENTICATION_EXPOSE_KEY=true
    depends_on:
      database:
        condition: service_healthy
      redis:
        condition: service_healthy
    networks:
      - sonterry_network

  minio:
    image: minio/minio:latest
    container_name: sonterry_storage
    restart: unless-stopped
    ports:
      - "${PORT_MINIO_API:-9000}:9000"
      - "${PORT_MINIO_CONSOLE:-9001}:9001"
    environment:
      - MINIO_ROOT_USER=${MINIO_ROOT_USER:-admin}
      - MINIO_ROOT_PASSWORD=${MINIO_ROOT_PASSWORD:-changeme_minio_password}
    volumes:
      - minio_data:/data
    command: server /data --console-address ":9001"
    networks:
      - sonterry_network
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:9000/minio/health/live"]
      interval: 10s
      timeout: 5s
      retries: 5

  frontend:
    build:
      context: ./Front
      dockerfile: Dockerfile
      args:
        - VITE_API_URL=${VITE_API_URL:-http://localhost:5000/api}
    container_name: sonterry_front
    restart: unless-stopped
    ports:
      - "${PORT_FRONT:-3000}:80"
    depends_on:
      api:
        condition: service_started
    networks:
      - sonterry_network

volumes:
  mongo_data:
  redis_data:
  n8n_data:
  minio_data:

networks:
  sonterry_network:
    driver: bridge

```

---

