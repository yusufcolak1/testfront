// Kapsamlı E2E API testi
const BASE = 'http://localhost:5000/api';

const log = (label, data) => {
  console.log(`\n=== ${label} ===`);
  console.log(typeof data === 'string' ? data : JSON.stringify(data, null, 2));
};

const req = async (method, path, body = null, token = null) => {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;
  const opts = { method, headers };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(`${BASE}${path}`, opts);
  const text = await res.text();
  let data;
  try { data = JSON.parse(text); } catch { data = text; }
  return { status: res.status, data };
};

(async () => {
  let pass = 0, fail = 0;
  const check = (cond, name) => {
    if (cond) { console.log(`  ✅ ${name}`); pass++; }
    else { console.log(`  ❌ ${name}`); fail++; }
  };

  // 1. Health
  log('1. HEALTH CHECK', await req('GET', '/health'));

  // 2. Categories
  const cats = await req('GET', '/categories');
  log('2. CATEGORIES', `${cats.data.data?.length || 0} kategori bulundu`);
  check(cats.status === 200 && cats.data.success, 'Kategoriler getirildi');
  check(cats.data.data?.length >= 28, '28+ kategori var');

  const electronicsCat = cats.data.data?.find(c => c.slug === 'telefon-tablet');
  check(!!electronicsCat, 'Telefon & Tablet kategorisi bulundu');

  // 3. Register
  const email = `test_${Date.now()}@takason.com`;
  const reg = await req('POST', '/auth/register', {
    email,
    password: 'Test1234!',
    firstName: 'Ahmet',
    lastName: 'Test',
  });
  log('3. REGISTER', reg);
  check(reg.status === 201 || reg.status === 200, 'Kayıt başarılı');

  // 4. Login
  const login = await req('POST', '/auth/login', { email, password: 'Test1234!' });
  log('4. LOGIN', login);
  const token = login.data.data?.tokens?.accessToken || login.data.data?.accessToken;
  check(login.status === 200 && !!token, 'Login başarılı');

  // 5. Items list (empty initially OK)
  const items = await req('GET', '/items?limit=5');
  log('5. ITEMS LIST', items);
  check(items.status === 200 && items.data.success, 'Items endpoint çalışıyor');

  // 6. Create item (auth required)
  if (token && electronicsCat) {
    const create = await req('POST', '/items', {
      categoryId: electronicsCat.id,
      title: 'Test iPhone 13',
      description: 'Sıfır gibi, kutusunda',
      condition: 'LIKE_NEW',
      location: 'İstanbul',
      estimatedValue: 25000,
    }, token);
    log('6. CREATE ITEM', create);
    check(create.status === 201 || create.status === 200, 'İlan oluşturuldu');

    // 7. List items again
    const items2 = await req('GET', '/items?limit=5');
    log('7. ITEMS AFTER CREATE', `Toplam: ${items2.data.pagination?.total}`);
    check(items2.data.data?.length > 0, 'Oluşturulan ilan listede görünüyor');
  }

  // 8. Wrong endpoint -> 404
  const bad = await req('GET', '/nonexistent');
  log('8. UNKNOWN ENDPOINT', bad.status);
  check(bad.status === 404, '404 doğru dönüyor');

  console.log(`\n=========================`);
  console.log(`SONUÇ: ${pass} BAŞARILI / ${fail} BAŞARISIZ`);
  console.log(`=========================`);
  process.exit(fail > 0 ? 1 : 0);
})();
