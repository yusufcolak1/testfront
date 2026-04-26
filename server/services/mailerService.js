// ============================================================
// TAKASON - Mailer Service (DB ayarlarından SMTP)
// ============================================================

const nodemailer = require('nodemailer');
const settings = require('./settingsService');

let transporter = null;
let lastConfig = null;

async function getTransporter() {
  const cfg = await settings.getGroup('smtp');
  const sig = JSON.stringify(cfg);
  if (transporter && lastConfig === sig) return transporter;

  if (!cfg['smtp.host']) {
    return null; // SMTP henüz yapılandırılmadı
  }

  transporter = nodemailer.createTransport({
    host: cfg['smtp.host'],
    port: parseInt(cfg['smtp.port']) || 587,
    secure: cfg['smtp.secure'] === true || cfg['smtp.secure'] === 'true',
    auth: cfg['smtp.user'] ? { user: cfg['smtp.user'], pass: cfg['smtp.password'] } : undefined,
  });
  lastConfig = sig;
  return transporter;
}

async function sendMail({ to, subject, html, text }) {
  const t = await getTransporter();
  if (!t) {
    console.warn('[mailer] SMTP yapılandırılmadı, e-posta gönderilmedi:', to, subject);
    return { skipped: true };
  }
  const from = await settings.get('smtp.from', 'noreply@takason.com');
  return t.sendMail({ from, to, subject, html, text });
}

async function verify() {
  const t = await getTransporter();
  if (!t) return { ok: false, message: 'SMTP yapılandırılmadı' };
  try {
    await t.verify();
    return { ok: true };
  } catch (err) {
    return { ok: false, message: err.message };
  }
}

function reset() { transporter = null; lastConfig = null; }

module.exports = { sendMail, verify, reset };
