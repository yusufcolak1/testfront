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

  await exec(conn, 'curl -v -H "Host: takason.com.tr" http://127.0.0.1/assets/index-CiimaFv0.js 2>&1 | head -25');

  conn.end();
})().catch(e => { console.error(e); process.exit(1); });
