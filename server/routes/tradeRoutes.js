// ============================================================
// TAKASON - Takas Rotaları
// ============================================================

const express = require('express');
const router = express.Router();

const tradeController = require('../controllers/tradeController');
const { authenticate } = require('../middlewares/auth');

// Tüm takas rotaları korumalı
router.use(authenticate);

// POST /api/trades - Teklif gönder
router.post('/', tradeController.createTrade);

// GET /api/trades/my - Kendi takasların
router.get('/my', tradeController.getUserTrades);

// PATCH /api/trades/:id/accept - Teklifi kabul et
router.patch('/:id/accept', tradeController.acceptTrade);

// PATCH /api/trades/:id/reject - Teklifi reddet
router.patch('/:id/reject', tradeController.rejectTrade);

// PATCH /api/trades/:id/cancel - Teklifi iptal et (gönderen)
router.patch('/:id/cancel', tradeController.cancelTrade);

module.exports = router;
