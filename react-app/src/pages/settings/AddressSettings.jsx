import React from 'react';
import { ArrowLeft, MapPin, Plus, Trash2, Edit2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AddressSettings() {
    const navigate = useNavigate();

    const addresses = [
        { id: 1, title: 'EV ADRESİM', address: 'Barbaros Bulvarı, No: 123, Beşiktaş / İstanbul', type: 'Ev' },
        { id: 2, title: 'İŞ ADRESİM', address: 'Büyükdere Cad. No: 456, Maslak / İstanbul', type: 'İş' }
    ];

    return (
        <div className="min-h-screen bg-[#f5f1ed] pb-24 px-4 md:px-6 pt-4 md:pt-8">
            <div className="container mx-auto max-w-2xl">
                <button
                    onClick={() => navigate('/profil')}
                    className="flex items-center gap-2 text-stone-400 hover:text-stone-900 transition-colors mb-6 md:mb-12 group"
                >
                    <div className="p-1.5 md:p-2 bg-white rounded-lg md:rounded-xl shadow-sm group-hover:shadow-md transition-all">
                        <ArrowLeft className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    </div>
                    <span className="text-[10px] md:text-xs font-black tracking-widest uppercase">Geri Dön</span>
                </button>

                <div className="space-y-6 md:space-y-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 mb-4 md:mb-8 text-center md:text-left">
                        <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6">
                            <div className="w-12 h-12 md:w-20 md:h-20 rounded-xl md:rounded-3xl bg-amber-500 flex items-center justify-center text-stone-900 shadow-xl shadow-amber-500/20 shrink-0">
                                <MapPin className="w-5 h-5 md:w-8 md:h-8" />
                            </div>
                            <div className="space-y-0.5 md:space-y-1">
                                <h1 className="text-2xl md:text-4xl font-serif font-black text-stone-900 italic leading-tight">Adreslerim</h1>
                                <p className="text-[10px] md:text-sm text-stone-500 font-serif italic">Teslimat ve takas noktalarını yönetin.</p>
                            </div>
                        </div>
                        <button className="w-full md:w-auto p-3.5 md:p-4 bg-stone-900 text-white rounded-xl md:rounded-2xl hover:bg-black transition-all active:scale-90 shadow-xl shadow-black/10 flex items-center justify-center gap-2 md:gap-3">
                            <span className="md:hidden text-[9px] font-black uppercase tracking-widest">YENİ ADRES EKLE</span>
                            <Plus className="w-4 h-4 md:w-6 md:h-6" />
                        </button>
                    </div>

                    <div className="space-y-3 md:space-y-4">
                        {addresses.map((addr) => (
                            <div key={addr.id} className="bg-white rounded-2xl md:rounded-[2rem] border border-stone-100 p-4 md:p-8 shadow-2xl shadow-stone-900/5 group hover:border-amber-500/30 transition-all">
                                <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 md:gap-6">
                                    <div className="space-y-1.5 md:space-y-2 text-center sm:text-left">
                                        <div className="inline-block px-2.5 md:px-3 py-0.5 md:py-1 bg-stone-50 text-[9px] md:text-[10px] font-black tracking-widest text-stone-400 uppercase rounded-lg border border-stone-100 italic mt-1 md:mt-0">
                                            {addr.title}
                                        </div>
                                        <p className="text-[13px] md:text-lg font-serif italic text-stone-900 leading-relaxed font-medium">
                                            {addr.address}
                                        </p>
                                    </div>
                                    <div className="flex gap-2 shrink-0">
                                        <button className="p-2.5 md:p-3 bg-stone-50 text-stone-400 rounded-lg md:rounded-xl hover:text-stone-900 hover:bg-white transition-all shadow-sm">
                                            <Edit2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                        </button>
                                        <button className="p-2.5 md:p-3 bg-red-50 text-red-400 rounded-lg md:rounded-xl hover:text-red-500 hover:bg-white transition-all shadow-sm">
                                            <Trash2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
