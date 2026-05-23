// ============================================================
// TAKASON - İlan Controller
// ============================================================

const itemService = require('../services/itemService');
const feedService  = require('../services/feedService');
const { asyncHandler } = require('../middlewares/errorHandler');
const { successResponse, createdResponse, paginatedResponse } = require('../utils/response');
const { handleUploadMultiple, handleUploadSingle } = require('../config/multer');

// GET /api/items
const getItems = asyncHandler(async (req, res) => {
  const { items, pagination } = await itemService.getItems(req.query, req.user?.id);
  return paginatedResponse(res, items, pagination);
});

// GET /api/items/:id
const getItemById = asyncHandler(async (req, res) => {
  const item = await itemService.getItemById(req.params.id, req.user?.id);
  return successResponse(res, { item });
});

// POST /api/items (Korumalı)
const createItem = asyncHandler(async (req, res) => {
  // Dosya yükleme işlemi
  await handleUploadMultiple(req, res);

  const item = await itemService.createItem(req.user.id, req.body, req.files || []);
  return createdResponse(res, { item }, 'İlan başarıyla oluşturuldu.');
});

// PATCH /api/items/:id (Korumalı)
const updateItem = asyncHandler(async (req, res) => {
  const item = await itemService.updateItem(req.params.id, req.user.id, req.body);
  return successResponse(res, { item }, 'İlan güncellendi.');
});

// DELETE /api/items/:id (Korumalı)
const deleteItem = asyncHandler(async (req, res) => {
  const result = await itemService.deleteItem(req.params.id, req.user.id, req.user.role);
  return successResponse(res, null, result.message);
});

// POST /api/items/:id/favorite (Korumalı)
const toggleFavorite = asyncHandler(async (req, res) => {
  const result = await itemService.toggleFavorite(req.user.id, req.params.id);
  // Favori etkileşimini logla
  await feedService.recordInteraction(req.user.id, req.params.id, result.isFavorited ? 'FAVORITE' : 'SKIP').catch(() => {});
  return successResponse(res, { isFavorited: result.isFavorited }, result.message);
});

// GET /api/items/feed (Korumalı) — Kişiselleştirilmiş feed
const getFeed = asyncHandler(async (req, res) => {
  const result = await feedService.generateFeed(req.user.id, req.query);
  return res.json({ success: true, ...result });
});

// POST /api/items/:id/interact (Korumalı) — Etkileşim kaydet
const recordInteraction = asyncHandler(async (req, res) => {
  const { type } = req.body;
  const interaction = await feedService.recordInteraction(req.user.id, req.params.id, type);
  return successResponse(res, { interaction }, 'Etkileşim kaydedildi.');
});

// GET /api/items/my-monthly-count (Korumalı) — Bu ayki ilan sayısı
const getMonthlyCount = asyncHandler(async (req, res) => {
  const { getMonthlyItemCount, FREE_MONTHLY_LIMIT } = itemService;
  const settingsService = require('../services/settingsService');
  const premiumEnabled = await settingsService.get('premium.enabled', false);

  const count = await getMonthlyItemCount(req.user.id);

  // Kullanıcının premium olup olmadığını kontrol et
  const { prisma } = require('../config/database');
  const profile = await prisma.profile.findUnique({
    where: { userId: req.user.id },
    select: { isPremium: true, premiumUntil: true },
  });
  const isPremiumUser =
    profile?.isPremium &&
    (profile.premiumUntil === null || new Date(profile.premiumUntil) > new Date());

  return successResponse(res, {
    count,
    limit: premiumEnabled && !isPremiumUser ? FREE_MONTHLY_LIMIT : null,
    isPremiumUser,
    premiumEnabled,
  });
});

module.exports = { getItems, getItemById, createItem, updateItem, deleteItem, toggleFavorite, getFeed, recordInteraction, getMonthlyCount };
