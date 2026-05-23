// ============================================================
// TAKASON - JWT Kimlik Doğrulama Middleware
// Korumalı rotalara erişimi kontrol eder
// ============================================================

const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');
const { prisma } = require('../config/database');
const { AppError, asyncHandler } = require('./errorHandler');

// ============================================================
// Kullanıcı önbelleği — Her istekte DB'ye gitmemek için (TTL: 60sn)
// Supabase'e olan network round-trip maliyetini büyük ölçüde azaltır
// ============================================================
const userCache = new Map();
const USER_CACHE_TTL = 60 * 1000; // 60 saniye

function getCachedUser(userId) {
  const cached = userCache.get(userId);
  if (!cached) return null;
  if (Date.now() - cached.ts > USER_CACHE_TTL) { userCache.delete(userId); return null; }
  return cached.user;
}
function setCachedUser(userId, user) {
  if (userCache.size > 1000) userCache.clear(); // Bellek sınırı
  userCache.set(userId, { user, ts: Date.now() });
}
function invalidateUserCache(userId) { userCache.delete(userId); }

// ============================================================
// authenticate - Token doğrulama (zorunlu)
// Kullanım: router.get('/protected', authenticate, controller)
// ============================================================
const authenticate = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AppError('Bu işlem için giriş yapmanız gerekiyor.', 401);
  }

  const token = authHeader.split(' ')[1];

  let decoded;
  try {
    decoded = jwt.verify(token, jwtConfig.accessToken.secret);
  } catch (err) {
    throw err;
  }

  // Önce önbellekten bak — Supabase'e gitmeden yanıt ver
  let user = getCachedUser(decoded.userId);

  if (!user) {
    // Cache miss: DB'den çek ve önbelleğe al
    user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, email: true, role: true, status: true },
    });

    if (!user) throw new AppError('Bu token\'a ait kullanıcı bulunamadı.', 401);
    setCachedUser(decoded.userId, user);
  }

  if (user.status === 'BANNED' || user.status === 'SUSPENDED') {
    invalidateUserCache(decoded.userId);
    throw new AppError('Hesabınız askıya alınmış. Destek ekibiyle iletişime geçin.', 403);
  }

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

    // Önce önbellekten bak
    let user = getCachedUser(decoded.userId);
    if (!user) {
      user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: { id: true, email: true, role: true, status: true },
      });
      if (user && user.status === 'ACTIVE') setCachedUser(decoded.userId, user);
    }

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

module.exports = { authenticate, optionalAuthenticate, authorize, invalidateUserCache };
