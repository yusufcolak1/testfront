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

module.exports = { createTrade, getUserTrades, acceptTrade, rejectTrade };
