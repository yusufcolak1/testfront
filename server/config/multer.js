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
    // Güvenli dosya adı: uuid + orijinal uzantı
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${uuidv4()}${ext}`);
  },
});

// İzin verilen MIME türleri
const allowedMimeTypes = (process.env.ALLOWED_MIME_TYPES || 'image/jpeg,image/png,image/webp').split(',');

const fileFilter = (req, file, cb) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Desteklenmeyen dosya türü: ${file.mimetype}. İzin verilenler: ${allowedMimeTypes.join(', ')}`), false);
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
