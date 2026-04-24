# 🎉 Node.js Destekli Paylaşımlı Hosting'de Deployment

## ✅ Harika! Node.js Desteği Var

Hosting'inizde Node.js desteği varsa, **hem backend hem frontend'i aynı hosting'de** çalıştırabilirsiniz!

---

## 📋 Gereksinimler

### Hosting'inizde Olması Gerekenler:
- ✅ Node.js 18.x veya üzeri
- ✅ npm veya yarn
- ✅ SSH/Terminal erişimi (veya cPanel Node.js App Manager)
- ✅ PostgreSQL veya MySQL desteği
- ✅ SSL sertifikası

### Kontrol Edin:
```bash
# SSH ile bağlanın
ssh kullanici@yourdomain.com

# Node.js versiyonu
node --version  # v18.x veya üzeri olmalı

# npm versiyonu
npm --version
```

---

## 🎯 Deployment Seçenekleri

### Seçenek 1: cPanel Node.js App Manager (En Kolay)
- ✅ Grafik arayüz
- ✅ Kolay kurulum
- ✅ SSH gerekmez

### Seçenek 2: SSH ile Manuel Kurulum (Tam Kontrol)
- ✅ Tam kontrol
- ✅ PM2 kullanabilirsiniz
- ✅ Özelleştirilebilir

---

## 🚀 SEÇENEK 1: cPanel Node.js App Manager

### ADIM 1: Database Oluşturun

#### 1.1 PostgreSQL (Önerilen)
```
cPanel → PostgreSQL Databases
- Database Name: takason_db
- User: takason_user
- Password: [GÜÇLÜ ŞİFRE]
- Privileges: ALL
```

**Connection String**:
```
postgresql://takason_user:PASSWORD@localhost:5432/takason_db
```

#### 1.2 MySQL (Alternatif)
```
cPanel → MySQL Databases
- Database Name: takason_db
- User: takason_user
- Password: [GÜÇLÜ ŞİFRE]
```

**Prisma Schema Değişikliği** (MySQL için):
```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

**Connection String**:
```
mysql://takason_user:PASSWORD@localhost:3306/takason_db
```

---

### ADIM 2: Dosyaları Yükleyin

#### 2.1 FTP/SFTP ile Yükleme

**FileZilla ile**:
1. Bağlan: `ftp.yourdomain.com`
2. Ana dizine git (genelde `/home/username/`)
3. Yeni klasör oluştur: `takason`
4. Tüm proje dosyalarını yükle

**Dizin yapısı**:
```
/home/username/takason/
├── server/
│   ├── node_modules/ (yüklemeyın!)
│   ├── prisma/
│   ├── controllers/
│   ├── routes/
│   ├── package.json
│   ├── server.js
│   └── .env
└── react-app/
    ├── src/
    ├── public/
    └── package.json
```

#### 2.2 Git ile Yükleme (SSH varsa)

```bash
# SSH ile bağlan
ssh username@yourdomain.com

# Takason klasörü oluştur
mkdir -p ~/takason
cd ~/takason

# Git clone
git clone https://github.com/USERNAME/takason.git .
```

---

### ADIM 3: Backend Yapılandırması

#### 3.1 Environment Variables

`server/.env` dosyası oluşturun:

```env
NODE_ENV=production
PORT=3000

# Database (PostgreSQL)
DATABASE_URL="postgresql://takason_user:PASSWORD@localhost:5432/takason_db"
DIRECT_URL="postgresql://takason_user:PASSWORD@localhost:5432/takason_db"

# VEYA MySQL kullanıyorsanız:
# DATABASE_URL="mysql://takason_user:PASSWORD@localhost:3306/takason_db"

# JWT Secrets (güçlü şifreler)
JWT_SECRET="your-very-strong-secret-key-min-32-characters"
JWT_REFRESH_SECRET="another-strong-secret-key-min-32-characters"

# CORS (kendi domain'iniz)
ALLOWED_ORIGINS="https://yourdomain.com,https://www.yourdomain.com"

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100

# File Upload
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES="image/jpeg,image/png,image/webp,image/gif"

# Cloudinary
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
```

#### 3.2 cPanel Node.js App Manager

1. **cPanel** → **Setup Node.js App**
2. **Create Application**:
   ```
   Node.js version: 18.x veya 20.x
   Application mode: Production
   Application root: takason/server
   Application URL: api.yourdomain.com (veya yourdomain.com/api)
   Application startup file: server.js
   ```

3. **Environment Variables** ekleyin (yukarıdaki .env içeriği)

4. **Run NPM Install** tıklayın

5. **Start** tıklayın

---

### ADIM 4: Database Migration

#### SSH ile:
```bash
cd ~/takason/server

# Dependencies yükle
npm install

# Prisma generate
npx prisma generate

# Migration
npx prisma migrate deploy

# Seed data
npx prisma db seed
```

#### cPanel Terminal ile:
1. cPanel → Terminal
2. Yukarıdaki komutları çalıştırın

---

### ADIM 5: Frontend Build & Deploy

#### 5.1 Frontend Build

**Local'de** (kendi bilgisayarınızda):
```bash
cd react-app

# .env.production oluştur
echo "VITE_API_URL=https://yourdomain.com/api" > .env.production
echo "VITE_SOCKET_URL=https://yourdomain.com" >> .env.production

# Build
npm run build
```

#### 5.2 Frontend Yükleme

**cPanel File Manager**:
1. `public_html` klasörüne git
2. İçindekileri sil (veya yedekle)
3. `react-app/dist/` içindeki dosyaları yükle

**FTP ile**:
1. FileZilla ile bağlan
2. `public_html` klasörüne git
3. `dist/` dosyalarını yükle

#### 5.3 .htaccess Oluşturun

`public_html/.htaccess`:

```apache
# API isteklerini Node.js app'e yönlendir
<IfModule mod_rewrite.c>
  RewriteEngine On
  
  # API istekleri için
  RewriteCond %{REQUEST_URI} ^/api/
  RewriteRule ^api/(.*)$ http://localhost:3000/api/$1 [P,L]
  
  # React Router için
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_URI} !^/api/
  RewriteRule . /index.html [L]
</IfModule>

# Gzip compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Browser caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>

# Security headers
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-XSS-Protection "1; mode=block"
</IfModule>
```

---

## 🔧 SEÇENEK 2: SSH ile Manuel Kurulum

### ADIM 1: SSH Bağlantısı

```bash
ssh username@yourdomain.com
```

### ADIM 2: Proje Kurulumu

```bash
# Ana dizine git
cd ~

# Proje klasörü oluştur
mkdir takason
cd takason

# Git clone (veya FTP ile yükleyin)
git clone https://github.com/USERNAME/takason.git .

# Backend dependencies
cd server
npm install

# Frontend dependencies
cd ../react-app
npm install
```

### ADIM 3: Environment Variables

```bash
# Backend .env
cd ~/takason/server
nano .env
# (Yukarıdaki .env içeriğini yapıştırın)

# Frontend .env.production
cd ~/takason/react-app
nano .env.production
# VITE_API_URL=https://yourdomain.com/api
# VITE_SOCKET_URL=https://yourdomain.com
```

### ADIM 4: Database Setup

```bash
cd ~/takason/server

# Prisma generate
npx prisma generate

# Migration
npx prisma migrate deploy

# Seed
npx prisma db seed
```

### ADIM 5: PM2 ile Backend Başlatma

```bash
# PM2 kur (global)
npm install -g pm2

# Backend başlat
cd ~/takason/server
pm2 start server.js --name takason-api

# Auto-restart
pm2 startup
pm2 save

# Status kontrol
pm2 status
```

### ADIM 6: Frontend Build

```bash
cd ~/takason/react-app
npm run build

# Build dosyalarını public_html'e kopyala
cp -r dist/* ~/public_html/
```

### ADIM 7: .htaccess (Yukarıdaki ile aynı)

---

## 🌐 Subdomain Yapılandırması (Alternatif)

### Backend için subdomain oluşturun:

**cPanel → Subdomains**:
```
Subdomain: api
Domain: yourdomain.com
Document Root: /home/username/takason/server/public
```

**Frontend .env.production**:
```env
VITE_API_URL=https://api.yourdomain.com/api
VITE_SOCKET_URL=https://api.yourdomain.com
```

**Backend .env**:
```env
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

---

## ✅ Test & Doğrulama

### Backend Test

```bash
# Health check
curl https://yourdomain.com/api/health

# Beklenen yanıt:
# {"status":"ok","timestamp":"..."}
```

### Frontend Test

1. Browser'da açın: `https://yourdomain.com`
2. Kayıt ol butonuna tıklayın
3. Test kullanıcısı oluşturun
4. Giriş yapın
5. İlanları görün

### PM2 Status (SSH ile)

```bash
pm2 status
pm2 logs takason-api
```

---

## 🔄 Güncelleme (Yeni Kod Deploy)

### Git ile:
```bash
cd ~/takason
git pull origin main

# Backend restart
cd server
npm install
pm2 restart takason-api

# Frontend rebuild
cd ../react-app
npm install
npm run build
cp -r dist/* ~/public_html/
```

### FTP ile:
1. Değişen dosyaları yükleyin
2. SSH ile backend restart:
   ```bash
   pm2 restart takason-api
   ```

---

## 🐛 Sorun Giderme

### Backend Başlamıyor

```bash
# PM2 logs
pm2 logs takason-api --lines 100

# Manuel başlat (debug)
cd ~/takason/server
node server.js

# Port kontrolü
netstat -tulpn | grep 3000
```

### Database Bağlantı Hatası

```bash
# PostgreSQL çalışıyor mu?
sudo systemctl status postgresql

# Connection string doğru mu?
cat ~/takason/server/.env | grep DATABASE_URL

# Test connection
cd ~/takason/server
npx prisma db pull
```

### Frontend API'ye Bağlanamıyor

**CORS hatası**:
```bash
# Backend .env kontrol
cat ~/takason/server/.env | grep ALLOWED_ORIGINS
# Domain'iniz ekli mi?
```

**.htaccess proxy çalışmıyor**:
```bash
# mod_proxy aktif mi?
# cPanel → Apache Modules kontrol
```

### Port Çakışması

```bash
# Kullanılan portları kontrol
netstat -tulpn | grep LISTEN

# Backend .env'de farklı port kullanın
# PORT=3001
```

---

## 📊 Performans Optimizasyonu

### 1. PM2 Cluster Mode

```bash
# Tüm CPU çekirdeklerini kullan
pm2 delete takason-api
pm2 start server.js --name takason-api -i max
pm2 save
```

### 2. Nginx Reverse Proxy (Varsa)

`/etc/nginx/sites-available/yourdomain.com`:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    
    # Frontend
    root /home/username/public_html;
    index index.html;
    
    # API proxy
    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
    
    # React Router
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### 3. Database Connection Pooling

`server/prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
  previewFeatures = ["postgresqlExtensions"]
}
```

---

## 🔒 Güvenlik

### 1. Firewall

```bash
# UFW kur (varsa)
sudo apt install ufw

# Portları aç
sudo ufw allow 22/tcp   # SSH
sudo ufw allow 80/tcp   # HTTP
sudo ufw allow 443/tcp  # HTTPS
sudo ufw enable
```

### 2. SSL Sertifikası

**cPanel → SSL/TLS**:
1. AutoSSL aktif mi kontrol edin
2. Let's Encrypt ile ücretsiz SSL

**Veya manuel**:
```bash
# Certbot
sudo certbot --apache -d yourdomain.com -d www.yourdomain.com
```

### 3. Environment Variables Güvenliği

```bash
# .env dosyası izinleri
chmod 600 ~/takason/server/.env

# Git'e eklemeyin
echo ".env" >> .gitignore
```

---

## 📋 Deployment Checklist

### Hazırlık
- [ ] Node.js versiyonu kontrol edildi (18.x+)
- [ ] SSH/cPanel erişimi var
- [ ] Database oluşturuldu (PostgreSQL/MySQL)
- [ ] Cloudinary hesabı hazır

### Backend
- [ ] Dosyalar yüklendi
- [ ] .env dosyası oluşturuldu
- [ ] Dependencies yüklendi
- [ ] Prisma migration çalıştırıldı
- [ ] Seed data eklendi
- [ ] PM2/cPanel ile başlatıldı
- [ ] Health check başarılı

### Frontend
- [ ] .env.production oluşturuldu
- [ ] Build alındı
- [ ] public_html'e yüklendi
- [ ] .htaccess eklendi
- [ ] SSL aktif

### Test
- [ ] Backend API çalışıyor
- [ ] Frontend açılıyor
- [ ] Kayıt olma çalışıyor
- [ ] Giriş yapma çalışıyor
- [ ] İlanlar listeleniyor

---

## 💰 Maliyet

**Tek Hosting ile**:
```
Hosting (Node.js destekli): ₺100-300/ay
Domain: ₺150/yıl
SSL: Ücretsiz (Let's Encrypt)
Cloudinary: Ücretsiz (Free plan)
---
TOPLAM: ₺100-300/ay
```

**Avantajlar**:
- ✅ Tek yerde yönetim
- ✅ Tek fatura
- ✅ Kolay backup
- ✅ Hızlı iletişim (backend-frontend aynı sunucuda)

---

## 🎉 Tebrikler!

Siteniz artık Node.js destekli paylaşımlı hosting'de canlıda!

**URL**: https://yourdomain.com  
**API**: https://yourdomain.com/api

**Sonraki adımlar**:
1. ✅ Monitoring kur (PM2 monit)
2. ✅ Backup stratejisi
3. ✅ Performance test
4. ✅ SEO optimizasyonu

**Başarılar! 🚀**
