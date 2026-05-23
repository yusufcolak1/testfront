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

  console.log('\n=== ALL UPLOADED FILES ===');
  await exec(conn, 'find /var/www/takason/server/uploads/ -type f | head -30');

  console.log('\n=== PROFILE AVATARS IN DB ===');
  await exec(conn, `cd /var/www/takason/server && node -e "
require('dotenv').config();
const { PrismaClient } = require('./prisma/generated-client');
const p = new PrismaClient();
p.profile.findMany({ select: { avatar: true }, where: { avatar: { not: null } }, take: 10 })
  .then(rows => {
    rows.forEach(r => console.log('avatar:', r.avatar));
    p.\\$disconnect();
  })
  .catch(e => { console.error(e.message); p.\\$disconnect(); });
"`);

  console.log('\n=== ITEM IMAGES WITH /uploads IN DB ===');
  await exec(conn, `cd /var/www/takason/server && node -e "
require('dotenv').config();
const { PrismaClient } = require('./prisma/generated-client');
const p = new PrismaClient();
p.itemImage.findMany({ where: { imageUrl: { contains: '/uploads/' } }, take: 10 })
  .then(rows => {
    console.log('count:', rows.length);
    rows.forEach(r => console.log(r.imageUrl));
    p.\\$disconnect();
  })
  .catch(e => { console.error(e.message); p.\\$disconnect(); });
"`);

  console.log('\n=== TRUST PROXY CHECK (new errors since restart) ===');
  await exec(conn, 'pm2 logs takason-api --lines 5 --nostream 2>&1 | grep -c "ERR_ERL" || echo "0 errors (trust proxy working)"');

  conn.end();
})().catch((e) => { console.error(e); process.exit(1); });
