// ============================================================
// TAKASON - İlan Rotaları
// ============================================================

const express = require('express');
const router = express.Router();

const itemController = require('../controllers/itemController');
const { authenticate, optionalAuthenticate } = require('../middlewares/auth');
const { validate, validateQuery } = require('../middlewares/validate');
const { createItemSchema, updateItemSchema, itemQuerySchema } = require('../utils/validators/itemSchemas');

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

module.exports = router;
