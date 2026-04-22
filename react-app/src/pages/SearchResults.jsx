import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, MapPin, Box, Zap, Clock, Star, Heart, ArrowRight, Settings2, X, ShieldCheck, ArrowLeft } from 'lucide-react';

export default function SearchResults() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const [filters, setFilters] = useState({
        location: 'Tümü',
        condition: 'Tümü',
        swapType: 'Tümü',
        time: 'Tümü'
    });

    // Örnek arama sonuçları
    const searchResults = Array.from({ length: 12 }, (_, i) => ({
        id: i + 100,
        title: query + (i === 0 ? "" : ` Model ${i + 1}`),
        category: ["ELEKTRONİK", "MOBİLYA", "GİYİM", "MÜZİK"][i % 4],
        location: ["Kadıköy", "Beşiktaş", "Çankaya", "Bornova"][i % 4],
        image: `https://picsum.photos/seed/search-${i + 10}/600/800`,
        likes: Math.floor(Math.random() * 500) + 50,
        user: ["Ahmet", "Buse", "Can", "Deniz"][i % 4],
        isFeatured: i === 0
    }));

    const filterOptions = {
        location: ['Tümü', 'İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya'],
        condition: ['Tümü', 'Sıfır', 'Yeni Gibi', 'Az Kullanılmış', 'Yorgun'],
        swapType: ['Tümü', 'Sadece Eşya', 'Eşya + Nakit', 'Üstüne Alırım'],
        time: ['Tümü', '24 Saat', 'Bu Hafta', 'Bu Ay']
    };

    return (
        <div className="min-h-screen bg-[#f5f1ed] pb-24 relative overflow-x-hidden">

            {/* COMPACT TOP-DOWN FILTER DRAWER (SEARCH VERSION) */}
            <div className={`fixed inset-0 z-[5000] transition-all duration-500 ${isFilterOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                <div className="absolute inset-0 bg-stone-900/30 backdrop-blur-sm" onClick={() => setIsFilterOpen(false)}></div>

                <div className={`absolute top-0 left-0 right-0 bg-white shadow-2xl rounded-b-[2rem] md:rounded-b-[3rem] transition-transform duration-700 ease-out border-b border-stone-100 ${isFilterOpen ? 'translate-y-0' : '-translate-y-full'}`}>
                    <div className="container mx-auto max-w-7xl pt-8 pb-6 md:pt-10 md:pb-8 px-6 md:px-12">
                        <div className="flex items-center justify-between mb-8 pb-6 border-b border-stone-50">
                            <div className="flex items-center gap-3">
                                <Settings2 className="w-5 h-5 text-[#4a2008]" />
                                <h3 className="text-xl font-serif font-black italic text-stone-900 uppercase tracking-tighter">Arama Filtreleri</h3>
                            </div>
                            <button onClick={() => setIsFilterOpen(false)} className="w-10 h-10 bg-stone-50 text-stone-400 rounded-xl flex items-center justify-center hover:bg-stone-900 hover:text-white transition-all">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

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

                        <div className="mt-10 pt-6 border-t border-stone-50 flex items-center justify-between">
                            <div className="hidden md:flex items-center gap-2 text-[8px] font-black text-stone-400 uppercase tracking-[0.1em]">
                                <ShieldCheck className="w-4 h-4 text-green-500" /> ARATILAN: "{query}" FİLTRELERİ AKTİF
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
                                    className="px-12 py-4 bg-[#4a2008] text-[#FFF8E7] rounded-2xl font-black text-[10px] tracking-widest uppercase shadow-xl hover:scale-105 transition-all"
                                >
                                    SONUÇLARI SÜZ
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Header Section */}
            <div className="bg-white border-b border-stone-200">
                <div className="container mx-auto px-4 md:px-6 py-2 md:py-4 max-w-7xl animate-in fade-in duration-700">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4">
                        <Link to="/" className="flex items-center gap-1.5 md:gap-2 text-stone-400 hover:text-stone-900 transition-all font-black text-[8px] md:text-[9px] tracking-widest uppercase">
                            <ArrowLeft className="w-3 h-3 md:w-3.5 md:h-3.5" /> ANA SAYFAYA DÖN
                        </Link>

                        {/* Search Compact Banner */}
                        <div className="flex-1 bg-stone-900 rounded-[1rem] md:rounded-[2rem] p-4 md:p-6 lg:p-8 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-6 shadow-xl relative overflow-hidden group ml-0 md:ml-8">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-[60px] rounded-full group-hover:bg-amber-500/20 transition-all duration-700" />
                            <div className="space-y-0.5 md:space-y-1 relative z-10 text-center md:text-left">
                                <h1 className="text-lg md:text-xl lg:text-3xl font-serif text-white italic font-black tracking-tight leading-none">
                                    "{query}" <span className="text-stone-500 font-normal">için sonuçlar</span>
                                </h1>
                                <p className="text-[9px] md:text-[10px] lg:text-sm text-stone-400 font-serif italic mt-0.5 md:mt-0">{searchResults.length} adet eşleşen takas ilanı bulundu.</p>
                            </div>
                            <div className="flex items-center gap-4 relative z-10 w-full md:w-auto">
                                <button
                                    onClick={() => setIsFilterOpen(true)}
                                    className="w-full md:w-auto bg-white text-stone-900 px-4 md:px-8 py-2.5 md:py-3.5 rounded-xl md:rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 font-black text-[8px] md:text-[9px] tracking-widest uppercase"
                                >
                                    <Settings2 className="w-3 h-3 md:w-4 md:h-4" /> FİLTRELE
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Results Grid */}
            <div className="container mx-auto px-4 md:px-6 py-6 md:py-8 max-w-7xl animate-in fade-in duration-1000">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                    {searchResults.map((product) => (
                        <Link to={`/ilan/${product.id}`} key={product.id} className="group relative bg-white rounded-2xl md:rounded-[2.5rem] p-1.5 md:p-4 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-stone-100 flex flex-col cursor-pointer">
                            <div className="relative aspect-[4/5] rounded-xl md:rounded-[2rem] overflow-hidden mb-3 md:mb-6">
                                <img src={product.image} alt={product.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                {product.isFeatured && (
                                    <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-amber-500 text-stone-900 text-[7px] md:text-[8px] font-black px-2 py-1 md:px-4 md:py-2 rounded-lg md:rounded-xl tracking-widest uppercase shadow-lg">
                                        ÖNE ÇIKARILAN
                                    </div>
                                )}
                                <button className="absolute top-2 right-2 md:top-4 right-4 w-7 h-7 md:w-9 md:h-9 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-red-500 transition-all shadow-xl">
                                    <Heart className="w-3 h-3 md:w-4 md:h-4 transition-colors" />
                                </button>
                                <div className="absolute inset-x-2 bottom-2 md:inset-x-4 md:bottom-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                    <div className="w-full bg-stone-900 text-amber-400 py-2 md:py-4 rounded-xl md:rounded-2xl font-black text-[8px] md:text-[10px] tracking-widest uppercase flex items-center justify-center gap-2 shadow-2xl">
                                        İNCELE <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
                                    </div>
                                </div>
                            </div>

                            <div className="px-1 md:px-2 pb-1 md:pb-2 space-y-1.5 md:space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1 md:gap-2 min-w-0">
                                        <div className="w-4 h-4 md:w-5 md:h-5 rounded bg-[#4a2008] flex items-center justify-center text-[#FFF8E7] font-black italic text-[7px] md:text-[8px] shrink-0">{product.category[0]}</div>
                                        <span className="text-[8px] md:text-[9px] font-black text-[#4a2008] tracking-widest uppercase italic truncate">{product.category}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-stone-400">
                                        <MapPin className="w-2.5 h-2.5 md:w-3 md:h-3 text-[#4a2008]" />
                                        <span className="text-[8px] md:text-[9px] font-black uppercase tracking-tight">{product.location}</span>
                                    </div>
                                </div>
                                <h3 className="text-[12px] md:text-lg font-serif italic font-black text-stone-900 leading-tight group-hover:text-[#4a2008] transition-colors uppercase pr-1 truncate">{product.title}</h3>
                                <div className="flex items-center gap-3 pt-1 md:pt-2 border-t border-stone-50">
                                    <div className="flex items-center gap-1.5 md:gap-2 min-w-0">
                                        <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 font-black text-[7px] md:text-[8px] shrink-0">{product.user[0]}</div>
                                        <span className="text-[8px] md:text-[9px] font-black text-stone-400 uppercase tracking-widest truncate">@{product.user.toLowerCase()}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
