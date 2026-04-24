# 🚀 Hızlı Başlangıç - Canlıya Alma

## 📋 Özet: 3 Adımda Production

### 1️⃣ Hazırlık (Yerel)
```bash
# Kontrol scriptini çalıştır
node pre-deploy-check.js

# Tüm testler geçerse devam et
```

### 2️⃣ Sunucuda Kurulum
```bash
# Sunucuya bağlan
ssh root@your-server-ip

# Deployment script'i çalıştır
bash deploy.sh
```

### 3️⃣ Nginx + SSL
```bash
# Nginx config
sudo nano /etc/nginx/sites-available/takason

# SSL kurulumu
sudo certbot --nginx -d takason.com
```

---

## ✅ Deployment Öncesi Checklist

### Gerekli Bilgiler
- [ ] Domain adı (örn: takason.com)
- [ ] Sunucu IP adresi
- [ ] Supabase connection string VEYA PostgreSQL kurulu
- [ ] Cloudinary hesabı (resim yükleme için)

### Environment Variables Hazır mı?

#### Backend (.env.production)
```bash
# Kontrol et
cat server/.env.production

# Şunlar MUTLAKA değiştirilmiş olmalı:
# - DATABASE_URL (gerçek Supabase/PostgreSQL)
# - JWT_SECRET (güçlü, rastgele)
# - JWT_REFRESH_SECRET (güçlü, rastgele)
# - ALLOWED_ORIGINS (gerçek domain)
# - CLOUDINARY_* (gerçek credentials)
```

#### Frontend (.env.production)
```bash
# Kontrol et
cat react-app/.env.production

# Şunlar MUTLAKA değiştirilmiş olmalı:
# - VITE_API_URL (gerçek API domain)
```

---

## 🔧 Sunucu Kurulumu (İlk Kez)

### Sistem Gereksinimleri
```bash
# Ubuntu 22.04 LTS (önerilen)
# RAM: 2GB minimum, 4GB önerilen
# CPU: 2 Core
# Disk: 20GB SSD
```

### Temel Kurulum
```bash
# Sistem güncelleme
sudo apt update && sudo apt upgrade -y

# Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# PM2
sudo npm install -g pm2

# Nginx
sudo apt install -y nginx

# PostgreSQL (Supabase kullanmıyorsanız)
sudo apt install -y postgresql postgresql-contrib
```

---

## 📦 Deployment Adımları

### Adım 1: Kodu Sunucuya Yükle
```bash
# Sunucuda
mkdir -p /var/www/takason
cd /var/www/takason

# Git ile (önerilen)
git clone https://github.com/your-username/takason.git .

# VEYA SFTP ile dosyaları yükle
```

### Adım 2: Environment Dosyalarını Ayarla
```bash
# Backend
cd /var/www/takason/server
cp .env.production .env
nano .env  # Gerçek değerleri gir

# Frontend
cd /var/www/takason/react-app
cp .env.production .env
nano .env  # Gerçek API URL'i gir
```

### Adım 3: Deployment Script'i Çalıştır
```bash
cd /var/www/takason
bash deploy.sh
```

Bu script otomatik olarak:
- ✅ Dependencies yükler
- ✅ Prisma schema'yı PostgreSQL'e çevirir
- ✅ Database migration yapar
- ✅ Frontend build alır
- ✅ PM2 ile backend'i başlatır

### Adım 4: Nginx Yapılandırması
```bash
# Config dosyası oluştur
sudo nano /etc/nginx/sites-available/takason
```

Aşağıdaki içeriği yapıştır:
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

    gzip on;
    gzip_types text/plain text/css application/json application/javascript;
}
```

Aktifleştir:
```bash
sudo ln -s /etc/nginx/sites-available/takason /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Adım 5: SSL Sertifikası
```bash
# Certbot kur
sudo apt install -y certbot python3-certbot-nginx

# SSL sertifikası al
sudo certbot --nginx -d takason.com -d www.takason.com -d api.takason.com

# Otomatik yenileme test et
sudo certbot renew --dry-run
```

---

## 🎯 Son Kontroller

### Backend Çalışıyor mu?
```bash
# PM2 status
pm2 status

# Logs
pm2 logs takason-api

# Health check
curl https://api.takason.com/api/health
```

### Frontend Açılıyor mu?
```bash
# Browser'da aç
https://takason.com

# Veya curl ile test
curl -I https://takason.com
```

### Database Bağlantısı?
```bash
cd /var/www/takason/server
npx prisma studio
# Browser'da açılacak: http://localhost:5555
```

---

## 🔄 Güncelleme (Yeni Kod Deploy)

```bash
# Sunucuda
cd /var/www/takason

# Yeni kodu çek
git pull origin main

# Backend güncelle
cd server
npm install --production
npx prisma migrate deploy
pm2 restart takason-api

# Frontend güncelle
cd ../react-app
npm install
npm run build

# Nginx reload (gerekirse)
sudo systemctl reload nginx
```

---

## 🐛 Sorun Giderme

### Backend çalışmıyor
```bash
# Logs kontrol et
pm2 logs takason-api --lines 100

# Restart
pm2 restart takason-api

# Manuel başlat (debug için)
cd /var/www/takason/server
node server.js
```

### Frontend 404 veriyor
```bash
# Nginx config test
sudo nginx -t

# Nginx restart
sudo systemctl restart nginx

# Build kontrol
ls -la /var/www/takason/react-app/dist
```

### Database bağlanamıyor
```bash
# Connection string kontrol
cat /var/www/takason/server/.env | grep DATABASE_URL

# PostgreSQL çalışıyor mu?
sudo systemctl status postgresql

# Prisma test
cd /var/www/takason/server
npx prisma db pull
```

### SSL çalışmıyor
```bash
# Certbot logs
sudo certbot certificates

# Yeniden dene
sudo certbot --nginx -d takason.com --force-renewal
```

---

## 📊 Monitoring

### PM2 Monitoring
```bash
# Real-time monitoring
pm2 monit

# Detaylı bilgi
pm2 show takason-api

# Logs
pm2 logs takason-api --lines 50
```

### Nginx Logs
```bash
# Access logs
sudo tail -f /var/log/nginx/access.log

# Error logs
sudo tail -f /var/log/nginx/error.log
```

### Database Backup
```bash
# Manuel backup
pg_dump -U takason_user takason_prod > backup_$(date +%Y%m%d).sql

# Otomatik backup (crontab)
crontab -e
# Ekle: 0 2 * * * pg_dump -U takason_user takason_prod > /backups/db_$(date +\%Y\%m\%d).sql
```

---

## 🎉 Tebrikler!

Siteniz artık canlıda! 

**🌐 URL**: https://takason.com
**🔌 API**: https://api.takason.com/api

### Sonraki Adımlar
1. Google Analytics ekle
2. Sentry (error tracking) kur
3. Backup stratejisi oluştur
4. Monitoring/alerting ayarla
5. CDN ekle (Cloudflare)

### Destek
- 📖 Detaylı kılavuz: `PRODUCTION_DEPLOYMENT.md`
- 🔍 Pre-deploy check: `node pre-deploy-check.js`
- 🚀 Auto deploy: `bash deploy.sh`
