const { Client } = require('ssh2');
const PASS = process.env.SSH_PASS;

function exec(conn, cmd) {
  return new Promise((resolve) => {
    conn.exec(cmd, (err, stream) => {
      if (err) { console.error('exec err:', err); return resolve(); }
      stream.on('data', d => process.stdout.write(d));
      stream.stderr.on('data', d => process.stderr.write(d));
      stream.on('close', resolve);
    });
  });
}

(async () => {
  const conn = new Client();
  await new Promise((res, rej) =>
    conn.on('ready', res).on('error', rej).connect({ host: '31.57.33.89', username: 'root', password: PASS })
  );

  console.log('=== ALL LISTENING PORTS ===');
  await exec(conn, 'ss -tlnp 2>&1');

  console.log('\n=== NGINX FULL CONFIG TEST ===');
  await exec(conn, 'nginx -T 2>&1 | grep -E "listen" | grep -v "#"');

  conn.end();
})().catch(e => { console.error(e); process.exit(1); });
