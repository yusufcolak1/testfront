// ============================================================
// TAKASON - Sunucu Giriş Noktası (server.js)
// HTTP + Socket.io sunucusunu başlatır
// Üretim ortamı: PM2 Cluster Mode için hazır
// ============================================================

require('dotenv').config();

const http = require('http');
const { Server } = require('socket.io');

const app = require('./app');
const prisma = require('./config/database');
const { initializeSocket } = require('./services/socketService');
const corsOptions = require('./config/cors');

const PORT = process.env.PORT || 5000;

// ============================================================
// HTTP Sunucusu (Express + Socket.io paylaşımlı)
// ============================================================
const httpServer = http.createServer(app);

// Socket.io başlat
const io = new Server(httpServer, {
  cors: {
    origin: corsOptions.origin,
    credentials: corsOptions.credentials,
    methods: corsOptions.methods,
  },
  // PM2 Cluster Mode ile birden fazla process kullanırken
  // adapter: require('socket.io-redis') - ileride Redis adapter eklenecek
});

// Socket eventlerini başlat
initializeSocket(io);

// io nesnesini app'e ekle (controller'lardan erişim için)
app.set('io', io);

// ============================================================
// Veritabanı Bağlantısı + Sunucu Başlatma
// ============================================================
const startServer = async () => {
  try {
    // PostgreSQL bağlantısı database.js'de otomatik yapılıyor
    console.log('✅ PostgreSQL veritabanına bağlanıldı.');

    // Sunucuyu dinlemeye başla
    httpServer.listen(PORT, () => {
      console.log('');
      console.log('🚀 ======================================');
      console.log(`🚀  TAKASON API v1.0.0`);
      console.log(`🚀  Ortam : ${process.env.NODE_ENV || 'development'}`);
      console.log(`🚀  Port  : ${PORT}`);
      console.log(`🚀  URL   : http://localhost:${PORT}/api`);
      console.log(`🚀  Durum : http://localhost:${PORT}/api/health`);
      console.log('🚀 ======================================');
      console.log('');
    });
  } catch (err) {
    console.error('❌ Sunucu başlatılamadı:', err.message);
    process.exit(1);
  }
};

startServer();

// ============================================================
// Graceful Shutdown - Beklenmedik kapanmalarda temiz çıkış
// PM2 bu sinyalleri yönetir (pm2 stop / reload)
// ============================================================
const gracefulShutdown = async (signal) => {
  console.log(`\n📴 ${signal} sinyali alındı. Sunucu kapatılıyor...`);

  httpServer.close(async () => {
    await prisma.$disconnect();
    console.log('✅ Veritabanı bağlantısı kapatıldı.');
    console.log('✅ Sunucu temiz şekilde kapatıldı.');
    process.exit(0);
  });

  // 10 saniye içinde kapanmazsa zorla kapat
  setTimeout(() => {
    console.error('⚠️  Zorla kapatılıyor...');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Yakalanmamış Promise hatalarını logla (çökmeyi engelle)
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Yakalanmamış Promise Reddi:', reason);
  // Üretimde: Sentry/Datadog gibi hata izleme servisine gönder
});

process.on('uncaughtException', (err) => {
  console.error('❌ Yakalanmamış İstisna:', err.message);
  // Kritik hata - güvenli kapatma
  gracefulShutdown('UNCAUGHT_EXCEPTION');
});
