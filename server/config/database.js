// ============================================================
// TAKASON - Veritabanı Yapılandırması (Prisma)
// ============================================================

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Geriye dönük uyumluluk için (pg query kullanan servisler için basit bir wrapper)
const query = async (text, params = []) => {
  try {
    const result = await prisma.$queryRawUnsafe(text, ...params);
    return { rows: Array.isArray(result) ? result : [result], rowCount: Array.isArray(result) ? result.length : 1 };
  } catch (error) {
    console.error('Raw query error:', error);
    throw error;
  }
};

const transaction = async (callback) => {
  return await prisma.$transaction(async (tx) => {
    const client = {
      query: async (text, params) => {
        const result = await tx.$queryRawUnsafe(text, ...(params || []));
        return { rows: Array.isArray(result) ? result : [result], rowCount: Array.isArray(result) ? result.length : 1 };
      },
      release: () => {}
    };
    return await callback(client);
  });
};

module.exports = { prisma, query, transaction };
