// ============================================================
// TAKASON - Kimlik Doğrulama Servisi
// İş mantığı burada, controller sadece HTTP katmanı
// ============================================================

const bcrypt = require('bcryptjs');
const prisma = require('../config/database');
const { generateTokenPair, verifyRefreshToken } = require('../utils/jwt');
const { AppError } = require('../middlewares/errorHandler');

const SALT_ROUNDS = 12; // Bcrypt güvenlik seviyesi (üretim için 12 ideal)

// ============================================================
// Kayıt Ol
// ============================================================
const register = async ({ email, password, firstName, lastName }) => {
  // E-posta zaten kayıtlı mı?
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new AppError('Bu e-posta adresi zaten kayıtlı.', 409);
  }

  // Şifreyi hash'le
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  // Kullanıcı ve profili transaction içinde oluştur (atomik işlem)
  const user = await prisma.$transaction(async (tx) => {
    const newUser = await tx.user.create({
      data: {
        email,
        passwordHash,
        // Profil aynı anda oluşturuluyor (nested write)
        profile: {
          create: {
            firstName,
            lastName,
          },
        },
      },
      // Dönen veride şifreyi gizle
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
        profile: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    return newUser;
  });

  // Token çifti üret
  const tokens = generateTokenPair(user.id, user.role);

  return { user, tokens };
};

// ============================================================
// Giriş Yap
// ============================================================
const login = async ({ email, password }) => {
  // Kullanıcıyı bul (şifre hash'i de getir - normalde select'te gelmez)
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      passwordHash: true,
      role: true,
      status: true,
      profile: {
        select: { firstName: true, lastName: true, avatarUrl: true },
      },
    },
  });

  // Kullanıcı yok veya şifre yanlış - Timing attack'ı önlemek için her ikisi de bcrypt ile karşılaştırılır
  if (!user) {
    // Hash karşılaştırması yap (timing attack önlemi)
    await bcrypt.compare(password, '$2b$12$invalidhashtopreventtimingattack');
    throw new AppError('E-posta adresi veya şifre hatalı.', 401);
  }

  // Hesap askıya alınmış mı?
  if (user.status === 'BANNED') {
    throw new AppError('Hesabınız yasaklanmış. Destek ekibiyle iletişime geçin.', 403);
  }
  if (user.status === 'SUSPENDED') {
    throw new AppError('Hesabınız geçici olarak askıya alınmış.', 403);
  }

  // Şifre kontrolü
  const isValidPassword = await bcrypt.compare(password, user.passwordHash);
  if (!isValidPassword) {
    throw new AppError('E-posta adresi veya şifre hatalı.', 401);
  }

  // Hassas veriyi çıkar
  const { passwordHash, ...safeUser } = user;

  // Token çifti üret
  const tokens = generateTokenPair(user.id, user.role);

  return { user: safeUser, tokens };
};

// ============================================================
// Token Yenile
// ============================================================
const refreshTokens = async (refreshToken) => {
  let decoded;
  try {
    decoded = verifyRefreshToken(refreshToken);
  } catch (err) {
    throw new AppError('Geçersiz veya süresi dolmuş refresh token.', 401);
  }

  // Kullanıcı hâlâ aktif mi?
  const user = await prisma.user.findUnique({
    where: { id: decoded.userId },
    select: { id: true, role: true, status: true },
  });

  if (!user || user.status !== 'ACTIVE') {
    throw new AppError('Kullanıcı bulunamadı veya hesap aktif değil.', 401);
  }

  const tokens = generateTokenPair(user.id, user.role);
  return tokens;
};

// ============================================================
// Mevcut Kullanıcı Bilgisi
// ============================================================
const getMe = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
      profile: {
        select: {
          firstName: true,
          lastName: true,
          phone: true,
          city: true,
          district: true,
          avatarUrl: true,
          trustScore: true,
          bio: true,
          premiumUntil: true,
        },
      },
    },
  });

  if (!user) {
    throw new AppError('Kullanıcı bulunamadı.', 404);
  }

  return user;
};

module.exports = { register, login, refreshTokens, getMe };
