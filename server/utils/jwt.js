// ============================================================
// TAKASON - JWT Token Üretme/Doğrulama Yardımcı Fonksiyonları
// ============================================================

const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

// Kısa ömürlü access token üret
const generateAccessToken = (userId, role) => {
  return jwt.sign(
    { userId, role },
    jwtConfig.accessToken.secret,
    { expiresIn: jwtConfig.accessToken.expiresIn }
  );
};

// Uzun ömürlü refresh token üret
const generateRefreshToken = (userId) => {
  return jwt.sign(
    { userId },
    jwtConfig.refreshToken.secret,
    { expiresIn: jwtConfig.refreshToken.expiresIn }
  );
};

// Token çifti üret (login ve register'da kullanılır)
const generateTokenPair = (userId, role) => ({
  accessToken: generateAccessToken(userId, role),
  refreshToken: generateRefreshToken(userId),
});

// Refresh token'ı doğrula
const verifyRefreshToken = (token) => {
  return jwt.verify(token, jwtConfig.refreshToken.secret);
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  generateTokenPair,
  verifyRefreshToken,
};
