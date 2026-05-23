const { Client } = require('ssh2');
const fs = require('fs');
const PASS = process.env.SSH_PASS;
const BUNDLE = process.env.BUNDLE_PATH;
if (!PASS || !BUNDLE) { console.error('SSH_PASS and BUNDLE_PATH required'); process.exit(1); }

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

function upload(conn, local, remote) {
  return new Promise((resolve, reject) => {
    conn.sftp((err, sftp) => {
      if (err) return reject(err);
      const buf = fs.readFileSync(local);
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

(async () => {
  const conn = new Client();
  await new Promise((res, rej) =>
    conn.on('ready', res).on('error', rej).connect({ host: '31.57.33.89', username: 'root', password: PASS })
  );

  console.log('Uploading bundle:', BUNDLE);
  await upload(conn, BUNDLE, '/tmp/qdeploy.bundle');
  await exec(conn, 'cd /var/www/takason && git pull /tmp/qdeploy.bundle main && rm /tmp/qdeploy.bundle');
  await exec(conn, 'pm2 reload all --update-env');
  await exec(conn, 'cat /var/www/takason/react-app/dist/index.html');

  conn.end();
  console.log('Done.');
})().catch((e) => { console.error(e); process.exit(1); });
