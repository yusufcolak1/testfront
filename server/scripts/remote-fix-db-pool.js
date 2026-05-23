/**
 * Fixes production DATABASE_URL to use Supabase PgBouncer (port 6543, transaction mode).
 * Port 5432 (session mode) limits to 15 connections total → exhausted with PM2 cluster.
 * Port 6543 (PgBouncer) allows many connections by pooling them.
 */
const { Client } = require('ssh2');
const fs = require('fs');
const PASS = process.env.SSH_PASS;
if (!PASS) { console.error('SSH_PASS required'); process.exit(1); }

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

function uploadText(conn, content, remotePath) {
  return new Promise((resolve, reject) => {
    conn.sftp((err, sftp) => {
      if (err) return reject(err);
      const buf = Buffer.from(content, 'utf8');
      sftp.open(remotePath, 'w', (oErr, handle) => {
        if (oErr) return reject(oErr);
        sftp.write(handle, buf, 0, buf.length, 0, (wErr) => {
          if (wErr) return reject(wErr);
          sftp.close(handle, (cErr) => (cErr ? reject(cErr) : resolve()));
        });
      });
    });
  });
}

// This script runs on the remote server to patch the .env
const patchScript = `
const fs = require('fs');
const path = '/var/www/takason/server/.env';
let t = fs.readFileSync(path, 'utf8');

// Extract current DATABASE_URL to get credentials
const m = t.match(/^DATABASE_URL="?([^"\\n]+)"?/m);
if (!m) { console.error('DATABASE_URL not found'); process.exit(1); }
let url = m[1];
console.log('Current URL:', url.replace(/:([^@]+)@/, ':***@'));

// Check current port
const isSession = url.includes(':5432');
const isPgBouncer = url.includes(':6543');
console.log('Mode:', isSession ? 'SESSION (5432) - BAD' : isPgBouncer ? 'PGBOUNCER (6543) - GOOD' : 'UNKNOWN');

if (isSession) {
  // Switch from session mode (5432) to pgbouncer (6543) and add required params
  url = url.replace(':5432/', ':6543/');
  // Clean old params and set correct ones
  const base = url.split('?')[0];
  url = base + '?pgbouncer=true&connection_limit=2&sslmode=require';
  
  const line = 'DATABASE_URL="' + url + '"';
  t = t.replace(/^DATABASE_URL="?[^"\\n]*"?/m, line);
  fs.writeFileSync(path, t);
  console.log('Fixed DATABASE_URL:', url.replace(/:([^@]+)@/, ':***@'));
} else if (isPgBouncer && !url.includes('pgbouncer=true')) {
  // Has 6543 but missing pgbouncer=true param
  const base = url.split('?')[0];
  url = base + '?pgbouncer=true&connection_limit=2&sslmode=require';
  const line = 'DATABASE_URL="' + url + '"';
  t = t.replace(/^DATABASE_URL="?[^"\\n]*"?/m, line);
  fs.writeFileSync(path, t);
  console.log('Fixed pgbouncer params:', url.replace(/:([^@]+)@/, ':***@'));
} else {
  console.log('Already using PgBouncer mode - no change needed');
}
`;

(async () => {
  const conn = new Client();
  await new Promise((res, rej) =>
    conn.on('ready', res).on('error', rej).connect({ host: '31.57.33.89', username: 'root', password: PASS })
  );

  console.log('Uploading patch script...');
  await uploadText(conn, patchScript, '/tmp/fix-db-pool.js');

  console.log('\n=== Patching DATABASE_URL ===');
  await exec(conn, 'node /tmp/fix-db-pool.js && rm /tmp/fix-db-pool.js');

  console.log('\n=== Restarting PM2 with new env ===');
  await exec(conn, 'pm2 restart takason-api --update-env');

  console.log('\n=== Waiting for processes to start... ===');
  await exec(conn, 'sleep 5 && pm2 list | grep takason-api');

  console.log('\n=== Testing DB connection ===');
  await exec(conn, 'wget -qO- http://127.0.0.1:5000/api/health');

  conn.end();
  console.log('\nDatabase pool fix complete.');
})().catch((e) => { console.error(e); process.exit(1); });
