// ============================================================
// TAKASON - Admin Rotaları (full CRUD, RBAC)
// ============================================================

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { prisma } = require('../config/database');
const { authenticate, authorize } = require('../middlewares/auth');
const { AppError, asyncHandler } = require('../middlewares/errorHandler');
const settings = require('../services/settingsService');
const mailer = require('../services/mailerService');
const sms = require('../services/smsService');

// Tüm admin rotaları korumalı
router.use(authenticate, authorize('ADMIN'));

// ============================================================
// DASHBOARD STATS
// ============================================================
router.get('/stats', asyncHandler(async (req, res) => {
  const [users, items, trades, faqs, categories, activeItems, pendingTrades] = await Promise.all([
    prisma.user.count(),
    prisma.item.count(),
    prisma.trade.count(),
    prisma.fAQ.count(),
    prisma.category.count(),
    prisma.item.count({ where: { status: 'ACTIVE' } }),
    prisma.trade.count({ where: { status: 'PENDING' } }),
  ]);
  res.json({ success: true, data: { users, items, trades, faqs, categories, activeItems, pendingTrades } });
}));

// ============================================================
// USERS — full CRUD
// ============================================================
router.get('/users', asyncHandler(async (req, res) => {
  const { search, role, status } = req.query;
  const where = {};
  if (search) where.email = { contains: search };
  if (role) where.role = role;
  if (status) where.status = status;
  const users = await prisma.user.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    include: { profile: true, _count: { select: { items: true, sentTrades: true } } },
  });
  res.json({ success: true, data: users });
}));

router.get('/users/:id', asyncHandler(async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.params.id },
    include: { profile: true, addresses: true },
  });
  if (!user) throw new AppError('Kullanıcı bulunamadı', 404);
  res.json({ success: true, data: user });
}));

router.post('/users', asyncHandler(async (req, res) => {
  const { email, password, firstName, lastName, role, status } = req.body;
  if (!email || !password || !firstName || !lastName) throw new AppError('Eksik alan', 400);
  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) throw new AppError('E-posta kullanılıyor', 409);
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email, passwordHash,
      role: role || 'USER',
      status: status || 'ACTIVE',
      profile: { create: { firstName, lastName } },
    },
    include: { profile: true },
  });
  res.status(201).json({ success: true, data: user });
}));

router.patch('/users/:id', asyncHandler(async (req, res) => {
  const { role, status, password, profile } = req.body;
  const data = {};
  if (role) data.role = role;
  if (status) data.status = status;
  if (password) data.passwordHash = await bcrypt.hash(password, 10);
  if (profile) {
    data.profile = { update: profile };
  }
  const user = await prisma.user.update({
    where: { id: req.params.id },
    data,
    include: { profile: true },
  });
  res.json({ success: true, data: user });
}));

router.delete('/users/:id', asyncHandler(async (req, res) => {
  if (req.params.id === req.user.id) throw new AppError('Kendinizi silemezsiniz', 400);
  await prisma.user.delete({ where: { id: req.params.id } });
  res.json({ success: true, message: 'Kullanıcı silindi' });
}));

// ============================================================
// ITEMS — full CRUD (admin tüm ilanları görür/yönetir)
// ============================================================
router.get('/items', asyncHandler(async (req, res) => {
  const { search, status, isFeatured, isPopular } = req.query;
  const where = {};
  if (search) where.title = { contains: search };
  if (status) where.status = status;
  if (isFeatured) where.isFeatured = isFeatured === 'true';
  if (isPopular) where.isPopular = isPopular === 'true';
  const items = await prisma.item.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    include: {
      category: true,
      user: { include: { profile: { select: { firstName: true, lastName: true } } } },
      images: { where: { isPrimary: true }, take: 1 },
    },
  });
  res.json({ success: true, data: items });
}));

router.patch('/items/:id', asyncHandler(async (req, res) => {
  const allowed = ['title', 'description', 'condition', 'status', 'location', 'estimatedValue', 'swapFor', 'tag', 'isFeatured', 'isPopular', 'categoryId'];
  const data = {};
  for (const k of allowed) if (req.body[k] !== undefined) data[k] = req.body[k];
  const item = await prisma.item.update({ where: { id: req.params.id }, data });
  res.json({ success: true, data: item });
}));

router.delete('/items/:id', asyncHandler(async (req, res) => {
  await prisma.item.delete({ where: { id: req.params.id } });
  res.json({ success: true, message: 'İlan silindi' });
}));

// ============================================================
// CATEGORIES — full CRUD
// ============================================================
router.post('/categories', asyncHandler(async (req, res) => {
  const { name, slug, description, icon, parentId } = req.body;
  if (!name || !slug) throw new AppError('Ad ve slug gerekli', 400);
  const cat = await prisma.category.create({ data: { name, slug, description, icon, parentId: parentId || null } });
  res.status(201).json({ success: true, data: cat });
}));

router.patch('/categories/:id', asyncHandler(async (req, res) => {
  const { name, slug, description, icon, parentId } = req.body;
  const cat = await prisma.category.update({
    where: { id: req.params.id },
    data: { name, slug, description, icon, parentId: parentId === '' ? null : parentId },
  });
  res.json({ success: true, data: cat });
}));

router.delete('/categories/:id', asyncHandler(async (req, res) => {
  // Alt kategoriler ve ilanlar varsa Prisma engelleyecek
  await prisma.category.delete({ where: { id: req.params.id } });
  res.json({ success: true, message: 'Kategori silindi' });
}));

// ============================================================
// TRADES — admin görüntüleme + iptal
// ============================================================
router.get('/trades', asyncHandler(async (req, res) => {
  const { status } = req.query;
  const where = {};
  if (status) where.status = status;
  const trades = await prisma.trade.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    include: {
      sender: { include: { profile: true } },
      receiver: { include: { profile: true } },
      tradeItems: { include: { item: { select: { title: true, id: true } } } },
    },
  });
  res.json({ success: true, data: trades });
}));

router.patch('/trades/:id', asyncHandler(async (req, res) => {
  const { status } = req.body;
  const trade = await prisma.trade.update({ where: { id: req.params.id }, data: { status } });
  res.json({ success: true, data: trade });
}));

router.delete('/trades/:id', asyncHandler(async (req, res) => {
  await prisma.trade.delete({ where: { id: req.params.id } });
  res.json({ success: true, message: 'Takas silindi' });
}));

// ============================================================
// FAQ — full CRUD
// ============================================================
router.get('/faqs', asyncHandler(async (req, res) => {
  const data = await prisma.fAQ.findMany({ orderBy: { order: 'asc' } });
  res.json({ success: true, data });
}));
router.post('/faqs', asyncHandler(async (req, res) => {
  const { question, answer, category, order, isActive } = req.body;
  const data = await prisma.fAQ.create({ data: { question, answer, category, order: order || 0, isActive: isActive !== false } });
  res.status(201).json({ success: true, data });
}));
router.patch('/faqs/:id', asyncHandler(async (req, res) => {
  const data = await prisma.fAQ.update({ where: { id: req.params.id }, data: req.body });
  res.json({ success: true, data });
}));
router.delete('/faqs/:id', asyncHandler(async (req, res) => {
  await prisma.fAQ.delete({ where: { id: req.params.id } });
  res.json({ success: true });
}));

// ============================================================
// HELP CATEGORIES — full CRUD
// ============================================================
router.get('/help-categories', asyncHandler(async (req, res) => {
  const data = await prisma.helpCategory.findMany({ orderBy: { order: 'asc' } });
  res.json({ success: true, data });
}));
router.post('/help-categories', asyncHandler(async (req, res) => {
  const data = await prisma.helpCategory.create({ data: req.body });
  res.status(201).json({ success: true, data });
}));
router.patch('/help-categories/:id', asyncHandler(async (req, res) => {
  const data = await prisma.helpCategory.update({ where: { id: req.params.id }, data: req.body });
  res.json({ success: true, data });
}));
router.delete('/help-categories/:id', asyncHandler(async (req, res) => {
  await prisma.helpCategory.delete({ where: { id: req.params.id } });
  res.json({ success: true });
}));

// ============================================================
// PREMIUM PERKS — full CRUD
// ============================================================
router.get('/premium-perks', asyncHandler(async (req, res) => {
  const data = await prisma.premiumPerk.findMany({ orderBy: { order: 'asc' } });
  res.json({ success: true, data });
}));
router.post('/premium-perks', asyncHandler(async (req, res) => {
  const data = await prisma.premiumPerk.create({ data: req.body });
  res.status(201).json({ success: true, data });
}));
router.patch('/premium-perks/:id', asyncHandler(async (req, res) => {
  const data = await prisma.premiumPerk.update({ where: { id: req.params.id }, data: req.body });
  res.json({ success: true, data });
}));
router.delete('/premium-perks/:id', asyncHandler(async (req, res) => {
  await prisma.premiumPerk.delete({ where: { id: req.params.id } });
  res.json({ success: true });
}));

// ============================================================
// PREMIUM PLANS — full CRUD
// ============================================================
router.get('/premium-plans', asyncHandler(async (req, res) => {
  const data = await prisma.premiumPlan.findMany({ orderBy: { order: 'asc' } });
  res.json({ success: true, data });
}));
router.post('/premium-plans', asyncHandler(async (req, res) => {
  const body = { ...req.body };
  if (Array.isArray(body.features)) body.features = JSON.stringify(body.features);
  const data = await prisma.premiumPlan.create({ data: body });
  res.status(201).json({ success: true, data });
}));
router.patch('/premium-plans/:id', asyncHandler(async (req, res) => {
  const body = { ...req.body };
  if (Array.isArray(body.features)) body.features = JSON.stringify(body.features);
  const data = await prisma.premiumPlan.update({ where: { id: req.params.id }, data: body });
  res.json({ success: true, data });
}));
router.delete('/premium-plans/:id', asyncHandler(async (req, res) => {
  await prisma.premiumPlan.delete({ where: { id: req.params.id } });
  res.json({ success: true });
}));

// ============================================================
// SAFE SWAP STEPS — full CRUD
// ============================================================
router.get('/safe-swap-steps', asyncHandler(async (req, res) => {
  const data = await prisma.safeSwapStep.findMany({ orderBy: { order: 'asc' } });
  res.json({ success: true, data });
}));
router.post('/safe-swap-steps', asyncHandler(async (req, res) => {
  const data = await prisma.safeSwapStep.create({ data: req.body });
  res.status(201).json({ success: true, data });
}));
router.patch('/safe-swap-steps/:id', asyncHandler(async (req, res) => {
  const data = await prisma.safeSwapStep.update({ where: { id: req.params.id }, data: req.body });
  res.json({ success: true, data });
}));
router.delete('/safe-swap-steps/:id', asyncHandler(async (req, res) => {
  await prisma.safeSwapStep.delete({ where: { id: req.params.id } });
  res.json({ success: true });
}));

// ============================================================
// SETTINGS (key/value) — group-based + bulk update
// ============================================================
router.get('/settings', asyncHandler(async (req, res) => {
  const { group } = req.query;
  const where = group ? { group } : {};
  const data = await prisma.siteSetting.findMany({ where, orderBy: [{ group: 'asc' }, { key: 'asc' }] });
  res.json({ success: true, data });
}));

router.put('/settings', asyncHandler(async (req, res) => {
  // Bulk: { items: [{ key, value, type, group, isPublic, description }, ...] }
  const items = Array.isArray(req.body.items) ? req.body.items : [];
  for (const i of items) {
    if (!i.key) continue;
    await settings.set(i.key, i.value, { type: i.type, group: i.group, isPublic: i.isPublic, description: i.description });
  }
  // Mailer cache invalidate
  mailer.reset();
  res.json({ success: true, message: `${items.length} ayar güncellendi` });
}));

router.put('/settings/:key', asyncHandler(async (req, res) => {
  const { value, type, group, isPublic, description } = req.body;
  await settings.set(req.params.key, value, { type, group, isPublic, description });
  mailer.reset();
  res.json({ success: true, message: 'Ayar güncellendi' });
}));

router.post('/settings', asyncHandler(async (req, res) => {
  const { key, value, type, group, isPublic, description } = req.body;
  if (!key) throw new AppError('Anahtar gerekli', 400);
  await settings.set(key, value || '', { type, group, isPublic, description });
  res.status(201).json({ success: true });
}));

router.delete('/settings/:key', asyncHandler(async (req, res) => {
  await prisma.siteSetting.delete({ where: { key: req.params.key } });
  settings.invalidate();
  res.json({ success: true });
}));

// ============================================================
// SMTP test gönderimi
// ============================================================
router.post('/settings/smtp/test', asyncHandler(async (req, res) => {
  const { to, subject, body } = req.body;
  const result = await mailer.sendMail({
    to: to || req.user.email,
    subject: subject || 'TakasOn SMTP Test',
    html: `<p>${body || 'SMTP yapılandırmanız çalışıyor!'}</p>`,
    text: body || 'SMTP yapılandırmanız çalışıyor!',
  });
  res.json({ success: true, data: result });
}));

router.get('/settings/smtp/verify', asyncHandler(async (req, res) => {
  const result = await mailer.verify();
  res.json({ success: result.ok, data: result });
}));

// ============================================================
// SMS test gönderimi
// ============================================================
router.post('/settings/sms/test', asyncHandler(async (req, res) => {
  const { to, message } = req.body;
  if (!to) throw new AppError('Telefon numarası gerekli', 400);
  const result = await sms.sendSms({ to, message: message || 'TakasOn SMS test mesajı' });
  res.json({ success: result.ok !== false, data: result });
}));

module.exports = router;
