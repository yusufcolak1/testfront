// ============================================================
// TAKASON — Skorlama Servisi (skill.md §2 + §3)
// 6 bileşenli ağırlıklı skor motoru
// ============================================================
//
// Final Score:
//   interest_score  * 0.35
//   distance_score  * 0.20
//   fairness_score  * 0.15
//   trust_score     * 0.15
//   trend_score     * 0.10
//   quality_score   * 0.05
// ============================================================

// ─── Davranış ağırlıkları ───────────────────────────────────
const INTERACTION_WEIGHTS = {
  VIEW:     1,
  CLICK:    3,
  FAVORITE: 5,
  MESSAGE:  8,
  SKIP:    -2,
};

// ─── 3.1 Interest Score ─────────────────────────────────────
// Kullanıcının geçmiş etkileşimlerinden kategori ilgisi hesaplar
// interactions: [{ type, item: { categoryId, tags } }]
const calcInterestScore = (interactions, targetItem) => {
  if (!interactions || interactions.length === 0) return 0;

  let categoryHits = 0;
  let tagHits = 0;
  let totalWeight = 0;

  const targetTags = safeParseJSON(targetItem.tags) || [];

  interactions.forEach(({ type, item }) => {
    if (!item) return;
    const w = INTERACTION_WEIGHTS[type] || 1;
    totalWeight += Math.abs(w);

    // Kategori benzerliği
    if (item.categoryId === targetItem.categoryId) categoryHits += w;

    // Etiket benzerliği
    const itemTags = safeParseJSON(item.tags) || [];
    const common = itemTags.filter(t => targetTags.includes(t)).length;
    if (common > 0) tagHits += w * (common / Math.max(targetTags.length, 1));
  });

  if (totalWeight <= 0) return 0;

  const rawScore = (categoryHits + tagHits) / totalWeight;
  // 0–1 aralığına normalize et (tanh ile smooth)
  return Math.max(0, Math.min(1, (Math.tanh(rawScore * 2) + 1) / 2));
};

// ─── 3.2 Distance Score ─────────────────────────────────────
// score = 1 / (1 + distance_km)
// Boost: aynı mahalle ×1.5, aynı şehir ×1.2
const calcDistanceScore = (userLat, userLon, itemLat, itemLon, userCity, itemCity) => {
  // Koordinat yoksa şehir bazlı yaklaşık skor
  if (userLat == null || userLon == null || itemLat == null || itemLon == null) {
    if (!userCity || !itemCity) return 0.3; // bilinmiyor → orta değer
    const sameCity = userCity.trim().toLowerCase() === itemCity.trim().toLowerCase();
    return sameCity ? 0.8 : 0.3;
  }

  const km = haversineKm(userLat, userLon, itemLat, itemLon);
  let score = 1 / (1 + km);

  // Boost'lar
  if (km < 2) score *= 1.5;        // aynı mahalle (~2km)
  else if (km < 30) score *= 1.2;  // aynı şehir (~30km)

  return Math.min(1, score);
};

// ─── 3.3 Fairness Score ─────────────────────────────────────
// fairness = min(A, B) / max(A, B)
// Düzeltme: kullanıcı davranış ağırlığıyla yumuşatılır
const calcFairnessScore = (userItemValue, targetItemValue) => {
  if (!userItemValue || !targetItemValue) return 0.5; // bilinmiyor → nötr
  if (userItemValue <= 0 || targetItemValue <= 0) return 0.5;
  const ratio = Math.min(userItemValue, targetItemValue) / Math.max(userItemValue, targetItemValue);
  return Math.max(0, Math.min(1, ratio));
};

// ─── 3.4 Trust Score ────────────────────────────────────────
// trust = (rating * 0.4) + (completed_swaps * 0.3) + (account_age * 0.2) - (cancellation_rate * 0.1)
const calcTrustScore = (profile) => {
  if (!profile) return 0;
  const { rating = 0, swapsCompleted = 0, cancellationRate = 0, createdAt } = profile;

  // Hesap yaşı: her yıl 0.1 puan (max 0.5)
  const ageYears = createdAt
    ? (Date.now() - new Date(createdAt).getTime()) / (1000 * 60 * 60 * 24 * 365)
    : 0;
  const accountAgeScore = Math.min(0.5, ageYears * 0.1);

  // rating: 0–5 arası, 0–1'e normalize
  const ratingNorm = Math.min(1, (rating || 0) / 5);
  // swaps: logaritmik normalize (20 swap = tam puan)
  const swapsNorm = Math.min(1, Math.log1p(swapsCompleted) / Math.log1p(20));
  // cancellation: oranı doğrudan olumsuz
  const cancelPenalty = Math.min(1, (cancellationRate || 0));

  const score =
    ratingNorm       * 0.4 +
    swapsNorm        * 0.3 +
    accountAgeScore  * 0.2 -
    cancelPenalty    * 0.1;

  return Math.max(0, Math.min(1, score));
};

// ─── 3.5 Trend Score ────────────────────────────────────────
// trend = (views * 0.3) + (messages * 0.5) + (favorites * 0.2)
// Tüm değerler logaritmik normalize edilir (popüler ilanlar hakimiyeti kırılır)
const calcTrendScore = (item) => {
  if (!item) return 0;
  const views    = item.viewCount    || 0;
  const messages = item.messageCount || 0;
  const favs     = item.favoriteCount || 0;

  // log normalize: 100 view → ~1.0
  const vNorm = Math.min(1, Math.log1p(views)    / Math.log1p(100));
  const mNorm = Math.min(1, Math.log1p(messages) / Math.log1p(30));
  const fNorm = Math.min(1, Math.log1p(favs)     / Math.log1p(50));

  return vNorm * 0.3 + mNorm * 0.5 + fNorm * 0.2;
};

// ─── 3.6 Quality Score ──────────────────────────────────────
// quality = (photo_count * 0.4) + (description_length * 0.3) + (engagement * 0.3)
// Veritabanında zaten hesaplanmış qualityScore alanı kullanılır.
// Bu fonksiyon hem hesaplama hem de doğrulama için kullanılabilir.
const calcQualityScore = (item) => {
  if (!item) return 0;

  // Kayıtlı skor varsa kullan
  if (item.qualityScore != null && item.qualityScore > 0) {
    return Math.min(1, item.qualityScore);
  }

  const photoCount = (item.images || []).length;
  const descLength = (item.description || '').length;
  const engagement = (item.viewCount || 0) + (item.favoriteCount || 0);

  const pNorm = Math.min(1, photoCount / 5);            // 5 fotoğraf = tam puan
  const dNorm = Math.min(1, descLength / 500);          // 500 karakter = tam puan
  const eNorm = Math.min(1, Math.log1p(engagement) / Math.log1p(50));

  return pNorm * 0.4 + dNorm * 0.3 + eNorm * 0.3;
};

// ─── Dinamik Ağırlık Sistemi (Cache) ──────────────────────────
const { prisma } = require('../config/database');

let cachedWeights = {
  interest: 0.35,
  distance: 0.20,
  fairness: 0.15,
  trust:    0.15,
  trend:    0.10,
  quality:  0.05,
};
let lastCacheUpdate = 0;

const getWeights = async () => {
  const now = Date.now();
  // Cache'i 5 dakikada bir güncelle
  if (now - lastCacheUpdate > 5 * 60 * 1000) {
    try {
      const setting = await prisma.siteSetting.findUnique({
        where: { key: 'algorithm_weights' },
      });
      if (setting && setting.value) {
        const dbWeights = JSON.parse(setting.value);
        cachedWeights = { ...cachedWeights, ...dbWeights };
      } else {
        // Veritabanında yoksa varsayılanları oluştur
        await prisma.siteSetting.upsert({
          where: { key: 'algorithm_weights' },
          update: {},
          create: {
            key: 'algorithm_weights',
            value: JSON.stringify(cachedWeights),
            type: 'JSON',
            group: 'algorithm',
            description: 'Algoritma Ağırlıkları (toplam 1.0 olmalı)'
          }
        });
      }
      lastCacheUpdate = now;
    } catch (err) {
      console.error("Algoritma ağırlıkları yüklenirken hata:", err);
    }
  }
  return cachedWeights;
};

// ─── Ana Skor Hesapla ────────────────────────────────────────
// skill.md §2 Final Score formülü
const calcFinalScore = async ({
  interestScore,
  distanceScore,
  fairnessScore,
  trustScore,
  trendScore,
  qualityScore,
}) => {
  const w = await getWeights();
  return (
    interestScore  * w.interest +
    distanceScore  * w.distance +
    fairnessScore  * w.fairness +
    trustScore     * w.trust +
    trendScore     * w.trend +
    qualityScore   * w.quality
  );
};

// ─── Toplu Skorlama (bir ilan için) ─────────────────────────
// user: { profile, interactions, currentItemValue }
// item: { ...item, images, category }
const scoreItem = async (user, item) => {
  const profile     = user.profile || {};
  const interactions = user.interactions || [];
  const currentItemValue = user.currentItemValue || null;

  const interestScore  = calcInterestScore(interactions, item);
  const distanceScore  = calcDistanceScore(
    profile.latitude, profile.longitude,
    item.latitude,    item.longitude,
    profile.city,     item.location
  );
  const fairnessScore  = calcFairnessScore(currentItemValue, item.estimatedValue);
  const trustScore     = calcTrustScore(item.user?.profile);
  const trendScore     = calcTrendScore(item);
  const qualityScore   = calcQualityScore(item);

  const finalScore = await calcFinalScore({
    interestScore, distanceScore, fairnessScore,
    trustScore, trendScore, qualityScore,
  });

  const w = await getWeights();

  return {
    finalScore,
    breakdown: {
      interest:  +(interestScore  * w.interest).toFixed(4),
      distance:  +(distanceScore  * w.distance).toFixed(4),
      fairness:  +(fairnessScore  * w.fairness).toFixed(4),
      trust:     +(trustScore     * w.trust).toFixed(4),
      trend:     +(trendScore     * w.trend).toFixed(4),
      quality:   +(qualityScore   * w.quality).toFixed(4),
    },
  };
};

// ─── Yardımcı: Haversine mesafe (km) ────────────────────────
function haversineKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function toRad(deg) { return (deg * Math.PI) / 180; }

function safeParseJSON(str) {
  if (!str) return null;
  try { return JSON.parse(str); } catch { return null; }
}

module.exports = {
  calcInterestScore,
  calcDistanceScore,
  calcFairnessScore,
  calcTrustScore,
  calcTrendScore,
  calcQualityScore,
  calcFinalScore,
  scoreItem,
  INTERACTION_WEIGHTS,
  haversineKm,
};
