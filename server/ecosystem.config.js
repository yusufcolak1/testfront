// TAKASON Backend - PM2 Production Configuration
// Usage: pm2 start ecosystem.config.js --env production

module.exports = {
  apps: [
    {
      name: 'takason-api',
      script: './server.js',

      // ---- Cluster Mode: Use all CPU cores ----
      instances: 'max',       // Automatic: number of CPU cores
      exec_mode: 'cluster',

      // ---- Environment Variables ----
      env: {
        NODE_ENV: 'development',
        PORT: 5000,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 5000,
      },

      // ---- Auto Restart ----
      watch: false,           // Watch disabled in production
      max_memory_restart: '500M', // Restart if exceeds 500MB

      // ---- Crash Protection ----
      min_uptime: '10s',      // Must stay up for at least 10 seconds
      max_restarts: 10,       // Stop after 10 consecutive crashes

      // ---- Log Settings ----
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      error_file: './logs/error.log',
      out_file: './logs/out.log',
      merge_logs: true,
    },
  ],
};
