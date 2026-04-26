import React, { useEffect, useState } from 'react';
import { ArrowLeft, Package, Trash2, Edit2, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../lib/api';

const statusLabel = (s) => ({ ACTIVE: 'Aktif', DRAFT: 'Taslak', SOLD: 'Satıldı', ARCHIVED: 'Arşiv', DELETED: 'Silindi' }[s] || s);

export default function MyAds() {
    const navigate = useNavigate();
    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                const r = await api.getMyAds();
                if (cancelled) return;
                setAds((r.data || []).map((it) => ({
                    id: it.id,
                    title: it.title,
                    category: it.category?.name?.toUpperCase() || 'GENEL',
                    status: statusLabel(it.status),
                    views: it.viewCount || 0,
                    image: it.images?.[0]?.imageUrl || '',
                })));
            } catch (e) { console.error(e); }
            finally { if (!cancelled) setLoading(false); }
        })();
        return () => { cancelled = true; };
    }, []);

    const handleDelete = async (id) => {
        if (!confirm('İlanı silmek istediğinize emin misiniz?')) return;
        try { await api.deleteItem(id); setAds((p) => p.filter((a) => a.id !== id)); } catch (e) { alert(e.message); }
    };

    return (
        <div className="min-h-screen bg-[#f5f1ed] pb-24 px-6 pt-8">
            <div className="container mx-auto max-w-4xl">
                <button
                    onClick={() => navigate('/profil')}
                    className="flex items-center gap-2 text-stone-400 hover:text-stone-900 transition-colors mb-12 group"
                >
                    <div className="p-2 bg-white rounded-xl shadow-sm group-hover:shadow-md transition-all">
                        <ArrowLeft className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-black tracking-widest uppercase">Geri Dön</span>
                </button>

                <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 mb-10 md:mb-12 text-center md:text-left">
                    <div className="space-y-1">
                        <h1 className="text-3xl md:text-4xl font-serif font-black text-stone-900 leading-tight italic">Aktif İlanlarım</h1>
                        <p className="text-xs md:text-lg text-stone-500 font-serif italic font-medium">Şu an yayında olan {ads.filter(a => a.status === 'Aktif').length} adet ilanınız bulunmaktadır.</p>
                    </div>
                    <div className="relative group w-full md:w-80">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-300" />
                        <input type="text" placeholder="İlanlarımda ara..." className="w-full bg-white border border-stone-100 py-3.5 md:py-4 pl-14 pr-6 rounded-xl md:rounded-2xl outline-none focus:border-amber-500 transition-all font-bold text-xs md:text-sm shadow-sm" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {ads.map((ad) => (
                        <div key={ad.id} className="bg-white rounded-2xl md:rounded-[2rem] p-3 md:p-4 border border-stone-100 shadow-xl shadow-stone-900/5 group hover:border-amber-500/30 transition-all flex gap-4 md:gap-6">
                            <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl md:rounded-2xl overflow-hidden bg-stone-100 shrink-0">
                                <img src={ad.image} alt={ad.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <div className="flex-1 flex flex-col justify-between py-1 min-w-0">
                                <div className="space-y-1">
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="text-[8px] md:text-[10px] font-black tracking-widest text-amber-600 uppercase italic truncate">/ {ad.category}</span>
                                        <span className={`text-[8px] font-black px-1.5 py-0.5 rounded-md ${ad.status === 'Aktif' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'} uppercase tracking-widest whitespace-nowrap`}>
                                            {ad.status}
                                        </span>
                                    </div>
                                    <h3 className="text-sm md:text-lg font-serif font-black text-stone-900 tracking-tight leading-tight group-hover:text-amber-600 transition-colors uppercase italic truncate">{ad.title}</h3>
                                </div>
                                <div className="flex items-center justify-between pt-2">
                                    <span className="text-[8px] md:text-[10px] font-black text-stone-400 uppercase tracking-widest">{ad.views} GÖR</span>
                                    <div className="flex gap-1.5">
                                        <button className="p-2 bg-stone-50 text-stone-400 rounded-lg hover:text-stone-900 hover:bg-white transition-all shadow-sm">
                                            <Edit2 className="w-3 md:w-3.5 h-3 md:h-3.5" />
                                        </button>
                                        <button onClick={() => handleDelete(ad.id)} className="p-2 bg-red-50 text-red-400 rounded-lg hover:text-red-500 hover:bg-white transition-all shadow-sm">
                                            <Trash2 className="w-3 md:w-3.5 h-3 md:h-3.5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
