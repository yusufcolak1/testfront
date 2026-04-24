# 🚀 Canlıya Alma Kılavuzu - Sıfır Hata Garantisi

## 📋 Ön Hazırlık Kontrol Listesi

### 1. Gerekli Hesaplar ve Servisler
- [ ] **Domain adı** satın alınmış (örn: takason.com)
- [ ] **Sunucu** hazır (VPS: DigitalOcean, AWS, Hetzner, vb.)
- [ ] **Supabase hesabı** aktif (veya PostgreSQL sunucusu)
- [ ] **Cloudinary/AWS S3** hesabı (resim yükleme için)
- [ ] **SSL sertifikası** (Let's Encrypt - ücretsiz)

### 2. Sunucu Gereksinimleri
```
İşletim Sistemi: Ubuntu 22.04 LTS (önerilen)
RAM: Minimum 2GB (4GB önerilen)
CPU: 2 Core
Disk: 20GB SSD
Node.js: v18.x veya v20.x
PostgreSQL: 14.x veya üzeri
Nginx: 1.18.x veya üzeri
```

---

## 🔧 ADIM 1: Sunucu Hazırlığı

### 1.1 Sunucuya Bağlanın
```bash
ssh root@your-server-ip
```

### 1.2 Sistem Güncellemesi
```bash
apt update && apt upgrade -y
```

### 1.3 Node.js Kurulumu
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
apt install -y nodejs
node --version  # v20.x.x olmalı
npm --version   # 10.x.x olmalı
```

### 1.4 PM2 Kurulumu (Process Manager)
```bash
npm install -g pm2
pm2 --version
```

### 1.5 Nginx Kurulumu
```bash
apt install -y nginx
systemctl status nginx
```

### 1.6 PostgreSQL Kurulumu (Supabase kullanmıyorsanız)
```bash
apt install -y postgresql postgresql-contrib
systemctl status postgresql
```

---

## 🗄️ ADIM 2: Veritabanı Yapılandırması

### Seçenek A: Supabase (Önerilen - Kolay)

1. **Supabase Dashboard'a gidin**: https://supabase.com
2. **Yeni proje oluşturun**
3. **Connection string'i kopyalayın**:
   - Settings → Database → Connection string
   - "Transaction" modunu seçin (Prisma için)

```env
# Production connection string örneği
DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:5432/postgres"
```

### Seçenek B: Kendi PostgreSQL Sunucunuz

```bash
# PostgreSQL kullanıcısı oluşturun
sudo -u postgres psql
CREATE DATABASE takason_prod;
CREATE USER takason_user WITH ENCRYPTED PASSWORD 'güçlü_şifre_buraya';
GRANT ALL PRIVILEGES ON DATABASE takason_prod TO takason_user;
\q

# Connection string
DATABASE_URL="postgresql://takason_user:güçlü_şifre_buraya@localhost:5432/takason_prod"
DIRECT_URL="postgresql://takason_user:güçlü_şifre_buraya@localhost:5432/takason_prod"
```

---

## 📦 ADIM 3: Kod Hazırlığı

### 3.1 Backend Düzeltmeleri

#### A. Production Environment Variables
`server/.env.production` dosyası oluşturun:

```env
NODE_ENV=production
PORT=5000

# Database (Supabase veya kendi PostgreSQL)
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# JWT Secrets (ÇOK GÜÇLÜ ŞİFRELER KULLANIN!)
JWT_SECRET="production-super-secret-key-min-32-characters-long-random-string"
JWT_REFRESH_SECRET="production-refresh-secret-key-min-32-characters-long-random-string"

# CORS (Gerçek domain'inizi yazın)
ALLOWED_ORIGINS="https://takason.com,https://www.takason.com"

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100

# File Upload
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES="image/jpeg,image/png,image/webp,image/gif"

# Cloudinary (veya AWS S3)
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
```

#### B. Schema Düzeltmesi
`server/prisma/schema.prisma` - PostgreSQL'e geri dönün:

```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}
```

Enum'ları geri ekleyin (PostgreSQL destekler):

```prisma
enum UserRole {
  USER
  ADMIN
  MODERATOR
}

enum UserStatus {
  ACTIVE
  BANNED
  SUSPENDED
}

// Diğer enum'lar...
```

### 3.2 Frontend Düzeltmeleri

#### A. Production Environment
`react-app/.env.production` dosyası oluşturun:

```env
VITE_API_URL=https://api.takason.com/api
VITE_SOCKET_URL=https://api.takason.com
```

#### B. Build Optimizasyonu
`react-app/vite.config.js` güncelleyin:

```javascript
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
})
```

---

## 🚀 ADIM 4: Deployment

### 4.1 Kodu Sunucuya Yükleyin

```bash
# Sunucuda proje klasörü oluşturun
mkdir -p /var/www/takason
cd /var/www/takason

# Git ile kodu çekin (önerilen)
git clone https://github.com/your-username/takason.git .

# Veya FTP/SFTP ile dosyaları yükleyin
```

### 4.2 Backend Kurulumu

```bash
cd /var/www/takason/server

# Bağımlılıkları yükleyin
npm install --production

# .env.production dosyasını .env olarak kopyalayın
cp .env.production .env

# Prisma schema'yı güncelleyin (PostgreSQL için)
# schema.prisma dosyasını düzenleyin

# Prisma client oluşturun
npx prisma generate

# Database migration
npx prisma migrate deploy

# Seed data
npx prisma db seed

# PM2 ile başlatın
pm2 start server.js --name takason-api
pm2 save
pm2 startup
```

### 4.3 Frontend Build

```bash
cd /var/www/takason/react-app

# Bağımlılıkları yükleyin
npm install

# Production build
npm run build

# Build dosyaları dist/ klasöründe olacak
```

---

## 🌐 ADIM 5: Nginx Yapılandırması

### 5.1 Nginx Config Dosyası
`/etc/nginx/sites-available/takason` dosyası oluşturun:

```nginx
# Backend API
server {
    listen 80;
    server_name api.takason.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}

# Frontend
server {
    listen 80;
    server_name takason.com www.takason.com;
    root /var/www/takason/react-app/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript application/json;
}
```

### 5.2 Nginx'i Aktifleştirin

```bash
# Symlink oluşturun
ln -s /etc/nginx/sites-available/takason /etc/nginx/sites-enabled/

# Test edin
nginx -t

# Restart
systemctl restart nginx
```

---

## 🔒 ADIM 6: SSL Sertifikası (HTTPS)

### 6.1 Certbot Kurulumu

```bash
apt install -y certbot python3-certbot-nginx
```

### 6.2 SSL Sertifikası Alın

```bash
# Frontend için
certbot --nginx -d takason.com -d www.takason.com

# Backend için
certbot --nginx -d api.takason.com

# Otomatik yenileme
certbot renew --dry-run
```

---

## ✅ ADIM 7: Son Kontroller

### 7.1 Backend Kontrolü

```bash
# PM2 status
pm2 status

# Logs
pm2 logs takason-api

# Health check
curl https://api.takason.com/api/health
```

### 7.2 Frontend Kontrolü

```bash
# Browser'da açın
https://takason.com

# Network tab'ında API çağrılarını kontrol edin
```

### 7.3 Database Kontrolü

```bash
# Prisma Studio (geliştirme için)
cd /var/www/takason/server
npx prisma studio

# Veya PostgreSQL'e bağlanın
psql -U takason_user -d takason_prod
\dt  # Tabloları listele
SELECT COUNT(*) FROM "User";
SELECT COUNT(*) FROM "Category";
```

---

## 🔍 Hata Ayıklama

### Backend Hataları

```bash
# PM2 logs
pm2 logs takason-api --lines 100

# Restart
pm2 restart takason-api

# Nginx logs
tail -f /var/log/nginx/error.log
tail -f /var/log/nginx/access.log
```

### Frontend Hataları

```bash
# Browser Console
F12 → Console tab

# Network tab
F12 → Network tab → Filter: XHR

# Nginx logs
tail -f /var/log/nginx/error.log
```

---

## 📊 Performans Optimizasyonu

### 7.1 PM2 Cluster Mode

```bash
pm2 delete takason-api
pm2 start server.js --name takason-api -i max
pm2 save
```

### 7.2 Database Connection Pooling

`server/prisma/schema.prisma`:
```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

generator client {
  provider = "prisma-client-js"
  previewFeatures = ["postgresqlExtensions"]
}
```

### 7.3 Redis Cache (İsteğe Bağlı)

```bash
apt install -y redis-server
systemctl status redis
```

---

## 🎯 Deployment Checklist

### Deployment Öncesi
- [ ] Tüm environment variables doğru
- [ ] Database connection string test edildi
- [ ] JWT secrets güçlü ve benzersiz
- [ ] CORS origins doğru domain'leri içeriyor
- [ ] Frontend .env.production API URL'i doğru
- [ ] Prisma schema PostgreSQL'e ayarlandı
- [ ] Tüm bağımlılıklar yüklendi

### Deployment Sırası
- [ ] Sunucu hazır ve güncel
- [ ] Node.js, PM2, Nginx kurulu
- [ ] PostgreSQL/Supabase yapılandırıldı
- [ ] Kod sunucuya yüklendi
- [ ] Backend dependencies yüklendi
- [ ] Prisma migrate deploy çalıştırıldı
- [ ] Seed data eklendi
- [ ] PM2 ile backend başlatıldı
- [ ] Frontend build alındı
- [ ] Nginx yapılandırıldı
- [ ] SSL sertifikası kuruldu

### Deployment Sonrası
- [ ] Health check başarılı
- [ ] Frontend açılıyor
- [ ] Kayıt olma çalışıyor
- [ ] Giriş yapma çalışıyor
- [ ] İlanlar listeleniyor
- [ ] API çağrıları başarılı
- [ ] HTTPS çalışıyor
- [ ] PM2 auto-restart aktif
- [ ] Monitoring kuruldu

---

## 🛡️ Güvenlik Kontrolleri

- [ ] Firewall aktif (UFW)
- [ ] SSH key-based authentication
- [ ] Root login disabled
- [ ] Rate limiting aktif
- [ ] Helmet middleware aktif
- [ ] CORS doğru yapılandırılmış
- [ ] Environment variables güvenli
- [ ] Database şifreleri güçlü
- [ ] SSL/HTTPS zorunlu
- [ ] Backup stratejisi var

---

## 📞 Destek ve Monitoring

### Log Monitoring
```bash
# PM2 monitoring
pm2 monit

# Real-time logs
pm2 logs takason-api --lines 50 --raw
```

### Backup Stratejisi
```bash
# Database backup (günlük cron job)
0 2 * * * pg_dump -U takason_user takason_prod > /backups/db_$(date +\%Y\%m\%d).sql
```

---

## 🎉 Tebrikler!

Siteniz artık canlıda! 

**Production URL**: https://takason.com
**API URL**: https://api.takason.com/api

Herhangi bir sorun olursa logs'ları kontrol edin ve bu kılavuzu takip edin.
