# TAKASON Backend - PM2 Üretim Yapılandırması
# Kullanım: pm2 start ecosystem.config.js --env production

module.exports = {
  apps: [
    {
      name: 'takason-api',
      script: './server.js',

      # ---- Cluster Mode: Tüm CPU çekirdeklerini kullan ----
      instances: 'max',       # Otomatik: CPU çekirdeği sayısı kadar
      exec_mode: 'cluster',

      # ---- Çevresel Değişkenler ----
      env: {
        NODE_ENV: 'development',
        PORT: 5000,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 5000,
      },

      # ---- Otomatik Yeniden Başlatma ----
      watch: false,           # Üretimde watch kapalı
      max_memory_restart: '500M', # 500MB'ı geçince yeniden başlat

      # ---- Çarpışma Koruması ----
      min_uptime: '10s',      # En az 10 saniye ayakta kalmalı
      max_restarts: 10,       # Arka arkaya 10 çöküşten sonra dur

      # ---- Log Ayarları ----
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      error_file: './logs/error.log',
      out_file: './logs/out.log',
      merge_logs: true,
    },
  ],
};
