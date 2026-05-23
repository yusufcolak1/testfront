const { Client } = require('ssh2');
const PASS = process.env.SSH_PASS;

(async () => {
  const conn = new Client();
  await new Promise((res, rej) =>
    conn.on('ready', res).on('error', rej).connect({ host: '31.57.33.89', username: 'root', password: PASS })
  );

  await new Promise((resolve) => {
    conn.exec('curl -s -o /dev/null -w "STATUS:%{http_code} TYPE:%{content_type}" -H "Host: takason.com.tr" http://127.0.0.1/assets/index-CiimaFv0.js && echo "" && curl -s -o /dev/null -w "STATUS:%{http_code} TYPE:%{content_type}" -H "Host: takason.com.tr" http://127.0.0.1/', (err, stream) => {
      let out = '';
      stream.on('data', d => { out += d; process.stdout.write(d); });
      stream.stderr.on('data', d => process.stderr.write(d));
      stream.on('close', () => { if (!out) console.log('(no output - nginx may not be listening on 127.0.0.1:80)'); resolve(); });
    });
  });

  // Check if nginx is running at all
  await new Promise((resolve) => {
    conn.exec('netstat -tlnp 2>/dev/null | grep :80 || ss -tlnp | grep :80', (err, stream) => {
      stream.on('data', d => process.stdout.write(d));
      stream.stderr.on('data', d => process.stderr.write(d));
      stream.on('close', resolve);
    });
  });

  conn.end();
})().catch(e => { console.error(e); process.exit(1); });
