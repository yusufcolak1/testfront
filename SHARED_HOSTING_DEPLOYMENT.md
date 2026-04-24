# 🏠 Paylaşımlı Hosting'de Deployment

## ⚠️ ÖNEMLİ: Paylaşımlı Hosting Sınırlamaları

Paylaşımlı hosting'de **Node.js backend çalıştırmak çok zordur** çünkü:

### Paylaşımlı Hosting'in Sınırları:
- ❌ Node.js desteği genelde YOK
- ❌ PM2 gibi process manager çalıştıramazsınız
- ❌ Terminal/SSH erişimi sınırlı veya yok
- ❌ Port açma izni yok (sadece 80/443)
- ❌ Background process çalıştıramazsınız
- ❌ PostgreSQL genelde desteklenmez
- ✅ Sadece PHP, MySQL, static HTML desteklenir

---

## 🎯 Çözüm Seçenekleri

### Seçenek 1: Hybrid Yaklaşım (ÖNERİLEN)
**Backend**: Ücretsiz cloud servis  
**Frontend**: Paylaşımlı hosting

### Seçenek 2: Tamamen Ücretsiz Cloud
**Backend + Frontend**: Ücretsiz cloud servisleri

### Seçenek 3: VPS (En İyi Performans)
**Backend + Frontend**: Ucuz VPS ($5/ay)

---

## 🚀 Seçenek 1: Hybrid Deployment (ÖNERİLEN)

### Backend → Render.com (ÜCRETSIZ)
### Frontend → Paylaşımlı Hosting

Bu yaklaşım:
- ✅ Backend ücretsiz cloud'da çalışır
- ✅ Frontend paylaşımlı hosting'de
- ✅ Tamamen ücretsiz olabilir
- ✅ Kolay kurulum

---

## 📦 ADIM 1: Backend'i Render.com'a Deploy

### 1.1 Render.com Hesabı Oluşturun
1. https://render.com → Sign Up (GitHub ile)
2. Ücretsiz plan seçin

### 1.2 GitHub Repository Oluşturun
```bash
# Projenizi GitHub'a yükleyin
cd c:\Users\u\Downloads\TakasSitesi\TakasSitesi
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/USERNAME/takason.git
git push -u origin main
```

### 1.3 Render'da Web Service Oluşturun

1. **Render Dashboard** → New → Web Service
2. **Connect Repository** → GitHub repo seçin
3. **Ayarlar**:
   ```
   Name: takason-api
   Region: Frankfurt (veya en yakın)
   Branch: main
   Root Directory: server
   Runtime: Node
   Build Command: npm install && npx prisma generate
   Start Command: node server.js
   ```

4. **Environment Variables** ekleyin:
   ```
   NODE_ENV=production
   PORT=10000
   
   # Supabase Database
   DATABASE_URL=postgresql://postgres.[REF]:[PASS]@...
   DIRECT_URL=postgresql://postgres.[REF]:[PASS]@...
   
   # JWT Secrets (güçlü şifreler)
   JWT_SECRET=your-strong-secret-here
   JWT_REFRESH_SECRET=your-refresh-secret-here
   
   # CORS (frontend domain'iniz)
   ALLOWED_ORIGINS=https://www.yourdomain.com,https://yourdomain.com
   
   # Cloudinary
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

5. **Create Web Service** tıklayın

### 1.4 Database Migration
Render deploy edildikten sonra:
1. Render Dashboard → takason-api → Shell
2. Şu komutları çalıştırın:
   ```bash
   npx prisma migrate deploy
   npx prisma db seed
   ```

**Backend URL'iniz**: `https://takason-api.onrender.com`

---

## 🌐 ADIM 2: Frontend'i Paylaşımlı Hosting'e Deploy

### 2.1 Frontend Build Alın

```bash
cd react-app

# .env.production dosyasını güncelleyin
# VITE_API_URL=https://takason-api.onrender.com/api
# VITE_SOCKET_URL=https://takason-api.onrender.com

# Production build
npm run build
```

Bu `dist/` klasörü oluşturur.

### 2.2 Paylaşımlı Hosting'e Yükleyin

#### cPanel Kullanıyorsanız:
1. **cPanel** → File Manager
2. **public_html** klasörüne gidin
3. İçindekileri silin (veya yedekleyin)
4. `dist/` klasöründeki TÜM dosyaları yükleyin
5. `.htaccess` dosyası oluşturun:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Gzip compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>

# Browser caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

#### FTP Kullanıyorsanız:
1. **FileZilla** veya FTP client açın
2. Hosting bilgilerinizle bağlanın
3. `public_html` veya `www` klasörüne gidin
4. `dist/` içindeki dosyaları yükleyin
5. `.htaccess` dosyasını oluşturun (yukarıdaki içerikle)

---

## 🎉 Tamamlandı!

**Frontend**: https://yourdomain.com  
**Backend API**: https://takason-api.onrender.com/api

---

## 🆓 Seçenek 2: Tamamen Ücretsiz Cloud

### Backend → Render.com (Ücretsiz)
### Frontend → Vercel/Netlify (Ücretsiz)

#### Frontend için Vercel:

1. **Vercel hesabı** oluşturun: https://vercel.com
2. **GitHub repo'yu** bağlayın
3. **Ayarlar**:
   ```
   Framework Preset: Vite
   Root Directory: react-app
   Build Command: npm run build
   Output Directory: dist
   ```
4. **Environment Variables**:
   ```
   VITE_API_URL=https://takason-api.onrender.com/api
   VITE_SOCKET_URL=https://takason-api.onrender.com
   ```
5. **Deploy** tıklayın

**Avantajlar**:
- ✅ Otomatik SSL
- ✅ Global CDN
- ✅ Git push ile otomatik deploy
- ✅ Tamamen ücretsiz

---

## 💰 Seçenek 3: Ucuz VPS (En İyi Performans)

### Önerilen VPS Sağlayıcıları:

#### 1. Hetzner Cloud (En Ucuz)
- **Fiyat**: €4.15/ay (~150 TL/ay)
- **Özellikler**: 2GB RAM, 20GB SSD, 20TB trafik
- **Link**: https://www.hetzner.com/cloud

#### 2. DigitalOcean
- **Fiyat**: $6/ay (~200 TL/ay)
- **Özellikler**: 1GB RAM, 25GB SSD
- **Link**: https://www.digitalocean.com

#### 3. Vultr
- **Fiyat**: $6/ay (~200 TL/ay)
- **Özellikler**: 1GB RAM, 25GB SSD
- **Link**: https://www.vultr.com

**VPS ile**:
- ✅ Tam kontrol
- ✅ En iyi performans
- ✅ Sınırsız özelleştirme
- ✅ `PRODUCTION_DEPLOYMENT.md` kılavuzunu kullanın

---

## 📋 Karşılaştırma Tablosu

| Özellik | Paylaşımlı Hosting | Hybrid (Render+Hosting) | Tamamen Cloud | VPS |
|---------|-------------------|------------------------|---------------|-----|
| **Fiyat** | ₺50-100/ay | ₺50/ay (sadece hosting) | ÜCRETSIZ | ₺150-200/ay |
| **Node.js** | ❌ | ✅ (Render) | ✅ | ✅ |
| **Performans** | ⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Kurulum** | Zor | Kolay | Çok Kolay | Orta |
| **Ölçeklenebilirlik** | ❌ | ✅ | ✅ | ✅ |
| **SSL** | ✅ | ✅ | ✅ | ✅ |
| **Önerilen** | ❌ | ✅ | ✅ | ✅ |

---

## 🎯 Önerim: Hybrid Yaklaşım

**Sizin için en iyi seçenek**:

1. **Backend** → Render.com (ÜCRETSIZ)
   - Otomatik SSL
   - Kolay deployment
   - GitHub entegrasyonu

2. **Frontend** → Mevcut paylaşımlı hosting'iniz
   - Sadece static dosyalar
   - Zaten ödüyorsunuz
   - Kolay yönetim

**Toplam Maliyet**: Sadece hosting ücretiniz (₺50-100/ay)

---

## 🚀 Hızlı Başlangıç: Hybrid Deployment

### 1. Backend'i Render'a Deploy (15 dakika)
```bash
# GitHub'a yükle
git init
git add .
git commit -m "Initial commit"
git push origin main

# Render.com'da:
# - New Web Service
# - GitHub repo bağla
# - Environment variables ekle
# - Deploy
```

### 2. Frontend Build (5 dakika)
```bash
cd react-app
# .env.production'da API URL'i güncelle
npm run build
```

### 3. Hosting'e Yükle (10 dakika)
```bash
# cPanel File Manager veya FTP ile
# dist/ klasörünü public_html'e yükle
# .htaccess ekle
```

**Toplam Süre**: ~30 dakika

---

## 🔧 Sorun Giderme

### Render.com'da Backend Başlamıyor
```bash
# Render Dashboard → Logs kontrol edin
# Environment variables doğru mu?
# DATABASE_URL geçerli mi?
# Build başarılı mı?
```

### Frontend API'ye Bağlanamıyor
```bash
# Browser Console → Network tab
# API URL doğru mu?
# CORS hatası var mı?
# Render backend çalışıyor mu?
```

### .htaccess Çalışmıyor
```bash
# cPanel → Apache Handlers kontrol
# mod_rewrite aktif mi?
# .htaccess dosyası public_html'de mi?
```

---

## 📞 Alternatif Ücretsiz Backend Servisleri

### 1. Railway.app
- **Ücretsiz**: 500 saat/ay
- **Link**: https://railway.app

### 2. Fly.io
- **Ücretsiz**: 3 VM
- **Link**: https://fly.io

### 3. Cyclic.sh
- **Ücretsiz**: Sınırsız
- **Link**: https://www.cyclic.sh

---

## ✅ Sonuç

**Paylaşımlı hosting'de sadece frontend çalıştırın!**

Backend için:
1. ✅ **Render.com** (ücretsiz, kolay)
2. ✅ **Vercel** (ücretsiz, hızlı)
3. ✅ **Railway** (ücretsiz, güçlü)

**Veya**:
- 💰 Ucuz VPS alın (₺150/ay) → Tam kontrol

**Asla**:
- ❌ Paylaşımlı hosting'de Node.js çalıştırmaya çalışmayın
- ❌ Backend'i hosting'e yüklemeye uğraşmayın

---

## 🎉 Başarılar!

Hybrid yaklaşım ile hem ücretsiz hem de profesyonel bir deployment yapabilirsiniz!

**Sorularınız için**: `PRODUCTION_DEPLOYMENT.md` dosyasına bakın.
