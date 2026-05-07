# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Production build
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# SPA routing config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Build çıktısını Nginx'e kopyala
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget -qO- http://localhost:80/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
