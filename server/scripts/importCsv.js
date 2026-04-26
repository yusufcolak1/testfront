// ============================================================
// TAKASON - CSV Import Script (Final Robust V2)
// Imports data from server/data_imports/*.csv into SQLite
// ============================================================

const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const prisma = new PrismaClient();

const DATA_DIR = path.join(__dirname, '..', 'data_imports');

function parseCsv(filePath) {
  if (!fs.existsSync(filePath)) return [];
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split(/\r?\n/).filter(l => l.trim() !== '');
  if (lines.length < 2) return [];

  const headers = lines[0].split(',').map(h => h.trim());
  return lines.slice(1).map(line => {
    const values = line.split(',');
    const obj = {};
    headers.forEach((header, i) => {
      let val = values[i] !== undefined ? values[i].trim() : null;
      if (val === '' || val === 'null') val = null;
      obj[header] = val;
    });
    return obj;
  });
}

const toBool = (val) => val === true || val === 'true' || val === '1' || val === 1;
const toNum = (val) => (val === null || val === '' || isNaN(val)) ? null : Number(val);

async function runImport() {
  console.log('🚀 CSV Import başlatılıyor (Final V2)...');

  try {
    console.log('  → Mevcut veriler temizleniyor...');
    const tables = [
        'notification', 'message', 'chatRoom', 'favorite', 'tradeItem', 
        'trade', 'itemImage', 'item', 'profile', 'address', 'user', 'category'
    ];
    for (const table of tables) {
        await prisma[table].deleteMany({});
    }

    // 1. Kategoriler
    console.log('  → Kategoriler...');
    const categories = parseCsv(path.join(DATA_DIR, 'categories.csv'));
    for (const cat of categories) {
      if (!cat.id) continue;
      await prisma.category.upsert({
        where: { id: cat.id },
        update: { name: cat.name, slug: cat.slug, icon: cat.image_url || null, parentId: null },
        create: { id: cat.id, name: cat.name, slug: cat.slug, icon: cat.image_url || null, parentId: null }
      });
    }
    for (const cat of categories) {
      if (cat.id && cat.parent_id && cat.parent_id !== '0' && cat.parent_id !== cat.id) {
          try {
              await prisma.category.update({ where: { id: cat.id }, data: { parentId: cat.parent_id } });
          } catch (e) {}
      }
    }

    // 2. Kullanıcılar
    console.log('  → Kullanıcılar...');
    const users = parseCsv(path.join(DATA_DIR, 'users.csv'));
    for (const u of users) {
      if (!u.id) continue;
      await prisma.user.upsert({
        where: { id: u.id },
        update: { email: u.email, passwordHash: u.password_hash, role: u.role || 'USER', status: u.status || 'ACTIVE' },
        create: { id: u.id, email: u.email, passwordHash: u.password_hash, role: u.role || 'USER', status: u.status || 'ACTIVE' }
      });
    }

    // 3. Profiller
    console.log('  → Profiller...');
    const profiles = parseCsv(path.join(DATA_DIR, 'user_profiles.csv'));
    for (const p of profiles) {
      if (!p.user_id) continue;
      await prisma.profile.upsert({
        where: { userId: p.user_id },
        update: {
          firstName: p.first_name || 'Kullanıcı',
          lastName: p.last_name || '',
          phone: p.phone,
          city: p.city,
          avatarUrl: p.avatar_url,
          score: toNum(p.trust_score) || 0,
        },
        create: {
          id: p.id || undefined,
          userId: p.user_id,
          firstName: p.first_name || 'Kullanıcı',
          lastName: p.last_name || '',
          phone: p.phone,
          city: p.city,
          avatarUrl: p.avatar_url,
          score: toNum(p.trust_score) || 0,
        }
      });
    }

    // 4. İlanlar
    console.log('  → İlanlar...');
    const itemsJson = parseCsv(path.join(DATA_DIR, 'items.csv'));
    for (const it of itemsJson) {
      if (!it.id) continue;
      await prisma.item.upsert({
        where: { id: it.id },
        update: {
          userId: it.user_id,
          categoryId: it.category_id,
          title: it.title,
          description: it.description || '',
          condition: it.condition || 'GOOD',
          status: it.status || 'ACTIVE',
          location: it.city || it.location || null,
          estimatedValue: toNum(it.estimated_value),
        },
        create: {
          id: it.id,
          userId: it.user_id,
          categoryId: it.category_id,
          title: it.title,
          description: it.description || '',
          condition: it.condition || 'GOOD',
          status: it.status || 'ACTIVE',
          location: it.city || it.location || null,
          estimatedValue: toNum(it.estimated_value),
        }
      });
    }

    // 5. İlan Resimleri
    console.log('  → Resimler...');
    const images = parseCsv(path.join(DATA_DIR, 'item_images.csv'));
    for (const img of images) {
      if (!img.id) continue;
      await prisma.itemImage.upsert({
        where: { id: img.id },
        update: { itemId: img.item_id, imageUrl: img.image_url, isPrimary: toBool(img.is_primary) },
        create: { id: img.id, itemId: img.item_id, imageUrl: img.image_url, isPrimary: toBool(img.is_primary) }
      });
    }

    // 6. Sohbetler
    console.log('  → Sohbetler...');
    const chatRooms = parseCsv(path.join(DATA_DIR, 'chat_rooms.csv'));
    for (const room of chatRooms) {
        if (!room.id) continue;
        let uIds = room.user_ids || (room.buyer_id && room.seller_id ? `${room.buyer_id},${room.seller_id}` : "unknown");
        await prisma.chatRoom.upsert({
            where: { id: room.id },
            update: { userIds: uIds },
            create: { id: room.id, userIds: uIds }
        });
    }

    const messages = parseCsv(path.join(DATA_DIR, 'messages.csv'));
    for (const m of messages) {
        if (!m.id) continue;
        await prisma.message.upsert({
            where: { id: m.id },
            update: { chatRoomId: m.room_id, senderId: m.sender_id, content: m.content, isRead: toBool(m.is_read) },
            create: { id: m.id, chatRoomId: m.room_id, senderId: m.sender_id, content: m.content, isRead: toBool(m.is_read) }
        });
    }

    // 7. Takaslar
    console.log('  → Takaslar...');
    const trades = parseCsv(path.join(DATA_DIR, 'trades.csv'));
    for (const t of trades) {
        if (!t.id) continue;
        const senderId = t.initiator_id || t.sender_id;
        const message = t.note || t.message;
        await prisma.trade.upsert({
            where: { id: t.id },
            update: { senderId: senderId, receiverId: t.receiver_id, status: t.status, message: message },
            create: { id: t.id, senderId: senderId, receiverId: t.receiver_id, status: t.status, message: message }
        });
    }

    const tradeItems = parseCsv(path.join(DATA_DIR, 'trade_items.csv'));
    for (const ti of tradeItems) {
        if (!ti.trade_id || !ti.item_id) continue;
        try {
            await prisma.tradeItem.create({
                data: { tradeId: ti.trade_id, itemId: ti.item_id, side: ti.side || 'OFFER' }
            });
        } catch (e) {}
    }

    console.log('✅ CSV Import başarıyla tamamlandı.');
    console.log('✨ Takason sistemi içeriklerle hazır.');
  } catch (error) {
    console.error('❌ Hata:', error);
  } finally {
    await prisma.$disconnect();
  }
}

runImport();
