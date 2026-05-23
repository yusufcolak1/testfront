import { Search, Smartphone, Sofa, Shirt, BookOpen, Music, Bike, Watch, Gamepad2, Box, ArrowRight, ChevronLeft, ChevronRight, Star, Award, Heart, HelpCircle, Baby, Boxes, Home as HomeIcon, Car, Sparkles, Palette, Briefcase } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../lib/api';
import { useAuth } from '../contexts/AuthContext';
import { getFullImageUrl } from '../utils/helpers';

export default function Home() {
    const categories = [
        { icon: Smartphone, label: 'Elektronik', slug: 'elektronik' },
        { icon: Sofa, label: 'Mobilya', slug: 'mobilya' },
        { icon: Shirt, label: 'Giyim', slug: 'giyim' },
        { icon: BookOpen, label: 'Kitap', slug: 'kitap' },
        { icon: Music, label: 'Müzik', slug: 'muzik' },
        { icon: Bike, label: 'Spor & Outdoor', slug: 'spor-outdoor' },
        { icon: Watch, label: 'Antika', slug: 'antika' },
        { icon: Gamepad2, label: 'Oyun & Konsol', slug: 'oyun-konsol' },
        { icon: Boxes, label: 'Oyuncak & Hobi', slug: 'oyuncak-hobi' },
        { icon: Baby, label: 'Bebek & Anne', slug: 'bebek-anne' },
        { icon: HomeIcon, label: 'Ev & Yaşam', slug: 'ev-yasam' },
        { icon: Car, label: 'Otomotiv', slug: 'otomotiv' },
        { icon: Sparkles, label: 'Kozmetik', slug: 'kozmetik' },
        { icon: Palette, label: 'Hobi & Sanat', slug: 'hobi-sanat' },
        { icon: Briefcase, label: 'Ofis & Kırtasiye', slug: 'ofis-kirtasiye' },
        { icon: Box, label: 'Diğer', slug: 'diger' },
    ];

    const navigate = useNavigate();
    const { isAuthenticated, openLoginModal } = useAuth();

    const [ads, setAds] = useState([]);
    const [feedAds, setFeedAds] = useState([]);
    const [feedMeta, setFeedMeta] = useState({ mode: 'cold_start', interactionCount: 0 });
    const [featuredAdsData, setFeaturedAdsData] = useState([]);
    const [popularAdsData, setPopularAdsData] = useState([]);
    const [settings, setSettings] = useState({});
    const [loading, setLoading] = useState(true);
    const [activeRec, setActiveRec] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch items and settings from backend API
    useEffect(() => {
        let sc = false;
        const fetchData = async () => {
            try {
                setLoading(true);
                const requests = [
                    api.getItems({ limit: 8, sort: 'newest' }),
                    api.getItems({ limit: 8, isFeatured: 'true' }),
                    api.getItems({ limit: 8, isPopular: 'true' }),
                    api.getPublicSettings(),
                ];

                // Kişiselleştirilmiş feed — sadece giriş yapmış kullanıcılar için
                if (isAuthenticated) {
                    requests.push(api.getFeed({ limit: 8 }));
                }

                const results = await Promise.allSettled(requests);

                if (sc) return;

                const transform = (items) => (items || []).map(item => ({
                    id: item.id,
                    title: item.title,
                    category: item.category?.name?.toUpperCase() || 'GENEL',
                    tag: item.tag || (item.condition === 'NEW' ? 'SIFIR' : 'YENİ GİBİ'),
                    user: item.user?.profile?.firstName || 'Kullanıcı',
                    initials: (item.user?.profile?.firstName?.[0] || 'K').toUpperCase(),
                    image: getFullImageUrl(item.images?.find(img => img.isPrimary)?.imageUrl || item.images?.[0]?.imageUrl),
                    location: item.location,
                    _feedScore: item._feedScore,
                }));

                if (results[0].status === 'fulfilled') setAds(transform(results[0].value.data));
                if (results[1].status === 'fulfilled') setFeaturedAdsData(transform(results[1].value.data));
                if (results[2].status === 'fulfilled') setPopularAdsData(transform(results[2].value.data));
                if (results[3].status === 'fulfilled') setSettings(results[3].value.data || {});

                // Feed sonucu
                if (isAuthenticated && results[4]?.status === 'fulfilled') {
                    const feedRes = results[4].value;
                    setFeedAds(transform(feedRes.items || []));
                    setFeedMeta(feedRes.meta || { mode: 'cold_start' });
                }
            } catch (error) {
                console.error('Veriler yüklenirken hata:', error);
            } finally {
                if (!sc) setLoading(false);
            }
        };
        fetchData();
        return () => { sc = true; };
    }, [isAuthenticated]);

    // Etkileşim logu: ilan detayına gidince VIEW kaydeder
    const logInteraction = async (itemId, type = 'VIEW') => {
        if (!isAuthenticated) return;
        try {
            await api.post(`/items/${itemId}/interact`, { type });
        } catch { /* yut */ }
    };


    const timerRef = useRef(null);

    const resetTimer = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        timerRef.current = setInterval(() => {
            setActiveRec((prev) => (prev + 1) % 4);
        }, 5000); // Otomatik geçiş süresi 5 saniyeye uzatıldı
    };

    // Auto-slide effect for recommendations
    useEffect(() => {
        resetTimer();
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    const nextRec = () => {
        setActiveRec((prev) => (prev + 1) % 4);
        resetTimer();
    };

    const prevRec = () => {
        setActiveRec((prev) => (prev - 1 + 4) % 4);
        resetTimer();
    };

    // Yön tuşları (Klavye) ile geçiş desteği
    useEffect(() => {
        const handleKeyDown = (e) => {
            const activeEl = document.activeElement;
            // Eğer kullanıcı input veya textarea içindeyse tuşları algılama
            if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.isContentEditable)) {
                return;
            }
            if (e.key === 'ArrowLeft') {
                prevRec();
            } else if (e.key === 'ArrowRight') {
                nextRec();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleSearch = (e) => {
        if (e) e.preventDefault();
        const query = searchTerm.trim() || 'Telefon';
        navigate(`/arama?q=${encodeURIComponent(query)}`);
    };

    const [heroScale, setHeroScale] = useState(1);
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1280) {
                setHeroScale(window.innerWidth / 1280);
            } else {
                setHeroScale(1);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const [gridScale, setGridScale] = useState(1);
    const [gridHeight, setGridHeight] = useState(1500);
    const gridRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setGridScale(window.innerWidth / 1024);
            } else {
                setGridScale(1);
            }
            if (gridRef.current) {
                setGridHeight(gridRef.current.offsetHeight);
            }
        };
        handleResize();
        setTimeout(handleResize, 100);
        setTimeout(handleResize, 500);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="pb-32 bg-[#f5f1ed]">
            {/* Hero Section - Light Brown */}
            <section
                className="bg-[#f5f1ed] overflow-hidden relative"
                style={{ height: heroScale < 1 ? `${(window.innerWidth < 600 ? 600 : 650) * heroScale}px` : 'auto' }}
            >
                <div
                    className="origin-top-left absolute top-0 left-0 xl:relative w-full"
                    style={{
                        transform: heroScale < 1 ? `scale(${heroScale})` : 'none',
                        width: heroScale < 1 ? '1280px' : '100%',
                        paddingTop: heroScale < 1 ? '4rem' : '4rem',
                        paddingBottom: heroScale < 1 ? '5rem' : '5rem'
                    }}
                >
                    <div className="container mx-auto px-6 relative" style={{ maxWidth: heroScale < 1 ? 'none' : undefined }}>
                        <div className="flex flex-row items-center gap-16">
                            {/* Title Section */}
                            <div className="flex-1 text-left space-y-8">
                                <h2 id="ui-static-slogan" className="text-7xl lg:text-8xl font-serif text-stone-900 tracking-tight leading-[1.2] lg:leading-[1.1]">
                                    <span className="block italic text-[#5a4a40] mb-2">{settings.site_slogan_1 || 'Her Eşya İkinci Bir'}</span>
                                    <span className="block">{settings.site_slogan_2 || 'Şansı Hak Eder'}</span>
                                </h2>
                                <p className="text-2xl text-stone-600 font-serif italic font-medium max-w-2xl mx-0 leading-normal">
                                    {settings.site_description || 'Eşyalarını takasla, değerini koru.'}
                                </p>

                                <div className="pt-8 w-full max-w-2xl mx-0">
                                    <div className="relative group shadow-2xl shadow-stone-900/5 rounded-3xl">
                                        <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                                            <Search className="w-5 h-5 text-stone-500 group-focus-within:text-stone-900 transition-colors" />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Ne arıyorsun? (Örn: iPhone, Bisiklet, Kitap...)"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                            className="w-full bg-[#fbfaf8] border border-stone-100 py-6 pl-16 pr-36 rounded-3xl outline-none focus:border-stone-900 focus:ring-8 focus:ring-stone-900/5 transition-all text-lg font-medium placeholder-stone-300 shadow-sm"
                                        />
                                        <button
                                            onClick={handleSearch}
                                            className="absolute right-3 top-3 bottom-3 px-10 bg-stone-900 text-white font-bold rounded-2xl hover:bg-black active:scale-95 transition-all shadow-lg shadow-black/10 uppercase tracking-widest text-xs"
                                        >
                                            ARA
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Recommended Vertical Slideshow - Always Visible Here */}
                            <div id="hero-recommended" className="flex absolute top-1/2 -translate-y-1/2 right-[40px] xl:right-[120px] w-[340px] h-[460px] items-center justify-center z-20">
                                <div className="relative w-full h-full flex items-center justify-center group">
                                    {/* Zarif Sol Yön Butonu */}
                                    <button 
                                        onClick={prevRec}
                                        className="absolute -left-6 z-50 p-2.5 rounded-full bg-white/30 hover:bg-white/90 backdrop-blur-md border border-white/20 shadow-md text-stone-600 hover:text-stone-900 opacity-0 group-hover:opacity-100 transition-all duration-300 active:scale-95"
                                        aria-label="Önceki Öneri"
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                    </button>

                                    {ads.slice(0, 4).map((ad, index) => {
                                        if (index !== activeRec) return null;
                                        return (
                                            <div key={ad.id} className="group absolute w-[340px] h-[460px] rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-700 block animate-in zoom-in-95 fade-in bg-stone-900 border border-stone-200/20">
                                                <img src={ad.image} alt={ad.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90 group-hover:opacity-100" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-black/10 transition-opacity duration-500 group-hover:opacity-90"></div>

                                                <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-amber-500 text-stone-900 text-[10px] font-black px-5 py-2 rounded-full tracking-widest uppercase shadow-lg z-40 whitespace-nowrap">
                                                    ÖNERİLEN
                                                </div>

                                                <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col items-center text-center">
                                                    <span className="text-xs font-black tracking-widest text-amber-500 uppercase mb-3 px-3 py-1 bg-stone-900/60 backdrop-blur-md rounded-lg">
                                                        {ad.category}
                                                    </span>
                                                    <h4 className="text-3xl font-serif font-black italic text-white leading-tight line-clamp-2 mb-6 drop-shadow-lg">
                                                        {ad.title}
                                                    </h4>
                                                    <Link to={`/ilan/${ad.id}`} className="w-full bg-white text-stone-900 rounded-2xl py-3.5 text-xs font-black tracking-widest uppercase hover:bg-[#4a2008] hover:text-[#FFF8E7] hover:scale-105 active:scale-95 transition-all shadow-xl text-center">
                                                        İncele
                                                    </Link>
                                                </div>
                                            </div>
                                        );
                                    })}

                                    {/* Zarif Sağ Yön Butonu */}
                                    <button 
                                        onClick={nextRec}
                                        className="absolute -right-6 z-50 p-2.5 rounded-full bg-white/30 hover:bg-white/90 backdrop-blur-md border border-white/20 shadow-md text-stone-600 hover:text-stone-900 opacity-0 group-hover:opacity-100 transition-all duration-300 active:scale-95"
                                        aria-label="Sonraki Öneri"
                                    >
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Section - Subtle Cream/Gray */}
            <section
                className="bg-stone-50/50 overflow-hidden relative border-y border-stone-100"
                style={{ height: heroScale < 1 ? `${132 * heroScale}px` : 'auto' }}
            >
                <div
                    className="origin-top-left absolute top-0 left-0 xl:relative w-full h-full"
                    style={{
                        transform: heroScale < 1 ? `scale(${heroScale})` : 'none',
                        width: heroScale < 1 ? '1280px' : '100%'
                    }}
                >
                    <div className="py-8 container mx-auto px-6 h-full flex items-center" style={{ maxWidth: heroScale < 1 ? 'none' : undefined }}>
                        <div className="w-full flex items-center gap-4 overflow-x-auto pb-4 no-scrollbar snap-x">
                            {categories.map((cat, i) => (
                                <Link
                                    key={i}
                                    to={`/kategori/${cat.slug}`}
                                    className="flex items-center gap-3 px-8 py-4 bg-[#fbfaf8] border border-stone-100 rounded-2xl hover:border-stone-900 hover:shadow-lg transition-all font-bold text-xs uppercase tracking-widest whitespace-nowrap snap-start shadow-sm group shrink-0"
                                >
                                    <cat.icon className="w-4 h-4 text-stone-500 group-hover:text-[#4a2008] transition-colors" />
                                    {cat.label}
                                </Link>
                            ))}
                            <Link to="/yardim" className="p-3 bg-white rounded-3xl shadow-sm hover:bg-[#4a2008] hover:text-[#FFF8E7] transition-all group shrink-0">
                                <HelpCircle className="w-5 h-5 text-stone-500 group-hover:text-[#FFF8E7]" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Listings Grid - Scalable Wrapper */}
            <div className="w-full relative overflow-hidden bg-stone-50" style={{ height: gridScale < 1 ? `${gridHeight * gridScale}px` : 'auto' }}>
                <div
                    ref={gridRef}
                    className="w-full origin-top-left"
                    style={{
                        transform: gridScale < 1 ? `scale(${gridScale})` : 'none',
                        width: gridScale < 1 ? '1024px' : '100%',
                        position: gridScale < 1 ? 'absolute' : 'relative',
                        top: 0, left: 0
                    }}
                >
                    {/* Kişiselleştirilmiş Feed — Sadece giriş yapmış kullanıcılar */}
                    {isAuthenticated && feedAds.length > 0 && (
                        <section className="bg-gradient-to-b from-[#4a2008]/8 to-[#f5f1ed] py-12 border-b border-stone-100">
                            <div className="container mx-auto px-6" style={{ maxWidth: gridScale < 1 ? 'none' : undefined }}>
                                <div className="flex flex-row items-center justify-between mb-8 gap-6 text-left">
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-4xl font-serif text-stone-900 leading-none">Senin İçin Seçilenler</h3>
                                            <span className={`px-3 py-1 rounded-full text-[9px] font-black tracking-widest uppercase ${feedMeta.mode === 'personalized' ? 'bg-amber-500 text-stone-900' : 'bg-stone-200 text-stone-600'}`}>
                                                {feedMeta.mode === 'personalized' ? '🧠 Kişisel' : '🌱 Keşif'}
                                            </span>
                                        </div>
                                        <p className="text-base text-stone-500 font-medium">
                                            {feedMeta.mode === 'personalized'
                                                ? `${feedMeta.interactionCount} etkileşimine göre seçildi.`
                                                : 'Sana özel içerikleri keşfetmek için daha fazla ilan incele.'}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
                                    {feedAds.slice(0, 4).map((ad) => (
                                        <Link
                                            to={`/ilan/${ad.id}`}
                                            key={ad.id}
                                            onClick={() => logInteraction(ad.id, 'CLICK')}
                                            className="group bg-[#fbfaf8] border-2 border-[#4a2008]/10 rounded-[2.5rem] p-5 transition-all duration-500 hover:shadow-2xl hover:shadow-[#4a2008]/10 hover:-translate-y-2 hover:border-[#4a2008]/30 block relative"
                                        >
                                            {ad._feedScore != null && (
                                                <div className="absolute top-3 right-3 z-10 bg-[#4a2008] text-white text-[8px] font-black px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                                    {(ad._feedScore * 100).toFixed(0)}% eşleşme
                                                </div>
                                            )}
                                            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-stone-50 mb-6">
                                                {ad.image ? (
                                                    <img src={ad.image} alt={ad.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-stone-100">
                                                        <Box className="w-12 h-12 text-stone-200" />
                                                    </div>
                                                )}
                                                <div className="absolute top-5 left-5">
                                                    <span className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-xl text-[10px] font-black tracking-widest text-stone-900 uppercase shadow-sm">
                                                        {ad.tag}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="px-2 space-y-4">
                                                <div>
                                                    <span className="text-[10px] font-black tracking-[0.2em] text-[#4a2008]/70 uppercase mb-2 block">
                                                        {ad.category}
                                                    </span>
                                                    <h4 className="text-2xl font-serif text-stone-900 leading-tight group-hover:text-[#4a2008] transition-colors italic line-clamp-1 pr-1">
                                                        {ad.title}
                                                    </h4>
                                                </div>

                                                <div className="flex items-center justify-between pt-6 border-t border-stone-50">
                                                    <div className="flex items-center gap-3 text-stone-600 group-hover:text-stone-900 transition-colors min-w-0">
                                                        <div className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center font-black text-stone-500 text-[10px] border border-stone-100 group-hover:bg-[#4a2008] group-hover:text-white transition-all shrink-0">
                                                            {ad.initials}
                                                        </div>
                                                        <span className="text-xs font-bold truncate">{ad.user}</span>
                                                    </div>
                                                    <div className="w-10 h-10 rounded-full bg-[#4a2008] flex items-center justify-center text-white opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-xl shrink-0">
                                                        <ArrowRight className="w-5 h-5" />
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Son İlanlar Grid */}
                    <section className="bg-[#f5f1ed] py-12 border-b border-stone-100">
                        <div className="container mx-auto px-6" style={{ maxWidth: gridScale < 1 ? 'none' : undefined }}>
                            <div className="flex flex-row items-center justify-between mb-8 gap-6 text-left">
                                <div>
                                    <h3 className="text-4xl font-serif text-stone-900 mb-2 leading-none">Son İlanlar</h3>
                                    <p className="text-base text-stone-500 font-medium">Platforma en son eklenen takaslık eşyalar.</p>
                                </div>
                                <Link to="/son-ilanlar" className="text-stone-900 font-black text-xs uppercase tracking-[0.2em] flex items-center gap-4 hover:gap-6 transition-all border-b-2 border-stone-900 pb-2">
                                    Hepsini Gör <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
                                {ads.slice(0, 4).map((ad) => (
                                    <Link to={`/ilan/${ad.id}`} key={ad.id} className="group bg-[#fbfaf8] border border-stone-50 rounded-[2.5rem] p-5 transition-all duration-500 hover:shadow-2xl hover:shadow-stone-200/50 hover:-translate-y-2 block">
                                        <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-stone-50 mb-6">
                                            {ad.image ? (
                                                <img src={ad.image} alt={ad.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-stone-100">
                                                    <Box className="w-12 h-12 text-stone-200" />
                                                </div>
                                            )}
                                            <div className="absolute top-5 left-5">
                                                <span className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-xl text-[10px] font-black tracking-widest text-stone-900 uppercase shadow-sm">
                                                    {ad.tag}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="px-2 space-y-4">
                                            <div>
                                                <span className="text-[10px] font-black tracking-[0.2em] text-stone-500 uppercase mb-2 block">
                                                    {ad.category}
                                                </span>
                                                <h4 className="text-2xl font-serif text-stone-900 leading-tight group-hover:text-[#4a2008] transition-colors italic line-clamp-1 pr-1">
                                                    {ad.title}
                                                </h4>
                                            </div>

                                            <div className="flex items-center justify-between pt-6 border-t border-stone-50">
                                                <div className="flex items-center gap-3 text-stone-600 group-hover:text-stone-900 transition-colors min-w-0">
                                                    <div className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center font-black text-stone-500 text-[10px] border border-stone-100 group-hover:bg-stone-900 group-hover:text-white transition-all shrink-0">
                                                        {ad.initials}
                                                    </div>
                                                    <span className="text-xs font-bold truncate">{ad.user}</span>
                                                </div>
                                                <div className="w-10 h-10 rounded-full bg-stone-900 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-xl shrink-0">
                                                    <ArrowRight className="w-5 h-5" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Featured Section */}
                    <section className="bg-stone-50/50 py-12 border-b border-stone-100">
                        <div className="container mx-auto px-6" style={{ maxWidth: gridScale < 1 ? 'none' : undefined }}>
                            <div className="flex flex-row items-center justify-between mb-8 gap-6 text-left">
                                <div>
                                    <h3 className="text-4xl font-serif text-stone-900 mb-2 leading-none">Öne Çıkan İlanlar</h3>
                                    <p className="text-base text-stone-500 font-medium">Haftanın en çok dikkat çeken takas fırsatları.</p>
                                </div>
                                <Link to="/one-cikan-ilanlar" className="text-stone-900 font-black text-xs uppercase tracking-[0.2em] flex items-center gap-4 hover:gap-6 transition-all border-b-2 border-stone-900 pb-2">
                                    TÜM ÖNE ÇIKANLAR <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
                                {featuredAdsData.slice(0, 4).map((ad) => (
                                    <Link to={`/ilan/${ad.id}`} key={ad.id} className="group bg-[#fbfaf8] border border-stone-50 rounded-[2.5rem] p-5 transition-all duration-500 hover:shadow-2xl hover:shadow-stone-200/50 hover:-translate-y-2 block">
                                        <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-stone-50 mb-6">
                                            {ad.image ? (
                                                <img src={ad.image} alt={ad.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-stone-100">
                                                    <Box className="w-12 h-12 text-stone-200" />
                                                </div>
                                            )}
                                            <div className="absolute top-5 left-5">
                                                <span className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-xl text-[10px] font-black tracking-widest text-stone-900 uppercase shadow-sm">
                                                    {ad.tag}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="px-2 space-y-4">
                                            <div>
                                                <span className="text-[10px] font-black tracking-[0.2em] text-stone-500 uppercase mb-2 block">
                                                    {ad.category}
                                                </span>
                                                <h4 className="text-2xl font-serif text-stone-900 leading-tight group-hover:text-[#4a2008] transition-colors italic line-clamp-1 pr-1">
                                                    {ad.title}
                                                </h4>
                                            </div>

                                            <div className="flex items-center justify-between pt-6 border-t border-stone-50">
                                                <div className="flex items-center gap-3 text-stone-600 group-hover:text-stone-900 transition-colors min-w-0">
                                                    <div className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center font-black text-stone-500 text-[10px] border border-stone-100 group-hover:bg-stone-900 group-hover:text-white transition-all shrink-0">
                                                        {ad.initials}
                                                    </div>
                                                    <span className="text-xs font-bold truncate">{ad.user}</span>
                                                </div>
                                                <div className="w-10 h-10 rounded-full bg-stone-900 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-xl shrink-0">
                                                    <ArrowRight className="w-5 h-5" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Popular Grid */}
                    <section className="bg-stone-50/30 py-12 border-b border-stone-100">
                        <div className="container mx-auto px-6" style={{ maxWidth: gridScale < 1 ? 'none' : undefined }}>
                            <div className="flex flex-row items-center justify-between mb-8 gap-6 text-left">
                                <div>
                                    <h3 className="text-4xl font-serif text-stone-900 mb-2 leading-none">Çok İzlenenler</h3>
                                    <p className="text-base text-stone-500 font-medium">Şu an herkesin gözü bu ilanların üzerinde.</p>
                                </div>
                                <Link to="/populer-ilanlar" className="text-stone-900 font-black text-xs uppercase tracking-[0.2em] flex items-center gap-4 hover:gap-6 transition-all border-b-2 border-stone-900 pb-2">
                                    POPÜLER İLANLAR <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
                                {popularAdsData.slice(0, 4).map((ad) => (
                                    <Link to={`/ilan/${ad.id}`} key={ad.id} className="group bg-[#fbfaf8] border border-stone-50 rounded-[2.5rem] p-5 transition-all duration-500 hover:shadow-2xl hover:shadow-stone-200/50 hover:-translate-y-2 block">
                                        <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-stone-50 mb-6">
                                            {ad.image ? (
                                                <img src={ad.image} alt={ad.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-stone-100">
                                                    <Box className="w-12 h-12 text-stone-200" />
                                                </div>
                                            )}
                                            <div className="absolute top-5 left-5">
                                                <span className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-xl text-[10px] font-black tracking-widest text-stone-900 uppercase shadow-sm">
                                                    {ad.tag}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="px-2 space-y-4">
                                            <div>
                                                <span className="text-[10px] font-black tracking-[0.2em] text-stone-400 uppercase mb-2 block">
                                                    {ad.category}
                                                </span>
                                                <h4 className="text-2xl font-serif text-stone-900 leading-tight group-hover:text-[#4a2008] transition-colors italic line-clamp-1 pr-1">
                                                    {ad.title}
                                                </h4>
                                            </div>

                                            <div className="flex items-center justify-between pt-6 border-t border-stone-50">
                                                <div className="flex items-center gap-3 text-stone-500 group-hover:text-stone-900 transition-colors min-w-0">
                                                    <div className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center font-black text-stone-400 text-[10px] border border-stone-100 group-hover:bg-stone-900 group-hover:text-white transition-all shrink-0">
                                                        {ad.initials}
                                                    </div>
                                                    <span className="text-xs font-bold truncate">{ad.user}</span>
                                                </div>
                                                <div className="w-10 h-10 rounded-full bg-stone-900 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-xl shrink-0">
                                                    <ArrowRight className="w-5 h-5" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Call to Action - Modern Dark or Light Section */}
                    <section className="bg-stone-50 py-12 border-t border-stone-100">
                        <div className="container mx-auto px-6 text-center" style={{ maxWidth: gridScale < 1 ? 'none' : undefined }}>
                            <h3 className="text-4xl font-serif text-stone-900 mb-6 max-w-2xl mx-auto">Sıfır parayla hayalindeki eşyaya kavuş.</h3>
                            <button 
                                onClick={() => isAuthenticated ? navigate('/ilan-ver') : openLoginModal()}
                                className="bg-stone-900 text-white px-12 py-6 rounded-2xl font-black text-sm tracking-widest uppercase hover:bg-black transition-all shadow-2xl shadow-black/20"
                            >
                                ŞİMDİ İLAN VER
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

