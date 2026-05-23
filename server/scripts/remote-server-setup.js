const { Client } = require('ssh2');

const HOST = process.env.SSH_HOST || '31.57.33.89';
const USER = process.env.SSH_USER || 'root';
const PASS = process.env.SSH_PASS;

if (!PASS) {
  console.error('SSH_PASS environment variable is required');
  process.exit(1);
}

const steps = [
  {
    id: 1,
    title: 'Sunucu envanteri',
    cmd: `echo "=== OS ===" && cat /etc/os-release | head -5 && echo "=== CPU/RAM ===" && nproc && free -h | head -2 && echo "=== DISK ===" && df -h / && echo "=== EXISTING ===" && (node -v 2>/dev/null || echo "node: yok") && (npm -v 2>/dev/null || echo "npm: yok") && (pm2 -v 2>/dev/null || echo "pm2: yok") && (nginx -v 2>&1 || echo "nginx: yok") && (git --version 2>/dev/null || echo "git: yok")`,
  },
  {
    id: 2,
    title: 'Paket listesi güncelleme',
    cmd: 'export DEBIAN_FRONTEND=noninteractive && apt-get update -y',
  },
  {
    id: 3,
    title: 'Temel araçlar (curl, git, build-essential, ufw)',
    cmd: 'export DEBIAN_FRONTEND=noninteractive && apt-get install -y curl git unzip ca-certificates gnupg build-essential ufw',
  },
  {
    id: 4,
    title: 'Node.js 20 LTS kurulumu',
    cmd: `bash -lc 'if command -v node >/dev/null 2>&1 && node -v | grep -q "v20"; then echo "Node 20 zaten kurulu: $(node -v)"; else curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && apt-get install -y nodejs; fi && node -v && npm -v'`,
  },
  {
    id: 5,
    title: 'PM2 kurulumu',
    cmd: `bash -lc 'if command -v pm2 >/dev/null 2>&1; then echo "PM2 zaten kurulu: $(pm2 -v)"; else npm install -g pm2; fi && pm2 -v'`,
  },
  {
    id: 6,
    title: 'Nginx kurulumu',
    cmd: 'export DEBIAN_FRONTEND=noninteractive && apt-get install -y nginx && nginx -v',
  },
  {
    id: 7,
    title: 'Certbot (SSL) kurulumu',
    cmd: 'export DEBIAN_FRONTEND=noninteractive && apt-get install -y certbot python3-certbot-nginx && certbot --version',
  },
  {
    id: 8,
    title: 'Proje dizini oluşturma',
    cmd: 'mkdir -p /var/www/takason && mkdir -p /var/www/takason/server/uploads && chown -R root:root /var/www/takason && ls -la /var/www/takason',
  },
  {
    id: 9,
    title: 'Firewall (UFW) yapılandırması',
    cmd: `bash -lc 'ufw allow OpenSSH && ufw allow 80/tcp && ufw allow 443/tcp && ufw --force enable && ufw status verbose'`,
  },
  {
    id: 10,
    title: 'Servis durumları',
    cmd: 'systemctl enable nginx && systemctl restart nginx && systemctl is-active nginx && ss -tlnp | egrep ":22|:80|:443|:5000" || true',
  },
  {
    id: 11,
    title: 'Kurulum özeti',
    cmd: `echo "=== KURULUM ÖZETİ ===" && node -v && npm -v && pm2 -v && nginx -v 2>&1 && certbot --version && echo "Dizin: /var/www/takason"`,
  },
];

function exec(conn, cmd) {
  return new Promise((resolve, reject) => {
    conn.exec(cmd, (err, stream) => {
      if (err) return reject(err);
      let stdout = '';
      let stderr = '';
      stream.on('close', (code) => resolve({ code, stdout, stderr }));
      stream.on('data', (d) => { stdout += d.toString(); process.stdout.write(d); });
      stream.stderr.on('data', (d) => { stderr += d.toString(); process.stderr.write(d); });
    });
  });
}

async function main() {
  const conn = new Client();
  const report = [];

  await new Promise((resolve, reject) => {
    conn.on('ready', resolve).on('error', reject).connect({
      host: HOST,
      port: 22,
      username: USER,
      password: PASS,
      readyTimeout: 30000,
    });
  });

  console.log(`\n✅ SSH bağlantısı başarılı: ${USER}@${HOST}\n`);

  for (const step of steps) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`ADIM ${step.id}: ${step.title}`);
    console.log('='.repeat(60));
    const started = Date.now();
    try {
      const result = await exec(conn, step.cmd);
      const ok = result.code === 0;
      report.push({
        step: step.id,
        title: step.title,
        status: ok ? 'OK' : 'FAIL',
        exitCode: result.code,
        durationMs: Date.now() - started,
      });
      console.log(`\n→ Sonuç: ${ok ? 'BAŞARILI' : 'HATA'} (exit ${result.code}, ${Date.now() - started}ms)`);
      if (!ok) {
        console.error('Adım başarısız, devam ediliyor...');
      }
    } catch (e) {
      report.push({
        step: step.id,
        title: step.title,
        status: 'ERROR',
        error: e.message,
        durationMs: Date.now() - started,
      });
      console.error(`\n→ HATA: ${e.message}`);
    }
  }

  conn.end();

  console.log(`\n${'#'.repeat(60)}`);
  console.log('KURULUM RAPORU');
  console.log('#'.repeat(60));
  for (const r of report) {
    console.log(`${r.step}. [${r.status}] ${r.title}${r.exitCode != null ? ` (exit ${r.exitCode})` : ''}${r.error ? ` - ${r.error}` : ''}`);
  }
  const failed = report.filter((r) => r.status !== 'OK');
  console.log(`\nToplam: ${report.length} adım, Başarılı: ${report.length - failed.length}, Başarısız: ${failed.length}`);
  process.exit(failed.length ? 1 : 0);
}

main().catch((e) => {
  console.error('SSH bağlantı hatası:', e.message);
  process.exit(1);
});
