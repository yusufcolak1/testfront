# 🚀 Hostinger Hızlı Deployment - Takason

## ✅ Hazır Bilgiler

### Database (Supabase)
```
DATABASE_URL="postgresql://postgres:fJn4uvksMEDlQU9q@db.bystbbkjlndvbvphynol.supabase.co:6543/postgres?pgbouncer=true&connection_limit=1"
DIRECT_URL="postgresql://postgres:fJn4uvksMEDlQU9q@db.bystbbkjlndvbvphynol.supabase.co:5432/postgres"
```

### JWT Secrets (YENİ OLUŞTURULDU)
```
JWT_SECRET="bbbf87c7ec3e68725544f61314120698c35b0f5833e0845511d7404c40297fe7"
JWT_REFRESH_SECRET="d30efeea5a5ccdb9a7f05330df766b82c1098e23054cdcfef0ff1f11c6a1c829"
```

### Cloudinary
```
CLOUDINARY_CLOUD_NAME="dhkgsk5wv"
CLOUDINARY_API_KEY="737549276127958"
CLOUDINARY_API_SECRET="a0-f_UG8_eerMM0s7HIt3C4uZJQ"
```

### Domain
```
takason.com.tr
```

---

## 📋 Hostinger Deployment Adımları (45 Dakika)

### ADIM 1: SSH Bağlantısı (2 dk)

```bash
# Hostinger SSH bilgilerinizle bağlanın
ssh u123456789@ssh.hostinger.com -p 65002
```

---

### ADIM 2: Projeyi Klonlayın (5 dk)

```bash
# Home dizinine gidin
cd ~

# GitHub'dan klonlayın
git clone https://github.com/yusufcolak1/testfront.git takason
cd takason

# Branch kontrol
git branch
```

---

### ADIM 3: Backend Kurulum (10 dk)

```bash
cd ~/takason/server

# Node modules yükle
npm install --production

# .env dosyası oluştur
cat > .env << 'EOF'
NODE_ENV=production
PORT=5000

# Database - Supabase
DATABASE_URL="postgresql://postgres:fJn4uvksMEDlQU9q@db.bystbbkjlndvbvphynol.supabase.co:6543/postgres?pgbouncer=true&connection_limit=1"
DIRECT_URL="postgresql://postgres:fJn4uvksMEDlQU9q@db.bystbbkjlndvbvphynol.supabase.co:5432/postgres"

# JWT Secrets
JWT_SECRET="bbbf87c7ec3e68725544f61314120698c35b0f5833e0845511d7404c40297fe7"
JWT_EXPIRES_IN="7d"
JWT_REFRESH_SECRET="d30efeea5a5ccdb9a7f05330df766b82c1098e23054cdcfef0ff1f11c6a1c829"
JWT_REFRESH_EXPIRES_IN="30d"

# CORS
ALLOWED_ORIGINS="https://takason.com.tr,https://www.takason.com.tr,https://api.takason.com.tr"

# Cloudinary
CLOUDINARY_CLOUD_NAME="dhkgsk5wv"
CLOUDINARY_API_KEY="737549276127958"
CLOUDINARY_API_SECRET="a0-f_UG8_eerMM0s7HIt3C4uZJQ"

# Supabase
SUPABASE_URL="https://bystbbkjlndvbvphynol.supabase.co"
SUPABASE_ANON_KEY="sb_publishable_13LPdpt8yBmwccf_HmHFQw_bOH2QcaT"

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100

# File Upload
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES="image/jpeg,image/png,image/webp,image/gif"
EOF

# Prisma setup
npx prisma generate

# Database zaten migrate edildi (local'de yaptık)
# Eğer tekrar gerekirse:
# npx prisma db push
```

---

### ADIM 4: PM2 ile Backend Başlatma (5 dk)

```bash
# PM2 yükle (global)
npm install -g pm2

# Backend'i başlat
cd ~/takason/server
pm2 start server.js --name takason-api

# Otomatik başlatma
pm2 startup
pm2 save

# Kontrol
pm2 status
pm2 logs takason-api --lines 50
```

---

### ADIM 5: Frontend Build (Local'de) (5 dk)

**Windows PowerShell'de (local bilgisayarınızda)**:

```powershell
cd C:\Users\u\Downloads\TakasSitesi\TakasSitesi\react-app

# Production env oluştur
@"
VITE_API_URL=https://api.takason.com.tr/api
VITE_SOCKET_URL=https://api.takason.com.tr
"@ | Out-File -FilePath .env.production -Encoding utf8

# Build al
npm run build

# dist klasörü oluştu
```

---

### ADIM 6: Frontend Upload (10 dk)

**Seçenek A: FTP ile Upload**

1. FileZilla veya FTP client açın
2. Hostinger FTP bilgileriyle bağlanın
3. `react-app/dist/*` içeriğini şuraya yükleyin:
   ```
   ~/domains/takason.com.tr/public_html/
   ```

**Seçenek B: SCP ile Upload (SSH)**

```powershell
# Local'den (PowerShell)
scp -P 65002 -r C:\Users\u\Downloads\TakasSitesi\TakasSitesi\react-app\dist\* u123456789@ssh.hostinger.com:~/domains/takason.com.tr/public_html/
```

---

### ADIM 7: .htaccess Yapılandırması (3 dk)

**SSH'de**:

```bash
cd ~/domains/takason.com.tr/public_html

# .htaccess oluştur
cat > .htaccess << 'EOF'
# Enable Rewrite Engine
RewriteEngine On

# API Proxy - Backend'e yönlendir
RewriteCond %{REQUEST_URI} ^/api/
RewriteRule ^api/(.*)$ http://localhost:5000/api/$1 [P,L]

# Socket.io Proxy
RewriteCond %{REQUEST_URI} ^/socket.io/
RewriteRule ^socket.io/(.*)$ http://localhost:5000/socket.io/$1 [P,L]

# React Router - Tüm istekleri index.html'e yönlendir
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ index.html [L]

# Security Headers
<IfModule mod_headers.c>
    Header set X-Content-Type-Options "nosniff"
    Header set X-Frame-Options "SAMEORIGIN"
    Header set X-XSS-Protection "1; mode=block"
</IfModule>

# Gzip Compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Cache Control
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
EOF
```

---

### ADIM 8: Domain DNS Ayarları (5 dk)

**Hostinger cPanel → DNS Zone Editor**:

```
A Record:
@ → Hostinger IP adresi

A Record:
api → Hostinger IP adresi

CNAME Record:
www → takason.com.tr
```

**SSL Sertifikası**:
- Hostinger cPanel → SSL/TLS
- Let's Encrypt ücretsiz SSL aktif edin

---

### ADIM 9: Test (5 dk)

```bash
# Backend test
curl http://localhost:5000/api/health

# Beklenen: {"status":"ok","timestamp":"..."}

# PM2 status
pm2 status

# Logs kontrol
pm2 logs takason-api --lines 100
```

**Browser'da**:
1. https://takason.com.tr → Açılmalı
2. Kayıt ol → Test kullanıcısı oluştur
3. Giriş yap → Başarılı olmalı
4. İlanları görüntüle → Kategoriler listelenmeli

---

## 🔧 Sorun Giderme

### Backend çalışmıyor

```bash
# Logs kontrol
pm2 logs takason-api

# Restart
pm2 restart takason-api

# .env kontrol
cat ~/takason/server/.env
```

### Frontend API'ye bağlanamıyor

```bash
# .htaccess kontrol
cat ~/domains/takason.com.tr/public_html/.htaccess

# Apache restart (cPanel'den)
```

### Database connection error

```bash
# Database URL kontrol
cd ~/takason/server
grep DATABASE_URL .env

# Prisma test
npx prisma db push
```

### Port 5000 kullanımda

```bash
# Port kontrol
netstat -tulpn | grep 5000

# Farklı port kullan (örn: 5001)
# .env'de PORT=5001 yapın
# .htaccess'te localhost:5001 yapın
```

---

## 📊 Deployment Checklist

### Backend
- [ ] Git clone yapıldı
- [ ] npm install tamamlandı
- [ ] .env dosyası oluşturuldu
- [ ] Prisma generate çalıştırıldı
- [ ] PM2 ile başlatıldı
- [ ] PM2 startup yapılandırıldı
- [ ] Health check başarılı

### Frontend
- [ ] .env.production oluşturuldu
- [ ] npm run build çalıştırıldı
- [ ] dist/ klasörü yüklendi
- [ ] .htaccess oluşturuldu
- [ ] Domain DNS ayarlandı
- [ ] SSL aktif edildi

### Test
- [ ] Backend API çalışıyor
- [ ] Frontend açılıyor
- [ ] Kayıt olma çalışıyor
- [ ] Giriş yapma çalışıyor
- [ ] Kategoriler listeleniyor
- [ ] Resim yükleme çalışıyor

---

## 🎯 Özet Komutlar

**Tek seferde tüm backend kurulumu**:

```bash
# SSH'de
cd ~
git clone https://github.com/yusufcolak1/testfront.git takason
cd takason/server
npm install --production

# .env oluştur (yukarıdaki içeriği yapıştır)
nano .env

# Prisma ve PM2
npx prisma generate
npm install -g pm2
pm2 start server.js --name takason-api
pm2 startup
pm2 save
pm2 logs takason-api
```

**Local'de frontend build**:

```powershell
cd C:\Users\u\Downloads\TakasSitesi\TakasSitesi\react-app
npm run build
# dist/ klasörünü FTP ile yükle
```

---

## 🎉 Tamamlandı!

**Canlı URL'ler**:
- Frontend: https://takason.com.tr
- API: https://api.takason.com.tr/api
- Health: https://api.takason.com.tr/api/health

**Monitoring**:
```bash
pm2 status
pm2 logs takason-api
pm2 monit
```

**Güncelleme**:
```bash
cd ~/takason
git pull origin main
cd server
npm install
pm2 restart takason-api
```

**Başarılar! Sisteminiz canlıda! 🚀**
