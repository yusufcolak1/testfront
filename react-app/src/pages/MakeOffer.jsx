import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Zap, Camera, MessageSquare, Truck, MapPin, Plus, X, Check, Info, ShieldCheck } from 'lucide-react';

export default function MakeOffer() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [offerData, setOfferData] = useState({
        myProductTitle: '',
        myProductDesc: '',
        cashAdjustment: '',
        message: '',
        exchangeType: 'face-to-face', // or 'shipping'
        photos: []
    });

    // Simulasyon için karşı ürün verisi (Hangi ilana teklif veriliyor)
    const targetAd = {
        id: id,
        title: "iPhone 13 Pro Max",
        user: "Mert O.",
        location: "Kadıköy, İstanbul",
        image: `https://picsum.photos/seed/${id || 123}/600/800`,
        expected: "MacBook Air M2 veya üstü"
    };

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    return (
        <div className="min-h-screen bg-[#f5f1ed] py-12 px-6">
            <div className="container mx-auto max-w-5xl">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-8 md:mb-12 gap-6 md:gap-8 animate-in fade-in duration-700">
                    <div className="space-y-2 md:space-y-3 text-center md:text-left">
                        <button onClick={() => navigate(-1)} className="flex items-center justify-center md:justify-start gap-2 text-stone-400 hover:text-stone-900 transition-colors font-black text-[9px] md:text-[10px] tracking-widest uppercase mb-1 md:mb-0">
                            <ArrowLeft className="w-3.5 h-3.5 md:w-4 md:h-4" /> VAZGEÇ VE GERİ DÖN
                        </button>
                        <h1 className="text-3xl md:text-5xl font-serif font-black text-stone-900 italic tracking-tighter leading-none">
                            Takas <span className="text-amber-500">Teklifi Yap</span>
                        </h1>
                    </div>

                    {/* Target Product Summary - Mini Card */}
                    <div className="bg-white p-3 md:p-4 rounded-2xl md:rounded-3xl shadow-xl shadow-stone-900/5 flex items-center gap-3 md:gap-4 border border-stone-200 animate-in fade-in zoom-in duration-500 w-full md:w-auto">
                        <img src={targetAd.image} alt="" className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-xl md:rounded-2xl shadow-lg shrink-0" />
                        <div className="min-w-0">
                            <p className="text-[8px] md:text-[10px] font-black text-stone-400 uppercase tracking-widest leading-none mb-1">TEKLİF VERİLEN ÜRÜN</p>
                            <h3 className="font-serif italic font-bold text-base md:text-lg text-stone-900 leading-tight truncate">{targetAd.title}</h3>
                            <div className="flex items-center gap-1.5 md:gap-2 text-amber-600 mt-1">
                                <Zap className="w-3 h-3 fill-current shrink-0" />
                                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-tight truncate">Beklenen: {targetAd.expected}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="flex items-center justify-between mb-8 md:mb-12 gap-2.5 md:gap-4 max-w-2xl mx-auto">
                    {[1, 2, 3].map((s) => (
                        <div key={s} className="flex-1 flex flex-col items-center gap-1.5 md:gap-2">
                            <div className={`h-1 md:h-2 w-full rounded-full transition-all duration-500 ${s <= step ? 'bg-amber-500' : 'bg-stone-200'}`} />
                            <span className={`text-[8px] md:text-[10px] font-black tracking-widest uppercase ${s === step ? 'text-stone-900' : 'text-stone-400'}`}>ADIM {s}</span>
                        </div>
                    ))}
                </div>

                {/* Offer Steps Content */}
                <div className="bg-white rounded-[2rem] md:rounded-[3.5rem] shadow-2xl shadow-stone-900/10 border border-stone-100 overflow-hidden min-h-[400px] md:min-h-[500px] flex flex-col animate-in slide-in-from-bottom-5 duration-700">

                    {step === 1 && (
                        <div className="p-6 md:p-12 space-y-8 md:space-y-10 animate-in fade-in duration-500">
                            <div className="space-y-1 md:space-y-2 text-center md:text-left">
                                <h2 className="text-2xl md:text-3xl font-serif italic font-black text-stone-900 tracking-tight leading-none">Kozunu <span className="text-amber-500">Göster</span></h2>
                                <p className="text-stone-400 font-medium italic text-sm md:text-base">Takas için vereceğin ürünü tanımla.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                                <div className="space-y-6">
                                    <div className="space-y-3 md:space-y-4">
                                        <label className="text-[9px] md:text-[10px] font-black text-stone-500 tracking-widest uppercase ml-1 md:ml-2">SENİN ÜRÜNÜNÜN BAŞLIĞI</label>
                                        <input
                                            type="text"
                                            placeholder="Örn: Sorunsuz MacBook Air M1"
                                            className="w-full bg-stone-50 border-2 border-transparent focus:border-amber-500/50 rounded-xl md:rounded-2xl py-4 md:py-5 px-5 md:px-6 outline-none font-serif italic text-base md:text-lg transition-all"
                                            value={offerData.myProductTitle}
                                            onChange={(e) => setOfferData({ ...offerData, myProductTitle: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-3 md:space-y-4">
                                        <label className="text-[9px] md:text-[10px] font-black text-stone-500 tracking-widest uppercase ml-1 md:ml-2">ÜRÜN AÇIKLAMASI</label>
                                        <textarea
                                            rows="4"
                                            placeholder="Ürününün durumu, faturası, garantisi vb. detaylar..."
                                            className="w-full bg-stone-50 border-2 border-transparent focus:border-amber-500/50 rounded-xl md:rounded-2xl py-4 md:py-5 px-5 md:px-6 outline-none font-serif italic text-base md:text-lg transition-all resize-none"
                                            value={offerData.myProductDesc}
                                            onChange={(e) => setOfferData({ ...offerData, myProductDesc: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4 md:space-y-6">
                                    <label className="text-[9px] md:text-[10px] font-black text-stone-500 tracking-widest uppercase ml-1 md:ml-2">ÜRÜN FOTOĞRAFLARI (EN AZ 1)</label>
                                    <div className="grid grid-cols-2 gap-3 md:gap-4 h-full pb-0 md:pb-8">
                                        <div className="aspect-square bg-stone-100 rounded-2xl md:rounded-3xl border-4 border-dashed border-stone-200 flex flex-col items-center justify-center gap-2 md:gap-3 text-stone-400 hover:bg-stone-200 hover:text-stone-600 transition-all cursor-pointer group shrink-0">
                                            <Camera className="w-6 h-6 md:w-8 md:h-8 group-hover:scale-110 transition-transform shrink-0" />
                                            <span className="text-[8px] md:text-[10px] font-black tracking-widest uppercase text-center px-2">FOTOĞRAF EKLE</span>
                                        </div>
                                        <div className="aspect-square bg-stone-50 rounded-2xl md:rounded-3xl flex items-center justify-center border border-stone-100 text-stone-300 shrink-0">
                                            <Plus className="w-5 h-5 md:w-6 md:h-6 shrink-0" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="p-6 md:p-12 space-y-8 md:space-y-10 animate-in fade-in duration-500">
                            <div className="space-y-1 md:space-y-2 text-center md:text-left">
                                <h2 className="text-2xl md:text-3xl font-serif italic font-black text-stone-900 tracking-tight leading-none">Teklifi <span className="text-amber-500">Güçlendir</span></h2>
                                <p className="text-stone-400 font-medium italic text-sm md:text-base">Nakit desteği veya lojistik tercihlerini ekle.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
                                <div className="space-y-6 md:space-y-8">
                                    <div className="space-y-3 md:space-y-4">
                                        <label className="text-[9px] md:text-[10px] font-black text-stone-500 tracking-widest uppercase ml-1 md:ml-2 text-amber-600">ÜSTÜNE NAKİT DESTEĞİ (OPSİYONEL)</label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                placeholder="Örn: 2500"
                                                className="w-full bg-amber-500/5 border-2 border-amber-500/20 focus:border-amber-500 rounded-xl md:rounded-2xl py-4 md:py-5 px-5 md:px-6 outline-none font-serif italic text-xl md:text-2xl transition-all"
                                                value={offerData.cashAdjustment}
                                                onChange={(e) => setOfferData({ ...offerData, cashAdjustment: e.target.value })}
                                            />
                                            <span className="absolute right-5 md:right-6 top-1/2 -translate-y-1/2 font-serif italic text-stone-900 font-black text-lg md:text-xl text-amber-500">₺</span>
                                        </div>
                                        <p className="text-[8px] md:text-[10px] text-stone-400 italic leading-snug">Eğer takası dengelemek için üstüne nakit vermeyi kabul ediyorsanız tutar giriniz.</p>
                                    </div>

                                    <div className="space-y-3 md:space-y-4 pt-2 md:pt-4">
                                        <label className="text-[9px] md:text-[10px] font-black text-stone-500 tracking-widest uppercase ml-1 md:ml-2">TAKAS YÖNTEMİ</label>
                                        <div className="grid grid-cols-2 gap-3 md:gap-4">
                                            <button
                                                onClick={() => setOfferData({ ...offerData, exchangeType: 'face-to-face' })}
                                                className={`py-4 md:py-6 px-3 md:px-4 rounded-2xl md:rounded-3xl border-2 transition-all flex flex-col items-center gap-2 md:gap-3 ${offerData.exchangeType === 'face-to-face' ? 'bg-stone-900 border-stone-900 text-white shadow-xl shadow-stone-900/20 scale-[1.02] md:scale-105' : 'bg-white border-stone-100 text-stone-400 hover:border-stone-200'}`}
                                            >
                                                <MapPin className="w-5 h-5 md:w-6 md:h-6 shrink-0" />
                                                <span className="text-[8px] md:text-[10px] font-black tracking-widest uppercase text-center">ELDEN TAKAS</span>
                                            </button>
                                            <button
                                                onClick={() => setOfferData({ ...offerData, exchangeType: 'shipping' })}
                                                className={`py-4 md:py-6 px-3 md:px-4 rounded-2xl md:rounded-3xl border-2 transition-all flex flex-col items-center gap-2 md:gap-3 ${offerData.exchangeType === 'shipping' ? 'bg-stone-900 border-stone-900 text-white shadow-xl shadow-stone-900/20 scale-[1.02] md:scale-105' : 'bg-white border-stone-100 text-stone-400 hover:border-stone-200'}`}
                                            >
                                                <Truck className="w-5 h-5 md:w-6 md:h-6 shrink-0" />
                                                <span className="text-[8px] md:text-[10px] font-black tracking-widest uppercase text-center">KARGO İLE</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-3 md:space-y-4">
                                        <label className="text-[9px] md:text-[10px] font-black text-stone-500 tracking-widest uppercase ml-1 md:ml-2">İLAN SAHİBİNE MESAJIN</label>
                                        <textarea
                                            rows="8"
                                            placeholder="Neden bu takası yapmalısınız? Ürününüzün hikayesini anlatın, karşı tarafı ikna edin..."
                                            className="w-full bg-stone-50 border-2 border-transparent focus:border-amber-500/50 rounded-xl md:rounded-2xl py-4 md:py-5 px-5 md:px-6 outline-none font-serif italic text-base md:text-lg transition-all resize-none h-[180px] md:h-auto"
                                            value={offerData.message}
                                            onChange={(e) => setOfferData({ ...offerData, message: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="p-6 md:p-12 space-y-8 md:space-y-12 animate-in fade-in duration-500">
                            <div className="text-center space-y-3 md:space-y-4 py-4 md:py-8">
                                <div className="w-16 h-16 md:w-24 md:h-24 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 mx-auto animate-bounce shrink-0">
                                    <ShieldCheck className="w-8 h-8 md:w-12 md:h-12 shrink-0" />
                                </div>
                                <div className="space-y-1 md:space-y-2">
                                    <h2 className="text-2xl md:text-4xl font-serif italic font-black text-stone-900 tracking-tight leading-none">Teklifini <span className="text-amber-500">Mühürle</span></h2>
                                    <p className="text-stone-400 font-medium italic text-xs md:text-base">Son bir kez kontrol et ve takas elçisini gönder.</p>
                                </div>
                            </div>

                            <div className="bg-stone-50 rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-8 max-w-2xl mx-auto border border-stone-100 space-y-6 md:space-y-8">
                                <div className="flex items-center justify-between border-b border-stone-200 pb-4 md:pb-6">
                                    <span className="text-[8px] md:text-[10px] font-black text-stone-400 uppercase tracking-widest leading-none shrink-0">VERİLECEK ÜRÜN</span>
                                    <span className="font-serif italic font-black text-base md:text-lg text-stone-900 leading-none truncate ml-4">{offerData.myProductTitle || "İsimsiz Ürün"}</span>
                                </div>
                                <div className="flex items-center justify-between border-b border-stone-200 pb-4 md:pb-6">
                                    <span className="text-[8px] md:text-[10px] font-black text-stone-400 uppercase tracking-widest leading-none shrink-0">EKSTRA NAKİT</span>
                                    <span className="font-serif italic font-black text-base md:text-lg text-amber-600 leading-none">{offerData.cashAdjustment ? `${offerData.cashAdjustment} ₺` : "Yok"}</span>
                                </div>
                                <div className="flex items-center justify-between border-b border-stone-200 pb-4 md:pb-6">
                                    <span className="text-[8px] md:text-[10px] font-black text-stone-400 uppercase tracking-widest leading-none shrink-0">TESLİMAT</span>
                                    <span className="font-serif italic font-black text-base md:text-lg text-stone-900 uppercase tracking-widest text-[10px] md:text-[12px] leading-none">{offerData.exchangeType === 'face-to-face' ? "Elden Takas" : "Kargo"}</span>
                                </div>
                                <div className="pt-1 md:pt-2">
                                    <p className="text-[8px] md:text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2 md:mb-3 leading-none">MESAJIN</p>
                                    <p className="text-stone-500 italic font-serif leading-relaxed line-clamp-3 text-sm md:text-base">"{offerData.message || "Merhaba, bu ürünle takas yapmak istiyorum..."}"</p>
                                </div>
                            </div>

                            <div className="flex flex-col items-center gap-3 md:gap-4 py-2 md:py-4">
                                <p className="flex items-center text-center justify-center gap-2 text-[8px] md:text-[10px] text-stone-400 font-black tracking-widest uppercase px-4 leading-tight">
                                    <ShieldCheck className="w-3.5 h-3.5 md:w-4 md:h-4 text-green-500 shrink-0" /> GÜVENLİ TAKAS ALTYAPISI KORUMASI ALTINDASINIZ
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Footer Actions */}
                    <div className="mt-auto bg-stone-50 border-t border-stone-100 p-6 md:p-8 flex items-center justify-between gap-4">
                        <button
                            onClick={step === 1 ? () => navigate(-1) : prevStep}
                            className="px-4 md:px-10 py-4 md:py-5 text-stone-400 hover:text-stone-900 font-black text-[9px] md:text-[10px] tracking-widest uppercase transition-colors shrink-0"
                        >
                            {step === 1 ? "VAZGEÇ" : "GERİ"}
                        </button>

                        {step < 3 ? (
                            <button
                                onClick={nextStep}
                                className="flex-1 md:flex-none px-6 md:px-12 py-4 md:py-5 bg-stone-900 text-amber-400 rounded-xl md:rounded-2xl font-black text-[9px] md:text-[10px] tracking-widest uppercase shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 md:gap-3 shrink-0"
                            >
                                SONRAKİ <ArrowLeft className="w-3.5 h-3.5 md:w-4 md:h-4 rotate-180 shrink-0" />
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    alert("Teklifiniz başarıyla gönderildi!");
                                    navigate('/kesfet');
                                }}
                                className="flex-1 md:flex-none px-6 md:px-16 py-4 md:py-6 bg-amber-500 text-stone-900 rounded-xl md:rounded-3xl font-black text-[9px] md:text-[10px] tracking-widest uppercase shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 md:gap-3 animate-pulse shrink-0"
                            >
                                <Zap className="w-5 h-5 md:w-6 md:h-6 fill-stone-900 shrink-0" /> TEKLİFİ GÖNDER
                            </button>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}
