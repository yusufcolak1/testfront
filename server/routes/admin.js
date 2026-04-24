// Admin Routes - Settings Management
const express = require('express');
const router = express.Router();
const Settings = require('../models/Settings');
const { authenticate, requireAdmin } = require('../middleware/auth');

/**
 * GET /api/admin/settings
 * Tüm ayarları getir (Admin only)
 */
router.get('/settings', authenticate, requireAdmin, async (req, res) => {
  try {
    const settings = await Settings.getAllSettings();
    res.json({ success: true, data: settings });
  } catch (error) {
    console.error('Ayarlar getirilemedi:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Ayarlar getirilemedi' 
    });
  }
});

/**
 * GET /api/admin/settings/cloudinary
 * Cloudinary ayarlarını getir (Admin only)
 */
router.get('/settings/cloudinary', authenticate, requireAdmin, async (req, res) => {
  try {
    const cloudinary = await Settings.getCloudinarySettings();
    res.json({ success: true, data: cloudinary });
  } catch (error) {
    console.error('Cloudinary ayarları getirilemedi:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Cloudinary ayarları getirilemedi' 
    });
  }
});

/**
 * PUT /api/admin/settings/cloudinary
 * Cloudinary ayarlarını güncelle (Admin only)
 */
router.put('/settings/cloudinary', authenticate, requireAdmin, async (req, res) => {
  try {
    const { cloudName, apiKey, apiSecret } = req.body;

    // Validation
    if (!cloudName || !apiKey || !apiSecret) {
      return res.status(400).json({
        success: false,
        message: 'Tüm alanlar gereklidir'
      });
    }

    await Settings.updateCloudinarySettings(cloudName, apiKey, apiSecret);

    res.json({ 
      success: true, 
      message: 'Cloudinary ayarları güncellendi' 
    });
  } catch (error) {
    console.error('Cloudinary ayarları güncellenemedi:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Cloudinary ayarları güncellenemedi' 
    });
  }
});

/**
 * PUT /api/admin/settings/:key
 * Genel ayar güncelleme (Admin only)
 */
router.put('/settings/:key', authenticate, requireAdmin, async (req, res) => {
  try {
    const { key } = req.params;
    const { value, description } = req.body;

    if (!value) {
      return res.status(400).json({
        success: false,
        message: 'Değer gereklidir'
      });
    }

    await Settings.upsertSetting(key, value, description);

    res.json({ 
      success: true, 
      message: `${key} ayarı güncellendi` 
    });
  } catch (error) {
    console.error('Ayar güncellenemedi:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Ayar güncellenemedi' 
    });
  }
});

module.exports = router;
