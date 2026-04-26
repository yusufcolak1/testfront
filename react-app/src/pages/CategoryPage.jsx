import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { LayoutGrid, Filter, Search, ArrowRight, Zap, MapPin, Star, Heart, SlidersHorizontal, ChevronDown, X, Check, Calendar, Box, ShieldCheck, Navigation, Info, Settings2, Clock, Loader2 } from 'lucide-react';
import api from '../lib/api';

export default function CategoryPage() {
    const { slug } = useParams();
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [categoryProducts, setCategoryProducts] = useState([]);
    const [categoryName, setCategoryName] = useState(slug ? slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ') : 'Kategori');

    const [filters, setFilters] = useState({
        location: 'Tümü',
        condition: 'Tümü',
        swapType: 'Tümü',
        time: 'Tümü'
    });

    useEffect(() => {
        let sc = false;
        setLoading(true);
        (async () => {
            try {
                // Önce kategoriyi bulup ismini alalım
                const cats = await api.getCategories();
                const matched = cats.data?.find(c => c.slug === slug);
                if (matched) setCategoryName(matched.name);

                const r = await api.getItems({ categorySlug: slug, limit: 40 });
                if (sc) return;
                setCategoryProducts(r.data || []);
            } catch (e) { console.error(e); }
            finally { if (!sc) setLoading(false); }
        })();
        return () => { sc = true; };
    }, [slug]);

    const filterOptions = {
        location: ['Tümü', 'İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya'],
        condition: ['Tümü', 'Sıfır', 'Yeni Gibi', 'Az Kullanılmış', 'Yorgun'],
        swapType: ['Tümü', 'Sadece Eşya', 'Eşya + Nakit', 'Üstüne Alırım'],
        time: ['Tümü', '24 Saat', 'Bu Hafta', 'Bu Ay']
    };

    return (
        <div className="min-h-screen bg-[#f5f1ed] pb-24 relative overflow-x-hidden">

            {/* COMPACT TOP-DOWN FILTER DRAWER (THE REFINED VERSION) */}
            <div className={`fixed inset-0 z-[5000] transition-all duration-500 ${isFilterOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                {/* Backdrop */}
                <div className="absolute inset-0 bg-stone-900/30 backdrop-blur-sm" onClick={() => setIsFilterOpen(false)}></div>

                {/* Compact Drawer Content */}
                <div className={`absolute top-0 left-0 right-0 bg-white shadow-2xl rounded-b-[2rem] md:rounded-b-[3rem] transition-transform duration-700 ease-out border-b border-stone-100 ${isFilterOpen ? 'translate-y-0' : '-translate-y-full'}`}>
                    <div className="container mx-auto max-w-7xl pt-8 pb-6 md:pt-10 md:pb-8 px-6 md:px-12">
                        {/* Compact Header */}
                        <div className="flex items-center justify-between mb-8 pb-6 border-b border-stone-50">
                            <div className="flex items-center gap-3">
                                <Settings2 className="w-5 h-5 text-[#4a2008]" />
                                <h3 className="text-xl font-serif font-black italic text-stone-900 uppercase tracking-tighter">Akıllı Filtreleme</h3>
                            </div>
                            <button onClick={() => setIsFilterOpen(false)} className="w-10 h-10 bg-stone-50 text-stone-400 rounded-xl flex items-center justify-center hover:bg-stone-900 hover:text-white transition-all active:scale-90">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Tight Filter Grid (4 Columns) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12">
                            {Object.entries(filterOptions).map(([key, options]) => (
                                <div key={key} className="space-y-4">
                                    <div className="flex items-center gap-2 opacity-40">
                                        {key === 'location' ? <MapPin className="w-4 h-4" /> : key === 'condition' ? <Box className="w-4 h-4" /> : key === 'swapType' ? <Zap className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                                        <span className="text-[8px] font-black tracking-[0.2em] uppercase">
                                            {key === 'location' ? 'KONUM' : key === 'condition' ? 'DURUM' : key === 'swapType' ? 'TAKAS' : 'TARİH'}
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        {options.map(opt => (
                                            <button
                                                key={opt}
                                                onClick={() => setFilters({ ...filters, [key]: opt })}
                                                className={`text-left px-4 py-2.5 rounded-xl font-serif italic text-sm transition-all border-2 ${filters[key] === opt ? 'bg-stone-900 border-stone-900 text-amber-400 font-bold shadow-md translate-x-1' : 'bg-stone-50 border-transparent text-stone-500 hover:bg-stone-100'}`}
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Footer Actions */}
                        <div className="mt-10 pt-6 border-t border-stone-50 flex items-center justify-between">
                            <div className="hidden md:flex items-center gap-2 text-[8px] font-black text-stone-400 uppercase tracking-[0.1em]">
                                <ShieldCheck className="w-4 h-4 text-green-500" /> GÜVENLİ TAKAS KONTROLÜ AKTİF
                            </div>
                            <div className="flex items-center gap-4 w-full md:w-auto">
                                <button
                                    onClick={() => setFilters({ location: 'Tümü', condition: 'Tümü', swapType: 'Tümü', time: 'Tümü' })}
                                    className="px-6 py-3 text-stone-400 hover:text-stone-900 font-black text-[9px] tracking-widest uppercase transition-colors"
                                >
                                    Sıfırla
                                </button>
                                <button
                                    onClick={() => setIsFilterOpen(false)}
                                    className="flex-1 md:flex-none px-12 py-4 bg-amber-500 text-stone-900 rounded-2xl font-black text-[10px] tracking-widest uppercase shadow-xl hover:scale-105 transition-all"
                                >
                                    UYGULA
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Header Section */}
            <div className="bg-white border-b border-stone-200">
                <div className="container mx-auto px-6 py-12 max-w-7xl animate-in fade-in duration-700">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="space-y-3 text-center md:text-left">
                            <label className="text-[10px] font-black text-[#4a2008] tracking-[0.2em] uppercase">KATEGORİ REHBERİ</label>
                            <h1 className="text-4xl md:text-6xl font-serif font-black text-stone-900 italic tracking-tighter capitalize leading-none">
                                {categoryName}
                            </h1>
                            <p className="text-stone-400 font-serif italic text-lg md:text-xl max-w-sm">
                                Bu kategorideki en yeni takaslıklar.
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setIsFilterOpen(true)}
                                className="bg-stone-900 text-amber-400 px-6 md:px-8 py-4 md:py-5 rounded-[2rem] shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3 font-black text-[10px] tracking-widest uppercase"
                            >
                                <Settings2 className="w-5 h-5 group-hover:rotate-180 transition-transform" /> FİLTRELE
                            </button>
                            <div className="bg-stone-50 px-6 md:px-10 py-4 md:py-5 rounded-[1.5rem] md:rounded-[2rem] border border-stone-100 shadow-sm flex items-center gap-3">
                                <span className="text-2xl md:text-3xl font-serif font-black text-stone-900">{categoryProducts.length}</span>
                                <span className="text-[10px] font-black text-stone-400 tracking-widest uppercase">İLAN</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Category Products Grid */}
            <div className="container mx-auto px-4 md:px-6 py-8 md:py-12 max-w-7xl animate-in fade-in duration-1000">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-24 gap-4">
                        <Loader2 className="w-12 h-12 text-[#4a2008] animate-spin" />
                        <p className="text-stone-400 font-serif italic uppercase tracking-widest text-xs">Yükleniyor...</p>
                    </div>
                ) : categoryProducts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 gap-4">
                        <Box className="w-12 h-12 text-stone-200" />
                        <p className="text-stone-400 font-serif italic text-lg">Bu kategoride henüz ilan bulunmuyor.</p>
                        <Link to="/ilan-ver" className="bg-stone-900 text-white px-8 py-3 rounded-xl font-black text-[10px] tracking-widest uppercase">İLK İLANI SEN VER</Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                        {categoryProducts.map((product) => {
                            const img = product.images?.[0]?.imageUrl;
                            const fullImg = img ? (img.startsWith('http') ? img : `http://localhost:5000${img}`) : 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&q=80&w=400';
                            const userName = product.user?.profile?.firstName || 'Kullanıcı';

                            return (
                                <Link to={`/ilan/${product.id}`} key={product.id} className="group relative bg-white rounded-2xl md:rounded-[2.5rem] p-1.5 md:p-4 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-stone-100 flex flex-col cursor-pointer">
                                    {/* Product Image */}
                                    <div className="relative aspect-[4/5] rounded-xl md:rounded-[2rem] overflow-hidden mb-3 md:mb-6 bg-stone-50">
                                        <img src={fullImg} alt={product.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                        {product.isFeatured && (
                                            <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-amber-500 text-stone-900 text-[7px] md:text-[8px] font-black px-2 py-1 md:px-3 md:py-1.5 rounded-full tracking-widest uppercase shadow-lg">
                                                ÖNE ÇIKAN
                                            </div>
                                        )}
                                        <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); }} className="absolute top-2 right-2 md:top-4 md:right-4 w-7 h-7 md:w-9 md:h-9 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-red-500 transition-all shadow-xl z-20">
                                            <Heart className="w-3 h-3 md:w-4 md:h-4 transition-colors" />
                                        </button>
                                        <div className="absolute inset-x-2 bottom-2 md:inset-x-4 md:bottom-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                            <div className="w-full bg-stone-900 text-amber-400 py-2 md:py-4 rounded-xl md:rounded-2xl font-black text-[8px] md:text-[10px] tracking-widest uppercase flex items-center justify-center gap-2 shadow-2xl">
                                                İNCELE <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Product Info */}
                                    <div className="px-1 md:px-2 pb-1 md:pb-2 space-y-1.5 md:space-y-3">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-1 md:gap-2 min-w-0">
                                                <div className="w-4 h-4 md:w-5 md:h-5 rounded bg-amber-500 flex items-center justify-center text-stone-900 font-black italic text-[7px] md:text-[8px] shrink-0">{userName[0]}</div>
                                                <span className="text-[8px] md:text-[9px] font-black text-stone-400 tracking-widest uppercase italic truncate">@{userName.toLowerCase()}</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-stone-400">
                                                <MapPin className="w-2.5 h-2.5 md:w-3 md:h-3 text-[#4a2008]" />
                                                <span className="text-[8px] md:text-[9px] font-black uppercase tracking-tight">{product.location || '—'}</span>
                                            </div>
                                        </div>
                                        <h3 className="text-[12px] md:text-lg font-serif italic font-black text-stone-900 leading-tight group-hover:text-[#4a2008] transition-colors uppercase pr-1 line-clamp-1">{product.title}</h3>
                                        <div className="flex items-center pt-1 md:pt-2 border-t border-stone-50">
                                            <div className="flex items-center gap-1">
                                                <Star className="w-2.5 h-2.5 md:w-3 md:h-3 text-[#4a2008] fill-current" />
                                                <span className="text-[8px] md:text-[9px] font-black text-stone-900">{product.viewCount || 0} Gözlem</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
