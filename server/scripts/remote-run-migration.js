const { Client } = require('ssh2');
const fs = require('fs');
const PASS = process.env.SSH_PASS;

function exec(conn, cmd) {
  return new Promise((resolve, reject) => {
    conn.exec(cmd, (err, stream) => {
      if (err) return reject(err);
      stream.on('close', (c) => resolve(c ?? 0));
      stream.on('data', (d) => process.stdout.write(d));
      stream.stderr.on('data', (d) => process.stderr.write(d));
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
          sftp.close(handle, (cErr) => (cErr ? reject(cErr) : resolve()));
        });
      });
    });
  });
}

const migrationScript = `
require('dotenv').config({ path: '/var/www/takason/server/.env' });
const { Client } = require('pg');
const url = process.env.DIRECT_URL || process.env.DATABASE_URL;
const client = new Client({ connectionString: url });
const sql = \`
CREATE TABLE IF NOT EXISTS user_reviews (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  author_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  score INTEGER NOT NULL CHECK (score >= 1 AND score <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(author_id, user_id)
);
CREATE INDEX IF NOT EXISTS idx_user_reviews_user_id ON user_reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_user_reviews_author_id ON user_reviews(author_id);

CREATE TABLE IF NOT EXISTS item_reviews (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  author_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  item_id TEXT NOT NULL REFERENCES items(id) ON DELETE CASCADE,
  score INTEGER NOT NULL CHECK (score >= 1 AND score <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(author_id, item_id)
);
CREATE INDEX IF NOT EXISTS idx_item_reviews_item_id ON item_reviews(item_id);
CREATE INDEX IF NOT EXISTS idx_item_reviews_author_id ON item_reviews(author_id);
\`;
client.connect()
  .then(() => client.query(sql))
  .then(() => { console.log('Migration OK'); client.end(); })
  .catch(e => { console.error('FAILED:', e.message); client.end(); process.exit(1); });
`;

(async () => {
  const conn = new Client();
  await new Promise((res, rej) =>
    conn.on('ready', res).on('error', rej).connect({ host: '31.57.33.89', username: 'root', password: PASS })
  );

  console.log('Uploading migration script...');
  await upload(conn, migrationScript, '/tmp/do_migration.js');

  console.log('Running migration...');
  await exec(conn, 'cp /tmp/do_migration.js /var/www/takason/server/do_migration.js && cd /var/www/takason/server && node do_migration.js; rm -f do_migration.js /tmp/do_migration.js');

  conn.end();
  console.log('Done.');
})().catch((e) => { console.error(e); process.exit(1); });
