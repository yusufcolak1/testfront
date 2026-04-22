// ============================================================
// TAKASON - Prisma Seed (Başlangıç Verisi)
// Kategorileri yerleştir: npx prisma db seed
// ============================================================

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const categories = [
  {
    name: 'Elektronik',
    slug: 'elektronik',
    children: [
      { name: 'Telefon & Tablet', slug: 'telefon-tablet' },
      { name: 'Bilgisayar & Laptop', slug: 'bilgisayar-laptop' },
      { name: 'Oyun & Konsol', slug: 'oyun-konsol' },
      { name: 'Fotoğraf & Kamera', slug: 'fotograf-kamera' },
      { name: 'TV & Ses Sistemleri', slug: 'tv-ses' },
    ],
  },
  {
    name: 'Giyim & Aksesuar',
    slug: 'giyim-aksesuar',
    children: [
      { name: 'Erkek Giyim', slug: 'erkek-giyim' },
      { name: 'Kadın Giyim', slug: 'kadin-giyim' },
      { name: 'Çocuk Giyim', slug: 'cocuk-giyim' },
      { name: 'Ayakkabı', slug: 'ayakkabi' },
      { name: 'Çanta & Cüzdan', slug: 'canta-cuzdан' },
    ],
  },
  {
    name: 'Ev & Yaşam',
    slug: 'ev-yasam',
    children: [
      { name: 'Mobilya', slug: 'mobilya' },
      { name: 'Ev Aletleri', slug: 'ev-aletleri' },
      { name: 'Dekorasyon', slug: 'dekorasyon' },
      { name: 'Mutfak Gereçleri', slug: 'mutfak' },
    ],
  },
  {
    name: 'Spor & Outdoor',
    slug: 'spor-outdoor',
    children: [
      { name: 'Fitness & Spor Aletleri', slug: 'fitness' },
      { name: 'Bisiklet & Scooter', slug: 'bisiklet-scooter' },
      { name: 'Kamp & Outdoor', slug: 'kamp-outdoor' },
    ],
  },
  {
    name: 'Kitap, Film & Müzik',
    slug: 'kitap-film-muzik',
    children: [
      { name: 'Kitaplar', slug: 'kitaplar' },
      { name: 'Filmler & Diziler', slug: 'filmler-diziler' },
      { name: 'Müzik Aletleri', slug: 'muzik-aletleri' },
    ],
  },
  {
    name: 'Araç & Vasıta',
    slug: 'arac-vasita',
    children: [
      { name: 'Otomobil Aksesuarları', slug: 'otomobil-aksesuar' },
      { name: 'Motosiklet', slug: 'motosiklet' },
    ],
  },
];

async function main() {
  console.log('🌱 Seed verisi yükleniyor...');

  for (const cat of categories) {
    const { children, ...parentData } = cat;

    // Ana kategoriyi oluştur
    const parent = await prisma.category.upsert({
      where: { slug: parentData.slug },
      update: {},
      create: parentData,
    });

    // Alt kategorileri oluştur
    if (children && children.length > 0) {
      for (const child of children) {
        await prisma.category.upsert({
          where: { slug: child.slug },
          update: {},
          create: { ...child, parentId: parent.id },
        });
      }
    }
  }

  const count = await prisma.category.count();
  console.log(`✅ ${count} kategori yüklendi.`);
}

main()
  .catch((err) => {
    console.error('❌ Seed hatası:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
