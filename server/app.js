// ============================================================
// TAKASON - Ana Uygulama Yapılandırması (app.js)
// Express kurulumu, middleware'ler ve rota bağlamaları
// ============================================================

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const compression = require('compression');
const path = require('path');

const corsOptions = require('./config/cors');
const apiRoutes = require('./routes');
const { errorHandler, notFoundHandler } = require('./middlewares/errorHandler');

const app = express();

// ============================================================
// 1. GÜVENLİK MİDDLEWARE'LERİ
// ============================================================

// Helmet: HTTP güvenlik başlıkları (XSS, Clickjacking vb.)
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }, // Medya dosyalarının frontend'den erişimine izin ver
}));

// CORS: İzin verilen origin'ler
app.use(cors(corsOptions));

// Rate Limiting: Brute force ve DDoS koruması
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 dakika
  max: parseInt(process.env.RATE_LIMIT_MAX) || 100,                         // Max istek sayısı
  standardHeaders: true,      // RateLimit-* başlıklarını ekle
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Çok fazla istek gönderdiniz. Lütfen 15 dakika sonra tekrar deneyin.',
    errors: [],
  },
  skip: (req) => req.ip === '127.0.0.1' || req.ip === '::1', // Localhost'u atla
});

// Auth rotalarına daha sıkı limit uygula (Kaba kuvvet saldırısı önlemi)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 dakika
  max: 20,                    // 15 dakikada max 20 giriş denemesi
  message: {
    success: false,
    message: 'Çok fazla giriş denemesi. Lütfen 15 dakika sonra tekrar deneyin.',
    errors: [],
  },
});

app.use('/api', limiter);
app.use('/api/auth', authLimiter);

// ============================================================
// 2. PARSER MİDDLEWARE'LERİ
// ============================================================

// JSON gövde parse (10mb limit - büyük veri sızıntısını önler)
app.use(express.json({ limit: '10mb' }));

// URL encoded form parse
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Yanıt sıkıştırma (üretimde bandwidth tasarrufu)
app.use(compression());

// ============================================================
// 3. LOGLAMA
// ============================================================

if (process.env.NODE_ENV === 'development') {
  // Geliştirme: Renkli detaylı log
  app.use(morgan('dev'));
} else {
  // Üretim: JSON formatında log (PM2/log manager için)
  app.use(morgan('combined'));
}

// ============================================================
// 4. STATİK DOSYA SUNUMU
// Medya dosyaları (uploads klasörü)
// ============================================================

app.use('/uploads', express.static(path.join(__dirname, process.env.UPLOAD_DIR || 'uploads'), {
  maxAge: '7d', // 7 gün cache
}));

// ============================================================
// 5. API ROTALARI
// ============================================================

app.use('/api', apiRoutes);

// ============================================================
// 6. HATA YÖNETİMİ (en sona eklenmelidir)
// ============================================================

// 404 - Tanımsız rotalar
app.use(notFoundHandler);

// Global hata yakalayıcı
app.use(errorHandler);

module.exports = app;
