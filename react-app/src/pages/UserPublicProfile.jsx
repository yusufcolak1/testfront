import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, Award, ArrowLeft, Package, RefreshCw, Star, Loader2, ArrowRight, Crown } from 'lucide-react';
import api from '../lib/api';
import { getFullImageUrl } from '../utils/helpers';

export default function UserPublicProfile() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        api.getUserPublicProfile(id)
            .then((r) => { if (!cancelled) setProfile(r.data); })
            .catch((e) => { if (!cancelled) setError(e.message); })
            .finally(() => { if (!cancelled) setLoading(false); });
        return () => { cancelled = true; };
    }, [id]);

    if (loading) return (
        <div className="min-h-screen bg-[#f5f1ed] flex items-center justify-center gap-3 text-stone-400">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span className="font-serif italic text-sm">Profil yükleniyor…</span>
        </div>
    );
    if (error || !profile) return (
        <div className="min-h-screen bg-[#f5f1ed] flex flex-col items-center justify-center gap-4">
            <p className="text-stone-500 font-serif italic">{error || 'Kullanıcı bulunamadı.'}</p>
            <button onClick={() => navigate(-1)} className="text-xs font-black text-stone-900 uppercase tracking-widest border-b border-stone-900 pb-0.5">Geri Dön</button>
        </div>
    );

    const fullName = `${profile.firstName} ${profile.lastName}`.trim() || 'Kullanıcı';
    const initials = fullName.split(' ').map((s) => s[0]).filter(Boolean).slice(0, 2).join('').toUpperCase();
    const joined = profile.createdAt
        ? new Date(profile.createdAt).toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' })
        : '—';

    return (
        <div className="min-h-screen bg-[#f5f1ed] pb-24">
            {/* Header */}
            <div className={`${profile.isPremium ? 'bg-stone-900' : 'bg-[#8B735B]'} py-6 md:py-10 px-6 rounded-b-[2rem] text-white shadow-2xl relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="container mx-auto max-w-4xl relative z-10">
                    <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-stone-400 hover:text-white transition-all mb-6 font-black text-[9px] uppercase tracking-widest">
                        <ArrowLeft className="w-3.5 h-3.5" /> Geri
                    </button>

                    <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
                        {/* Avatar */}
                        <div className="relative shrink-0">
                            <div className="w-24 h-24 md:w-36 md:h-36 rounded-full border-4 border-white/20 overflow-hidden shadow-2xl">
                                {profile.avatarUrl ? (
                                    <img src={getFullImageUrl(profile.avatarUrl)} alt={fullName} className="w-full h-full object-cover" />
                                ) : (
                                    <div className={`w-full h-full flex items-center justify-center text-3xl md:text-5xl font-black ${profile.isPremium ? 'bg-stone-800 text-amber-500' : 'bg-[#7a6550] text-white'}`}>
                                        {initials}
                                    </div>
                                )}
                            </div>
                            {profile.isPremium && (
                                <div className="absolute -bottom-1 -right-1 bg-amber-500 text-stone-900 p-1.5 md:p-2 rounded-full shadow-lg border-2 border-stone-900">
                                    <Crown className="w-3 h-3 md:w-4 md:h-4" />
                                </div>
                            )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 text-center md:text-left space-y-2 md:space-y-3">
                            <div>
                                <h1 className="text-2xl md:text-4xl font-serif font-black tracking-tight leading-none">{fullName}</h1>
                                <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-2 text-stone-300 text-xs">
                                    {profile.city && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{profile.city}</span>}
                                    <span className="flex items-center gap-1"><Star className="w-3 h-3 text-amber-400" />{profile.score} puan</span>
                                    <span className="flex items-center gap-1"><RefreshCw className="w-3 h-3" />{profile.swapsCompleted} takas</span>
                                </div>
                            </div>
                            {profile.bio && <p className="text-stone-400 italic text-sm leading-relaxed max-w-md mx-auto md:mx-0">{profile.bio}</p>}
                            {profile.medal && (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-[10px] font-black uppercase tracking-widest">
                                    <Award className="w-3 h-3" /> {profile.medal}
                                </span>
                            )}
                        </div>

                        {/* Score box */}
                        <div className="bg-white/10 border border-white/20 backdrop-blur-md p-4 md:p-6 rounded-2xl text-center min-w-[100px] md:min-w-[140px] shadow-xl">
                            <div className="text-stone-400 font-black text-[9px] tracking-widest uppercase mb-1">Aktif İlan</div>
                            <div className="text-3xl md:text-4xl font-serif font-black text-white">{profile.items?.length ?? 0}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Items Grid */}
            <div className="container mx-auto max-w-5xl px-4 md:px-6 py-8 md:py-12">
                <div className="flex items-center justify-between mb-6 md:mb-8">
                    <h2 className="text-xl md:text-2xl font-serif font-black italic text-stone-900">
                        {profile.firstName}'nin <span className="text-[#4a2008]">İlanları</span>
                    </h2>
                    <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">
                        <Package className="w-3.5 h-3.5 inline mr-1" />{profile.items?.length ?? 0} aktif ilan
                    </span>
                </div>

                {!profile.items?.length ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <Package className="w-12 h-12 text-stone-200" />
                        <p className="text-stone-400 font-serif italic">Bu kullanıcının henüz aktif ilanı yok.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                        {profile.items.map((item) => {
                            const img = getFullImageUrl(item.images?.[0]?.imageUrl);
                            return (
                                <Link
                                    key={item.id}
                                    to={`/ilan/${item.id}`}
                                    className="group bg-white rounded-2xl md:rounded-[2rem] p-2 md:p-3 border border-stone-100 shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 flex flex-col"
                                >
                                    <div className="relative aspect-[4/5] rounded-xl md:rounded-[1.5rem] overflow-hidden mb-3 bg-stone-100">
                                        <img src={img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        <div className="absolute inset-x-2 bottom-2 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                            <div className="bg-stone-900 text-amber-400 py-2 rounded-xl font-black text-[8px] tracking-widest uppercase flex items-center justify-center gap-1 shadow-2xl">
                                                İNCELE <ArrowRight className="w-3 h-3" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="px-1 space-y-1">
                                        <span className="text-[8px] font-black text-[#4a2008] uppercase tracking-widest">{item.category?.name || 'GENEL'}</span>
                                        <h3 className="text-sm md:text-base font-serif font-black italic text-stone-900 leading-tight truncate group-hover:text-[#4a2008] transition-colors">{item.title}</h3>
                                        {item.location && (
                                            <div className="flex items-center gap-1 text-stone-400">
                                                <MapPin className="w-2.5 h-2.5" />
                                                <span className="text-[9px] font-bold uppercase tracking-tight">{item.location}</span>
                                            </div>
                                        )}
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
