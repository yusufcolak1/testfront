const { Client } = require('ssh2');
const PASS = process.env.SSH_PASS;
if (!PASS) process.exit(1);

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
  await exec(conn, 'node -e "const fs=require(\'fs\'); const p=\'/var/www/takason/server/.env\'; const t=fs.readFileSync(p,\'utf8\'); const m=t.match(/^DATABASE_URL=(.*)$/m); console.log(\'DATABASE_URL set:\', !!m, m?\'len=\'+m[1].length:\'\'); console.log(\'starts postgres:\', m?m[1].startsWith(\'postgresql\'):false);"');
  await exec(conn, 'head -5 /var/www/takason/server/prisma/schema.prisma');
  await exec(conn, 'pm2 logs takason-api --lines 15 --nostream 2>&1 | tail -20');
  conn.end();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
