const fs = require('fs');
const path = require('path');

async function testAvatarUpload() {
  console.log('--- Profil Fotoğrafı Yükleme API Testi Başlıyor ---');
  const baseUrl = 'http://localhost:5000';
  
  // 1. Yeni bir test kullanıcısı kaydet
  const randomSuffix = Math.floor(Math.random() * 100000);
  const email = `testuser_${randomSuffix}@example.com`;
  const password = 'TestPassword123!';
  
  console.log(`1. Test kullanıcısı kaydediliyor: ${email}`);
  const registerRes = await fetch(`${baseUrl}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      password,
      firstName: 'Test',
      lastName: 'User'
    })
  });
  
  const registerJson = await registerRes.json();
  if (!registerJson.success) {
    throw new Error(`Kayıt başarısız: ${JSON.stringify(registerJson)}`);
  }
  
  const token = registerJson.data.tokens.accessToken;
  console.log('✅ Kullanıcı başarıyla kaydedildi. Token alındı.');

  // 2. Bir test resmi oluştur (1x1 piksel dummy PNG)
  const dummyPng = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==', 'base64');
  const tempImagePath = path.join(__dirname, 'test_avatar.png');
  fs.writeFileSync(tempImagePath, dummyPng);
  console.log('2. Test PNG dosyası oluşturuldu:', tempImagePath);

  try {
    // 3. FormData ile profil güncelleme (Avatar Yükleme)
    console.log('3. Profil fotoğrafı yükleme isteği gönderiliyor...');
    const formData = new FormData();
    formData.append('firstName', 'TestUpdated');
    formData.append('lastName', 'UserUpdated');
    formData.append('bio', 'Bu bir test biosudur.');
    
    // Node.js native Blob formatında dosyayı ekliyoruz
    const imageBlob = new Blob([dummyPng], { type: 'image/png' });
    formData.append('image', imageBlob, 'test_avatar.png');

    const profileRes = await fetch(`${baseUrl}/api/users/me/profile`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });

    const profileJson = await profileRes.json();
    console.log('API Yanıtı:', JSON.stringify(profileJson, null, 2));

    if (profileJson.success && profileJson.data.avatarUrl) {
      console.log('✅ API testi başarılı! avatarUrl:', profileJson.data.avatarUrl);
      
      // 4. Dosyanın sunucu tarafında oluşturulduğunu doğrula
      const absoluteUploadedPath = path.join(__dirname, '..', profileJson.data.avatarUrl);
      console.log('Yüklenen dosya yolu:', absoluteUploadedPath);
      if (fs.existsSync(absoluteUploadedPath)) {
        console.log('✅ Yüklenen dosya sunucu klasöründe mevcut.');
      } else {
        console.warn('❌ Hata: Dosya sunucunun diskinde bulunamadı.');
      }
    } else {
      console.error('❌ Hata: API başarısız yanıt döndürdü veya avatarUrl boş.');
    }
  } finally {
    // Test dosyasını temizle
    if (fs.existsSync(tempImagePath)) {
      fs.unlinkSync(tempImagePath);
    }
  }
}

testAvatarUpload().catch(err => {
  console.error('❌ Hata oluştu:', err);
});
