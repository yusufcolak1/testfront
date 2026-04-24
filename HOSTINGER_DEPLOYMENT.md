# 🚀 Hostinger'da Deployment - Adım Adım Kılavuz

## ✅ Hostinger Özellikleri (Ekran Görüntüsünden)

- ✅ **Node.js**: Son sürüm (22.x)
- ✅ **MySQL**: Var
- ✅ **SSH**: Var
- ✅ **Domain**: darkorchid-capybara-767867.hostingersite.com
- ✅ **Framework**: Vite (React)
- ✅ **Branch**: main

---

## 📋 Deployment Planı

### Backend → Hostinger (Node.js App)
### Frontend → Hostinger (Static Files)
### Database → Hostinger MySQL

**Toplam Süre**: ~45 dakika

---

## 🎯 ADIM 1: MySQL Database Kurulumu (10 dakika)

### 1.1 Hostinger Panel → Databases

1. **MySQL Databases** bölümüne gidin
2. **Create Database** tıklayın:
   ```
   Database Name: takason_db
   ```

3. **Create User** tıklayın:
   ```
   Username: takason_user
   Password: [GÜÇLÜ ŞİFRE OLUŞTURUN - KAYDEDIN!]
   ```

4. **Add User to Database**:
   ```
   User: takason_user
   Database: takason_db
   Privileges: ALL PRIVILEGES
   ```

### 1.2 Connection String Oluşturun

```
mysql://takason_user:ŞİFRENİZ@localhost:3306/takason_db
```

**Örnek**:
```
mysql://takason_user:MyStr0ng!Pass@localhost:3306/takason_db
```

✅ **Bu connection string'i bir yere kaydedin!**

---

## 🔧 ADIM 2: SSH ile Bağlanın (5 dakika)

### 2.1 SSH Bilgilerinizi Alın

Hostinger Panel → **SSH Access**:
```
Host: ssh.hostinger.com (veya benzeri)
Port: 65002 (veya panel'de gösterilen)
Username: u123456789 (panel'de gösterilen)
Password: [SSH şifreniz]
```

### 2.2 SSH Bağlantısı

**Windows PowerShell**:
```powershell
ssh u123456789@ssh.hostinger.com -p 65002
```

**Şifrenizi girin** (yazdığınızda görünmez, normal)

✅ **Bağlandınız!**

---

## 📦 ADIM 3: Proje Dosyalarını Yükleyin (10 dakika)

### Seçenek A: Git ile (Önerilen)

```bash
# Ana dizine git
cd ~/domains/darkorchid-capybara-767867.hostingersite.com

# Mevcut dosyaları yedekle
mkdir backup
mv public_html backup/

# Yeni public_html oluştur
mkdir public_html

# Git clone
cd ~
git clone https://github.com/KULLANICI_ADINIZ/takason.git
```

### Seçenek B: FTP ile

1. **FileZilla** açın
2. Hostinger FTP bilgileriyle bağlanın
3. Tüm proje dosyalarını yükleyin:
   ```
   /domains/darkorchid-capybara-767867.hostingersite.com/takason/
   ```

---

## 🗄️ ADIM 4: Backend Yapılandırması (10 dakika)

### 4.1 Environment Variables

```bash
# Backend klasörüne git
cd ~/takason/server

# .env dosyası oluştur
nano .env
```

**Aşağıdaki içeriği yapıştırın** (kendi bilgilerinizle):

```env
NODE_ENV=production
PORT=3000

# MySQL Database (ADIM 1'den)
DATABASE_URL="mysql://takason_user:ŞİFRENİZ@localhost:3306/takason_db"

# JWT Secrets (güçlü şifreler - aşağıdaki komutu çalıştırın)
JWT_SECRET="buraya-cok-guclu-rastgele-sifre-32-karakter-minimum"
JWT_REFRESH_SECRET="buraya-baska-guclu-rastgele-sifre-32-karakter"

# CORS (Hostinger domain'iniz)
ALLOWED_ORIGINS="https://darkorchid-capybara-767867.hostingersite.com,http://darkorchid-capybara-767867.hostingersite.com"

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100

# File Upload
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES="image/jpeg,image/png,image/webp,image/gif"

# Cloudinary (https://cloudinary.com ücretsiz hesap)
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
```

**JWT Secret oluşturmak için** (local bilgisayarınızda):
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Kaydet**: `Ctrl+O`, `Enter`, `Ctrl+X`

### 4.2 Dependencies Yükleyin

```bash
# Node.js versiyonu kontrol
node --version  # v22.x olmalı

# npm versiyonu
npm --version

# Dependencies yükle
npm install --production
```

### 4.3 Prisma MySQL Schema

```bash
# MySQL schema'yı kullan
cp prisma/schema.mysql.prisma prisma/schema.prisma

# Prisma generate
npx prisma generate

# Database migration
npx prisma migrate deploy

# Seed data (kategoriler)
npx prisma db seed
```

---

## 🌐 ADIM 5: Frontend Build (5 dakika)

### 5.1 Frontend Environment

```bash
cd ~/takason/react-app

# .env.production oluştur
nano .env.production
```

**İçerik**:
```env
VITE_API_URL=https://darkorchid-capybara-767867.hostingersite.com/api
VITE_SOCKET_URL=https://darkorchid-capybara-767867.hostingersite.com
```

**Kaydet**: `Ctrl+O`, `Enter`, `Ctrl+X`

### 5.2 Build

```bash
# Dependencies
npm install

# Production build
npm run build
```

### 5.3 Public HTML'e Kopyala

```bash
# Build dosyalarını public_html'e kopyala
cp -r dist/* ~/domains/darkorchid-capybara-767867.hostingersite.com/public_html/
```

---

## 🚀 ADIM 6: Backend'i Başlatın (5 dakika)

### 6.1 PM2 Kurulumu

```bash
# PM2 global install
npm install -g pm2

# Backend klasörüne git
cd ~/takason/server

# PM2 ile başlat
pm2 start server.js --name takason-api

# Auto-restart (sunucu yeniden başladığında)
pm2 startup
# Çıkan komutu kopyalayıp çalıştırın

pm2 save

# Status kontrol
pm2 status
```

**Çıktı**:
```
┌─────┬──────────────┬─────────┬─────────┬──────────┐
│ id  │ name         │ status  │ cpu     │ memory   │
├─────┼──────────────┼─────────┼─────────┼──────────┤
│ 0   │ takason-api  │ online  │ 0%      │ 50.0 MB  │
└─────┴──────────────┴─────────┴─────────┴──────────┘
```

✅ **Backend çalışıyor!**

---

## 🔧 ADIM 7: .htaccess Yapılandırması

### 7.1 .htaccess Oluşturun

```bash
cd ~/domains/darkorchid-capybara-767867.hostingersite.com/public_html
nano .htaccess
```

**İçerik**:
```apache
# API isteklerini Node.js backend'e yönlendir
<IfModule mod_rewrite.c>
  RewriteEngine On
  
  # API proxy
  RewriteCond %{REQUEST_URI} ^/api/
  RewriteRule ^api/(.*)$ http://localhost:3000/api/$1 [P,L]
  
  # WebSocket proxy (Socket.io için)
  RewriteCond %{REQUEST_URI} ^/socket.io/
  RewriteRule ^socket.io/(.*)$ http://localhost:3000/socket.io/$1 [P,L]
  
  # React Router için
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_URI} !^/api/
  RewriteCond %{REQUEST_URI} !^/socket.io/
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
  Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

# HTTPS redirect (SSL aktifse)
# RewriteCond %{HTTPS} off
# RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

**Kaydet**: `Ctrl+O`, `Enter`, `Ctrl+X`

---

## ✅ ADIM 8: Test & Doğrulama

### 8.1 Backend Health Check

```bash
# SSH'de
curl http://localhost:3000/api/health

# Beklenen yanıt:
# {"status":"ok","timestamp":"..."}
```

### 8.2 Frontend Test

**Browser'da açın**:
```
https://darkorchid-capybara-767867.hostingersite.com
```

**Test edin**:
1. ✅ Ana sayfa açılıyor mu?
2. ✅ Kayıt ol butonuna tıklayın
3. ✅ Test kullanıcısı oluşturun
4. ✅ Giriş yapın
5. ✅ İlanlar listeleniyor mu?

### 8.3 API Test

**Browser Console** (F12):
```javascript
// Network tab'ı açın
// API çağrılarını görmelisiniz:
// https://darkorchid-capybara-767867.hostingersite.com/api/items
```

### 8.4 PM2 Monitoring

```bash
# Real-time monitoring
pm2 monit

# Logs
pm2 logs takason-api

# Detaylı bilgi
pm2 show takason-api
```

---

## 🔄 Güncelleme (Yeni Kod Deploy)

### Git ile:
```bash
# SSH'de
cd ~/takason
git pull origin main

# Backend restart
cd server
npm install --production
pm2 restart takason-api

# Frontend rebuild
cd ../react-app
npm install
npm run build
cp -r dist/* ~/domains/darkorchid-capybara-767867.hostingersite.com/public_html/
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

# Hata mesajlarını okuyun
```

**Yaygın hatalar**:
- ❌ **Database bağlantı hatası**: DATABASE_URL doğru mu?
- ❌ **Port kullanımda**: `netstat -tulpn | grep 3000`
- ❌ **Prisma hatası**: `npx prisma generate` tekrar çalıştırın

### Frontend API'ye Bağlanamıyor

**CORS hatası**:
```bash
# Backend .env kontrol
cat ~/takason/server/.env | grep ALLOWED_ORIGINS
# Domain'iniz ekli mi?
```

**.htaccess proxy çalışmıyor**:
```bash
# mod_proxy aktif mi kontrol edin
# Hostinger support'a sorun
```

### Database Migration Hatası

```bash
cd ~/takason/server

# Schema kontrol
cat prisma/schema.prisma | grep provider
# provider = "mysql" olmalı

# Migration tekrar dene
npx prisma migrate deploy

# Veya reset (DİKKAT: Tüm data silinir!)
npx prisma migrate reset
```

---

## 🔒 Güvenlik

### 1. .env Dosyası İzinleri

```bash
chmod 600 ~/takason/server/.env
```

### 2. SSL Sertifikası

Hostinger Panel → **SSL**:
1. **Free SSL** (Let's Encrypt) aktif edin
2. **Force HTTPS** aktif edin

### 3. Firewall (Hostinger'da otomatik)

Hostinger zaten firewall sağlıyor, ekstra ayar gerekmez.

---

## 📊 Performans Optimizasyonu

### 1. PM2 Cluster Mode

```bash
# Tüm CPU çekirdeklerini kullan
pm2 delete takason-api
pm2 start server.js --name takason-api -i max
pm2 save
```

### 2. MySQL Connection Pooling

Prisma otomatik yapıyor, ek ayar gerekmez.

### 3. Cloudinary CDN

Resimler Cloudinary'de olduğu için zaten CDN kullanılıyor.

---

## 📋 Deployment Checklist

### Hazırlık
- [x] Hostinger hesabı var
- [x] Node.js son sürüm
- [x] MySQL database var
- [x] SSH erişimi var
- [ ] Cloudinary hesabı oluşturuldu

### Database
- [ ] MySQL database oluşturuldu
- [ ] User oluşturuldu
- [ ] Connection string kaydedildi

### Backend
- [ ] SSH ile bağlanıldı
- [ ] Proje dosyaları yüklendi
- [ ] .env dosyası oluşturuldu
- [ ] Dependencies yüklendi
- [ ] Prisma migration çalıştırıldı
- [ ] Seed data eklendi
- [ ] PM2 ile başlatıldı
- [ ] Health check başarılı

### Frontend
- [ ] .env.production oluşturuldu
- [ ] Build alındı
- [ ] public_html'e kopyalandı
- [ ] .htaccess eklendi

### Test
- [ ] Backend API çalışıyor
- [ ] Frontend açılıyor
- [ ] Kayıt olma çalışıyor
- [ ] Giriş yapma çalışıyor
- [ ] İlanlar listeleniyor
- [ ] SSL aktif

---

## 💰 Maliyet

**Hostinger ile**:
```
Hosting: Zaten ödüyorsunuz
Domain: Dahil
SSL: Ücretsiz
MySQL: Dahil
Node.js: Dahil
Cloudinary: Ücretsiz (Free plan)
---
TOPLAM: Ekstra maliyet YOK!
```

---

## 🎉 Tebrikler!

Siteniz artık Hostinger'da canlıda!

**URL**: https://darkorchid-capybara-767867.hostingersite.com  
**API**: https://darkorchid-capybara-767867.hostingersite.com/api

### Sonraki Adımlar:
1. ✅ Custom domain bağla (varsa)
2. ✅ Google Analytics ekle
3. ✅ Backup stratejisi kur
4. ✅ Monitoring kur (PM2 monit)
5. ✅ Performance test yap

**Başarılar! 🚀**

---

## 📞 Yardım

### Hostinger Support
- Live Chat: 7/24
- Email: support@hostinger.com
- Knowledge Base: https://support.hostinger.com

### Sorun mu var?
1. PM2 logs kontrol edin: `pm2 logs takason-api`
2. Browser console kontrol edin (F12)
3. Network tab kontrol edin
4. Bu dosyanın "Sorun Giderme" bölümüne bakın

**İyi şanslar!** 🎯
