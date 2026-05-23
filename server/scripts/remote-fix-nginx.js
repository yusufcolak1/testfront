const { Client } = require('ssh2');
const PASS = process.env.SSH_PASS;
if (!PASS) { console.error('SSH_PASS required'); process.exit(1); }

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

const nginxConf = `server {
    listen 80;
    server_name takason.com.tr www.takason.com.tr;

    location / {
        root /var/www/takason/react-app/dist;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    location /uploads/ {
        alias /var/www/takason/server/uploads/;
        expires 7d;
        add_header Cache-Control "public, immutable";
        try_files $uri =404;
    }

    location /api/ {
        rewrite ^/api/api/(.*)$ /api/$1 break;
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection upgrade;
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}`;

const writeCmd = `node -e "require('fs').writeFileSync('/etc/nginx/sites-available/takason.com.tr', ${JSON.stringify(nginxConf)}); console.log('nginx conf written');"`;

(async () => {
  const conn = new Client();
  await new Promise((res, rej) =>
    conn.on('ready', res).on('error', rej).connect({ host: '31.57.33.89', username: 'root', password: PASS })
  );

  await exec(conn, writeCmd);
  await exec(conn, 'cat /etc/nginx/sites-available/takason.com.tr');
  await exec(conn, 'nginx -t && nginx -s reload && echo "Nginx reloaded OK"');
  await exec(conn, 'mkdir -p /var/www/takason/server/uploads && chmod 755 /var/www/takason/server/uploads');

  // Verify /uploads/ is handled
  await exec(conn, 'wget -qO- -S http://127.0.0.1/uploads/nonexistent.jpg 2>&1 | head -5 || true');

  conn.end();
  console.log('\nNginx config fix complete.');
})().catch((e) => { console.error(e); process.exit(1); });
