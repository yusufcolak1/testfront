// ============================================================
// TAKASON - Ana Rota Birleştirici
// Tüm route'lar buradan app.js'e bağlanır
// ============================================================

const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const itemRoutes = require('./itemRoutes');
const tradeRoutes = require('./tradeRoutes');

// API durum kontrolü
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Takason API çalışıyor 🚀',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    version: '1.0.0',
  });
});

// Rotaları bağla
router.use('/auth', authRoutes);
router.use('/items', itemRoutes);
router.use('/trades', tradeRoutes);

module.exports = router;
