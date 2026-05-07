import React, { useEffect, useState } from 'react';
import { ArrowLeft, MapPin, Plus, Trash2, Edit2, X, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../lib/api';

export default function AddressSettings() {
    const navigate = useNavigate();
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(null); // null | 'new' | id
    const [form, setForm] = useState({ title: '', address: '', type: 'HOME', city: '', isDefault: false });

    const load = async () => {
        try {
            const r = await api.getAddresses();
            setAddresses(r.data || []);
        } catch (e) { console.error(e); }
        finally { setLoading(false); }
    };

    useEffect(() => { load(); }, []);

    const startEdit = (addr) => {
        setEditing(addr.id);
        setForm({ title: addr.title, address: addr.address, type: addr.type, city: addr.city || '', isDefault: addr.isDefault });
    };
    const startNew = () => {
        setEditing('new');
        setForm({ title: '', address: '', type: 'HOME', city: '', isDefault: false });
    };
    const cancel = () => { setEditing(null); };
    const save = async () => {
        try {
            if (!form.title || !form.address) return alert('Başlık ve adres gerekli');
            if (editing === 'new') await api.createAddress(form);
            else await api.updateAddress(editing, form);
            setEditing(null);
            await load();
        } catch (e) { alert(e.message); }
    };
    const remove = async (id) => {
        if (!confirm('Adresi silmek istiyor musunuz?')) return;
        try { await api.deleteAddress(id); await load(); } catch (e) { alert(e.message); }
    };

    return (
        <div className="min-h-screen bg-[#f5f1ed] pb-24 px-4 md:px-6 pt-4 md:pt-8">
            <div className="container mx-auto max-w-2xl">
                <button onClick={() => navigate('/profil')} className="flex items-center gap-2 text-stone-400 hover:text-stone-900 transition-colors mb-6 md:mb-12 group">
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
                        <button onClick={startNew} className="w-full md:w-auto p-3.5 md:p-4 bg-stone-900 text-white rounded-xl md:rounded-2xl hover:bg-black transition-all active:scale-90 shadow-xl shadow-black/10 flex items-center justify-center gap-2 md:gap-3">
                            <span className="md:hidden text-[9px] font-black uppercase tracking-widest">YENİ ADRES EKLE</span>
                            <Plus className="w-4 h-4 md:w-6 md:h-6" />
                        </button>
                    </div>

                    {editing && (
                        <div className="bg-white rounded-2xl md:rounded-[2rem] border border-amber-200 p-4 md:p-8 shadow-2xl shadow-stone-900/5 space-y-3">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <input className="bg-stone-50 border border-stone-200 px-4 py-3 rounded-xl text-sm" placeholder="Başlık (örn. EV)" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                                <select className="bg-stone-50 border border-stone-200 px-4 py-3 rounded-xl text-sm" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                                    <option value="HOME">Ev</option>
                                    <option value="WORK">İş</option>
                                    <option value="OTHER">Diğer</option>
                                </select>
                                <input className="bg-stone-50 border border-stone-200 px-4 py-3 rounded-xl text-sm md:col-span-2" placeholder="Adres" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
                                <input className="bg-stone-50 border border-stone-200 px-4 py-3 rounded-xl text-sm" placeholder="Şehir" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
                                <label className="flex items-center gap-2 text-sm">
                                    <input type="checkbox" checked={form.isDefault} onChange={(e) => setForm({ ...form, isDefault: e.target.checked })} />
                                    Varsayılan adres
                                </label>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={save} className="px-4 py-2 bg-stone-900 text-white rounded-xl text-xs font-bold flex items-center gap-2"><Check className="w-4 h-4" /> Kaydet</button>
                                <button onClick={cancel} className="px-4 py-2 bg-stone-100 text-stone-600 rounded-xl text-xs font-bold flex items-center gap-2"><X className="w-4 h-4" /> İptal</button>
                            </div>
                        </div>
                    )}

                    <div className="space-y-3 md:space-y-4">
                        {loading ? (
                            <div className="text-center py-8 text-stone-400 text-sm">Yükleniyor...</div>
                        ) : addresses.length === 0 ? (
                            <div className="text-center py-8 text-stone-400 text-sm">Henüz adres eklemediniz.</div>
                        ) : addresses.map((addr) => (
                            <div key={addr.id} className="bg-white rounded-2xl md:rounded-[2rem] border border-stone-100 p-4 md:p-8 shadow-2xl shadow-stone-900/5 group hover:border-amber-500/30 transition-all">
                                <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 md:gap-6">
                                    <div className="space-y-1.5 md:space-y-2 text-center sm:text-left">
                                        <div className="inline-block px-2.5 md:px-3 py-0.5 md:py-1 bg-stone-50 text-[9px] md:text-[10px] font-black tracking-widest text-stone-400 uppercase rounded-lg border border-stone-100 italic mt-1 md:mt-0">
                                            {addr.title} {addr.isDefault && '⭐'}
                                        </div>
                                        <p className="text-[13px] md:text-lg font-serif italic text-stone-900 leading-relaxed font-medium">
                                            {addr.address}
                                        </p>
                                    </div>
                                    <div className="flex gap-2 shrink-0">
                                        <button onClick={() => startEdit(addr)} className="p-2.5 md:p-3 bg-stone-50 text-stone-400 rounded-lg md:rounded-xl hover:text-stone-900 hover:bg-white transition-all shadow-sm">
                                            <Edit2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                        </button>
                                        <button onClick={() => remove(addr.id)} className="p-2.5 md:p-3 bg-red-50 text-red-400 rounded-lg md:rounded-xl hover:text-red-500 hover:bg-white transition-all shadow-sm">
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
