// Authentication Middleware
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * JWT token doğrulama middleware
 */
const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'Token bulunamadı' 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        role: true,
        status: true
      }
    });

    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Kullanıcı bulunamadı' 
      });
    }

    if (user.status !== 'ACTIVE') {
      return res.status(403).json({ 
        success: false, 
        message: 'Hesabınız aktif değil' 
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(401).json({ 
      success: false, 
      message: 'Geçersiz token' 
    });
  }
};

/**
 * Admin yetkisi kontrolü
 */
const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({ 
      success: false, 
      message: 'Bu işlem için admin yetkisi gereklidir' 
    });
  }
  next();
};

/**
 * Moderator veya Admin yetkisi kontrolü
 */
const requireModerator = (req, res, next) => {
  if (req.user.role !== 'ADMIN' && req.user.role !== 'MODERATOR') {
    return res.status(403).json({ 
      success: false, 
      message: 'Bu işlem için moderator yetkisi gereklidir' 
    });
  }
  next();
};

module.exports = {
  authenticate,
  requireAdmin,
  requireModerator
};
