import React, { useEffect, useState } from 'react';
import { ArrowLeft, Check, RefreshCcw, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../lib/api';
import { useAuth } from '../../contexts/AuthContext';

export default function SwapHistory() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [history, setHistory] = useState([]);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                const r = await api.getMyTrades('COMPLETED');
                if (cancelled) return;
                setHistory((r.data || []).map((t) => {
                    const offer = t.tradeItems.find((ti) => ti.side === 'OFFER')?.item;
                    const request = t.tradeItems.find((ti) => ti.side === 'REQUEST')?.item;
                    const partner = t.senderId === user?.id ? t.receiver : t.sender;
                    return {
                        id: t.id,
                        title: `${offer?.title || 'Eşya'} ↔ ${request?.title || 'Eşya'}`,
                        date: new Date(t.updatedAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }),
                        status: 'Tamamlandı',
                        partner: partner?.profile ? `${partner.profile.firstName} ${(partner.profile.lastName||'').charAt(0)}.` : 'Kullanıcı',
                        image: offer?.images?.[0]?.imageUrl || request?.images?.[0]?.imageUrl || '',
                    };
                }));
            } catch (e) { console.error(e); }
        })();
        return () => { cancelled = true; };
    }, [user?.id]);

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

                <div className="mb-8 md:mb-12 text-center md:text-left">
                    <h1 className="text-3xl md:text-4xl font-serif font-black text-stone-900 leading-tight mb-2 italic">Tüm Takas Geçmişim</h1>
                    <p className="text-xs md:text-lg text-stone-500 font-serif italic font-medium">Toplam {history.length} başarılı takas gerçekleştirdiğiniz görülmektedir.</p>
                </div>

                <div className="space-y-4">
                    {history.map((swap) => (
                        <div key={swap.id} className="bg-white rounded-2xl md:rounded-[2rem] p-5 md:p-6 border border-stone-100 shadow-xl shadow-stone-900/5 group hover:border-amber-500/30 transition-all">
                            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
                                <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 text-center sm:text-left">
                                    <div className="w-16 h-16 rounded-xl md:rounded-2xl overflow-hidden bg-stone-100 shrink-0">
                                        <img src={swap.image} alt={swap.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-base md:text-lg font-serif font-black text-stone-900 tracking-tight leading-tight italic uppercase">{swap.title}</h3>
                                        <div className="text-[9px] md:text-[10px] font-black tracking-widest text-stone-400 uppercase">
                                            {swap.partner} · {swap.date}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center sm:items-end gap-3 shrink-0">
                                    <div className="px-4 py-1.5 bg-green-50 text-green-600 rounded-lg md:rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest flex items-center gap-2 border border-green-100">
                                        <Check className="w-3 h-3 md:w-3.5 md:h-3.5" /> TAMAMLANDI
                                    </div>
                                    <div className="flex gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-3 h-3 md:w-3.5 md:h-3.5 text-amber-500 fill-amber-500" />
                                        ))}
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
