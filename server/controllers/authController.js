// ============================================================
// TAKASON - Kimlik Doğrulama Controller
// HTTP katmanı: İstek al -> Servisi çağır -> Yanıt döndür
// ============================================================

const authService = require('../services/authService');
const { asyncHandler } = require('../middlewares/errorHandler');
const { successResponse, createdResponse } = require('../utils/response');

// POST /api/auth/register
const register = asyncHandler(async (req, res) => {
  const result = await authService.register(req.body);

  return createdResponse(res, result, 'Hesabınız başarıyla oluşturuldu. Hoş geldiniz!');
});

// POST /api/auth/login
const login = asyncHandler(async (req, res) => {
  const result = await authService.login(req.body);

  return successResponse(res, result, 'Giriş başarılı. Hoş geldiniz!');
});

// POST /api/auth/refresh
const refresh = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;
  const tokens = await authService.refreshTokens(refreshToken);

  return successResponse(res, { tokens }, 'Token yenilendi.');
});

// GET /api/auth/me (Korumalı)
const getMe = asyncHandler(async (req, res) => {
  const user = await authService.getMe(req.user.id);

  return successResponse(res, { user });
});

// POST /api/auth/logout (Client-side token silme + ileride Redis'e blacklist eklenecek)
const logout = asyncHandler(async (req, res) => {
  // Şimdilik client-side token silme yeterli
  // Sonraki aşamada: Token'ı Redis blacklist'e ekle
  return successResponse(res, null, 'Başarıyla çıkış yapıldı.');
});

module.exports = { register, login, refresh, getMe, logout };
