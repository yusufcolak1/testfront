import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Trash2, Heart, Search, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../lib/api';
import { useAuth } from '../contexts/AuthContext';

export default function Favorites() {
    const { isAuthenticated } = useAuth();
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                if (!isAuthenticated) { setFavorites([]); return; }
                const r = await api.getMyFavorites();
                if (cancelled) return;
                setFavorites((r.data || []).map((it) => ({
                    id: it.id,
                    title: it.title,
                    category: it.category?.name?.toUpperCase() || 'GENEL',
                    tag: it.condition === 'NEW' ? 'SIFIR' : 'YENİ GİBİ',
                    user: it.user?.profile?.firstName ? `${it.user.profile.firstName} ${(it.user.profile.lastName||'').charAt(0)}.` : 'Kullanıcı',
                    initials: (it.user?.profile?.firstName?.[0] || 'K').toUpperCase(),
                    image: it.images?.[0]?.imageUrl || '',
                })));
            } catch (e) {
                console.error(e);
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();
        return () => { cancelled = true; };
    }, [isAuthenticated]);

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
    }, []);

    return (
        <div className="min-h-screen bg-[#f5f1ed] pb-20">
            {/* Header Section */}
            <section className="container mx-auto px-6 pt-4 pb-4 md:pt-10 md:pb-8 flex flex-col items-center">
                <div className="w-full max-w-4xl flex flex-col md:flex-row items-center md:items-end justify-between gap-4 md:gap-8 border-b border-stone-200 pb-4 md:pb-10">
                    <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2 md:gap-4">
                        <div className="flex items-center gap-2 md:gap-4">
                            <div className="w-8 h-8 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white border border-stone-200 flex items-center justify-center shadow-sm rotate-3">
                                <Heart className="w-4 h-4 md:w-6 md:h-6 text-red-500 fill-red-500" />
                            </div>
                            <h2 className="text-2xl md:text-5xl font-serif text-stone-900 tracking-tighter">
                                Favorilerim
                            </h2>
                        </div>
                        <p className="text-[11px] md:text-sm text-stone-400 font-serif italic max-w-sm leading-tight md:leading-normal">
                            Yakından takip ettiğin takas fırsatlarını burada bulabilirsin.
                        </p>
                    </div>

                    <div className="w-full max-w-md mt-2 md:mt-0">
                        <div className="relative group">
                            <Search className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 md:w-4 md:h-4 text-stone-300 group-focus-within:text-stone-900 transition-colors" />
                            <input
                                type="text"
                                placeholder="İlanlarda ara..."
                                className="w-full bg-white border border-stone-200 py-2 md:py-4 pl-10 md:pl-12 pr-6 rounded-[1rem] md:rounded-[1.5rem] outline-none focus:border-stone-900 transition-all font-medium text-xs md:text-sm text-stone-900 placeholder-stone-300 shadow-sm"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Favorites Grid */}
            <div className="w-full relative overflow-hidden" style={{ height: gridScale < 1 ? `${gridHeight * gridScale}px` : 'auto' }}>
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
                    <section className="container mx-auto px-6 max-w-6xl" style={{ maxWidth: gridScale < 1 ? 'none' : undefined }}>
                        {favorites.length > 0 ? (
                            <div className="grid grid-cols-3 xl:grid-cols-5 gap-8">
                                {favorites.map((ad) => (
                                    <Link to={`/ilan/${ad.id}`} key={ad.id} className="group bg-[#fbfaf8] border border-stone-100 rounded-[2.5rem] p-4 transition-all duration-500 hover:shadow-2xl hover:shadow-stone-200/50 hover:-translate-y-2 block">
                                        <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-stone-50 mb-6">
                                            <img src={ad.image} alt={ad.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />

                                            <button
                                                onClick={async (e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    try {
                                                        await api.toggleFavorite(ad.id);
                                                        setFavorites((p) => p.filter((x) => x.id !== ad.id));
                                                    } catch (err) { alert(err.message); }
                                                }}
                                                className="absolute top-4 left-4 p-3 bg-white/95 backdrop-blur-md rounded-[1.2rem] text-red-500 shadow-xl hover:scale-110 active:scale-95 transition-all z-10 border border-white cursor-pointer"
                                                title="Favorilerden kaldır"
                                            >
                                                <Heart className="w-4 h-4 fill-red-500" />
                                            </button>

                                            <div className="absolute top-4 right-4">
                                                <span className="px-3 py-1.5 bg-stone-900 text-amber-400 rounded-xl text-[9px] font-black tracking-widest uppercase shadow-2xl">
                                                    {ad.tag}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="px-1 space-y-4">
                                            <div>
                                                <span className="text-[9px] font-black tracking-[0.2em] text-stone-400 uppercase mb-2 block">
                                                    {ad.category}
                                                </span>
                                                <h4 className="text-xl font-serif text-stone-900 leading-tight group-hover:text-[#4a2008] transition-colors italic truncate">
                                                    {ad.title}
                                                </h4>
                                            </div>

                                            <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-stone-900 text-amber-400 text-[9px] flex items-center justify-center font-black">
                                                        {ad.initials}
                                                    </div>
                                                    <span className="text-[10px] font-black uppercase text-stone-500 tracking-wider font-sans">{ad.user}</span>
                                                </div>
                                                <div className="w-8 h-8 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-900 transition-all duration-300 shadow-sm group-hover:bg-stone-900 group-hover:text-white cursor-pointer">
                                                    <ArrowRight className="w-4 h-4" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-[#fbfaf8] rounded-[3rem] border border-stone-100 shadow-xl max-w-2xl mx-auto flex flex-col items-center">
                                <div className="w-16 h-16 rounded-[1.5rem] bg-stone-50 flex items-center justify-center mb-6 border border-stone-100 rotate-12">
                                    <Sparkles className="w-8 h-8 text-stone-200" />
                                </div>
                                <h3 className="text-2xl font-serif text-stone-900 mb-3">Henüz favori ürünün yok.</h3>
                                <p className="text-sm text-stone-500 font-serif italic max-w-xs mx-auto mb-10">
                                    Keşfetmeye başla ve ilgini çeken ilanları takip etmek için kalp simgesine dokun.
                                </p>
                                <button className="px-12 py-5 bg-stone-900 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-black hover:scale-105 active:scale-95 transition-all shadow-xl shadow-stone-900/10">
                                    KEŞFETMEYE BAŞLA
                                </button>
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
}
