// ============================================================
// TAKASON - Global Hata Yakalayıcı (Error Handler)
// Tüm asenkron ve senkron hatalar bu middleware üzerinden geçer
// Frontend'e standart JSON formatında yanıt döner
// ============================================================

const { ZodError } = require('zod');
const { Prisma } = require('@prisma/client');

// ============================================================
// Özel Uygulama Hatası Sınıfı
// throw new AppError('Mesaj', 404) şeklinde kullanılır
// ============================================================
class AppError extends Error {
  constructor(message, statusCode = 500, errors = []) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.isOperational = true; // Beklenen (operational) hata mı?
    Error.captureStackTrace(this, this.constructor);
  }
}

// ============================================================
// Zod Validasyon Hatalarını Düzenle
// ============================================================
const formatZodErrors = (error) => {
  return error.errors.map((err) => ({
    field: err.path.join('.'),
    message: err.message,
    code: err.code,
  }));
};

// ============================================================
// Prisma Veritabanı Hatalarını Düzenle
// Prisma hata kodları: https://www.prisma.io/docs/reference/api-reference/error-reference
// ============================================================
const handlePrismaError = (error) => {
  switch (error.code) {
    case 'P2002': {
      // Unique constraint ihlali (örn: email zaten kayıtlı)
      const field = error.meta?.target?.[0] || 'alan';
      return new AppError(`Bu ${field} zaten kullanımda.`, 409);
    }
    case 'P2025': {
      // Kayıt bulunamadı
      return new AppError('İstenen kayıt bulunamadı.', 404);
    }
    case 'P2003': {
      // Foreign key constraint ihlali
      return new AppError('İlgili kayıt bulunamadı (ilişki hatası).', 400);
    }
    case 'P2014': {
      // İlişki ihlali
      return new AppError('Bu işlem mevcut ilişkileri ihlal ediyor.', 400);
    }
    default: {
      // Bilinmeyen veritabanı hatası
      console.error('🔴 Bilinmeyen Prisma Hatası:', error);
      return new AppError('Veritabanı işlemi sırasında bir hata oluştu.', 500);
    }
  }
};

// ============================================================
// Global Error Handler Middleware
// Express'e 4 parametreli fonksiyon olarak tanıtılmalı (err, req, res, next)
// ============================================================
const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Sunucu hatası oluştu.';
  let errors = err.errors || [];

  // ---- Zod Validasyon Hatası ----
  if (err instanceof ZodError) {
    statusCode = 422;
    message = 'Girilen veriler geçersiz.';
    errors = formatZodErrors(err);
  }

  // ---- Prisma Veritabanı Hataları ----
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    const prismaError = handlePrismaError(err);
    statusCode = prismaError.statusCode;
    message = prismaError.message;
  }

  if (err instanceof Prisma.PrismaClientValidationError) {
    statusCode = 400;
    message = 'Veritabanına gönderilen veri formatı hatalı.';
  }

  // ---- JWT Hataları ----
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Geçersiz token. Lütfen tekrar giriş yapın.';
  }

  if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Oturum süreniz doldu. Lütfen tekrar giriş yapın.';
  }

  // ---- Multer Hataları ----
  if (err.code === 'LIMIT_FILE_SIZE') {
    statusCode = 413;
    message = `Dosya boyutu çok büyük. Maksimum ${(parseInt(process.env.MAX_FILE_SIZE) / 1024 / 1024) || 10}MB yükleyebilirsiniz.`;
  }

  if (err.code === 'LIMIT_FILE_COUNT') {
    statusCode = 400;
    message = 'Çok fazla dosya yüklemeye çalışıyorsunuz.';
  }

  // ---- CORS Hatası ----
  if (err.message && err.message.includes('CORS')) {
    statusCode = 403;
    message = 'Bu domain\'den erişim izni bulunmuyor.';
  }

  // Üretim ortamında iç hata detaylarını gizle
  if (process.env.NODE_ENV === 'production' && statusCode === 500 && !err.isOperational) {
    message = 'Sunucuda beklenmedik bir hata oluştu. Lütfen daha sonra tekrar deneyin.';
    errors = [];
  }

  // Geliştirme ortamında stack trace'i logla
  if (process.env.NODE_ENV !== 'production') {
    console.error(`❌ [${new Date().toISOString()}] ${err.stack || err}`);
  }

  // Frontend'e standart JSON yanıt
  return res.status(statusCode).json({
    success: false,
    message,
    errors,
    // Geliştirme ortamında ek bilgi
    ...(process.env.NODE_ENV !== 'production' && {
      stack: err.stack,
    }),
  });
};

// ============================================================
// 404 Handler - Tanımsız rotalar için
// ============================================================
const notFoundHandler = (req, res, next) => {
  next(new AppError(`${req.method} ${req.originalUrl} - Bu endpoint bulunamadı.`, 404));
};

// ============================================================
// asyncHandler - try-catch yazmaktan kurtarır
// Kullanım: router.get('/path', asyncHandler(async (req, res) => { ... }))
// ============================================================
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = {
  AppError,
  errorHandler,
  notFoundHandler,
  asyncHandler,
};
