const { Client } = require('ssh2');
const PASS = process.env.SSH_PASS;
if (!PASS) { console.error('SSH_PASS required'); process.exit(1); }

function exec(conn, cmd) {
  return new Promise((resolve, reject) => {
    conn.exec(cmd, (err, stream) => {
      if (err) return reject(err);
      stream.on('close', () => resolve());
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

  console.log('\n=== UPLOADS DIRECTORY ===');
  await exec(conn, 'ls -la /var/www/takason/server/uploads/ 2>/dev/null || echo "dir missing"');
  await exec(conn, 'find /var/www/takason/server/uploads/ -type f 2>/dev/null | wc -l');

  console.log('\n=== TEST: /uploads/ returns 404 for missing file ===');
  await exec(conn, 'wget -S -q http://127.0.0.1/uploads/nofile.jpg -O /dev/null 2>&1 | head -5 || true');

  console.log('\n=== RECENT PM2 ERRORS (after trust proxy fix) ===');
  await exec(conn, 'pm2 logs takason-api --lines 10 --nostream 2>&1 | tail -15');

  console.log('\n=== DB IMAGE URLS IN DB ===');
  await exec(conn, `cd /var/www/takason/server && node -e "
require('dotenv').config();
const { PrismaClient } = require('./prisma/generated-client');
const p = new PrismaClient();
p.item.findMany({ select: { id: true, images: true }, take: 5 })
  .then(items => {
    items.forEach(i => console.log(i.id, JSON.stringify(i.images).substring(0, 120)));
    return p.user.findMany({ select: { id: true, avatar: true }, where: { avatar: { not: null } }, take: 5 });
  })
  .then(users => {
    users.forEach(u => console.log('avatar:', u.avatar));
    p.\\$disconnect();
  })
  .catch(e => { console.error(e.message); p.\\$disconnect(); });
"`);

  conn.end();
})().catch((e) => { console.error(e); process.exit(1); });
