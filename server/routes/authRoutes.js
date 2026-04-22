// ============================================================
// TAKASON - Kimlik Doğrulama Rotaları
// ============================================================

const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const { authenticate } = require('../middlewares/auth');
const { validate } = require('../middlewares/validate');
const { registerSchema, loginSchema, refreshTokenSchema } = require('../utils/validators/authSchemas');

// POST /api/auth/register - Kayıt ol
router.post('/register', validate(registerSchema), authController.register);

// POST /api/auth/login - Giriş yap
router.post('/login', validate(loginSchema), authController.login);

// POST /api/auth/refresh - Token yenile
router.post('/refresh', validate(refreshTokenSchema), authController.refresh);

// GET /api/auth/me - Mevcut kullanıcı bilgisi (korumalı)
router.get('/me', authenticate, authController.getMe);

// POST /api/auth/logout - Çıkış yap (korumalı)
router.post('/logout', authenticate, authController.logout);

module.exports = router;
