// Admin Panel Settings Model
// Cloudinary ve diğer ayarları veritabanında saklar

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class Settings {
  /**
   * Cloudinary ayarlarını al
   */
  static async getCloudinarySettings() {
    try {
      const settings = await prisma.settings.findFirst({
        where: { key: 'cloudinary' }
      });

      if (settings) {
        return JSON.parse(settings.value);
      }

      // Varsayılan değerler (environment variables'dan)
      return {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
        apiSecret: process.env.CLOUDINARY_API_SECRET
      };
    } catch (error) {
      console.error('Cloudinary ayarları alınamadı:', error);
      return {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
        apiSecret: process.env.CLOUDINARY_API_SECRET
      };
    }
  }

  /**
   * Cloudinary ayarlarını güncelle (Admin only)
   */
  static async updateCloudinarySettings(cloudName, apiKey, apiSecret) {
    try {
      const value = JSON.stringify({
        cloudName,
        apiKey,
        apiSecret
      });

      const existing = await prisma.settings.findFirst({
        where: { key: 'cloudinary' }
      });

      if (existing) {
        return await prisma.settings.update({
          where: { id: existing.id },
          data: { value, updatedAt: new Date() }
        });
      } else {
        return await prisma.settings.create({
          data: {
            key: 'cloudinary',
            value,
            description: 'Cloudinary API credentials'
          }
        });
      }
    } catch (error) {
      console.error('Cloudinary ayarları güncellenemedi:', error);
      throw error;
    }
  }

  /**
   * Tüm ayarları al
   */
  static async getAllSettings() {
    try {
      const settings = await prisma.settings.findMany();
      const result = {};

      settings.forEach(setting => {
        try {
          result[setting.key] = JSON.parse(setting.value);
        } catch {
          result[setting.key] = setting.value;
        }
      });

      return result;
    } catch (error) {
      console.error('Ayarlar alınamadı:', error);
      return {};
    }
  }

  /**
   * Ayar güncelle veya oluştur
   */
  static async upsertSetting(key, value, description = '') {
    try {
      const valueStr = typeof value === 'object' ? JSON.stringify(value) : value;

      const existing = await prisma.settings.findFirst({
        where: { key }
      });

      if (existing) {
        return await prisma.settings.update({
          where: { id: existing.id },
          data: { value: valueStr, updatedAt: new Date() }
        });
      } else {
        return await prisma.settings.create({
          data: { key, value: valueStr, description }
        });
      }
    } catch (error) {
      console.error(`Ayar güncellenemedi (${key}):`, error);
      throw error;
    }
  }
}

module.exports = Settings;
