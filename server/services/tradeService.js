// ============================================================
// TAKASON - Takas Servisi
// Gelişmiş çoklu ürün takas motoru
// ============================================================

const prisma = require('../config/database');
const { AppError } = require('../middlewares/errorHandler');

// ============================================================
// Takas Teklifi Gönder
// ============================================================
const createTrade = async (initiatorId, data) => {
  const { receiverId, offeredItemIds, requestedItemIds, cashOffer, note } = data;

  // Kendine teklif gönderemez
  if (initiatorId === receiverId) {
    throw new AppError('Kendinize takas teklifi gönderemezsiniz.', 400);
  }

  // Hedef kullanıcı mevcut mu?
  const receiver = await prisma.user.findUnique({ where: { id: receiverId }, select: { id: true } });
  if (!receiver) throw new AppError('Teklif alacak kullanıcı bulunamadı.', 404);

  // Teklif edilen ilanlar mevcut ve sahibi mi?
  if (offeredItemIds.length === 0) {
    throw new AppError('En az bir ürün teklif etmelisiniz.', 400);
  }

  const offeredItems = await prisma.item.findMany({
    where: { id: { in: offeredItemIds }, userId: initiatorId, status: 'ACTIVE' },
  });

  if (offeredItems.length !== offeredItemIds.length) {
    throw new AppError('Teklif edilen ilanlardan bazıları geçersiz veya size ait değil.', 400);
  }

  // İstenen ilanlar mevcut ve alıcıya ait mi?
  const requestedItems = await prisma.item.findMany({
    where: { id: { in: requestedItemIds }, userId: receiverId, status: 'ACTIVE' },
  });

  if (requestedItems.length !== requestedItemIds.length) {
    throw new AppError('İstenen ilanlardan bazıları geçersiz veya alıcıya ait değil.', 400);
  }

  // Takası ve tüm trade_items'ları transaction içinde oluştur
  const trade = await prisma.$transaction(async (tx) => {
    const newTrade = await tx.trade.create({
      data: {
        initiatorId,
        receiverId,
        cashOffer: cashOffer || null,
        note: note || null,
        // TradeItem'ları nested write ile oluştur
        tradeItems: {
          create: [
            ...offeredItemIds.map((itemId) => ({ itemId, side: 'OFFERED' })),
            ...requestedItemIds.map((itemId) => ({ itemId, side: 'REQUESTED' })),
          ],
        },
      },
      include: {
        tradeItems: { include: { item: { select: { id: true, title: true } } } },
        initiator: { select: { id: true, profile: { select: { firstName: true, lastName: true } } } },
        receiver: { select: { id: true, profile: { select: { firstName: true, lastName: true } } } },
      },
    });

    // Teklif edilen ilanları "IN_TRADE" durumuna al
    await tx.item.updateMany({
      where: { id: { in: offeredItemIds } },
      data: { status: 'IN_TRADE' },
    });

    return newTrade;
  });

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
    // Teklifi kabul et
    await tx.trade.update({ where: { id: tradeId }, data: { status: 'ACCEPTED' } });

    // İlgili tüm ilanları "COMPLETED" yap
    await tx.item.updateMany({
      where: { id: { in: itemIds } },
      data: { status: 'COMPLETED' },
    });

    // Takas için chat odası oluştur
    await tx.chatRoom.create({
      data: {
        tradeId,
        buyerId: trade.initiatorId,
        sellerId: trade.receiverId,
      },
    });
  });

  return { message: 'Takas teklifi kabul edildi!' };
};

// ============================================================
// Teklifi Reddet
// ============================================================
const rejectTrade = async (tradeId, userId) => {
  const trade = await prisma.trade.findUnique({
    where: { id: tradeId },
    include: { tradeItems: { where: { side: 'OFFERED' } } },
  });

  if (!trade) throw new AppError('Takas teklifi bulunamadı.', 404);
  if (trade.receiverId !== userId) throw new AppError('Bu teklifi reddetme yetkiniz yok.', 403);
  if (trade.status !== 'PENDING') throw new AppError('Bu teklif artık işleme alınamaz.', 400);

  const offeredItemIds = trade.tradeItems.map((ti) => ti.itemId);

  await prisma.$transaction(async (tx) => {
    await tx.trade.update({ where: { id: tradeId }, data: { status: 'REJECTED' } });

    // Teklif edilen ürünleri tekrar "ACTIVE" yap
    await tx.item.updateMany({
      where: { id: { in: offeredItemIds } },
      data: { status: 'ACTIVE' },
    });
  });

  return { message: 'Takas teklifi reddedildi.' };
};

// ============================================================
// Kullanıcının Takaslarını Listele
// ============================================================
const getUserTrades = async (userId) => {
  const trades = await prisma.trade.findMany({
    where: {
      OR: [{ initiatorId: userId }, { receiverId: userId }],
    },
    include: {
      tradeItems: {
        include: { item: { select: { id: true, title: true, images: { where: { isPrimary: true }, take: 1 } } } },
      },
      initiator: { select: { id: true, profile: { select: { firstName: true, lastName: true, avatarUrl: true } } } },
      receiver: { select: { id: true, profile: { select: { firstName: true, lastName: true, avatarUrl: true } } } },
    },
    orderBy: { createdAt: 'desc' },
  });

  return trades;
};

module.exports = { createTrade, acceptTrade, rejectTrade, getUserTrades };
