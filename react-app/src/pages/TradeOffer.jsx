import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Zap, Check, Loader2, Package } from 'lucide-react';
import api from '../lib/api';
import { useAuth } from '../contexts/AuthContext';

export default function TradeOffer() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated, user } = useAuth();
    const [target, setTarget] = useState(null);
    const [myItems, setMyItems] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!isAuthenticated) { navigate('/'); return; }
        let cancelled = false;
        (async () => {
            try {
                const [tR, mR] = await Promise.all([api.getItemById(id), api.getMyAds('ACTIVE')]);
                if (cancelled) return;
                setTarget(tR.data?.item || tR.data);
                setMyItems((mR.data || []).filter((it) => it.status === 'ACTIVE'));
            } catch (e) { if (!cancelled) setError(e.message); }
            finally { if (!cancelled) setLoading(false); }
        })();
        return () => { cancelled = true; };
    }, [id, isAuthenticated, navigate]);

    const toggleSel = (itemId) => {
        setSelectedIds((p) => p.includes(itemId) ? p.filter((x) => x !== itemId) : [...p, itemId]);
    };

    const submit = async () => {
        if (!target) return;
        if (target.user.id === user?.id) { alert('Kendi ilanınıza teklif veremezsiniz.'); return; }
        if (selectedIds.length === 0) { alert('En az bir ürününüzü seçmelisiniz.'); return; }
        try {
            setSubmitting(true);
            await api.createTrade({
                receiverId: target.user.id,
                offeredItemIds: selectedIds,
                requestedItemIds: [target.id],
                message: message.trim() || null,
            });
            alert('Takas teklifi gönderildi!');
            navigate('/profil/takaslar');
        } catch (e) { alert(e.message); }
        finally { setSubmitting(false); }
    };

    if (loading) return <div className="min-h-screen bg-[#f5f1ed] flex items-center justify-center text-stone-400"><Loader2 className="w-6 h-6 animate-spin" /></div>;
    if (error || !target) return <div className="min-h-screen bg-[#f5f1ed] flex items-center justify-center text-stone-500">{error || 'İlan bulunamadı.'}</div>;

    return (
        <div className="min-h-screen bg-[#f5f1ed] pb-24">
            <div className="container mx-auto max-w-4xl px-4 md:px-6 pt-6 md:pt-10">
                <Link to={`/ilan/${target.id}`} className="inline-flex items-center gap-2 text-stone-400 hover:text-stone-900 transition-all group mb-6">
                    <div className="p-2 bg-white rounded-xl shadow-sm group-hover:shadow-md"><ArrowLeft className="w-4 h-4" /></div>
                    <span className="text-[10px] font-black tracking-widest uppercase">İLAN DETAYINA DÖN</span>
                </Link>

                <div className="bg-white rounded-[2rem] md:rounded-[3rem] border border-stone-100 p-6 md:p-10 shadow-2xl space-y-8">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-amber-500 flex items-center justify-center shadow-xl">
                            <Zap className="w-6 h-6 text-stone-900" />
                        </div>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-serif font-black text-stone-900 italic leading-none">Takas Teklifi</h1>
                            <p className="text-stone-400 text-xs mt-1 italic">Karşılığında vermek istediğin ürün(ler)i seç.</p>
                        </div>
                    </div>

                    <div className="bg-stone-50 rounded-2xl p-4 md:p-6 flex items-center gap-4">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-stone-200 overflow-hidden shrink-0">
                            {target.images?.[0]?.imageUrl && <img src={target.images[0].imageUrl.startsWith('http') ? target.images[0].imageUrl : `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${target.images[0].imageUrl}`} alt={target.title} className="w-full h-full object-cover" />}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-[10px] font-black text-stone-400 uppercase tracking-widest">İSTEDİĞİN ÜRÜN</div>
                            <div className="text-lg font-serif font-black text-stone-900 truncate italic">{target.title}</div>
                            <div className="text-xs text-stone-500">Sahibi: {target.user.profile?.firstName} {target.user.profile?.lastName}</div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-[10px] font-black text-stone-500 uppercase tracking-widest mb-3">SENİN AKTİF İLANLARIN ({myItems.length})</h3>
                        {myItems.length === 0 ? (
                            <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl text-amber-800 text-sm">
                                Henüz aktif ilanınız yok. Önce <Link to="/ilan-ver" className="font-bold underline">ilan oluşturmalısınız</Link>.
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {myItems.map((it) => {
                                    const sel = selectedIds.includes(it.id);
                                    const img = it.images?.[0]?.imageUrl;
                                    const full = img ? (img.startsWith('http') ? img : `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${img}`) : null;
                                    return (
                                        <button key={it.id} onClick={() => toggleSel(it.id)} type="button" className={`flex items-center gap-3 p-3 rounded-2xl border-2 transition-all text-left ${sel ? 'border-amber-500 bg-amber-50' : 'border-stone-100 bg-white hover:border-stone-300'}`}>
                                            <div className="w-14 h-14 rounded-xl bg-stone-100 overflow-hidden shrink-0">
                                                {full ? <img src={full} alt="" className="w-full h-full object-cover" /> : <Package className="w-6 h-6 m-4 text-stone-300" />}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="font-bold text-stone-900 text-sm truncate">{it.title}</div>
                                                <div className="text-[10px] text-stone-400 uppercase">{it.category?.name}</div>
                                            </div>
                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${sel ? 'bg-amber-500 border-amber-500 text-stone-900' : 'border-stone-300'}`}>
                                                {sel && <Check className="w-3.5 h-3.5" />}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="text-[10px] font-black text-stone-500 uppercase tracking-widest block mb-2">MESAJINIZ (OPSİYONEL)</label>
                        <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="w-full bg-stone-50 border border-stone-200 px-4 py-3 rounded-xl outline-none focus:border-stone-900 text-sm min-h-[100px]" placeholder="Tekliflinin sürecine dair kısa bir not ekleyebilirsin..." />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-stone-100">
                        <button onClick={() => navigate(-1)} className="flex-1 px-6 py-4 rounded-xl bg-stone-100 text-stone-700 font-black text-[10px] tracking-widest uppercase hover:bg-stone-200">VAZGEÇ</button>
                        <button onClick={submit} disabled={submitting || selectedIds.length === 0} className="flex-1 px-6 py-4 rounded-xl bg-stone-900 text-amber-400 font-black text-[10px] tracking-widest uppercase hover:bg-black transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-2">
                            {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                            TEKLİFİ GÖNDER ({selectedIds.length})
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
