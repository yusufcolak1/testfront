const { prisma } = require('../config/database');
const { findTradeCycles } = require('../services/cycleService');

async function testCycleDetection() {
    console.log('=== ÇOKLU TAKAS DÖNGÜSÜ TESPİT TESTİ BAŞLATILIYOR ===\n');

    try {
        // 1. Gerekli kategorilerin olduğundan emin ol
        const categories = ['Elektronik', 'Mobilya', 'Kitap'];
        for (const catName of categories) {
            await prisma.category.upsert({
                where: { slug: catName.toLowerCase() },
                update: {},
                create: { name: catName, slug: catName.toLowerCase() }
            });
        }

        const catElektronik = await prisma.category.findFirst({ where: { name: 'Elektronik' } });
        const catMobilya = await prisma.category.findFirst({ where: { name: 'Mobilya' } });
        const catKitap = await prisma.category.findFirst({ where: { name: 'Kitap' } });

        // 2. 3 farklı kullanıcı bul veya oluştur
        const users = await prisma.user.findMany({ take: 3 });
        if (users.length < 3) {
            console.log('⚠️ Test için en az 3 kullanıcı gerekiyor.');
            return;
        }

        // 3. Döngüsel ilanları oluştur (veya güncelle)
        // İlan A: Sahibi User 0, Kategorisi Elektronik, İstediği Mobilya
        const itemA = await prisma.item.create({
            data: {
                title: 'Test İlan A (Elektronik)',
                description: 'Test açıklaması A',
                condition: 'NEW',
                status: 'ACTIVE',
                categoryId: catElektronik.id,
                userId: users[0].id,
                wantedCategories: JSON.stringify(['Mobilya']),
                location: 'İstanbul',
                estimatedValue: 1000
            }
        });

        // İlan B: Sahibi User 1, Kategorisi Mobilya, İstediği Kitap
        const itemB = await prisma.item.create({
            data: {
                title: 'Test İlan B (Mobilya)',
                description: 'Test açıklaması B',
                condition: 'NEW',
                status: 'ACTIVE',
                categoryId: catMobilya.id,
                userId: users[1].id,
                wantedCategories: JSON.stringify(['Kitap']),
                location: 'İstanbul',
                estimatedValue: 1000
            }
        });

        // İlan C: Sahibi User 2, Kategorisi Kitap, İstediği Elektronik
        const itemC = await prisma.item.create({
            data: {
                title: 'Test İlan C (Kitap)',
                description: 'Test açıklaması C',
                condition: 'NEW',
                status: 'ACTIVE',
                categoryId: catKitap.id,
                userId: users[2].id,
                wantedCategories: JSON.stringify(['Elektronik']),
                location: 'İstanbul',
                estimatedValue: 1000
            }
        });

        console.log('✅ Test ilanları (A, B, C) döngüsel olarak oluşturuldu.\n');

        // 4. Algoritmayı çalıştır
        console.log('🔍 İlan A için döngü aranıyor...');
        const cycles = await findTradeCycles(itemA.id);

        console.log(`- Bulunan döngü sayısı: ${cycles.length}`);

        if (cycles.length > 0) {
            console.log('✅ BAŞARILI: Zincirleme takas tespit edildi!');
            cycles[0].steps.forEach((step, i) => {
                console.log(`  Adım ${i+1}: ${step.from} -> ${step.give} verir, ${step.take} alır (Kime: ${step.toUser})`);
            });
        } else {
            console.log('❌ HATA: Döngü tespit edilemedi.');
        }

        // Temizlik (Opsiyonel: test ilanlarını silebilirsiniz)
        // await prisma.item.deleteMany({ where: { id: { in: [itemA.id, itemB.id, itemC.id] } } });

    } catch (error) {
        console.error('🛑 TEST HATASI:', error);
    } finally {
        await prisma.$disconnect();
    }
}

testCycleDetection();
