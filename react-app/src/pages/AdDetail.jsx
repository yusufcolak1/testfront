import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Calendar, User, Shield, Share2, Heart, MessageCircle, ArrowRight, Zap, CheckCircle2, ChevronLeft, ChevronRight, Info, ArrowLeft } from 'lucide-react';

export default function AdDetail() {
    const { id } = useParams();
    const [activeImg, setActiveImg] = React.useState(0);

    const ad = {
        title: "iPhone 15 Pro Max - Titanyum Mavi",
        price: "Takaslık",
        description: "Cihazım çok temizdir, 2 ay önce alındı. Nokta hata yoktur. Pil sağlığı %100. Kutu fatura tamdır. Sadece üste nakit alabileceğim veya kafa kafaya takas edebileceğim mantıklı tekliflere açığım.",
        location: "Kadıköy, İstanbul",
        date: "2 saat önce",
        user: {
            name: "Emre Güven",
            initials: "EG",
            isPremium: true,
            score: 980,
            joined: "Ekim 2023"
        },
        images: [
            "https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&q=80&w=400"
        ],
        swapPreferences: ["MacBook Pro (M2/M3)", "PlayStation 5 + Nakit", "Motosiklet (Mantıklı olanlar)"],
        tags: ["Garantili", "Kutulu", "Sıfır Ayarında"]
    };

    const similarAds = Array.from({ length: 4 }, (_, i) => ({
        id: i + 10,
        title: `iPhone ${14 - i} Pro`,
        location: "İstanbul",
        image: `https://images.unsplash.com/photo-${['1511707171634-5f897ff02aa9', '1592899677977-9c10ca588bbd', '1567581935884-3349723552ca', '1523206489230-c012c64b2b48'][i % 4]}?auto=format&fit=crop&q=80&w=400`
    }));

    return (
        <div className="min-h-screen bg-[#f5f1ed] pb-24 lg:pb-40">
            <div className="container mx-auto px-4 md:px-6 py-8">
                {/* Back Link */}
                <Link to="/" className="inline-flex items-center gap-2 text-stone-400 hover:text-stone-900 transition-all group mb-6 md:mb-8">
                    <div className="p-2 bg-white rounded-lg md:rounded-xl shadow-sm group-hover:bg-[#4a2008] group-hover:text-[#FFF8E7] transition-all">
                        <ArrowLeft className="w-4 h-4" />
                    </div>
                    <span className="text-[9px] md:text-[10px] font-black tracking-widest uppercase italic font-serif">ANA SAYFAYA DÖN</span>
                </Link>

                {/* Breadcrumb / Back */}
                <div className="flex items-center gap-4 mb-8 text-[10px] font-black tracking-widest text-stone-400 uppercase">
                    <Link to="/" className="hover:text-stone-900 transition-colors">ANA SAYFA</Link>
                    <span>/</span>
                    <Link to="/arama?q=Telefon" className="hover:text-stone-900 transition-colors">ELEKTRONİK</Link>
                    <span>/</span>
                    <span className="text-stone-900 italic font-serif lowercase tracking-normal text-sm font-bold">İlan Detayı</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left: Image Gallery */}
                    <div className="lg:col-span-7 space-y-4 md:space-y-6">
                        <div className="relative aspect-square md:aspect-square rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-white shadow-2xl shadow-stone-900/10 group">
                            <img src={ad.images[activeImg]} alt={ad.title} className="w-full h-full object-cover transition-transform duration-700" />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>

                            <button className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 md:p-4 bg-white/90 backdrop-blur-md rounded-xl md:rounded-2xl shadow-xl hover:bg-white transition-all active:scale-95 text-stone-900 md:opacity-0 md:group-hover:opacity-100 duration-300">
                                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                            </button>
                            <button className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 md:p-4 bg-white/90 backdrop-blur-md rounded-xl md:rounded-2xl shadow-xl hover:bg-white transition-all active:scale-95 text-stone-900 md:opacity-0 md:group-hover:opacity-100 duration-300">
                                <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                            </button>
                        </div>

                        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                            {ad.images.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveImg(i)}
                                    className={`relative w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${activeImg === i ? 'border-[#4a2008] scale-105 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                >
                                    <img src={img} className="w-full h-full object-cover" alt="" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right: Info Area */}
                    <div className="lg:col-span-5 space-y-6 md:space-y-8">
                        {/* Summary Card */}
                        <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] border border-stone-100 p-6 md:p-8 shadow-xl shadow-stone-900/5 space-y-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-3xl rounded-full"></div>

                            <div className="space-y-3 md:space-y-4">
                                <div className="flex flex-wrap items-center gap-2">
                                    {ad.tags.map((tag, i) => (
                                        <span key={i} className="px-2.5 py-1 bg-stone-50 rounded-lg text-[8px] md:text-[9px] font-black text-stone-400 uppercase tracking-widest">{tag}</span>
                                    ))}
                                </div>
                                <h1 className="text-2xl md:text-4xl font-serif font-black text-stone-900 leading-tight italic">{ad.title}</h1>
                                <div className="flex items-center gap-2 text-stone-400">
                                    <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest">{ad.location}</span>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-stone-50 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-stone-900 flex items-center justify-center text-white font-black italic shadow-xl">
                                        {ad.user.initials}
                                    </div>
                                    <div>
                                        <div className="text-sm font-black text-stone-900 flex items-center gap-1.5">
                                            {ad.user.name}
                                            {ad.user.isPremium && <Zap className="w-3.5 h-3.5 text-[#4a2008] fill-[#4a2008]" />}
                                        </div>
                                        <div className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">{ad.user.joined} katıldı</div>
                                    </div>
                                </div>
                                <Link to="/liderler" className="p-3 bg-stone-50 rounded-xl hover:bg-[#4a2008]/10 transition-colors group">
                                    <Shield className="w-4 h-4 text-stone-400 group-hover:text-[#4a2008]" />
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                                <Link to={`/teklif-ver/${id}`} className="flex-1 bg-stone-900 text-white py-4 md:py-5 rounded-xl md:rounded-[1.5rem] font-black text-[9px] md:text-[10px] tracking-widest uppercase hover:bg-black transition-all shadow-xl shadow-black/10 flex items-center justify-center gap-2 group">
                                    <Zap className="w-4 h-4 text-amber-400 group-hover:scale-125 transition-transform" />
                                    TEKLİF VER
                                </Link>
                                <Link to={`/mesajlar?u=${ad.user.name}`} className="flex items-center justify-center gap-2 border-2 border-stone-100 py-4 md:py-5 rounded-xl md:rounded-[1.5rem] font-black text-[9px] md:text-[10px] tracking-widest text-stone-600 uppercase hover:bg-stone-50 transition-all">
                                    <MessageCircle className="w-4 h-4" />
                                    MESAJ GÖNDER
                                </Link>
                            </div>
                        </div>

                        {/* Swap With Section */}
                        <div className="bg-amber-50 rounded-[2.5rem] p-8 border border-amber-100/50 space-y-6">
                            <div className="flex items-center gap-2">
                                <ArrowRight className="w-5 h-5 text-[#4a2008]" />
                                <h3 className="text-xs font-black tracking-widest text-[#4a2008] uppercase">TAKASA AÇIK ÜRÜNLER</h3>
                            </div>
                            <div className="space-y-3">
                                {ad.swapPreferences.map((pref, i) => (
                                    <div key={i} className="flex items-center gap-3 bg-white/60 p-4 rounded-2xl border border-white">
                                        <CheckCircle2 className="w-4 h-4 text-[#4a2008]" />
                                        <span className="text-sm font-bold text-stone-800">{pref}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="p-4 bg-amber-400/10 rounded-2xl text-[10px] font-serif italic text-amber-700 leading-relaxed font-medium">
                                "Sadece mantıklı tekliflere açığım, değerinin altındaki nakit teklifleri için lütfen yazmayın."
                            </div>
                        </div>

                        {/* Description */}
                        <div className="px-2 md:px-4 space-y-3 md:space-y-4">
                            <h3 className="text-[10px] md:text-xs font-black tracking-widest text-stone-400 uppercase">İLAN AÇIKLAMASI</h3>
                            <p className="text-stone-600 font-serif leading-relaxed italic text-base md:text-lg">{ad.description}</p>
                        </div>
                    </div>
                </div>

                {/* Similar Ads Section */}
                <div className="mt-16 md:mt-24 space-y-8 md:space-y-10">
                    <div className="flex items-center justify-between border-b border-stone-200 pb-4 md:pb-6">
                        <h2 className="text-2xl md:text-3xl font-serif font-black text-stone-900 italic">Benzer <span className="text-[#4a2008]">İlanlar</span></h2>
                        <button className="text-[9px] md:text-[10px] font-black tracking-widest text-stone-400 hover:text-stone-900 uppercase transition-colors">TÜMÜNE GÖZ AT</button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                        {similarAds.map((item) => (
                            <Link to={`/ilan/${item.id}`} key={item.id} className="group flex flex-col bg-white rounded-[1.5rem] md:rounded-[2.5rem] p-3 md:p-4 border border-stone-100 shadow-xl shadow-stone-900/5 hover:-translate-y-2 transition-all duration-500">
                                <div className="relative aspect-[4/5] rounded-[1.2rem] md:rounded-[2rem] overflow-hidden mb-3 md:mb-6 bg-stone-100">
                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    <button className="absolute top-4 right-4 p-2.5 bg-white/90 backdrop-blur-md rounded-xl text-stone-400 hover:text-red-500 transition-all shadow-sm">
                                        <Heart className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="px-2 pb-2 space-y-3">
                                    <h3 className="text-lg md:text-xl font-serif font-black text-stone-900 leading-none group-hover:text-[#4a2008] transition-colors italic uppercase tracking-tighter truncate">
                                        {item.title}
                                    </h3>
                                    <div className="flex items-center justify-between text-stone-400">
                                        <div className="flex items-center gap-1.5">
                                            <MapPin className="w-3.5 h-3.5" />
                                            <span className="text-[10px] font-bold uppercase tracking-widest">{item.location}</span>
                                        </div>
                                        <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
