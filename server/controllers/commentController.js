// ============================================================
// TAKASON - Yorum Controller
// ============================================================

const { prisma } = require('../config/database');
const { asyncHandler } = require('../middlewares/errorHandler');
const { successResponse, createdResponse } = require('../utils/response');

// Yorum Ekle
const addComment = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const itemId = req.params.itemId;
  const userId = req.user.id;

  const comment = await prisma.comment.create({
    data: {
      itemId,
      userId,
      content
    },
    include: {
      user: {
        select: {
          id: true,
          profile: { select: { firstName: true, lastName: true, avatarUrl: true } }
        }
      }
    }
  });

  return createdResponse(res, { comment }, 'Yorumunuz eklendi.');
});

// İlanın Yorumlarını Getir
const getItemComments = asyncHandler(async (req, res) => {
  const { itemId } = req.params;

  const comments = await prisma.comment.findMany({
    where: { itemId },
    orderBy: { createdAt: 'desc' },
    include: {
      user: {
        select: {
          id: true,
          profile: { select: { firstName: true, lastName: true, avatarUrl: true } }
        }
      }
    }
  });

  return successResponse(res, { comments });
});

module.exports = {
  addComment,
  getItemComments
};
