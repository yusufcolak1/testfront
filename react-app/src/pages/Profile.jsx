import React from 'react';
import { User, Settings, Package, Heart, LogOut, Shield, Award, Calendar, ChevronRight, Activity, MapPin, Mail, Phone, ExternalLink, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Profile() {
    const [isPremium, setIsPremium] = React.useState(true);

    const user = {
        name: "Emre",
        email: "emre@takason.com",
        location: "İstanbul, TR",
        joined: "Ekim 2023",
        stats: {
            activeAds: 8,
            completedSwaps: 42,
            favoritedItems: 12,
            score: 980
        }
    };

    const navigate = React.useMemo(() => {
        return (path) => window.location.href = path; // Basit yönlendirme veya useNavigate kancası kullanılabilir
    }, []);

    return (
        <div className="min-h-screen bg-[#f5f1ed] pb-20">
            {/* Header / Hero Section */}
            <div className={`${isPremium ? 'bg-stone-900' : 'bg-[#8B735B]'} py-4 rounded-b-[1.5rem] px-6 text-white shadow-2xl relative overflow-hidden transition-colors duration-500`}>
                <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-stone-500/5 blur-3xl rounded-full translate-y-1/2 -translate-x-1/2"></div>

                <div className="container mx-auto max-w-4xl relative z-10">
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                        {/* Avatar */}
                        <div className="relative group shrink-0 mt-4 md:mt-0">
                            <div className={`w-16 h-16 md:w-32 md:h-32 rounded-full border-[3px] md:border-4 ${isPremium ? 'border-stone-800' : 'border-[#7a6550]'} p-0.5 md:p-1 bg-black/20 shadow-2xl group-hover:border-amber-500/50 transition-all duration-500`}>
                                <div className={`w-full h-full rounded-full ${isPremium ? 'bg-stone-800' : 'bg-[#7a6550]'} flex items-center justify-center text-xl md:text-4xl font-black text-stone-500 group-hover:text-amber-500 transition-colors`}>
                                    {user.name[0]}
                                </div>
                            </div>
                            {isPremium && (
                                <div className="absolute -bottom-1 -right-1 md:-bottom-2 md:-right-2 bg-amber-500 text-stone-900 p-1 md:p-2 rounded-full shadow-lg border-2 border-stone-900 shrink-0">
                                    <Award className="w-2.5 h-2.5 md:w-4 md:h-4 shrink-0" />
                                </div>
                            )}
                        </div>

                        {/* Basic Info */}
                        <div className="text-center md:text-left flex-1 space-y-2 md:space-y-4">
                            <div className="space-y-0.5 md:space-y-1">
                                <h1 className="text-2xl md:text-5xl font-serif font-black tracking-tight leading-none">{user.name}</h1>
                                <div className="flex flex-wrap justify-center md:justify-start gap-1.5 md:gap-4 text-stone-400 text-[9px] md:text-sm font-medium">
                                    <div className="flex items-center gap-1 md:gap-1.5"><MapPin className="w-2.5 h-2.5 md:w-3.5 md:h-3.5" /> {user.location}</div>
                                    <div className="flex items-center gap-1 md:gap-1.5"><Calendar className="w-2.5 h-2.5 md:w-3.5 md:h-3.5" /> {user.joined}</div>
                                </div>
                            </div>

                            <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-2.5 pt-1 md:pt-0">
                                <Link to="/profil/kisisel-bilgiler" className="px-4 md:px-6 py-1.5 md:py-2 bg-white text-stone-900 rounded-full font-black text-[8px] md:text-[10px] tracking-widest uppercase hover:bg-amber-500 transition-all active:scale-95 shadow-lg shadow-black/20 leading-none flex items-center">
                                    PROFİLİ DÜZENLE
                                </Link>
                                <Link to="/profil/guvenlik" className="p-1.5 md:p-2.5 bg-stone-800 text-stone-400 rounded-full hover:bg-stone-700 hover:text-white transition-all shadow-lg active:scale-90 border border-stone-700 shrink-0 flex items-center">
                                    <Settings className="w-3 h-3 md:w-4 md:h-4 shrink-0" />
                                </Link>
                            </div>
                        </div>

                        {/* Premium Badge */}
                        {isPremium ? (
                            <div className="bg-[#FFF8E7]/5 border border-[#FFF8E7]/20 backdrop-blur-md p-3 md:p-6 rounded-[1rem] md:rounded-[2rem] text-center min-w-[120px] md:min-w-[180px] shadow-xl shrink-0 mt-2 md:mt-0">
                                <div className="text-[#FFF8E7] font-black text-[7px] md:text-[10px] tracking-[0.2em] mb-1 md:mb-2 uppercase opacity-80 leading-none">PREMIUM ÜYE</div>
                                <div className="text-2xl md:text-4xl font-serif font-black text-amber-500 leading-none mb-1 shadow-sm">{user.stats.score}</div>
                                <div className="text-[7px] md:text-[10px] font-bold text-amber-500/60 uppercase tracking-widest leading-none">TAKASON PUAN</div>
                            </div>
                        ) : (
                            <div className="bg-white/10 border border-white/20 p-3 md:p-6 rounded-[1rem] md:rounded-[2rem] text-center min-w-[120px] md:min-w-[180px] group cursor-pointer hover:bg-white/20 transition-all shrink-0 mt-2 md:mt-0">
                                <div className="text-white/60 font-black text-[7px] md:text-[9px] tracking-[0.2em] mb-1 md:mb-2 leading-none">STANDART ÜYE</div>
                                <div className="text-xl md:text-3xl font-serif font-black text-white leading-none mb-1">0</div>
                                <div className="text-[7px] md:text-[10px] font-bold text-white/40 uppercase tracking-widest leading-none">TAKASON PUAN</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="container mx-auto max-w-4xl px-4 md:px-6 mt-4 md:mt-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
                    {[
                        { icon: Package, label: "AKTİF İLANLAR", value: user.stats.activeAds, color: "stone", path: "/profil/ilanlarim" },
                        { icon: Activity, label: "TÜM TAKASLAR", value: user.stats.completedSwaps, color: "stone", path: "/profil/takas-gecmisi" },
                        { icon: Heart, label: "FAVORİLER", value: user.stats.favoritedItems, color: "stone", path: "/favoriler" },
                        { icon: Award, label: "SIRALAMA", value: "#12", color: "amber", path: "/liderler" }
                    ].map((stat, i) => (
                        <Link key={i} to={stat.path} className={`bg-white p-3 md:p-6 rounded-[1rem] md:rounded-3xl border border-stone-100 shadow-xl shadow-stone-900/5 group hover:border-${stat.color}-500/30 transition-all block`}>
                            <div className={`w-6 h-6 md:w-10 md:h-10 rounded-lg md:rounded-2xl bg-${stat.color === 'amber' ? 'amber-50' : 'stone-50'} flex items-center justify-center mb-2 md:mb-4 group-hover:scale-110 transition-transform`}>
                                <stat.icon className={`w-3 h-3 md:w-4 md:h-4 ${stat.color === 'amber' ? 'text-[#4a2008]' : `text-stone-500`}`} />
                            </div>
                            <div className="text-lg md:text-2xl font-black text-stone-900 leading-none mb-1">{stat.value}</div>
                            <div className="text-[7px] md:text-[9px] font-black tracking-widest text-stone-400 uppercase leading-none">{stat.label}</div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Main Content Sections */}
            <div className="container mx-auto max-w-4xl px-4 md:px-6 mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {/* Account Settings Menu */}
                <div className="md:col-span-1 space-y-3 md:space-y-4">
                    <h3 className="text-[8px] md:text-[10px] font-black tracking-widest text-stone-400 uppercase px-2">HESAP</h3>
                    <div className="bg-white rounded-[1rem] md:rounded-[2rem] border border-stone-100 overflow-hidden shadow-xl shadow-stone-900/5">
                        {[
                            {
                                icon: Star,
                                label: isPremium ? "Ayrıcalıkları Görüntüle" : "Premium Üye Ol",
                                path: isPremium ? "/profil/premium-detay" : "/premium",
                                highlight: true
                            },
                            { icon: User, label: "Kişisel Bilgiler", path: "/profil/kisisel-bilgiler" },
                            { icon: Shield, label: "Güvenlik & Şifre", path: "/profil/guvenlik" },
                            { icon: MapPin, label: "Adreslerim", path: "/profil/adreslerim" },
                            { icon: Mail, label: "Bülten Tercihleri", path: "/profil/bulten" }
                        ].map((item, i) => (
                            <Link key={i} to={item.path} className={`w-full flex items-center justify-between p-3 md:p-5 hover:bg-stone-50 transition-colors group ${item.highlight ? 'bg-amber-50/30' : ''}`}>
                                <div className="flex items-center gap-2.5 md:gap-4">
                                    <div className={`p-1.5 md:p-2 rounded-lg md:rounded-xl transition-colors shrink-0 ${item.highlight ? 'bg-[#4a2008]/10 group-hover:bg-[#4a2008]/20' : 'bg-stone-50 group-hover:bg-white'}`}>
                                        <item.icon className={`w-3 h-3 md:w-4 md:h-4 shrink-0 ${item.highlight ? 'text-[#4a2008]' : 'text-stone-400'}`} />
                                    </div>
                                    <span className={`text-[11px] md:text-sm font-bold leading-none ${item.highlight ? 'text-[#4a2008]' : 'text-stone-700'}`}>{item.label}</span>
                                </div>
                                <ChevronRight className={`w-3 h-3 md:w-4 md:h-4 shrink-0 transition-colors ${item.highlight ? 'text-[#4a2008]/60 group-hover:text-[#4a2008]' : 'text-stone-300 group-hover:text-stone-900'}`} />
                            </Link>
                        ))}
                        <button onClick={() => window.location.href = "/"} className="w-full flex items-center gap-2.5 md:gap-4 p-3 md:p-5 hover:bg-orange-50 transition-colors group border-t border-stone-50">
                            <div className="p-1.5 md:p-2 bg-orange-50 rounded-lg md:rounded-xl shrink-0">
                                <LogOut className="w-3 h-3 md:w-4 md:h-4 text-orange-500 shrink-0" />
                            </div>
                            <span className="text-[10px] md:text-sm font-black text-orange-600 uppercase tracking-widest leading-none">ÇIKIŞ YAP</span>
                        </button>
                    </div>
                </div>

                {/* Activity / Info Area */}
                <div className="md:col-span-2 space-y-4 md:space-y-6">
                    <div className="space-y-3 md:space-y-6">
                        <div className="flex items-center justify-between px-2 text-stone-900 mt-2 md:mt-0">
                            <h3 className="text-[8px] md:text-[10px] font-black tracking-widest text-stone-400 uppercase leading-none">SON HAREKETLER</h3>
                            <Link to="/mesajlar" className="text-[7px] md:text-[10px] font-black tracking-widest text-[#4a2008] hover:text-[#2d1405] uppercase transition-colors leading-none">HEPSİNE GİT</Link>
                        </div>

                        <div className="grid grid-cols-1 gap-2 md:gap-4">
                            {[
                                { title: "Yeni bir takas teklifi aldın", time: "2 saat önce", item: "iPhone 13 Pro", type: "offer" },
                                { title: "İlanın onaylandı", time: "Dün", item: "Klasik Gitar", type: "approval" },
                                { title: "Favoriye eklendi", time: "2 gün önce", item: "Kamp Çadırı", type: "favorite" }
                            ].map((act, i) => (
                                <div key={i} className="bg-white p-3 md:p-5 rounded-[1rem] md:rounded-[1.5rem] border border-stone-50 shadow-sm flex items-center justify-between hover:border-stone-200 transition-colors group">
                                    <div className="flex items-center gap-3 md:gap-4 min-w-0">
                                        <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-2xl bg-stone-50 flex items-center justify-center font-bold text-stone-300 group-hover:text-stone-900 transition-colors italic shrink-0 text-xs md:text-base">T</div>
                                        <div className="min-w-0">
                                            <div className="text-[11px] md:text-sm font-bold text-stone-900 leading-tight truncate">{act.title}</div>
                                            <div className="text-[8px] md:text-xs text-stone-400 font-serif italic mt-0.5 truncate">{act.item} · {act.time}</div>
                                        </div>
                                    </div>
                                    <ExternalLink className="w-3 h-3 md:w-4 md:h-4 text-stone-200 group-hover:text-stone-900 transition-colors shrink-0 ml-2 md:ml-3" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Support Banner */}
                    <div className="bg-stone-900 p-4 md:p-8 rounded-[1rem] md:rounded-[2.5rem] text-white relative overflow-hidden shadow-2xl mt-4 md:mt-0">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-2xl rounded-full"></div>
                        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-3 md:gap-6 text-center sm:text-left">
                            <div className="shrink-0 md:shrink">
                                <h4 className="text-base md:text-xl font-serif italic mb-0.5 md:mb-1 text-[#FFF8E7] leading-none">Yardıma mı ihtiyacın var?</h4>
                                <p className="text-[8px] md:text-xs text-stone-400 font-medium leading-relaxed">Uzman ekibimiz 7/24 takas süreçlerinde seni destekliyor.</p>
                            </div>
                            <Link to="/yardim" className="w-full sm:w-auto bg-white text-stone-900 px-6 md:px-10 py-2.5 md:py-4 rounded-xl md:rounded-2xl font-black text-[8px] md:text-[10px] tracking-widest uppercase hover:bg-amber-500 transition-all shadow-xl block text-center leading-none mt-1 md:mt-0">DESTEK</Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Support info or secondary footer */}
            <div className="container mx-auto max-w-4xl px-8 mt-12 text-center">
                {isPremium && (
                    <button className="text-[9px] font-black text-stone-400 uppercase tracking-widest hover:text-red-500 transition-colors opacity-40 hover:opacity-100">
                        ÜYELİĞİ İPTAL ET
                    </button>
                )}
                <p className="text-[8px] text-stone-300 font-bold uppercase tracking-[0.2em] mt-2">© 2024 TAKASON PLATFORMU · KULLANICI NO: #88412</p>
            </div>

            {/* Developer Mode Toggle */}
            <div className="fixed bottom-6 right-6 z-50">
                <div className="bg-stone-900 border border-stone-800 p-1.5 rounded-full flex items-center gap-1 shadow-2xl">
                    <button
                        onClick={() => setIsPremium(false)}
                        className={`px-4 py-2 rounded-full text-[9px] font-black tracking-widest uppercase transition-all ${!isPremium ? 'bg-amber-500 text-stone-900' : 'bg-transparent text-stone-500 hover:text-white'}`}
                    >
                        STANDART
                    </button>
                    <button
                        onClick={() => setIsPremium(true)}
                        className={`px-4 py-2 rounded-full text-[9px] font-black tracking-widest uppercase transition-all ${isPremium ? 'bg-amber-500 text-stone-900' : 'bg-transparent text-stone-500 hover:text-white'}`}
                    >
                        PREMIUM
                    </button>
                </div>
            </div>
        </div>
    );
}
