// ============================================================
// TAKASON - Kullanıcıya Özel Rotalar
// /users/me/* (ilanlar, takaslar, favoriler), /addresses, /leaderboard
// ============================================================

const express = require('express');
const router = express.Router();
const { prisma } = require('../config/database');
const { authenticate } = require('../middlewares/auth');
const { AppError, asyncHandler } = require('../middlewares/errorHandler');

// ============================================================
// LEADERBOARD - Public
// ============================================================
router.get('/leaderboard', asyncHandler(async (req, res) => {
  const limit = Math.min(parseInt(req.query.limit) || 50, 100);
  const profiles = await prisma.profile.findMany({
    where: { score: { gt: 0 } },
    orderBy: { score: 'desc' },
    take: limit,
    select: {
      firstName: true,
      lastName: true,
      score: true,
      swapsCompleted: true,
      medal: true,
      bio: true,
      avatarUrl: true,
      isPremium: true,
      city: true,
      user: { select: { id: true } },
    },
  });
  const data = profiles.map((p, i) => ({
    rank: i + 1,
    userId: p.user.id,
    name: `${p.firstName} ${p.lastName.charAt(0)}.`,
    fullName: `${p.firstName} ${p.lastName}`,
    swaps: p.swapsCompleted,
    score: p.score,
    medal: p.medal,
    bio: p.bio,
    avatarUrl: p.avatarUrl,
    isPremium: p.isPremium,
    city: p.city,
  }));
  res.json({ success: true, data });
}));

// ============================================================
// USERS/ME - korumalı
// ============================================================
router.use('/users/me', authenticate);

router.get('/users/me/ads', asyncHandler(async (req, res) => {
  const status = req.query.status; // optional
  const where = { userId: req.user.id };
  if (status) where.status = status;
  const items = await prisma.item.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    include: {
      category: { select: { id: true, name: true, slug: true } },
      images: { where: { isPrimary: true }, take: 1 },
      _count: { select: { favorites: true } },
    },
  });
  res.json({ success: true, data: items });
}));

router.get('/users/me/trades', asyncHandler(async (req, res) => {
  const status = req.query.status;
  const where = {
    OR: [{ senderId: req.user.id }, { receiverId: req.user.id }],
  };
  if (status) where.status = status;
  const trades = await prisma.trade.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    include: {
      sender: { include: { profile: true } },
      receiver: { include: { profile: true } },
      tradeItems: {
        include: { item: { include: { images: { where: { isPrimary: true }, take: 1 } } } },
      },
    },
  });
  res.json({ success: true, data: trades });
}));

router.get('/users/me/favorites', asyncHandler(async (req, res) => {
  const favorites = await prisma.favorite.findMany({
    where: { userId: req.user.id },
    orderBy: { createdAt: 'desc' },
    include: {
      item: {
        include: {
          category: { select: { id: true, name: true } },
          user: { include: { profile: { select: { firstName: true, lastName: true, avatarUrl: true } } } },
          images: { where: { isPrimary: true }, take: 1 },
        },
      },
    },
  });
  res.json({ success: true, data: favorites.map((f) => f.item) });
}));

router.patch('/users/me/profile', asyncHandler(async (req, res) => {
  const { firstName, lastName, phone, city, country, bio, avatarUrl } = req.body;
  const data = {};
  for (const [k, v] of Object.entries({ firstName, lastName, phone, city, country, bio, avatarUrl })) {
    if (v !== undefined) data[k] = v;
  }
  const profile = await prisma.profile.update({
    where: { userId: req.user.id },
    data,
  });
  res.json({ success: true, data: profile });
}));

// ============================================================
// ADDRESSES - korumalı CRUD
// ============================================================
router.use('/addresses', authenticate);

router.get('/addresses', asyncHandler(async (req, res) => {
  const data = await prisma.address.findMany({
    where: { userId: req.user.id },
    orderBy: { createdAt: 'desc' },
  });
  res.json({ success: true, data });
}));

router.post('/addresses', asyncHandler(async (req, res) => {
  const { title, address, type, city, isDefault } = req.body;
  if (!title || !address) throw new AppError('Başlık ve adres gerekli', 400);
  if (isDefault) {
    await prisma.address.updateMany({ where: { userId: req.user.id }, data: { isDefault: false } });
  }
  const data = await prisma.address.create({
    data: { userId: req.user.id, title, address, type: type || 'HOME', city, isDefault: !!isDefault },
  });
  res.status(201).json({ success: true, data });
}));

router.patch('/addresses/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const existing = await prisma.address.findUnique({ where: { id } });
  if (!existing || existing.userId !== req.user.id) throw new AppError('Adres bulunamadı', 404);
  const { title, address, type, city, isDefault } = req.body;
  if (isDefault) {
    await prisma.address.updateMany({ where: { userId: req.user.id }, data: { isDefault: false } });
  }
  const data = await prisma.address.update({
    where: { id },
    data: { title, address, type, city, isDefault: !!isDefault },
  });
  res.json({ success: true, data });
}));

router.delete('/addresses/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const existing = await prisma.address.findUnique({ where: { id } });
  if (!existing || existing.userId !== req.user.id) throw new AppError('Adres bulunamadı', 404);
  await prisma.address.delete({ where: { id } });
  res.json({ success: true, message: 'Adres silindi' });
}));

// ============================================================
// MESSAGES (basit) - korumalı
// ============================================================
router.use('/messages', authenticate);

// POST /messages/start — userId ile sohbet başlat ya da getir
router.post('/messages/start', asyncHandler(async (req, res) => {
  const { userId } = req.body;
  if (!userId) throw new AppError('userId gerekli', 400);
  if (userId === req.user.id) throw new AppError('Kendinizle sohbet başlatamazsınız', 400);
  const target = await prisma.user.findUnique({ where: { id: userId }, select: { id: true } });
  if (!target) throw new AppError('Kullanıcı bulunamadı', 404);

  let room = await prisma.chatRoom.findFirst({
    where: {
      AND: [
        { users: { some: { id: req.user.id } } },
        { users: { some: { id: userId } } },
      ],
    },
  });
  if (!room) {
    room = await prisma.chatRoom.create({
      data: {
        userIds: [req.user.id, userId].sort().join(','),
        users: { connect: [{ id: req.user.id }, { id: userId }] },
      },
    });
  }
  res.json({ success: true, data: { id: room.id } });
}));

router.get('/messages', asyncHandler(async (req, res) => {
  // Kullanıcının dahil olduğu sohbet odaları + son mesaj
  const rooms = await prisma.chatRoom.findMany({
    where: { users: { some: { id: req.user.id } } },
    include: {
      users: { include: { profile: true } },
      messages: { orderBy: { createdAt: 'desc' }, take: 1 },
    },
    orderBy: { updatedAt: 'desc' },
  });
  const data = rooms.map((r) => {
    const other = r.users.find((u) => u.id !== req.user.id);
    const last = r.messages[0];
    return {
      id: r.id,
      user: other ? `${other.profile?.firstName || 'Kullanıcı'} ${(other.profile?.lastName || '').charAt(0)}.` : 'Kullanıcı',
      userId: other?.id,
      initials: (other?.profile?.firstName?.[0] || 'K').toUpperCase(),
      msg: last?.content || '',
      time: last?.createdAt || r.updatedAt,
      unread: 0,
      online: false,
    };
  });
  res.json({ success: true, data });
}));

router.get('/messages/:roomId', asyncHandler(async (req, res) => {
  const room = await prisma.chatRoom.findFirst({
    where: { id: req.params.roomId, users: { some: { id: req.user.id } } },
    include: {
      messages: { orderBy: { createdAt: 'asc' }, include: { sender: { include: { profile: true } } } },
      users: { include: { profile: true } },
    },
  });
  if (!room) throw new AppError('Sohbet bulunamadı', 404);
  res.json({ success: true, data: room });
}));

router.post('/messages/:roomId', asyncHandler(async (req, res) => {
  const { content } = req.body;
  if (!content) throw new AppError('İçerik gerekli', 400);
  const room = await prisma.chatRoom.findFirst({
    where: { id: req.params.roomId, users: { some: { id: req.user.id } } },
  });
  if (!room) throw new AppError('Sohbet bulunamadı', 404);
  const message = await prisma.message.create({
    data: { chatRoomId: room.id, senderId: req.user.id, content },
  });
  await prisma.chatRoom.update({ where: { id: room.id }, data: { updatedAt: new Date() } });
  res.status(201).json({ success: true, data: message });
}));

// ============================================================
// NOTIFICATIONS - korumalı
// ============================================================
router.use('/notifications', authenticate);

router.get('/notifications', asyncHandler(async (req, res) => {
  const data = await prisma.notification.findMany({
    where: { userId: req.user.id },
    orderBy: { createdAt: 'desc' },
    take: 50,
  });
  res.json({ success: true, data });
}));

router.patch('/notifications/:id/read', asyncHandler(async (req, res) => {
  const n = await prisma.notification.findUnique({ where: { id: req.params.id } });
  if (!n || n.userId !== req.user.id) throw new AppError('Bildirim bulunamadı', 404);
  await prisma.notification.update({ where: { id: n.id }, data: { isRead: true } });
  res.json({ success: true });
}));

module.exports = router;
