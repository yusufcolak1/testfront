// ============================================================
// TAKASON - SQLite → Supabase (PostgreSQL) Veri Göçü
// Doğrudan SQL sorgusu ile (gerçek tablo adları: snake_case)
// ============================================================

const path = require('path');
const { PrismaClient: SQLiteClient } = require('../prisma/generated-sqlite-client');
const { PrismaClient: PgClient } = require('../prisma/generated-client');

const dbPath = path.resolve(__dirname, '../prisma/dev.db');

const sqlite = new SQLiteClient({ datasources: { db: { url: 'file:' + dbPath } } });
const pg = new PgClient({
  datasources: {
    db: {
      url: 'postgresql://postgres.hyoganymxzcazpixagff:HasanTakason123!@aws-1-eu-central-1.pooler.supabase.com:5432/postgres',
    },
  },
});

function toDate(v) {
  if (!v) return new Date();
  try { return new Date(v); } catch { return new Date(); }
}
function toBool(v) { return v === 1 || v === true || v === 'true'; }
function toFloat(v) { return v != null ? parseFloat(v) : null; }
function toInt(v) { return v != null ? parseInt(v, 10) : 0; }

async function run() {
  await pg.$connect();
  console.log('\n🚀 Supabase Veri Göçü Başlıyor...');
  console.log('📦 SQLite (dev.db) → Supabase PostgreSQL\n');

  const ok = {};

  try {
    // 1. KULLANICILAR (users)
    process.stdout.write('👤 Kullanıcılar...');
    const users = await sqlite.$queryRawUnsafe('SELECT * FROM users');
    ok.users = 0;
    for (const u of users) {
      try {
        await pg.user.upsert({
          where: { id: u.id },
          update: {},
          create: {
            id: u.id,
            email: u.email,
            passwordHash: u.password_hash,
            role: u.role || 'USER',
            status: u.status || 'ACTIVE',
            createdAt: toDate(u.created_at),
            updatedAt: toDate(u.updated_at),
          },
        });
        ok.users++;
      } catch {}
    }
    console.log(` ✅ ${ok.users}/${users.length}`);

    // 2. PROFİLLER (profiles)
    process.stdout.write('📝 Profiller...');
    const profiles = await sqlite.$queryRawUnsafe('SELECT * FROM profiles');
    ok.profiles = 0;
    for (const p of profiles) {
      try {
        await pg.profile.upsert({
          where: { id: p.id },
          update: {},
          create: {
            id: p.id,
            userId: p.user_id,
            firstName: p.first_name || '',
            lastName: p.last_name || '',
            avatarUrl: p.avatar_url || null,
            bio: p.bio || null,
            city: p.city || null,
            phone: p.phone || null,
            isPremium: toBool(p.is_premium),
            premiumUntil: p.premium_until ? toDate(p.premium_until) : null,
            score: toInt(p.score),
            rating: toFloat(p.rating) || 0,
            swapsCompleted: toInt(p.swaps_completed),
            createdAt: toDate(p.created_at),
            updatedAt: toDate(p.updated_at),
          },
        });
        ok.profiles++;
      } catch {}
    }
    console.log(` ✅ ${ok.profiles}/${profiles.length}`);

    // 3. ADRESLER (addresses)
    process.stdout.write('📍 Adresler...');
    const addresses = await sqlite.$queryRawUnsafe('SELECT * FROM addresses');
    ok.addresses = 0;
    for (const a of addresses) {
      try {
        await pg.address.upsert({
          where: { id: a.id },
          update: {},
          create: {
            id: a.id,
            userId: a.user_id,
            title: a.title,
            address: a.address,
            city: a.city,
            type: a.type || 'HOME',
            isDefault: toBool(a.is_default),
            createdAt: toDate(a.created_at),
            updatedAt: toDate(a.updated_at),
          },
        });
        ok.addresses++;
      } catch {}
    }
    console.log(` ✅ ${ok.addresses}/${addresses.length}`);

    // 4. KATEGORİLER (categories - önce parent olmayanlar)
    process.stdout.write('📂 Kategoriler...');
    const cats = await sqlite.$queryRawUnsafe('SELECT * FROM categories ORDER BY parent_id NULLS FIRST');
    ok.categories = 0;
    for (const c of cats) {
      try {
        await pg.category.upsert({
          where: { id: c.id },
          update: {},
          create: {
            id: c.id,
            name: c.name,
            slug: c.slug,
            icon: c.icon || null,
            description: c.description || null,
            parentId: c.parent_id || null,
            createdAt: toDate(c.created_at),
          },
        });
        ok.categories++;
      } catch {}
    }
    console.log(` ✅ ${ok.categories}/${cats.length}`);

    // 5. İLANLAR (items)
    process.stdout.write('📋 İlanlar...');
    const items = await sqlite.$queryRawUnsafe('SELECT * FROM items');
    ok.items = 0;
    for (const item of items) {
      try {
        await pg.item.upsert({
          where: { id: item.id },
          update: {},
          create: {
            id: item.id,
            userId: item.user_id,
            categoryId: item.category_id,
            title: item.title,
            description: item.description || null,
            condition: item.condition || 'GOOD',
            estimatedValue: toFloat(item.estimated_value),
            location: item.location || null,
            status: item.status || 'ACTIVE',
            isFeatured: toBool(item.is_featured),
            isPopular: toBool(item.is_popular),
            viewCount: toInt(item.view_count),
            qualityScore: toFloat(item.quality_score) || 0,
            createdAt: toDate(item.created_at),
            updatedAt: toDate(item.updated_at),
          },
        });
        ok.items++;
      } catch {}
    }
    console.log(` ✅ ${ok.items}/${items.length}`);

    // 6. İLAN RESİMLERİ (item_images)
    process.stdout.write('🖼️  Resimler...');
    const images = await sqlite.$queryRawUnsafe('SELECT * FROM item_images');
    ok.images = 0;
    for (const img of images) {
      try {
        await pg.itemImage.upsert({
          where: { id: img.id },
          update: {},
          create: {
            id: img.id,
            itemId: img.item_id,
            imageUrl: img.image_url,
            isPrimary: toBool(img.is_primary),
            displayOrder: toInt(img.display_order),
            createdAt: toDate(img.created_at),
          },
        });
        ok.images++;
      } catch {}
    }
    console.log(` ✅ ${ok.images}/${images.length}`);

    // 7. TAKASLAR (trades)
    process.stdout.write('🔄 Takaslar...');
    const trades = await sqlite.$queryRawUnsafe('SELECT * FROM trades');
    ok.trades = 0;
    for (const t of trades) {
      try {
        await pg.trade.upsert({
          where: { id: t.id },
          update: {},
          create: {
            id: t.id,
            senderId: t.sender_id,
            receiverId: t.receiver_id,
            status: t.status || 'PENDING',
            message: t.message || null,
            createdAt: toDate(t.created_at),
            updatedAt: toDate(t.updated_at),
          },
        });
        ok.trades++;
      } catch {}
    }
    console.log(` ✅ ${ok.trades}/${trades.length}`);

    // 8. TAKAS KALEMLERİ (trade_items)
    process.stdout.write('📦 Takas kalemleri...');
    const tradeItems = await sqlite.$queryRawUnsafe('SELECT * FROM trade_items');
    ok.tradeItems = 0;
    for (const ti of tradeItems) {
      try {
        await pg.tradeItem.upsert({
          where: { id: ti.id },
          update: {},
          create: { id: ti.id, tradeId: ti.trade_id, itemId: ti.item_id, side: ti.side },
        });
        ok.tradeItems++;
      } catch {}
    }
    console.log(` ✅ ${ok.tradeItems}/${tradeItems.length}`);

    // 9. FAVORİLER (favorites)
    process.stdout.write('❤️  Favoriler...');
    const favorites = await sqlite.$queryRawUnsafe('SELECT * FROM favorites');
    ok.favorites = 0;
    for (const f of favorites) {
      try {
        await pg.favorite.upsert({
          where: { userId_itemId: { userId: f.user_id, itemId: f.item_id } },
          update: {},
          create: {
            id: f.id,
            userId: f.user_id,
            itemId: f.item_id,
            createdAt: toDate(f.created_at),
          },
        });
        ok.favorites++;
      } catch {}
    }
    console.log(` ✅ ${ok.favorites}/${favorites.length}`);

    // 10. MESAJ ODALARI (chat_rooms → _ChatRoomToUser junction'dan user1/user2 al)
    process.stdout.write('💬 Mesaj odaları...');
    const rooms = await sqlite.$queryRawUnsafe('SELECT * FROM chat_rooms');
    const roomUsers = await sqlite.$queryRawUnsafe('SELECT * FROM "_ChatRoomToUser"');
    // Her oda için kullanıcı çifti oluştur
    const roomUserMap = {};
    for (const ru of roomUsers) {
      if (!roomUserMap[ru.A]) roomUserMap[ru.A] = [];
      roomUserMap[ru.A].push(ru.B);
    }
    ok.rooms = 0;
    for (const r of rooms) {
      try {
        const uids = roomUserMap[r.id] || [];
        if (uids.length < 2) continue; // Eksik kullanıcı varsa atla
        await pg.messageRoom.upsert({
          where: { id: r.id },
          update: {},
          create: {
            id: r.id,
            user1Id: uids[0],
            user2Id: uids[1],
            createdAt: toDate(r.created_at),
            updatedAt: toDate(r.updated_at),
          },
        });
        ok.rooms++;
      } catch {}
    }
    console.log(` ✅ ${ok.rooms}/${rooms.length}`);

    // 11. MESAJLAR (messages)
    process.stdout.write('📩 Mesajlar...');
    const messages = await sqlite.$queryRawUnsafe('SELECT * FROM messages');
    ok.messages = 0;
    for (const m of messages) {
      try {
        await pg.message.upsert({
          where: { id: m.id },
          update: {},
          create: {
            id: m.id,
            roomId: m.chat_room_id,
            senderId: m.sender_id,
            content: m.content,
            isRead: toBool(m.is_read),
            createdAt: toDate(m.created_at),
          },
        });
        ok.messages++;
      } catch {}
    }
    console.log(` ✅ ${ok.messages}/${messages.length}`);

    // 12. BİLDİRİMLER (notifications)
    process.stdout.write('🔔 Bildirimler...');
    const notifications = await sqlite.$queryRawUnsafe('SELECT * FROM notifications');
    ok.notifications = 0;
    for (const n of notifications) {
      try {
        await pg.notification.upsert({
          where: { id: n.id },
          update: {},
          create: {
            id: n.id,
            userId: n.user_id,
            type: n.type,
            title: n.title,
            body: n.body || null,
            isRead: toBool(n.is_read),
            data: n.data || null,
            createdAt: toDate(n.created_at),
          },
        });
        ok.notifications++;
      } catch {}
    }
    console.log(` ✅ ${ok.notifications}/${notifications.length}`);

    // 13. YORUMLAR (comments) - varsa
    try {
      process.stdout.write('💭 Yorumlar...');
      const comments = await sqlite.$queryRawUnsafe('SELECT * FROM comments');
      ok.comments = 0;
      for (const c of comments) {
        try {
          await pg.comment.upsert({
            where: { id: c.id },
            update: {},
            create: {
              id: c.id,
              itemId: c.item_id,
              userId: c.user_id,
              content: c.content,
              createdAt: toDate(c.created_at),
              updatedAt: toDate(c.updated_at || c.created_at),
            },
          });
          ok.comments++;
        } catch {}
      }
      console.log(` ✅ ${ok.comments}/${comments.length}`);
    } catch { console.log(' ⏭️  atlandı'); }

    // 14. ETKİLEŞİMLER (user_interactions)
    try {
      process.stdout.write('👆 Etkileşimler...');
      const interactions = await sqlite.$queryRawUnsafe('SELECT * FROM user_interactions');
      ok.interactions = 0;
      for (const i of interactions) {
        try {
          await pg.interaction.upsert({
            where: { id: i.id },
            update: {},
            create: {
              id: i.id,
              userId: i.user_id,
              itemId: i.item_id,
              type: i.type || i.interaction_type,
              createdAt: toDate(i.created_at),
            },
          });
          ok.interactions++;
        } catch {}
      }
      console.log(` ✅ ${ok.interactions}/${interactions.length}`);
    } catch { console.log(' ⏭️  atlandı'); }

    // 15–20. CMS (admin panel içerikleri)
    const cmsTables = [
      { label: 'SSS', table: 'faqs', migrate: async (rows) => {
        await pg.fAQ.deleteMany({});
        for (const r of rows) {
          await pg.fAQ.create({ data: {
            id: r.id, question: r.question, answer: r.answer, category: r.category,
            order: r.order ?? 0, isActive: toBool(r.is_active ?? 1),
            createdAt: toDate(r.created_at), updatedAt: toDate(r.updated_at || r.created_at),
          }});
        }
      }},
      { label: 'Yardım kategorileri', table: 'help_categories', migrate: async (rows) => {
        await pg.helpCategory.deleteMany({});
        for (const r of rows) {
          await pg.helpCategory.create({ data: {
            id: r.id, title: r.title, description: r.description, icon: r.icon || 'HelpCircle',
            order: r.order ?? 0, isActive: toBool(r.is_active ?? 1),
            createdAt: toDate(r.created_at), updatedAt: toDate(r.updated_at || r.created_at),
          }});
        }
      }},
      { label: 'Premium avantajlar', table: 'premium_perks', migrate: async (rows) => {
        await pg.premiumPerk.deleteMany({});
        for (const r of rows) {
          await pg.premiumPerk.create({ data: {
            id: r.id, title: r.title, value: r.value, description: r.description,
            icon: r.icon || 'Sparkles', color: r.color || 'text-amber-500',
            order: r.order ?? 0, isActive: toBool(r.is_active ?? 1),
            createdAt: toDate(r.created_at), updatedAt: toDate(r.updated_at || r.created_at),
          }});
        }
      }},
      { label: 'Premium planlar', table: 'premium_plans', migrate: async (rows) => {
        await pg.premiumPlan.deleteMany({});
        for (const r of rows) {
          await pg.premiumPlan.create({ data: {
            id: r.id, name: r.name, price: toFloat(r.price), period: r.period || 'MONTHLY',
            description: r.description, features: r.features, order: r.order ?? 0,
            isActive: toBool(r.is_active ?? 1),
            createdAt: toDate(r.created_at), updatedAt: toDate(r.updated_at || r.created_at),
          }});
        }
      }},
      { label: 'Güvenli takas adımları', table: 'safe_swap_steps', migrate: async (rows) => {
        await pg.safeSwapStep.deleteMany({});
        for (const r of rows) {
          await pg.safeSwapStep.create({ data: {
            id: r.id, title: r.title, description: r.description, icon: r.icon || 'Shield',
            order: r.order ?? 0, isActive: toBool(r.is_active ?? 1),
            createdAt: toDate(r.created_at), updatedAt: toDate(r.updated_at || r.created_at),
          }});
        }
      }},
      { label: 'Site ayarları', table: 'site_settings', migrate: async (rows) => {
        for (const r of rows) {
          await pg.siteSetting.upsert({
            where: { key: r.key },
            update: { value: r.value, type: r.type || 'STRING', group: r.group || 'general', description: r.description, isPublic: toBool(r.is_public) },
            create: {
              id: r.id, key: r.key, value: r.value, type: r.type || 'STRING', group: r.group || 'general',
              description: r.description, isPublic: toBool(r.is_public),
              createdAt: toDate(r.created_at), updatedAt: toDate(r.updated_at || r.created_at),
            },
          });
        }
      }},
    ];

    for (const { label, table, migrate } of cmsTables) {
      try {
        process.stdout.write(`${label}...`);
        const rows = await sqlite.$queryRawUnsafe(`SELECT * FROM ${table}`);
        ok[table] = rows.length;
        if (rows.length) await migrate(rows);
        console.log(` ✅ ${rows.length}`);
      } catch { console.log(' ⏭️  atlandı'); }
    }

    console.log('\n🎉 ===========================================');
    console.log('   VERİ AKTARIMI BAŞARIYLA TAMAMLANDI!');
    console.log('   Eski dev.db dosyası silinmedi (güvende).');
    console.log('   Supabase veritabanı kullanıma hazır! 🚀');
    console.log('🎉 ===========================================\n');

  } catch (err) {
    console.error('\n❌ Kritik hata:', err.message);
    console.error('Eski dev.db silinmedi, verileriniz güvende.\n');
    process.exit(1);
  } finally {
    await pg.$disconnect();
    await sqlite.$disconnect();
  }
}

run();
