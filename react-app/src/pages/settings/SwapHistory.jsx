import React from 'react';
import { ArrowLeft, Check, RefreshCcw, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SwapHistory() {
    const navigate = useNavigate();

    const history = [
        { id: 1, title: 'iPhone 13 vs MacBook Air', date: '12 Mart 2024', status: 'Tamamlandı', partner: 'Ahmet Y.', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=400' },
        { id: 2, title: 'Bisiklet vs Oyun Konsolu', date: '5 Mart 2024', status: 'Tamamlandı', partner: 'Selin K.', image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&q=80&w=400' },
        { id: 3, title: 'Kitap Seti vs Kulaklık', date: '28 Şubat 2024', status: 'Tamamlandı', partner: 'Mert O.', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400' }
    ];

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
                    <p className="text-xs md:text-lg text-stone-500 font-serif italic font-medium">Toplam 42 başarılı takas gerçekleştirdiğiniz görülmektedir.</p>
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
