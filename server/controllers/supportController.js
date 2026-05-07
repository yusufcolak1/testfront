// ============================================================
// TAKASON - Destek Controller
// ============================================================

const { prisma } = require('../config/database');
const { asyncHandler } = require('../middlewares/errorHandler');
const { successResponse, createdResponse } = require('../utils/response');

// Destek Talebi Oluştur (Public/User)
const createSupportRequest = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;
  const userId = req.user?.id || null;

  const request = await prisma.supportRequest.create({
    data: {
      userId,
      name,
      email,
      subject,
      message,
      status: 'PENDING'
    }
  });

  return createdResponse(res, { request }, 'Destek talebiniz başarıyla alındı.');
});

// Tüm Talepleri Listele (Admin)
const getAllSupportRequests = asyncHandler(async (req, res) => {
  const requests = await prisma.supportRequest.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      user: {
        select: {
          id: true,
          profile: { select: { firstName: true, lastName: true } }
        }
      }
    }
  });

  return successResponse(res, { requests });
});

// Talebi Güncelle (Admin)
const updateSupportRequestStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const request = await prisma.supportRequest.update({
    where: { id },
    data: { status }
  });

  return successResponse(res, { request }, 'Talep durumu güncellendi.');
});

module.exports = {
  createSupportRequest,
  getAllSupportRequests,
  updateSupportRequestStatus
};
