// ============================================================
// TAKASON - Takas Servisi
// Gelişmiş çoklu ürün takas motoru
// ============================================================

const { prisma } = require('../config/database');
const { AppError } = require('../middlewares/errorHandler');

// ============================================================
// Takas Teklifi Gönder
// ============================================================
const createTrade = async (senderId, data) => {
  const { receiverId, offeredItemIds = [], requestedItemIds = [], message } = data;

  // Kendine teklif gönderemez
  if (senderId === receiverId) {
    throw new AppError('Kendinize takas teklifi gönderemezsiniz.', 400);
  }

  // Hedef kullanıcı mevcut mu?
  const receiver = await prisma.user.findUnique({ where: { id: receiverId }, select: { id: true } });
  if (!receiver) throw new AppError('Teklif alacak kullanıcı bulunamadı.', 404);

  if (!Array.isArray(offeredItemIds) || offeredItemIds.length === 0) {
    throw new AppError('En az bir ürün teklif etmelisiniz.', 400);
  }
  if (!Array.isArray(requestedItemIds) || requestedItemIds.length === 0) {
    throw new AppError('En az bir ürün talep etmelisiniz.', 400);
  }

  const offeredItems = await prisma.item.findMany({
    where: { id: { in: offeredItemIds }, userId: senderId, status: 'ACTIVE' },
  });
  if (offeredItems.length !== offeredItemIds.length) {
    throw new AppError('Teklif edilen ilanlardan bazıları geçersiz veya size ait değil.', 400);
  }

  const requestedItems = await prisma.item.findMany({
    where: { id: { in: requestedItemIds }, userId: receiverId, status: 'ACTIVE' },
  });
  if (requestedItems.length !== requestedItemIds.length) {
    throw new AppError('İstenen ilanlardan bazıları geçersiz veya alıcıya ait değil.', 400);
  }

  const trade = await prisma.trade.create({
    data: {
      senderId,
      receiverId,
      message: message || null,
      tradeItems: {
        create: [
          ...offeredItemIds.map((itemId) => ({ itemId, side: 'OFFER' })),
          ...requestedItemIds.map((itemId) => ({ itemId, side: 'REQUEST' })),
        ],
      },
    },
    include: {
      tradeItems: { include: { item: { select: { id: true, title: true } } } },
      sender: { select: { id: true, profile: { select: { firstName: true, lastName: true } } } },
      receiver: { select: { id: true, profile: { select: { firstName: true, lastName: true } } } },
    },
  });

  // Bildirim oluştur (alıcıya)
  try {
    await prisma.notification.create({
      data: {
        userId: receiverId,
        type: 'TRADE',
        title: 'Yeni takas teklifi',
        body: 'Bir kullanıcı size takas teklifi gönderdi.',
        link: '/profil/takaslar',
      },
    });
  } catch (e) { /* yutuluyor */ }

  return trade;
};

// ============================================================
// Teklifi Kabul Et
// ============================================================
const acceptTrade = async (tradeId, userId) => {
  const trade = await prisma.trade.findUnique({
    where: { id: tradeId },
    include: { tradeItems: true },
  });

  if (!trade) throw new AppError('Takas teklifi bulunamadı.', 404);
  if (trade.receiverId !== userId) throw new AppError('Bu teklifi kabul etme yetkiniz yok.', 403);
  if (trade.status !== 'PENDING') throw new AppError('Bu teklif artık işleme alınamaz.', 400);

  const itemIds = trade.tradeItems.map((ti) => ti.itemId);

  await prisma.$transaction(async (tx) => {
    await tx.trade.update({ where: { id: tradeId }, data: { status: 'ACCEPTED' } });
    // İlgili tüm ilanları SOLD durumuna al (ARCHIVED gibi davranır)
    await tx.item.updateMany({
      where: { id: { in: itemIds } },
      data: { status: 'SOLD' },
    });
    // Profile.swapsCompleted +1 her iki kullanıcı için
    await tx.profile.updateMany({
      where: { userId: { in: [trade.senderId, trade.receiverId] } },
      data: { swapsCompleted: { increment: 1 }, score: { increment: 10 }, totalTrades: { increment: 1 } },
    });
    // Sohbet odası oluştur (ya da mevcut ise atla)
    const existing = await tx.chatRoom.findFirst({
      where: { AND: [{ users: { some: { id: trade.senderId } } }, { users: { some: { id: trade.receiverId } } }] },
    });
    if (!existing) {
      await tx.chatRoom.create({
        data: {
          userIds: [trade.senderId, trade.receiverId].sort().join(','),
          users: { connect: [{ id: trade.senderId }, { id: trade.receiverId }] },
        },
      });
    }
  });

  // Gönderene bildirim
  try {
    await prisma.notification.create({
      data: { userId: trade.senderId, type: 'TRADE', title: 'Takasınız kabul edildi', body: 'Takas tamamlandı. Şimdi mesajlaşabilirsiniz.', link: '/mesajlar' },
    });
  } catch (e) { /* yut */ }

  return { message: 'Takas teklifi kabul edildi!' };
};

// ============================================================
// Teklifi Reddet
// ============================================================
const rejectTrade = async (tradeId, userId) => {
  const trade = await prisma.trade.findUnique({ where: { id: tradeId } });
  if (!trade) throw new AppError('Takas teklifi bulunamadı.', 404);
  if (trade.receiverId !== userId) throw new AppError('Bu teklifi reddetme yetkiniz yok.', 403);
  if (trade.status !== 'PENDING') throw new AppError('Bu teklif artık işleme alınamaz.', 400);
  await prisma.trade.update({ where: { id: tradeId }, data: { status: 'REJECTED' } });
  return { message: 'Takas teklifi reddedildi.' };
};

const cancelTrade = async (tradeId, userId) => {
  const trade = await prisma.trade.findUnique({ where: { id: tradeId } });
  if (!trade) throw new AppError('Takas teklifi bulunamadı.', 404);
  if (trade.senderId !== userId) throw new AppError('Sadece teklifi gönderen iptal edebilir.', 403);
  if (trade.status !== 'PENDING') throw new AppError('Sadece bekleyen teklifler iptal edilebilir.', 400);
  await prisma.trade.update({ where: { id: tradeId }, data: { status: 'CANCELLED' } });
  return { message: 'Takas teklifi iptal edildi.' };
};

// ============================================================
// Kullanıcının Takaslarını Listele
// ============================================================
const getUserTrades = async (userId) => {
  const trades = await prisma.trade.findMany({
    where: {
      OR: [{ senderId: userId }, { receiverId: userId }],
    },
    include: {
      tradeItems: {
        include: { item: { select: { id: true, title: true, images: { where: { isPrimary: true }, take: 1 } } } },
      },
      sender: { select: { id: true, profile: { select: { firstName: true, lastName: true, avatarUrl: true } } } },
      receiver: { select: { id: true, profile: { select: { firstName: true, lastName: true, avatarUrl: true } } } },
    },
    orderBy: { createdAt: 'desc' },
  });

  return trades;
};

module.exports = { createTrade, acceptTrade, rejectTrade, cancelTrade, getUserTrades };
