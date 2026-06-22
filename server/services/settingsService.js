// ============================================================
// TAKASON - Settings Service (key/value, cached)
// ============================================================

const { prisma } = require('../config/database');

let cache = null;
let cacheTime = 0;
// PM2 cluster'da her process kendi cache'ini tutar; admin güncellemesi diğer
// process'lere yayılmaz. Settings tablosu küçük (~24 kayıt) olduğundan
// cache'i devre dışı bırakıp her seferinde DB'den okumak daha güvenli.
const TTL = 0; // cache kapalı

async function getAll(force = false) {
  const now = Date.now();
  if (!force && TTL > 0 && cache && (now - cacheTime) < TTL) return cache;
  const rows = await prisma.siteSetting.findMany();
  cache = {};
  for (const r of rows) {
    let v = r.value;
    if (r.type === 'NUMBER') v = Number(r.value);
    else if (r.type === 'BOOLEAN') v = r.value === 'true' || r.value === '1';
    else if (r.type === 'JSON') {
      try { v = JSON.parse(r.value); } catch { /* ignore */ }
    }
    cache[r.key] = { value: v, raw: r.value, type: r.type, group: r.group, isPublic: r.isPublic, description: r.description };
  }
  cacheTime = now;
  return cache;
}

async function get(key, defaultValue = null) {
  const all = await getAll();
  return all[key]?.value ?? defaultValue;
}

async function getGroup(group, { onlyPublic = false } = {}) {
  const all = await getAll();
  const out = {};
  for (const [k, v] of Object.entries(all)) {
    if (v.group === group && (!onlyPublic || v.isPublic)) {
      out[k] = v.value;
    }
  }
  return out;
}

async function getPublic() {
  const all = await getAll();
  const out = {};
  for (const [k, v] of Object.entries(all)) {
    if (v.isPublic || k === 'auth.google.clientId') out[k] = v.value;
  }
  return out;
}

async function set(key, value, opts = {}) {
  const stringValue = typeof value === 'object' ? JSON.stringify(value) : String(value);
  const data = {
    value: stringValue,
    ...(opts.type && { type: opts.type }),
    ...(opts.group && { group: opts.group }),
    ...(opts.description !== undefined && { description: opts.description }),
    ...(opts.isPublic !== undefined && { isPublic: opts.isPublic }),
  };
  await prisma.siteSetting.upsert({
    where: { key },
    update: data,
    create: { key, ...data, type: opts.type || 'STRING', group: opts.group || 'general' },
  });
  cache = null; // invalidate
}

function invalidate() { cache = null; }

module.exports = { getAll, get, getGroup, getPublic, set, invalidate };
