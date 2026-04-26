import React, { useEffect, useState } from 'react';
import { User, Settings, Package, Heart, LogOut, Shield, Award, Calendar, ChevronRight, Activity, MapPin, Mail, RefreshCw, ExternalLink, Star } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../lib/api';

export default function Profile() {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const [stats, setStats] = useState({ activeAds: 0, completedSwaps: 0, favoritedItems: 0, score: 0, rank: '-' });
    const [recent, setRecent] = useState([]);

    useEffect(() => {
        if (!isAuthenticated) { navigate('/'); return; }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                const [adsR, tradesR, favsR, lbR] = await Promise.all([
                    api.getMyAds(),
                    api.getMyTrades(),
                    api.getMyFavorites(),
                    api.getLeaderboard(100),
                ]);
                if (cancelled) return;
                const myRank = (lbR.data || []).findIndex((u) => u.userId === user?.id) + 1;
                setStats({
                    activeAds: (adsR.data || []).filter((it) => it.status === 'ACTIVE').length,
                    completedSwaps: (tradesR.data || []).filter((t) => t.status === 'ACCEPTED').length,
                    favoritedItems: (favsR.data || []).length,
                    score: user?.profile?.score || 0,
                    rank: myRank > 0 ? `#${myRank}` : '—',
                });
                // Son 3 takas hareketi
                const items = (tradesR.data || []).slice(0, 3).map((t) => {
                    const isSender = t.senderId === user?.id;
                    const offer = t.tradeItems?.find((ti) => ti.side === (isSender ? 'OFFER' : 'REQUEST'))?.item;
                    return {
                        title: t.status === 'PENDING' ? (isSender ? 'Teklif gönderildi' : 'Yeni takas teklifi aldın') : t.status === 'ACCEPTED' ? 'Takas tamamlandı' : 'Takas kapandı',
                        time: new Date(t.updatedAt).toLocaleDateString('tr-TR'),
                        item: offer?.title || '—',
                        link: '/profil/takaslar',
                    };
                });
                setRecent(items);
            } catch (e) { console.error(e); }
        })();
        return () => { cancelled = true; };
    }, [user?.id]);

    if (!user) return null;
    const isPremium = !!user.profile?.isPremium;
    const firstName = user.profile?.firstName || user.email?.split('@')[0] || 'Kullanıcı';
    const fullLocation = [user.profile?.city, user.profile?.country].filter(Boolean).join(', ');
    const joined = user.createdAt ? new Date(user.createdAt).toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' }) : '—';

    const handleLogout = async () => { await logout(); navigate('/'); };

    return (
        <div className="min-h-screen bg-[#f5f1ed] pb-20">
            <div className={`${isPremium ? 'bg-stone-900' : 'bg-[#8B735B]'} py-4 rounded-b-[1.5rem] px-6 text-white shadow-2xl relative overflow-hidden transition-colors duration-500`}>
                <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div className="container mx-auto max-w-4xl relative z-10">
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                        <div className="relative shrink-0 mt-4 md:mt-0">
                            <div className={`w-16 h-16 md:w-32 md:h-32 rounded-full border-[3px] md:border-4 ${isPremium ? 'border-stone-800' : 'border-[#7a6550]'} p-0.5 md:p-1 bg-black/20 shadow-2xl`}>
                                <div className={`w-full h-full rounded-full ${isPremium ? 'bg-stone-800' : 'bg-[#7a6550]'} flex items-center justify-center text-xl md:text-4xl font-black text-amber-500`}>
                                    {firstName[0]?.toUpperCase()}
                                </div>
                            </div>
                            {isPremium && (
                                <div className="absolute -bottom-1 -right-1 md:-bottom-2 md:-right-2 bg-amber-500 text-stone-900 p-1 md:p-2 rounded-full shadow-lg border-2 border-stone-900">
                                    <Award className="w-2.5 h-2.5 md:w-4 md:h-4" />
                                </div>
                            )}
                        </div>

                        <div className="text-center md:text-left flex-1 space-y-2 md:space-y-4">
                            <div className="space-y-0.5 md:space-y-1">
                                <h1 className="text-2xl md:text-5xl font-serif font-black tracking-tight leading-none">{firstName}</h1>
                                <div className="flex flex-wrap justify-center md:justify-start gap-1.5 md:gap-4 text-stone-400 text-[9px] md:text-sm font-medium">
                                    {fullLocation && <div className="flex items-center gap-1 md:gap-1.5"><MapPin className="w-2.5 h-2.5 md:w-3.5 md:h-3.5" /> {fullLocation}</div>}
                                    <div className="flex items-center gap-1 md:gap-1.5"><Calendar className="w-2.5 h-2.5 md:w-3.5 md:h-3.5" /> {joined}</div>
                                    <div className="flex items-center gap-1 md:gap-1.5"><Mail className="w-2.5 h-2.5 md:w-3.5 md:h-3.5" /> {user.email}</div>
                                </div>
                            </div>

                            <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-2.5 pt-1 md:pt-0">
                                <Link to="/profil/kisisel-bilgiler" className="px-4 md:px-6 py-1.5 md:py-2 bg-white text-stone-900 rounded-full font-black text-[8px] md:text-[10px] tracking-widest uppercase hover:bg-amber-500 transition-all active:scale-95 shadow-lg">
                                    PROFİLİ DÜZENLE
                                </Link>
                                <Link to="/profil/guvenlik" className="p-1.5 md:p-2.5 bg-stone-800 text-stone-400 rounded-full hover:bg-stone-700 hover:text-white transition-all shadow-lg active:scale-90 border border-stone-700">
                                    <Settings className="w-3 h-3 md:w-4 md:h-4" />
                                </Link>
                            </div>
                        </div>

                        <div className={`${isPremium ? 'bg-[#FFF8E7]/5 border-[#FFF8E7]/20' : 'bg-white/10 border-white/20'} backdrop-blur-md p-3 md:p-6 rounded-[1rem] md:rounded-[2rem] text-center min-w-[120px] md:min-w-[180px] shadow-xl mt-2 md:mt-0 border`}>
                            <div className={`${isPremium ? 'text-[#FFF8E7]' : 'text-white/60'} font-black text-[7px] md:text-[10px] tracking-[0.2em] mb-1 md:mb-2 uppercase opacity-80`}>{isPremium ? 'PREMIUM ÜYE' : 'STANDART ÜYE'}</div>
                            <div className={`text-2xl md:text-4xl font-serif font-black ${isPremium ? 'text-amber-500' : 'text-white'} leading-none mb-1`}>{stats.score}</div>
                            <div className={`text-[7px] md:text-[10px] font-bold ${isPremium ? 'text-amber-500/60' : 'text-white/40'} uppercase tracking-widest`}>TAKASON PUAN</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="container mx-auto max-w-4xl px-4 md:px-6 mt-4 md:mt-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
                    {[
                        { icon: Package, label: 'AKTİF İLANLAR', value: stats.activeAds, path: '/profil/ilanlarim' },
                        { icon: RefreshCw, label: 'TAKASLARIM', value: stats.completedSwaps, path: '/profil/takaslar' },
                        { icon: Heart, label: 'FAVORİLER', value: stats.favoritedItems, path: '/favoriler' },
                        { icon: Award, label: 'SIRALAMA', value: stats.rank, path: '/liderler' },
                    ].map((stat, i) => (
                        <Link key={i} to={stat.path} className="bg-white p-3 md:p-6 rounded-[1rem] md:rounded-3xl border border-stone-100 shadow-xl shadow-stone-900/5 group hover:border-amber-500/30 transition-all block">
                            <div className="w-6 h-6 md:w-10 md:h-10 rounded-lg md:rounded-2xl bg-stone-50 flex items-center justify-center mb-2 md:mb-4 group-hover:scale-110 transition-transform">
                                <stat.icon className="w-3 h-3 md:w-4 md:h-4 text-stone-500" />
                            </div>
                            <div className="text-lg md:text-2xl font-black text-stone-900 leading-none mb-1">{stat.value}</div>
                            <div className="text-[7px] md:text-[9px] font-black tracking-widest text-stone-400 uppercase">{stat.label}</div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto max-w-4xl px-4 md:px-6 mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                <div className="md:col-span-1 space-y-3 md:space-y-4">
                    <h3 className="text-[8px] md:text-[10px] font-black tracking-widest text-stone-400 uppercase px-2">HESAP</h3>
                    <div className="bg-white rounded-[1rem] md:rounded-[2rem] border border-stone-100 overflow-hidden shadow-xl shadow-stone-900/5">
                        {[
                            { icon: Star, label: isPremium ? 'Ayrıcalıkları Görüntüle' : 'Premium Üye Ol', path: isPremium ? '/profil/premium-detay' : '/premium', highlight: true },
                            { icon: User, label: 'Kişisel Bilgiler', path: '/profil/kisisel-bilgiler' },
                            { icon: Shield, label: 'Güvenlik & Şifre', path: '/profil/guvenlik' },
                            { icon: MapPin, label: 'Adreslerim', path: '/profil/adreslerim' },
                            { icon: Package, label: 'İlanlarım', path: '/profil/ilanlarim' },
                            { icon: RefreshCw, label: 'Takaslarım', path: '/profil/takaslar' },
                            { icon: Activity, label: 'Takas Geçmişi', path: '/profil/takas-gecmisi' },
                            { icon: Mail, label: 'Bülten Tercihleri', path: '/profil/bulten' },
                        ].map((item, i) => (
                            <Link key={i} to={item.path} className={`w-full flex items-center justify-between p-3 md:p-5 hover:bg-stone-50 transition-colors group ${item.highlight ? 'bg-amber-50/30' : ''}`}>
                                <div className="flex items-center gap-2.5 md:gap-4">
                                    <div className={`p-1.5 md:p-2 rounded-lg md:rounded-xl shrink-0 ${item.highlight ? 'bg-[#4a2008]/10' : 'bg-stone-50'}`}>
                                        <item.icon className={`w-3 h-3 md:w-4 md:h-4 ${item.highlight ? 'text-[#4a2008]' : 'text-stone-400'}`} />
                                    </div>
                                    <span className={`text-[11px] md:text-sm font-bold ${item.highlight ? 'text-[#4a2008]' : 'text-stone-700'}`}>{item.label}</span>
                                </div>
                                <ChevronRight className={`w-3 h-3 md:w-4 md:h-4 ${item.highlight ? 'text-[#4a2008]/60' : 'text-stone-300 group-hover:text-stone-900'}`} />
                            </Link>
                        ))}
                        <button onClick={handleLogout} className="w-full flex items-center gap-2.5 md:gap-4 p-3 md:p-5 hover:bg-orange-50 transition-colors group border-t border-stone-50">
                            <div className="p-1.5 md:p-2 bg-orange-50 rounded-lg md:rounded-xl shrink-0">
                                <LogOut className="w-3 h-3 md:w-4 md:h-4 text-orange-500" />
                            </div>
                            <span className="text-[10px] md:text-sm font-black text-orange-600 uppercase tracking-widest">ÇIKIŞ YAP</span>
                        </button>
                    </div>
                </div>

                <div className="md:col-span-2 space-y-4 md:space-y-6">
                    <div className="space-y-3 md:space-y-6">
                        <div className="flex items-center justify-between px-2 mt-2 md:mt-0">
                            <h3 className="text-[8px] md:text-[10px] font-black tracking-widest text-stone-400 uppercase">SON HAREKETLER</h3>
                            <Link to="/profil/takaslar" className="text-[7px] md:text-[10px] font-black tracking-widest text-[#4a2008] hover:text-[#2d1405] uppercase">HEPSİNE GİT</Link>
                        </div>

                        <div className="grid grid-cols-1 gap-2 md:gap-4">
                            {recent.length === 0 ? (
                                <div className="bg-white p-6 rounded-[1rem] border border-stone-50 text-center text-stone-400 text-sm">Henüz hareket yok. Bir takasa başla!</div>
                            ) : recent.map((act, i) => (
                                <Link key={i} to={act.link} className="bg-white p-3 md:p-5 rounded-[1rem] md:rounded-[1.5rem] border border-stone-50 shadow-sm flex items-center justify-between hover:border-stone-200 transition-colors group">
                                    <div className="flex items-center gap-3 md:gap-4 min-w-0">
                                        <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-2xl bg-stone-50 flex items-center justify-center font-bold text-stone-300 group-hover:text-stone-900 italic shrink-0 text-xs md:text-base">T</div>
                                        <div className="min-w-0">
                                            <div className="text-[11px] md:text-sm font-bold text-stone-900 leading-tight truncate">{act.title}</div>
                                            <div className="text-[8px] md:text-xs text-stone-400 italic mt-0.5 truncate">{act.item} · {act.time}</div>
                                        </div>
                                    </div>
                                    <ExternalLink className="w-3 h-3 md:w-4 md:h-4 text-stone-200 group-hover:text-stone-900 shrink-0 ml-2 md:ml-3" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="bg-stone-900 p-4 md:p-8 rounded-[1rem] md:rounded-[2.5rem] text-white relative overflow-hidden shadow-2xl">
                        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-3 md:gap-6 text-center sm:text-left">
                            <div>
                                <h4 className="text-base md:text-xl font-serif italic mb-0.5 md:mb-1 text-[#FFF8E7]">Yardıma mı ihtiyacın var?</h4>
                                <p className="text-[8px] md:text-xs text-stone-400">Uzman ekibimiz 7/24 takas süreçlerinde seni destekliyor.</p>
                            </div>
                            <Link to="/yardim" className="w-full sm:w-auto bg-white text-stone-900 px-6 md:px-10 py-2.5 md:py-4 rounded-xl md:rounded-2xl font-black text-[8px] md:text-[10px] tracking-widest uppercase hover:bg-amber-500 shadow-xl">DESTEK</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
