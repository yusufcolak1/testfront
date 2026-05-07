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

const { findTradeCycles } = require('../services/cycleService');

// GET /api/trades/matches/:itemId — İkili eşleşme önerileri (skill.md §4.1)
router.get('/matches/:itemId', tradeController.getMatches);

// GET /api/trades/cycles/:itemId — Çoklu (3'lü) takas döngüleri (skill.md §4.2)
router.get('/cycles/:itemId', async (req, res) => {
    try {
        const cycles = await findTradeCycles(req.params.itemId);
        res.json({ success: true, data: { cycles } });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// PATCH /api/trades/:id/accept - Teklifi kabul et
router.patch('/:id/accept', tradeController.acceptTrade);

// PATCH /api/trades/:id/reject - Teklifi reddet
router.patch('/:id/reject', tradeController.rejectTrade);

// PATCH /api/trades/:id/cancel - Teklifi iptal et (gönderen)
router.patch('/:id/cancel', tradeController.cancelTrade);

module.exports = router;
