# 🚀 Render.com Deployment Kılavuzu

## ✅ Neden Render.com?

- ✅ **Tamamen ÜCRETSIZ** (750 saat/ay)
- ✅ **Otomatik SSL** sertifikası
- ✅ **GitHub entegrasyonu** (push = deploy)
- ✅ **Kolay kurulum** (5 dakika)
- ✅ **PostgreSQL** desteği
- ✅ **Auto-scaling** ve monitoring

---

## 📋 Gereksinimler

- [ ] GitHub hesabı
- [ ] Supabase hesabı (database için)
- [ ] Cloudinary hesabı (resim yükleme için)

---

## 🎯 ADIM 1: GitHub'a Yükleme (5 dakika)

### 1.1 Git Repository Oluşturun

```bash
# Proje klasörüne gidin
cd c:\Users\u\Downloads\TakasSitesi\TakasSitesi

# Git başlat
git init

# .gitignore kontrol (zaten var)
cat .gitignore

# Tüm dosyaları ekle
git add .

# Commit
git commit -m "Initial commit - Takason Exchange Platform"
```

### 1.2 GitHub'da Repository Oluşturun

1. https://github.com → **New repository**
2. **Repository name**: `takason`
3. **Visibility**: Private (veya Public)
4. **Create repository** tıklayın

### 1.3 Kodu GitHub'a Push Edin

```bash
# GitHub repo'nuzu bağlayın
git remote add origin https://github.com/KULLANICI_ADINIZ/takason.git

# Push
git branch -M main
git push -u origin main
```

✅ **Kod artık GitHub'da!**

---

## 🗄️ ADIM 2: Supabase Database (10 dakika)

### 2.1 Supabase Hesabı Oluşturun

1. https://supabase.com → **Start your project**
2. **GitHub ile giriş** yapın
3. **New project** tıklayın

### 2.2 Proje Ayarları

```
Name: takason-db
Database Password: [GÜÇLÜ ŞİFRE - KAYDEDIN!]
Region: Frankfurt (veya en yakın)
Pricing Plan: Free
```

### 2.3 Connection String Alın

1. **Settings** → **Database**
2. **Connection string** → **Transaction** modunu seçin
3. **Connection string** kopyalayın:

```
postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true
```

4. **Direct connection** string'i de kopyalayın (port 5432)

✅ **Database hazır!**

---

## ☁️ ADIM 3: Cloudinary Hesabı (5 dakika)

### 3.1 Hesap Oluşturun

1. https://cloudinary.com → **Sign Up Free**
2. Email ile kayıt olun

### 3.2 Credentials Alın

1. **Dashboard** → **Account Details**
2. Şunları kopyalayın:
   - **Cloud Name**
   - **API Key**
   - **API Secret**

✅ **Cloudinary hazır!**

---

## 🚀 ADIM 4: Render.com Deployment (10 dakika)

### 4.1 Render Hesabı Oluşturun

1. https://render.com → **Get Started**
2. **GitHub ile giriş** yapın
3. Render'a GitHub erişimi verin

### 4.2 Web Service Oluşturun

1. **Dashboard** → **New** → **Web Service**
2. **Connect a repository** → GitHub repo'nuzu seçin
3. **takason** repository'sini seçin

### 4.3 Service Ayarları

```yaml
Name: takason-api
Region: Frankfurt (veya en yakın)
Branch: main
Root Directory: server
Runtime: Node
Build Command: npm install && npx prisma generate
Start Command: node server.js
Instance Type: Free
```

### 4.4 Environment Variables Ekleyin

**Environment** sekmesinde şunları ekleyin:

```env
NODE_ENV=production
PORT=10000

# Supabase Database (ADIM 2'den kopyalayın)
DATABASE_URL=postgresql://postgres.[REF]:[PASS]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true
DIRECT_URL=postgresql://postgres.[REF]:[PASS]@aws-0-eu-central-1.pooler.supabase.com:5432/postgres

# JWT Secrets (Güçlü şifreler oluşturun)
JWT_SECRET=
JWT_REFRESH_SECRET=

# CORS (Frontend domain'inizi yazın)
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100

# File Upload
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/webp,image/gif

# Cloudinary (ADIM 3'ten kopyalayın)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**JWT Secret oluşturmak için** (local terminal'de):
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 4.5 Deploy Başlatın

1. **Create Web Service** tıklayın
2. Deploy başlayacak (3-5 dakika sürer)
3. Logs'u izleyin

✅ **Backend deploy ediliyor!**

---

## 🗄️ ADIM 5: Database Migration (5 dakika)

Deploy tamamlandıktan sonra:

### 5.1 Render Shell Açın

1. **Dashboard** → **takason-api**
2. **Shell** sekmesine gidin

### 5.2 Migration Çalıştırın

```bash
# Prisma schema'yı PostgreSQL için güncelle
cd server

# Migration deploy
npx prisma migrate deploy

# Seed data ekle
npx prisma db seed
```

✅ **Database hazır ve dolu!**

---

## 🌐 ADIM 6: Frontend Build & Deploy

### Seçenek A: Paylaşımlı Hosting'e Deploy

#### 6.1 Frontend Build Alın

```bash
# Local'de
cd c:\Users\u\Downloads\TakasSitesi\TakasSitesi\react-app

# .env.production güncelleyin
# VITE_API_URL=https://takason-api.onrender.com/api
# VITE_SOCKET_URL=https://takason-api.onrender.com

# Build
npm run build
```

#### 6.2 Hosting'e Yükleyin

**cPanel ile**:
1. File Manager → public_html
2. `dist/` klasöründeki dosyaları yükleyin
3. `.htaccess` oluşturun:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

**FTP ile**:
1. FileZilla ile bağlanın
2. `dist/` dosyalarını `public_html`'e yükleyin
3. `.htaccess` ekleyin

### Seçenek B: Vercel'e Deploy (Ücretsiz)

```bash
# Vercel CLI kur
npm install -g vercel

# Login
vercel login

# Deploy
cd react-app
vercel --prod
```

---

## ✅ ADIM 7: Test & Doğrulama

### 7.1 Backend Test

```bash
# Health check
curl https://takason-api.onrender.com/api/health

# Beklenen yanıt:
# {"status":"ok","timestamp":"..."}
```

### 7.2 Frontend Test

1. Browser'da açın: `https://yourdomain.com`
2. **Kayıt ol** butonuna tıklayın
3. Test kullanıcısı oluşturun
4. Giriş yapın
5. İlanları görün

### 7.3 API Bağlantısı Test

Browser Console (F12):
```javascript
// Network tab'ı açın
// API çağrılarını görmelisiniz:
// https://takason-api.onrender.com/api/items
```

✅ **Her şey çalışıyor!**

---

## 🔄 Güncelleme (Yeni Kod Deploy)

### Backend Güncelleme

```bash
# Local'de kod değiştirin
git add .
git commit -m "Update: yeni özellik"
git push origin main

# Render otomatik deploy eder!
```

### Frontend Güncelleme

```bash
# Build alın
cd react-app
npm run build

# Hosting'e yükleyin (FTP/cPanel)
# VEYA
# Vercel otomatik deploy eder (git push)
```

---

## 📊 Render.com Özellikleri

### Ücretsiz Plan Limitleri:
- ✅ **750 saat/ay** (31 gün = 744 saat)
- ✅ **512 MB RAM**
- ✅ **0.1 CPU**
- ✅ **Otomatik SSL**
- ⚠️ **15 dakika inaktivite sonrası sleep** (ilk istek 30 saniye sürer)

### Sleep Problemi Çözümü:
**UptimeRobot** ile 5 dakikada bir ping atın:
1. https://uptimerobot.com → Ücretsiz hesap
2. **Add New Monitor**:
   ```
   Monitor Type: HTTP(s)
   Friendly Name: Takason API
   URL: https://takason-api.onrender.com/api/health
   Monitoring Interval: 5 minutes
   ```

---

## 🐛 Sorun Giderme

### Deploy Başarısız

**Render Logs kontrol**:
1. Dashboard → takason-api → Logs
2. Hata mesajlarını okuyun

**Yaygın hatalar**:
```bash
# Prisma generate hatası
# Çözüm: Build command'e ekleyin
npm install && npx prisma generate

# Database bağlantı hatası
# Çözüm: DATABASE_URL doğru mu kontrol edin

# Port hatası
# Çözüm: PORT=10000 olmalı
```

### Frontend API'ye Bağlanamıyor

**CORS hatası**:
```bash
# Render'da ALLOWED_ORIGINS kontrol edin
# Frontend domain'iniz ekli mi?
ALLOWED_ORIGINS=https://yourdomain.com
```

**API URL yanlış**:
```bash
# react-app/.env.production kontrol
VITE_API_URL=https://takason-api.onrender.com/api
```

### Database Migration Hatası

```bash
# Render Shell'de
cd server

# Schema kontrol
cat prisma/schema.prisma
# provider = "postgresql" olmalı

# Migration tekrar dene
npx prisma migrate deploy --schema=./prisma/schema.production.prisma
```

---

## 💰 Maliyet Analizi

### Tamamen Ücretsiz Seçenek:
```
Backend: Render.com Free Plan = ₺0
Database: Supabase Free Plan = ₺0
Storage: Cloudinary Free Plan = ₺0
Frontend: Vercel Free Plan = ₺0
Domain: Freenom (.tk, .ml) = ₺0
---
TOPLAM: ₺0/ay
```

### Yarı-Ücretsiz Seçenek:
```
Backend: Render.com Free = ₺0
Database: Supabase Free = ₺0
Storage: Cloudinary Free = ₺0
Frontend: Paylaşımlı Hosting = ₺50-100/ay
Domain: .com domain = ₺150/yıl
---
TOPLAM: ₺50-100/ay
```

### Premium Seçenek:
```
Backend: Render.com Starter = $7/ay
Database: Supabase Pro = $25/ay
Frontend: Vercel Pro = $20/ay
Domain: .com = ₺150/yıl
---
TOPLAM: ~₺1500/ay
```

---

## 🎯 Önerilen Yapı

**Başlangıç için** (İlk 6 ay):
- ✅ Backend: Render.com Free
- ✅ Database: Supabase Free
- ✅ Frontend: Vercel Free veya mevcut hosting
- ✅ Storage: Cloudinary Free
- **Maliyet**: ₺0-100/ay

**Büyüdükçe** (Kullanıcı artınca):
- ✅ Backend: Render.com Starter ($7/ay)
- ✅ Database: Supabase Pro ($25/ay)
- ✅ Frontend: Vercel Pro ($20/ay)
- **Maliyet**: ~₺1500/ay

---

## 📞 Destek

### Render.com Dokümantasyon:
- https://render.com/docs

### Supabase Dokümantasyon:
- https://supabase.com/docs

### Sorun mu var?
1. Render Logs kontrol edin
2. Browser Console kontrol edin
3. Network tab'ı kontrol edin
4. `SHARED_HOSTING_DEPLOYMENT.md` okuyun

---

## ✅ Deployment Checklist

### Hazırlık
- [ ] GitHub hesabı oluşturuldu
- [ ] Kod GitHub'a yüklendi
- [ ] Supabase hesabı oluşturuldu
- [ ] Database connection string alındı
- [ ] Cloudinary hesabı oluşturuldu
- [ ] Cloudinary credentials alındı

### Render Deployment
- [ ] Render hesabı oluşturuldu
- [ ] Web Service oluşturuldu
- [ ] Environment variables eklendi
- [ ] Deploy başarılı
- [ ] Health check çalışıyor

### Database
- [ ] Prisma migrate deploy çalıştırıldı
- [ ] Seed data eklendi
- [ ] Kategoriler yüklendi

### Frontend
- [ ] .env.production güncellendi
- [ ] Build alındı
- [ ] Hosting'e yüklendi
- [ ] .htaccess eklendi

### Test
- [ ] Backend health check başarılı
- [ ] Frontend açılıyor
- [ ] Kayıt olma çalışıyor
- [ ] Giriş yapma çalışıyor
- [ ] İlanlar listeleniyor
- [ ] API çağrıları başarılı

---

## 🎉 Tebrikler!

Siteniz artık canlıda ve tamamen ücretsiz!

**Backend**: https://takason-api.onrender.com  
**Frontend**: https://yourdomain.com

**Sonraki adımlar**:
1. ✅ Custom domain ekle
2. ✅ Google Analytics kur
3. ✅ SEO optimizasyonu
4. ✅ Performance monitoring
5. ✅ Backup stratejisi

**Başarılar! 🚀**
