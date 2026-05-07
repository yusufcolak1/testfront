const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('--- Veritabanı Onarım ve Test Scripti ---');

  // 1. Resim yollarını düzelt (Eğer /uploads/2026/04/ altında değillerse)
  const images = await prisma.itemImage.findMany();
  let fixedCount = 0;
  
  for (const img of images) {
    if (img.imageUrl.startsWith('/uploads/') && !img.imageUrl.includes('/2026/04/')) {
      const fileName = img.imageUrl.replace('/uploads/', '');
      const newPath = `/uploads/2026/04/${fileName}`;
      
      await prisma.itemImage.update({
        where: { id: img.id },
        data: { imageUrl: newPath }
      });
      fixedCount++;
    }
  }
  console.log(`✅ ${fixedCount} adet resim yolu güncellendi.`);

  // 2. Yeni Soru-Cevap sistemini test et
  const items = await prisma.item.findMany({ take: 1 });
  if (items.length > 0) {
    const item = items[0];
    const user = await prisma.user.findFirst();
    
    if (user) {
      const q = await prisma.itemQuestion.create({
        data: {
          itemId: item.id,
          userId: user.id,
          question: 'Bu ürün hala satılık mı?'
        }
      });
      console.log('✅ Test sorusu oluşturuldu:', q.question);
      
      const updatedQ = await prisma.itemQuestion.update({
        where: { id: q.id },
        data: { answer: 'Evet, hala duruyor.' }
      });
      console.log('✅ Test cevabı eklendi:', updatedQ.answer);
    }
  }

  console.log('--- İşlem Tamamlandı ---');
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
