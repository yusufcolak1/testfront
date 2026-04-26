// ============================================================
// TAKASON - Kategori Rotaları
// ============================================================

const express = require('express');
const router = express.Router();
const { prisma } = require('../config/database');

// GET /api/categories - Tüm kategorileri listele
router.get('/', async (req, res, next) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' },
    });
    res.json({ success: true, data: categories });
  } catch (error) {
    next(error);
  }
});

// GET /api/categories/:id - Tek kategori
router.get('/:id', async (req, res, next) => {
  try {
    const category = await prisma.category.findUnique({
      where: { id: req.params.id },
      include: { children: true },
    });
    if (!category) {
      return res.status(404).json({ success: false, message: 'Kategori bulunamadı.' });
    }
    res.json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
