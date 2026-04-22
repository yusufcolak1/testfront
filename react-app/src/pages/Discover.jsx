import React, { useState, useEffect, useRef } from 'react';
import { Heart, MessageCircle, Zap, Share2, ArrowLeft, X, MapPin, Search as SearchIcon, Filter, Layers, LayoutGrid, Play, Info, Calendar, Clock, Star, Send, ChevronLeft, ChevronRight, Copy, Check, Instagram, Phone as WhatsApp, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

// 30 adet örnek takas ilanı
const discoverAds = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    title: [
        "Vintage Fotoğraf Makinesi", "Elektro Gitar Setup", "iPhone 13 Pro", "Nintendo Switch OLED",
        "Deri Ceket (Handmade)", "Gaming Laptop", "Klasik Saat Koleksiyonu", "Kamp Seti (Full)",
        "Espresso Makinesi", "Kaykay (Custom)", "Tablet Pro 12.9", "Drone (4K Camera)",
        "Kitap Seti (Nadir)", "Bisiklet (MTB)", "Projektör (Full HD)", "Kulaklık (ANC)"
    ][i % 16] + ` #${i + 1}`,
    user: ["Hakan T.", "Selin A.", "Can M.", "Buse G.", "Mert O."][i % 5],
    location: ["Kadıköy", "Beşiktaş", "Çankaya", "Nilüfer", "Muratpaşa"][i % 5],
    images: [
        `https://picsum.photos/seed/${i + 107}/800/1400`,
        `https://picsum.photos/seed/${i + 207}/800/1400`,
        `https://picsum.photos/seed/${i + 307}/800/1400`
    ],
    likes: Math.floor(Math.random() * 500) + 50,
    description: "Az kullanılmış, temiz durumda. Takasa uygun teklifler değerlendirilir. Her türlü elektronik eşya ile takas düşünülebilir.",
    swapFor: ["MacBook", "Oyun Konsolu", "Nakit Üstü", "Üst Model Telefon"][i % 4],
    date: "2 saat önce",
    comments: [
        { user: "Ahmet", text: "PS5 ile takas düşünür müsün?", date: "1s önce" },
        { user: "Melis", text: "Harika görünüyor, kargo yapabilir misiniz?", date: "45dk önce" }
    ].slice(0, (i % 3))
}));

export default function Discover() {
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'feed'
    const [isCommentsOpen, setIsCommentsOpen] = useState(false);
    const [sharingAdId, setSharingAdId] = useState(null); // Tracks which ad's share menu is open
    const [copySuccess, setCopySuccess] = useState(false);
    const [activeImageIndices, setActiveImageIndices] = useState({}); // Stores current image index per ad {adId: index}
    const [showHint, setShowHint] = useState(false);
    const [hasSeenHint, setHasSeenHint] = useState(false);
    const [lastOpenedAdId, setLastOpenedAdId] = useState(null);
    const [isPeeking, setIsPeeking] = useState(false);
    const scrollContainerRef = useRef(null);
    const adRefs = useRef({});

    const [gridScale, setGridScale] = useState(1);
    const [gridHeight, setGridHeight] = useState(800);
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
    }, [viewMode]);

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
        navigator.clipboard.writeText(`https://takason.com/ilan/${sharingAdId}`);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
    };

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
            {/* GRID VIEW */}
            {viewMode === 'grid' && (
                <div
                    className="w-full relative overflow-hidden transition-all duration-300"
                    style={{ height: gridScale < 1 ? `${gridHeight * gridScale}px` : 'auto' }}
                >
                    <div
                        ref={gridRef}
                        className="origin-top-left w-full"
                        style={{
                            transform: gridScale < 1 ? `scale(${gridScale})` : 'none',
                            width: gridScale < 1 ? '1024px' : '100%',
                            position: gridScale < 1 ? 'absolute' : 'relative',
                            top: 0, left: 0
                        }}
                    >
                        <div className="container mx-auto px-6 py-10 max-w-7xl animate-in fade-in duration-700" style={{ maxWidth: gridScale < 1 ? 'none' : undefined }}>
                            <div className="flex flex-col md:flex-row items-center justify-between mb-8 md:mb-12 gap-6 md:gap-8 border-b border-stone-200 pb-8 md:pb-10">
                                <div className="space-y-1 md:space-y-2 text-center md:text-left">
                                    <h1 className="text-2xl md:text-5xl font-serif font-black text-stone-900 italic tracking-tighter leading-tight">Keşfet <span style={{ color: '#4a2008' }}>Dünyası</span></h1>
                                    <p className="text-stone-400 font-serif italic text-xs md:text-lg font-medium">Takasın yeni nesil, akışkan hali.</p>
                                </div>
                                <div className="flex items-center gap-3 md:gap-4 bg-white p-1.5 md:p-2 rounded-xl md:rounded-2xl shadow-xl shadow-stone-900/5">
                                    <button className="px-4 py-2.5 md:px-6 md:py-3 bg-stone-900 text-amber-400 rounded-lg md:rounded-xl font-black text-[9px] md:text-[10px] tracking-widest uppercase flex items-center gap-2">
                                        <LayoutGrid className="w-3.5 h-3.5 md:w-4 md:h-4" /> TRENDLER
                                    </button>
                                    <button className="px-4 py-2.5 md:px-6 md:py-3 text-stone-400 hover:text-stone-900 font-black text-[9px] md:text-[10px] tracking-widest uppercase transition-colors">
                                        YAKININDAKİLER
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                                {discoverAds.map((ad, index) => (
                                    <div
                                        key={ad.id}
                                        onClick={() => openFeed(ad.id)}
                                        className="group relative aspect-[3/4] rounded-2xl md:rounded-[2.5rem] overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                                    >
                                        <img src={ad.images[0]} alt={ad.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 right-4 md:right-6 translate-y-0 md:translate-y-4 group-hover:translate-y-0 transition-transform duration-500 opacity-100 md:opacity-0 group-hover:opacity-100 flex items-end justify-between text-white text-[10px] md:text-xs font-bold uppercase italic">
                                            <div className="space-y-0.5 md:space-y-1 max-w-[70%]">
                                                <h3 className="font-serif italic font-bold leading-tight truncate">{ad.title}</h3>
                                                <p className="text-amber-400 text-[7px] md:text-[8px] tracking-widest">{ad.location}</p>
                                            </div>
                                            <div className="w-7 h-7 md:w-8 md:h-8 bg-amber-500 rounded-full flex items-center justify-center text-stone-900 shadow-xl group-hover:scale-110 transition-transform shrink-0">
                                                <Play className="w-3 h-3 fill-stone-900" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* FEED VIEW (Reels Mode) */}
            {viewMode === 'feed' && (
                <div className="fixed inset-0 z-[2000] bg-black overflow-hidden select-none h-full w-full">
                    {/* Top Controls */}
                    <div className="absolute top-6 md:top-8 left-6 md:left-8 z-[2100]">
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
                                    className="h-screen w-full snap-start relative flex items-center justify-center overflow-hidden shrink-0"
                                >
                                    <img src={ad.images[currentImgIndex]} alt="" className="absolute inset-0 w-full h-full object-cover blur-[100px] opacity-35 scale-110 transition-all duration-700" />
                                    <div className="absolute inset-0 bg-black/50"></div>

                                    <div className="container mx-auto max-w-7xl h-full flex items-center justify-center gap-12 relative px-4 z-20">

                                        {/* LEFT PANEL */}
                                        <div className="hidden lg:flex flex-col w-80 space-y-8 animate-in slide-in-from-left-5 duration-700">
                                            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-8 rounded-[3rem] space-y-8">
                                                <div className="space-y-2">
                                                    <h3 className="text-white font-serif italic text-2xl font-black">İlan <span style={{ color: '#FFF8E7' }}>Detayları</span></h3>
                                                    <p className="text-stone-400 text-[10px] font-black uppercase tracking-widest">{ad.location}</p>
                                                </div>
                                                <div className="space-y-6">
                                                    <div className="flex items-center gap-4 text-stone-300 font-serif italic">
                                                        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center"><Calendar className="w-5 h-5 text-amber-500" /></div>
                                                        <div>
                                                            <p className="text-[9px] font-black text-stone-500 uppercase tracking-widest not-italic">GÖRSEL</p>
                                                            <p className="font-bold">{currentImgIndex + 1} / {ad.images.length}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-4 text-stone-300 font-serif italic">
                                                        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center"><Zap className="w-5 h-5 text-amber-500" /></div>
                                                        <div>
                                                            <p className="text-[9px] font-black text-stone-500 uppercase tracking-widest not-italic">TAKAS TERCİHİ</p>
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
                                        <div className="relative h-full w-full md:aspect-[9/16] md:max-h-[900px] md:max-w-[500px] bg-stone-900 shadow-[0_0_120px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col items-center justify-center md:rounded-[4rem] group border border-stone-800 md:border-white/5 animate-in zoom-in-95 duration-500 shrink-0">

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
                                            {isCommentsOpen && (
                                                <div className="lg:hidden absolute inset-x-0 bottom-0 top-[20%] z-[2200] flex flex-col bg-stone-900 rounded-t-[2rem] shadow-[0_-20px_50px_rgba(0,0,0,0.5)] animate-in slide-in-from-bottom duration-300">
                                                    <div className="flex items-center justify-between p-5 border-b border-white/5">
                                                        <div className="flex items-center gap-3">
                                                            <MessageCircle className="w-5 h-5 text-amber-500" />
                                                            <h3 className="text-white font-serif italic text-lg font-black">Yorumlar <span className="text-white/50">({ad.comments.length})</span></h3>
                                                        </div>
                                                        <button onClick={() => setIsCommentsOpen(false)} className="w-8 h-8 flex items-center justify-center bg-white/5 rounded-full text-white/50 hover:text-white transition-colors">
                                                            <X className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                    <div className="flex-1 overflow-y-auto p-5 space-y-4 no-scrollbar">
                                                        {ad.comments.length > 0 ? ad.comments.map((comm, idx) => (
                                                            <div key={idx} className="space-y-1.5 animate-in slide-in-from-bottom-2 duration-300">
                                                                <div className="flex items-center justify-between pl-1">
                                                                    <span className="text-amber-500 font-black text-[9px] tracking-widest uppercase">@{comm.user.toLowerCase()}</span>
                                                                    <span className="text-[9px] text-stone-600 font-medium italic font-serif">{comm.date}</span>
                                                                </div>
                                                                <p className="text-white text-[11px] font-serif italic leading-relaxed bg-white/5 p-3.5 rounded-xl border border-white/5 select-text">"{comm.text}"</p>
                                                            </div>
                                                        )) : (
                                                            <div className="h-full flex flex-col items-center justify-center text-center space-y-3 opacity-30">
                                                                <MessageCircle className="w-8 h-8" />
                                                                <p className="text-[10px] text-stone-500 font-serif italic">Henüz yorum yok.</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="p-4 border-t border-white/5 bg-stone-900/90 backdrop-blur-xl">
                                                        <div className="relative group">
                                                            <input type="text" placeholder="Görüşünü paylaş..." className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-white font-serif italic text-xs outline-none focus:border-amber-500/50 transition-all font-bold focus:bg-white/10" />
                                                            <button className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center text-stone-900 shadow-xl active:scale-95 transition-all"><Send className="w-3.5 h-3.5" /></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            <div
                                                className="absolute inset-0 flex overflow-x-scroll snap-x snap-mandatory no-scrollbar"
                                                onScroll={(e) => handleHorizontalScroll(ad.id, e)}
                                            >
                                                {ad.images.map((img, i) => (
                                                    <div key={i} className="min-w-full h-full snap-start shrink-0">
                                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="absolute top-12 md:top-24 left-1/2 -translate-x-1/2 flex gap-1.5 z-[2100]">
                                                {ad.images.map((_, i) => (
                                                    <div key={i} className={`h-1 rounded-full transition-all duration-300 ${i === currentImgIndex ? 'w-4 md:w-6 bg-amber-500' : 'w-1 md:w-1.5 bg-white/30'}`} />
                                                ))}
                                            </div>
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-black/30 flex flex-col justify-end p-6 pb-[6.5rem] md:p-8 md:pb-12 gap-6 md:gap-8 pointer-events-none z-10">
                                                <div className="hidden md:flex absolute top-6 md:top-8 left-6 md:left-8 items-center gap-2.5 md:gap-3 pointer-events-auto">
                                                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-amber-500 flex items-center justify-center text-stone-900 font-black italic shadow-2xl text-sm leading-none">{ad.user[0]}</div>
                                                    <div className="space-y-0.5">
                                                        <h4 className="text-white font-bold text-xs md:text-sm leading-none shrink-0 truncate max-w-[120px]">{ad.user}</h4>
                                                        <div className="flex items-center gap-1.5 text-stone-300">
                                                            <MapPin className="w-2.5 h-2.5 text-amber-500" />
                                                            <span className="text-[8px] md:text-[9px] font-black tracking-widest uppercase truncate max-w-[100px]">{ad.location}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="absolute right-4 md:right-8 bottom-[13rem] md:bottom-40 flex flex-col gap-4 md:gap-6 items-center pointer-events-auto">
                                                    <div className="flex flex-col items-center gap-1">
                                                        <button className="w-11 h-11 md:w-14 md:h-14 bg-white/10 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-red-500 transition-all group active:scale-90">
                                                            <Heart className="w-4 h-4 md:w-6 md:h-6 group-hover:fill-current" />
                                                        </button>
                                                        <span className="text-[8px] md:text-[10px] font-black text-white/80">{ad.likes}</span>
                                                    </div>
                                                    <button
                                                        onClick={() => setIsCommentsOpen(!isCommentsOpen)}
                                                        className={`w-11 h-11 md:w-14 md:h-14 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white transition-all ${isCommentsOpen ? 'bg-amber-500 text-stone-900 rotate-90 scale-110' : 'bg-white/10 hover:bg-stone-800'}`}
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
                                                <div className="space-y-3 md:space-y-6 pointer-events-auto -mt-2">
                                                    <div className="flex md:hidden items-center gap-2 mb-1">
                                                        <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center text-stone-900 font-black italic shadow-md text-[10px] leading-none">{ad.user[0]}</div>
                                                        <h4 className="text-white font-bold text-[11px] leading-none truncate">{ad.user}</h4>
                                                        <div className="w-1 h-1 rounded-full bg-white/30"></div>
                                                        <div className="flex items-center gap-1">
                                                            <MapPin className="w-2.5 h-2.5 text-amber-500" />
                                                            <span className="text-[9px] font-medium text-white/50">{ad.location}</span>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-0.5 md:space-y-2">
                                                        <h2 className="text-xl md:text-3xl font-serif font-black text-white italic tracking-tighter leading-tight">{ad.title}</h2>
                                                    </div>
                                                    <div className="flex items-center pt-1 md:pt-2">
                                                        <Link
                                                            to={`/teklif-ver/${ad.id}`}
                                                            className="w-full bg-amber-500 text-stone-900 py-3.5 md:py-5 rounded-xl md:rounded-2xl font-black text-[9px] md:text-[10px] tracking-widest uppercase hover:bg-stone-900 hover:text-amber-500 transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-2 md:gap-3 shrink-0 leading-none"
                                                        >
                                                            <Zap className="w-3.5 h-3.5 md:w-5 md:h-5 fill-current shrink-0" /> TEKLİF VER
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* RIGHT PANEL: COMMENTS */}
                                        <div className={`hidden lg:flex flex-col w-80 h-[600px] transition-all duration-700 shrink-0 ${isCommentsOpen ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-10 scale-95 pointer-events-none'}`}>
                                            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-8 rounded-[3rem] h-full flex flex-col">
                                                <div className="flex items-center justify-between mb-8">
                                                    <h3 className="text-white font-serif italic text-2xl font-black">Yorumlar <span style={{ color: '#FFF8E7' }}>({ad.comments.length})</span></h3>
                                                    <MessageCircle className="w-6 h-6 text-amber-500" />
                                                </div>
                                                <div className="flex-1 overflow-y-auto space-y-6 pr-2 no-scrollbar">
                                                    {ad.comments.length > 0 ? ad.comments.map((comm, idx) => (
                                                        <div key={idx} className="space-y-2 animate-in slide-in-from-bottom-2 duration-300">
                                                            <div className="flex items-center justify-between pl-1">
                                                                <span className="text-amber-500 font-black text-[9px] tracking-widest uppercase">@{comm.user.toLowerCase()}</span>
                                                                <span className="text-[9px] text-stone-600 font-medium italic font-serif">{comm.date}</span>
                                                            </div>
                                                            <p className="text-white text-xs font-serif italic leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5">"{comm.text}"</p>
                                                        </div>
                                                    )) : (
                                                        <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-30">
                                                            <MessageCircle className="w-10 h-10" />
                                                            <p className="text-[10px] text-stone-500 font-serif italic">Yorum yok.</p>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="mt-8 pt-6 border-t border-white/10">
                                                    <div className="relative group">
                                                        <input type="text" placeholder="Görüşünü paylaş..." className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-5 pr-12 text-white font-serif italic text-xs outline-none focus:border-amber-500/50 transition-all font-bold" />
                                                        <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center text-stone-900 shadow-xl hover:scale-110 active:scale-90 transition-all"><Send className="w-3.5 h-3.5" /></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* SCROLL HINT ARROW */}
                                        {showHint && ad.id === lastOpenedAdId && (
                                            <div className="absolute inset-x-0 bottom-24 md:bottom-12 z-[2500] flex flex-col items-center gap-2 animate-float-arrow pointer-events-none">
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
