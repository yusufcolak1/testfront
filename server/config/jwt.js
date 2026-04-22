// ============================================================
// TAKASON - JWT (JSON Web Token) Yapılandırması
// Access Token + Refresh Token çift token stratejisi
// ============================================================

module.exports = {
  // Kısa ömürlü erişim tokeni (API isteklerinde kullanılır)
  accessToken: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },

  // Uzun ömürlü yenileme tokeni (Yeni access token almak için)
  refreshToken: {
    secret: process.env.JWT_REFRESH_SECRET,
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d',
  },
};
