FROM node:22-alpine AS builder
WORKDIR /app
ENV npm_config_update_notifier=false
COPY package*.json ./
RUN npm ci
COPY . .

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV npm_config_update_notifier=false
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/src ./src
COPY --from=builder /app/scripts ./scripts
EXPOSE 5000
CMD ["node", "src/server.js"]
