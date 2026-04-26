// ============================================================
// TAKASON - Kimlik Doğrulama Servisi (Prisma)
// ============================================================

const bcrypt = require('bcryptjs');
const { prisma } = require('../config/database');
const { generateTokenPair, verifyRefreshToken } = require('../utils/jwt');
const { AppError } = require('../middlewares/errorHandler');

const SALT_ROUNDS = 12;

// Kayıt Ol
const register = async ({ email, password, firstName, lastName, phone, city }) => {
  const existing = await prisma.user.findUnique({ where: { email }, select: { id: true } });
  if (existing) {
    throw new AppError('Bu e-posta adresi zaten kayıtlı.', 409);
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      role: 'USER',
      status: 'ACTIVE',
      profile: {
        create: { firstName, lastName, phone, city },
      },
    },
    select: {
      id: true,
      email: true,
      role: true,
      createdAt: true,
      profile: { select: { firstName: true, lastName: true, phone: true, city: true } },
    },
  });

  const tokens = generateTokenPair(user.id, user.role);
  return { user, tokens };
};

// Giriş Yap
const login = async ({ email, password }) => {
  const user = await prisma.user.findUnique({
    where: { email },
    include: { profile: { select: { firstName: true, lastName: true, avatarUrl: true } } },
  });

  if (!user) {
    await bcrypt.compare(password, '$2b$12$invalidhashtopreventtimingattack');
    throw new AppError('E-posta adresi veya şifre hatalı.', 401);
  }

  if (user.status === 'BANNED') {
    throw new AppError('Hesabınız yasaklanmış. Destek ekibiyle iletişime geçin.', 403);
  }
  if (user.status === 'SUSPENDED') {
    throw new AppError('Hesabınız geçici olarak askıya alınmış.', 403);
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) {
    throw new AppError('E-posta adresi veya şifre hatalı.', 401);
  }

  const safeUser = {
    id: user.id,
    email: user.email,
    role: user.role,
    status: user.status,
    profile: user.profile || null,
  };

  const tokens = generateTokenPair(user.id, user.role);
  return { user: safeUser, tokens };
};

// Token Yenile
const refreshTokens = async (refreshToken) => {
  let decoded;
  try {
    decoded = verifyRefreshToken(refreshToken);
  } catch (err) {
    throw new AppError('Geçersiz veya süresi dolmuş refresh token.', 401);
  }

  const user = await prisma.user.findUnique({
    where: { id: decoded.userId },
    select: { id: true, role: true, status: true },
  });

  if (!user || user.status !== 'ACTIVE') {
    throw new AppError('Kullanıcı bulunamadı veya hesap aktif değil.', 401);
  }

  return generateTokenPair(user.id, user.role);
};

// Mevcut Kullanıcı
const getMe = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      profile: {
        select: {
          firstName: true,
          lastName: true,
          phone: true,
          city: true,
          avatarUrl: true,
          rating: true,
          bio: true,
        },
      },
    },
  });

  if (!user) {
    throw new AppError('Kullanıcı bulunamadı.', 404);
  }

  return {
    id: user.id,
    email: user.email,
    role: user.role,
    status: user.status,
    createdAt: user.createdAt,
    profile: user.profile,
  };
};

module.exports = { register, login, refreshTokens, getMe };
