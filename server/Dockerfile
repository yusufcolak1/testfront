FROM node:20-alpine

WORKDIR /app

# Bağımlılıkları yükle
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Prisma generate
COPY prisma ./prisma/
RUN npx prisma generate

# Uygulama kodunu kopyala
COPY . .

# Gereksiz dosyaları temizle
RUN rm -rf scripts/listUsers.js scripts/checkSettings.js scripts/createTestUser.js scripts/resetAdmin.js \
    scratch test-e2e.js .env .env.example .env.production n.env supabase data_imports 2>/dev/null || true

# Uploads ve data klasörleri oluştur
RUN mkdir -p /app/uploads /app/data

# Entrypoint script
COPY docker-entrypoint.sh /app/docker-entrypoint.sh
RUN chmod +x /app/docker-entrypoint.sh

EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD wget -qO- http://localhost:5000/api/health || exit 1

ENTRYPOINT ["/app/docker-entrypoint.sh"]
