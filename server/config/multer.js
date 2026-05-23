// ============================================================
// TAKASON - Multer Medya Yükleme Yapılandırması
// Şimdilik local disk, ileride S3 adaptörüne geçiş için modüler
// ============================================================

const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Yükleme klasörü yoksa oluştur
const uploadDir = process.env.UPLOAD_DIR || 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ============================================================
// Disk Storage (Lokal sunucu)
// S3'e geçişte sadece bu storage'ı değiştir, geri kalan kod aynı kalır
// ============================================================
const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Tarih bazlı klasör yapısı: uploads/2024/01/
    const now = new Date();
    const subDir = path.join(
      uploadDir,
      String(now.getFullYear()),
      String(now.getMonth() + 1).padStart(2, '0')
    );

    if (!fs.existsSync(subDir)) {
      fs.mkdirSync(subDir, { recursive: true });
    }

    cb(null, subDir);
  },
  filename: (req, file, cb) => {
    // MIME türüne göre güvenli uzantı belirle
    const mimeToExt = {
      'image/jpeg': '.jpg', 'image/jpg': '.jpg',
      'image/png': '.png', 'image/webp': '.webp',
      'image/gif': '.gif', 'image/avif': '.avif',
      'image/heic': '.jpg', 'image/heif': '.jpg', // sunucuda HEIC → .jpg olarak sakla
      'image/tiff': '.jpg', 'image/bmp': '.jpg',
    };
    const extFromMime = mimeToExt[file.mimetype];
    const extFromName = path.extname(file.originalname).toLowerCase();
    const ext = extFromMime || extFromName || '.jpg';
    cb(null, `${uuidv4()}${ext}`);
  },
});

// Tüm image/* türlerini kabul et (HEIC, HEIF, AVIF, kamera çekimleri dahil)
const fileFilter = (req, file, cb) => {
  if (file.mimetype && file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error(`Desteklenmeyen dosya türü: ${file.mimetype}. Sadece görsel dosyaları yüklenebilir.`), false);
  }
};

// Tek görsel yükleme (avatar vb.)
const uploadSingle = multer({
  storage: diskStorage,
  fileFilter,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 10 * 1024 * 1024, // 10MB
  },
}).single('image');

// Çoklu görsel yükleme (ilan görselleri - max 10)
const uploadMultiple = multer({
  storage: diskStorage,
  fileFilter,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 10 * 1024 * 1024, // 10MB
    files: 10, // Maksimum 10 görsel
  },
}).array('images', 10);

// Promise wrapper - async/await ile kullanım için
const handleUploadSingle = (req, res) => {
  return new Promise((resolve, reject) => {
    uploadSingle(req, res, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

const handleUploadMultiple = (req, res) => {
  return new Promise((resolve, reject) => {
    uploadMultiple(req, res, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

module.exports = {
  handleUploadSingle,
  handleUploadMultiple,
};
