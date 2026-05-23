// ============================================================
// TAKASON — Feed Servisi (skill.md §5)
// Aday havuzu → Skorlama → Feed kompozisyonu
// ============================================================
//
// Aşama 1 (Soğuk başlangıç — <20 etkileşim):
//   %40 popüler  |  %30 yakın  |  %30 random
//
// Aşama 2 (Öğrenme — ≥20 etkileşim):
//   Tam kişiselleştirme (scoreItem ile sıralanır)
// ============================================================

const { prisma }    = require('../config/database');
const { scoreItem } = require('./scoringService');

// Soğuk başlangıç eşiği
const COLD_START_THRESHOLD = 20;
// Maksimum aday havuzu
const CANDIDATE_LIMIT = 200;
// Varsayılan konum yarıçapı (km) — koordinat yoksa şehir bazlı filtreleme
const DEFAULT_RADIUS_KM = 30;

// ─── Ana Feed Üretici ────────────────────────────────────────
// GET /api/items/feed
const generateFeed = async (userId, query = {}) => {
  const page  = parseInt(query.page  || 1,  10);
  const limit = parseInt(query.limit || 20, 10);
  const skip  = (page - 1) * limit;

  // 1 + 2. Kullanıcı bilgisi + etkileşim geçmişi — PARALEL
  const [user, interactions] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        profile: {
          select: {
            city: true, latitude: true, longitude: true,
            rating: true, swapsCompleted: true, cancellationRate: true, createdAt: true,
          },
        },
      },
    }),
    prisma.userInteraction.findMany({
      where:   { userId },
      orderBy: { createdAt: 'desc' },
      take:    200,
      select: {
        type: true,
        weight: true,
        item: {
          select: { id: true, categoryId: true, tags: true, estimatedValue: true },
        },
      },
    }),
  ]);

  if (!user) throw new Error('Kullanıcı bulunamadı.');

  const interactionCount = interactions.filter(i => i.weight > 0).length;
  const isWarmUser = interactionCount >= COLD_START_THRESHOLD;

  // 3. Aday havuzu oluştur
  const candidates = await getCandidates(user, interactions);

  // 4. Skorlama
  const userContext = {
    profile:      user.profile || {},
    interactions: interactions,
    currentItemValue: null,
  };

  let scored;

  if (isWarmUser) {
    const scoredPromises = candidates.map(async item => {
      const scoreRes = await scoreItem(userContext, item);
      return { ...item, _score: scoreRes.finalScore };
    });
    scored = await Promise.all(scoredPromises);
    scored.sort((a, b) => b._score - a._score);
  } else {
    scored = coldStartMix(candidates, user.profile || {}, limit);
  }

  // 5. Kullanıcının kendi ilanlarını ve daha önce görüntülediklerini çıkar
  const seenItemIds = new Set(
    interactions.filter(i => i.type === 'VIEW' || i.type === 'SKIP').map(i => i.item?.id).filter(Boolean)
  );
  const filtered = scored.filter(item => item.userId !== userId && !seenItemIds.has(item.id));

  // 6. Sayfalama
  const paginated = filtered.slice(skip, skip + limit);

  return {
    items: paginated.map(item => {
      const { _score, ...rest } = item;
      return { ...rest, _feedScore: _score ? +_score.toFixed(4) : undefined };
    }),
    pagination: { page, limit, total: filtered.length },
    meta: { mode: isWarmUser ? 'personalized' : 'cold_start', interactionCount },
  };
};

// ─── Aday Havuzu (Candidate Generation) ─────────────────────
// Skill.md §AŞAMA 1: konum + kategori + aktif ilanlar
async function getCandidates(user, interactions) {
  const profile = user.profile || {};

  // Kullanıcının ilgilendiği kategoriler (etkileşim geçmişinden)
  const interestCategoryIds = [...new Set(
    interactions
      .filter(i => i.weight > 0 && i.item?.categoryId)
      .map(i => i.item.categoryId)
  )];

  const where = {
    status: 'ACTIVE',
    userId: { not: user.id },
  };

  // Şehir filtresi (koordinat yoksa)
  if (profile.city && !profile.latitude) {
    where.location = { contains: profile.city };
  }

  // Kategori filtresi (etkileşim varsa)
  if (interestCategoryIds.length > 0) {
    where.categoryId = { in: interestCategoryIds };
  }

  const items = await prisma.item.findMany({
    where,
    take: CANDIDATE_LIMIT,
    orderBy: { createdAt: 'desc' },
    select: itemSelectFields(),
  });

  // Koordinat bazlı filtreleme (konum varsa 30km radius)
  if (profile.latitude && profile.longitude) {
    const { haversineKm } = require('./scoringService');
    return items.filter(item => {
      if (!item.latitude || !item.longitude) return true; // koordinat yoksa dahil et
      return haversineKm(profile.latitude, profile.longitude, item.latitude, item.longitude) <= DEFAULT_RADIUS_KM;
    });
  }

  return items;
}

// ─── Soğuk Başlangıç Karışımı ───────────────────────────────
// %40 popüler (viewCount), %30 yakın (konum), %30 random
function coldStartMix(candidates, profile, limit) {
  const total = candidates.length;
  if (total === 0) return [];

  const popular = [...candidates].sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0));

  // Konum sıralaması: koordinat varsa mesafeye göre, yoksa şehir önce
  const nearby = [...candidates].sort((a, b) => {
    if (profile.latitude && profile.longitude) {
      const { haversineKm } = require('./scoringService');
      const da = (a.latitude && a.longitude) ? haversineKm(profile.latitude, profile.longitude, a.latitude, a.longitude) : 999;
      const db = (b.latitude && b.longitude) ? haversineKm(profile.latitude, profile.longitude, b.latitude, b.longitude) : 999;
      return da - db;
    }
    return 0;
  });

  const random = [...candidates].sort(() => Math.random() - 0.5);

  const popularSlice = popular.slice(0, Math.floor(limit * 0.4));
  const nearbySlice  = nearby.slice(0,  Math.floor(limit * 0.3));
  const randomSlice  = random.slice(0,  Math.ceil(limit  * 0.3));

  // Tekrarları temizle
  const seen = new Set();
  const merged = [...popularSlice, ...nearbySlice, ...randomSlice].filter(item => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });

  return merged;
}

// ─── Etkileşim Kaydet ────────────────────────────────────────
// POST /api/items/:id/interact — body: { type }
const { INTERACTION_WEIGHTS } = require('./scoringService');

const recordInteraction = async (userId, itemId, type) => {
  const upperType = (type || '').toUpperCase();
  if (!INTERACTION_WEIGHTS[upperType]) {
    throw new Error(`Geçersiz etkileşim tipi: ${type}. Geçerli tipler: ${Object.keys(INTERACTION_WEIGHTS).join(', ')}`);
  }

  const weight = INTERACTION_WEIGHTS[upperType];

  // Aynı (user, item, type) kombinasyonu için upsert-benzeri mantık:
  // VIEW ve SKIP birden fazla kez kaydedilebilir; FAVORITE ve CLICK en fazla 1 kayıt.
  if (upperType === 'FAVORITE' || upperType === 'CLICK') {
    const existing = await prisma.userInteraction.findFirst({
      where: { userId, itemId, type: upperType },
    });
    if (existing) return existing; // Zaten kayıtlı
  }

  const interaction = await prisma.userInteraction.create({
    data: { userId, itemId, type: upperType, weight },
  });

  // Trend skorunu etkileyen sayaçları güncelle
  if (upperType === 'VIEW') {
    await prisma.item.update({ where: { id: itemId }, data: { viewCount: { increment: 1 } } }).catch(() => {});
  } else if (upperType === 'FAVORITE') {
    await prisma.item.update({ where: { id: itemId }, data: { favoriteCount: { increment: 1 } } }).catch(() => {});
  } else if (upperType === 'MESSAGE') {
    await prisma.item.update({ where: { id: itemId }, data: { messageCount: { increment: 1 } } }).catch(() => {});
  }

  return interaction;
};

// ─── Quality Score Hesapla (ilan oluşturulunca/güncellenince) ─
const computeAndSaveQualityScore = async (itemId) => {
  const item = await prisma.item.findUnique({
    where: { id: itemId },
    include: { images: { select: { id: true } } },
  });
  if (!item) return;

  const { calcQualityScore } = require('./scoringService');
  const score = calcQualityScore(item);
  await prisma.item.update({ where: { id: itemId }, data: { qualityScore: score } });
  return score;
};

// ─── Seçim Alanları ──────────────────────────────────────────
function itemSelectFields() {
  return {
    id:              true,
    title:           true,
    condition:       true,
    location:        true,
    latitude:        true,
    longitude:       true,
    estimatedValue:  true,
    viewCount:       true,
    favoriteCount:   true,
    messageCount:    true,
    qualityScore:    true,
    tags:            true,
    wantedCategories: true,
    createdAt:       true,
    categoryId:      true,
    userId:          true,
    isFeatured:      true,
    isPopular:       true,
    category: { select: { id: true, name: true, slug: true } },
    user: {
      select: {
        id: true,
        profile: {
          select: {
            firstName: true, lastName: true, avatarUrl: true,
            rating: true, swapsCompleted: true, cancellationRate: true, createdAt: true,
            city: true, latitude: true, longitude: true,
          },
        },
      },
    },
    images: {
      where:  { isPrimary: true },
      take:   1,
      select: { imageUrl: true },
    },
  };
}

module.exports = { generateFeed, recordInteraction, computeAndSaveQualityScore };
