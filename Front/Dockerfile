# Stage 1: Build React App
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./

# Skip Cypress binary download — needed only for E2E tests, not for production build
ENV CYPRESS_INSTALL_BINARY=0
RUN npm ci

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
