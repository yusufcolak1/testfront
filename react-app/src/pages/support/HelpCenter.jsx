import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronRight, MessageCircle, FileText, User, CreditCard, ShieldCheck, Zap, ArrowLeft, Phone, Mail, Headset, Send, X, MapPin } from 'lucide-react';

export default function HelpCenter() {
    const [selectedCategory, setSelectedCategory] = React.useState(null);
    const [isContactOpen, setIsContactOpen] = React.useState(false);

    const categories = [
        {
            icon: User,
            title: 'Hesap & Profil',
            desc: 'Üyelik, şifre ve profil ayarları.',
            details: "Profilinizi optimize ederek diğer kullanıcıların size olan güvenini artırın. Bu bölümde şifre sıfırlama, e-posta doğrulama ve profil fotoğrafı güncelleme işlemlerini bulabilirsiniz."
        },
        {
            icon: Zap,
            title: 'İlan Verme',
            desc: 'Nasıl ilan verilir? Fotoğraflar vs.',
            details: "İlanınızın başlığı ve fotoğrafları takas şansınızı %80 artırır. Doğru kategori seçimi ve detaylı açıklama metni yazmanın püf noktalarını burada inceleyin."
        },
        {
            icon: FileText,
            title: 'Takas Süreci',
            desc: 'Teklif verme ve kabul etme.',
            details: "Teklif gönderirken 'Mantıklı Takas' kurallarına uyun. Bu bölümde tekliflerin nasıl değerlendirildiği ve takasın nasıl sonuçlandığı anlatılmaktadır."
        },
        {
            icon: ShieldCheck,
            title: 'Güvenlik',
            desc: 'Hesap güvenliği ve dolandırıcılık.',
            details: "İkinci el takasında güvenlik her şeydir. Dolandırıcılık yöntemlerinden korunma yolları ve şüpheli ilan bildirme süreçlerini buradan öğrenebilirsiniz."
        },
        {
            icon: CreditCard,
            title: 'Premium Üyelik',
            desc: 'Avantajlar ve ödeme yöntemleri.',
            details: "Premium üyeler arama sonuçlarında en üstte görünür. Üyelik paketleri, ödeme güvenliği ve otomatik yenileme iptali hakkında tüm detaylar buradadır."
        },
        {
            icon: MessageCircle,
            title: 'Mesajlaşma',
            desc: 'Diğer üyelerle güvenli iletişim.',
            details: "Platform dışına çıkmadan mesajlaşmak sizi korur. Mesaj bildirimleri, engelleme sistemi ve dosya paylaşımı özelliklerini keşfedin."
        }
    ];

    const faqs = [
        { q: "Takas yapmak ücretli mi?", a: "Hayır, TakasOn üzerinde standart takas işlemleri tamamen ücretsizdir." },
        { q: "Premium üye olmanın avantajları nelerdir?", a: "İlanlarınızın daha fazla kişiye ulaşmasını sağlar, sınırsız ilan verme hakkı tanır ve size özel rozetler sunar." },
        { q: "Güvenliğimi nasıl sağlarım?", a: "Takaslarınızı her zaman halka açık yerlerde gerçekleştirmenizi ve ürünleri iyice incelemeden işlemi onaylamamanızı öneririz." }
    ];

    return (
        <div className="min-h-screen bg-[#f5f1ed] pb-12 md:pb-24 relative">
            <div className="container mx-auto px-4 md:px-6 py-4 md:py-8">
                {/* Back Link */}
                <Link to="/" className="inline-flex items-center gap-2 text-stone-400 hover:text-stone-900 transition-all group mb-4 md:mb-8 leading-none">
                    <div className="p-1.5 md:p-2 bg-white rounded-xl shadow-sm group-hover:bg-[#4a2008] group-hover:text-[#FFF8E7] transition-all shrink-0">
                        <ArrowLeft className="w-3.5 h-3.5 md:w-4 md:h-4 shrink-0" />
                    </div>
                    <span className="text-[9px] md:text-[10px] font-black tracking-widest uppercase italic font-serif leading-none">ANA SAYFAYA DÖN</span>
                </Link>

                {/* Header Section */}
                <div className="bg-stone-900 pt-8 md:pt-20 pb-12 md:pb-32 px-4 md:px-6 rounded-[1.5rem] md:rounded-[3.5rem] relative overflow-hidden text-center">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                    <div className="relative z-10 max-w-4xl mx-auto space-y-6 md:space-y-8">
                        <h1 className="text-3xl md:text-5xl font-serif font-black text-amber-50 italic leading-snug md:leading-tight">Size nasıl <span style={{ color: '#FFF8E7' }}>yardımcı</span> olabiliriz?</h1>
                        <div className="max-w-2xl mx-auto relative group">
                            <div className="absolute left-5 md:left-6 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-amber-500 transition-colors shrink-0">
                                <Search className="w-4 h-4 md:w-5 md:h-5 shrink-0" />
                            </div>
                            <input
                                type="text"
                                placeholder="Bir konu veya soru arayın..."
                                className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-3xl py-3.5 md:py-6 pl-10 md:pl-16 pr-4 md:pr-8 text-[13px] md:text-base text-white font-bold outline-none focus:bg-white/10 focus:border-amber-500/50 focus:ring-4 focus:ring-amber-500/5 transition-all shadow-2xl backdrop-blur-md"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto max-w-6xl px-4 md:px-6 -mt-10 md:-mt-16 relative z-20">
                {/* Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                    {categories.map((cat, i) => (
                        <div key={i} className="bg-white p-4 md:p-8 rounded-[1.2rem] md:rounded-[2.5rem] border border-stone-100 shadow-xl shadow-stone-900/5 md:hover:-translate-y-2 transition-all group flex flex-col items-center text-center">
                            <div className="w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-stone-50 flex items-center justify-center mb-3 md:mb-6 group-hover:bg-[#4a2008] group-hover:text-[#FFF8E7] transition-all text-stone-400 shrink-0">
                                <cat.icon className="w-5 h-5 md:w-7 md:h-7 shrink-0" />
                            </div>
                            <h3 className="text-lg font-serif font-black text-stone-900 mb-1.5 md:mb-2 italic leading-tight">{cat.title}</h3>
                            <p className="text-stone-400 text-[11px] md:text-sm font-medium leading-relaxed mb-4 md:mb-6">{cat.desc}</p>
                            <button
                                onClick={() => setSelectedCategory(cat)}
                                className="text-[9px] md:text-[10px] font-black tracking-widest text-stone-400 md:group-hover:text-stone-900 uppercase flex items-center gap-2 transition-colors mt-auto leading-none"
                            >
                                TÜMÜNÜ GÖR <ChevronRight className="w-3.5 h-3.5 md:w-4 md:h-4 shrink-0" />
                            </button>
                        </div>
                    ))}
                </div>

                {/* FAQ Section */}
                <div className="mt-12 md:mt-32 max-w-3xl mx-auto space-y-6 md:space-y-12">
                    <div className="text-center space-y-2 md:space-y-4">
                        <h2 className="text-2xl md:text-4xl font-serif font-black text-stone-900 italic">Sık Sorulan <span style={{ color: '#4a2008' }}>Sorular</span></h2>
                        <p className="text-[10px] md:text-sm text-stone-400 font-medium">Platform kullanımıyla ilgili en çok merak edilenler.</p>
                    </div>

                    <div className="space-y-3 md:space-y-4">
                        {faqs.map((faq, i) => (
                            <div key={i} className="bg-white rounded-xl md:rounded-3xl border border-stone-100 p-4 md:p-8 shadow-sm hover:shadow-xl hover:shadow-stone-900/5 transition-all space-y-3 md:space-y-4 group">
                                <h4 className="text-[13px] md:text-lg font-bold text-stone-900 flex items-center gap-2.5 md:gap-4">
                                    <span className="w-5 h-5 md:w-8 md:h-8 rounded-lg bg-stone-900 text-white flex items-center justify-center text-[8px] md:text-[10px] shrink-0 font-black">Q</span>
                                    {faq.q}
                                </h4>
                                <p className="text-stone-500 leading-relaxed pl-9 md:pl-12 font-medium italic font-serif underline decoration-amber-500/20 underline-offset-8 text-xs md:text-base">
                                    {faq.a}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="bg-amber-50 rounded-[1.2rem] md:rounded-[3rem] p-4 md:p-12 border border-amber-100 mt-8 md:mt-20 text-center space-y-4 md:space-y-6">
                        <h3 className="text-[15px] md:text-2xl font-serif font-black text-stone-900 italic leading-tight">Hala cevabınızı bulamadınız mı?</h3>
                        <p className="text-[9px] md:text-sm text-stone-500 max-w-xs md:max-w-md mx-auto">7/24 hizmet veren destek ekibimizle iletişime geçebilirsiniz.</p>
                        <button
                            onClick={() => setIsContactOpen(true)}
                            className="w-full md:w-auto px-6 py-3.5 md:px-12 md:py-5 bg-stone-900 text-amber-400 rounded-xl md:rounded-2xl font-black text-[9px] md:text-[10px] tracking-[0.2em] uppercase hover:bg-black transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-2 md:gap-4 mx-auto leading-none"
                        >
                            BİZE ULAŞIN <MessageCircle className="w-4 h-4 md:w-5 md:h-5 shrink-0" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Support Modal */}
            {selectedCategory && (
                <div className="fixed inset-0 z-[999] flex items-start justify-center p-3 md:p-6 bg-stone-900/60 backdrop-blur-xl transition-all duration-300 overflow-y-auto pt-16 md:pt-24">
                    <div className="bg-white rounded-[1.5rem] md:rounded-[3rem] w-full max-w-lg p-6 md:p-10 relative shadow-2xl animate-in fade-in zoom-in duration-300 border border-white/20 mb-6 md:mb-12">
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className="absolute top-6 md:top-8 right-6 md:right-8 p-2.5 md:p-3 bg-stone-50 rounded-xl md:rounded-2xl text-stone-400 hover:text-stone-900 transition-colors"
                        >
                            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 rotate-90" />
                        </button>

                        <div className="space-y-6 md:space-y-8">
                            <div className="w-14 h-14 md:w-20 md:h-20 rounded-xl md:rounded-3xl bg-[#4a2008] flex items-center justify-center text-[#FFF8E7] shadow-xl shadow-[#4a2008]/20 shrink-0">
                                <selectedCategory.icon className="w-6 h-6 md:w-8 md:h-8 shrink-0" />
                            </div>
                            <div className="space-y-2 md:space-y-4">
                                <h2 className="text-xl md:text-3xl font-serif font-black text-stone-900 italic uppercase tracking-tighter leading-tight">{selectedCategory.title}</h2>
                                <p className="text-stone-400 font-bold uppercase text-[8px] md:text-[10px] tracking-[0.3em]">{selectedCategory.desc}</p>
                            </div>
                            <div className="p-5 md:p-8 bg-stone-50 rounded-[1.2rem] md:rounded-[2rem] border border-stone-100">
                                <p className="text-stone-600 font-serif leading-relaxed italic text-sm md:text-lg">
                                    {selectedCategory.details}
                                </p>
                            </div>
                            <button
                                onClick={() => setSelectedCategory(null)}
                                className="w-full py-4 md:py-5 bg-stone-900 text-white rounded-xl md:rounded-2xl font-black text-[9px] md:text-[10px] tracking-widest uppercase hover:bg-black transition-all leading-none"
                            >
                                TAMAM, ANLADIM
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Contact Modal */}
            {isContactOpen && (
                <div className="fixed inset-0 z-[1000] flex items-start justify-center p-3 md:p-6 bg-stone-900/60 backdrop-blur-xl transition-all duration-300 overflow-y-auto pt-6 md:pt-24">
                    <div className="bg-white rounded-[1.5rem] md:rounded-[4rem] w-full max-w-4xl relative shadow-2xl animate-in fade-in zoom-in duration-300 border border-white/20 mb-6 md:mb-12 flex flex-col md:flex-row overflow-hidden min-h-[500px] md:min-h-[600px]">
                        {/* Left: Contact Form */}
                        <div className="flex-1 p-5 md:p-16 space-y-4 md:space-y-10">
                            <div className="space-y-1 md:space-y-2">
                                <h2 className="text-2xl md:text-4xl font-serif font-black text-stone-900 italic leading-tight">Destek <span style={{ color: '#4a2008' }}>Formu</span></h2>
                                <p className="text-stone-400 font-medium italic text-[10px] md:text-sm font-serif">TakasOn ekibi mesajına en geç 2 saat içinde yanıt verir.</p>
                            </div>

                            <form className="space-y-3 md:space-y-6" onSubmit={(e) => { e.preventDefault(); setIsContactOpen(false); }}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
                                    <div className="space-y-1.5 md:space-y-2">
                                        <label className="text-[8px] md:text-[10px] font-black text-stone-400 uppercase tracking-widest pl-2 leading-none">AD SOYAD</label>
                                        <input type="text" placeholder="Emre K." className="w-full bg-stone-50 border border-stone-100 px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl font-serif italic outline-none focus:border-[#4a2008] transition-all shadow-inner text-stone-900 text-[13px] md:text-base" required />
                                    </div>
                                    <div className="space-y-1.5 md:space-y-2">
                                        <label className="text-[8px] md:text-[10px] font-black text-stone-400 uppercase tracking-widest pl-2 leading-none">E-POSTA</label>
                                        <input type="email" placeholder="destek@takason.com" className="w-full bg-stone-50 border border-stone-100 px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl font-serif italic outline-none focus:border-[#4a2008] transition-all shadow-inner text-stone-900 text-[13px] md:text-base" required />
                                    </div>
                                </div>
                                <div className="space-y-1.5 md:space-y-2">
                                    <label className="text-[8px] md:text-[10px] font-black text-stone-400 uppercase tracking-widest pl-2 leading-none">KONU</label>
                                    <select className="w-full bg-stone-50 border border-stone-100 px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl font-serif italic outline-none focus:border-[#4a2008] transition-all shadow-inner appearance-none text-stone-900 text-[13px] md:text-base">
                                        <option>Genel Soru</option>
                                        <option>Teknik Destek</option>
                                        <option>Şikayet Bildirimi</option>
                                        <option>İş Birliği</option>
                                    </select>
                                </div>
                                <div className="space-y-1.5 md:space-y-2">
                                    <label className="text-[8px] md:text-[10px] font-black text-stone-400 uppercase tracking-widest pl-2 leading-none">MESAJINIZ</label>
                                    <textarea placeholder="Sorununuzdan detaylıca bahsetin..." className="w-full h-24 md:h-32 bg-stone-50 border border-stone-100 px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl font-serif italic outline-none focus:border-[#4a2008] transition-all shadow-inner resize-none text-stone-900 text-[13px] md:text-base" required></textarea>
                                </div>
                                <button className="w-full bg-stone-900 text-amber-400 py-4 md:py-5 rounded-xl md:rounded-2xl font-black text-[9px] md:text-[10px] tracking-widest uppercase hover:bg-black transition-all flex items-center justify-center gap-3 md:gap-4 shadow-xl shadow-stone-900/10 leading-none">
                                    MESAJI GÖNDER <Send className="w-3.5 h-3.5 md:w-4 md:h-4 shrink-0" />
                                </button>
                            </form>
                        </div>

                        {/* Right: Info Panel */}
                        <div className="w-full md:w-80 bg-stone-900 p-8 md:p-16 text-white flex flex-col justify-between relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 blur-[100px] rounded-full"></div>

                            <div className="relative z-10 space-y-8 md:space-y-12">
                                <div className="w-12 h-12 md:w-16 md:h-16 bg-amber-500 rounded-2xl md:rounded-3xl flex items-center justify-center text-stone-900 shadow-xl shadow-amber-500/20">
                                    <Headset className="w-6 h-6 md:w-8 md:h-8" />
                                </div>

                                <div className="space-y-6 md:space-y-10">
                                    <div className="flex items-start gap-4">
                                        <Phone className="w-4 h-4 md:w-5 md:h-5 text-amber-500 shrink-0" />
                                        <div className="space-y-1">
                                            <p className="text-[8px] md:text-[9px] font-black text-stone-600 uppercase tracking-widest">TELEFON</p>
                                            <p className="font-serif italic font-bold text-base md:text-lg">+90 212 555 0000</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <Mail className="w-4 h-4 md:w-5 md:h-5 text-amber-500 shrink-0" />
                                        <div className="space-y-1">
                                            <p className="text-[8px] md:text-[9px] font-black text-stone-600 uppercase tracking-widest">E-POSTA</p>
                                            <p className="font-serif italic font-bold text-base md:text-lg">destek@takason.com</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <MapPin className="w-4 h-4 md:w-5 md:h-5 text-amber-500 shrink-0" />
                                        <div className="space-y-1">
                                            <p className="text-[8px] md:text-[9px] font-black text-stone-600 uppercase tracking-widest">OFİSİMİZ</p>
                                            <p className="font-serif italic font-bold leading-tight text-sm md:text-base">Beşiktaş, İstanbul <br /> Takas Binası No:4</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => setIsContactOpen(false)}
                                className="relative z-10 w-full py-4 border border-white/10 rounded-xl md:rounded-2xl text-[8px] md:text-[9px] font-black tracking-widest uppercase hover:bg-white hover:text-stone-900 transition-all mt-10 md:mt-0"
                            >
                                GERİ DÖN
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
