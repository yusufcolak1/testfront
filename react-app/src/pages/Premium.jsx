import React from 'react';
import { Star, ShieldCheck, Zap, Rocket, Check, ArrowRight, Sparkles, CheckCircle2, Flame, Gem } from 'lucide-react';

export default function Premium() {
    const features = [
        { title: 'Sınırsız İlan', desc: 'Dilediğin kadar ürünü takasa çıkar.', icon: <Zap className="w-4 h-4 text-amber-400" /> },
        { title: 'Öncelikli Sıralama', desc: 'İlanların her zaman en üstte.', icon: <Rocket className="w-4 h-4 text-amber-400" /> },
        { title: 'Özel Rozet', desc: 'Profilinde Elite rozeti ile güven ver.', icon: <ShieldCheck className="w-4 h-4 text-amber-400" /> },
        { title: 'Sınırsız Mesaj', desc: 'Günlük mesaj limitine takılma.', icon: <Star className="w-4 h-4 text-amber-400" /> },
    ];

    return (
        <div className="min-h-screen bg-[#f5f1ed] pb-20">
            <div className="container mx-auto px-6 max-w-6xl">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row items-center justify-between pt-8 md:pt-10 mb-8 md:mb-10 border-b border-stone-200 pb-8 gap-6 text-center md:text-left">
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-5">
                        <div className="w-12 h-12 rounded-[1.2rem] bg-stone-900 border border-stone-800 flex items-center justify-center shadow-lg rotate-3 shrink-0">
                            <Gem className="w-6 h-6 text-amber-400" />
                        </div>
                        <div className="space-y-1">
                            <h2 className="text-3xl md:text-4xl font-serif text-stone-900 tracking-tighter italic">
                                TakasOn <span className="italic text-[#4a2008]">Elite</span>
                            </h2>
                            <p className="text-[10px] md:text-xs text-stone-400 font-serif italic">Ayrıcalıklı özelliklerle takas dünyasında fark yaratın.</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-12">
                    {/* Sol - Özellikler */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {features.map((f, i) => (
                            <div key={i} className="bg-[#fbfaf8] border border-stone-100 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] hover:shadow-2xl hover:shadow-stone-200/50 transition-all group">
                                <div className="w-10 h-10 rounded-xl bg-stone-900 flex items-center justify-center mb-4 group-hover:scale-110 transition-all shadow-sm">
                                    {f.icon}
                                </div>
                                <h4 className="font-serif text-lg md:text-xl text-stone-900 mb-1">{f.title}</h4>
                                <p className="text-stone-400 text-[10px] md:text-xs font-serif italic leading-relaxed">{f.desc}</p>
                            </div>
                        ))}

                        <div className="md:col-span-2 bg-stone-50 border border-stone-200 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] mt-4 relative overflow-hidden group text-center md:text-left">
                            <quote className="text-lg md:text-xl font-serif italic text-stone-600 relative z-10 block mb-6 md:mb-4">
                                "Yüzlerce liralık eşyanı takasla, Premium parasını anında çıkar."
                            </quote>
                            <div className="flex flex-col md:flex-row items-center gap-3 relative z-10">
                                <div className="w-10 h-10 rounded-full bg-stone-900 text-white flex items-center justify-center text-xs font-serif italic">E</div>
                                <span className="text-[10px] font-black text-stone-900 uppercase tracking-widest">Emre Yılmaz – Premium Üye</span>
                            </div>
                        </div>
                    </div>

                    {/* Sağ - Fiyatlandırma Kartı */}
                    <div className="relative group lg:sticky lg:top-8">
                        <div className="bg-stone-900 p-8 md:p-10 rounded-[2rem] md:rounded-[3rem] text-white overflow-hidden shadow-3xl shadow-stone-900/30">
                            <div className="relative z-10">
                                <span className="px-4 py-1.5 bg-amber-400 text-stone-900 rounded-full text-[9px] font-black tracking-widest uppercase mb-6 inline-block">AYLIK PLAN</span>
                                <div className="flex items-baseline gap-2 mb-8 justify-center lg:justify-start">
                                    <span className="text-6xl md:text-7xl font-serif font-black text-amber-400 tracking-tighter">99</span>
                                    <span className="text-xl font-serif font-bold text-stone-500">₺/ay</span>
                                </div>

                                <ul className="space-y-4 mb-10 border-t border-stone-800 pt-8">
                                    {[
                                        'Tüm Elite Özellikler',
                                        'Reklamsız Deneyim',
                                        'Öncelikli Sıralama',
                                        '7/24 Teknik Destek'
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-4 text-stone-300 text-xs font-serif italic">
                                            <div className="w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center">
                                                <Check className="w-3 h-3 text-stone-900" />
                                            </div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>

                                <button className="w-full bg-amber-400 text-stone-900 py-5 rounded-2xl text-base font-black uppercase tracking-widest hover:bg-white hover:scale-[1.05] transition-all active:scale-95 shadow-xl shadow-amber-400/10">
                                    ŞİMDİ ABONE OL
                                </button>
                                <p className="text-[9px] text-stone-500 mt-6 font-black uppercase tracking-widest text-center flex items-center justify-center gap-2">
                                    <ShieldCheck className="w-4 h-4" /> GÜVENLİ ÖDEME ALTYAPISI
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

