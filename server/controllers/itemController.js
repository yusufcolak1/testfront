// ============================================================
// TAKASON - İlan Controller
// ============================================================

const itemService = require('../services/itemService');
const { asyncHandler } = require('../middlewares/errorHandler');
const { successResponse, createdResponse, paginatedResponse } = require('../utils/response');
const { handleUploadMultiple, handleUploadSingle } = require('../config/multer');

// GET /api/items
const getItems = asyncHandler(async (req, res) => {
  const { items, pagination } = await itemService.getItems(req.query);
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
  return successResponse(res, { isFavorited: result.isFavorited }, result.message);
});

module.exports = { getItems, getItemById, createItem, updateItem, deleteItem, toggleFavorite };
