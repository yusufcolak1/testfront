# 🚀 Hostinger Basit Deployment - Sadece Supabase

## ✅ Yapılan Değişiklikler

### Frontend
- ✅ **Mesajlar** giriş yapmadan görünmüyor artık
- ✅ Build hazır (`react-app/dist/`)
- ✅ Authentication guard eklendi

### Backend
- ✅ Prisma kaldırıldı (uyumsuzluk sorunu)
- ✅ Basit `pg` (PostgreSQL) library eklendi
- ✅ Supabase ile direkt bağlantı

---

## 📋 Deployment Adımları (20 Dakika)

### ADIM 1: Backend'i Güncelle (SSH'de)

```bash
# SSH bağlan
ssh -p 65002 u446324760@213.130.145.92

# Node.js aktif et
source /opt/alt/alt-nodejs22/enable

# Projeyi güncelle
cd ~/takason
git pull origin main

# Backend klasörüne git
cd server

# pg library yükle (Prisma yerine)
npm install pg

# PM2'yi durdur
~/node_modules/.bin/pm2 delete all

# Backend'i başlat
~/node_modules/.bin/pm2 start server.js --name takason-api

# Durumu kontrol et
~/node_modules/.bin/pm2 status
~/node_modules/.bin/pm2 logs takason-api --lines 30
```

---

### ADIM 2: Backend Test

```bash
# Health check
curl http://localhost:5000/api/health

# Beklenen çıktı:
# {"status":"ok","timestamp":"..."}
```

---

### ADIM 3: Frontend Upload (Hostinger'a)

**Seçenek A: FileZilla (Kolay)**

1. FileZilla aç
2. Bağlan:
   - Host: `213.130.145.92`
   - Username: `u446324760`
   - Password: [Hostinger şifreniz]
   - Port: `21`

3. Upload:
   - Local: `C:\Users\u\Downloads\TakasSitesi\TakasSitesi\react-app\dist\*`
   - Remote: `/domains/takason.com.tr/public_html/`
   - **Tüm dosyaları** sürükle-bırak

**Seçenek B: SCP (Hızlı)**

```powershell
# PowerShell'de (local bilgisayarınızda)
scp -P 65002 -r C:\Users\u\Downloads\TakasSitesi\TakasSitesi\react-app\dist\* u446324760@213.130.145.92:~/domains/takason.com.tr/public_html/
```

---

### ADIM 4: .htaccess Ekle (SSH'de)

```bash
cd ~/domains/takason.com.tr/public_html

cat > .htaccess << 'HTEOF'
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
HTEOF

# Kontrol
cat .htaccess
```

---

### ADIM 5: PM2 Otomatik Başlatma

```bash
# SSH'de
source /opt/alt/alt-nodejs22/enable

# Startup script oluştur
~/node_modules/.bin/pm2 startup

# Yukarıdaki komutun verdiği komutu çalıştırın (sudo ile başlayan)
# Örnek: sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u u446324760 --hp /home/u446324760

# Mevcut durumu kaydet
~/node_modules/.bin/pm2 save
```

---

## ✅ Test Edin

### Backend Test
```bash
# SSH'de
curl http://localhost:5000/api/health
~/node_modules/.bin/pm2 status
```

### Frontend Test (Browser)
1. **https://takason.com.tr** → Açılmalı
2. **Giriş yapmadan**:
   - ✅ Ana Sayfa görünür
   - ✅ Keşfet görünür
   - ✅ İlan Ver görünür
   - ❌ **Mesajlar görünmez** (giriş gerekli)
   - ✅ Favoriler görünür

3. **Giriş yaptıktan sonra**:
   - ✅ **Mesajlar görünür**
   - ✅ Profil görünür

---

## 🔧 Sorun Giderme

### Backend çalışmıyor

```bash
# Logs kontrol
~/node_modules/.bin/pm2 logs takason-api --lines 50

# Restart
~/node_modules/.bin/pm2 restart takason-api

# .env kontrol
cat ~/takason/server/.env
```

### Frontend API'ye bağlanamıyor

```bash
# .htaccess kontrol
cat ~/domains/takason.com.tr/public_html/.htaccess

# Backend port kontrol
netstat -tulpn | grep 5000
```

### Mesajlar hala görünüyor (giriş yapmadan)

- Browser cache temizleyin (Ctrl+Shift+Delete)
- Hard refresh yapın (Ctrl+F5)

---

## 📊 Monitoring

```bash
# PM2 status
~/node_modules/.bin/pm2 status

# Logs izle
~/node_modules/.bin/pm2 logs takason-api

# Real-time monitoring
~/node_modules/.bin/pm2 monit
```

---

## 🎉 Tamamlandı!

**Canlı URL**: https://takason.com.tr

**Özellikler**:
- ✅ Sadece Supabase kullanıyor (ekstra servis yok)
- ✅ Mesajlar giriş yapınca görünüyor
- ✅ Backend Hostinger'da çalışıyor
- ✅ Frontend Hostinger'da
- ✅ Tüm veriler Supabase'de

**Güncelleme**:
```bash
cd ~/takason
git pull origin main
~/node_modules/.bin/pm2 restart takason-api
```

**Başarılar! Artık her şey hazır! 🚀**
