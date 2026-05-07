// ============================================================
// TAKASON - Socket.io Servis Katmanı
// Gerçek zamanlı mesajlaşma ve bildirimler
// ============================================================

const prisma = require('../config/database');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

// Çevrimiçi kullanıcıların socket ID'lerini tutan harita
// Sonraki aşamada Redis'e taşınacak: Map yerine Redis SET
const onlineUsers = new Map(); // userId -> Set<socketId>

const initializeSocket = (io) => {
  // ============================================================
  // Bağlantı Kimlik Doğrulama Middleware
  // ============================================================
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth?.token || socket.handshake.headers?.authorization?.split(' ')[1];

      if (!token) {
        return next(new Error('Kimlik doğrulama tokeni bulunamadı.'));
      }

      const decoded = jwt.verify(token, jwtConfig.accessToken.secret);
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: { id: true, role: true, status: true },
      });

      if (!user || user.status !== 'ACTIVE') {
        return next(new Error('Geçersiz kullanıcı.'));
      }

      socket.userId = user.id;
      socket.userRole = user.role;
      next();
    } catch (err) {
      next(new Error('Token doğrulama başarısız.'));
    }
  });

  // ============================================================
  // Bağlantı Eventleri
  // ============================================================
  io.on('connection', (socket) => {
    const userId = socket.userId;
    console.log(`🟢 Kullanıcı bağlandı: ${userId} (Socket: ${socket.id})`);

    // Çevrimiçi haritaya ekle
    if (!onlineUsers.has(userId)) {
      onlineUsers.set(userId, new Set());
    }
    onlineUsers.get(userId).add(socket.id);

    // Kullanıcıyı kendi odasına katılmaya zorla (kişisel bildirimler için)
    socket.join(`user:${userId}`);

    // ---- Sohbet Odasına Katıl ----
    socket.on('join_room', async ({ roomId }) => {
      try {
        // Kullanıcı bu odaya yetkili mi?
        const room = await prisma.chatRoom.findFirst({
          where: {
            id: roomId,
            OR: [{ buyerId: userId }, { sellerId: userId }],
          },
        });

        if (!room) {
          socket.emit('error', { message: 'Bu odaya erişim yetkiniz yok.' });
          return;
        }

        socket.join(`room:${roomId}`);
        socket.emit('joined_room', { roomId });
        console.log(`📬 ${userId} odaya katıldı: ${roomId}`);
      } catch (err) {
        socket.emit('error', { message: 'Odaya katılma başarısız.' });
      }
    });

    // ---- Mesaj Gönder ----
    socket.on('send_message', async ({ roomId, content, type = 'TEXT' }) => {
      try {
        if (!content || content.trim().length === 0) return;

        // Kullanıcı bu odaya yetkili mi?
        const room = await prisma.chatRoom.findFirst({
          where: {
            id: roomId,
            OR: [{ buyerId: userId }, { sellerId: userId }],
            isActive: true,
          },
        });

        if (!room) {
          socket.emit('error', { message: 'Bu odaya mesaj gönderme yetkiniz yok.' });
          return;
        }

        // Mesajı veritabanına kaydet
        const message = await prisma.message.create({
          data: {
            roomId,
            senderId: userId,
            content: content.trim(),
            type,
          },
          include: {
            sender: {
              select: { id: true, profile: { select: { firstName: true, lastName: true, avatarUrl: true } } },
            },
          },
        });

        // Odadaki herkese yay
        io.to(`room:${roomId}`).emit('new_message', message);

        // Karşı tarafın kişisel odasına bildirim gönder
        const otherUserId = room.buyerId === userId ? room.sellerId : room.buyerId;
        io.to(`user:${otherUserId}`).emit('message_notification', {
          roomId,
          message: content.substring(0, 50), // İlk 50 karakter önizleme
          senderId: userId,
        });
      } catch (err) {
        console.error('Mesaj gönderme hatası:', err);
        socket.emit('error', { message: 'Mesaj gönderilemedi.' });
      }
    });

    // ---- Mesaj Okundu ----
    socket.on('mark_as_read', async ({ roomId }) => {
      try {
        await prisma.message.updateMany({
          where: { roomId, senderId: { not: userId }, isRead: false },
          data: { isRead: true },
        });

        socket.to(`room:${roomId}`).emit('messages_read', { roomId, readBy: userId });
      } catch (err) {
        console.error('Okundu işareti hatası:', err);
      }
    });

    // ---- Yazıyor Göstergesi ----
    socket.on('typing', ({ roomId, isTyping }) => {
      socket.to(`room:${roomId}`).emit('user_typing', { userId, isTyping });
    });

    // ---- Bağlantı Kesildi ----
    socket.on('disconnect', () => {
      const userSockets = onlineUsers.get(userId);
      if (userSockets) {
        userSockets.delete(socket.id);
        if (userSockets.size === 0) {
          onlineUsers.delete(userId);
        }
      }
      console.log(`🔴 Kullanıcı ayrıldı: ${userId}`);
    });
  });

  return io;
};

// Belirli bir kullanıcı çevrimiçi mi?
const isUserOnline = (userId) => onlineUsers.has(userId);

// Kullanıcıya socket üzerinden bildirim gönder
const sendNotificationToUser = (io, userId, event, data) => {
  io.to(`user:${userId}`).emit(event, data);
};

module.exports = { initializeSocket, isUserOnline, sendNotificationToUser };
