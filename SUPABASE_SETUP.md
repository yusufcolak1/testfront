# 🚀 Supabase Setup - Takason

## ✅ Supabase Bilgileri

**Project URL**: https://bystbbkjlndvbvphynol.supabase.co  
**Project Ref**: bystbbkjlndvbvphynol  
**Publishable Key**: sb_publishable_13LPdpt8yBmwccf_HmHFQw_bOH2QcaT

---

## 📋 Database Connection Strings

### Production (Pooler - Önerilen)
```env
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.bystbbkjlndvbvphynol.supabase.co:6543/postgres?pgbouncer=true&connection_limit=1"
```

### Direct Connection
```env
DIRECT_URL="postgresql://postgres:[YOUR-PASSWORD]@db.bystbbkjlndvbvphynol.supabase.co:5432/postgres"
```

**⚠️ ÖNEMLİ**: `[YOUR-PASSWORD]` yerine Supabase database şifrenizi yazın!

---

## 🔧 Kurulum Adımları

### 1. Supabase CLI Kurulumu (Opsiyonel)

```bash
# Windows (PowerShell)
scoop install supabase

# VEYA npm ile
npm install -g supabase

# Login
supabase login

# Project'e bağlan
supabase init
supabase link --project-ref bystbbkjlndvbvphynol
```

### 2. Database Şifresini Alın

1. **Supabase Dashboard** → https://bystbbkjlndvbvphynol.supabase.co
2. **Settings** → **Database**
3. **Database Password** bölümünde şifrenizi görün veya reset edin

### 3. Environment Variables Güncelleyin

**Local Development** (`server/.env`):
```env
DATABASE_URL="postgresql://postgres:ŞİFRENİZ@db.bystbbkjlndvbvphynol.supabase.co:6543/postgres?pgbouncer=true&connection_limit=1"
DIRECT_URL="postgresql://postgres:ŞİFRENİZ@db.bystbbkjlndvbvphynol.supabase.co:5432/postgres"
```

**Production** (`server/.env.production`):
```env
DATABASE_URL="postgresql://postgres:ŞİFRENİZ@db.bystbbkjlndvbvphynol.supabase.co:6543/postgres?pgbouncer=true&connection_limit=1"
DIRECT_URL="postgresql://postgres:ŞİFRENİZ@db.bystbbkjlndvbvphynol.supabase.co:5432/postgres"
SUPABASE_URL="https://bystbbkjlndvbvphynol.supabase.co"
SUPABASE_ANON_KEY="sb_publishable_13LPdpt8yBmwccf_HmHFQw_bOH2QcaT"
```

---

## 🗄️ Database Migration

### 1. Prisma Schema Güncelleme

```bash
cd server

# Production schema'yı kullan (PostgreSQL)
cp prisma/schema.production.prisma prisma/schema.prisma

# Prisma generate
npx prisma generate
```

### 2. Migration Çalıştırma

```bash
# Migration dosyaları oluştur
npx prisma migrate dev --name init

# VEYA production'da
npx prisma migrate deploy
```

### 3. Seed Data Ekleme

```bash
# Kategorileri ekle
npx prisma db seed
```

---

## 🔍 Supabase Dashboard'da Kontrol

### 1. Table Editor
https://bystbbkjlndvbvphynol.supabase.co/project/bystbbkjlndvbvphynol/editor

**Tablolar**:
- users
- user_profiles
- categories
- items
- item_images
- trades
- trade_items
- chat_rooms
- messages
- favorites
- settings (admin panel için)

### 2. SQL Editor
https://bystbbkjlndvbvphynol.supabase.co/project/bystbbkjlndvbvphynol/sql

**Test Query**:
```sql
SELECT * FROM categories LIMIT 10;
```

### 3. Database Backups
https://bystbbkjlndvbvphynol.supabase.co/project/bystbbkjlndvbvphynol/database/backups

**Otomatik backup**: Her gün 00:00 UTC

---

## 🚀 Local'de Test

### 1. Backend Başlatma

```bash
cd server

# Dependencies
npm install

# Prisma generate
npx prisma generate

# Migration
npx prisma migrate deploy

# Seed
npx prisma db seed

# Server başlat
npm run dev
```

### 2. Database Bağlantısı Test

```bash
# Prisma Studio (Database GUI)
npx prisma studio

# Browser'da açılır: http://localhost:5555
```

### 3. API Test

```bash
# Health check
curl http://localhost:5000/api/health

# Categories
curl http://localhost:5000/api/categories
```

---

## 🌐 Production Deployment

### Render.com ile (Önerilen)

1. **Render Dashboard** → New Web Service
2. **GitHub repo**: yusufcolak1/testfront
3. **Environment Variables**:
   ```
   NODE_ENV=production
   PORT=10000
   DATABASE_URL=postgresql://postgres:ŞİFRE@db.bystbbkjlndvbvphynol.supabase.co:6543/postgres?pgbouncer=true&connection_limit=1
   DIRECT_URL=postgresql://postgres:ŞİFRE@db.bystbbkjlndvbvphynol.supabase.co:5432/postgres
   JWT_SECRET=[GÜÇLÜ ŞİFRE]
   JWT_REFRESH_SECRET=[BAŞKA GÜÇLÜ ŞİFRE]
   ALLOWED_ORIGINS=https://takason.com.tr,https://www.takason.com.tr
   CLOUDINARY_CLOUD_NAME=dhkgsk5wv
   CLOUDINARY_API_KEY=737549276127958
   CLOUDINARY_API_SECRET=a0-f_UG8_eerMM0s7HIt3C4uZJQ
   ```

4. **Deploy**

### Hostinger ile

`HOSTINGER_DEPLOYMENT.md` dosyasına bakın - Supabase connection string'i kullanın.

---

## 📊 Supabase Features

### 1. Row Level Security (RLS)

Supabase Dashboard → Authentication → Policies

**Örnek Policy** (users tablosu):
```sql
-- Kullanıcılar sadece kendi profillerini görebilir
CREATE POLICY "Users can view own profile"
ON user_profiles
FOR SELECT
USING (auth.uid() = user_id);
```

### 2. Realtime Subscriptions

```javascript
// Frontend'de (opsiyonel)
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://bystbbkjlndvbvphynol.supabase.co',
  'sb_publishable_13LPdpt8yBmwccf_HmHFQw_bOH2QcaT'
)

// Yeni mesajları dinle
supabase
  .channel('messages')
  .on('postgres_changes', 
    { event: 'INSERT', schema: 'public', table: 'messages' },
    (payload) => console.log('Yeni mesaj:', payload)
  )
  .subscribe()
```

### 3. Storage (Resim Yükleme)

Cloudinary yerine Supabase Storage da kullanılabilir:

```javascript
// Bucket oluştur
// Dashboard → Storage → New bucket → "item-images"

// Upload
const { data, error } = await supabase.storage
  .from('item-images')
  .upload('public/avatar1.png', file)
```

---

## 🔒 Güvenlik

### 1. Database Şifresi

- ✅ Güçlü şifre kullanın (min 16 karakter)
- ✅ `.env` dosyasını Git'e eklemeyin
- ✅ Production'da environment variables kullanın

### 2. API Keys

- ✅ `SUPABASE_ANON_KEY` frontend'de kullanılabilir (public)
- ❌ `SUPABASE_SERVICE_ROLE_KEY` asla frontend'e eklemeyin!

### 3. RLS Policies

Hassas tablolar için Row Level Security aktif edin.

---

## 📈 Monitoring

### 1. Supabase Dashboard

**Metrics**: https://bystbbkjlndvbvphynol.supabase.co/project/bystbbkjlndvbvphynol/reports

- Database size
- Active connections
- Query performance
- API requests

### 2. Logs

**Logs**: https://bystbbkjlndvbvphynol.supabase.co/project/bystbbkjlndvbvphynol/logs

- Database logs
- API logs
- Realtime logs

---

## 🆓 Free Plan Limitleri

**Supabase Free Plan**:
- ✅ 500 MB database
- ✅ 1 GB file storage
- ✅ 2 GB bandwidth
- ✅ 50,000 monthly active users
- ✅ Unlimited API requests
- ✅ 7 days log retention

**Yeterli mi?**
- ✅ İlk 6-12 ay için yeterli
- ✅ 10,000+ kullanıcı destekler
- ✅ Upgrade gerektiğinde $25/ay

---

## 🐛 Sorun Giderme

### "Connection refused"

```bash
# Connection string doğru mu?
echo $DATABASE_URL

# Şifre doğru mu?
# Supabase Dashboard → Settings → Database → Reset password
```

### "Too many connections"

```bash
# Pooler kullanın (port 6543)
DATABASE_URL="...@db.bystbbkjlndvbvphynol.supabase.co:6543/..."
```

### Migration hatası

```bash
# Schema kontrol
cat prisma/schema.prisma | grep provider
# provider = "postgresql" olmalı

# Reset (DİKKAT: Tüm data silinir!)
npx prisma migrate reset
```

---

## ✅ Checklist

### Setup
- [ ] Supabase şifresi alındı
- [ ] `.env` dosyası güncellendi
- [ ] Prisma schema PostgreSQL'e çevrildi
- [ ] Migration çalıştırıldı
- [ ] Seed data eklendi

### Test
- [ ] Local'de backend çalışıyor
- [ ] Prisma Studio'da tablolar görünüyor
- [ ] API health check başarılı
- [ ] Kategoriler listeleniyor

### Production
- [ ] Environment variables ayarlandı
- [ ] Deployment yapıldı
- [ ] Database migration çalıştırıldı
- [ ] Monitoring aktif

---

## 🎉 Hazır!

Supabase kurulumu tamamlandı! 

**Dashboard**: https://bystbbkjlndvbvphynol.supabase.co  
**Database**: PostgreSQL 15  
**Region**: EU (Frankfurt)

**Sonraki adım**: GitHub'a push ve deployment! 🚀
