// ============================================================
// TAKASON - Kullanıcıya Özel Rotalar
// /users/me/* (ilanlar, takaslar, favoriler), /addresses, /leaderboard
// ============================================================

const express = require('express');
const router = express.Router();
const { prisma } = require('../config/database');
const { authenticate } = require('../middlewares/auth');
const { AppError, asyncHandler } = require('../middlewares/errorHandler');

const { handleUploadSingle } = require('../config/multer');

// Turkish character aware case conversion helper
const trToLower = (str) => {
  if (!str) return '';
  return str
    .replace(/İ/g, 'i').replace(/I/g, 'ı').replace(/Ğ/g, 'ğ').replace(/Ü/g, 'ü')
    .replace(/Ş/g, 'ş').replace(/Ö/g, 'ö').replace(/Ç/g, 'ç').toLowerCase();
};

const normalizeText = (str) => {
  if (!str) return '';
  return trToLower(str)
    .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
    .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c');
};

const wordSimilarity = (word1, word2) => {
  if (word2.startsWith(word1) || word1.startsWith(word2)) {
    return Math.min(word1.length, word2.length) / Math.max(word1.length, word2.length);
  }
  const len1 = word1.length; const len2 = word2.length;
  if (Math.abs(len1 - len2) > 2) return 0;

  const track = Array(len2 + 1).fill(null).map(() => Array(len1 + 1).fill(null));
  for (let i = 0; i <= len1; i += 1) track[0][i] = i;
  for (let j = 0; j <= len2; j += 1) track[j][0] = j;
  for (let j = 1; j <= len2; j += 1) {
    for (let i = 1; i <= len1; i += 1) {
      const indicator = word1[i - 1] === word2[j - 1] ? 0 : 1;
      track[j][i] = Math.min(track[j][i - 1] + 1, track[j - 1][i] + 1, track[j - 1][i - 1] + indicator);
    }
  }
  const distance = track[len2][len1];
  const maxLength = Math.max(len1, len2);
  return (maxLength - distance) / maxLength;
};

// GET /users/search?q= — Kullanıcı arama (herkese açık)
router.get('/users/search', asyncHandler(async (req, res) => {
  const q = (req.query.q || '').trim();
  if (!q) return res.json({ success: true, data: [] });

  const searchWords = q.split(/\s+/).filter(Boolean).map(normalizeText);

  // Küçük çaplı bir platform olduğu için veya pg_trgm eklentisi olmadan
  // fuzzy search yapabilmek için aktif kullanıcıların bir kısmını çekip filtreliyoruz
  const users = await prisma.user.findMany({
    where: { status: 'ACTIVE' },
    select: {
      id: true,
      email: true,
      profile: {
        select: {
          firstName: true, lastName: true, avatarUrl: true,
          city: true, isPremium: true, score: true, swapsCompleted: true,
          bio: true,
        },
      },
      _count: { select: { items: true } },
    },
  });

  const scoredUsers = users.map(u => {
    const normFirstName = normalizeText(u.profile?.firstName);
    const normLastName = normalizeText(u.profile?.lastName);
    const normEmail = normalizeText(u.email);
    const normCity = normalizeText(u.profile?.city);

    const combinedWords = `${normFirstName} ${normLastName} ${normEmail} ${normCity}`.split(/\s+/).filter(Boolean);
    
    let score = 0;
    
    for (const word of searchWords) {
      let bestSim = 0;
      for (const tWord of combinedWords) {
        const sim = wordSimilarity(word, tWord);
        if (sim > bestSim) bestSim = sim;
      }
      
      if (bestSim >= 0.65) {
        score += bestSim * 10;
      }
      
      // Exact prefix match in first/last name gives high boost
      if (normFirstName.startsWith(word) || normLastName.startsWith(word)) {
        score += 15;
      }
      // City match
      if (normCity && normCity.includes(word)) {
        score += 5;
      }
    }

    return { ...u, _searchScore: score };
  }).filter(u => u._searchScore >= 6.5); // Sadece eşleşme skoru yeterli olanları al

  // Yüksek puandan düşüğe sırala
  scoredUsers.sort((a, b) => b._searchScore - a._searchScore);

  // İlk 20 kullanıcıyı döndür
  const topUsers = scoredUsers.slice(0, 20);

  const data = topUsers.map((u) => ({
    id: u.id,
    firstName: u.profile?.firstName || '',
    lastName:  u.profile?.lastName  || '',
    avatarUrl: u.profile?.avatarUrl || null,
    city: u.profile?.city || '',
    isPremium: u.profile?.isPremium || false,
    score: u.profile?.score || 0,
    swapsCompleted: u.profile?.swapsCompleted || 0,
    bio: u.profile?.bio || '',
    itemCount: u._count.items,
    _matchScore: u._searchScore.toFixed(2)
  }));

  res.json({ success: true, data });
}));

// GET /users/:id/public — Herkese açık kullanıcı profili + ilanları
router.get('/users/:id/public', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      createdAt: true,
      profile: {
        select: {
          firstName: true, lastName: true, avatarUrl: true,
          city: true, isPremium: true, score: true,
          swapsCompleted: true, bio: true, medal: true,
        },
      },
    },
  });
  if (!user) throw new AppError('Kullanıcı bulunamadı', 404);

  const items = await prisma.item.findMany({
    where: { userId: id, status: 'ACTIVE' },
    orderBy: { createdAt: 'desc' },
    include: {
      category: { select: { id: true, name: true } },
      images:   { where: { isPrimary: true }, take: 1 },
      _count:   { select: { favorites: true } },
    },
  });

  res.json({
    success: true,
    data: {
      id: user.id,
      createdAt: user.createdAt,
      firstName: user.profile?.firstName || '',
      lastName:  user.profile?.lastName  || '',
      avatarUrl: user.profile?.avatarUrl || null,
      city:      user.profile?.city      || null,
      isPremium: user.profile?.isPremium || false,
      score:     user.profile?.score     || 0,
      swapsCompleted: user.profile?.swapsCompleted || 0,
      bio:       user.profile?.bio       || null,
      medal:     user.profile?.medal     || null,
      items,
    },
  });
}));

// ============================================================
// LEADERBOARD - Public (opsiyonel auth: token varsa 'me' döner)
// ============================================================
router.get('/leaderboard', asyncHandler(async (req, res) => {
  const limit = Math.min(parseInt(req.query.limit) || 50, 100);

  // Token varsa kullanıcıyı çöz (zorunlu değil)
  let currentUserId = null;
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith('Bearer ')) {
    try {
      const { verifyAccessToken } = require('../utils/jwt');
      const decoded = verifyAccessToken(authHeader.split(' ')[1]);
      currentUserId = decoded?.userId || null;
    } catch (_) { /* geçersiz token — yoksay */ }
  }

  // Paralel olarak toplam kullanıcı sayısını ve sadece ilk limit kadar profili çekiyoruz
  const [totalUsers, topProfiles] = await Promise.all([
    prisma.profile.count(),
    prisma.profile.findMany({
      take: limit,
      orderBy: { score: 'desc' },
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
    })
  ]);

  let myRank = null;
  let myProfile = null;

  if (currentUserId) {
    // Giriş yapmış kullanıcının profil detaylarını al
    myProfile = await prisma.profile.findUnique({
      where: { userId: currentUserId },
      select: {
        firstName: true,
        lastName: true,
        score: true,
        swapsCompleted: true,
        medal: true,
        avatarUrl: true,
        user: { select: { id: true } },
      }
    });

    if (myProfile) {
      // Kendisinden daha yüksek skora sahip kaç kişi olduğunu sayarak sıralamasını bul
      const higherScoreCount = await prisma.profile.count({
        where: {
          score: { gt: myProfile.score }
        }
      });
      myRank = higherScoreCount + 1;
    }
  }

  const data = topProfiles.map((p, i) => ({
    rank: i + 1,
    userId: p.user.id,
    name: `${p.firstName} ${p.lastName.charAt(0)}.`,
    fullName: `${p.firstName} ${p.lastName}`,
    swaps: p.swapsCompleted,
    score: p.score,
    medal: p.medal || null,
    bio: p.bio,
    avatarUrl: p.avatarUrl,
    isPremium: p.isPremium,
    city: p.city,
    isMe: currentUserId ? p.user.id === currentUserId : false,
  }));

  const me = myProfile ? {
    rank: myRank,
    name: `${myProfile.firstName} ${myProfile.lastName.charAt(0)}.`,
    swaps: myProfile.swapsCompleted,
    score: myProfile.score,
    avatarUrl: myProfile.avatarUrl,
    medal: myProfile.medal || null,
  } : null;

  res.json({ success: true, data, me, totalUsers });
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
  if (req.is('multipart')) {
    try {
      await handleUploadSingle(req, res);
    } catch (err) {
      throw new AppError(err.message || 'Dosya yükleme hatası', 400);
    }
  }

  const { firstName, lastName, phone, city, country, bio } = req.body;
  let { avatarUrl } = req.body;

  if (req.file) {
    const normalizedPath = req.file.path.replace(/\\/g, '/');
    avatarUrl = normalizedPath.startsWith('/') ? normalizedPath : `/${normalizedPath}`;
  }

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

// GET /messages/can-chat/:userId?itemId= — İki kullanıcı arası takas var mı?
// itemId verilirse: o ilana ait teklif var mı diye bakar (ilan bazlı).
// itemId verilmezse: iki kullanıcı arasında herhangi bir takas var mı diye bakar.
router.get('/messages/can-chat/:userId', authenticate, asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { itemId } = req.query;
  console.log('[can-chat] req.user.id:', req.user.id, 'userId:', userId, 'itemId:', itemId);
  if (userId === req.user.id) return res.json({ success: true, data: { canChat: false } });

  let trade;

  if (itemId) {
    // Bu ilan için teklif gönderilmiş mi? (gönderen veya alan olabilir)
    trade = await prisma.trade.findFirst({
      where: {
        OR: [
          {
            senderId: req.user.id,
            receiverId: userId,
            tradeItems: { some: { itemId } },
          },
          {
            senderId: userId,
            receiverId: req.user.id,
            tradeItems: { some: { itemId } },
          },
        ],
      },
      select: { id: true, status: true },
    });
  } else {
    // Genel kontrol: herhangi bir trade
    trade = await prisma.trade.findFirst({
      where: {
        OR: [
          { senderId: req.user.id, receiverId: userId },
          { senderId: userId, receiverId: req.user.id },
        ],
      },
      select: { id: true, status: true },
    });
  }

  res.json({ success: true, data: { canChat: !!trade, tradeStatus: trade?.status || null } });
}));

// POST /messages/start — userId ile sohbet başlat ya da getir
router.post('/messages/start', asyncHandler(async (req, res) => {
  const { userId } = req.body;
  if (!userId) throw new AppError('userId gerekli', 400);
  if (userId === req.user.id) throw new AppError('Kendinizle sohbet başlatamazsınız', 400);
  const target = await prisma.user.findUnique({ where: { id: userId }, select: { id: true } });
  if (!target) throw new AppError('Kullanıcı bulunamadı', 404);

  // Takas teklifi kontrolü: aralarında en az 1 takas teklifi olmalı
  // itemId verilmişse o ilan bazında, verilmemişse genel kontrol
  const { itemId } = req.body;
  let trade;
  if (itemId) {
    trade = await prisma.trade.findFirst({
      where: {
        OR: [
          { senderId: req.user.id, receiverId: userId, tradeItems: { some: { itemId } } },
          { senderId: userId, receiverId: req.user.id, tradeItems: { some: { itemId } } },
        ],
      },
      select: { id: true },
    });
  } else {
    trade = await prisma.trade.findFirst({
      where: {
        OR: [
          { senderId: req.user.id, receiverId: userId },
          { senderId: userId, receiverId: req.user.id },
        ],
      },
      select: { id: true },
    });
  }
  if (!trade) {
    throw new AppError(
      'Mesajlaşabilmek için önce bu ilan için bir takas teklifi göndermeniz gerekmektedir.',
      403
    );
  }

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

router.get('/messages/unread-count', asyncHandler(async (req, res) => {
  // Kullanıcıya ait tüm sohbet odaları
  const rooms = await prisma.chatRoom.findMany({
    where: { users: { some: { id: req.user.id } } },
    select: { id: true },
  });
  const roomIds = rooms.map(r => r.id);

  // Başkası tarafından gönderilmiş ve okunmamış mesajlar
  const count = await prisma.message.count({
    where: {
      chatRoomId: { in: roomIds },
      senderId: { not: req.user.id },
      isRead: false,
    },
  });
  res.json({ success: true, data: { unread: count } });
}));

router.get('/messages', asyncHandler(async (req, res) => {
  // Kullanıcının dahil olduğu sohbet odaları + son mesaj
  const rooms = await prisma.chatRoom.findMany({
    where: { users: { some: { id: req.user.id } } },
    include: {
      users: { include: { profile: true } },
      messages: { orderBy: { createdAt: 'desc' }, take: 1 },
      _count: {
        select: {
          messages: true,
        },
      },
    },
    orderBy: { updatedAt: 'desc' },
  });

  // Her oda için okunmamış mesaj sayısını ayrı çek
  const roomIds = rooms.map(r => r.id);
  const unreadCounts = await prisma.message.groupBy({
    by: ['chatRoomId'],
    where: {
      chatRoomId: { in: roomIds },
      senderId: { not: req.user.id },
      isRead: false,
    },
    _count: { id: true },
  });
  const unreadMap = Object.fromEntries(unreadCounts.map(u => [u.chatRoomId, u._count.id]));

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
      unread: unreadMap[r.id] || 0,
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

// Odadaki tüm okunmamış mesajları okundu yap (kullanıcı odaya girdiğinde)
router.patch('/messages/:roomId/read', asyncHandler(async (req, res) => {
  const room = await prisma.chatRoom.findFirst({
    where: { id: req.params.roomId, users: { some: { id: req.user.id } } },
  });
  if (!room) throw new AppError('Sohbet bulunamadı', 404);
  await prisma.message.updateMany({
    where: {
      chatRoomId: room.id,
      senderId: { not: req.user.id },
      isRead: false,
    },
    data: { isRead: true },
  });
  res.json({ success: true });
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

// ============================================================
// REVIEWS (Kullanıcı ve Ürün Puanlama) - raw SQL (tablolar prisma şemasında yok)
// ============================================================

// GET /reviews/user/:userId — kullanıcının aldığı puanlar (public)
router.get('/reviews/user/:userId', asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const rows = await prisma.$queryRaw`
    SELECT ur.id, ur.score, ur.comment, ur.created_at,
           p.first_name, p.last_name, p.avatar_url
    FROM user_reviews ur
    JOIN users u ON u.id = ur.author_id
    LEFT JOIN profiles p ON p.user_id = ur.author_id
    WHERE ur.user_id = ${userId}
    ORDER BY ur.created_at DESC
    LIMIT 50
  `;
  const avg = rows.length ? rows.reduce((s, r) => s + r.score, 0) / rows.length : null;
  res.json({ success: true, data: { reviews: rows.map(r => ({
    id: r.id, score: Number(r.score), comment: r.comment, createdAt: r.created_at,
    author: { firstName: r.first_name, lastName: r.last_name, avatarUrl: r.avatar_url },
  })), avg, count: rows.length } });
}));

// POST /reviews/user/:userId — kullanıcıya puan ver
router.post('/reviews/user/:userId', authenticate, asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { score, comment } = req.body;
  if (userId === req.user.id) throw new AppError('Kendinize puan veremezsiniz.', 400);
  if (!score || score < 1 || score > 5) throw new AppError('Puan 1-5 arasında olmalı.', 400);

  // target kullanıcı var mı?
  const target = await prisma.user.findUnique({ where: { id: userId } });
  if (!target) throw new AppError('Kullanıcı bulunamadı.', 404);

  await prisma.$executeRaw`
    INSERT INTO user_reviews (id, author_id, user_id, score, comment)
    VALUES (gen_random_uuid()::text, ${req.user.id}, ${userId}, ${Math.round(score)}, ${comment || null})
    ON CONFLICT (author_id, user_id) DO UPDATE SET score = EXCLUDED.score, comment = EXCLUDED.comment
  `;
  res.json({ success: true, message: 'Puan kaydedildi.' });
}));

// GET /reviews/item/:itemId — ürünün aldığı puanlar (public)
router.get('/reviews/item/:itemId', asyncHandler(async (req, res) => {
  const { itemId } = req.params;
  const rows = await prisma.$queryRaw`
    SELECT ir.id, ir.score, ir.comment, ir.created_at,
           p.first_name, p.last_name, p.avatar_url
    FROM item_reviews ir
    JOIN users u ON u.id = ir.author_id
    LEFT JOIN profiles p ON p.user_id = ir.author_id
    WHERE ir.item_id = ${itemId}
    ORDER BY ir.created_at DESC
    LIMIT 50
  `;
  const avg = rows.length ? rows.reduce((s, r) => s + r.score, 0) / rows.length : null;
  res.json({ success: true, data: { reviews: rows.map(r => ({
    id: r.id, score: Number(r.score), comment: r.comment, createdAt: r.created_at,
    author: { firstName: r.first_name, lastName: r.last_name, avatarUrl: r.avatar_url },
  })), avg, count: rows.length } });
}));

// POST /reviews/item/:itemId — ürüne puan ver
router.post('/reviews/item/:itemId', authenticate, asyncHandler(async (req, res) => {
  const { itemId } = req.params;
  const { score, comment } = req.body;
  if (!score || score < 1 || score > 5) throw new AppError('Puan 1-5 arasında olmalı.', 400);

  const item = await prisma.item.findUnique({ where: { id: itemId } });
  if (!item) throw new AppError('İlan bulunamadı.', 404);
  if (item.userId === req.user.id) throw new AppError('Kendi ilanınıza puan veremezsiniz.', 400);

  await prisma.$executeRaw`
    INSERT INTO item_reviews (id, author_id, item_id, score, comment)
    VALUES (gen_random_uuid()::text, ${req.user.id}, ${itemId}, ${Math.round(score)}, ${comment || null})
    ON CONFLICT (author_id, item_id) DO UPDATE SET score = EXCLUDED.score, comment = EXCLUDED.comment
  `;
  res.json({ success: true, message: 'Puan kaydedildi.' });
}));

// GET /reviews/my/user/:userId — giriş yapan kullanıcının bu kişiye verdiği puan
router.get('/reviews/my/user/:userId', authenticate, asyncHandler(async (req, res) => {
  const rows = await prisma.$queryRaw`
    SELECT score, comment FROM user_reviews WHERE author_id = ${req.user.id} AND user_id = ${req.params.userId}
  `;
  res.json({ success: true, data: rows[0] || null });
}));

// GET /reviews/my/item/:itemId — giriş yapan kullanıcının bu ürüne verdiği puan
router.get('/reviews/my/item/:itemId', authenticate, asyncHandler(async (req, res) => {
  const rows = await prisma.$queryRaw`
    SELECT score, comment FROM item_reviews WHERE author_id = ${req.user.id} AND item_id = ${req.params.itemId}
  `;
  res.json({ success: true, data: rows[0] || null });
}));

module.exports = router;
