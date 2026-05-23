const { Client } = require('ssh2');
const fs = require('fs');
const PASS = process.env.SSH_PASS;
if (!PASS) { console.error('SSH_PASS required'); process.exit(1); }

const BUNDLE_PATH = 'C:/Users/Administrator/Desktop/asdasd-main-20260519T193254Z-3-001/deploy2.bundle';

const NGINX_CONF = `server {
    listen 80;
    server_name takason.com.tr www.takason.com.tr;

    # Frontend statik dosyaları
    location / {
        root /var/www/takason/react-app/dist;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # Kullanıcı yüklemeleri (uploads klasörü) - diskten direkt servis
    location /uploads/ {
        alias /var/www/takason/server/uploads/;
        expires 7d;
        add_header Cache-Control "public, immutable";
        try_files $uri =404;
    }

    # API yönlendirmesi
    location /api/ {
        rewrite ^/api/api/(.*)$ /api/$1 break;
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}`;

function exec(conn, cmd) {
  return new Promise((resolve, reject) => {
    conn.exec(cmd, (err, stream) => {
      if (err) return reject(err);
      let code = 0;
      stream.on('close', (c) => resolve(c ?? 0));
      stream.on('data', (d) => process.stdout.write(d));
      stream.stderr.on('data', (d) => process.stderr.write(d));
    });
  });
}

function upload(conn, localPath, remotePath) {
  return new Promise((resolve, reject) => {
    conn.sftp((err, sftp) => {
      if (err) return reject(err);
      const ws = sftp.createWriteStream(remotePath);
      ws.on('close', resolve);
      ws.on('error', reject);
      fs.createReadStream(localPath).pipe(ws);
    });
  });
}

function uploadText(conn, content, remotePath) {
  return new Promise((resolve, reject) => {
    conn.sftp((err, sftp) => {
      if (err) return reject(err);
      const ws = sftp.createWriteStream(remotePath);
      ws.on('close', resolve);
      ws.on('error', reject);
      ws.end(Buffer.from(content));
    });
  });
}

(async () => {
  const conn = new Client();
  await new Promise((res, rej) =>
    conn.on('ready', res).on('error', rej).connect({ host: '31.57.33.89', username: 'root', password: PASS })
  );

  // 1. Git bundle yükle ve pull et
  console.log('\n>>> Uploading git bundle...');
  await upload(conn, BUNDLE_PATH, '/tmp/deploy2.bundle');
  await exec(conn, 'cd /var/www/takason && git pull /tmp/deploy2.bundle main && rm -f /tmp/deploy2.bundle');

  // 2. uploads klasörü oluştur
  await exec(conn, 'mkdir -p /var/www/takason/server/uploads && chmod 755 /var/www/takason/server/uploads');

  // 3. Nginx konfigürasyonunu güncelle
  console.log('\n>>> Updating Nginx config...');
  const nginxPath = '/etc/nginx/sites-available/takason.com.tr';
  await uploadText(conn, NGINX_CONF, '/tmp/takason-nginx.conf');
  await exec(conn, `cp /tmp/takason-nginx.conf ${nginxPath} && rm /tmp/takason-nginx.conf`);

  // sites-enabled symlink kontrol
  await exec(conn, `ls -la /etc/nginx/sites-enabled/ | grep takason || ln -s ${nginxPath} /etc/nginx/sites-enabled/takason.com.tr`);

  // Nginx test + reload
  await exec(conn, 'nginx -t && nginx -s reload');
  console.log('Nginx reloaded.');

  // 4. PM2 restart
  await exec(conn, 'pm2 restart takason-api --update-env');

  // 5. Sağlık kontrolü
  await exec(conn, 'sleep 4 && wget -qO- http://127.0.0.1:5000/api/health');
  await exec(conn, 'wget -qO- -S http://127.0.0.1/uploads/ 2>&1 | head -5 || true');

  conn.end();
  console.log('\nDeploy + Nginx fix complete.');
})().catch((e) => { console.error(e); process.exit(1); });
