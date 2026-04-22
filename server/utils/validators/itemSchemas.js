// ============================================================
// TAKASON - İlan Validasyon Şemaları (Zod)
// ============================================================

const { z } = require('zod');

// İlan oluştur
const createItemSchema = z.object({
  title: z
    .string({ required_error: 'İlan başlığı zorunludur.' })
    .min(5, 'Başlık en az 5 karakter olmalıdır.')
    .max(100, 'Başlık en fazla 100 karakter olabilir.')
    .trim(),

  description: z
    .string({ required_error: 'İlan açıklaması zorunludur.' })
    .min(20, 'Açıklama en az 20 karakter olmalıdır.')
    .max(2000, 'Açıklama en fazla 2000 karakter olabilir.')
    .trim(),

  categoryId: z
    .string({ required_error: 'Kategori seçimi zorunludur.' })
    .uuid('Geçersiz kategori ID formatı.'),

  condition: z.enum(['NEW', 'LIKE_NEW', 'GOOD', 'FAIR', 'POOR'], {
    required_error: 'Ürün durumu seçimi zorunludur.',
    invalid_type_error: 'Geçersiz ürün durumu.',
  }),

  city: z.string().max(50).trim().optional(),
  district: z.string().max(50).trim().optional(),

  estimatedValue: z
    .number()
    .min(0, 'Tahmini değer negatif olamaz.')
    .max(10_000_000, 'Tahmini değer çok yüksek.')
    .optional(),
});

// İlan güncelle (tüm alanlar opsiyonel)
const updateItemSchema = createItemSchema.partial();

// İlan listesi query parametreleri
const itemQuerySchema = z.object({
  page: z.string().regex(/^\d+$/).transform(Number).optional(),
  limit: z.string().regex(/^\d+$/).transform(Number).optional(),
  categoryId: z.string().uuid().optional(),
  condition: z.enum(['NEW', 'LIKE_NEW', 'GOOD', 'FAIR', 'POOR']).optional(),
  city: z.string().optional(),
  minValue: z.string().regex(/^\d+$/).transform(Number).optional(),
  maxValue: z.string().regex(/^\d+$/).transform(Number).optional(),
  search: z.string().max(100).optional(),
  sort: z.enum(['newest', 'oldest', 'value_asc', 'value_desc']).default('newest').optional(),
});

module.exports = { createItemSchema, updateItemSchema, itemQuerySchema };
