import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Filter, ArrowRight, MapPin, Zap, ChevronDown, LayoutGrid, List, SlidersHorizontal, Package, Star, Calendar, Clock, X, Settings2, Box, ShieldCheck, Loader2 } from 'lucide-react';
import api from '../lib/api';

export default function ListingPage({ title: initialTitle }) {
    const location = useLocation();
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [viewMode, setViewMode] = useState('grid');
    const [title, setTitle] = useState(initialTitle || "Tüm İlanlar");
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState({
        konum: 'Tümü', durum: 'Tümü', takas: 'Tümü', tarih: 'Tümü'
    });

    useEffect(() => {
        let sc = false;
        setLoading(true);
        (async () => {
            try {
                let params = { limit: 40 };
                if (location.pathname.includes('one-cikan')) {
                    setTitle("Öne Çıkan İlanlar");
                    params.isFeatured = true;
                } else if (location.pathname.includes('populer')) {
                    setTitle("Popüler İlanlar");
                    params.isPopular = true;
                } else {
                    setTitle("Son İlanlar");
                }

                const r = await api.getItems(params);
                if (sc) return;
                setProducts(r.data || []);
            } catch (e) { console.error(e); }
            finally { if (!sc) setLoading(false); }
        })();
        return () => { sc = true; };
    }, [location.pathname]);

    return (
        <div className="min-h-screen bg-[#f5f1ed] pb-32">
            {/* Header Section - ULTRA COMPACT VERSION */}
            <section className="pt-2 pb-1 bg-[#f5f1ed] relative overflow-hidden text-left border-b border-stone-200/40">
                <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-2">
                    <div>
                        <div className="inline-flex items-center gap-2 px-2 py-0.5 bg-stone-900/5 rounded-full text-[8px] font-black tracking-widest text-stone-400 uppercase mb-1">
                            LİSTELEME
                        </div>
                        <h1 className="text-4xl md:text-5xl font-serif text-stone-900 italic tracking-tighter leading-none mb-1">
                            {title.split(' ')[0]} <span className="text-[#4a2008]">{title.split(' ').slice(1).join(' ')}</span>
                        </h1>
                    </div>
                    <p className="text-[10px] text-stone-400 font-serif italic max-w-md md:mb-1 opacity-70">
                        Platformdaki en güncel ve en popüler takas fırsatlarını senin için listeledik.
                    </p>
                </div>
            </section>

            {/* Filter & Controls Bar */}
            <div className="relative z-40 bg-white/70 backdrop-blur-xl border-b border-stone-200/50 py-3 shadow-sm">
                <div className="container mx-auto px-6 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => setIsFilterOpen(true)}
                            className="flex items-center gap-3 px-6 py-2.5 rounded-xl font-black text-[10px] tracking-widest uppercase transition-all bg-white border border-stone-100 text-stone-400 hover:border-stone-900 hover:text-stone-900"
                        >
                            <SlidersHorizontal className="w-4 h-4" />
                            FİLTRELE
                        </button>
                        <div className="hidden md:flex items-center gap-2 text-stone-300 font-black text-[9px] tracking-widest uppercase">
                            <span className="text-stone-900">30</span> İlan Bulundu
                        </div>
                    </div>

                    <div className="flex items-center gap-2 bg-stone-50 p-1 rounded-xl border border-stone-100">
                        <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-400 hover:text-stone-600'}`}>
                            <LayoutGrid className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-400 hover:text-stone-600'}`}>
                            <List className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* COMPACT TOP-DOWN FILTER DRAWER (IDENTICAL TO CATEGORY PAGE) */}
            <div className={`fixed inset-0 z-[5000] transition-all duration-500 ${isFilterOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                {/* Backdrop */}
                <div className="absolute inset-0 bg-stone-900/30 backdrop-blur-sm" onClick={() => setIsFilterOpen(false)}></div>

                {/* Compact Drawer Content */}
                <div className={`absolute top-0 left-0 right-0 bg-white shadow-2xl rounded-b-[3rem] transition-transform duration-700 ease-out border-b border-stone-100 ${isFilterOpen ? 'translate-y-0' : '-translate-y-full'}`}>
                    <div className="container mx-auto max-w-7xl pt-10 pb-8 px-12">
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                            {[
                                { key: 'konum', label: 'KONUM', icon: <MapPin className="w-4 h-4" />, options: ['Tümü', 'İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya'] },
                                { key: 'durum', label: 'DURUM', icon: <Box className="w-4 h-4" />, options: ['Tümü', 'Sıfır', 'Yeni Gibi', 'Az Kullanılmış', 'Yorgun'] },
                                { key: 'takas', label: 'TAKAS', icon: <Zap className="w-4 h-4" />, options: ['Tümü', 'Sadece Eşya', 'Eşya + Nakit', 'Üstüne Alırım'] },
                                { key: 'tarih', label: 'TARİH', icon: <Clock className="w-4 h-4" />, options: ['Tümü', '24 Saat', 'Bu Hafta', 'Bu Ay'] }
                            ].map((group) => (
                                <div key={group.key} className="space-y-4">
                                    <div className="flex items-center gap-2 opacity-40">
                                        {group.icon}
                                        <span className="text-[8px] font-black tracking-[0.2em] uppercase">{group.label}</span>
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        {group.options.map(opt => (
                                            <button
                                                key={opt}
                                                onClick={() => setFilters({ ...filters, [group.key]: opt })}
                                                className={`text-left px-4 py-2.5 rounded-xl font-serif italic text-sm transition-all border-2 ${filters[group.key] === opt ? 'bg-stone-900 border-stone-900 text-amber-400 font-bold shadow-md translate-x-1' : 'bg-stone-50 border-transparent text-stone-500 hover:bg-stone-100'}`}
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
                                <ShieldCheck className="w-4 h-4 text-green-500" /> LİSTELEME KONTROLÜ AKTİF
                            </div>
                            <div className="flex items-center gap-4 w-full md:w-auto">
                                <button
                                    onClick={() => setFilters({ konum: 'Tümü', durum: 'Tümü', takas: 'Tümü', tarih: 'Tümü' })}
                                    className="px-6 py-3 text-stone-400 hover:text-stone-900 font-black text-[9px] tracking-widest uppercase transition-colors"
                                >
                                    Sıfırla
                                </button>
                                <button
                                    onClick={() => setIsFilterOpen(false)}
                                    className="flex-1 md:flex-none px-12 py-4 bg-amber-500 text-stone-900 rounded-2xl font-black text-[10px] tracking-widest uppercase shadow-xl hover:scale-105 transition-all"
                                >
                                    FİLTRELERİ UYGULA
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Products Grid */}
            <div className="container mx-auto px-6 mt-6">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-24 gap-4">
                        <Loader2 className="w-12 h-12 text-[#4a2008] animate-spin" />
                        <p className="text-stone-400 font-serif italic uppercase tracking-widest text-xs">İlanlar Getiriliyor...</p>
                    </div>
                ) : products.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 gap-4">
                        <Package className="w-12 h-12 text-stone-200" />
                        <p className="text-stone-400 font-serif italic text-lg">Bu grupta henüz ilan bulunmuyor.</p>
                    </div>
                ) : (
                    <div className={`grid gap-6 md:gap-8 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
                        {products.map((ad, idx) => {
                            const img = ad.images?.[0]?.imageUrl;
                            const fullImg = img ? (img.startsWith('http') ? img : `http://localhost:5000${img}`) : 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&q=80&w=400';
                            const userName = ad.user?.profile?.firstName || 'Kullanıcı';
                            const categoryName = ad.category?.name || 'GENEL';

                            return (
                                <Link
                                    to={`/ilan/${ad.id}`}
                                    key={ad.id}
                                    className={`group bg-white rounded-[2.5rem] p-4 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-stone-50 flex ${viewMode === 'list' ? 'flex-row gap-8 items-center h-48' : 'flex-col'}`}
                                >
                                    <div className={`relative overflow-hidden rounded-[2rem] bg-stone-50 ${viewMode === 'list' ? 'w-48 h-full shrink-0' : 'aspect-[4/5] mb-6'}`}>
                                        <img src={fullImg} alt={ad.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                        {(ad.tag || ad.condition) && (
                                            <div className="absolute top-4 left-4">
                                                <span className="px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-lg text-[8px] font-black tracking-widest text-stone-900 uppercase">
                                                    {ad.tag || ad.condition}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex-1 px-2 space-y-4">
                                        <div>
                                            <span className="text-[9px] font-black tracking-widest text-stone-400 uppercase mb-1 block">{categoryName}</span>
                                            <h4 className="text-xl font-serif text-stone-900 italic font-bold group-hover:text-[#4a2008] transition-colors leading-tight">{ad.title}</h4>
                                        </div>
                                        <div className="flex items-center justify-between pt-4 border-t border-stone-50">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center text-[10px] font-black italic">{userName[0]}</div>
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] font-bold text-stone-900">@{userName.toLowerCase()}</span>
                                                    <div className="flex items-center gap-1 text-stone-400">
                                                        <MapPin className="w-2 h-2" />
                                                        <span className="text-[8px] font-bold uppercase tracking-tighter">{ad.location || '—'}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-stone-900 group-hover:scale-110 transition-transform">
                                                <ArrowRight className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}

                {/* Pagination (Visual only) */}
                <div className="mt-20 flex justify-center items-center gap-2">
                    {[1, 2, 3].map(p => (
                        <button key={p} className={`w-12 h-12 rounded-2xl font-black text-xs transition-all ${p === 1 ? 'bg-stone-900 text-amber-500 shadow-xl' : 'bg-white text-stone-400 hover:bg-stone-50'}`}>{p}</button>
                    ))}
                    <button className="w-12 h-12 rounded-2xl bg-white text-stone-900 hover:bg-stone-50 transition-all flex items-center justify-center border border-stone-100">
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
