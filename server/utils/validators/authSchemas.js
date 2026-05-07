// ============================================================
// TAKASON - Kimlik Doğrulama Validasyon Şemaları (Zod)
// ============================================================

const { z } = require('zod');

// Kayıt ol
const registerSchema = z.object({
  email: z
    .string({ required_error: 'E-posta adresi zorunludur.' })
    .email('Geçerli bir e-posta adresi girin.')
    .toLowerCase()
    .trim(),

  password: z
    .string({ required_error: 'Şifre zorunludur.' })
    .min(6, 'Şifre en az 6 karakter olmalıdır.')
    .max(128, 'Şifre en fazla 128 karakter olabilir.'),

  firstName: z
    .string({ required_error: 'Ad zorunludur.' })
    .min(2, 'Ad en az 2 karakter olmalıdır.')
    .max(50, 'Ad en fazla 50 karakter olabilir.')
    .trim(),

  lastName: z
    .string({ required_error: 'Soyad zorunludur.' })
    .min(2, 'Soyad en az 2 karakter olmalıdır.')
    .max(50, 'Soyad en fazla 50 karakter olabilir.')
    .trim(),

  phone: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
});

// Giriş yap
const loginSchema = z.object({
  email: z
    .string({ required_error: 'E-posta adresi zorunludur.' })
    .email('Geçerli bir e-posta adresi girin.')
    .toLowerCase()
    .trim(),

  password: z
    .string({ required_error: 'Şifre zorunludur.' })
    .min(1, 'Şifre zorunludur.'),
});

// Refresh token
const refreshTokenSchema = z.object({
  refreshToken: z
    .string({ required_error: 'Refresh token zorunludur.' })
    .min(1, 'Refresh token boş olamaz.'),
});

module.exports = { registerSchema, loginSchema, refreshTokenSchema };
