const { Client } = require('ssh2');
const PASS = process.env.SSH_PASS;

function exec(conn, cmd) {
  return new Promise((resolve, reject) => {
    conn.exec(cmd, (err, stream) => {
      if (err) return reject(err);
      stream.on('close', () => resolve());
      stream.on('data', d => process.stdout.write(d));
      stream.stderr.on('data', d => process.stderr.write(d));
    });
  });
}

function upload(conn, content, remote) {
  return new Promise((resolve, reject) => {
    conn.sftp((err, sftp) => {
      if (err) return reject(err);
      const buf = Buffer.from(content, 'utf8');
      sftp.open(remote, 'w', (oErr, handle) => {
        if (oErr) return reject(oErr);
        sftp.write(handle, buf, 0, buf.length, 0, (wErr) => {
          if (wErr) return reject(wErr);
          sftp.close(handle, (cErr) => cErr ? reject(cErr) : resolve());
        });
      });
    });
  });
}

const NGINX_CONF = `server {
    client_max_body_size 50m;
    listen 80;
    server_name takason.com.tr www.takason.com.tr;

    # index.html: asla cache'leme (SPA route farklarini onlemek icin)
    location = /index.html {
        root /var/www/takason/react-app/dist;
        add_header Cache-Control "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0";
        add_header Pragma "no-cache";
        add_header Expires "0";
    }

    # Hashed asset dosyalari: sonsuza kadar cache'le
    location ~* \\.(?:js|css|woff2?|ttf|eot|svg|png|jpg|jpeg|gif|ico|webp)$ {
        root /var/www/takason/react-app/dist;
        expires 1y;
        add_header Cache-Control "public, immutable";
        try_files $uri =404;
    }

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
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
`;

(async () => {
  const conn = new Client();
  await new Promise((res, rej) =>
    conn.on('ready', res).on('error', rej).connect({ host: '31.57.33.89', username: 'root', password: PASS })
  );

  console.log('Uploading new nginx config...');
  await upload(conn, NGINX_CONF, '/tmp/takason_nginx.conf');
  await exec(conn, 'cp /tmp/takason_nginx.conf /etc/nginx/sites-available/takason.com.tr && rm /tmp/takason_nginx.conf');
  
  console.log('Testing nginx config...');
  await exec(conn, 'nginx -t');

  console.log('Reloading nginx...');
  await exec(conn, 'nginx -s reload');

  console.log('Testing asset access...');
  await exec(conn, 'curl -s -o /dev/null -w "HTTP %{http_code} type=%{content_type}\\n" -H "Host: takason.com.tr" http://localhost/assets/index-CiimaFv0.js');
  await exec(conn, 'curl -s -o /dev/null -w "HTTP %{http_code} type=%{content_type}\\n" -H "Host: takason.com.tr" http://localhost/index.html');

  conn.end();
  console.log('Done.');
})().catch(e => { console.error(e); process.exit(1); });
