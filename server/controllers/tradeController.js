// ============================================================
// TAKASON - Takas Controller
// ============================================================

const tradeService = require('../services/tradeService');
const { asyncHandler } = require('../middlewares/errorHandler');
const { successResponse, createdResponse } = require('../utils/response');

// POST /api/trades
const createTrade = asyncHandler(async (req, res) => {
  const trade = await tradeService.createTrade(req.user.id, req.body);
  return createdResponse(res, { trade }, 'Takas teklifi gönderildi.');
});

// GET /api/trades/my
const getUserTrades = asyncHandler(async (req, res) => {
  const trades = await tradeService.getUserTrades(req.user.id);
  return successResponse(res, { trades });
});

// PATCH /api/trades/:id/accept
const acceptTrade = asyncHandler(async (req, res) => {
  const result = await tradeService.acceptTrade(req.params.id, req.user.id);
  return successResponse(res, null, result.message);
});

// PATCH /api/trades/:id/reject
const rejectTrade = asyncHandler(async (req, res) => {
  const result = await tradeService.rejectTrade(req.params.id, req.user.id);
  return successResponse(res, null, result.message);
});

// PATCH /api/trades/:id/cancel
const cancelTrade = asyncHandler(async (req, res) => {
  const result = await tradeService.cancelTrade(req.params.id, req.user.id);
  return successResponse(res, null, result.message);
});

// GET /api/trades/matches/:itemId — İkili eşleşme önerileri (skill.md §4.1)
const getMatches = asyncHandler(async (req, res) => {
  const matches = await tradeService.findPotentialMatches(req.params.itemId, req.user.id);
  return successResponse(res, { matches, count: matches.length });
});

module.exports = { createTrade, getUserTrades, acceptTrade, rejectTrade, cancelTrade, getMatches };
