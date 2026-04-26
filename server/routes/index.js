// ============================================================
// TAKASON - Ana Rota Birleştirici
// ============================================================

const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const itemRoutes = require('./itemRoutes');
const tradeRoutes = require('./tradeRoutes');
const categoryRoutes = require('./categoryRoutes');
const contentRoutes = require('./contentRoutes');
const userRoutes = require('./userRoutes');
const adminRoutes = require('./adminRoutes');

router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Takason API çalışıyor 🚀',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    version: '1.0.0',
  });
});

// Auth & core
router.use('/auth', authRoutes);
router.use('/items', itemRoutes);
router.use('/categories', categoryRoutes);
router.use('/trades', tradeRoutes);

// Content (FAQ, perks, steps, public settings)
router.use('/', contentRoutes);

// User-scoped (leaderboard, addresses, my-ads, messages, notifications)
router.use('/', userRoutes);

// Admin (RBAC korumalı)
router.use('/admin', adminRoutes);

module.exports = router;
