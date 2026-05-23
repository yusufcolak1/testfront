// ============================================================
// TAKASON - İlan Rotaları
// ============================================================

const express = require('express');
const router = express.Router();

const itemController = require('../controllers/itemController');
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
