import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, Shield, Heart, MessageCircle, ArrowRight, Zap, CheckCircle2, ChevronLeft, ChevronRight, ArrowLeft, Eye } from 'lucide-react';
import api from '../lib/api';
import { useAuth } from '../contexts/AuthContext';

export default function AdDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated, user } = useAuth();
    const [activeImg, setActiveImg] = useState(0);
    const [item, setItem] = useState(null);
    const [similar, setSimilar] = useState([]);
    const [isFavorited, setIsFavorited] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [acting, setActing] = useState(false);

    useEffect(() => {
        let cancelled = false;
        setLoading(true); setError(null);
        (async () => {
            try {
                const r = await api.getItemById(id);
                if (cancelled) return;
                const it = r.data?.item || r.data;
                setItem(it);
                setIsFavorited(!!it.isFavorited);
                // Benzer ilanlar
                if (it.category?.id) {
                    const sim = await api.getItems({ categoryId: it.category.id, limit: 8 });
                    if (cancelled) return;
                    setSimilar((sim.data?.items || sim.data || []).filter((x) => x.id !== it.id).slice(0, 4));
                }
            } catch (e) { if (!cancelled) setError(e.message); }
            finally { if (!cancelled) setLoading(false); }
        })();
        return () => { cancelled = true; };
    }, [id]);

    const requireAuth = () => {
        if (!isAuthenticated) { alert('Lütfen önce giriş yapın.'); return false; }
        return true;
    };

    const toggleFav = async () => {
        if (!requireAuth()) return;
        try {
            setActing(true);
            const r = await api.toggleFavorite(id);
            setIsFavorited(!!r.data?.isFavorited);
        } catch (e) { alert(e.message); }
        finally { setActing(false); }
    };

    const startMessage = async () => {
        if (!requireAuth()) return;
        if (item.user.id === user?.id) { alert('Kendi ilanınıza mesaj gönderemezsiniz.'); return; }
        try {
            setActing(true);
            const r = await api.startConversation(item.user.id);
            navigate(`/mesajlar?room=${r.data.id}`);
        } catch (e) { alert(e.message); }
        finally { setActing(false); }
    };

    const goOffer = () => {
        if (!requireAuth()) return;
        if (item.user.id === user?.id) { alert('Kendi ilanınıza teklif veremezsiniz.'); return; }
        navigate(`/teklif-ver/${item.id}`);
    };

    if (loading) return <div className="min-h-screen bg-[#f5f1ed] flex items-center justify-center text-stone-400">Yükleniyor…</div>;
    if (error || !item) return <div className="min-h-screen bg-[#f5f1ed] flex items-center justify-center text-stone-500">{error || 'İlan bulunamadı.'}</div>;

    const images = item.images?.length ? item.images.map((im) => im.imageUrl.startsWith('http') ? im.imageUrl : `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${im.imageUrl}`) : ['https://via.placeholder.com/800x800?text=Görsel+Yok'];
    const ownerName = item.user?.profile ? `${item.user.profile.firstName} ${item.user.profile.lastName || ''}`.trim() : 'Kullanıcı';
    const ownerInitials = ownerName.split(' ').map((s) => s[0]).filter(Boolean).slice(0, 2).join('').toUpperCase();
    const conditionLabel = ({ NEW: 'Sıfır', LIKE_NEW: 'Yeni Gibi', GOOD: 'İyi', FAIR: 'Orta', POOR: 'Kötü' })[item.condition] || item.condition;
    const swapPrefs = (item.swapFor || '').split(',').map((s) => s.trim()).filter(Boolean);

    return (
        <div className="min-h-screen bg-[#f5f1ed] pb-24 lg:pb-40">
            <div className="container mx-auto px-4 md:px-6 py-8">
                <Link to="/" className="inline-flex items-center gap-2 text-stone-400 hover:text-stone-900 transition-all group mb-6 md:mb-8">
                    <div className="p-2 bg-white rounded-lg md:rounded-xl shadow-sm group-hover:bg-[#4a2008] group-hover:text-[#FFF8E7] transition-all">
                        <ArrowLeft className="w-4 h-4" />
                    </div>
                    <span className="text-[9px] md:text-[10px] font-black tracking-widest uppercase italic font-serif">ANA SAYFAYA DÖN</span>
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-7 space-y-4 md:space-y-6">
                        <div className="relative aspect-square rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-white shadow-2xl shadow-stone-900/10 group">
                            <img src={images[activeImg]} alt={item.title} className="w-full h-full object-cover" />
                            {images.length > 1 && (
                                <>
                                    <button onClick={() => setActiveImg((p) => (p - 1 + images.length) % images.length)} className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 md:p-4 bg-white/90 backdrop-blur-md rounded-xl md:rounded-2xl shadow-xl hover:bg-white transition-all active:scale-95 text-stone-900">
                                        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                                    </button>
                                    <button onClick={() => setActiveImg((p) => (p + 1) % images.length)} className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 md:p-4 bg-white/90 backdrop-blur-md rounded-xl md:rounded-2xl shadow-xl hover:bg-white transition-all active:scale-95 text-stone-900">
                                        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                                    </button>
                                </>
                            )}
                        </div>

                        {images.length > 1 && (
                            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                                {images.map((img, i) => (
                                    <button key={i} onClick={() => setActiveImg(i)} className={`relative w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${activeImg === i ? 'border-[#4a2008] scale-105 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'}`}>
                                        <img src={img} className="w-full h-full object-cover" alt="" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="lg:col-span-5 space-y-6 md:space-y-8">
                        <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] border border-stone-100 p-6 md:p-8 shadow-xl space-y-6 relative">
                            <div className="space-y-3 md:space-y-4">
                                <div className="flex flex-wrap items-center gap-2">
                                    {item.tag && <span className="px-2.5 py-1 bg-stone-50 rounded-lg text-[8px] md:text-[9px] font-black text-stone-400 uppercase tracking-widest">{item.tag}</span>}
                                    {conditionLabel && <span className="px-2.5 py-1 bg-amber-50 rounded-lg text-[8px] md:text-[9px] font-black text-amber-700 uppercase tracking-widest">{conditionLabel}</span>}
                                    <span className="px-2.5 py-1 bg-stone-50 rounded-lg text-[8px] md:text-[9px] font-black text-stone-400 uppercase tracking-widest flex items-center gap-1"><Eye className="w-3 h-3" /> {item.viewCount || 0}</span>
                                </div>
                                <h1 className="text-2xl md:text-4xl font-serif font-black text-stone-900 leading-tight italic">{item.title}</h1>
                                {item.location && (
                                    <div className="flex items-center gap-2 text-stone-400">
                                        <MapPin className="w-3.5 h-3.5" />
                                        <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest">{item.location}</span>
                                    </div>
                                )}
                                {item.estimatedValue && (
                                    <div className="text-[10px] md:text-xs font-black text-stone-500 uppercase tracking-widest">
                                        Tahmini değer: <span className="text-[#4a2008] text-base font-serif italic">{item.estimatedValue} ₺</span>
                                    </div>
                                )}
                            </div>

                            <div className="pt-6 border-t border-stone-50 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-stone-900 flex items-center justify-center text-white font-black italic shadow-xl">{ownerInitials}</div>
                                    <div>
                                        <div className="text-sm font-black text-stone-900 flex items-center gap-1.5">
                                            {ownerName}
                                        </div>
                                        <div className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">{item.user?.profile?.city || '—'}</div>
                                    </div>
                                </div>
                                <button onClick={toggleFav} disabled={acting} className={`p-3 rounded-xl transition-all ${isFavorited ? 'bg-red-50 text-red-500' : 'bg-stone-50 text-stone-400 hover:bg-red-50 hover:text-red-500'}`}>
                                    <Heart className={`w-4 h-4 ${isFavorited ? 'fill-red-500' : ''}`} />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                                <button onClick={goOffer} disabled={acting} className="bg-stone-900 text-white py-4 md:py-5 rounded-xl md:rounded-[1.5rem] font-black text-[9px] md:text-[10px] tracking-widest uppercase hover:bg-black transition-all shadow-xl flex items-center justify-center gap-2">
                                    <Zap className="w-4 h-4 text-amber-400" /> TEKLİF VER
                                </button>
                                <button onClick={startMessage} disabled={acting} className="flex items-center justify-center gap-2 border-2 border-stone-100 py-4 md:py-5 rounded-xl md:rounded-[1.5rem] font-black text-[9px] md:text-[10px] tracking-widest text-stone-600 uppercase hover:bg-stone-50 transition-all">
                                    <MessageCircle className="w-4 h-4" /> MESAJ GÖNDER
                                </button>
                            </div>
                        </div>

                        {swapPrefs.length > 0 && (
                            <div className="bg-amber-50 rounded-[2.5rem] p-8 border border-amber-100/50 space-y-6">
                                <div className="flex items-center gap-2">
                                    <ArrowRight className="w-5 h-5 text-[#4a2008]" />
                                    <h3 className="text-xs font-black tracking-widest text-[#4a2008] uppercase">TAKASA AÇIK ÜRÜNLER</h3>
                                </div>
                                <div className="space-y-3">
                                    {swapPrefs.map((pref, i) => (
                                        <div key={i} className="flex items-center gap-3 bg-white/60 p-4 rounded-2xl border border-white">
                                            <CheckCircle2 className="w-4 h-4 text-[#4a2008]" />
                                            <span className="text-sm font-bold text-stone-800">{pref}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="px-2 md:px-4 space-y-3 md:space-y-4">
                            <h3 className="text-[10px] md:text-xs font-black tracking-widest text-stone-400 uppercase">İLAN AÇIKLAMASI</h3>
                            <p className="text-stone-600 font-serif leading-relaxed italic text-base md:text-lg whitespace-pre-line">{item.description || 'Açıklama bulunmuyor.'}</p>
                        </div>
                    </div>
                </div>

                {similar.length > 0 && (
                    <div className="mt-16 md:mt-24 space-y-8 md:space-y-10">
                        <div className="flex items-center justify-between border-b border-stone-200 pb-4 md:pb-6">
                            <h2 className="text-2xl md:text-3xl font-serif font-black text-stone-900 italic">Benzer <span className="text-[#4a2008]">İlanlar</span></h2>
                            <Link to="/kesfet" className="text-[9px] md:text-[10px] font-black tracking-widest text-stone-400 hover:text-stone-900 uppercase">TÜMÜNE GÖZ AT</Link>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                            {similar.map((it) => {
                                const img = it.images?.[0]?.imageUrl;
                                const fullImg = img ? (img.startsWith('http') ? img : `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${img}`) : 'https://via.placeholder.com/400';
                                return (
                                    <Link to={`/ilan/${it.id}`} key={it.id} className="group flex flex-col bg-white rounded-[1.5rem] md:rounded-[2.5rem] p-3 md:p-4 border border-stone-100 shadow-xl hover:-translate-y-2 transition-all duration-500">
                                        <div className="relative aspect-[4/5] rounded-[1.2rem] md:rounded-[2rem] overflow-hidden mb-3 md:mb-6 bg-stone-100">
                                            <img src={fullImg} alt={it.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        </div>
                                        <div className="px-2 pb-2 space-y-3">
                                            <h3 className="text-lg md:text-xl font-serif font-black text-stone-900 group-hover:text-[#4a2008] italic uppercase tracking-tighter truncate">{it.title}</h3>
                                            <div className="flex items-center justify-between text-stone-400">
                                                <div className="flex items-center gap-1.5">
                                                    <MapPin className="w-3.5 h-3.5" />
                                                    <span className="text-[10px] font-bold uppercase tracking-widest truncate">{it.location || '—'}</span>
                                                </div>
                                                <ArrowRight className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
