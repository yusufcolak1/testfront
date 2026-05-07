#!/bin/bash

# ============================================
# TAKASON DEPLOYMENT SCRIPT
# ============================================
# Bu script production deployment'ı otomatikleştirir
# Kullanım: bash deploy.sh

set -e  # Hata durumunda dur

echo "🚀 Takason Deployment Başlatılıyor..."
echo "========================================"

# Renk kodları
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# ============================================
# 1. Ön Kontroller
# ============================================
echo -e "${YELLOW}📋 Ön kontroller yapılıyor...${NC}"

# Node.js kontrolü
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js bulunamadı! Lütfen Node.js kurun.${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Node.js: $(node --version)${NC}"

# npm kontrolü
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm bulunamadı!${NC}"
    exit 1
fi
echo -e "${GREEN}✓ npm: $(npm --version)${NC}"

# PM2 kontrolü
if ! command -v pm2 &> /dev/null; then
    echo -e "${YELLOW}⚠ PM2 bulunamadı. Kuruluyor...${NC}"
    npm install -g pm2
fi
echo -e "${GREEN}✓ PM2: $(pm2 --version)${NC}"

# ============================================
# 2. Environment Dosyalarını Kontrol Et
# ============================================
echo ""
echo -e "${YELLOW}🔍 Environment dosyaları kontrol ediliyor...${NC}"

if [ ! -f "server/.env.production" ]; then
    echo -e "${RED}❌ server/.env.production bulunamadı!${NC}"
    echo "Lütfen .env.production dosyasını oluşturun ve yapılandırın."
    exit 1
fi
echo -e "${GREEN}✓ Backend .env.production mevcut${NC}"

if [ ! -f "react-app/.env.production" ]; then
    echo -e "${RED}❌ react-app/.env.production bulunamadı!${NC}"
    echo "Lütfen .env.production dosyasını oluşturun ve yapılandırın."
    exit 1
fi
echo -e "${GREEN}✓ Frontend .env.production mevcut${NC}"

# ============================================
# 3. Backend Hazırlığı
# ============================================
echo ""
echo -e "${YELLOW}📦 Backend hazırlanıyor...${NC}"

cd server

# Production .env dosyasını kopyala
cp .env.production .env
echo -e "${GREEN}✓ Production environment variables yüklendi${NC}"

# Dependencies yükle
echo "📥 Backend dependencies yükleniyor..."
npm install --production
echo -e "${GREEN}✓ Backend dependencies yüklendi${NC}"

# Prisma schema'yı PostgreSQL için hazırla
if [ -f "prisma/schema.production.prisma" ]; then
    echo "🔄 Prisma schema PostgreSQL için güncelleniyor..."
    cp prisma/schema.production.prisma prisma/schema.prisma
    echo -e "${GREEN}✓ Prisma schema güncellendi${NC}"
fi

# Prisma generate
echo "🔨 Prisma client oluşturuluyor..."
npx prisma generate
echo -e "${GREEN}✓ Prisma client oluşturuldu${NC}"

# Database migration
echo "🗄️ Database migration çalıştırılıyor..."
npx prisma migrate deploy
echo -e "${GREEN}✓ Database migration tamamlandı${NC}"

# Seed data (opsiyonel)
read -p "Seed data eklemek ister misiniz? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🌱 Seed data ekleniyor..."
    npx prisma db seed
    echo -e "${GREEN}✓ Seed data eklendi${NC}"
fi

cd ..

# ============================================
# 4. Frontend Build
# ============================================
echo ""
echo -e "${YELLOW}🎨 Frontend build alınıyor...${NC}"

cd react-app

# Dependencies yükle
echo "📥 Frontend dependencies yükleniyor..."
npm install
echo -e "${GREEN}✓ Frontend dependencies yüklendi${NC}"

# Production build
echo "🏗️ Production build oluşturuluyor..."
npm run build
echo -e "${GREEN}✓ Frontend build tamamlandı${NC}"

cd ..

# ============================================
# 5. PM2 ile Backend'i Başlat
# ============================================
echo ""
echo -e "${YELLOW}🚀 Backend PM2 ile başlatılıyor...${NC}"

cd server

# Eski process'i durdur (varsa)
pm2 delete takason-api 2>/dev/null || true

# Yeni process'i başlat
pm2 start ecosystem.config.js --env production

# PM2 startup script
pm2 save
pm2 startup

echo -e "${GREEN}✓ Backend PM2 ile başlatıldı${NC}"

cd ..

# ============================================
# 6. Son Kontroller
# ============================================
echo ""
echo -e "${YELLOW}✅ Son kontroller yapılıyor...${NC}"

# PM2 status
echo ""
pm2 status

# Health check (5 saniye bekle)
echo ""
echo "⏳ Backend'in başlaması bekleniyor (5 saniye)..."
sleep 5

echo "🔍 Health check yapılıyor..."
if curl -f http://localhost:5000/api/health > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Backend sağlıklı çalışıyor!${NC}"
else
    echo -e "${RED}⚠ Backend health check başarısız. Logs kontrol edin:${NC}"
    echo "pm2 logs takason-api"
fi

# ============================================
# 7. Özet
# ============================================
echo ""
echo "========================================"
echo -e "${GREEN}🎉 DEPLOYMENT TAMAMLANDI!${NC}"
echo "========================================"
echo ""
echo "📊 Durum Kontrol:"
echo "  pm2 status"
echo "  pm2 logs takason-api"
echo "  pm2 monit"
echo ""
echo "🔄 Yeniden Başlatma:"
echo "  pm2 restart takason-api"
echo ""
echo "🛑 Durdurma:"
echo "  pm2 stop takason-api"
echo ""
echo "📍 Backend URL: http://localhost:5000/api"
echo "📍 Frontend Build: ./react-app/dist"
echo ""
echo "⚠️ Sonraki Adımlar:"
echo "  1. Nginx yapılandırması"
echo "  2. SSL sertifikası kurulumu"
echo "  3. Domain DNS ayarları"
echo "  4. Firewall yapılandırması"
echo ""
echo "📖 Detaylı bilgi için: PRODUCTION_DEPLOYMENT.md"
echo ""
