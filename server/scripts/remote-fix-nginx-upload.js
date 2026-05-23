const { Client } = require('ssh2');
const PASS = process.env.SSH_PASS;

function exec(conn, cmd) {
  return new Promise((resolve, reject) => {
    conn.exec(cmd, (err, stream) => {
      if (err) return reject(err);
      stream.on('close', (c) => resolve(c ?? 0));
      stream.on('data', (d) => process.stdout.write(d));
      stream.stderr.on('data', (d) => process.stderr.write(d));
    });
  });
}

(async () => {
  const conn = new Client();
  await new Promise((res, rej) =>
    conn.on('ready', res).on('error', rej).connect({ host: '31.57.33.89', username: 'root', password: PASS })
  );

  console.log('Checking current nginx config...');
  await exec(conn, 'grep -n "client_max_body_size" /etc/nginx/sites-available/takason.com.tr || echo "(not set)"');

  console.log('\nAdding/updating client_max_body_size to 50m...');
  // Eğer zaten varsa güncelle, yoksa server bloğunun içine ekle
  await exec(conn, `
    if grep -q "client_max_body_size" /etc/nginx/sites-available/takason.com.tr; then
      sed -i 's/client_max_body_size[^;]*;/client_max_body_size 50m;/g' /etc/nginx/sites-available/takason.com.tr
      echo "Updated existing client_max_body_size"
    else
      sed -i '/^server {/a\\    client_max_body_size 50m;' /etc/nginx/sites-available/takason.com.tr
      echo "Added client_max_body_size 50m"
    fi
  `);

  console.log('\nVerifying...');
  await exec(conn, 'grep "client_max_body_size" /etc/nginx/sites-available/takason.com.tr');

  console.log('\nTesting nginx config...');
  await exec(conn, 'nginx -t');

  console.log('\nReloading nginx...');
  await exec(conn, 'nginx -s reload && echo "Nginx reloaded OK"');

  conn.end();
  console.log('Done.');
})().catch((e) => { console.error(e); process.exit(1); });
