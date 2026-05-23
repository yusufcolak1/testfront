import React, { useEffect, useState } from 'react';
import { Star, ShieldCheck, Zap, Rocket, Check, ArrowRight, Sparkles, CheckCircle2, Flame, Gem, Shield, Crown } from 'lucide-react';
import api from '../lib/api';
import { useSettings } from '../contexts/SettingsContext';

const iconMap = { Zap, Rocket, ShieldCheck, Star, Sparkles, Shield, Crown };
const renderIcon = (name) => {
    const Icon = iconMap[name] || Sparkles;
    return <Icon className="w-4 h-4 text-amber-400" />;
};

export default function Premium() {
    const { isPremiumEnabled, loading: settingsLoading } = useSettings();
    const [features, setFeatures] = useState([]);
    const [plans, setPlans] = useState([]);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                const [perks, p] = await Promise.all([api.getPremiumPerks(), api.getPremiumPlans()]);
                if (cancelled) return;
                setFeatures((perks.data || []).slice(0, 4).map((perk) => ({
                    title: perk.title,
                    desc: perk.description,
                    icon: renderIcon(perk.icon),
                })));
                setPlans(p.data || []);
            } catch (e) { console.error(e); }
        })();
        return () => { cancelled = true; };
    }, []);

    if (settingsLoading) {
        return (
            <div className="min-h-screen bg-[#f5f1ed] flex items-center justify-center text-stone-400">
                Yükleniyor…
            </div>
        );
    }

    if (!isPremiumEnabled) {
        return (
            <div className="min-h-screen bg-[#f5f1ed] flex items-center justify-center p-4">
                <div className="max-w-xl w-full bg-stone-900 text-white rounded-[2.5rem] p-8 md:p-12 text-center shadow-2xl relative overflow-hidden border border-stone-800">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#4a2008]/20 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2"></div>
                    
                    <div className="relative z-10 flex flex-col items-center">
                        <div className="w-16 h-16 rounded-[1.5rem] bg-stone-850 border border-stone-750 flex items-center justify-center mb-6 animate-pulse shadow-xl">
                            <Crown className="w-8 h-8 text-amber-400" />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-serif font-black tracking-tight text-white mb-4 italic">
                            Çok Yakında
                        </h2>
                        <div className="h-0.5 w-16 bg-amber-400/40 rounded-full mb-6"></div>
                        <p className="text-lg md:text-xl font-serif italic text-stone-350 leading-relaxed max-w-md">
                            Premium Avantajları Sizlerle!
                        </p>
                        <p className="text-[10px] md:text-xs text-stone-500 font-sans tracking-widest uppercase mt-8 font-black">
                            TAKASON ELITE AYRICALIKLARI
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    const monthly = plans.find((pl) => pl.period === 'MONTHLY') || { price: 49.99, features: [] };

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
                            <blockquote className="text-lg md:text-xl font-serif italic text-stone-600 relative z-10 block mb-6 md:mb-4">
                                "İstediğim her şeyi takasla alabildiğim bir dünya hayal etmiştim. TakasOn ile bu artık hayal değil, bir yaşam tarzı."
                            </blockquote>
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
                                    <span className="text-6xl md:text-7xl font-serif font-black text-amber-400 tracking-tighter">{Math.floor(monthly.price)}</span>
                                    <span className="text-xl font-serif font-bold text-stone-500">₺/ay</span>
                                </div>

                                <ul className="space-y-4 mb-10 border-t border-stone-800 pt-8">
                                    {(monthly.features?.length ? monthly.features : ['Tüm Elite Özellikler', 'Reklamsız Deneyim', 'Öncelikli Sıralama', '7/24 Teknik Destek']).map((item, i) => (
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

