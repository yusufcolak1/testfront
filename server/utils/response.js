// ============================================================
// TAKASON - API Yanıt Formatı Yardımcıları
// Tüm başarılı yanıtlar bu fonksiyonlar üzerinden döner
// ============================================================

// Başarılı yanıt
const successResponse = (res, data = null, message = 'İşlem başarılı.', statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

// Oluşturma başarılı (201 Created)
const createdResponse = (res, data = null, message = 'Başarıyla oluşturuldu.') => {
  return successResponse(res, data, message, 201);
};

// Sayfalanmış yanıt
const paginatedResponse = (res, data, pagination, message = 'İşlem başarılı.') => {
  return res.status(200).json({
    success: true,
    message,
    data,
    pagination: {
      page: pagination.page,
      limit: pagination.limit,
      total: pagination.total,
      totalPages: Math.ceil(pagination.total / pagination.limit),
      hasNext: pagination.page < Math.ceil(pagination.total / pagination.limit),
      hasPrev: pagination.page > 1,
    },
  });
};

// Sayfalama parametrelerini parse et
const parsePagination = (query) => {
  const page = Math.max(1, parseInt(query.page) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(query.limit) || 20));
  const skip = (page - 1) * limit;
  return { page, limit, skip };
};

module.exports = {
  successResponse,
  createdResponse,
  paginatedResponse,
  parsePagination,
};
