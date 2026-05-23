const { Client } = require('ssh2');
const PASS = process.env.SSH_PASS;
if (!PASS) process.exit(1);

const checks = [
  ['UFW', '/usr/sbin/ufw allow OpenSSH && /usr/sbin/ufw allow 80/tcp && /usr/sbin/ufw allow 443/tcp && /usr/sbin/ufw --force enable && /usr/sbin/ufw status verbose'],
  ['PM2', 'pm2 list || true'],
  ['Nginx', 'ls -la /etc/nginx/sites-enabled && echo --- && cat /etc/nginx/sites-enabled/default 2>/dev/null | head -30'],
  ['Env', 'test -f /var/www/takason/server/.env && echo env-ok || echo env-missing; test -d /var/www/takason/react-app/dist && echo dist-ok || echo dist-missing'],
  ['API', 'curl -sS http://127.0.0.1:5000/api/health || echo api-down'],
  ['HTTP', 'curl -sS -I http://127.0.0.1/ | head -8'],
  ['Ports', 'ss -tlnp | egrep ":22|:80|:443|:5000" || true'],
];

function exec(conn, cmd) {
  return new Promise((resolve, reject) => {
    conn.exec(cmd, (err, stream) => {
      if (err) return reject(err);
      let out = '';
      stream.on('close', () => resolve(out));
      stream.on('data', (d) => { out += d.toString(); process.stdout.write(d); });
      stream.stderr.on('data', (d) => process.stderr.write(d));
    });
  });
}

(async () => {
  const conn = new Client();
  await new Promise((res, rej) => conn.on('ready', res).on('error', rej).connect({ host: '31.57.33.89', username: 'root', password: PASS }));
  console.log('\n=== SUNUCU DURUM RAPORU ===\n');
  for (const [title, cmd] of checks) {
    console.log(`\n--- ${title} ---`);
    await exec(conn, cmd);
  }
  conn.end();
})().catch((e) => { console.error(e.message); process.exit(1); });
