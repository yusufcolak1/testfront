import React, { useEffect, useState } from 'react';
import { Plus, ArrowLeft, Box, Search, Upload, Sparkles, CheckCircle2, X, Zap, Loader2, Trash2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../lib/api';
import { useAuth } from '../contexts/AuthContext';

const conditions = [
    { value: 'NEW', label: 'Sıfır Ayarında' },
    { value: 'LIKE_NEW', label: 'Yeni Gibi' },
    { value: 'GOOD', label: 'İyi - İkinci El Temiz' },
    { value: 'FAIR', label: 'Orta - Kullanılmış' },
    { value: 'POOR', label: 'Arızalı / Yedek Parça' },
];

export default function CreateAd() {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [adType, setAdType] = useState(null);
    const [step, setStep] = useState(1);
    const [submitting, setSubmitting] = useState(false);
    const [categories, setCategories] = useState([]);
    const [files, setFiles] = useState([]); // File[]
    const [previews, setPreviews] = useState([]); // string[]
    const [form, setForm] = useState({
        title: '',
        categoryId: '',
        description: '',
        location: '',
        condition: 'GOOD',
        estimatedValue: '',
        swapFor: '',
    });

    useEffect(() => {
        if (!isAuthenticated) navigate('/');
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        api.getCategories().then((r) => setCategories(r.data || [])).catch(console.error);
    }, []);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [step, adType]);

    useEffect(() => {
        return () => previews.forEach((url) => URL.revokeObjectURL(url));
    }, [previews]);

    const handleSelectType = (type) => {
        setAdType(type);
        setStep(1);
    };
    const resetSelection = () => {
        setAdType(null);
        setStep(1);
    };
    const upd = (k, v) => setForm((p) => ({ ...p, [k]: v }));

    const onPickFiles = (e) => {
        const list = Array.from(e.target.files || []);
        if (list.length === 0) return;
        const newFiles = [...files, ...list].slice(0, 8);
        setFiles(newFiles);
        // revoke old, generate new
        previews.forEach((url) => URL.revokeObjectURL(url));
        setPreviews(newFiles.map((f) => URL.createObjectURL(f)));
    };
    const removeFile = (idx) => {
        const nf = files.filter((_, i) => i !== idx);
        setFiles(nf);
        previews.forEach((url) => URL.revokeObjectURL(url));
        setPreviews(nf.map((f) => URL.createObjectURL(f)));
    };

    const validateStep = () => {
        if (step === 1) {
            if (!form.title.trim()) return 'Başlık gerekli.';
            if (!form.categoryId) return 'Kategori seçin.';
            if (adType === 'have' && files.length === 0) return 'En az bir görsel ekleyin.';
        }
        if (step === 2) {
            if (!form.description.trim() || form.description.trim().length < 10) return 'Açıklama en az 10 karakter olmalı.';
        }
        return null;
    };

    const next = () => {
        const err = validateStep();
        if (err) return alert(err);
        setStep((s) => s + 1);
    };

    const submit = async () => {
        const err = validateStep();
        if (err) return alert(err);
        try {
            setSubmitting(true);
            const fd = new FormData();
            fd.append('title', form.title);
            fd.append('categoryId', form.categoryId);
            fd.append('description', form.description);
            fd.append('condition', form.condition);
            fd.append('status', 'ACTIVE');
            if (form.location) fd.append('location', form.location);
            if (form.estimatedValue) fd.append('estimatedValue', String(form.estimatedValue));
            if (form.swapFor) fd.append('swapFor', form.swapFor);
            files.forEach((f) => fd.append('images', f));
            const r = await api.createItemWithImages(fd);
            const newId = r.data?.item?.id;
            alert('İlanınız yayınlandı!');
            navigate(newId ? `/ilan/${newId}` : '/profil/ilanlarim');
        } catch (e) { alert(e.message); }
        finally { setSubmitting(false); }
    };

    if (!adType) {
        return (
            <div className="min-h-screen bg-[#f5f1ed] pb-24">
                <div className="container mx-auto px-4 md:px-6 max-w-5xl pt-4 md:pt-20">
                    <div className="text-center space-y-2 md:space-y-4 mb-4 md:mb-20">
                        <div className="w-8 h-8 md:w-16 md:h-16 bg-stone-900 rounded-xl md:rounded-3xl flex items-center justify-center mx-auto shadow-2xl rotate-6">
                            <Sparkles className="w-4 h-4 md:w-8 md:h-8 text-[#f5f1ed]" />
                        </div>
                        <h1 className="text-xl md:text-5xl font-serif font-black text-stone-900 italic tracking-tighter leading-tight">İlan Türünü <span style={{ color: '#4a2008' }}>Seçin</span></h1>
                        <p className="text-stone-400 italic text-[10px] md:text-lg">Takas dünyasına hangi adımla girmek istersiniz?</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-10">
                        <button onClick={() => handleSelectType('have')} className="bg-white p-4 md:p-12 rounded-[1.5rem] md:rounded-[4rem] border border-stone-100 shadow-2xl group hover:-translate-y-3 transition-all duration-500 text-left relative overflow-hidden">
                            <div className="relative z-10 space-y-3 md:space-y-8">
                                <div className="w-10 h-10 md:w-20 md:h-20 bg-stone-50 rounded-xl md:rounded-[2rem] flex items-center justify-center text-stone-400 group-hover:bg-amber-500 group-hover:text-stone-900 transition-all">
                                    <Box className="w-5 h-5 md:w-10 md:h-10" />
                                </div>
                                <div className="space-y-1 md:space-y-4">
                                    <h3 className="text-lg md:text-3xl font-serif font-black text-stone-900 italic">Elimde Ürün Var</h3>
                                    <p className="text-stone-400 text-[10px] md:text-base font-medium leading-relaxed italic">Bir ürünüm var ve takas etmek istiyorum.</p>
                                </div>
                                <div className="inline-flex items-center gap-2 text-[9px] md:text-[10px] font-black tracking-widest text-[#4a2008] uppercase">İLAN OLUŞTUR <Plus className="w-3.5 h-3.5" /></div>
                            </div>
                        </button>

                        <button onClick={() => handleSelectType('search')} className="bg-stone-900 p-4 md:p-12 rounded-[1.5rem] md:rounded-[4rem] shadow-2xl group hover:-translate-y-3 transition-all duration-500 text-left relative overflow-hidden">
                            <div className="relative z-10 space-y-3 md:space-y-8">
                                <div className="w-10 h-10 md:w-20 md:h-20 bg-white/5 rounded-xl md:rounded-[2rem] flex items-center justify-center text-[#f5f1ed] group-hover:bg-[#f5f1ed] group-hover:text-stone-900 transition-all">
                                    <Search className="w-5 h-5 md:w-10 md:h-10" />
                                </div>
                                <div className="space-y-1 md:space-y-4">
                                    <h3 className="text-lg md:text-3xl font-serif font-black text-white italic">Ürün Arıyorum</h3>
                                    <p className="text-stone-400 text-[10px] md:text-base font-medium leading-relaxed italic">Aradığım ürünü ilan olarak yayınlamak istiyorum.</p>
                                </div>
                                <div className="inline-flex items-center gap-2 text-[9px] md:text-[10px] font-black tracking-widest text-[#f5f1ed] uppercase">ARAMA İLANI VER <Plus className="w-3.5 h-3.5" /></div>
                            </div>
                        </button>
                    </div>

                    <div className="mt-6 md:mt-20 text-center">
                        <Link to="/" className="text-[10px] font-black text-stone-400 hover:text-stone-900 uppercase tracking-[0.3em] flex items-center justify-center gap-2 group">
                            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" /> VAZGEÇ VE GERİ DÖN
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f5f1ed] pb-24">
            <div className="container mx-auto px-4 md:px-6 max-w-4xl pt-4 md:pt-10">
                <div className="flex items-center justify-between mb-4 md:mb-8 border-b border-stone-200 pb-4 md:pb-8 gap-3">
                    <div className="flex items-center gap-3 md:gap-5">
                        <button onClick={resetSelection} className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-white border border-stone-200 flex items-center justify-center shadow-sm hover:bg-stone-900 hover:text-white transition-all text-stone-400">
                            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
                        </button>
                        <div>
                            <h2 className="text-base md:text-2xl font-serif text-stone-900 italic font-black leading-none mb-0.5">{adType === 'have' ? 'Ürünümü Paylaşıyorum' : 'Yeni Bir Ürün Arıyorum'}</h2>
                            <p className="text-[8px] md:text-[10px] text-stone-400 font-black uppercase tracking-widest">Adım {step}/3</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-stone-100 rounded-[1.5rem] md:rounded-[3rem] p-4 md:p-12 shadow-2xl space-y-6 md:space-y-10">
                    {step === 1 && (
                        <div className="space-y-6">
                            {adType === 'have' && (
                                <div className="space-y-3">
                                    <label className="block text-[10px] font-black text-stone-400 uppercase tracking-widest">GÖRSELLER * (en fazla 8)</label>
                                    <label className="block w-full h-[120px] md:h-[200px] rounded-2xl md:rounded-[2rem] border-2 border-dashed border-stone-200 bg-stone-50 hover:bg-stone-100 transition-all cursor-pointer flex flex-col items-center justify-center">
                                        <Upload className="w-6 h-6 md:w-8 md:h-8 text-stone-400 mb-2" />
                                        <span className="text-xs md:text-sm font-bold text-stone-700">Görsel ekle</span>
                                        <span className="text-[10px] text-stone-400 italic">PNG, JPG, en fazla 8 dosya</span>
                                        <input type="file" multiple accept="image/*" onChange={onPickFiles} className="hidden" />
                                    </label>
                                    {previews.length > 0 && (
                                        <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                                            {previews.map((src, i) => (
                                                <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-stone-200">
                                                    <img src={src} alt="" className="w-full h-full object-cover" />
                                                    <button type="button" onClick={() => removeFile(i)} className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-lg shadow-lg"><Trash2 className="w-3 h-3" /></button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            <div>
                                <label className="block text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2">{adType === 'have' ? 'ÜRÜN ADI *' : 'ARADIĞIN ÜRÜN *'}</label>
                                <input type="text" value={form.title} onChange={(e) => upd('title', e.target.value)} placeholder={adType === 'have' ? 'Örn: iPhone 13 Pro Max' : 'Örn: Klasik Gitar'} className="w-full bg-stone-50 border border-stone-200 px-4 py-3 rounded-xl focus:border-stone-900 outline-none text-sm md:text-base" />
                            </div>

                            <div>
                                <label className="block text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2">KATEGORİ *</label>
                                <select value={form.categoryId} onChange={(e) => upd('categoryId', e.target.value)} className="w-full bg-stone-50 border border-stone-200 px-4 py-3 rounded-xl focus:border-stone-900 outline-none text-sm md:text-base">
                                    <option value="">— seçin —</option>
                                    {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6">
                            <div>
                                <label className="block text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2">AÇIKLAMA *</label>
                                <textarea value={form.description} onChange={(e) => upd('description', e.target.value)} placeholder={adType === 'have' ? 'Ürünün durumu, garantisi gibi detaylardan bahset...' : 'Aradığın kriterleri belirt...'} className="w-full h-[160px] bg-stone-50 border border-stone-200 px-4 py-3 rounded-xl focus:border-stone-900 outline-none resize-none text-sm md:text-base" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2">ŞEHİR</label>
                                    <input value={form.location} onChange={(e) => upd('location', e.target.value)} placeholder="İstanbul" className="w-full bg-stone-50 border border-stone-200 px-4 py-3 rounded-xl focus:border-stone-900 outline-none text-sm md:text-base" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2">DURUM</label>
                                    <select value={form.condition} onChange={(e) => upd('condition', e.target.value)} className="w-full bg-stone-50 border border-stone-200 px-4 py-3 rounded-xl focus:border-stone-900 outline-none text-sm md:text-base">
                                        {conditions.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2">TAHMİNİ DEĞER (₺)</label>
                                    <input type="number" value={form.estimatedValue} onChange={(e) => upd('estimatedValue', e.target.value)} placeholder="0" className="w-full bg-stone-50 border border-stone-200 px-4 py-3 rounded-xl focus:border-stone-900 outline-none text-sm md:text-base" />
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-6 text-center">
                            <div className="w-12 h-12 md:w-20 md:h-20 bg-amber-100 rounded-xl md:rounded-[2rem] flex items-center justify-center mx-auto"><Zap className="w-6 h-6 md:w-10 md:h-10 text-[#4a2008]" /></div>
                            <div>
                                <h3 className="text-xl md:text-3xl font-serif font-black text-stone-900 italic">{adType === 'have' ? 'Nelerle Takas Edebilirsin?' : 'Sen Ne Verebilirsin?'}</h3>
                                <p className="text-stone-400 text-[10px] md:text-sm italic mt-1">İstediğin ürünleri virgülle ayır.</p>
                            </div>
                            <div className="max-w-xl mx-auto text-left">
                                <textarea value={form.swapFor} onChange={(e) => upd('swapFor', e.target.value)} placeholder="MacBook Air, PlayStation 5, Nakit Üstü, Mantıklı tekliflere açığım" className="w-full h-[120px] bg-stone-50 border border-stone-200 px-4 py-3 rounded-xl focus:border-stone-900 outline-none resize-none text-sm md:text-base" />
                            </div>
                            <div className="bg-stone-900 p-4 md:p-6 rounded-[1.5rem] flex items-center gap-3 text-white text-left">
                                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
                                <p className="text-[10px] md:text-xs italic text-stone-400">İlan yayınlandığında sana ulaşan teklifleri <span className="text-white font-bold">/profil/takaslar</span> sayfasından yönetebilirsin.</p>
                            </div>
                        </div>
                    )}

                    <div className="pt-4 md:pt-8 flex flex-col-reverse md:flex-row justify-between items-center gap-3 border-t border-stone-100">
                        {step > 1 ? (
                            <button onClick={() => setStep(step - 1)} className="text-[10px] font-black tracking-widest text-stone-400 hover:text-stone-900 uppercase flex items-center gap-2"><ArrowLeft className="w-3.5 h-3.5" /> GERİ</button>
                        ) : <div className="hidden md:block" />}

                        {step < 3 ? (
                            <button onClick={next} className="w-full md:w-auto bg-stone-900 text-white px-6 md:px-12 py-3.5 md:py-5 rounded-xl md:rounded-2xl font-black text-[10px] tracking-widest uppercase hover:bg-black transition-all shadow-xl flex items-center justify-center gap-3">
                                SONRAKİ <Plus className="w-4 h-4 text-amber-500" />
                            </button>
                        ) : (
                            <button onClick={submit} disabled={submitting} className="w-full md:w-auto bg-amber-500 text-stone-900 px-6 md:px-12 py-3.5 md:py-5 rounded-xl md:rounded-2xl font-black text-[10px] tracking-widest uppercase hover:bg-amber-400 transition-all shadow-2xl flex items-center justify-center gap-3 disabled:opacity-50">
                                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4 fill-stone-900" />} İLANINI YAYINLA
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
