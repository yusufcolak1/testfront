// ============================================================
// TAKASON - İlan Servisi
// Arama, filtreleme ve view_count yönetimi
// ============================================================

const { prisma } = require('../config/database');
const { AppError } = require('../middlewares/errorHandler');
const { parsePagination } = require('../utils/response');
const { computeAndSaveQualityScore } = require('./feedService');
const settingsService = require('./settingsService');

// Ayın başlangıcını (UTC) döndürür
const getStartOfMonth = () => {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
};

// Kullanıcının bu aydaki ilan sayısını döndürür
const getMonthlyItemCount = async (userId) => {
  return prisma.item.count({
    where: {
      userId,
      status: { not: 'DELETED' },
      createdAt: { gte: getStartOfMonth() },
    },
  });
};

// Monthly limit sabiti
const FREE_MONTHLY_LIMIT = 3;

// Turkish character aware case conversion helper
const trToLower = (str) => {
  if (!str) return '';
  return str
    .replace(/İ/g, 'i')
    .replace(/I/g, 'ı')
    .replace(/Ğ/g, 'ğ')
    .replace(/Ü/g, 'ü')
    .replace(/Ş/g, 'ş')
    .replace(/Ö/g, 'ö')
    .replace(/Ç/g, 'ç')
    .toLowerCase();
};

// Accents and Turkish special characters normalization helper for fuzzy/soft search
const normalizeText = (str) => {
  if (!str) return '';
  let lowered = trToLower(str);
  return lowered
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c');
};

// Calculates Levenshtein-based similarity between two words
const wordSimilarity = (word1, word2) => {
  if (word2.startsWith(word1) || word1.startsWith(word2)) {
    return Math.min(word1.length, word2.length) / Math.max(word1.length, word2.length);
  }
  
  const len1 = word1.length;
  const len2 = word2.length;
  if (Math.abs(len1 - len2) > 2) return 0; // Quick exit if length difference is too large

  const track = Array(len2 + 1).fill(null).map(() =>
    Array(len1 + 1).fill(null));
  for (let i = 0; i <= len1; i += 1) {
    track[0][i] = i;
  }
  for (let j = 0; j <= len2; j += 1) {
    track[j][0] = j;
  }
  for (let j = 1; j <= len2; j += 1) {
    for (let i = 1; i <= len1; i += 1) {
      const indicator = word1[i - 1] === word2[j - 1] ? 0 : 1;
      track[j][i] = Math.min(
        track[j][i - 1] + 1,
        track[j - 1][i] + 1,
        track[j - 1][i - 1] + indicator
      );
    }
  }
  const distance = track[len2][len1];
  const maxLength = Math.max(len1, len2);
  return (maxLength - distance) / maxLength;
};

// Eşanlamlı ve yakın anlamlı kelimeler haritası
const SYNONYMS = {
  'araba': ['otomobil', 'arac', 'vasita', 'motorlu', 'oto'],
  'otomobil': ['araba', 'arac', 'oto'],
  'telefon': ['cep', 'akilli', 'smartphone', 'mobil'],
  'cep telefonu': ['telefon', 'akilli', 'smartphone'],
  'bilgisayar': ['pc', 'laptop', 'dizustu', 'masaustu', 'notebook', 'macbook'],
  'laptop': ['bilgisayar', 'dizustu', 'notebook', 'macbook'],
  'motor': ['motosiklet', 'scooter'],
  'motosiklet': ['motor', 'scooter'],
  'bisiklet': ['bike', 'velespit', 'elektrikli bisiklet'],
  'ev': ['daire', 'konut', 'villa', 'arsa', 'emlak'],
  'daire': ['ev', 'konut', 'emlak'],
  'kıyafet': ['giyim', 'elbise', 'tisort', 'pantolon', 'mont', 'ceket'],
  'giyim': ['kiyafet', 'elbise', 'tekstil'],
  'ayakkabi': ['sneaker', 'bot', 'cizme', 'spor ayakkabi'],
  'saat': ['kol saati', 'akilli saat', 'watch'],
  'oyun': ['konsol', 'ps', 'xbox', 'nintendo', 'playstation'],
  'ps': ['playstation', 'konsol', 'oyun'],
  'kitap': ['roman', 'hikaye', 'yayin', 'ders kitabi']
};

// Computes a match/similarity score for an item based on search words
const searchScore = (item, searchString) => {
  const normTitle = normalizeText(item.title);
  const normDesc = normalizeText(item.description || '');
  const normCategory = normalizeText(item.category?.name || '');
  const normLocation = normalizeText(item.location || '');
  
  const originalSearchWords = searchString.split(/\s+/).filter(Boolean).map(normalizeText);
  if (originalSearchWords.length === 0) return 0;

  // Eşanlamlıları ekleyerek aranacak kelime havuzunu genişlet
  const expandedWordsSet = new Set(originalSearchWords);
  for (const w of originalSearchWords) {
    if (SYNONYMS[w]) {
      SYNONYMS[w].forEach(syn => expandedWordsSet.add(syn));
    }
    // "cep telefonu" gibi ikili kelime grupları için orijinal arama metnine tam bak
    const fullSearch = normalizeText(searchString);
    Object.keys(SYNONYMS).forEach(key => {
      if (fullSearch.includes(key)) {
        SYNONYMS[key].forEach(syn => expandedWordsSet.add(syn));
      }
    });
  }
  
  const searchWords = Array.from(expandedWordsSet);
  let score = 0;
  let matchesAny = false;
  
  for (const word of searchWords) {
    let wordMatch = false;
    
    // Check Category
    if (normCategory && normCategory.includes(word)) {
      wordMatch = true;
      matchesAny = true;
      // Exact match for category is highly relevant
      if (normCategory === word) score += 30;
      else score += 15;
    }

    // Check Location (City/District)
    if (normLocation && normLocation.includes(word)) {
      wordMatch = true;
      matchesAny = true;
      score += 15;
    }
    
    // Check Title
    if (normTitle.includes(word)) {
      wordMatch = true;
      matchesAny = true;
      const index = normTitle.indexOf(word);
      const isWordBoundaryStart = index === 0 || /\s/.test(normTitle[index - 1]);
      const isWordBoundaryEnd = (index + word.length) === normTitle.length || /\s/.test(normTitle[index + word.length]);
      
      if (isWordBoundaryStart && isWordBoundaryEnd) {
        score += 20; // Exact word match
      } else if (isWordBoundaryStart) {
        score += 15; // Prefix match
      } else {
        score += 8;  // Substring match
      }
    }
    
    // Check Description
    if (normDesc.includes(word)) {
      wordMatch = true;
      matchesAny = true;
      const index = normDesc.indexOf(word);
      const isWordBoundaryStart = index === 0 || /\s/.test(normDesc[index - 1]);
      if (isWordBoundaryStart) {
        score += 4;
      } else {
        score += 2;
      }
    }
    
    // Strict word-level fuzzy match (Levenshtein similarity >= 65%)
    if (!wordMatch) {
      // Başlık, kategori veya konumu hecele
      const combinedWords = `${normTitle} ${normCategory} ${normLocation}`.split(/\s+/).filter(Boolean);
      let bestSim = 0;
      for (const tWord of combinedWords) {
        const sim = wordSimilarity(word, tWord);
        if (sim > bestSim) {
          bestSim = sim;
        }
      }
      if (bestSim >= 0.65) {
        score += bestSim * 10;
        matchesAny = true;
      }
    }
  }
  
  // Full query exact match boost
  const normQuery = normalizeText(searchString);
  if (normTitle.includes(normQuery)) score += 50;
  if (normCategory.includes(normQuery)) score += 35;
  if (normDesc.includes(normQuery)) score += 15;
  
  return matchesAny ? score : 0;
};

// Kategori ve alt kategorilerinin ID listesini döndürür
const getCategoryDescendantIds = async (categoryIdOrSlug) => {
  const category = await prisma.category.findFirst({
    where: typeof categoryIdOrSlug === 'string' && categoryIdOrSlug.length === 36
      ? { id: categoryIdOrSlug }
      : { slug: categoryIdOrSlug },
    select: { id: true }
  });

  if (!category) return [];

  const ids = [category.id];
  
  const fetchChildren = async (parentId) => {
    const children = await prisma.category.findMany({
      where: { parentId },
      select: { id: true }
    });
    for (const child of children) {
      ids.push(child.id);
      await fetchChildren(child.id);
    }
  };

  await fetchChildren(category.id);
  return ids;
};

// ============================================================
// İlanları Listele (Filtreleme + Sayfalama)
// ============================================================
const getItems = async (query, userId = null) => {
  const { page, limit, skip } = parsePagination(query);

  // Dinamik filtre nesnesi oluştur
  const where = {
    status: 'ACTIVE', // Sadece aktif ilanlar
  };

  if (query.categoryId || query.categorySlug) {
    const categoryIds = await getCategoryDescendantIds(query.categoryId || query.categorySlug);
    where.categoryId = { in: categoryIds };
  }
  if (query.condition) where.condition = query.condition;
  if (query.city) where.location = { contains: query.city };
  if (query.isFeatured !== undefined) where.isFeatured = query.isFeatured === 'true' || query.isFeatured === true;
  if (query.isPopular !== undefined) where.isPopular = query.isPopular === 'true' || query.isPopular === true;
  if (query.minValue || query.maxValue) {
    where.estimatedValue = {
      ...(query.minValue && { gte: Number(query.minValue) }),
      ...(query.maxValue && { lte: Number(query.maxValue) }),
    };
  }

  // Sıralama
  const orderByMap = {
    newest: { createdAt: 'desc' },
    oldest: { createdAt: 'asc' },
    value_asc: { estimatedValue: 'asc' },
    value_desc: { estimatedValue: 'desc' },
  };
  const orderBy = orderByMap[query.sort] || orderByMap.newest;

  // Custom search logic (in-memory Turkish case normalization & fuzzy letter matching)
  if (query.search) {
    const items = await prisma.item.findMany({
      where,
      orderBy,
      include: {
        category: { select: { id: true, name: true } },
        user: {
          select: {
            id: true,
            profile: { select: { firstName: true, lastName: true, avatarUrl: true, rating: true } },
          },
        },
        images: {
          where: { isPrimary: true },
          take: 1,
          select: { imageUrl: true },
        },
        _count: { select: { favorites: true } },
        ...(userId && { favorites: { where: { userId } } }),
      },
    });

    // Score and filter
    const scoredItems = items
      .map(it => {
        const score = searchScore(it, query.search);
        return { ...it, _searchScore: score };
      })
      .filter(it => it._searchScore > 0);

    // Sort by search score descending, breaking ties with the default order
    scoredItems.sort((a, b) => b._searchScore - a._searchScore);

    const total = scoredItems.length;
    const sliced = scoredItems.slice(skip, skip + limit);

    // Map properties
    const mappedItems = sliced.map(it => ({
      ...it,
      isFavorited: userId ? it.favorites.length > 0 : false,
      favorites: undefined,
      _searchScore: undefined
    }));

    return { items: mappedItems, pagination: { page, limit, total } };
  }

  // Standard non-search DB query
  const [items, total] = await Promise.all([
    prisma.item.findMany({
      where,
      skip,
      take: limit,
      orderBy,
      include: {
        category: { select: { id: true, name: true } },
        user: {
          select: {
            id: true,
            profile: { select: { firstName: true, lastName: true, avatarUrl: true, rating: true } },
          },
        },
        images: {
          where: { isPrimary: true },
          take: 1,
          select: { imageUrl: true },
        },
        _count: { select: { favorites: true } },
        ...(userId && { favorites: { where: { userId } } }),
      },
    }),
    prisma.item.count({ where }),
  ]);

  // isFavorited flag'ini ekle
  const mappedItems = items.map(it => ({
    ...it,
    isFavorited: userId ? it.favorites.length > 0 : false,
    favorites: undefined // temizlik
  }));

  return { items: mappedItems, pagination: { page, limit, total } };
};

// ============================================================
// İlan Detayı
// ============================================================
const getItemById = async (id, userId = null) => {
  const item = await prisma.item.findUnique({
    where: { id },
    include: {
      category: true,
      user: {
        select: {
          id: true,
          profile: {
            select: {
              firstName: true,
              lastName: true,
              avatarUrl: true,
              rating: true,
              city: true,
            },
          },
        },
      },
      images: { orderBy: { displayOrder: 'asc' } },
      _count: { select: { favorites: true } },
    },
  });

  if (!item || item.status === 'DELETED') {
    throw new AppError('İlan bulunamadı.', 404);
  }

  // Görüntülenme sayısını arttır (async - yanıtı bloklamaz)
  prisma.item.update({
    where: { id },
    data: { viewCount: { increment: 1 } },
  }).catch(console.error);

  // Oturum açmış kullanıcı favorilemiş mi?
  let isFavorited = false;
  if (userId) {
    const fav = await prisma.favorite.findUnique({
      where: { userId_itemId: { userId, itemId: id } },
    });
    isFavorited = !!fav;
  }

  return { ...item, isFavorited };
};

// ============================================================
// İlan Oluştur
// ============================================================
const createItem = async (userId, data, files = []) => {
  // ---- Aylık ilan limiti kontrolü (premium modu aktifse) ----
  const premiumEnabled = await settingsService.get('premium.enabled', false);
  if (premiumEnabled) {
    // Kullanıcının premium olup olmadığını kontrol et
    const profile = await prisma.profile.findUnique({
      where: { userId },
      select: { isPremium: true, premiumUntil: true },
    });
    const isPremiumUser =
      profile?.isPremium &&
      (profile.premiumUntil === null || new Date(profile.premiumUntil) > new Date());

    if (!isPremiumUser) {
      const monthlyCount = await getMonthlyItemCount(userId);
      if (monthlyCount >= FREE_MONTHLY_LIMIT) {
        throw new AppError(
          `Bu ay oluşturabileceğiniz maksimum ilan sayısına (${FREE_MONTHLY_LIMIT}) ulaştınız. Premium'a geçerek sınırsız ilan yayınlayabilirsiniz.`,
          403
        );
      }
    }
  }

  // Kategori mevcut mu?
  const category = await prisma.category.findUnique({ where: { id: data.categoryId } });
  if (!category) {
    throw new AppError('Seçilen kategori bulunamadı.', 404);
  }

  const item = await prisma.item.create({
    data: {
      userId,
      categoryId: data.categoryId,
      title: data.title,
      description: data.description,
      condition: data.condition,
      status: data.status || 'ACTIVE',
      location: data.location || data.city || null,
      estimatedValue: data.estimatedValue ? parseFloat(data.estimatedValue) : null,
      // Görselleri nested write ile ekle
      images: {
        create: files.map((file, index) => {
          // file.path: "uploads/2024/05/uuid.jpg" 
          // Bizim bunu "/uploads/2024/05/uuid.jpg" formatına çevirmemiz lazım
          const normalizedPath = file.path.replace(/\\/g, '/');
          const imageUrl = normalizedPath.startsWith('/') ? normalizedPath : `/${normalizedPath}`;
          
          return {
            imageUrl: imageUrl,
            displayOrder: index,
            isPrimary: index === 0,
          };
        }),
      },
    },
    include: {
      images: true,
      category: { select: { id: true, name: true } },
    },
  });

  // Quality Score async hesapla (bloklamaz)
  computeAndSaveQualityScore(item.id).catch(console.error);

  return item;
};

// ============================================================
// İlan Güncelle
// ============================================================
const updateItem = async (id, userId, data) => {
  // İlan sahibi mi?
  const item = await prisma.item.findUnique({ where: { id }, select: { userId: true } });
  if (!item) throw new AppError('İlan bulunamadı.', 404);
  if (item.userId !== userId) throw new AppError('Bu ilanı düzenleme yetkiniz yok.', 403);

  return prisma.item.update({
    where: { id },
    data,
    include: { images: true, category: { select: { id: true, name: true } } },
  });
};

// ============================================================
// İlan Sil (Soft delete)
// ============================================================
const deleteItem = async (id, userId, userRole) => {
  const item = await prisma.item.findUnique({ where: { id }, select: { userId: true } });
  if (!item) throw new AppError('İlan bulunamadı.', 404);

  // Sadece ilan sahibi veya admin silebilir
  if (item.userId !== userId && userRole !== 'ADMIN') {
    throw new AppError('Bu ilanı silme yetkiniz yok.', 403);
  }

  // Soft delete
  await prisma.item.update({ where: { id }, data: { status: 'DELETED' } });
  return { message: 'İlan başarıyla silindi.' };
};

// ============================================================
// Favoriye Ekle / Kaldır (Toggle)
// ============================================================
const toggleFavorite = async (userId, itemId) => {
  const item = await prisma.item.findUnique({ where: { id: itemId }, select: { id: true } });
  if (!item) throw new AppError('İlan bulunamadı.', 404);

  const existing = await prisma.favorite.findUnique({
    where: { userId_itemId: { userId, itemId } },
  });

  if (existing) {
    await prisma.favorite.delete({ where: { userId_itemId: { userId, itemId } } });
    return { isFavorited: false, message: 'Favorilerden kaldırıldı.' };
  } else {
    await prisma.favorite.create({ data: { userId, itemId } });
    return { isFavorited: true, message: 'Favorilere eklendi.' };
  }
};

module.exports = { getItems, getItemById, createItem, updateItem, deleteItem, toggleFavorite, getMonthlyItemCount, FREE_MONTHLY_LIMIT };
