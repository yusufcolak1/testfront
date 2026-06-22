// ============================================================
// TAKASON - İlan Rotaları
// ============================================================

const express = require('express');
const router = express.Router();

const itemController = require('../controllers/itemController');
const { prisma } = require('../config/database');
const { authenticate, optionalAuthenticate } = require('../middlewares/auth');
const { validate, validateQuery } = require('../middlewares/validate');
const { createItemSchema, updateItemSchema, itemQuerySchema } = require('../utils/validators/itemSchemas');

// GET /api/items/feed — Kişiselleştirilmiş feed (korumalı, ÖNEMLİ: /:id den önce olmalı)
router.get('/feed', authenticate, itemController.getFeed);

// GET /api/items/my-monthly-count — Bu ayki ilan sayısı (korumalı, /:id den önce olmalı)
router.get('/my-monthly-count', authenticate, itemController.getMonthlyCount);

// GET /api/items - Tüm ilanlar (herkes görebilir, giriş yapmışsa favori bilgisi eklenir)
router.get('/', optionalAuthenticate, validateQuery(itemQuerySchema), itemController.getItems);

// GET /api/items/:id - İlan detayı
router.get('/:id', optionalAuthenticate, itemController.getItemById);

// POST /api/items - İlan oluştur (korumalı - multer body'yi parse ettiği için validate burada yok)
router.post('/', authenticate, itemController.createItem);

// PATCH /api/items/:id - İlan güncelle (korumalı)
router.patch('/:id', authenticate, validate(updateItemSchema), itemController.updateItem);

// DELETE /api/items/:id - İlan sil (korumalı)
router.delete('/:id', authenticate, itemController.deleteItem);

// POST /api/items/:id/images - İlana yeni fotoğraf ekle (korumalı, multer)
const { handleUploadMultiple } = require('../config/multer');
const { AppError, asyncHandler } = require('../middlewares/errorHandler');
router.post('/:id/images', authenticate, handleUploadMultiple, asyncHandler(async (req, res) => {
  const item = await prisma.item.findUnique({ where: { id: req.params.id }, select: { userId: true, images: true } });
  if (!item) throw new AppError('İlan bulunamadı.', 404);
  if (item.userId !== req.user.id) throw new AppError('Bu ilanı düzenleme yetkiniz yok.', 403);
  if (!req.files || req.files.length === 0) throw new AppError('Hiç fotoğraf yüklenmedi.', 400);
  const totalImages = item.images.length + req.files.length;
  if (totalImages > 10) throw new AppError('Bir ilanda en fazla 10 fotoğraf olabilir.', 400);
  
  const created = await Promise.all(req.files.map((f, i) => {
    const normalizedPath = f.path.replace(/\\/g, '/');
    const imageUrl = normalizedPath.startsWith('/') ? normalizedPath : `/${normalizedPath}`;
    return prisma.itemImage.create({
      data: {
        itemId: req.params.id,
        imageUrl: imageUrl,
        displayOrder: item.images.length + i
      }
    });
  }));
  res.json({ success: true, data: created });
}));

// DELETE /api/items/:id/images/:imageId - İlandan fotoğraf sil (korumalı)
router.delete('/:id/images/:imageId', authenticate, asyncHandler(async (req, res) => {
  const item = await prisma.item.findUnique({ where: { id: req.params.id }, select: { userId: true } });
  if (!item) throw new AppError('İlan bulunamadı.', 404);
  if (item.userId !== req.user.id) throw new AppError('Bu ilanı düzenleme yetkiniz yok.', 403);
  await prisma.itemImage.delete({ where: { id: req.params.imageId } });
  res.json({ success: true });
}));

// POST /api/items/:id/favorite - Favori toggle (korumalı)
router.post('/:id/favorite', authenticate, itemController.toggleFavorite);

// POST /api/items/:id/interact - Etkileşim kaydet (korumalı) — skill.md §3.1
router.post('/:id/interact', authenticate, itemController.recordInteraction);

const questionController = require('../controllers/questionController');

// --- İlan Soruları ---
// GET /api/items/:itemId/questions - Soruları listele
router.get('/:itemId/questions', questionController.getItemQuestions);

// POST /api/items/questions - Soru sor (korumalı)
router.post('/questions/ask', authenticate, questionController.askQuestion);

// PATCH /api/items/questions/:questionId/answer - Cevap ver (korumalı, ilan sahibi)
router.patch('/questions/:questionId/answer', authenticate, questionController.answerQuestion);

const commentController = require('../controllers/commentController');

// --- İlan Yorumları (Keşfet/Social) ---
// GET /api/items/:itemId/comments - Yorumları listele
router.get('/:itemId/comments', commentController.getItemComments);

// POST /api/items/:itemId/comments - Yorum yap (korumalı)
router.post('/:itemId/comments', authenticate, commentController.addComment);

module.exports = router;
