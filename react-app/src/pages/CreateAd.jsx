import React, { useState } from 'react';
import { Camera, Plus, Tag, Info, ArrowLeft, Box, Smartphone, Sofa, Shirt, MapPin, Upload, Sparkles, Search, CheckCircle2, X, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CreateAd() {
    const [adType, setAdType] = useState(null); // 'have' or 'search'
    const [step, setStep] = useState(1);

    React.useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [step, adType]);

    const handleSelectType = (type) => {
        setAdType(type);
        setStep(1);
    };

    const resetSelection = () => {
        setAdType(null);
        setStep(1);
    };

    // Seçim Ekranı
    if (!adType) {
        return (
            <div className="min-h-screen bg-[#f5f1ed] pb-24">
                <div className="container mx-auto px-4 md:px-6 max-w-5xl pt-4 md:pt-20">
                    <div className="text-center space-y-2 md:space-y-4 mb-4 md:mb-20 animate-in fade-in slide-in-from-bottom-5 duration-700">
                        <div className="w-8 h-8 md:w-16 md:h-16 bg-stone-900 rounded-xl md:rounded-3xl flex items-center justify-center mx-auto shadow-2xl rotate-6">
                            <Sparkles className="w-4 h-4 md:w-8 md:h-8 text-[#f5f1ed]" />
                        </div>
                        <h1 className="text-xl md:text-5xl font-serif font-black text-stone-900 italic tracking-tighter leading-tight">İlan Türünü <span style={{ color: '#4a2008' }}>Seçin</span></h1>
                        <p className="text-stone-400 font-serif italic text-[10px] md:text-lg">Takas dünyasına hangi adımla girmek istersiniz?</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-10">
                        {/* Option 1: Have Product */}
                        <button
                            onClick={() => handleSelectType('have')}
                            className="bg-white p-4 md:p-12 rounded-[1.5rem] md:rounded-[4rem] border border-stone-100 shadow-2xl shadow-stone-900/5 group hover:-translate-y-3 transition-all duration-500 text-left relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-3xl rounded-full group-hover:bg-amber-500/10 transition-colors"></div>
                            <div className="relative z-10 space-y-3 md:space-y-8">
                                <div className="w-10 h-10 md:w-20 md:h-20 bg-stone-50 rounded-xl md:rounded-[2rem] flex items-center justify-center text-stone-400 group-hover:bg-amber-500 group-hover:text-stone-900 transition-all duration-500 shrink-0">
                                    <Box className="w-5 h-5 md:w-10 md:h-10" />
                                </div>
                                <div className="space-y-1 md:space-y-4">
                                    <h3 className="text-lg md:text-3xl font-serif font-black text-stone-900 italic leading-none">Elimde Ürün Var</h3>
                                    <p className="text-stone-400 text-[10px] md:text-base font-medium leading-tight md:leading-relaxed italic">
                                        Benim bir ürünüm var, onu vermek istiyorum ve karşılığında takas yapabileceğim diğer ürünleri belirlemek istiyorum.
                                    </p>
                                </div>
                                <div className="inline-flex items-center gap-2 md:gap-3 text-[9px] md:text-[10px] font-black tracking-widest text-[#4a2008] uppercase leading-none">
                                    İLAN OLUŞTUR <Plus className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                </div>
                            </div>
                        </button>

                        {/* Option 2: Searching For */}
                        <button
                            onClick={() => handleSelectType('search')}
                            className="bg-stone-900 p-4 md:p-12 rounded-[1.5rem] md:rounded-[4rem] shadow-2xl shadow-stone-900/20 group hover:-translate-y-3 transition-all duration-500 text-left relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full group-hover:bg-white/10 transition-colors"></div>
                            <div className="relative z-10 space-y-3 md:space-y-8">
                                <div className="w-10 h-10 md:w-20 md:h-20 bg-white/5 rounded-xl md:rounded-[2rem] flex items-center justify-center text-[#f5f1ed] group-hover:bg-[#f5f1ed] group-hover:text-stone-900 transition-all duration-500 shrink-0">
                                    <Search className="w-5 h-5 md:w-10 md:h-10" />
                                </div>
                                <div className="space-y-1 md:space-y-4">
                                    <h3 className="text-lg md:text-3xl font-serif font-black text-white italic leading-none">Ürün Arıyorum</h3>
                                    <p className="text-stone-400 text-[10px] md:text-base font-medium leading-tight md:leading-relaxed italic">
                                        Spesifik olarak aradığım bir ürün var, karşılığında verebileceğim bir veya birden fazla ürünü teklif etmek istiyorum.
                                    </p>
                                </div>
                                <div className="inline-flex items-center gap-2 md:gap-3 text-[9px] md:text-[10px] font-black tracking-widest text-[#f5f1ed] uppercase leading-none">
                                    ARAMA İLANI VER <Plus className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                </div>
                            </div>
                        </button>
                    </div>

                    <div className="mt-6 md:mt-20 text-center">
                        <Link to="/" className="text-[10px] font-black text-stone-400 hover:text-stone-900 transition-all uppercase tracking-[0.3em] flex items-center justify-center gap-2 md:gap-3 group">
                            <ArrowLeft className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:-translate-x-1 transition-transform" /> VAZGEÇ VE GERİ DÖN
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // Form Ekranı
    return (
        <div className="min-h-screen bg-[#f5f1ed] pb-24">
            <div className="container mx-auto px-4 md:px-6 max-w-4xl pt-4 md:pt-10">
                {/* Header Navigation */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-4 md:mb-8 border-b border-stone-200 pb-4 md:pb-8 gap-3 md:gap-6 animate-in fade-in duration-500">
                    <div className="flex items-center gap-3 md:gap-5">
                        <button
                            onClick={resetSelection}
                            className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-white border border-stone-200 flex items-center justify-center shadow-sm hover:bg-stone-900 hover:text-white transition-all text-stone-400"
                        >
                            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
                        </button>
                        <div>
                            <h2 className="text-base md:text-2xl font-serif text-stone-900 tracking-tighter italic font-black leading-none mb-0.5 md:mb-1">
                                {adType === 'have' ? 'Ürünümü Paylaşıyorum' : 'Yeni Bir Ürün Arıyorum'}
                            </h2>
                            <p className="text-[8px] md:text-[10px] text-stone-400 font-black uppercase tracking-widest">Adım {step}/3</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-stone-100 rounded-[1.5rem] md:rounded-[3rem] p-4 md:p-16 shadow-2xl shadow-stone-900/5 relative overflow-hidden animate-in zoom-in-95 duration-500">
                    <div className="relative z-10 space-y-6 md:space-y-12">

                        {/* ADIM 1: GÖRSEL / ANA BİLGİ */}
                        {step === 1 && (
                            <div className="space-y-4 md:space-y-12 animate-in fade-in slide-in-from-right-5 duration-500">
                                {adType === 'have' && (
                                    <section className="space-y-4 md:space-y-6 text-center">
                                        <div className="w-full h-[120px] md:h-[320px] rounded-[1rem] md:rounded-[3rem] border-2 md:border-4 border-dashed border-stone-100 bg-stone-50/50 hover:bg-stone-50 hover:border-amber-400/50 transition-all cursor-pointer flex flex-col items-center justify-center group shrink-0">
                                            <div className="w-10 h-10 md:w-16 md:h-16 rounded-lg md:rounded-3xl bg-white shadow-xl flex items-center justify-center mb-2 md:mb-6 group-hover:scale-110 transition-transform duration-500 shrink-0">
                                                <Upload className="w-4 h-4 md:w-8 md:h-8 text-stone-900" />
                                            </div>
                                            <h3 className="text-base md:text-2xl font-serif font-black text-stone-900 italic mb-1 md:mb-2 leading-none">Görsel Ekleyin</h3>
                                            <p className="text-stone-400 font-medium text-[9px] md:text-sm italic">Cihazından veya galerinden seçim yap.</p>
                                        </div>
                                    </section>
                                )}

                                <section className="space-y-4 md:space-y-8">
                                    <div className="grid grid-cols-1 gap-4 md:gap-8">
                                        <div className="group">
                                            <label className="block text-[8px] md:text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1 md:mb-4">{adType === 'have' ? 'ELİNDEKİ ÜRÜNÜN ADI' : 'ARADIĞIN ÜRÜNÜN ADI'} *</label>
                                            <input
                                                type="text"
                                                placeholder={adType === 'have' ? "Örn: iPhone 13 Pro Max" : "Örn: Klasik Gitar veya iPad"}
                                                className="w-full bg-stone-50 border border-stone-100 px-4 md:px-8 py-2 md:py-5 rounded-lg md:rounded-2xl outline-none focus:border-stone-900 focus:bg-white transition-all font-serif italic text-sm md:text-xl shadow-inner text-stone-900"
                                            />
                                        </div>
                                        <div className="group">
                                            <label className="block text-[8px] md:text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1 md:mb-4">KATEGORİ</label>
                                            <select className="w-full bg-stone-50 border border-stone-100 px-4 md:px-8 py-2 md:py-5 rounded-lg md:rounded-2xl outline-none focus:border-stone-900 focus:bg-white transition-all font-serif italic text-sm md:text-xl shadow-inner text-stone-900 appearance-none premium-select">
                                                <option>Elektronik</option>
                                                <option>Enstrüman</option>
                                                <option>Ev & Yaşam</option>
                                                <option>Moda</option>
                                            </select>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        )}

                        {/* ADIM 2: DETAYLAR */}
                        {step === 2 && (
                            <div className="space-y-6 md:space-y-12 animate-in fade-in slide-in-from-right-5 duration-500">
                                <section className="space-y-4 md:space-y-8">
                                    <div className="group">
                                        <label className="block text-[8px] md:text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1 md:mb-4">AÇIKLAMA</label>
                                        <textarea
                                            placeholder={adType === 'have' ? "Ürününün durumu, garantisi gibi detaylardan bahset..." : "Aradığın kriterleri belirt (Renk, model yılı, kondisyon vb.)"}
                                            className="w-full h-[120px] md:h-64 bg-stone-50 border border-stone-100 px-4 md:px-8 py-3 md:py-8 rounded-[1rem] md:rounded-[2rem] outline-none focus:border-stone-900 focus:bg-white transition-all font-serif italic text-sm md:text-xl shadow-inner text-stone-900 resize-none"
                                        ></textarea>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                                        <div>
                                            <label className="block text-[8px] md:text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1 md:mb-4">ŞEHİR</label>
                                            <input type="text" placeholder="İstanbul" className="w-full bg-stone-50 border border-stone-100 px-4 md:px-8 py-2 md:py-4 rounded-lg md:rounded-2xl outline-none focus:border-stone-900 focus:bg-white transition-all font-serif italic text-sm md:text-lg shadow-inner" />
                                        </div>
                                        <div>
                                            <label className="block text-[8px] md:text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1 md:mb-4">DURUM</label>
                                            <select className="w-full bg-stone-50 border border-stone-100 px-4 md:px-8 py-2 md:py-4 rounded-lg md:rounded-2xl outline-none focus:border-stone-900 focus:bg-white transition-all font-serif italic text-sm md:text-lg shadow-inner appearance-none premium-select">
                                                <option>Sıfır Ayarında</option>
                                                <option>İkinci El - Temiz</option>
                                                <option>Arızalı / Yedek Parça</option>
                                            </select>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        )}

                        {/* ADIM 3: TAKAS TERCİHLERİ */}
                        {step === 3 && (
                            <div className="space-y-6 md:space-y-12 animate-in fade-in slide-in-from-right-5 duration-500">
                                <section className="space-y-4 md:space-y-10 text-center">
                                    <div className="w-12 h-12 md:w-20 md:h-20 bg-amber-100 rounded-xl md:rounded-[2rem] flex items-center justify-center mx-auto mb-2 md:mb-6 shrink-0">
                                        <Zap className="w-6 h-6 md:w-10 md:h-10 text-[#4a2008]" />
                                    </div>
                                    <div className="space-y-1 md:space-y-4">
                                        <h3 className="text-xl md:text-3xl font-serif font-black text-stone-900 italic leading-tight">{adType === 'have' ? 'Nelerle Takas Edebilirsin?' : 'Sen Ne Verebilirsin?'}</h3>
                                        <p className="text-stone-400 font-medium text-[9px] md:text-base italic">Teklifleri daraltmak için tercihlerinizi listeleyin.</p>
                                    </div>

                                    <div className="max-w-xl mx-auto space-y-4 md:space-y-6">
                                        <div className="relative group overflow-hidden">
                                            <input
                                                type="text"
                                                placeholder="Geçerli takas: MacBook Air"
                                                className="w-full bg-stone-50 border border-stone-100 px-4 md:px-8 py-3 md:py-6 rounded-xl md:rounded-3xl outline-none focus:border-stone-900 focus:bg-white transition-all font-serif italic text-sm md:text-lg shadow-xl"
                                            />
                                            <button className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-stone-900 text-white rounded-lg md:rounded-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-lg shrink-0">
                                                <Plus className="w-4 h-4 md:w-5 md:h-5" />
                                            </button>
                                        </div>
                                        <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
                                            {['Elektronik Takası', 'Nakit Üstü', 'Kafa Kafaya'].map((tag, i) => (
                                                <span key={i} className="px-3 py-1.5 md:px-5 md:py-2.5 bg-white border border-stone-100 rounded-lg md:rounded-2xl text-[8px] md:text-[10px] font-black text-stone-500 uppercase tracking-widest flex items-center gap-1.5 hover:border-amber-400 cursor-pointer transition-all leading-none shrink-0">
                                                    {tag} <X className="w-3 h-3" />
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </section>

                                <div className="bg-stone-900 p-4 md:p-8 rounded-[1rem] md:rounded-[2.5rem] flex items-center md:items-center gap-3 md:gap-6 text-white relative overflow-hidden group shrink-0">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-3xl rounded-full"></div>
                                    <div className="w-8 h-8 md:w-12 md:h-12 bg-white/10 rounded-lg md:rounded-2xl flex items-center justify-center shrink-0">
                                        <CheckCircle2 className="w-4 h-4 md:w-6 md:h-6 text-amber-400" />
                                    </div>
                                    <p className="text-[9px] md:text-xs font-serif italic text-stone-400 leading-tight">
                                        İlanın yayınlandığında bildirim alacaksın. Teklifler doğrudan <span className="text-white font-bold underline decoration-amber-500 underline-offset-4">Mesajlar</span> kutuna düşecek.
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="pt-4 md:pt-10 flex flex-col-reverse md:flex-row justify-between items-center gap-3 md:gap-6 border-t border-stone-100">
                            {step > 1 ? (
                                <button
                                    onClick={() => setStep(step - 1)}
                                    className="w-full md:w-auto text-[10px] md:text-[10px] font-black tracking-widest text-stone-400 hover:text-stone-900 uppercase transition-all flex items-center justify-center md:justify-start gap-2 md:gap-3 py-3 md:py-0"
                                >
                                    <ArrowLeft className="w-3.5 h-3.5 md:w-4 md:h-4" /> GERİ GİT
                                </button>
                            ) : (
                                <div className="hidden md:block" />
                            )}

                            {step < 3 ? (
                                <button
                                    onClick={() => setStep(step + 1)}
                                    className="w-full md:w-auto bg-stone-900 text-white px-6 md:px-12 py-3.5 md:py-5 rounded-xl md:rounded-2xl font-black text-[10px] tracking-widest uppercase hover:bg-black hover:scale-105 active:scale-95 transition-all shadow-xl shadow-stone-900/10 flex items-center justify-center gap-3 md:gap-4 group shrink-0"
                                >
                                    SONRAKİ ADIM <Plus className="w-4 h-4 md:w-5 md:h-5 text-amber-500 group-hover:rotate-90 transition-transform duration-500" />
                                </button>
                            ) : (
                                <button className="w-full md:w-auto bg-amber-500 text-stone-900 px-6 md:px-12 py-3.5 md:py-5 rounded-xl md:rounded-2xl font-black text-[10px] tracking-widest uppercase hover:bg-amber-400 hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-amber-500/20 flex items-center justify-center gap-3 md:gap-4 shrink-0">
                                    İLANINI PAYLAŞ <Zap className="w-4 h-4 md:w-5 md:h-5 fill-stone-900" />
                                </button>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
