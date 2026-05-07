const { prisma } = require('../config/database');
const feedService = require('../services/feedService');
const scoringService = require('../services/scoringService');
const tradeService = require('../services/tradeService');

async function runExtendedTests() {
    console.log('=== TAKASON GENİŞLETİLMİŞ TEST SUİTİ BAŞLATILIYOR ===\n');

    let testUser, testItem;

    try {
        // 0. Ön Hazırlık: Test verisi bul veya oluştur
        testUser = await prisma.user.findFirst({ include: { profile: true } });
        testItem = await prisma.item.findFirst({ where: { status: 'ACTIVE' } });

        if (!testUser || !testItem) {
            console.log('⚠️ Test için yeterli veri bulunamadı. Lütfen DB\'de en az bir kullanıcı ve aktif ilan olduğundan emin olun.');
            return;
        }

        console.log(`Test Kullanıcısı: ${testUser.email}`);
        console.log(`Test İlanı: ${testItem.title} (ID: ${testItem.id})\n`);

        // --- TEST 1: Feed Servisi - Mod Seçimi (Cold vs Warm) ---
        console.log('[TEST 1] Feed Modu Kontrolü...');
        const interactionCount = await prisma.userInteraction.count({ where: { userId: testUser.id, weight: { gt: 0 } } });
        const feed = await feedService.generateFeed(testUser.id);
        
        const expectedMode = interactionCount >= 20 ? 'personalized' : 'cold_start';
        if (feed.meta.mode === expectedMode) {
            console.log(`✅ BAŞARILI: Feed modu '${feed.meta.mode}' olarak doğru belirlendi. (Etkileşim: ${interactionCount})`);
        } else {
            console.log(`❌ HATA: Beklenen mod ${expectedMode}, gelen ${feed.meta.mode}`);
        }

        // --- TEST 2: Etkileşim Kaydı ve Sayaçlar ---
        console.log('\n[TEST 2] Etkileşim Kaydı ve Sayaç Güncelleme...');
        const initialViews = testItem.viewCount || 0;
        await feedService.recordInteraction(testUser.id, testItem.id, 'VIEW');
        
        const updatedItem = await prisma.item.findUnique({ where: { id: testItem.id } });
        if (updatedItem.viewCount === initialViews + 1) {
            console.log('✅ BAŞARILI: VIEW etkileşimi sonrası viewCount 1 arttı.');
        } else {
            console.log(`❌ HATA: viewCount artmadı. Başlangıç: ${initialViews}, Son: ${updatedItem.viewCount}`);
        }

        // --- TEST 3: Geçersiz Etkileşim Tipi ---
        console.log('\n[TEST 3] Hata Yönetimi (Geçersiz Tip)...');
        try {
            await feedService.recordInteraction(testUser.id, testItem.id, 'UÇUR_BENİ');
            console.log('❌ HATA: Geçersiz tip hata fırlatmalıydı.');
        } catch (err) {
            console.log('✅ BAŞARILI: Geçersiz tip için beklenen hata alındı:', err.message);
        }

        // --- TEST 4: Scoring Service Edge Cases ---
        console.log('\n[TEST 4] Skorlama Motoru Kenar Durumlar...');
        const distScore = scoringService.calcDistanceScore(null, null, 41.0, 29.0, 'İstanbul', 'Ankara');
        console.log(`- Mesafe (Koordinatsız): ${distScore.toFixed(2)} (Beklenen: ~0.30)`);
        
        const fairScore = scoringService.calcFairnessScore(0, 1000);
        console.log(`- Fiyat Dengesi (Sıfır Fiyat): ${fairScore.toFixed(2)} (Beklenen: 0.50)`);
        
        if (distScore === 0.3 && fairScore === 0.5) {
            console.log('✅ BAŞARILI: Kenar durumlar güvenli şekilde yönetiliyor.');
        }

        // --- TEST 5: Trade Matches (İkili Eşleşme) ---
        console.log('\n[TEST 5] İkili Eşleşme Mantığı...');
        // İlanın sahibi olarak istek yapıyoruz (Güvenlik kontrolü için)
        const matches = await tradeService.findPotentialMatches(testItem.id, testItem.userId);
        console.log(`- Bulunan eşleşme sayısı: ${matches.length}`);
        if (Array.isArray(matches)) {
            console.log('✅ BAŞARILI: findPotentialMatches dizi döndürdü.');
            if (matches.length > 0) {
                console.log(`- En yüksek uyum skoru: %${(matches[0]._matchScore * 100).toFixed(1)}`);
            }
        }

    } catch (error) {
        console.error('\n🛑 TEST SIRASINDA KRİTİK HATA:', error);
    } finally {
        await prisma.$disconnect();
        console.log('\n=== TESTLER TAMAMLANDI ===');
    }
}

runExtendedTests();
