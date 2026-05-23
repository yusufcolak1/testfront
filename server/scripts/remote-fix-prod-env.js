const { Client } = require('ssh2');
const fs = require('fs');
const path = require('path');

const PASS = process.env.SSH_PASS;
if (!PASS) {
  console.error('SSH_PASS required');
  process.exit(1);
}

const envPath = path.join(__dirname, '..', '.env');
const envText = fs.readFileSync(envPath, 'utf8');
const get = (key) => {
  const m = envText.match(new RegExp(`^${key}=(.*)$`, 'm'));
  return m ? m[1].replace(/^"|"$/g, '') : null;
};

const databaseUrl = get('DATABASE_URL');
const directUrl = get('DIRECT_URL');
if (!databaseUrl?.startsWith('postgresql')) {
  console.error('Local DATABASE_URL missing or invalid');
  process.exit(1);
}

const patchScript = `
const fs = require('fs');
const p = '/var/www/takason/server/.env';
let t = fs.readFileSync(p, 'utf8');
const set = (key, val) => {
  const line = key + '="' + val.replace(/"/g, '\\\\"') + '"';
  if (new RegExp('^' + key + '=', 'm').test(t)) t = t.replace(new RegExp('^' + key + '=.*$', 'm'), line);
  else t += '\\n' + line + '\\n';
};
set('NODE_ENV', 'production');
set('DATABASE_URL', ${JSON.stringify(databaseUrl)});
${directUrl ? `set('DIRECT_URL', ${JSON.stringify(directUrl)});` : ''}
set('ALLOWED_ORIGINS', 'https://takason.com.tr,https://www.takason.com.tr,http://localhost:5173,http://localhost:5174');
fs.writeFileSync(p, t);
console.log('env updated');
`;

function exec(conn, cmd) {
  return new Promise((resolve, reject) => {
    conn.exec(cmd, (err, stream) => {
      if (err) return reject(err);
      let code = 0;
      stream.on('close', (c) => resolve(c ?? 0));
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

  const remoteScript = '/tmp/patch-env.js';
  await new Promise((resolve, reject) => {
    conn.sftp((err, sftp) => {
      if (err) return reject(err);
      const ws = sftp.createWriteStream(remoteScript);
      ws.on('close', resolve);
      ws.on('error', reject);
      ws.end(Buffer.from(patchScript));
    });
  });

  await exec(conn, `node ${remoteScript} && rm -f ${remoteScript}`);
  await exec(conn, 'cd /var/www/takason/server && npx prisma generate');
  await exec(conn, 'pm2 restart takason-api --update-env');
  await exec(conn, 'sleep 6 && wget -qO- http://127.0.0.1:5000/api/health');
  conn.end();
  console.log('\nProduction env fix complete.');
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
