// ============================================================
// TAKASON - Veritabanı Yapılandırması (Prisma Client)
// Singleton pattern: Her hot-reload'da yeni bağlantı açılmasını engeller
// ============================================================

const { PrismaClient } = require('@prisma/client');

// Geliştirme ortamında singleton pattern uygula
// Aksi hâlde nodemon her yeniden başlamada yeni client oluşturur
let prisma;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient({
    log: ['error', 'warn'],
  });
} else {
  // Global değişkende sakla - hot-reload'dan korunmak için
  if (!global.__prisma) {
    global.__prisma = new PrismaClient({
      log: ['query', 'info', 'warn', 'error'],
    });
  }
  prisma = global.__prisma;
}

module.exports = prisma;
