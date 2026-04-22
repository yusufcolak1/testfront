// ============================================================
// TAKASON - JWT Kimlik Doğrulama Middleware
// Korumalı rotalara erişimi kontrol eder
// ============================================================

const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');
const prisma = require('../config/database');
const { AppError, asyncHandler } = require('./errorHandler');

// ============================================================
// authenticate - Token doğrulama (zorunlu)
// Kullanım: router.get('/protected', authenticate, controller)
// ============================================================
const authenticate = asyncHandler(async (req, res, next) => {
  // Token'ı Authorization header'ından al: "Bearer <token>"
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AppError('Bu işlem için giriş yapmanız gerekiyor.', 401);
  }

  const token = authHeader.split(' ')[1];

  // Token'ı doğrula
  let decoded;
  try {
    decoded = jwt.verify(token, jwtConfig.accessToken.secret);
  } catch (err) {
    // JWT hataları errorHandler'da yakalanır (JsonWebTokenError, TokenExpiredError)
    throw err;
  }

  // Kullanıcı hâlâ aktif mi? (Banlı olabilir)
  const user = await prisma.user.findUnique({
    where: { id: decoded.userId },
    select: {
      id: true,
      email: true,
      role: true,
      status: true,
    },
  });

  if (!user) {
    throw new AppError('Bu token\'a ait kullanıcı bulunamadı.', 401);
  }

  if (user.status === 'BANNED' || user.status === 'SUSPENDED') {
    throw new AppError('Hesabınız askıya alınmış. Destek ekibiyle iletişime geçin.', 403);
  }

  // Kullanıcı bilgisini sonraki middleware'e ilet
  req.user = user;
  next();
});

// ============================================================
// optionalAuthenticate - Token varsa doğrula, yoksa devam et
// Kullanım: Hem giriş yapmış hem yapmamış kullanıcıların görebileceği sayfalar
// ============================================================
const optionalAuthenticate = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    req.user = null;
    return next();
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, jwtConfig.accessToken.secret);

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, email: true, role: true, status: true },
    });

    req.user = user && user.status === 'ACTIVE' ? user : null;
  } catch {
    req.user = null;
  }

  next();
});

// ============================================================
// authorize - Rol kontrolü (RBAC - Role Based Access Control)
// Kullanım: router.delete('/admin/user/:id', authenticate, authorize('ADMIN'), controller)
// ============================================================
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new AppError('Bu işlem için giriş yapmanız gerekiyor.', 401));
    }

    if (!roles.includes(req.user.role)) {
      return next(new AppError('Bu işlemi yapmak için yetkiniz bulunmuyor.', 403));
    }

    next();
  };
};

module.exports = { authenticate, optionalAuthenticate, authorize };
