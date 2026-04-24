// ============================================================
// TAKASON - Kimlik Doğrulama Servisi
// İş mantığı burada, controller sadece HTTP katmanı
// ============================================================

const bcrypt = require('bcryptjs');
const { query, transaction } = require('../config/database');
const { generateTokenPair, verifyRefreshToken } = require('../utils/jwt');
const { AppError } = require('../middlewares/errorHandler');

const SALT_ROUNDS = 12; // Bcrypt güvenlik seviyesi (üretim için 12 ideal)

// ============================================================
// Kayıt Ol
// ============================================================
const register = async ({ email, password, firstName, lastName }) => {
  // E-posta zaten kayıtlı mı?
  const existingUserResult = await query('SELECT id FROM "User" WHERE email = $1', [email]);
  if (existingUserResult.rows.length > 0) {
    throw new AppError('Bu e-posta adresi zaten kayıtlı.', 409);
  }

  // Şifreyi hash'le
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  // Kullanıcı ve profili transaction içinde oluştur (atomik işlem)
  const user = await transaction(async (client) => {
    // Kullanıcı oluştur
    const userResult = await client.query(
      `INSERT INTO "User" (id, email, "passwordHash", role, status, "createdAt", "updatedAt")
       VALUES (gen_random_uuid(), $1, $2, 'USER', 'ACTIVE', NOW(), NOW())
       RETURNING id, email, role, "createdAt"`,
      [email, passwordHash]
    );
    
    const newUser = userResult.rows[0];

    // Profil oluştur
    const profileResult = await client.query(
      `INSERT INTO "Profile" (id, "userId", "firstName", "lastName", "createdAt", "updatedAt")
       VALUES (gen_random_uuid(), $1, $2, $3, NOW(), NOW())
       RETURNING "firstName", "lastName"`,
      [newUser.id, firstName, lastName]
    );

    newUser.profile = profileResult.rows[0];
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
  // Kullanıcıyı bul (şifre hash'i de getir)
  const userResult = await query(
    `SELECT u.id, u.email, u."passwordHash", u.role, u.status,
            p."firstName", p."lastName", p."avatarUrl"
     FROM "User" u
     LEFT JOIN "Profile" p ON u.id = p."userId"
     WHERE u.email = $1`,
    [email]
  );

  const user = userResult.rows[0];

  // Kullanıcı yok - Timing attack'ı önlemek için bcrypt ile karşılaştır
  if (!user) {
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

  // Profil bilgilerini düzenle
  const safeUser = {
    id: user.id,
    email: user.email,
    role: user.role,
    status: user.status,
    profile: {
      firstName: user.firstName,
      lastName: user.lastName,
      avatarUrl: user.avatarUrl
    }
  };

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
  const userResult = await query(
    'SELECT id, role, status FROM "User" WHERE id = $1',
    [decoded.userId]
  );

  const user = userResult.rows[0];

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
  const userResult = await query(
    `SELECT u.id, u.email, u.role, u.status, u."createdAt",
            p."firstName", p."lastName", p.phone, p.city, p.district,
            p."avatarUrl", p."trustScore", p.bio, p."premiumUntil"
     FROM "User" u
     LEFT JOIN "Profile" p ON u.id = p."userId"
     WHERE u.id = $1`,
    [userId]
  );

  const userData = userResult.rows[0];

  if (!userData) {
    throw new AppError('Kullanıcı bulunamadı.', 404);
  }

  // Format response
  const user = {
    id: userData.id,
    email: userData.email,
    role: userData.role,
    status: userData.status,
    createdAt: userData.createdAt,
    profile: {
      firstName: userData.firstName,
      lastName: userData.lastName,
      phone: userData.phone,
      city: userData.city,
      district: userData.district,
      avatarUrl: userData.avatarUrl,
      trustScore: userData.trustScore,
      bio: userData.bio,
      premiumUntil: userData.premiumUntil
    }
  };

  return user;
};

module.exports = { register, login, refreshTokens, getMe };
