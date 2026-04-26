import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Shield, CheckCircle2, AlertTriangle, UserCheck, MessageSquare, Info, Smartphone, Users, ArrowLeft } from 'lucide-react';
import api from '../../lib/api';

const iconMap = { MessageSquare, Info, Users, Smartphone, Shield, UserCheck, MapPin };

export default function SafeSwapGuide() {
    const [steps, setSteps] = useState([]);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                const r = await api.getSafeSwapSteps();
                if (cancelled) return;
                setSteps((r.data || []).map((s) => ({
                    icon: iconMap[s.icon] || Shield,
                    title: s.title,
                    desc: s.description,
                })));
            } catch (e) { console.error(e); }
        })();
        return () => { cancelled = true; };
    }, []);

    return (
        <div className="min-h-screen bg-[#f5f1ed] pb-12 md:pb-24">
            <div className="container mx-auto px-4 md:px-6 py-4 md:py-8">
                {/* Back Link */}
                <Link to="/" className="inline-flex items-center gap-2 text-stone-400 hover:text-stone-900 transition-all group mb-4 md:mb-8 leading-none">
                    <div className="p-1.5 md:p-2 bg-white rounded-xl shadow-sm group-hover:bg-[#4a2008] group-hover:text-white transition-all shrink-0">
                        <ArrowLeft className="w-3.5 h-3.5 md:w-4 md:h-4 shrink-0" />
                    </div>
                    <span className="text-[9px] md:text-[10px] font-black tracking-widest uppercase italic font-serif leading-none">ANA SAYFAYA DÖN</span>
                </Link>

                {/* Header */}
                <div className="bg-stone-900 py-8 md:py-24 px-4 md:px-6 rounded-[1.5rem] md:rounded-[3rem] relative overflow-hidden text-center text-amber-50">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                    <div className="relative z-10 max-w-4xl mx-auto space-y-4 md:space-y-6">
                        <Shield className="w-10 h-10 md:w-16 md:h-16 text-amber-500 mx-auto mb-2 md:mb-8 animate-pulse shrink-0" />
                        <h1 className="text-3xl md:text-5xl font-serif font-black italic leading-snug md:leading-tight">Güvenli <span style={{ color: '#FFF8E7' }}>Takas</span> Rehberi</h1>
                        <p className="text-stone-400 font-medium max-w-2xl mx-auto italic text-xs md:text-lg leading-relaxed px-4 md:px-0">
                            TakasOn topluluğunun bir parçası olarak, her işleminizden keyif almanız ve güvende hissetmeniz bizim için birincil önceliktir.
                        </p>
                    </div>
                </div>

                <div className="container mx-auto max-w-6xl px-4 md:px-6 -mt-8 md:-mt-12 relative z-20">
                    {/* Visual Steps Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
                        {steps.map((step, i) => (
                            <div key={i} className="bg-white p-4 md:p-8 rounded-[1.2rem] md:rounded-[3rem] border border-stone-100 shadow-2xl shadow-stone-900/5 flex flex-col items-center text-center group md:hover:bg-stone-50 transition-all">
                                <div className="w-10 h-10 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-stone-900 flex items-center justify-center mb-3 md:mb-8 group-hover:scale-110 group-hover:bg-[#4a2008] transition-all text-white group-hover:text-[#FFF8E7] shadow-xl shadow-stone-900/10 shrink-0">
                                    <step.icon className="w-4 h-4 md:w-8 md:h-8 shrink-0" />
                                </div>
                                <h3 className="text-lg font-serif font-black text-stone-900 mb-2 md:mb-4 italic leading-tight">{step.title}</h3>
                                <p className="text-stone-400 text-[11px] md:text-sm font-medium leading-relaxed italic">{step.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Important Warnings */}
                    <div className="mt-12 md:mt-32 space-y-6 md:space-y-12">
                        <div className="flex items-center gap-3 md:gap-4 border-b border-stone-200 pb-4 md:pb-8">
                            <div className="w-8 h-8 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-[#4a2008]/5 flex items-center justify-center">
                                <AlertTriangle className="w-4 h-4 md:w-6 md:h-6 text-[#4a2008]" />
                            </div>
                            <h2 className="text-xl md:text-3xl font-serif font-black text-stone-900 italic">Kritik <span style={{ color: '#4a2008' }}>Uyarılar</span></h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-8">
                            {[
                                "Ödemeyi her zaman takas anında gerçekleştirin, asla ön ödeme yapmayın.",
                                "Kargo ile takas yapacaksanız, süreci her detayına kadar yazılı olarak netleştirin.",
                                "Şüpheli ilanları veya kötü niyetli olduğunu düşündüğünüz kullanıcıları mutlaka 'Bildir' butonuyla bize iletin.",
                                "İşlem sonrası kullanıcıya puan vererek topluluğun geri kalanına yardımcı olun."
                            ].map((warning, i) => (
                                <div key={i} className="flex items-start gap-3 md:gap-6 p-4 md:p-8 bg-white rounded-xl md:rounded-[2.5rem] border border-stone-100 shadow-sm hover:translate-x-2 transition-all">
                                    <div className="w-6 h-6 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-stone-50 flex items-center justify-center shrink-0">
                                        <CheckCircle2 className="w-3.5 h-3.5 md:w-5 md:h-5 text-green-500" />
                                    </div>
                                    <p className="text-stone-600 font-bold italic font-serif leading-relaxed line-clamp-2 text-xs md:text-base">{warning}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Meetup Advice Section */}
                    <div className="mt-12 md:mt-32 bg-stone-900 rounded-[1.5rem] md:rounded-[4rem] p-6 md:p-16 text-center text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 blur-[100px] rounded-full group-hover:scale-150 duration-700 pointer-events-none"></div>
                        <div className="max-w-2xl mx-auto space-y-4 md:space-y-8 relative z-10">
                            <MapPin className="w-8 h-8 md:w-12 md:h-12 text-amber-500 mx-auto" />
                            <h2 className="text-2xl md:text-4xl font-serif font-black italic leading-tight">Buluşma Noktası <span style={{ color: '#FFF8E7' }}>Seçimi</span></h2>
                            <p className="text-stone-400 font-medium italic text-[11px] md:text-lg leading-relaxed">
                                Buluşmalarınızı her zaman metro istasyonları, büyük meydanlar veya güvenlikli alışveriş merkezleri gibi insanların yoğun olduğu bölgelerde yapmaya özen gösterin. Yalnız gitmemeye çalışın.
                            </p>
                            <button className="w-full md:w-auto px-10 py-4 md:px-12 md:py-5 bg-amber-500 text-stone-900 rounded-xl md:rounded-2xl font-black text-[9px] md:text-[10px] tracking-[0.2em] uppercase hover:bg-amber-400 transition-all shadow-2xl active:scale-95">
                                NERELER GÜVENLİ?
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
