#!/bin/sh
set -e

echo "🔄 Prisma veritabanı hazırlanıyor..."

# SQLite dosyası yoksa oluştur ve seed et
if [ ! -f /app/data/takason.db ]; then
  echo "📦 Veritabanı bulunamadı, oluşturuluyor..."
  npx prisma db push --skip-generate
  echo "🌱 Seed verileri yükleniyor..."
  node prisma/seed.js
  echo "✅ Veritabanı hazır!"
else
  echo "✅ Mevcut veritabanı kullanılıyor."
  # Şema değişikliklerini uygula (varsa)
  npx prisma db push --skip-generate 2>/dev/null || true
fi

echo "🚀 Sunucu başlatılıyor..."
exec node server.js
