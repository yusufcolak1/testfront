// ============================================================
// TAKASON - Prisma Seed (Tüm dinamik içerik)
// ============================================================

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

const SALT_ROUNDS = 10;

// ------------------------------------------------------------
// CATEGORIES
// ------------------------------------------------------------
const categories = [
  {
    name: 'Elektronik', slug: 'elektronik', icon: 'Smartphone',
    children: [
      { name: 'Telefon & Tablet', slug: 'telefon-tablet' },
      { name: 'Bilgisayar & Laptop', slug: 'bilgisayar-laptop' },
      { name: 'Oyun & Konsol', slug: 'oyun-konsol' },
      { name: 'Fotoğraf & Kamera', slug: 'fotograf-kamera' },
      { name: 'TV & Ses Sistemleri', slug: 'tv-ses' },
    ],
  },
  {
    name: 'Giyim & Aksesuar', slug: 'giyim', icon: 'Shirt',
    children: [
      { name: 'Erkek Giyim', slug: 'erkek-giyim' },
      { name: 'Kadın Giyim', slug: 'kadin-giyim' },
      { name: 'Çocuk Giyim', slug: 'cocuk-giyim' },
      { name: 'Ayakkabı', slug: 'ayakkabi' },
      { name: 'Çanta & Cüzdan', slug: 'canta-cuzdan' },
    ],
  },
  {
    name: 'Mobilya', slug: 'mobilya', icon: 'Sofa',
    children: [
      { name: 'Salon', slug: 'salon' },
      { name: 'Yatak Odası', slug: 'yatak-odasi' },
      { name: 'Mutfak Mobilyası', slug: 'mutfak-mobilya' },
    ],
  },
  {
    name: 'Kitap', slug: 'kitap', icon: 'BookOpen',
    children: [
      { name: 'Roman', slug: 'roman' },
      { name: 'Akademik', slug: 'akademik' },
      { name: 'Çocuk Kitapları', slug: 'cocuk-kitap' },
    ],
  },
  {
    name: 'Müzik', slug: 'muzik', icon: 'Music',
    children: [
      { name: 'Enstrüman', slug: 'enstruman' },
      { name: 'Plak & CD', slug: 'plak-cd' },
    ],
  },
  {
    name: 'Spor & Outdoor', slug: 'spor-outdoor', icon: 'Bike',
    children: [
      { name: 'Bisiklet & Scooter', slug: 'bisiklet-scooter' },
      { name: 'Fitness', slug: 'fitness' },
      { name: 'Kamp & Outdoor', slug: 'kamp-outdoor' },
    ],
  },
  {
    name: 'Antika', slug: 'antika', icon: 'Watch',
    children: [
      { name: 'Saat', slug: 'saat' },
      { name: 'Koleksiyon', slug: 'koleksiyon' },
    ],
  },
  { name: 'Oyun & Konsol Diğer', slug: 'oyun-konsol-diger', icon: 'Gamepad2' },
  { name: 'Diğer', slug: 'diger', icon: 'Box' },
];

// ------------------------------------------------------------
// USERS
// ------------------------------------------------------------
const users = [
  { email: 'admin@takason.com', password: 'Admin123!', firstName: 'Site', lastName: 'Yöneticisi', role: 'ADMIN', score: 1500, swaps: 60, medal: '👑', bio: 'TakasOn ekibi' },
  { email: 'mod@takason.com', password: 'Admin123!', firstName: 'Mehtap', lastName: 'Moderatör', role: 'MODERATOR', score: 1100, swaps: 40, medal: '🛡️', bio: 'İçerik moderatörü' },
  { email: 'hasan@takason.com', password: 'User1234!', firstName: 'Hasan', lastName: 'Kızıltan', role: 'USER', score: 980, swaps: 42, medal: '🥇', bio: 'Her eşya bir hikayedir.', city: 'İstanbul' },
  { email: 'mehmet@takason.com', password: 'User1234!', firstName: 'Mehmet', lastName: 'Yılmaz', role: 'USER', score: 920, swaps: 38, medal: '🥈', bio: 'Adil takas, mutlu hayat.', city: 'Ankara' },
  { email: 'selin@takason.com', password: 'User1234!', firstName: 'Selin', lastName: 'Kaya', role: 'USER', score: 890, swaps: 35, medal: '🥉', bio: 'Moda ve elektronik tutkunu.', city: 'İzmir' },
  { email: 'ahmet@takason.com', password: 'User1234!', firstName: 'Ahmet', lastName: 'Arı', role: 'USER', score: 750, swaps: 28, bio: 'Kitap koleksiyoneri', city: 'Bursa' },
  { email: 'burak@takason.com', password: 'User1234!', firstName: 'Burak', lastName: 'Demir', role: 'USER', score: 680, swaps: 22, bio: 'Müzik ve enstrüman', city: 'Antalya' },
  { email: 'ayse@takason.com', password: 'User1234!', firstName: 'Ayşe', lastName: 'Çelik', role: 'USER', score: 540, swaps: 18, bio: 'Vintage eşya meraklısı', city: 'İstanbul', isPremium: true },
  { email: 'can@takason.com', password: 'User1234!', firstName: 'Can', lastName: 'Öztürk', role: 'USER', score: 460, swaps: 15, bio: 'Outdoor & kamp tutkunu', city: 'Eskişehir' },
  { email: 'deniz@takason.com', password: 'User1234!', firstName: 'Deniz', lastName: 'Korkmaz', role: 'USER', score: 320, swaps: 11, bio: 'Spor ekipmanları', city: 'Adana' },
];

// ------------------------------------------------------------
// ITEMS (kategori slug + user email referans)
// ------------------------------------------------------------
const items = [
  { title: 'Sony PlayStation 5 Digital', categorySlug: 'oyun-konsol', userEmail: 'burak@takason.com', condition: 'LIKE_NEW', estimatedValue: 18000, location: 'İstanbul', swapFor: 'Üst model telefon', tag: 'FEATURED', isFeatured: true, image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&q=80&w=800', desc: 'Az kullanılmış PS5 Digital sürüm. Tüm aksesuarları orijinal kutusunda.' },
  { title: 'Audi R8 Coupe Maket', categorySlug: 'koleksiyon', userEmail: 'hasan@takason.com', condition: 'NEW', estimatedValue: 4500, location: 'İstanbul', swapFor: 'Diğer maket koleksiyonları', tag: 'NEW', image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=800', desc: 'Sıfır, kapalı kutu Audi R8 1:18 ölçek koleksiyon maketi.' },
  { title: 'iPhone 13 Pro 256GB', categorySlug: 'telefon-tablet', userEmail: 'selin@takason.com', condition: 'LIKE_NEW', estimatedValue: 28000, location: 'İzmir', swapFor: 'MacBook Air', tag: 'POPULAR', isPopular: true, image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&q=80&w=800', desc: 'Sierra Blue, %92 batarya sağlığı, kutu+kablo dahil.' },
  { title: 'Nintendo Switch OLED', categorySlug: 'oyun-konsol', userEmail: 'mehmet@takason.com', condition: 'GOOD', estimatedValue: 9500, location: 'Ankara', swapFor: 'PS4 Pro veya nakit üstü', isFeatured: true, image: 'https://images.unsplash.com/photo-1612036782180-6f0822045d23?auto=format&fit=crop&q=80&w=800', desc: 'Beyaz OLED model, 2 kumanda, 1 oyun hediye.' },
  { title: 'Vintage Deri Ceket', categorySlug: 'erkek-giyim', userEmail: 'ayse@takason.com', condition: 'GOOD', estimatedValue: 1800, location: 'İstanbul', swapFor: 'Kadın deri ceket veya nakit üstü', tag: 'POPULAR', isPopular: true, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=800', desc: 'El yapımı, gerçek deri, 80\'ler stili. Beden L.' },
  { title: 'Gaming Laptop ASUS ROG', categorySlug: 'bilgisayar-laptop', userEmail: 'can@takason.com', condition: 'LIKE_NEW', estimatedValue: 42000, location: 'Eskişehir', swapFor: 'MacBook Pro M2', tag: 'FEATURED', isFeatured: true, image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?auto=format&fit=crop&q=80&w=800', desc: 'RTX 3070, 32GB RAM, 1TB SSD. Kutusu mevcut.' },
  { title: 'Klasik Saat Koleksiyonu', categorySlug: 'saat', userEmail: 'hasan@takason.com', condition: 'GOOD', estimatedValue: 12000, location: 'İstanbul', swapFor: 'Modern akıllı saat seti', isPopular: true, image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=800', desc: '5 adet vintage mekanik saat. Hepsi çalışır durumda.' },
  { title: 'Kamp Seti (Full)', categorySlug: 'kamp-outdoor', userEmail: 'can@takason.com', condition: 'GOOD', estimatedValue: 3500, location: 'Eskişehir', swapFor: 'Bisiklet veya fotoğraf makinesi', image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=800', desc: '3 kişilik çadır, 2 uyku tulumu, kamp ocağı.' },
  { title: 'Espresso Makinesi De\'Longhi', categorySlug: 'mutfak', userEmail: 'selin@takason.com', condition: 'LIKE_NEW', estimatedValue: 5500, location: 'İzmir', swapFor: 'Robot süpürge', image: 'https://images.unsplash.com/photo-1610889556528-9a770e32642f?auto=format&fit=crop&q=80&w=800', desc: 'Az kullanılmış otomatik espresso makinesi.' },
  { title: 'Custom Kaykay', categorySlug: 'spor-outdoor', userEmail: 'deniz@takason.com', condition: 'GOOD', estimatedValue: 1200, location: 'Adana', swapFor: 'Scooter veya paten', image: 'https://images.unsplash.com/photo-1547447134-cd3f5c716030?auto=format&fit=crop&q=80&w=800', desc: 'El yapımı tasarım, profesyonel rulmanlar.' },
  { title: 'iPad Pro 12.9" M2', categorySlug: 'telefon-tablet', userEmail: 'mehmet@takason.com', condition: 'LIKE_NEW', estimatedValue: 35000, location: 'Ankara', swapFor: 'MacBook Air M2', tag: 'FEATURED', isFeatured: true, image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&q=80&w=800', desc: 'Apple Pencil 2 ile birlikte, kutusu mevcut.' },
  { title: 'DJI Mini 3 Drone', categorySlug: 'fotograf-kamera', userEmail: 'burak@takason.com', condition: 'NEW', estimatedValue: 22000, location: 'Antalya', swapFor: 'Aksiyon kamerası seti', tag: 'NEW', image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&q=80&w=800', desc: 'Sıfır, kapalı kutu. 4K kamera, 3 batarya.' },
  { title: 'Akustik Gitar Yamaha', categorySlug: 'enstruman', userEmail: 'burak@takason.com', condition: 'GOOD', estimatedValue: 4200, location: 'Antalya', swapFor: 'Elektro gitar', image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&q=80&w=800', desc: 'Yamaha F310 akustik gitar, kılıfı dahil.' },
  { title: 'MTB Bisiklet Trek', categorySlug: 'bisiklet-scooter', userEmail: 'deniz@takason.com', condition: 'LIKE_NEW', estimatedValue: 15000, location: 'Adana', swapFor: 'Yol bisikleti', isPopular: true, image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=800', desc: 'Trek Marlin 7, hidrolik fren, 29 jant.' },
  { title: 'Full HD Projektör', categorySlug: 'tv-ses', userEmail: 'hasan@takason.com', condition: 'GOOD', estimatedValue: 6500, location: 'İstanbul', swapFor: 'Soundbar veya TV', image: 'https://images.unsplash.com/photo-1626379953822-baec19c3accd?auto=format&fit=crop&q=80&w=800', desc: 'Ev sineması için ideal, 3500 lümen.' },
  { title: 'Sony WH-1000XM5 Kulaklık', categorySlug: 'tv-ses', userEmail: 'ayse@takason.com', condition: 'NEW', estimatedValue: 12500, location: 'İstanbul', swapFor: 'AirPods Max', tag: 'POPULAR', isPopular: true, image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=800', desc: 'Sıfır, kapalı kutu, ANC kulaklık.' },
  { title: 'Vintage Plak Koleksiyonu', categorySlug: 'plak-cd', userEmail: 'mehmet@takason.com', condition: 'GOOD', estimatedValue: 3000, location: 'Ankara', swapFor: 'Pikap veya başka plak seti', image: 'https://images.unsplash.com/photo-1539375665275-f9de415ef9ac?auto=format&fit=crop&q=80&w=800', desc: '50 adet 70-80\'ler Türkçe ve yabancı plak.' },
  { title: 'Modern Koltuk Takımı', categorySlug: 'salon', userEmail: 'selin@takason.com', condition: 'GOOD', estimatedValue: 18000, location: 'İzmir', swapFor: 'Yatak odası takımı', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800', desc: '3+2+1 modern koltuk takımı, gri.' },
  { title: 'Suç ve Ceza Roman Seti', categorySlug: 'roman', userEmail: 'ahmet@takason.com', condition: 'GOOD', estimatedValue: 800, location: 'Bursa', swapFor: 'Bilim kurgu kitap seti', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800', desc: 'Dostoyevski külliyatı, 12 cilt.' },
  { title: 'Nadir Akademik Kitaplar', categorySlug: 'akademik', userEmail: 'ahmet@takason.com', condition: 'LIKE_NEW', estimatedValue: 1500, location: 'Bursa', swapFor: 'Yeni roman seti', image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800', desc: 'Mühendislik ve fizik kitapları, az kullanılmış.' },
  { title: 'Retro Bisiklet', categorySlug: 'bisiklet-scooter', userEmail: 'can@takason.com', condition: 'GOOD', estimatedValue: 4500, location: 'Eskişehir', swapFor: 'Modern dağ bisikleti', image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=800', desc: '70\'lerden kalma restore edilmiş şehir bisikleti.' },
  { title: 'Designer Çanta', categorySlug: 'canta-cuzdan', userEmail: 'ayse@takason.com', condition: 'LIKE_NEW', estimatedValue: 8500, location: 'İstanbul', swapFor: 'Designer ayakkabı', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800', desc: 'Premium marka çanta, kutu ve tüm aksesuarlar.' },
  { title: 'Polaroid Vintage Fotoğraf Makinesi', categorySlug: 'fotograf-kamera', userEmail: 'hasan@takason.com', condition: 'GOOD', estimatedValue: 2500, location: 'İstanbul', swapFor: 'Modern fotoğraf makinesi', image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?auto=format&fit=crop&q=80&w=800', desc: 'Çalışır durumda, 80\'ler model.' },
  { title: 'Çocuk Kitap Seti', categorySlug: 'cocuk-kitap', userEmail: 'selin@takason.com', condition: 'GOOD', estimatedValue: 600, location: 'İzmir', swapFor: 'Eğitici oyuncak', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800', desc: '20 adet 6-10 yaş çocuk kitabı.' },
];

// ------------------------------------------------------------
// FAQs (HelpCenter.jsx içeriğinden)
// ------------------------------------------------------------
const faqs = [
  { q: 'Takas yapmak ücretli mi?', a: 'Hayır, TakasOn üzerinde standart takas işlemleri tamamen ücretsizdir.', cat: 'Genel' },
  { q: 'Premium üye olmanın avantajları nelerdir?', a: 'İlanlarınızın daha fazla kişiye ulaşmasını sağlar, sınırsız ilan verme hakkı tanır ve size özel rozetler sunar.', cat: 'Premium' },
  { q: 'Güvenliğimi nasıl sağlarım?', a: 'Takaslarınızı her zaman halka açık yerlerde gerçekleştirmenizi ve ürünleri iyice incelemeden işlemi onaylamamanızı öneririz.', cat: 'Güvenlik' },
  { q: 'İlan vermek için ne yapmalıyım?', a: 'Üyelik açtıktan sonra "İlan Ver" sayfasından kategori, fotoğraf ve açıklama ekleyerek ilanınızı kolayca yayınlayabilirsiniz.', cat: 'İlan' },
  { q: 'Şifremi unuttum, ne yapmalıyım?', a: 'Giriş ekranındaki "Şifremi unuttum" bağlantısı ile e-postanıza sıfırlama linki gönderebilirsiniz.', cat: 'Hesap' },
  { q: 'Takas teklifimi nasıl iptal ederim?', a: 'Profilim > Takas Geçmişi sayfasından bekleyen tekliflerinizi tek tıkla iptal edebilirsiniz.', cat: 'Takas' },
  { q: 'Hesabımı nasıl silerim?', a: 'Profil > Güvenlik ayarlarından hesabınızı kalıcı olarak silebilirsiniz. Bu işlem geri alınamaz.', cat: 'Hesap' },
  { q: 'Premium üyelik ne kadar?', a: 'Aylık 49.99 TL, yıllık 499 TL\'dir. Detaylar Premium sayfasında listelenmiştir.', cat: 'Premium' },
  { q: 'Kargo ile takas yapabilir miyim?', a: 'Evet, taraflar anlaşırsa kargo yoluyla takas mümkündür. Güvenliğiniz için kapıda ödemeli kargo öneririz.', cat: 'Takas' },
  { q: 'Şikayet bildiriminde nasıl bulunurum?', a: 'Her ilan ve kullanıcı profilinde "Şikayet Et" butonu bulunur. 24 saat içinde inceleme yapılır.', cat: 'Güvenlik' },
];

// ------------------------------------------------------------
// HELP CATEGORIES
// ------------------------------------------------------------
const helpCategories = [
  { title: 'Hesap & Profil', description: 'Üyelik, şifre ve profil ayarları.', icon: 'User', order: 1 },
  { title: 'İlanlar', description: 'İlan oluşturma, düzenleme ve yayınlama.', icon: 'Box', order: 2 },
  { title: 'Takas İşlemleri', description: 'Takas teklifleri ve kabul süreçleri.', icon: 'Activity', order: 3 },
  { title: 'Güvenlik', description: 'Güvenli takas ve dolandırıcılık önleme.', icon: 'Shield', order: 4 },
  { title: 'Ödeme & Premium', description: 'Premium üyelik ve faturalandırma.', icon: 'Crown', order: 5 },
  { title: 'Teknik Destek', description: 'Site ve uygulama sorunları.', icon: 'HelpCircle', order: 6 },
];

// ------------------------------------------------------------
// PREMIUM PERKS (Premium.jsx + PremiumDetails.jsx)
// ------------------------------------------------------------
const premiumPerks = [
  { title: 'Sınırsız İlan', value: 'AKTİF', description: 'Dilediğin kadar ürünü takasa çıkar.', icon: 'Zap', color: 'text-amber-500', order: 1 },
  { title: 'Öncelikli Sıralama', value: 'AKTİF', description: 'İlanların her zaman en üstte.', icon: 'Rocket', color: 'text-amber-500', order: 2 },
  { title: 'Özel Rozet', value: 'GÖRÜNÜR', description: 'Profilinde Elite rozeti ile güven ver.', icon: 'ShieldCheck', color: 'text-amber-500', order: 3 },
  { title: 'Sınırsız Mesaj', value: 'AKTİF', description: 'Günlük mesaj limitine takılma.', icon: 'Star', color: 'text-amber-500', order: 4 },
  { title: 'Öne Çıkarılan İlanlar', value: '3 / 10', description: 'İlanlarınızı aramalarda en üst sıraya taşıyın.', icon: 'Zap', color: 'text-[#4a2008]', order: 5 },
  { title: 'Reklamsız Deneyim', value: 'AKTİF', description: 'Takason dünyasında reklamsız ve kesintisiz gezinin.', icon: 'Shield', color: 'text-green-500', order: 6 },
];

// ------------------------------------------------------------
// PREMIUM PLANS
// ------------------------------------------------------------
const premiumPlans = [
  { name: 'Aylık', price: 49.99, period: 'MONTHLY', description: 'Aylık premium üyelik.', features: JSON.stringify(['Sınırsız ilan', 'Öncelikli sıralama', 'Özel rozet', 'Reklamsız']), order: 1 },
  { name: 'Yıllık', price: 499, period: 'YEARLY', description: 'Yıllık avantajlı premium üyelik (2 ay bedava).', features: JSON.stringify(['Sınırsız ilan', 'Öncelikli sıralama', 'Özel rozet', 'Reklamsız', '%20 indirim']), order: 2 },
];

// ------------------------------------------------------------
// SAFE SWAP STEPS (SafeSwapGuide.jsx)
// ------------------------------------------------------------
const safeSwapSteps = [
  { title: 'Güvenli İletişim', description: 'Takas süreçlerinizi her zaman platform içi mesajlaşma üzerinden yürütün. Kişisel bilgilerinizi koruyun.', icon: 'MessageSquare', order: 1 },
  { title: 'İlan Detaylarını İncele', description: 'Ürünün açıklamalarını, fotoğraflarını ve kullanıcının geçmiş puanlarını detaylıca kontrol edin.', icon: 'Info', order: 2 },
  { title: 'Güvenli Buluşma', description: 'Görüşmelerinizi gündüz vakti, kalabalık ve halka açık alanlarda gerçekleştirmeyi tercih edin.', icon: 'Users', order: 3 },
  { title: 'Ürünü Kontrol Et', description: 'Takas öncesinde ürünü fiziki olarak inceleyin, test edin ve her şeyin beklendiği gibi olduğundan emin olun.', icon: 'Smartphone', order: 4 },
];

// ------------------------------------------------------------
// SITE SETTINGS
// ------------------------------------------------------------
const siteSettings = [
  // General
  { key: 'site.title', value: 'TakasOn', group: 'general', isPublic: true, description: 'Site başlığı' },
  { key: 'site.slogan', value: 'Sizin paranız burada geçmez.', group: 'general', isPublic: true, description: 'Site sloganı' },
  { key: 'site.description', value: 'Türkiye\'nin en büyük takas platformu', group: 'general', isPublic: true, description: 'Meta açıklama' },
  { key: 'site.contactEmail', value: 'destek@takason.com', group: 'general', isPublic: true, description: 'İletişim e-postası' },
  { key: 'site.contactPhone', value: '+90 850 000 00 00', group: 'general', isPublic: true, description: 'İletişim telefonu' },
  // SMTP
  { key: 'smtp.host', value: '', group: 'smtp', description: 'SMTP sunucu adresi' },
  { key: 'smtp.port', value: '587', type: 'NUMBER', group: 'smtp', description: 'SMTP portu' },
  { key: 'smtp.user', value: '', group: 'smtp', description: 'SMTP kullanıcı adı' },
  { key: 'smtp.password', value: '', group: 'smtp', description: 'SMTP şifresi' },
  { key: 'smtp.from', value: 'noreply@takason.com', group: 'smtp', description: 'Gönderici e-posta' },
  { key: 'smtp.secure', value: 'false', type: 'BOOLEAN', group: 'smtp', description: 'TLS/SSL kullan' },
  // SMS
  { key: 'sms.provider', value: 'netgsm', group: 'sms', description: 'SMS sağlayıcı (netgsm, twilio, iletimerkezi)' },
  { key: 'sms.apiKey', value: '', group: 'sms', description: 'SMS API anahtarı' },
  { key: 'sms.apiSecret', value: '', group: 'sms', description: 'SMS API gizli anahtar' },
  { key: 'sms.sender', value: 'TAKASON', group: 'sms', description: 'Gönderici başlığı' },
  // Cloudinary
  { key: 'cloudinary.enabled', value: 'false', type: 'BOOLEAN', group: 'cloudinary', description: 'Cloudinary aktif' },
  { key: 'cloudinary.cloudName', value: '', group: 'cloudinary', description: 'Cloud name' },
  { key: 'cloudinary.apiKey', value: '', group: 'cloudinary', description: 'API key' },
  { key: 'cloudinary.apiSecret', value: '', group: 'cloudinary', description: 'API secret' },
  // Theme
  { key: 'theme.primaryColor', value: '#4a2008', group: 'theme', isPublic: true, description: 'Ana renk' },
  { key: 'theme.accentColor', value: '#FFF8E7', group: 'theme', isPublic: true, description: 'Vurgu rengi' },
];

// ------------------------------------------------------------
// MAIN
// ------------------------------------------------------------
async function main() {
  console.log('🌱 Seed verisi yükleniyor...');

  // 0. CLEANUP (Önce temizle)
  console.log('  → Ön temizlik...');
  await prisma.notification.deleteMany({});
  await prisma.message.deleteMany({});
  await prisma.chatRoom.deleteMany({});
  await prisma.favorite.deleteMany({});
  await prisma.tradeItem.deleteMany({});
  await prisma.trade.deleteMany({});
  await prisma.itemImage.deleteMany({});
  await prisma.item.deleteMany({});
  await prisma.address.deleteMany({});
  await prisma.profile.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.category.deleteMany({});

  // 1. CATEGORIES
  console.log('  → Kategoriler...');
  for (const cat of categories) {
    const { children, ...parentData } = cat;
    const parent = await prisma.category.upsert({
      where: { slug: parentData.slug },
      update: parentData,
      create: parentData,
    });
    if (children) {
      for (const child of children) {
        await prisma.category.upsert({
          where: { slug: child.slug },
          update: { ...child, parentId: parent.id },
          create: { ...child, parentId: parent.id },
        });
      }
    }
  }

  // 2. USERS + PROFILES
  console.log('  → Kullanıcılar...');
  const userMap = {};
  for (const u of users) {
    const passwordHash = await bcrypt.hash(u.password, SALT_ROUNDS);
    const user = await prisma.user.upsert({
      where: { email: u.email },
      update: { role: u.role, status: 'ACTIVE' },
      create: {
        email: u.email,
        passwordHash,
        role: u.role,
        status: 'ACTIVE',
        profile: {
          create: {
            firstName: u.firstName,
            lastName: u.lastName,
            city: u.city || null,
            bio: u.bio || null,
            score: u.score || 0,
            swapsCompleted: u.swaps || 0,
            medal: u.medal || null,
            isPremium: u.isPremium || false,
            rating: u.score ? Math.min(5, u.score / 200) : 0,
            totalTrades: u.swaps || 0,
          },
        },
      },
    });
    // Update profile if user already existed
    await prisma.profile.upsert({
      where: { userId: user.id },
      update: {
        firstName: u.firstName,
        lastName: u.lastName,
        city: u.city || null,
        bio: u.bio || null,
        score: u.score || 0,
        swapsCompleted: u.swaps || 0,
        medal: u.medal || null,
        isPremium: u.isPremium || false,
        rating: u.score ? Math.min(5, u.score / 200) : 0,
        totalTrades: u.swaps || 0,
      },
      create: {
        userId: user.id,
        firstName: u.firstName,
        lastName: u.lastName,
        city: u.city || null,
        bio: u.bio || null,
        score: u.score || 0,
        swapsCompleted: u.swaps || 0,
        medal: u.medal || null,
        isPremium: u.isPremium || false,
      },
    });
    userMap[u.email] = user.id;
  }

  // 3. ITEMS + IMAGES
  console.log('  → İlanlar...');
  // Önce eski seed item'ları sil (idempotent)
  await prisma.itemImage.deleteMany({});
  await prisma.tradeItem.deleteMany({});
  await prisma.favorite.deleteMany({});
  await prisma.trade.deleteMany({});
  await prisma.item.deleteMany({});

  for (const it of items) {
    const cat = await prisma.category.findUnique({ where: { slug: it.categorySlug } });
    const userId = userMap[it.userEmail];
    if (!cat || !userId) {
      console.warn(`    ⚠ Atlandı (kategori/kullanıcı bulunamadı): ${it.title}`);
      continue;
    }
    await prisma.item.create({
      data: {
        userId,
        categoryId: cat.id,
        title: it.title,
        description: it.desc,
        condition: it.condition,
        status: 'ACTIVE',
        location: it.location,
        estimatedValue: it.estimatedValue,
        swapFor: it.swapFor,
        tag: it.tag || null,
        isFeatured: it.isFeatured || false,
        isPopular: it.isPopular || false,
        viewCount: Math.floor(Math.random() * 500) + 10,
        images: {
          create: [{ imageUrl: it.image, displayOrder: 0, isPrimary: true }],
        },
      },
    });
  }

  // 4. ADDRESSES (admin + ayse için)
  console.log('  → Adresler...');
  await prisma.address.deleteMany({});
  const adminId = userMap['admin@takason.com'];
  const ayseId = userMap['ayse@takason.com'];
  await prisma.address.createMany({
    data: [
      { userId: adminId, title: 'EV ADRESİM', address: 'Barbaros Bulvarı, No: 123, Beşiktaş / İstanbul', type: 'HOME', city: 'İstanbul', isDefault: true },
      { userId: adminId, title: 'İŞ ADRESİM', address: 'Büyükdere Cad. No: 456, Maslak / İstanbul', type: 'WORK', city: 'İstanbul' },
      { userId: ayseId, title: 'EV', address: 'Bağdat Caddesi No: 88, Kadıköy / İstanbul', type: 'HOME', city: 'İstanbul', isDefault: true },
    ],
  });

  // 5. FAQ
  console.log('  → SSS...');
  await prisma.fAQ.deleteMany({});
  for (const [i, f] of faqs.entries()) {
    await prisma.fAQ.create({ data: { question: f.q, answer: f.a, category: f.cat, order: i } });
  }

  // 6. HELP CATEGORIES
  console.log('  → Yardım kategorileri...');
  await prisma.helpCategory.deleteMany({});
  await prisma.helpCategory.createMany({ data: helpCategories });

  // 7. PREMIUM PERKS
  console.log('  → Premium avantajlar...');
  await prisma.premiumPerk.deleteMany({});
  await prisma.premiumPerk.createMany({ data: premiumPerks });

  // 8. PREMIUM PLANS
  console.log('  → Premium planlar...');
  await prisma.premiumPlan.deleteMany({});
  await prisma.premiumPlan.createMany({ data: premiumPlans });

  // 9. SAFE SWAP STEPS
  console.log('  → Güvenli takas adımları...');
  await prisma.safeSwapStep.deleteMany({});
  await prisma.safeSwapStep.createMany({ data: safeSwapSteps });

  // 10. SITE SETTINGS
  console.log('  → Site ayarları...');
  for (const s of siteSettings) {
    await prisma.siteSetting.upsert({
      where: { key: s.key },
      update: { value: s.value, type: s.type || 'STRING', group: s.group, description: s.description, isPublic: s.isPublic || false },
      create: { key: s.key, value: s.value, type: s.type || 'STRING', group: s.group, description: s.description, isPublic: s.isPublic || false },
    });
  }

  // 11. SAMPLE TRADES (birkaç tamamlanmış takas)
  console.log('  → Örnek takaslar...');
  const allItems = await prisma.item.findMany({ select: { id: true, userId: true } });
  if (allItems.length >= 4) {
    const tradePairs = [
      { offer: allItems[0], request: allItems[3], status: 'COMPLETED' },
      { offer: allItems[2], request: allItems[6], status: 'COMPLETED' },
      { offer: allItems[5], request: allItems[10], status: 'PENDING' },
      { offer: allItems[8], request: allItems[12], status: 'ACCEPTED' },
    ];
    for (const t of tradePairs) {
      if (t.offer.userId === t.request.userId) continue;
      const trade = await prisma.trade.create({
        data: {
          senderId: t.offer.userId,
          receiverId: t.request.userId,
          status: t.status,
          message: 'Takas teklifi - örnek seed verisi',
        },
      });
      await prisma.tradeItem.createMany({
        data: [
          { tradeId: trade.id, itemId: t.offer.id, side: 'OFFER' },
          { tradeId: trade.id, itemId: t.request.id, side: 'REQUEST' },
        ],
      });
    }
  }

  // 12. FAVORITES (örnek)
  console.log('  → Favoriler...');
  const favItems = allItems.slice(0, 5);
  const hasanId = userMap['hasan@takason.com'];
  for (const item of favItems) {
    if (item.userId !== hasanId) {
      await prisma.favorite.create({ data: { userId: hasanId, itemId: item.id } }).catch(() => {});
    }
  }

  // SUMMARY
  const counts = {
    users: await prisma.user.count(),
    categories: await prisma.category.count(),
    items: await prisma.item.count(),
    trades: await prisma.trade.count(),
    faqs: await prisma.fAQ.count(),
    settings: await prisma.siteSetting.count(),
  };
  console.log('✅ Seed tamamlandı:', counts);
}

main()
  .catch((err) => {
    console.error('❌ Seed hatası:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
