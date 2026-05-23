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

  console.log('\n=== NGINX CONFIG ===');
  await exec(conn, 'cat /etc/nginx/sites-enabled/takason.com.tr 2>/dev/null || cat /etc/nginx/sites-enabled/default 2>/dev/null | head -80');

  console.log('\n=== UPLOADS DIR ===');
  await exec(conn, 'ls /var/www/takason/server/uploads/ 2>/dev/null | head -20 && echo "---" && ls /var/www/takason/server/uploads/ 2>/dev/null | wc -l');

  console.log('\n=== EXPRESS UPLOAD ROUTE ===');
  await exec(conn, 'grep -n "upload\\|static\\|UPLOAD" /var/www/takason/server/app.js | head -15');

  console.log('\n=== PM2 RECENT LOGS ===');
  await exec(conn, 'tail -40 /var/www/takason/server/logs/error.log 2>/dev/null || pm2 logs takason-api --lines 40 --nostream 2>&1 | tail -40');

  console.log('\n=== DB CONNECTION TEST ===');
  await exec(conn, 'cd /var/www/takason/server && node -e "require(\'dotenv\').config(); const {PrismaClient}=require(\'./prisma/generated-client\'); const p=new PrismaClient(); p.$queryRaw`SELECT 1 as ok`.then(r=>{ console.log(\'DB OK:\',r); p.$disconnect(); }).catch(e=>{ console.error(\'DB ERR:\',e.message); process.exit(1); });"');

  conn.end();
})().catch((e) => { console.error(e); process.exit(1); });
