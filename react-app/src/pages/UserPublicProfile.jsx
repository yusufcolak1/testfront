import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, Award, ArrowLeft, Package, RefreshCw, Star, Loader2, ArrowRight, Crown, MessageSquare, Send, ChevronDown, ChevronUp } from 'lucide-react';
import api from '../lib/api';
import { getFullImageUrl } from '../utils/helpers';
import { useAuth } from '../contexts/AuthContext';

// ─── Yıldız Seçici ────────────────────────────────────────────
function StarPicker({ value, onChange, size = 'md' }) {
    const [hovered, setHovered] = useState(0);
    const sz = size === 'lg' ? 'w-8 h-8' : 'w-6 h-6';
    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
                <button
                    key={s}
                    type="button"
                    onMouseEnter={() => setHovered(s)}
                    onMouseLeave={() => setHovered(0)}
                    onClick={() => onChange(s)}
                    className="transition-transform hover:scale-110 focus:outline-none"
                >
                    <Star
                        className={`${sz} transition-colors ${(hovered || value) >= s ? 'text-amber-400 fill-amber-400' : 'text-stone-300'}`}
                    />
                </button>
            ))}
        </div>
    );
}

// ─── Yıldız Görüntüleme ───────────────────────────────────────
function StarDisplay({ value, size = 'sm' }) {
    const sz = size === 'lg' ? 'w-5 h-5' : 'w-3.5 h-3.5';
    return (
        <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
                <Star
                    key={s}
                    className={`${sz} ${Math.round(value) >= s ? 'text-amber-400 fill-amber-400' : 'text-stone-300'}`}
                />
            ))}
        </div>
    );
}

// ─── Puan Formu ───────────────────────────────────────────────
function ReviewForm({ userId, existingReview, onSaved }) {
    const [score, setScore] = useState(existingReview?.score || 0);
    const [comment, setComment] = useState(existingReview?.comment || '');
    const [saving, setSaving] = useState(false);
    const [err, setErr] = useState('');

    const submit = async (e) => {
        e.preventDefault();
        if (!score) { setErr('Lütfen bir puan seçin.'); return; }
        setSaving(true); setErr('');
        try {
            await api.rateUser(userId, { score, comment: comment.trim() || undefined });
            onSaved();
        } catch (ex) {
            setErr(ex.message || 'Bir hata oluştu.');
        } finally { setSaving(false); }
    };

    return (
        <form onSubmit={submit} className="bg-amber-50 border border-amber-200 rounded-2xl p-4 md:p-5 space-y-3">
            <p className="text-xs font-black uppercase tracking-widest text-stone-600">
                {existingReview ? 'Puanını Güncelle' : 'Puan Ver'}
            </p>
            <StarPicker value={score} onChange={setScore} />
            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Yorum ekle (isteğe bağlı)…"
                rows={2}
                className="w-full border border-stone-200 rounded-xl px-3 py-2 text-sm font-medium bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
            />
            {err && <p className="text-red-500 text-xs font-medium">{err}</p>}
            <button
                type="submit"
                disabled={saving || !score}
                className="flex items-center gap-2 px-4 py-2 bg-stone-900 text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-amber-500 hover:text-stone-900 transition-colors disabled:opacity-50"
            >
                {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                {existingReview ? 'Güncelle' : 'Gönder'}
            </button>
        </form>
    );
}

// ─── Ana Bileşen ──────────────────────────────────────────────
export default function UserPublicProfile() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated, user } = useAuth();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Reviews state
    const [reviews, setReviews] = useState([]);
    const [reviewAvg, setReviewAvg] = useState(null);
    const [reviewCount, setReviewCount] = useState(0);
    const [myReview, setMyReview] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [reviewsExpanded, setReviewsExpanded] = useState(false);

    const loadProfile = useCallback(() => {
        api.getUserPublicProfile(id)
            .then((r) => setProfile(r.data))
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false));
    }, [id]);

    const loadReviews = useCallback(async () => {
        try {
            const r = await api.getUserReviews(id);
            setReviews(r.data.reviews || []);
            setReviewAvg(r.data.avg);
            setReviewCount(r.data.count);
        } catch { /* silent */ }
        if (isAuthenticated) {
            try {
                const r2 = await api.getMyUserReview(id);
                setMyReview(r2.data || null);
            } catch { /* silent */ }
        }
    }, [id, isAuthenticated]);

    useEffect(() => {
        setLoading(true);
        loadProfile();
        loadReviews();
    }, [loadProfile, loadReviews]);

    const handleReviewSaved = () => {
        setShowForm(false);
        loadReviews();
    };

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

    const isOwnProfile = user?.id === id;
    const canRate = isAuthenticated && !isOwnProfile;
    const displayedReviews = reviewsExpanded ? reviews : reviews.slice(0, 3);

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
                                    <span className="flex items-center gap-1">
                                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                                        {reviewAvg !== null ? reviewAvg.toFixed(1) : '—'}
                                        {reviewCount > 0 && <span className="text-stone-400">({reviewCount})</span>}
                                    </span>
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

            {/* ─── Kullanıcı Puanları ─────────────────────────────────── */}
            <div className="container mx-auto max-w-5xl px-4 md:px-6 pb-8 md:pb-12">
                <div className="bg-white rounded-3xl border border-stone-100 shadow-xl overflow-hidden">
                    {/* Başlık */}
                    <div className="flex items-center justify-between px-5 md:px-8 py-5 border-b border-stone-100">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-amber-100 rounded-xl flex items-center justify-center">
                                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                            </div>
                            <div>
                                <h2 className="text-base md:text-lg font-serif font-black italic text-stone-900">Değerlendirmeler</h2>
                                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                                    {reviewCount > 0
                                        ? `${reviewCount} değerlendirme · Ort. ${reviewAvg?.toFixed(1)}/5`
                                        : 'Henüz değerlendirme yok'}
                                </p>
                            </div>
                        </div>
                        {reviewAvg !== null && (
                            <div className="flex items-center gap-2">
                                <StarDisplay value={reviewAvg} size="lg" />
                                <span className="text-2xl font-serif font-black text-stone-900">{reviewAvg.toFixed(1)}</span>
                            </div>
                        )}
                    </div>

                    <div className="px-5 md:px-8 py-5 space-y-4">
                        {/* Puan verme butonu / formu */}
                        {canRate && (
                            <div>
                                {!showForm ? (
                                    <button
                                        onClick={() => setShowForm(true)}
                                        className="flex items-center gap-2 px-4 py-2.5 border-2 border-dashed border-amber-300 text-amber-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-amber-50 transition-colors"
                                    >
                                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                        {myReview ? 'Puanını Düzenle' : 'Puan Ver'}
                                    </button>
                                ) : (
                                    <ReviewForm
                                        userId={id}
                                        existingReview={myReview}
                                        onSaved={handleReviewSaved}
                                    />
                                )}
                            </div>
                        )}

                        {/* Kendi puanı varsa ön planda göster */}
                        {myReview && !showForm && (
                            <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-2xl p-4">
                                <div className="w-8 h-8 rounded-full bg-amber-400 text-white flex items-center justify-center text-xs font-black shrink-0">
                                    {user?.profile?.firstName?.[0] || 'S'}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="text-xs font-black text-stone-700">Sizin Puanınız</span>
                                        <StarDisplay value={myReview.score} />
                                    </div>
                                    {myReview.comment && <p className="text-sm text-stone-600 mt-1 leading-relaxed">{myReview.comment}</p>}
                                </div>
                            </div>
                        )}

                        {/* Review listesi */}
                        {reviews.length === 0 && !canRate && (
                            <div className="text-center py-8">
                                <MessageSquare className="w-8 h-8 text-stone-200 mx-auto mb-2" />
                                <p className="text-stone-400 text-sm font-serif italic">Henüz değerlendirme yapılmamış.</p>
                            </div>
                        )}

                        {displayedReviews
                            .filter(r => !myReview || r.score !== myReview.score) // kendi puanı zaten üstte
                            .map((r) => {
                                const authorName = `${r.author.firstName || ''} ${r.author.lastName || ''}`.trim() || 'Kullanıcı';
                                const authorInitial = authorName[0]?.toUpperCase() || 'K';
                                const dateStr = new Date(r.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' });
                                return (
                                    <div key={r.id} className="flex items-start gap-3 py-3 border-b border-stone-100 last:border-0">
                                        <div className="w-8 h-8 rounded-full overflow-hidden bg-stone-200 shrink-0 flex items-center justify-center text-xs font-black text-stone-600">
                                            {r.author.avatarUrl
                                                ? <img src={getFullImageUrl(r.author.avatarUrl)} alt={authorName} className="w-full h-full object-cover" />
                                                : authorInitial}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <span className="text-xs font-black text-stone-700">{authorName}</span>
                                                <StarDisplay value={r.score} />
                                                <span className="text-[10px] text-stone-400">{dateStr}</span>
                                            </div>
                                            {r.comment && <p className="text-sm text-stone-600 mt-1 leading-relaxed">{r.comment}</p>}
                                        </div>
                                    </div>
                                );
                            })}

                        {reviews.length > 3 && (
                            <button
                                onClick={() => setReviewsExpanded(!reviewsExpanded)}
                                className="flex items-center gap-1.5 text-xs font-black text-stone-400 uppercase tracking-widest hover:text-stone-700 transition-colors"
                            >
                                {reviewsExpanded ? <><ChevronUp className="w-3.5 h-3.5" /> Gizle</> : <><ChevronDown className="w-3.5 h-3.5" /> Tümünü Gör ({reviews.length})</>}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
