import React, { useEffect, useState } from 'react';
import { ArrowLeft, Check, X, Clock, RefreshCw, Send, Inbox, Loader2 } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../lib/api';
import { useAuth } from '../../contexts/AuthContext';

const statusBadge = {
    PENDING: { label: 'Beklemede', cls: 'bg-amber-50 text-amber-700 border-amber-200' },
    ACCEPTED: { label: 'Kabul Edildi', cls: 'bg-green-50 text-green-700 border-green-200' },
    REJECTED: { label: 'Reddedildi', cls: 'bg-red-50 text-red-700 border-red-200' },
    CANCELLED: { label: 'İptal Edildi', cls: 'bg-stone-100 text-stone-500 border-stone-200' },
    COMPLETED: { label: 'Tamamlandı', cls: 'bg-blue-50 text-blue-700 border-blue-200' },
};

export default function Trades() {
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth();
    const [trades, setTrades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [tab, setTab] = useState('incoming');
    const [acting, setActing] = useState(false);

    const load = async () => {
        try {
            setLoading(true);
            const r = await api.getMyTrades();
            setTrades(r.data || []);
        } catch (e) { alert(e.message); }
        finally { setLoading(false); }
    };
    useEffect(() => {
        if (!isAuthenticated) { navigate('/'); return; }
        load();
    }, [isAuthenticated]);

    const incoming = trades.filter((t) => t.receiverId === user?.id);
    const outgoing = trades.filter((t) => t.senderId === user?.id);
    const list = tab === 'incoming' ? incoming : outgoing;

    const action = async (id, fn, label) => {
        if (!confirm(`${label}?`)) return;
        try { setActing(true); await fn(id); await load(); } catch (e) { alert(e.message); }
        finally { setActing(false); }
    };

    return (
        <div className="min-h-screen bg-[#f5f1ed] pb-24 px-4 md:px-6 pt-6 md:pt-10">
            <div className="container mx-auto max-w-4xl">
                <button onClick={() => navigate('/profil')} className="flex items-center gap-2 text-stone-400 hover:text-stone-900 transition-colors mb-8 group">
                    <div className="p-2 bg-white rounded-xl shadow-sm"><ArrowLeft className="w-4 h-4" /></div>
                    <span className="text-xs font-black tracking-widest uppercase">Geri Dön</span>
                </button>

                <div className="mb-6 md:mb-10">
                    <h1 className="text-3xl md:text-4xl font-serif font-black text-stone-900 italic mb-1">Takaslarım</h1>
                    <p className="text-xs md:text-sm text-stone-500 italic">Gelen ve gönderdiğin teklifleri yönet.</p>
                </div>

                <div className="bg-white p-1.5 rounded-2xl inline-flex gap-1 mb-6 shadow-sm">
                    <button onClick={() => setTab('incoming')} className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${tab === 'incoming' ? 'bg-stone-900 text-amber-400' : 'text-stone-500 hover:bg-stone-50'}`}>
                        <Inbox className="w-4 h-4" /> Gelen ({incoming.length})
                    </button>
                    <button onClick={() => setTab('outgoing')} className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${tab === 'outgoing' ? 'bg-stone-900 text-amber-400' : 'text-stone-500 hover:bg-stone-50'}`}>
                        <Send className="w-4 h-4" /> Giden ({outgoing.length})
                    </button>
                </div>

                {loading ? (
                    <div className="text-center py-12 text-stone-400"><Loader2 className="w-6 h-6 animate-spin mx-auto" /></div>
                ) : list.length === 0 ? (
                    <div className="bg-white p-12 rounded-2xl text-center text-stone-400">
                        {tab === 'incoming' ? 'Henüz gelen teklif yok.' : 'Henüz teklif göndermediniz.'}
                    </div>
                ) : (
                    <div className="space-y-4">
                        {list.map((t) => {
                            const isReceiver = t.receiverId === user?.id;
                            const partner = isReceiver ? t.sender : t.receiver;
                            const partnerName = partner?.profile ? `${partner.profile.firstName} ${partner.profile.lastName}` : 'Kullanıcı';
                            const offer = t.tradeItems?.filter((ti) => ti.side === 'OFFER').map((ti) => ti.item) || [];
                            const request = t.tradeItems?.filter((ti) => ti.side === 'REQUEST').map((ti) => ti.item) || [];
                            const badge = statusBadge[t.status] || { label: t.status, cls: 'bg-stone-50 text-stone-500' };
                            return (
                                <div key={t.id} className="bg-white rounded-2xl border border-stone-100 p-5 md:p-6 shadow-sm space-y-4">
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-stone-900 text-amber-400 flex items-center justify-center font-black text-xs">
                                                {(partner?.profile?.firstName?.[0] || 'K').toUpperCase()}
                                            </div>
                                            <div>
                                                <div className="font-bold text-stone-900 text-sm">{partnerName}</div>
                                                <div className="text-[10px] text-stone-400 uppercase tracking-widest">{new Date(t.createdAt).toLocaleString('tr-TR')}</div>
                                            </div>
                                        </div>
                                        <span className={`px-2.5 py-1 rounded-lg border text-[9px] font-black uppercase tracking-widest ${badge.cls}`}>{badge.label}</span>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                                        <div className="bg-amber-50 border border-amber-100 rounded-xl p-3">
                                            <div className="text-[9px] font-black text-amber-700 uppercase tracking-widest mb-1">{isReceiver ? 'TEKLİF EDİLEN' : 'SENİN VERDİKLERİN'}</div>
                                            <div className="space-y-1">
                                                {offer.map((it) => it && <Link key={it.id} to={`/ilan/${it.id}`} className="block font-bold text-stone-800 hover:text-amber-700 truncate">• {it.title}</Link>)}
                                            </div>
                                        </div>
                                        <div className="bg-stone-50 border border-stone-100 rounded-xl p-3">
                                            <div className="text-[9px] font-black text-stone-500 uppercase tracking-widest mb-1">{isReceiver ? 'KARŞILIĞINDA İSTENEN' : 'İSTEDİĞİN ÜRÜN'}</div>
                                            <div className="space-y-1">
                                                {request.map((it) => it && <Link key={it.id} to={`/ilan/${it.id}`} className="block font-bold text-stone-800 hover:text-amber-700 truncate">• {it.title}</Link>)}
                                            </div>
                                        </div>
                                    </div>

                                    {t.message && (
                                        <div className="bg-stone-50 rounded-xl p-3 text-sm italic text-stone-600 font-serif">"{t.message}"</div>
                                    )}

                                    {t.status === 'PENDING' && (
                                        <div className="flex flex-wrap gap-2 pt-2 border-t border-stone-100">
                                            {isReceiver ? (
                                                <>
                                                    <button onClick={() => action(t.id, api.acceptTrade.bind(api), 'Teklifi kabul et')} disabled={acting} className="px-4 py-2 bg-green-600 text-white rounded-xl text-xs font-bold flex items-center gap-2 disabled:opacity-50"><Check className="w-3.5 h-3.5" /> KABUL ET</button>
                                                    <button onClick={() => action(t.id, api.rejectTrade.bind(api), 'Teklifi reddet')} disabled={acting} className="px-4 py-2 bg-red-50 text-red-600 rounded-xl text-xs font-bold flex items-center gap-2 disabled:opacity-50"><X className="w-3.5 h-3.5" /> REDDET</button>
                                                </>
                                            ) : (
                                                <button onClick={() => action(t.id, api.cancelTrade.bind(api), 'Teklifi iptal et')} disabled={acting} className="px-4 py-2 bg-stone-100 text-stone-700 rounded-xl text-xs font-bold flex items-center gap-2 disabled:opacity-50"><X className="w-3.5 h-3.5" /> İPTAL ET</button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
