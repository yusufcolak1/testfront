import React, { useEffect, useState } from 'react';
import { ArrowLeft, Crown, Zap, Shield, Sparkles, AlertCircle, XCircle, ShieldCheck, Star, Rocket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../lib/api';

const iconMap = { Zap, Shield, Sparkles, Crown, ShieldCheck, Star, Rocket };

export default function PremiumDetails() {
    const navigate = useNavigate();
    const [perks, setPerks] = useState([]);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                const r = await api.getPremiumPerks();
                if (cancelled) return;
                setPerks((r.data || []).map((p) => ({
                    title: p.title,
                    value: p.value || 'AKTİF',
                    desc: p.description,
                    icon: iconMap[p.icon] || Sparkles,
                    color: p.color || 'text-amber-500',
                })));
            } catch (e) { console.error(e); }
        })();
        return () => { cancelled = true; };
    }, []);

    return (
        <div className="min-h-screen bg-[#f5f1ed] pb-24 px-6 pt-8">
            <div className="container mx-auto max-w-2xl">
                <button
                    onClick={() => navigate('/profil')}
                    className="flex items-center gap-2 text-stone-400 hover:text-stone-900 transition-colors mb-6 md:mb-12 group leading-none"
                >
                    <div className="p-2 bg-white rounded-xl shadow-sm group-hover:shadow-md transition-all shrink-0">
                        <ArrowLeft className="w-3.5 h-3.5 md:w-4 md:h-4 shrink-0" />
                    </div>
                    <span className="text-[10px] md:text-xs font-black tracking-widest uppercase leading-none">Geri Dön</span>
                </button>

                <div className="space-y-8">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 text-center md:text-left">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl bg-stone-900 flex items-center justify-center shadow-2xl relative overflow-hidden shrink-0">
                            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 to-transparent"></div>
                            <Crown className="w-7 h-7 md:w-10 md:h-10 text-amber-500 relative z-10 shrink-0" />
                        </div>
                        <div className="space-y-1">
                            <h1 className="text-3xl md:text-4xl font-serif font-black text-stone-900 italic leading-none md:leading-tight">Takason Premium</h1>
                            <p className="text-[10px] md:text-sm text-stone-500 font-serif italic leading-none">Yenileme Tarihi: 12 Nisan 2024</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {perks.map((perk, i) => (
                            <div key={i} className="bg-white rounded-[1.5rem] md:rounded-[2rem] border border-stone-100 p-4 md:p-8 shadow-xl shadow-stone-900/5 group hover:border-amber-500/30 transition-all flex items-center justify-between gap-3 md:gap-4">
                                <div className="flex items-center gap-4 md:gap-6 min-w-0">
                                    <div className="p-3 md:p-4 bg-stone-50 rounded-xl md:rounded-2xl group-hover:bg-amber-50 transition-colors shrink-0">
                                        <perk.icon className={`w-5 h-5 md:w-6 md:h-6 shrink-0 ${perk.color}`} />
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="text-[11px] md:text-sm font-black text-stone-900 uppercase tracking-tight mb-1 truncate">{perk.title}</h3>
                                        <p className="text-[9px] md:text-xs text-stone-400 font-medium max-w-[280px] leading-relaxed line-clamp-2 md:line-clamp-none">{perk.desc}</p>
                                    </div>
                                </div>
                                <div className="text-right shrink-0">
                                    <div className="text-sm md:text-lg font-black text-stone-900 italic font-serif tracking-tighter leading-none">{perk.value}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="p-6 md:p-8 bg-amber-50 border border-amber-200/50 rounded-[1.5rem] md:rounded-[2.5rem] flex items-start gap-3 md:gap-4 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-500">
                        <AlertCircle className="w-4 h-4 md:w-5 md:h-5 text-[#4a2008] mt-0.5 md:mt-1 shrink-0" />
                        <div>
                            <h4 className="text-[11px] md:text-sm font-black text-[#4a2008] uppercase tracking-widest mb-1 leading-none">Ayrıcalıklı Müşteri Destek</h4>
                            <p className="text-[9px] md:text-xs text-[#4a2008]/80 font-medium leading-relaxed">Premium üye olarak destek taleplerinizde her zaman en ön sıradadasınız. Ortalama yanıt süresi: &lt; 15 dakika.</p>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-stone-200 flex flex-col items-center gap-3 md:gap-4">
                        <button className="flex items-center gap-2 text-red-400 hover:text-red-600 transition-colors group leading-none">
                            <XCircle className="w-3.5 h-3.5 md:w-4 md:h-4 shrink-0" />
                            <span className="text-[9px] md:text-[10px] font-black tracking-widest uppercase leading-none">Premium Üyeliği İptal Et</span>
                        </button>
                        <p className="text-[8px] md:text-[9px] text-stone-400 text-center px-4 md:px-12 leading-tight md:leading-normal">Yıllık planınız 12 Nisan 2024 tarihinde sona erecektir. İptal etmeniz durumunda bu tarihe kadar tüm ayrıcalıklardan yararlanmaya devam edebilirsiniz.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
