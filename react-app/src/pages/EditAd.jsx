import React, { useEffect, useState, useRef } from 'react';
import { ArrowLeft, Upload, X, Loader2, CheckCircle2, Trash2, Plus } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../lib/api';
import { useAuth } from '../contexts/AuthContext';
import { getFullImageUrl } from '../utils/helpers';

const conditions = [
    { value: 'NEW',      label: 'Sıfır Ayarında'          },
    { value: 'LIKE_NEW', label: 'Yeni Gibi'                },
    { value: 'GOOD',     label: 'İyi - İkinci El Temiz'    },
    { value: 'FAIR',     label: 'Orta - Kullanılmış'       },
    { value: 'POOR',     label: 'Arızalı / Yedek Parça'    },
];

const TURKEY_CITIES = [
    'Adana','Adıyaman','Afyonkarahisar','Ağrı','Amasya','Ankara','Antalya','Artvin','Aydın','Balıkesir','Bilecik','Bingöl','Bitlis','Bolu','Burdur','Bursa','Çanakkale','Çankırı','Çorum','Denizli','Diyarbakır','Edirne','Elazığ','Erzincan','Erzurum','Eskişehir','Gaziantep','Giresun','Gümüşhane','Hakkari','Hatay','Isparta','Mersin','İstanbul','İzmir','Kars','Kastamonu','Kayseri','Kırklareli','Kırşehir','Kocaeli','Konya','Kütahya','Malatya','Manisa','Kahramanmaraş','Mardin','Muğla','Muş','Nevşehir','Niğde','Ordu','Rize','Sakarya','Samsun','Siirt','Sinop','Sivas','Tekirdağ','Tokat','Trabzon','Tunceli','Şanlıurfa','Uşak','Van','Yozgat','Zonguldak','Aksaray','Bayburt','Karaman','Kırıkkale','Batman','Şırnak','Bartın','Ardahan','Iğdır','Yalova','Karabük','Kilis','Osmaniye','Düzce',
].sort();

function normalizeToJpeg(file) {
    return new Promise((resolve) => {
        const objectUrl = URL.createObjectURL(file);
        const img = new Image();
        img.onload = () => {
            const MAX = 1920;
            let { naturalWidth: w, naturalHeight: h } = img;
            if (w > MAX || h > MAX) {
                if (w > h) { h = Math.round((h / w) * MAX); w = MAX; }
                else        { w = Math.round((w / h) * MAX); h = MAX; }
            }
            const canvas = document.createElement('canvas');
            canvas.width = w; canvas.height = h;
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, w, h);
            ctx.drawImage(img, 0, 0, w, h);
            URL.revokeObjectURL(objectUrl);
            canvas.toBlob(
                (blob) => {
                    if (!blob) { resolve(file); return; }
                    const safeName = (file.name || 'photo').replace(/\.[^.]+$/, '');
                    resolve(new File([blob], `${safeName}.jpg`, { type: 'image/jpeg' }));
                },
                'image/jpeg', 0.85
            );
        };
        img.onerror = () => { URL.revokeObjectURL(objectUrl); resolve(file); };
        img.src = objectUrl;
    });
}

export default function EditAd() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const fileInputRef = useRef(null);

    const [loading, setLoading]     = useState(true);
    const [saving, setSaving]       = useState(false);
    const [saved, setSaved]         = useState(false);
    const [error, setError]         = useState('');
    const [categories, setCategories] = useState([]);

    // Mevcut fotoğraflar (sunucudan gelen)
    const [existingImages, setExistingImages] = useState([]); // [{id, imageUrl}]
    const [removedIds, setRemovedIds]         = useState([]); // silinecek image id'leri

    // Yeni eklenecek fotoğraflar
    const [newFiles, setNewFiles]     = useState([]);
    const [newPreviews, setNewPreviews] = useState([]);

    const [form, setForm] = useState({
        title: '', categoryId: '', description: '',
        location: '', condition: 'GOOD', estimatedValue: '', swapFor: '',
    });

    useEffect(() => { if (!isAuthenticated) navigate('/'); }, [isAuthenticated, navigate]);
    useEffect(() => { api.getCategories().then(r => setCategories(r.data || [])).catch(() => {}); }, []);

    useEffect(() => {
        (async () => {
            try {
                const r = await api.getItemById(id);
                const it = r.data?.item || r.data;
                setForm({
                    title:          it.title          || '',
                    categoryId:     it.category?.id   || '',
                    description:    it.description    || '',
                    location:       it.location       || '',
                    condition:      it.condition      || 'GOOD',
                    estimatedValue: it.estimatedValue != null ? String(it.estimatedValue) : '',
                    swapFor:        it.swapFor        || '',
                });
                setExistingImages(it.images || []);
            } catch (e) { setError(e.message || 'İlan yüklenemedi.'); }
            finally { setLoading(false); }
        })();
    }, [id]);

    useEffect(() => () => newPreviews.forEach(URL.revokeObjectURL), [newPreviews]);

    const upd = (k, v) => setForm(p => ({ ...p, [k]: v }));

    const removeExisting = (imgId) => {
        setRemovedIds(p => [...p, imgId]);
        setExistingImages(p => p.filter(i => i.id !== imgId));
    };

    const onPickFiles = async (e) => {
        const list = Array.from(e.target.files || []);
        if (!list.length) return;
        const total = existingImages.length + newFiles.length + list.length;
        if (total > 10) { alert('En fazla 10 fotoğraf ekleyebilirsiniz.'); return; }
        const converted = await Promise.all(list.map(normalizeToJpeg));
        setNewFiles(p => [...p, ...converted]);
        setNewPreviews(p => [...p, ...converted.map(f => URL.createObjectURL(f))]);
        e.target.value = '';
    };

    const removeNew = (idx) => {
        URL.revokeObjectURL(newPreviews[idx]);
        setNewFiles(p => p.filter((_, i) => i !== idx));
        setNewPreviews(p => p.filter((_, i) => i !== idx));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (!form.title.trim()) { setError('Başlık gerekli.'); return; }
        if (!form.categoryId)   { setError('Kategori seçin.');  return; }
        if (existingImages.length + newFiles.length === 0) { setError('En az 1 fotoğraf gerekli.'); return; }

        setSaving(true); setError('');
        try {
            // 1. Metin alanlarını güncelle
            await api.updateItem(id, {
                title:          form.title.trim(),
                categoryId:     form.categoryId,
                description:    form.description.trim() || undefined,
                location:       form.location || undefined,
                condition:      form.condition,
                estimatedValue: form.estimatedValue ? Number(form.estimatedValue) : undefined,
                swapFor:        form.swapFor.trim() || undefined,
            });

            // 2. Silinen fotoğrafları kaldır
            await Promise.all(removedIds.map(imgId => api.deleteItemImage(id, imgId)));

            // 3. Yeni fotoğrafları yükle
            if (newFiles.length > 0) {
                const fd = new FormData();
                newFiles.forEach(f => fd.append('images', f));
                await api.addItemImages(id, fd);
            }

            setSaved(true);
            setTimeout(() => navigate('/ilanlarim'), 1200);
        } catch (ex) {
            setError(ex.message || 'Kaydetme sırasında hata oluştu.');
        } finally { setSaving(false); }
    };

    if (loading) return (
        <div className="min-h-screen bg-[#f5f1ed] flex items-center justify-center gap-3 text-stone-400">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span className="font-serif italic text-sm">İlan yükleniyor…</span>
        </div>
    );

    const totalImages = existingImages.length + newFiles.length;

    return (
        <div className="min-h-screen bg-[#f5f1ed] pb-32">
            <div className="container mx-auto max-w-2xl px-4 md:px-6 py-8">

                {/* Geri */}
                <button onClick={() => navigate('/ilanlarim')} className="flex items-center gap-2 text-stone-400 hover:text-stone-900 transition-colors mb-8 group">
                    <div className="p-2 bg-white rounded-xl shadow-sm group-hover:shadow-md transition-all">
                        <ArrowLeft className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-black tracking-widest uppercase">İlanlarıma Dön</span>
                </button>

                <h1 className="text-3xl md:text-4xl font-serif font-black italic text-stone-900 mb-8">
                    İlanı <span className="text-[#4a2008]">Düzenle</span>
                </h1>

                <form onSubmit={handleSave} className="space-y-6">

                    {/* Fotoğraflar */}
                    <div className="bg-white rounded-2xl border border-stone-100 shadow-xl p-5 space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-sm font-black uppercase tracking-widest text-stone-700">Fotoğraflar</h2>
                            <span className="text-[10px] text-stone-400 font-bold">{totalImages}/10</span>
                        </div>

                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                            {/* Mevcut fotoğraflar */}
                            {existingImages.map(img => (
                                <div key={img.id} className="relative aspect-square rounded-xl overflow-hidden bg-stone-100 group">
                                    <img src={getFullImageUrl(img.imageUrl)} alt="" className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => removeExisting(img.id)}
                                        className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            ))}

                            {/* Yeni eklenmiş fotoğraflar */}
                            {newPreviews.map((src, idx) => (
                                <div key={`new-${idx}`} className="relative aspect-square rounded-xl overflow-hidden bg-stone-100 group">
                                    <img src={src} alt="" className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => removeNew(idx)}
                                        className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                    <div className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-amber-500 text-white text-[9px] font-black rounded-md">YENİ</div>
                                </div>
                            ))}

                            {/* Ekle butonu */}
                            {totalImages < 10 && (
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="aspect-square rounded-xl border-2 border-dashed border-stone-200 flex flex-col items-center justify-center gap-1 text-stone-400 hover:border-amber-400 hover:text-amber-500 transition-all"
                                >
                                    <Plus className="w-5 h-5" />
                                    <span className="text-[9px] font-black uppercase tracking-widest">Ekle</span>
                                </button>
                            )}
                        </div>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            multiple
                            capture="environment"
                            className="hidden"
                            onChange={onPickFiles}
                        />
                    </div>

                    {/* Temel Bilgiler */}
                    <div className="bg-white rounded-2xl border border-stone-100 shadow-xl p-5 space-y-4">
                        <h2 className="text-sm font-black uppercase tracking-widest text-stone-700">Temel Bilgiler</h2>

                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-widest text-stone-500">Başlık *</label>
                            <input
                                value={form.title}
                                onChange={e => upd('title', e.target.value)}
                                placeholder="Ürün adı"
                                maxLength={100}
                                className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-400"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-widest text-stone-500">Kategori *</label>
                            <select
                                value={form.categoryId}
                                onChange={e => upd('categoryId', e.target.value)}
                                className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
                            >
                                <option value="">Kategori seçin…</option>
                                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-widest text-stone-500">Durum</label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                {conditions.map(c => (
                                    <button
                                        key={c.value}
                                        type="button"
                                        onClick={() => upd('condition', c.value)}
                                        className={`py-2.5 px-3 rounded-xl border-2 text-xs font-black transition-all text-left ${form.condition === c.value ? 'border-amber-400 bg-amber-50 text-amber-700' : 'border-stone-100 text-stone-500 hover:border-stone-300'}`}
                                    >
                                        {c.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-widest text-stone-500">Şehir</label>
                            <select
                                value={form.location}
                                onChange={e => upd('location', e.target.value)}
                                className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
                            >
                                <option value="">Seçin…</option>
                                {TURKEY_CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* Detaylar */}
                    <div className="bg-white rounded-2xl border border-stone-100 shadow-xl p-5 space-y-4">
                        <h2 className="text-sm font-black uppercase tracking-widest text-stone-700">Detaylar</h2>

                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-widest text-stone-500">Açıklama</label>
                            <textarea
                                value={form.description}
                                onChange={e => upd('description', e.target.value)}
                                placeholder="Ürün hakkında detaylı bilgi…"
                                rows={4}
                                maxLength={2000}
                                className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-widest text-stone-500">Tahmini Değer (₺)</label>
                            <input
                                type="number"
                                min="0"
                                value={form.estimatedValue}
                                onChange={e => upd('estimatedValue', e.target.value)}
                                placeholder="0"
                                className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-400"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-widest text-stone-500">Bunun Karşılığında Ne İstersin?</label>
                            <input
                                value={form.swapFor}
                                onChange={e => upd('swapFor', e.target.value)}
                                placeholder="örn. Telefon, saat, bisiklet…"
                                maxLength={200}
                                className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-400"
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600 font-medium">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={saving || saved}
                        className="w-full py-4 bg-stone-900 text-white font-black text-sm uppercase tracking-widest rounded-2xl hover:bg-black transition-all shadow-xl flex items-center justify-center gap-2 disabled:opacity-60"
                    >
                        {saved ? (
                            <><CheckCircle2 className="w-5 h-5 text-green-400" /> Kaydedildi!</>
                        ) : saving ? (
                            <><Loader2 className="w-5 h-5 animate-spin" /> Kaydediliyor…</>
                        ) : (
                            'Değişiklikleri Kaydet'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
