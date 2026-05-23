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

(async () => {
  const conn = new Client();
  await new Promise((res, rej) =>
    conn.on('ready', res).on('error', rej).connect({ host: '31.57.33.89', username: 'root', password: PASS })
  );

  console.log('\n=== DEFAULT NGINX CONFIG ===');
  await exec(conn, 'cat /etc/nginx/sites-available/default 2>/dev/null || echo "(no default file)"');

  console.log('\n=== TEST CURL FOR ASSET ===');
  await exec(conn, 'curl -s -I http://localhost/assets/index-CiimaFv0.js | head -10');

  console.log('\n=== NGINX MIME TYPES CHECK ===');
  await exec(conn, 'grep -r "include" /etc/nginx/nginx.conf | head -10');

  conn.end();
})().catch(e => { console.error(e); process.exit(1); });
