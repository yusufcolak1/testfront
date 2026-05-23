import React, { useEffect, useState } from 'react';
import { Trophy, Users, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../lib/api';
import { useAuth } from '../contexts/AuthContext';
import { getFullImageUrl } from '../utils/helpers';

// Podyum sırası: 1. Orta, 2. Sağ, 3. Sol
const PODIUM_ORDER = [1, 0, 2]; // index in topTraders

function Avatar({ name, avatarUrl, size = 'md', isMe = false }) {
    const sizeClasses = {
        sm: 'w-6 h-6 md:w-10 md:h-10 text-[7px] md:text-[10px]',
        md: 'w-8 h-8 md:w-20 md:h-20 text-[10px] md:text-xl',
        lg: 'w-10 h-10 md:w-16 md:h-16 text-sm md:text-2xl',
    };
    const initials = name ? name.split(' ').map(n => n[0]).join('').slice(0, 2) : '?';
    return (
        <div className={`${sizeClasses[size]} rounded-full flex items-center justify-center font-serif font-black text-stone-900 border-2 md:border-4 shadow-inner overflow-hidden shrink-0 transition-transform duration-500 group-hover:scale-105 ${isMe ? 'border-amber-400 bg-amber-100' : 'border-white bg-stone-100'}`}>
            {avatarUrl ? (
                <img src={getFullImageUrl(avatarUrl)} alt={name} className="w-full h-full object-cover" />
            ) : initials}
        </div>
    );
}

function RankBadge({ rank }) {
    if (rank === 1) return <span className="text-xl md:text-4xl">🥇</span>;
    if (rank === 2) return <span className="text-xl md:text-4xl">🥈</span>;
    if (rank === 3) return <span className="text-xl md:text-4xl">🥉</span>;
    return (
        <span className="text-xs md:text-xl font-serif text-stone-300 italic">
            {rank < 10 ? `0${rank}` : rank}
        </span>
    );
}

// ------------------------------------------------------------------
// Ana bileşen
// ------------------------------------------------------------------
export default function Leaderboard() {
    const [topTraders, setTopTraders] = useState([]);
    const [me, setMe] = useState(null);
    const [totalUsers, setTotalUsers] = useState(0);
    const { isAuthenticated, user, openLoginModal } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                const r = await api.getLeaderboard(50);
                if (cancelled) return;
                setTopTraders((r.data || []).map(u => ({
                    rank: u.rank,
                    name: u.fullName || u.name,
                    swaps: u.swaps,
                    score: u.score,
                    medal: u.medal,
                    bio: u.bio,
                    avatarUrl: u.avatarUrl,
                    isMe: u.isMe,
                })));
                setMe(r.me || null);
                setTotalUsers(r.totalUsers || 0);
            } catch (e) { console.error(e); }
            finally { if (!cancelled) setLoading(false); }
        })();
        return () => { cancelled = true; };
    }, [isAuthenticated]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#f5f1ed] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Trophy className="w-12 h-12 text-amber-500 animate-pulse" />
                    <p className="text-stone-400 font-serif italic text-sm uppercase tracking-widest">Sıralamalar Yükleniyor...</p>
                </div>
            </div>
        );
    }

    const podium = PODIUM_ORDER.map(i => topTraders[i]).filter(Boolean);
    const restList = topTraders.slice(3);

    return (
        <div className="min-h-screen bg-[#f5f1ed] pb-24">
            <div className="container mx-auto px-4 md:px-6 max-w-6xl">

                {/* Header */}
                <div className="flex flex-col md:flex-row items-center justify-between pt-4 md:pt-10 mb-4 md:mb-10 border-b border-stone-200 pb-4 md:pb-8 gap-3 md:gap-6 text-center md:text-left">
                    <div className="flex flex-col md:flex-row items-center gap-2 md:gap-5">
                        <div className="w-8 h-8 md:w-12 md:h-12 rounded-[0.8rem] md:rounded-[1.2rem] bg-stone-900 border border-stone-800 flex items-center justify-center shadow-lg rotate-3 shrink-0">
                            <Trophy className="w-4 h-4 md:w-6 md:h-6 text-amber-400" />
                        </div>
                        <div className="space-y-0.5 md:space-y-1">
                            <h1 className="text-xl md:text-4xl font-serif text-stone-900 tracking-tighter italic font-black leading-none">
                                Takas <span className="italic">Liderleri</span>
                            </h1>
                            <p className="text-[9px] md:text-xs text-stone-400 font-serif italic">Bölgenin en aktif ve güvenilir takasçıları.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 px-4 md:px-6 py-1.5 md:py-2 bg-white rounded-full border border-stone-100 shadow-sm">
                        <Users className="w-3 h-3 md:w-4 md:h-4 text-stone-400" />
                        <span className="text-[8px] md:text-[10px] font-black tracking-widest uppercase text-stone-900">
                            {totalUsers > 0 ? `${totalUsers}` : '—'} Aktif Üye
                        </span>
                    </div>
                </div>

                {/* Top 3 Podium */}
                {topTraders.length >= 3 && (
                    <div className="grid grid-cols-3 gap-2 md:gap-8 mb-6 md:mb-12 items-end">
                        {podium.map((t, pIdx) => {
                            const isFirst = t.rank === 1;
                            const orderClass = pIdx === 0 ? 'order-2' : pIdx === 1 ? 'order-3' : 'order-1';
                            return (
                                <div key={t.rank}
                                    className={`group relative bg-[#fbfaf8] border p-2 md:p-8 rounded-[1rem] md:rounded-[2.5rem] transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 flex flex-col items-center text-center
                                    ${orderClass}
                                    ${isFirst ? 'md:h-[460px] shadow-2xl border-amber-200/50' : 'md:h-[400px] shadow-sm border-stone-100'}
                                    ${t.isMe ? 'ring-2 ring-amber-400' : ''}`}>

                                    {isFirst && (
                                        <div className="absolute -top-2 md:-top-4 bg-stone-900 text-amber-400 px-2 md:px-5 py-0.5 md:py-2 rounded-full text-[5px] md:text-[9px] font-black tracking-widest md:tracking-[0.2em] shadow-xl whitespace-nowrap">
                                            HAFTANIN LİDERİ
                                        </div>
                                    )}
                                    {t.isMe && (
                                        <div className="absolute -top-2 md:-top-4 right-2 bg-amber-400 text-stone-900 px-2 py-0.5 rounded-full text-[5px] md:text-[8px] font-black tracking-widest shadow-lg whitespace-nowrap">
                                            SEN
                                        </div>
                                    )}

                                    <div className="text-xl md:text-4xl mb-1 md:mb-4">{t.medal || <RankBadge rank={t.rank} />}</div>

                                    <Avatar name={t.name} avatarUrl={t.avatarUrl} size="md" isMe={t.isMe} />

                                    <h4 className="font-serif text-[8px] md:text-2xl text-stone-900 mb-0.5 md:mb-1 leading-none truncate w-full mt-1.5 md:mt-4">{t.name}</h4>
                                    <p className="text-[5px] md:text-[10px] text-stone-400 font-bold tracking-widest uppercase mb-1.5 md:mb-4 italic truncate w-full px-1 md:px-4 leading-none">{t.bio}</p>

                                    <div className="flex flex-col gap-1 md:gap-2 w-full mt-auto pt-1 md:pt-4 border-t border-stone-100">
                                        <div className="flex justify-between items-center bg-stone-50/50 px-1.5 md:px-4 py-1 md:py-2 rounded-[0.4rem] md:rounded-xl">
                                            <span className="text-[5px] md:text-[9px] font-black text-stone-400 uppercase tracking-widest font-sans">Takas</span>
                                            <span className="text-[9px] md:text-base font-black text-stone-900">{t.swaps}</span>
                                        </div>
                                        <div className="flex justify-between items-center bg-stone-900 px-1.5 md:px-4 py-1 md:py-3 rounded-[0.4rem] md:rounded-xl shadow-lg shadow-stone-900/10">
                                            <span className="text-[5px] md:text-[9px] font-black text-stone-500 uppercase tracking-widest font-sans">Skor</span>
                                            <span className="text-[10px] md:text-lg font-black text-amber-400 italic font-serif leading-none">{t.score}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Kullanıcının kendi sırası — sadece giriş yapanlara */}
                {isAuthenticated ? (
                    <div className="flex flex-col md:flex-row items-center justify-between bg-stone-900 p-4 md:p-8 rounded-[1rem] md:rounded-[2rem] mb-6 md:mb-12 shadow-2xl shadow-stone-900/10 relative overflow-hidden gap-3 md:gap-6 text-center md:text-left">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
                        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 relative z-10 w-full md:w-auto">
                            <div className="w-10 h-10 md:w-16 md:h-16 rounded-lg md:rounded-2xl bg-amber-400 flex items-center justify-center font-black text-stone-900 shadow-xl shadow-amber-400/20 shrink-0 overflow-hidden">
                                {me?.avatarUrl ? (
                                    <img src={getFullImageUrl(me.avatarUrl)} alt="Sen" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-sm md:text-2xl font-serif">{me?.name?.[0] || user?.profile?.firstName?.[0] || '?'}</span>
                                )}
                            </div>
                            <div>
                                <div className="text-[8px] md:text-[10px] font-black text-amber-400/60 uppercase tracking-widest leading-none mb-1">SENİN SIRALAMAN</div>
                                {me ? (
                                    <h3 className="text-lg md:text-3xl font-serif text-white font-black leading-none italic">{me.rank}. Sıradasın</h3>
                                ) : (
                                    <h3 className="text-lg md:text-3xl font-serif text-white font-black leading-none italic">Henüz Sırada Değilsin</h3>
                                )}
                                {me && <p className="text-[9px] md:text-xs text-stone-400 mt-1 font-serif italic">{me.swaps} takas · {me.score} puan</p>}
                            </div>
                        </div>
                        <div className="flex flex-col items-center md:items-end relative z-10 w-full md:w-auto pt-2 md:pt-0 border-t border-white/10 md:border-transparent mt-1 md:mt-0">
                            <div className="text-[8px] md:text-[10px] font-black text-stone-400 uppercase tracking-widest leading-none mb-1">LİSTEYE GİRMEK İÇİN</div>
                            <div className="text-base md:text-xl font-serif text-amber-400 font-bold italic">Daha fazla takas yap!</div>
                        </div>
                    </div>
                ) : (
                    /* Giriş yapmamış → kendi sırası yok, giriş teşvik kartı */
                    <div className="flex flex-col md:flex-row items-center justify-between bg-stone-900 p-4 md:p-8 rounded-[1rem] md:rounded-[2rem] mb-6 md:mb-12 shadow-2xl relative overflow-hidden gap-3 md:gap-6 text-center md:text-left">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
                        <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6 relative z-10">
                            <div className="w-10 h-10 md:w-16 md:h-16 rounded-lg md:rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                                <Trophy className="w-5 h-5 md:w-8 md:h-8 text-amber-400" />
                            </div>
                            <div>
                                <div className="text-[8px] md:text-[10px] font-black text-amber-400/60 uppercase tracking-widest leading-none mb-1">SENİN SIRALAMAN</div>
                                <h3 className="text-lg md:text-3xl font-serif text-white font-black leading-none italic">Sıralaman Yok</h3>
                                <p className="text-[9px] md:text-xs text-stone-400 mt-1 font-serif italic">Sıralamana girmek için giriş yapman gerekiyor.</p>
                            </div>
                        </div>
                        <button
                            onClick={openLoginModal}
                            className="relative z-10 w-full md:w-auto bg-amber-400 text-stone-900 px-6 md:px-10 py-3 md:py-4 rounded-xl md:rounded-2xl font-black text-[9px] md:text-[10px] tracking-widest uppercase shadow-xl hover:bg-white hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 shrink-0"
                        >
                            <LogIn className="w-4 h-4" />
                            GİRİŞ YAP VE SIRANI GÖR
                        </button>
                    </div>
                )}

                {/* Sıralama Tablosu (4. sıradan itibaren) */}
                {restList.length > 0 && (
                    <div className="bg-[#fbfaf8] border border-stone-100 rounded-[1rem] md:rounded-[2.5rem] shadow-xl overflow-hidden mb-8 md:mb-12 shadow-stone-900/5">
                        <div className="bg-stone-50/50 px-3 md:px-8 py-3 md:py-6 border-b border-stone-100">
                            <div className="grid grid-cols-12 text-[7px] md:text-[9px] font-black text-stone-400 uppercase tracking-[0.1em] md:tracking-widest leading-none font-sans italic">
                                <div className="col-span-1">#</div>
                                <div className="col-span-8 md:col-span-7 pl-1 md:pl-0">PROFİL</div>
                                <div className="hidden md:block col-span-2 text-center">TAKAS</div>
                                <div className="col-span-3 md:col-span-2 text-right">SKOR</div>
                            </div>
                        </div>

                        <div className="divide-y divide-stone-100">
                            {restList.map((t) => (
                                <div key={t.rank}
                                    className={`group grid grid-cols-12 items-center px-3 md:px-8 py-2 md:py-6 transition-all cursor-pointer border-l-2 md:border-l-4
                                    ${t.isMe
                                        ? 'bg-amber-50 border-l-amber-400 hover:bg-amber-100'
                                        : 'hover:bg-white border-l-transparent hover:border-l-[#4a2008]'}`}>
                                    <div className="col-span-1 flex items-center">
                                        <RankBadge rank={t.rank} />
                                    </div>
                                    <div className="col-span-8 md:col-span-7 flex items-center gap-2 md:gap-4 pl-1 md:pl-0">
                                        <div className={`w-6 h-6 md:w-10 md:h-10 rounded-[0.4rem] md:rounded-xl flex items-center justify-center text-[7px] md:text-[10px] font-black border overflow-hidden transition-all duration-300 shrink-0
                                            ${t.isMe
                                                ? 'bg-amber-400 text-stone-900 border-amber-400'
                                                : 'bg-stone-100 text-stone-500 border-stone-200 group-hover:bg-stone-900 group-hover:text-amber-400'}`}>
                                            {t.avatarUrl ? (
                                                <img src={getFullImageUrl(t.avatarUrl)} alt={t.name} className="w-full h-full object-cover" />
                                            ) : (
                                                t.name.split(' ').map(n => n[0]).join('').slice(0, 2)
                                            )}
                                        </div>
                                        <div className="flex flex-col min-w-0 pr-2 md:pr-0">
                                            <span className={`text-[10px] md:text-base font-serif leading-none md:leading-tight truncate ${t.isMe ? 'text-amber-700 font-black' : 'text-stone-900'}`}>
                                                {t.name} {t.isMe && <span className="text-[8px] font-black bg-amber-400 text-stone-900 px-1.5 py-0.5 rounded-full ml-1">SEN</span>}
                                            </span>
                                            <span className="text-[6px] md:text-[9px] font-bold text-stone-400 uppercase tracking-widest font-sans mt-0.5">
                                                {t.medal || 'Onaylı Üye'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="hidden md:block col-span-2 text-center">
                                        <span className="px-3 py-1 bg-stone-50 rounded-full text-xs font-black text-stone-600 font-sans">{t.swaps}</span>
                                    </div>
                                    <div className="col-span-3 md:col-span-2 text-right">
                                        <span className={`text-xs md:text-lg font-black font-serif italic ${t.isMe ? 'text-amber-600' : 'text-stone-900'}`}>
                                            {t.score}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {topTraders.length === 0 && (
                    <div className="flex flex-col items-center py-24 gap-4 opacity-40">
                        <Trophy className="w-16 h-16 text-stone-300" />
                        <p className="text-stone-400 font-serif italic">Henüz sıralamaya girecek veri yok.</p>
                    </div>
                )}

                {/* CTA Footer */}
                <div className="bg-stone-900 text-white p-6 md:p-12 rounded-[1.5rem] md:rounded-[3rem] relative overflow-hidden shadow-3xl shadow-stone-900/20">
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-10">
                        <div className="flex-1 space-y-2 md:space-y-4 text-center md:text-left">
                            <h3 className="text-xl md:text-4xl font-serif tracking-tighter italic leading-none">
                                Sende Bu Listeye <span className="italic text-amber-400">Girebilirsin!</span>
                            </h3>
                            <p className="text-[9px] md:text-sm text-stone-400 font-serif italic leading-tight">
                                Takas yaptıkça puan kazan, rozetleri topla ve saygınlık kazan.
                            </p>
                        </div>
                        <Link
                            to="/ilan-ver"
                            className="w-full md:w-auto bg-amber-400 text-stone-900 px-6 md:px-12 py-3.5 md:py-5 rounded-xl md:rounded-2xl font-black text-[9px] md:text-[10px] tracking-widest uppercase hover:bg-white transition-all shadow-xl hover:scale-105 active:scale-95 text-center shrink-0"
                        >
                            HEMEN İLAN VER
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
}
