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

function upload(conn, content, remote) {
  return new Promise((resolve, reject) => {
    conn.sftp((err, sftp) => {
      if (err) return reject(err);
      const buf = Buffer.from(content, 'utf8');
      sftp.open(remote, 'w', (oErr, handle) => {
        if (oErr) return reject(oErr);
        sftp.write(handle, buf, 0, buf.length, 0, (wErr) => {
          if (wErr) return reject(wErr);
          sftp.close(handle, (cErr) => cErr ? reject(cErr) : resolve());
        });
      });
    });
  });
}

const seedScript = `
require('dotenv').config({ path: '/var/www/takason/server/.env' });
const { prisma } = require('/var/www/takason/server/config/database');

const settings = [
  { key: 'social.instagram', value: '', type: 'TEXT', group: 'social', isPublic: true,  description: 'Instagram profil linki' },
  { key: 'social.facebook',  value: '', type: 'TEXT', group: 'social', isPublic: true,  description: 'Facebook sayfa linki' },
  { key: 'social.twitter',   value: '', type: 'TEXT', group: 'social', isPublic: true,  description: 'Twitter/X profil linki' },
  { key: 'social.youtube',   value: '', type: 'TEXT', group: 'social', isPublic: true,  description: 'YouTube kanal linki' },
  { key: 'social.tiktok',    value: '', type: 'TEXT', group: 'social', isPublic: true,  description: 'TikTok profil linki' },
];

(async () => {
  for (const s of settings) {
    await prisma.siteSetting.upsert({
      where: { key: s.key },
      update: { type: s.type, group: s.group, isPublic: s.isPublic, description: s.description },
      create: s,
    });
    console.log('upserted:', s.key);
  }
  await prisma.$disconnect().catch(() => {});
  console.log('Done.');
})().catch(e => { console.error(e); process.exit(1); });
`;

(async () => {
  const conn = new Client();
  await new Promise((res, rej) =>
    conn.on('ready', res).on('error', rej).connect({ host: '31.57.33.89', username: 'root', password: PASS })
  );

  await upload(conn, seedScript, '/var/www/takason/server/seed_social.js');
  await exec(conn, 'cd /var/www/takason/server && node seed_social.js; rm -f seed_social.js');

  conn.end();
})().catch(e => { console.error(e); process.exit(1); });
