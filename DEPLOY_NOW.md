# 🚀 DEPLOY NOW - Hostinger'a Hemen Yükle!

## ✅ HER ŞEY HAZIR!

### Backend
- ✅ Supabase bağlı (fJn4uvksMEDlQU9q)
- ✅ Database migrate edildi
- ✅ 28 kategori yüklü
- ✅ JWT secrets oluşturuldu
- ✅ Cloudinary yapılandırıldı

### Frontend
- ✅ Build alındı (dist/ klasörü hazır)
- ✅ 1.12 MB (gzip: ~300 KB)
- ✅ Production optimized

### GitHub
- ✅ https://github.com/yusufcolak1/testfront
- ✅ Tüm kod pushed

---

## 🎯 3 ADIMDA DEPLOY

### ADIM 1: SSH Bağlan (1 dk)

```bash
ssh u123456789@ssh.hostinger.com -p 65002
# (Kendi SSH bilgilerinizle)
```

### ADIM 2: Backend Deploy (10 dk)

**SSH'de şu komutları çalıştırın**:

```bash
# Projeyi klonla
cd ~
git clone https://github.com/yusufcolak1/testfront.git takason
cd takason/server

# Dependencies
npm install --production

# .env oluştur
cat > .env << 'EOF'
NODE_ENV=production
PORT=5000

DATABASE_URL="postgresql://postgres:fJn4uvksMEDlQU9q@db.bystbbkjlndvbvphynol.supabase.co:6543/postgres?pgbouncer=true&connection_limit=1"
DIRECT_URL="postgresql://postgres:fJn4uvksMEDlQU9q@db.bystbbkjlndvbvphynol.supabase.co:5432/postgres"

JWT_SECRET="bbbf87c7ec3e68725544f61314120698c35b0f5833e0845511d7404c40297fe7"
JWT_EXPIRES_IN="7d"
JWT_REFRESH_SECRET="d30efeea5a5ccdb9a7f05330df766b82c1098e23054cdcfef0ff1f11c6a1c829"
JWT_REFRESH_EXPIRES_IN="30d"

ALLOWED_ORIGINS="https://takason.com.tr,https://www.takason.com.tr,https://api.takason.com.tr"

CLOUDINARY_CLOUD_NAME="dhkgsk5wv"
CLOUDINARY_API_KEY="737549276127958"
CLOUDINARY_API_SECRET="a0-f_UG8_eerMM0s7HIt3C4uZJQ"

SUPABASE_URL="https://bystbbkjlndvbvphynol.supabase.co"
SUPABASE_ANON_KEY="sb_publishable_13LPdpt8yBmwccf_HmHFQw_bOH2QcaT"

RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES="image/jpeg,image/png,image/webp,image/gif"
EOF

# Prisma
npx prisma generate

# PM2 başlat
npm install -g pm2
pm2 start server.js --name takason-api
pm2 startup
pm2 save

# Test
curl http://localhost:5000/api/health
pm2 logs takason-api --lines 20
```

### ADIM 3: Frontend Upload (5 dk)

**Seçenek A: FileZilla (Kolay)**

1. FileZilla aç
2. Hostinger FTP bilgileriyle bağlan
3. Local: `C:\Users\u\Downloads\TakasSitesi\TakasSitesi\react-app\dist\*`
4. Remote: `/domains/takason.com.tr/public_html/`
5. Tüm dosyaları sürükle-bırak

**Seçenek B: SCP (Hızlı)**

```powershell
# PowerShell'de
scp -P 65002 -r C:\Users\u\Downloads\TakasSitesi\TakasSitesi\react-app\dist\* u123456789@ssh.hostinger.com:~/domains/takason.com.tr/public_html/
```

**Seçenek C: cPanel File Manager**

1. Hostinger cPanel → File Manager
2. `/domains/takason.com.tr/public_html/` aç
3. Upload → `dist/` içindeki tüm dosyalar
4. Extract (zip ise)

---

## 🔧 .htaccess Ekle (2 dk)

**SSH'de**:

```bash
cd ~/domains/takason.com.tr/public_html

cat > .htaccess << 'EOF'
RewriteEngine On

# API Proxy
RewriteCond %{REQUEST_URI} ^/api/
RewriteRule ^api/(.*)$ http://localhost:5000/api/$1 [P,L]

# Socket.io Proxy
RewriteCond %{REQUEST_URI} ^/socket.io/
RewriteRule ^socket.io/(.*)$ http://localhost:5000/socket.io/$1 [P,L]

# React Router
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ index.html [L]

<IfModule mod_headers.c>
    Header set X-Content-Type-Options "nosniff"
    Header set X-Frame-Options "SAMEORIGIN"
    Header set X-XSS-Protection "1; mode=block"
</IfModule>
EOF
```

---

## ✅ Test Et (2 dk)

### Backend Test
```bash
# SSH'de
curl http://localhost:5000/api/health
pm2 status
```

### Frontend Test
Browser'da:
1. https://takason.com.tr
2. Kayıt ol → Test kullanıcısı
3. Giriş yap
4. Kategorileri gör

---

## 🎉 TAMAM!

**Canlı URL'ler**:
- 🌐 Frontend: https://takason.com.tr
- 🔌 API: https://api.takason.com.tr/api
- ❤️ Health: https://api.takason.com.tr/api/health

**Monitoring**:
```bash
pm2 status
pm2 logs takason-api
pm2 monit
```

**Güncelleme**:
```bash
cd ~/takason
git pull
pm2 restart takason-api
```

---

## 📞 Sorun mu var?

### Backend çalışmıyor
```bash
pm2 logs takason-api
pm2 restart takason-api
```

### Frontend boş sayfa
```bash
# .htaccess kontrol
cat ~/domains/takason.com.tr/public_html/.htaccess
```

### API bağlanamıyor
- CORS kontrol: .env'de ALLOWED_ORIGINS
- .htaccess proxy kontrol

---

## 📚 Detaylı Kılavuz

Daha fazla bilgi için:
- `HOSTINGER_QUICK_DEPLOY.md` - Detaylı adımlar
- `HOSTINGER_DEPLOYMENT.md` - Tam kılavuz

---

**BAŞARILAR! 20 DAKİKADA CANLIDA! 🚀**
