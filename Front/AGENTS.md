# Frontend — AGENTS.md

React 18 + Vite 5. ESM (`"type": "module"` en `package.json`).

## Entrypoints

| Archivo | Rol |
|---|---|
| `src/main.jsx` | Punto de entrada React |
| `src/App.jsx` | Providers: ErrorBoundary, QueryClientProvider, Suspense, RouterProvider |
| `src/router/index.jsx` | `createBrowserRouter` con lazy loading de páginas |

## Estado y datos

| Tipo | Herramienta | Ubicación |
|---|---|---|
| Estado cliente | Zustand 4 | `src/store/` (authStore, cartStore, checkoutStore, uiStore, useConfiguratorStore) |
| Estado servidor | TanStack Query 5 | `src/queries/` (useProducts, useOrders, useTickets, useBankAccounts) |
| Llamadas API | Axios (instancia con interceptor) | `src/services/api.js` — baseURL `/api`, JWT en header, refresh queue |

### Interceptor de Axios

- Token en `Authorization: Bearer` desde `localStorage.getItem('st_token')`.
- En 401: intenta refresh con `POST /api/auth/refresh` usando `st_refresh_token`.
- Cola de requests fallidos mientras refresca. Si falla el refresh, redirige a `/login`.
- **No usar axios directamente** sin el interceptor — siempre importar `api` desde `./services/api.js`.

### localStorage keys

| Key | Contenido |
|---|---|
| `st_token` | JWT access token |
| `st_refresh_token` | Refresh token |
| `st_user` | JSON con datos del usuario |
| `st_cart` | Array de items del carrito (offline first) |

## Estructura de `src/`

```
services/  api.js (axios instance), auth, orders, products, tickets
queries/   useProducts, useOrders, useTickets, useBankAccounts (TanStack Query hooks)
store/     authStore, cartStore, checkoutStore, uiStore, useConfiguratorStore (Zustand)
router/    index.jsx + ProtectedRoute.jsx + AdminRoute.jsx
pages/     Home, Products, Configurator, Cart, Checkout, Auth/, Profile, Admin, Contact, About
components/ cart/, common/, home/, layout/
layouts/   MainLayout, AuthLayout, DashboardLayout, CheckoutLayout
schemas/   authSchema, checkoutSchema (Zod)
utils/     formatCurrency, formatDate
assets/    css/ (App.css, index.css), img/, video/
```

## Rutas principales

| Path | Page | Auth |
|---|---|---|
| `/` | Home | No |
| `/productos` | ProductList | No |
| `/productos/:slug` | ProductDetail | No |
| `/configurador` | ConfiguratorPage | No |
| `/cart` | Cart | No |
| `/checkout` | Checkout | Sí |
| `/login`, `/register`, `/forgot-password`, `/reset-password/:token` | Auth | No |
| `/profile` | Profile | Sí |
| `/admin`* | AdminDashboard | Admin |
| `/contacto`, `/nosotros` | Contact, About | No |

## Comandos

```bash
npm run dev       # Vite dev → http://localhost:5173
npm run build     # Production build → dist/
npm run lint      # ESLint (--max-warnings 0 — falla si hay warnings)
npm run preview   # Vite preview del build
```

Vite proxy: `/api` → `http://localhost:5000` (solo en dev).

## Frontend Docker

- Build stage en **Node 18** (difiere del Back que usa Node 20).
- Sirve con **nginx** en puerto 80 (no Vite en producción).
- `ARG VITE_API_URL` inyecta la URL de la API en build time.
- nginx proxy inverso: `/api/` → `http://api:5000/api/` (nombre del container Docker).

## Convenciones

- **React 18, sin Tailwind** — CSS plano en `src/assets/css/`. Agregar nuevos CSS ahí o en archivos co-localizados por página.
- **Lazy loading** todas las páginas via `React.lazy()` — definidas en `src/router/index.jsx`.
- **Zod schemas** en `src/schemas/` para validación de formularios con `react-hook-form`.
- **No hay tests configurados** para el frontend (sin Jest/Playwright/Vitest en `package.json`).
- **GSAP + Three.js** en el Configurador 3D.
- **react-router-dom v6** con `createBrowserRouter`.
