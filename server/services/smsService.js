// ============================================================
// TAKASON - SMS Service (DB ayarlarından — netgsm/twilio destekler)
// ============================================================

const settings = require('./settingsService');

async function sendSms({ to, message }) {
  const cfg = await settings.getGroup('sms');
  const provider = cfg['sms.provider'];
  const apiKey = cfg['sms.apiKey'];

  if (!provider || !apiKey) {
    console.warn('[sms] Sağlayıcı yapılandırılmadı, SMS gönderilmedi:', to);
    return { skipped: true };
  }

  // Hafif HTTP wrappers — sağlayıcılara göre genişletilebilir
  try {
    if (provider === 'netgsm') {
      const params = new URLSearchParams({
        usercode: cfg['sms.apiKey'],
        password: cfg['sms.apiSecret'],
        gsmno: to,
        message,
        msgheader: cfg['sms.sender'] || 'TAKASON',
      });
      const res = await fetch(`https://api.netgsm.com.tr/sms/send/get?${params}`);
      const text = await res.text();
      return { ok: res.ok, response: text };
    }
    if (provider === 'twilio') {
      const auth = Buffer.from(`${cfg['sms.apiKey']}:${cfg['sms.apiSecret']}`).toString('base64');
      const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${cfg['sms.apiKey']}/Messages.json`, {
        method: 'POST',
        headers: { Authorization: `Basic ${auth}`, 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ To: to, From: cfg['sms.sender'], Body: message }),
      });
      return { ok: res.ok, response: await res.text() };
    }
    if (provider === 'iletimerkezi') {
      // İleti Merkezi REST API (basit JSON gönderim)
      const res = await fetch('https://api.iletimerkezi.com/v1/send-sms/json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          request: {
            authentication: { username: cfg['sms.apiKey'], password: cfg['sms.apiSecret'] },
            order: { sender: cfg['sms.sender'] || 'TAKASON', message: { text: message, receipents: { number: [to] } } },
          },
        }),
      });
      return { ok: res.ok, response: await res.text() };
    }
    return { ok: false, message: `Bilinmeyen SMS sağlayıcı: ${provider}` };
  } catch (err) {
    console.error('[sms] Hata:', err);
    return { ok: false, message: err.message };
  }
}

module.exports = { sendSms };
