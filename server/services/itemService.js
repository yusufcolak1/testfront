// ============================================================
// TAKASON - İlan Servisi
// Arama, filtreleme ve view_count yönetimi
// ============================================================

const { prisma } = require('../config/database');
const { AppError } = require('../middlewares/errorHandler');
const { parsePagination } = require('../utils/response');

// ============================================================
// İlanları Listele (Filtreleme + Sayfalama)
// ============================================================
const getItems = async (query) => {
  const { page, limit, skip } = parsePagination(query);

  // Dinamik filtre nesnesi oluştur
  const where = {
    status: 'ACTIVE', // Sadece aktif ilanlar
  };

  if (query.categoryId) where.categoryId = query.categoryId;
  if (query.condition) where.condition = query.condition;
  if (query.city) where.location = { contains: query.city };
  if (query.isFeatured !== undefined) where.isFeatured = query.isFeatured === 'true';
  if (query.isPopular !== undefined) where.isPopular = query.isPopular === 'true';
  if (query.search) {
    where.OR = [
      { title: { contains: query.search } },
      { description: { contains: query.search } },
    ];
  }
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

  // Paralel sorgu: veri + toplam sayı
  const [items, total] = await Promise.all([
    prisma.item.findMany({
      where,
      skip,
      take: limit,
      orderBy,
      select: {
        id: true,
        title: true,
        condition: true,
        location: true,
        estimatedValue: true,
        viewCount: true,
        createdAt: true,
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
      },
    }),
    prisma.item.count({ where }),
  ]);

  return { items, pagination: { page, limit, total } };
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
        create: files.map((file, index) => ({
          imageUrl: `/uploads/${file.filename}`,
          displayOrder: index,
          isPrimary: index === 0, // İlk görsel kapak fotoğrafı
        })),
      },
    },
    include: {
      images: true,
      category: { select: { id: true, name: true } },
    },
  });

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

module.exports = { getItems, getItemById, createItem, updateItem, deleteItem, toggleFavorite };
