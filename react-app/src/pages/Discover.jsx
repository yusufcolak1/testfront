import React, { useState, useEffect, useRef } from 'react';
import { Heart, MessageCircle, Zap, Share2, ArrowLeft, X, MapPin, Search as SearchIcon, Filter, Layers, LayoutGrid, Play, Info, Calendar, Clock, Star, Send, ChevronLeft, ChevronRight, Copy, Check, Instagram, Phone as WhatsApp, ChevronDown, Loader2, SlidersHorizontal, Box, Package } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../lib/api';
import { useAuth } from '../contexts/AuthContext';
import { getFullImageUrl } from '../utils/helpers';
const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const TURKEY_CITIES = [
    'Adana', 'Adıyaman', 'Afyonkarahisar', 'Ağrı', 'Amasya', 'Ankara', 'Antalya', 'Artvin', 'Aydın', 'Balıkesir', 'Bilecik', 'Bingöl', 'Bitlis', 'Bolu', 'Burdur', 'Bursa', 'Çanakkale', 'Çankırı', 'Çorum', 'Denizli', 'Diyarbakır', 'Edirne', 'Elazığ', 'Erzincan', 'Erzurum', 'Eskişehir', 'Gaziantep', 'Giresun', 'Gümüşhane', 'Hakkari', 'Hatay', 'Isparta', 'Mersin', 'İstanbul', 'İzmir', 'Kars', 'Kastamonu', 'Kayseri', 'Kırklareli', 'Kırşehir', 'Kocaeli', 'Konya', 'Kütahya', 'Malatya', 'Manisa', 'Kahramanmaraş', 'Mardin', 'Muğla', 'Muş', 'Nevşehir', 'Niğde', 'Ordu', 'Rize', 'Sakarya', 'Samsun', 'Siirt', 'Sinop', 'Sivas', 'Tekirdağ', 'Tokat', 'Trabzon', 'Tunceli', 'Şanlıurfa', 'Uşak', 'Van', 'Yozgat', 'Zonguldak', 'Aksaray', 'Bayburt', 'Karaman', 'Kırıkkale', 'Batman', 'Şırnak', 'Bartın', 'Ardahan', 'Iğdır', 'Yalova', 'Karabük', 'Kilis', 'Osmaniye', 'Düzce'
].sort();

const fullImg = (u) => getFullImageUrl(u);

export default function Discover() {
    const navigate = useNavigate();
    const [discoverAds, setDiscoverAds] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterMode, setFilterMode] = useState('trends'); // 'trends' or 'nearby'
    const [filters, setFilters] = useState({ city: 'Tümü', categoryId: '', condition: 'Tümü', search: '' });
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [loadingLikeIds, setLoadingLikeIds] = useState(new Set());
    const { user, isAuthenticated, openLoginModal } = useAuth();

    useEffect(() => {
        api.getCategories().then(r => setCategories(r.data || [])).catch(console.error);
    }, []);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                setLoading(true);
                let params = { limit: 30, sort: 'newest' };
                
                if (filterMode === 'nearby') {
                    const userCity = user?.profile?.city;
                    if (userCity) params.city = userCity;
                }

                if (filters.city !== 'Tümü') params.city = filters.city;
                if (filters.categoryId) params.categoryId = filters.categoryId;
                if (filters.condition !== 'Tümü') params.condition = filters.condition;
                if (filters.search) params.search = filters.search;

                const r = await api.getItems(params);
                if (cancelled) return;
                const items = r.data?.items || r.data || [];
                setDiscoverAds(items.map((it) => {
                    const imgs = it.images?.length ? it.images.map((im) => fullImg(im.imageUrl)) : [fullImg(null)];
                    const uname = it.user?.profile ? `${it.user.profile.firstName} ${(it.user.profile.lastName || '').charAt(0)}.` : 'Kullanıcı';
                    return {
                        id: it.id,
                        title: it.title,
                        user: uname,
                        userId: it.user?.id,
                        location: it.location || '—',
                        images: imgs,
                        likes: it._count?.favorites || 0,
                        isLiked: it.isFavorited || false,
                        description: it.description || '',
                        swapFor: it.swapFor || 'Mantıklı tekliflere açık',
                        date: new Date(it.createdAt).toLocaleDateString('tr-TR'),
                        comments: [],
                    };
                }));
            } catch (e) { console.error(e); }
            finally { if (!cancelled) setLoading(false); }
        })();
        return () => { cancelled = true; };
    }, [filterMode, user, filters]);

    const handleFilterModeChange = (mode) => {
        if (mode === 'nearby' && !isAuthenticated) {
            openLoginModal();
            return;
        }
        setFilterMode(mode);
    };

    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'feed'
    const [isCommentsOpen, setIsCommentsOpen] = useState(false);
    const [activeAdComments, setActiveAdComments] = useState([]);
    const [commentText, setCommentText] = useState('');
    const [isSubmittingComment, setIsSubmittingComment] = useState(false);
    const [sharingAdId, setSharingAdId] = useState(null); // Tracks which ad's share menu is open
    const [copySuccess, setCopySuccess] = useState(false);
    const [activeImageIndices, setActiveImageIndices] = useState({}); // Stores current image index per ad {adId: index}
    const [showHint, setShowHint] = useState(false);
    const [hasSeenHint, setHasSeenHint] = useState(false);
    const [lastOpenedAdId, setLastOpenedAdId] = useState(null);
    const [isPeeking, setIsPeeking] = useState(false);
    const scrollContainerRef = useRef(null);
    const adRefs = useRef({});


    const openFeed = (id) => {
        setViewMode('feed');
        setLastOpenedAdId(id);
        setTimeout(() => {
            const element = adRefs.current[id];
            if (element) {
                element.scrollIntoView({ behavior: 'auto', block: 'start' });
            }
        }, 50);
    };

    const closeFeed = () => {
        setViewMode('grid');
        setIsCommentsOpen(false);
        setSharingAdId(null);
        setHasSeenHint(false);
    };

    // BODY SCROLL LOCK - PREVENT SCROLLBAR IN FEED MODE
    useEffect(() => {
        if (viewMode === 'feed') {
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = '10px'; // Prevent layout shift
        } else {
            document.body.style.overflow = 'unset';
            document.body.style.paddingRight = '0px';
        }
        return () => {
            document.body.style.overflow = 'unset';
            document.body.style.paddingRight = '0px';
        };
    }, [viewMode]);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(`https://takason.com.tr/ilan/${sharingAdId}`);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
    };

    const toggleLike = async (adId) => {
        if (!isAuthenticated) return openLoginModal();
        if (loadingLikeIds.has(adId)) return; // Kilitliyse işlem yapma

        try {
            setLoadingLikeIds(prev => new Set(prev).add(adId));
            const r = await api.toggleFavorite(adId);
            const isFav = !!r.data?.isFavorited;
            setDiscoverAds(prev => prev.map(ad => 
                ad.id === adId ? { 
                    ...ad, 
                    isLiked: isFav, 
                    likes: isFav ? Math.max(0, ad.likes + 1) : Math.max(0, ad.likes - 1) 
                } : ad
            ));
        } catch (err) { 
            console.error(err); 
        } finally {
            setLoadingLikeIds(prev => {
                const next = new Set(prev);
                next.delete(adId);
                return next;
            });
        }
    };

    const fetchComments = async (adId) => {
        try {
            const r = await api.getItemComments(adId);
            setActiveAdComments(r.data?.comments || []);
        } catch (err) { console.error(err); }
    };

    const handleAddComment = async (adId) => {
        if (!isAuthenticated) return openLoginModal();
        if (!commentText.trim()) return;
        try {
            setIsSubmittingComment(true);
            const r = await api.addComment(adId, commentText);
            setActiveAdComments(prev => [r.data.comment, ...prev]);
            setCommentText('');
        } catch (err) { alert(err.message); }
        finally { setIsSubmittingComment(false); }
    };

    useEffect(() => {
        if (isCommentsOpen && lastOpenedAdId) {
            fetchComments(lastOpenedAdId);
        }
    }, [isCommentsOpen, lastOpenedAdId]);

    const handleHorizontalScroll = (adId, e) => {
        const scrollLeft = e.target.scrollLeft;
        const width = e.target.clientWidth;
        if (width === 0) return;
        const index = Math.round(scrollLeft / width);
        setActiveImageIndices(prev => ({ ...prev, [adId]: index }));
    };

    // SCROLL HINT EFFECT (PEEK)
    useEffect(() => {
        let timeout;
        if (viewMode === 'feed' && !hasSeenHint && lastOpenedAdId) {
            timeout = setTimeout(() => {
                setShowHint(true);
                setIsPeeking(true); // This will trigger the useEffect below
            }, 2500);
        }
        return () => clearTimeout(timeout);
    }, [viewMode, hasSeenHint, lastOpenedAdId]);

    // Perform the peek once snapping is disabled
    useEffect(() => {
        if (isPeeking && scrollContainerRef.current) {
            const container = scrollContainerRef.current;

            // Short delay to ensure DOM has updated and snap is disabled
            const peekTimer = setTimeout(() => {
                const peekAmount = window.innerHeight * 0.20; // 20% is subtler
                container.scrollBy({ top: peekAmount, behavior: 'smooth' });

                setTimeout(() => {
                    const element = adRefs.current[lastOpenedAdId];
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }

                    setTimeout(() => {
                        setIsPeeking(false);
                        setShowHint(false);
                        setHasSeenHint(true);
                    }, 1000);
                }, 1200);
            }, 100);

            return () => clearTimeout(peekTimer);
        }
    }, [isPeeking, lastOpenedAdId]);

    return (
        <div className="min-h-screen bg-[#f5f1ed]">
            {/* Filter Drawer */}
            <div className={`fixed inset-0 z-[5000] transition-all duration-500 ${isFilterOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-md" onClick={() => setIsFilterOpen(false)}></div>
                <div className={`absolute top-0 left-0 right-0 bg-white shadow-2xl rounded-b-[2rem] md:rounded-b-[4rem] transition-transform duration-700 ease-out border-b border-stone-100 ${isFilterOpen ? 'translate-y-0' : '-translate-y-full'}`}>
                    <div className="container mx-auto max-w-7xl pt-8 md:pt-14 pb-8 md:pb-12 px-6 md:px-12">
                        <div className="flex items-center justify-between mb-8 md:mb-12 pb-6 border-b border-stone-50">
                            <div className="flex items-center gap-3 md:gap-4">
                                <div className="w-10 h-10 md:w-12 md:h-12 bg-amber-500 rounded-xl md:rounded-2xl flex items-center justify-center text-stone-900 shadow-lg">
                                    <SlidersHorizontal className="w-5 h-5 md:w-6 md:h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl md:text-3xl font-serif font-black italic text-stone-900 uppercase tracking-tighter leading-none">Keşfet Filtreleri</h3>
                                    <p className="text-[10px] md:text-xs text-stone-400 font-black uppercase tracking-widest mt-1">İstediğin ürüne daha hızlı ulaş.</p>
                                </div>
                            </div>
                            <button onClick={() => setIsFilterOpen(false)} className="w-10 h-10 md:w-14 md:h-14 bg-stone-50 text-stone-500 rounded-xl md:rounded-2xl flex items-center justify-center hover:bg-stone-900 hover:text-white transition-all active:scale-90">
                                <X className="w-5 h-5 md:w-6 md:h-6" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                            {/* Search */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 opacity-40">
                                    <SearchIcon className="w-4 h-4" />
                                    <span className="text-[8px] md:text-[9px] font-black tracking-[0.2em] uppercase">KELİME İLE ARA</span>
                                </div>
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        value={filters.search}
                                        onChange={(e) => setFilters(p => ({ ...p, search: e.target.value }))}
                                        placeholder="iPhone, Kitap, Araba..."
                                        className="w-full bg-stone-50 border-2 border-transparent focus:border-stone-900 px-5 py-4 rounded-2xl outline-none font-serif italic text-sm transition-all"
                                    />
                                </div>
                            </div>

                            {/* City */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 opacity-40">
                                    <MapPin className="w-4 h-4" />
                                    <span className="text-[8px] md:text-[9px] font-black tracking-[0.2em] uppercase">KONUM SEÇ</span>
                                </div>
                                <select 
                                    value={filters.city}
                                    onChange={(e) => setFilters(p => ({ ...p, city: e.target.value }))}
                                    className="w-full bg-stone-50 border-2 border-transparent focus:border-stone-900 px-5 py-4 rounded-2xl outline-none font-serif italic text-sm transition-all appearance-none"
                                >
                                    <option value="Tümü">Tüm Türkiye</option>
                                    {TURKEY_CITIES.map(city => <option key={city} value={city}>{city}</option>)}
                                </select>
                            </div>

                            {/* Category */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 opacity-40">
                                    <LayoutGrid className="w-4 h-4" />
                                    <span className="text-[8px] md:text-[9px] font-black tracking-[0.2em] uppercase">KATEGORİ</span>
                                </div>
                                <select 
                                    value={filters.categoryId}
                                    onChange={(e) => setFilters(p => ({ ...p, categoryId: e.target.value }))}
                                    className="w-full bg-stone-50 border-2 border-transparent focus:border-stone-900 px-5 py-4 rounded-2xl outline-none font-serif italic text-sm transition-all appearance-none"
                                >
                                    <option value="">Tüm Kategoriler</option>
                                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>
                            </div>

                            {/* Condition */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 opacity-40">
                                    <Box className="w-4 h-4" />
                                    <span className="text-[8px] md:text-[9px] font-black tracking-[0.2em] uppercase">ÜRÜN DURUMU</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {['Tümü', 'NEW', 'LIKE_NEW', 'GOOD', 'FAIR'].map(cond => (
                                        <button
                                            key={cond}
                                            onClick={() => setFilters(p => ({ ...p, condition: cond }))}
                                            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border-2 ${filters.condition === cond ? 'bg-stone-900 border-stone-900 text-amber-400' : 'bg-stone-50 border-transparent text-stone-400 hover:bg-stone-100'}`}
                                        >
                                            {cond === 'Tümü' ? 'HEPSİ' : cond.replace('_', ' ')}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 md:mt-16 pt-8 border-t border-stone-50 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                <span className="text-[8px] md:text-[9px] font-black text-stone-400 uppercase tracking-widest">Canlı Filtreleme Aktif</span>
                            </div>
                            <div className="flex items-center gap-4 w-full md:w-auto">
                                <button 
                                    onClick={() => setFilters({ city: 'Tümü', categoryId: '', condition: 'Tümü', search: '' })}
                                    className="px-8 py-4 text-stone-400 hover:text-stone-900 font-black text-[10px] tracking-widest uppercase transition-all"
                                >
                                    Sıfırla
                                </button>
                                <button 
                                    onClick={() => setIsFilterOpen(false)}
                                    className="flex-1 md:flex-none px-12 py-5 bg-stone-900 text-amber-400 rounded-2xl font-black text-[11px] tracking-widest uppercase shadow-2xl hover:scale-105 active:scale-95 transition-all"
                                >
                                    Filtreleri Uygula
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* GRID VIEW */}
            {viewMode === 'grid' && (
                <div className="w-full">
                    <div className="container mx-auto px-4 sm:px-6 py-6 md:py-10 max-w-7xl animate-in fade-in duration-700">
                        <div className="flex flex-col md:flex-row items-center justify-between mb-6 md:mb-12 gap-4 md:gap-8 border-b border-stone-200 pb-6 md:pb-10">
                            <div className="space-y-1 md:space-y-2 text-center md:text-left">
                                <h1 className="text-2xl md:text-5xl font-serif font-black text-stone-900 italic tracking-tighter leading-tight">Keşfet <span style={{ color: '#4a2008' }}>Dünyası</span></h1>
                                <p className="text-stone-500 font-serif italic text-xs md:text-lg font-medium">Takasın yeni nesil, akışkan hali.</p>
                            </div>
                            <div className="flex items-center gap-2 md:gap-4 bg-white p-1.5 md:p-2 rounded-xl md:rounded-2xl shadow-xl shadow-stone-900/5">
                                <button 
                                    onClick={() => setIsFilterOpen(true)}
                                    className="px-3 py-2 md:px-6 md:py-3 rounded-lg md:rounded-xl font-black text-[9px] md:text-[10px] tracking-widest uppercase flex items-center gap-1.5 md:gap-2 transition-all bg-white border border-stone-100 text-stone-500 hover:border-stone-900 hover:text-stone-900"
                                >
                                    <Filter className="w-3.5 h-3.5 md:w-4 md:h-4" /> FİLTRELE
                                </button>
                                <div className="w-px h-6 bg-stone-100 hidden md:block" />
                                <button 
                                    onClick={() => handleFilterModeChange('trends')}
                                    className={`px-3 py-2 md:px-6 md:py-3 rounded-lg md:rounded-xl font-black text-[9px] md:text-[10px] tracking-widest uppercase flex items-center gap-1.5 md:gap-2 transition-all ${filterMode === 'trends' ? 'bg-stone-900 text-amber-400' : 'text-stone-500 hover:text-stone-900'}`}
                                >
                                    <LayoutGrid className="w-3.5 h-3.5 md:w-4 md:h-4" /> TRENDLER
                                </button>
                                <button 
                                    onClick={() => handleFilterModeChange('nearby')}
                                    className={`px-3 py-2 md:px-6 md:py-3 rounded-lg md:rounded-xl font-black text-[9px] md:text-[10px] tracking-widest uppercase transition-all ${filterMode === 'nearby' ? 'bg-stone-900 text-amber-400' : 'text-stone-500 hover:text-stone-900'}`}
                                >
                                    YAKIN
                                </button>
                            </div>
                        </div>

                        {loading ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
                                {Array.from({ length: 10 }).map((_, i) => (
                                    <div key={i} className="aspect-[3/4] rounded-2xl md:rounded-[2.5rem] bg-stone-200 animate-pulse" />
                                ))}
                            </div>
                        ) : discoverAds.length === 0 ? (
                            <div className="text-center py-20 text-stone-400 font-serif italic">
                                <LayoutGrid className="w-12 h-12 mx-auto mb-4 opacity-30" />
                                <p>Henüz ilan bulunamadı.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
                                {discoverAds.map((ad) => (
                                    <div
                                        key={ad.id}
                                        onClick={() => openFeed(ad.id)}
                                        className="group relative aspect-[3/4] rounded-2xl md:rounded-[2.5rem] overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                                    >
                                        <img src={ad.images[0]} alt={ad.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        <div className="absolute bottom-3 md:bottom-6 left-3 md:left-6 right-3 md:right-6 translate-y-0 md:translate-y-4 group-hover:translate-y-0 transition-transform duration-500 opacity-100 md:opacity-0 group-hover:opacity-100 flex items-end justify-between text-white text-[9px] md:text-xs font-bold uppercase italic">
                                            <div className="space-y-0.5 md:space-y-1 max-w-[70%]">
                                                <h3 className="font-serif italic font-bold leading-tight truncate">{ad.title}</h3>
                                                <p className="text-amber-400 text-[7px] md:text-[8px] tracking-widest">{ad.location}</p>
                                            </div>
                                            <div className="w-6 h-6 md:w-8 md:h-8 bg-amber-500 rounded-full flex items-center justify-center text-stone-900 shadow-xl group-hover:scale-110 transition-transform shrink-0">
                                                <Play className="w-2.5 h-2.5 md:w-3 md:h-3 fill-stone-900" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* FEED VIEW (Reels Mode) */}
            {viewMode === 'feed' && (
                <div className="fixed inset-0 z-[10050] bg-black overflow-hidden select-none h-full w-full h-screen-safe">
                    {/* Top Controls */}
                    <div className="absolute top-4 left-4 md:top-8 md:left-8 z-[2100] pt-safe">
                        <button
                            onClick={closeFeed}
                            className="p-2.5 md:p-4 bg-white/10 backdrop-blur-xl border border-white/10 text-white rounded-xl md:rounded-2xl hover:bg-white hover:text-black transition-all group flex items-center gap-2 md:gap-3"
                        >
                            <ArrowLeft className="w-4 h-4 md:w-6 md:h-6 group-hover:-translate-x-1 transition-transform" />
                            <span className="text-[9px] md:text-[10px] font-black tracking-widest uppercase italic font-serif">KAPAT</span>
                        </button>
                    </div>

                    {/* Vertical Swiper Container */}
                    <div
                        ref={scrollContainerRef}
                        className={`h-full w-full overflow-y-scroll overflow-x-hidden no-scrollbar ${isPeeking ? '' : 'snap-y snap-mandatory'}`}
                        style={{ scrollBehavior: 'auto', scrollSnapType: isPeeking ? 'none' : 'y mandatory' }}
                    >
                        {discoverAds.map((ad) => {
                            const currentImgIndex = activeImageIndices[ad.id] || 0;
                            return (
                                <div
                                    key={ad.id}
                                    ref={el => adRefs.current[ad.id] = el}
                                    className="h-screen-safe w-full snap-start snap-always relative flex flex-col overflow-hidden shrink-0"
                                >
                                    <img src={ad.images[currentImgIndex]} alt="" className="absolute inset-0 w-full h-full object-cover blur-[100px] opacity-35 scale-110 transition-all duration-700 pointer-events-none" />
                                    <div className="absolute inset-0 bg-black/50 pointer-events-none"></div>

                                    <div className="container mx-auto max-w-7xl flex-1 min-h-0 flex items-stretch justify-center gap-12 relative px-2 sm:px-4 z-20 py-2 md:py-0">

                                        {/* LEFT PANEL */}
                                        <div className="hidden lg:flex flex-col w-80 space-y-8 animate-in slide-in-from-left-5 duration-700">
                                            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-8 rounded-[3rem] space-y-8">
                                                <div className="space-y-2">
                                                    <h3 className="text-white font-serif italic text-2xl font-black">İlan <span style={{ color: '#FFF8E7' }}>Detayları</span></h3>
                                                    <p className="text-stone-300 text-[10px] font-black uppercase tracking-widest">{ad.location}</p>
                                                </div>
                                                <div className="space-y-6">
                                                    <div className="flex items-center gap-4 text-stone-300 font-serif italic">
                                                        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center"><Calendar className="w-5 h-5 text-amber-500" /></div>
                                                        <div>
                                                            <p className="text-[9px] font-black text-stone-300 uppercase tracking-widest not-italic">GÖRSEL</p>
                                                            <p className="font-bold">{currentImgIndex + 1} / {ad.images.length}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-4 text-stone-300 font-serif italic">
                                                        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center"><Zap className="w-5 h-5 text-amber-500" /></div>
                                                        <div>
                                                            <p className="text-[9px] font-black text-stone-300 uppercase tracking-widest not-italic">TAKAS TERCİHİ</p>
                                                            <p className="font-bold text-amber-50">{ad.swapFor}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="pt-6 border-t border-white/10">
                                                    <p className="text-xs text-stone-400 font-serif italic leading-relaxed">"{ad.description}"</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* CENTER: REELS MAIN FRAME */}
                                        <div className="relative flex-1 min-h-0 w-full max-w-[500px] mx-auto md:aspect-[9/16] md:max-h-[900px] md:h-auto md:flex-none bg-stone-900 shadow-[0_0_120px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col md:rounded-[4rem] group border border-stone-800 md:border-white/5 animate-in zoom-in-95 duration-500">

                                            {/* Share Overlay */}
                                            {sharingAdId === ad.id && (
                                                <div className="absolute inset-0 z-[2200] bg-black/60 backdrop-blur-xl animate-in fade-in duration-300 flex flex-col items-center justify-center p-6 md:p-8 pointer-events-auto">
                                                    <button onClick={() => setSharingAdId(null)} className="absolute top-6 md:top-8 right-6 md:right-8 text-white/40 hover:text-white transition-colors">
                                                        <X className="w-6 h-6 md:w-8 md:h-8" />
                                                    </button>
                                                    <div className="space-y-1 md:space-y-2 text-center mb-8 md:mb-12">
                                                        <h3 className="text-2xl md:text-3xl font-serif italic font-black text-white leading-tight">İlanı <span style={{ color: '#4a2008' }}>Paylaş</span></h3>
                                                        <p className="text-stone-400 text-[8px] md:text-[10px] font-black uppercase tracking-widest">Arkadaşlarına uçur!</p>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4 md:gap-6 w-full">
                                                        <button className="flex flex-col items-center gap-2 md:gap-3 bg-white/5 hover:bg-white/10 border border-white/10 p-4 md:p-6 rounded-2xl md:rounded-[2rem] transition-all group shrink-0">
                                                            <div className="w-10 h-10 md:w-14 md:h-14 bg-green-500/20 rounded-xl md:rounded-2xl flex items-center justify-center text-green-500 group-hover:scale-110 transition-transform"><WhatsApp className="w-5 h-5 md:w-7 md:h-7" /></div>
                                                            <span className="text-[8px] md:text-[10px] font-black text-white/60 tracking-widest leading-none">WHATSAPP</span>
                                                        </button>
                                                        <button className="flex flex-col items-center gap-2 md:gap-3 bg-white/5 hover:bg-white/10 border border-white/10 p-4 md:p-6 rounded-2xl md:rounded-[2rem] transition-all group shrink-0">
                                                            <div className="w-10 h-10 md:w-14 md:h-14 bg-pink-500/20 rounded-xl md:rounded-2xl flex items-center justify-center text-pink-500 group-hover:scale-110 transition-transform"><Instagram className="w-5 h-5 md:w-7 md:h-7" /></div>
                                                            <span className="text-[8px] md:text-[10px] font-black text-white/60 tracking-widest leading-none">INSTAGRAM</span>
                                                        </button>
                                                        <button
                                                            onClick={handleCopyLink}
                                                            className="col-span-2 flex items-center justify-between bg-amber-500 hover:bg-white border border-transparent p-4 md:p-6 rounded-2xl md:rounded-[2rem] transition-all group overflow-hidden relative"
                                                        >
                                                            <div className="flex items-center gap-3 md:gap-4">
                                                                <div className="w-8 h-8 md:w-12 md:h-12 bg-stone-900/10 rounded-lg md:rounded-xl flex items-center justify-center text-stone-900"><Copy className="w-4 h-4 md:w-6 md:h-6" /></div>
                                                                <span className="text-[10px] md:text-xs font-black text-stone-900 tracking-widest">BAĞLANTIYI KOPYALA</span>
                                                            </div>
                                                            {copySuccess && <Check className="w-5 h-5 md:w-6 md:h-6 text-stone-900 animate-in zoom-in" />}
                                                            {copySuccess && <div className="absolute inset-0 bg-green-500 flex items-center justify-center text-white font-black text-[9px] md:text-[10px] tracking-widest animate-in slide-in-from-bottom duration-300 uppercase">KOPYALANDI!</div>}
                                                        </button>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Mobile Comments Bottom Sheet Overlay */}
                                            {isCommentsOpen && lastOpenedAdId === ad.id && (
                                                <div className="lg:hidden absolute inset-x-0 bottom-0 top-[20%] z-[2200] flex flex-col bg-stone-900 rounded-t-[2rem] shadow-[0_-20px_50px_rgba(0,0,0,0.5)] animate-in slide-in-from-bottom duration-300">
                                                    <div className="flex items-center justify-between p-5 border-b border-white/5">
                                                        <div className="flex items-center gap-3">
                                                            <MessageCircle className="w-5 h-5 text-amber-500" />
                                                            <h3 className="text-white font-serif italic text-lg font-black">Yorumlar <span className="text-white/50">({activeAdComments.length})</span></h3>
                                                        </div>
                                                        <button onClick={() => setIsCommentsOpen(false)} className="w-8 h-8 flex items-center justify-center bg-white/5 rounded-full text-white/50 hover:text-white transition-colors">
                                                            <X className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                    <div className="flex-1 overflow-y-auto p-5 space-y-4 no-scrollbar">
                                                        {activeAdComments.length > 0 ? activeAdComments.map((comm, idx) => (
                                                            <div key={idx} className="space-y-1.5 animate-in slide-in-from-bottom-2 duration-300">
                                                                <div className="flex items-center justify-between pl-1">
                                                                    <span className="text-amber-500 font-black text-[9px] tracking-widest uppercase">@{comm.user?.profile?.firstName?.toLowerCase() || 'kullanici'}</span>
                                                                    <span className="text-[9px] text-stone-600 font-medium italic font-serif">{new Date(comm.createdAt).toLocaleDateString('tr-TR')}</span>
                                                                </div>
                                                                <p className="text-white text-[11px] font-serif italic leading-relaxed bg-white/5 p-3.5 rounded-xl border border-white/5 select-text">"{comm.content}"</p>
                                                            </div>
                                                        )) : (
                                                            <div className="h-full flex flex-col items-center justify-center text-center space-y-3 opacity-30">
                                                                <MessageCircle className="w-8 h-8" />
                                                                <p className="text-[10px] text-stone-500 font-serif italic">Henüz yorum yok.</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="p-4 border-t border-white/5 bg-stone-900/90 backdrop-blur-xl">
                                                        <form className="relative group" onSubmit={(e) => { e.preventDefault(); handleAddComment(ad.id); }}>
                                                            <input 
                                                                type="text" 
                                                                value={commentText}
                                                                onChange={(e) => setCommentText(e.target.value)}
                                                                placeholder="Görüşünü paylaş..." 
                                                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-white font-serif italic text-xs outline-none focus:border-amber-500/50 transition-all font-bold focus:bg-white/10" 
                                                            />
                                                            <button 
                                                                disabled={isSubmittingComment}
                                                                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center text-stone-900 shadow-xl active:scale-95 transition-all disabled:opacity-50"
                                                            >
                                                                {isSubmittingComment ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                                                            </button>
                                                        </form>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Görsel alanı — mobilde tam fotoğraf, tablette/desktop'ta cover */}
                                            <div className="relative flex-1 min-h-0 w-full overflow-hidden">
                                                {ad.images.length > 1 ? (
                                                    /* Birden fazla fotoğraf: yatay kaydırmalı galeri */
                                                    <div
                                                        className="absolute inset-0 flex overflow-x-scroll snap-x snap-mandatory no-scrollbar"
                                                        onScroll={(e) => handleHorizontalScroll(ad.id, e)}
                                                    >
                                                        {ad.images.map((img, i) => (
                                                            <div key={i} className="min-w-full h-full snap-start shrink-0 flex items-center justify-center bg-stone-950">
                                                                <img
                                                                    src={img}
                                                                    alt=""
                                                                    className="w-full h-full object-contain lg:object-cover"
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    /* Tek fotoğraf: kaydırma yok, tam genişlik ortalı */
                                                    <div className="absolute inset-0 flex items-center justify-center bg-stone-950">
                                                        <img
                                                            src={ad.images[0]}
                                                            alt=""
                                                            className="w-full h-full object-contain lg:object-cover"
                                                        />
                                                    </div>
                                                )}
                                                {/* Nokta göstergesi: sadece birden fazla fotoğrafta */}
                                                {ad.images.length > 1 && (
                                                    <div className="absolute top-3 md:top-24 left-1/2 -translate-x-1/2 flex gap-1.5 z-[2100] pt-safe">
                                                        {ad.images.map((_, i) => (
                                                            <div key={i} className={`h-1 rounded-full transition-all duration-300 ${i === currentImgIndex ? 'w-4 md:w-6 bg-amber-500' : 'w-1 md:w-1.5 bg-white/30'}`} />
                                                        ))}
                                                    </div>
                                                )}
                                                <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/50 to-transparent md:from-black/30" />
                                            </div>

                                            {/* Sağ aksiyonlar — mobilde ortada, masaüstünde altta */}
                                            <div className="absolute right-3 sm:right-4 top-[38%] -translate-y-1/2 z-30 flex flex-col gap-3 sm:gap-4 items-center pointer-events-auto md:top-auto md:translate-y-0 md:bottom-40 md:right-8 md:gap-6">
                                                    <div className="flex flex-col items-center gap-1">
                                                        <button 
                                                            onClick={() => toggleLike(ad.id)}
                                                            className={`w-11 h-11 md:w-14 md:h-14 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center transition-all group active:scale-90 ${ad.isLiked ? 'bg-red-500 text-white border-red-500' : 'bg-white/10 text-white hover:bg-red-500'}`}
                                                        >
                                                            <Heart className={`w-4 h-4 md:w-6 md:h-6 ${ad.isLiked ? 'fill-current' : 'group-hover:fill-current'}`} />
                                                        </button>
                                                        <span className="text-[8px] md:text-[10px] font-black text-white/80">{ad.likes}</span>
                                                    </div>
                                                    <button
                                                        onClick={() => {
                                                            setLastOpenedAdId(ad.id);
                                                            setIsCommentsOpen(!isCommentsOpen);
                                                        }}
                                                        className={`w-11 h-11 md:w-14 md:h-14 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white transition-all ${isCommentsOpen && lastOpenedAdId === ad.id ? 'bg-amber-500 text-stone-900 rotate-90 scale-110' : 'bg-white/10 hover:bg-stone-800'}`}
                                                    >
                                                        <MessageCircle className="w-4 h-4 md:w-6 md:h-6" />
                                                    </button>
                                                    <button
                                                        onClick={() => setSharingAdId(ad.id)}
                                                        className="w-11 h-11 md:w-14 md:h-14 bg-white/10 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-stone-800 transition-all hover:scale-110"
                                                    >
                                                        <Share2 className="w-4 h-4 md:w-6 md:h-6" />
                                                    </button>
                                                    {/* NEW: Info button for mobile */}
                                                    <button
                                                        onClick={(e) => {
                                                            const infoPanel = e.currentTarget.nextSibling;
                                                            infoPanel.classList.toggle('hidden');
                                                        }}
                                                        className="lg:hidden w-11 h-11 bg-white/10 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-stone-800 transition-all"
                                                    >
                                                        <Info className="w-4 h-4" />
                                                    </button>
                                                    <div className="hidden absolute bottom-full right-0 mb-4 w-[280px] md:w-64 bg-black/80 backdrop-blur-2xl border border-white/10 p-4 md:p-6 rounded-2xl md:rounded-[2rem] space-y-3 md:space-y-4 animate-in fade-in slide-in-from-bottom-5 z-[2300]">
                                                        <div className="space-y-0.5 md:space-y-1">
                                                            <p className="text-[8px] md:text-[9px] font-black text-amber-500 uppercase tracking-widest">TAKAS TERCİHİ</p>
                                                            <p className="text-white text-[10px] md:text-xs font-bold leading-tight">{ad.swapFor}</p>
                                                        </div>
                                                        <div className="pt-2 md:pt-3 border-t border-white/10">
                                                            <p className="text-[9px] md:text-[10px] text-stone-400 font-serif italic leading-relaxed">"{ad.description}"</p>
                                                        </div>
                                                    </div>
                                                </div>

                                            {/* Alt bilgi paneli — her zaman görünür (mobil/tablet) */}
                                            <div className="relative z-20 shrink-0 w-full bg-gradient-to-t from-black via-black/95 to-black/70 px-4 pt-4 pb-safe sm:px-5 sm:pt-5 lg:absolute lg:inset-x-0 lg:bottom-0 lg:px-8 lg:pt-10 lg:pb-12 lg:bg-gradient-to-t lg:from-black/95 lg:via-black/60 lg:to-transparent pointer-events-auto">
                                                <div className="hidden lg:flex absolute top-8 left-8 items-center gap-3">
                                                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-amber-500 flex items-center justify-center text-stone-900 font-black italic shadow-2xl text-sm leading-none">{ad.user[0]}</div>
                                                    <div className="space-y-0.5 min-w-0">
                                                        <h4 className="text-white font-bold text-xs md:text-sm leading-none truncate max-w-[140px]">{ad.user}</h4>
                                                        <div className="flex items-center gap-1.5 text-stone-300">
                                                            <MapPin className="w-2.5 h-2.5 text-amber-500 shrink-0" />
                                                            <span className="text-[8px] md:text-[9px] font-black tracking-widest uppercase truncate max-w-[120px]">{ad.location}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="space-y-3 lg:space-y-6 pr-14 sm:pr-16 lg:pr-0">
                                                    <div className="flex lg:hidden items-center gap-2 min-w-0">
                                                        <div className="w-7 h-7 rounded-full bg-amber-500 flex items-center justify-center text-stone-900 font-black italic shadow-md text-[10px] leading-none shrink-0">{ad.user[0]}</div>
                                                        <h4 className="text-white font-bold text-xs leading-none truncate min-w-0">{ad.user}</h4>
                                                        <div className="w-1 h-1 rounded-full bg-white/30 shrink-0" />
                                                        <div className="flex items-center gap-1 min-w-0">
                                                            <MapPin className="w-2.5 h-2.5 text-amber-500 shrink-0" />
                                                            <span className="text-[9px] font-medium text-white/60 truncate">{ad.location}</span>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-1 md:space-y-2">
                                                        <h2 className="text-lg sm:text-xl md:text-3xl font-serif font-black text-white italic tracking-tighter leading-snug line-clamp-2">{ad.title}</h2>
                                                    </div>
                                                    <div className="flex items-center pt-0.5 md:pt-2">
                                                        <Link
                                                            to={`/teklif-ver/${ad.id}`}
                                                            className="w-full bg-amber-500 text-stone-900 py-3 sm:py-3.5 md:py-5 rounded-xl md:rounded-2xl font-black text-[9px] md:text-[10px] tracking-widest uppercase hover:bg-stone-900 hover:text-amber-500 transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-2 md:gap-3 shrink-0 leading-none"
                                                        >
                                                            <Zap className="w-3.5 h-3.5 md:w-5 md:h-5 fill-current shrink-0" /> TEKLİF VER
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* RIGHT PANEL: COMMENTS */}
                                        <div className={`hidden lg:flex flex-col w-80 h-[600px] transition-all duration-700 shrink-0 ${isCommentsOpen && lastOpenedAdId === ad.id ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-10 scale-95 pointer-events-none'}`}>
                                            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-8 rounded-[3rem] h-full flex flex-col">
                                                <div className="flex items-center justify-between mb-8">
                                                    <h3 className="text-white font-serif italic text-2xl font-black">Yorumlar <span style={{ color: '#FFF8E7' }}>({activeAdComments.length})</span></h3>
                                                    <MessageCircle className="w-6 h-6 text-amber-500" />
                                                </div>
                                                <div className="flex-1 overflow-y-auto space-y-6 pr-2 no-scrollbar">
                                                    {activeAdComments.length > 0 ? activeAdComments.map((comm, idx) => (
                                                        <div key={idx} className="space-y-2 animate-in slide-in-from-bottom-2 duration-300">
                                                            <div className="flex items-center justify-between pl-1">
                                                                <span className="text-amber-500 font-black text-[9px] tracking-widest uppercase">@{comm.user?.profile?.firstName?.toLowerCase() || 'kullanici'}</span>
                                                                <span className="text-[9px] text-stone-600 font-medium italic font-serif">{new Date(comm.createdAt).toLocaleDateString('tr-TR')}</span>
                                                            </div>
                                                            <p className="text-white text-xs font-serif italic leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5">"{comm.content}"</p>
                                                        </div>
                                                    )) : (
                                                        <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-30">
                                                            <MessageCircle className="w-10 h-10" />
                                                            <p className="text-[10px] text-stone-500 font-serif italic">Yorum yok.</p>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="mt-8 pt-6 border-t border-white/10">
                                                    <form className="relative group" onSubmit={(e) => { e.preventDefault(); handleAddComment(ad.id); }}>
                                                        <input 
                                                            type="text" 
                                                            value={commentText}
                                                            onChange={(e) => setCommentText(e.target.value)}
                                                            placeholder="Görüşünü paylaş..." 
                                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-5 pr-12 text-white font-serif italic text-xs outline-none focus:border-amber-500/50 transition-all font-bold" 
                                                        />
                                                        <button 
                                                            disabled={isSubmittingComment}
                                                            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center text-stone-900 shadow-xl hover:scale-110 active:scale-90 transition-all disabled:opacity-50"
                                                        >
                                                            {isSubmittingComment ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                                                        </button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>

                                        {/* SCROLL HINT ARROW */}
                                        {showHint && ad.id === lastOpenedAdId && (
                                            <div className="absolute inset-x-0 bottom-[11rem] sm:bottom-28 md:bottom-12 z-[2500] flex flex-col items-center gap-2 animate-float-arrow pointer-events-none">
                                                <span className="text-[9px] md:text-[10px] font-black text-white/50 tracking-[0.3em] uppercase italic font-serif">KAYDIR</span>
                                                <ChevronDown className="w-6 h-6 md:w-8 md:h-8 text-amber-500/50" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
