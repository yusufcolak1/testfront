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

  console.log('\n=== premium.enabled setting in DB ===');
  await exec(conn, `cd /var/www/takason/server && node -e "
require('dotenv').config();
const { PrismaClient } = require('./prisma/generated-client');
const p = new PrismaClient();
p.siteSetting.findMany({ where: { key: { startsWith: 'premium' } } })
  .then(rows => { console.log(JSON.stringify(rows, null, 2)); p.\\$disconnect(); })
  .catch(e => { console.error(e.message); p.\\$disconnect(); });
"`);

  console.log('\n=== /api/admin/stats test (need admin token) ===');
  await exec(conn, `cd /var/www/takason/server && node -e "
require('dotenv').config();
const { PrismaClient } = require('./prisma/generated-client');
const p = new PrismaClient();
Promise.all([
  p.user.count(),
  p.item.count(),
  p.trade.count(),
  p.fAQ.count(),
  p.category.count(),
  p.item.count({ where: { status: 'ACTIVE' } }),
  p.trade.count({ where: { status: 'PENDING' } }),
]).then(([users, items, trades, faqs, categories, activeItems, pendingTrades]) => {
  console.log(JSON.stringify({ users, items, trades, faqs, categories, activeItems, pendingTrades }, null, 2));
  p.\\$disconnect();
}).catch(e => { console.error('STATS ERROR:', e.message); p.\\$disconnect(); });
"`);

  conn.end();
})().catch((e) => { console.error(e); process.exit(1); });
