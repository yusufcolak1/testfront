// ============================================================
// TAKASON - İçerik (CMS) Rotaları - Public
// FAQ, HelpCategory, PremiumPerk, PremiumPlan, SafeSwapStep, Settings
// ============================================================

const express = require('express');
const router = express.Router();
const { prisma } = require('../config/database');
const settings = require('../services/settingsService');

// ---- FAQ ----
router.get('/faqs', async (req, res, next) => {
  try {
    const faqs = await prisma.fAQ.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });
    res.json({ success: true, data: faqs });
  } catch (e) { next(e); }
});

// ---- Help Categories ----
router.get('/help/categories', async (req, res, next) => {
  try {
    const data = await prisma.helpCategory.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });
    res.json({ success: true, data });
  } catch (e) { next(e); }
});

// ---- Premium Perks ----
router.get('/premium/perks', async (req, res, next) => {
  try {
    const data = await prisma.premiumPerk.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });
    res.json({ success: true, data });
  } catch (e) { next(e); }
});

// ---- Premium Plans ----
router.get('/premium/plans', async (req, res, next) => {
  try {
    const rows = await prisma.premiumPlan.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });
    const data = rows.map((r) => ({ ...r, features: safeParse(r.features) }));
    res.json({ success: true, data });
  } catch (e) { next(e); }
});

// ---- Safe Swap Steps ----
router.get('/safe-swap/steps', async (req, res, next) => {
  try {
    const data = await prisma.safeSwapStep.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });
    res.json({ success: true, data });
  } catch (e) { next(e); }
});

// ---- Public Site Settings (theme, slogan, contact) ----
router.get('/settings/public', async (req, res, next) => {
  try {
    const data = await settings.getPublic();
    res.json({ success: true, data });
  } catch (e) { next(e); }
});

function safeParse(s) {
  try { return JSON.parse(s); } catch { return []; }
}

module.exports = router;
