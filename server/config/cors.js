// ============================================================
// TAKASON - CORS (Cross-Origin Resource Sharing) Yapılandırması
// İzin verilen origin'ler .env'den okunur
// ============================================================

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map((o) => o.trim())
  : ['http://localhost:3000', 'http://localhost:5173'];

const corsOptions = {
  origin: (origin, callback) => {
    // Postman/curl gibi araçlardan gelen isteklere izin ver (origin yoksa)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS politikası bu origin'e izin vermiyor: ${origin}`));
    }
  },
  credentials: true,          // Cookie ve auth header'larına izin ver
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['X-Total-Count'], // Sayfalama için
  maxAge: 86400,              // Preflight cache süresi (saniye) = 24 saat
};

module.exports = corsOptions;
