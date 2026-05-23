import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, Shield, Heart, MessageCircle, ArrowRight, Zap, CheckCircle2, ChevronLeft, ChevronRight, ArrowLeft, Eye, Star, Send, ChevronDown, ChevronUp } from 'lucide-react';
import api from '../lib/api';
import { useAuth } from '../contexts/AuthContext';
import { getFullImageUrl } from '../utils/helpers';

// ─── Yıldız Seçici ────────────────────────────────────────────
function StarPicker({ value, onChange }) {
    const [hovered, setHovered] = useState(0);
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
                    <Star className={`w-7 h-7 transition-colors ${(hovered || value) >= s ? 'text-amber-400 fill-amber-400' : 'text-stone-600'}`} />
                </button>
            ))}
        </div>
    );
}

function StarDisplay({ value, size = 'sm' }) {
    const sz = size === 'lg' ? 'w-5 h-5' : 'w-3.5 h-3.5';
    return (
        <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className={`${sz} ${Math.round(value) >= s ? 'text-amber-400 fill-amber-400' : 'text-stone-600'}`} />
            ))}
        </div>
    );
}

export default function AdDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated, user, openLoginModal } = useAuth();
    const [activeImg, setActiveImg] = useState(0);
    const [item, setItem] = useState(null);
    const [similar, setSimilar] = useState([]);
    const [isFavorited, setIsFavorited] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [acting, setActing] = useState(false);
    const [canChat, setCanChat] = useState(null); // null=yükleniyor, true/false
    
    // Soru-Cevap state'leri
    const [questions, setQuestions] = useState([]);
    const [newQuestion, setNewQuestion] = useState('');
    const [answeringId, setAnsweringId] = useState(null);
    const [answerText, setAnswerText] = useState('');

    // Sosyal Yorum state'leri
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    // Ürün Puanlama state'leri
    const [itemReviews, setItemReviews] = useState([]);
    const [itemReviewAvg, setItemReviewAvg] = useState(null);
    const [itemReviewCount, setItemReviewCount] = useState(0);
    const [myItemReview, setMyItemReview] = useState(null);
    const [reviewScore, setReviewScore] = useState(0);
    const [reviewComment, setReviewComment] = useState('');
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [savingReview, setSavingReview] = useState(false);
    const [reviewErr, setReviewErr] = useState('');
    const [reviewsExpanded, setReviewsExpanded] = useState(false);

    const loadItemReviews = useCallback(async () => {
        try {
            const r = await api.getItemReviews(id);
            setItemReviews(r.data.reviews || []);
            setItemReviewAvg(r.data.avg);
            setItemReviewCount(r.data.count);
        } catch { /* silent */ }
        if (isAuthenticated) {
            try {
                const r2 = await api.getMyItemReview(id);
                const rev = r2.data || null;
                setMyItemReview(rev);
                if (rev) { setReviewScore(rev.score); setReviewComment(rev.comment || ''); }
            } catch { /* silent */ }
        }
    }, [id, isAuthenticated]);

    useEffect(() => {
        let cancelled = false;
        setLoading(true); setError(null);
        (async () => {
            try {
                // İlan detay, soru ve yorum isteklerini paralel başlatıyoruz
                const [r, qRes, cRes] = await Promise.all([
                    api.getItemById(id),
                    api.getItemQuestions(id),
                    api.getItemComments(id)
                ]);

                if (cancelled) return;

                const it = r.data?.item || r.data;
                setItem(it);
                setIsFavorited(!!it.isFavorited);
                setQuestions(qRes.data || []);
                setComments(cRes.data?.comments || []);

                // Benzer ilanlar (Kategori id'si geldikten sonra tetiklenir)
                if (it.category?.id) {
                    const sim = await api.getItems({ categoryId: it.category.id, limit: 8 });
                    if (!cancelled) {
                        setSimilar((sim.data?.items || sim.data || []).filter((x) => x.id !== it.id).slice(0, 4));
                    }
                }

            } catch (e) { if (!cancelled) setError(e.message); }
            finally { if (!cancelled) setLoading(false); }
        })();
        loadItemReviews();
        return () => { cancelled = true; };
    }, [id, loadItemReviews]);

    // Takas/mesaj hakkı kontrolü (kendi ilanı değilse) - Auth durumu değiştiğinde yeniden tetiklenmesi için ayrı useEffect
    useEffect(() => {
        let cancelled = false;
        if (isAuthenticated && item?.user?.id && item.user.id !== user?.id) {
            (async () => {
                try {
                    const cc = await api.canChatWith(item.user.id, item.id);
                    if (!cancelled) setCanChat(!!cc.data?.canChat);
                } catch { 
                    if (!cancelled) setCanChat(false); 
                }
            })();
        } else {
            setCanChat(false);
        }
        return () => { cancelled = true; };
    }, [isAuthenticated, user?.id, item?.user?.id, item?.id]);

    const requireAuth = () => {
        if (!isAuthenticated) { openLoginModal(); return false; }
        return true;
    };

    const toggleFav = async () => {
        if (!requireAuth()) return;
        try {
            setActing(true);
            const r = await api.toggleFavorite(id);
            setIsFavorited(!!r.data?.isFavorited);
        } catch (e) { alert(e.message); }
        finally { setActing(false); }
    };

    const startMessage = async () => {
        if (!requireAuth()) return;
        if (item.user.id === user?.id) { alert('Kendi ilanınıza mesaj gönderemezsiniz.'); return; }
        try {
            setActing(true);
            const r = await api.startConversation(item.user.id, item.id);
            navigate(`/mesajlar?room=${r.data.id}`);
        } catch (e) { alert(e.message); }
        finally { setActing(false); }
    };

    const goOffer = () => {
        if (!requireAuth()) return;
        if (item.user.id === user?.id) { alert('Kendi ilanınıza teklif veremezsiniz.'); return; }
        navigate(`/teklif-ver/${item.id}`);
    };

    const handleAskQuestion = async (e) => {
        e.preventDefault();
        if (!requireAuth()) return;
        if (!newQuestion.trim()) return;
        try {
            setActing(true);
            const r = await api.askQuestion(id, newQuestion);
            setQuestions([r.data, ...questions]);
            setNewQuestion('');
        } catch (e) { alert(e.message); }
        finally { setActing(false); }
    };

    const handleAnswerQuestion = async (qId) => {
        if (!answerText.trim()) return;
        try {
            setActing(true);
            const r = await api.answerQuestion(qId, answerText);
            setQuestions(questions.map(q => q.id === qId ? { ...q, answer: r.data.answer } : q));
            setAnsweringId(null);
            setAnswerText('');
        } catch (e) { alert(e.message); }
        finally { setActing(false); }
    };

    const handleAddComment = async (e) => {
        e.preventDefault();
        if (!requireAuth()) return;
        if (!newComment.trim()) return;
        try {
            setActing(true);
            const r = await api.addComment(id, newComment);
            setComments([r.data.comment, ...comments]);
            setNewComment('');
        } catch (e) { alert(e.message); }
        finally { setActing(false); }
    };

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        if (!requireAuth()) return;
        if (!reviewScore) { setReviewErr('Lütfen bir puan seçin.'); return; }
        setSavingReview(true); setReviewErr('');
        try {
            await api.rateItem(id, { score: reviewScore, comment: reviewComment.trim() || undefined });
            setShowReviewForm(false);
            loadItemReviews();
        } catch (ex) { setReviewErr(ex.message || 'Bir hata oluştu.'); }
        finally { setSavingReview(false); }
    };

    if (loading) return <div className="min-h-screen bg-[#f5f1ed] flex items-center justify-center text-stone-400">Yükleniyor…</div>;
    if (error || !item) return <div className="min-h-screen bg-[#f5f1ed] flex items-center justify-center text-stone-500">{error || 'İlan bulunamadı.'}</div>;

    const images = item.images?.length ? item.images.map((im) => getFullImageUrl(im.imageUrl)) : ['https://via.placeholder.com/800x800?text=Görsel+Yok'];
    const ownerName = item.user?.profile ? `${item.user.profile.firstName} ${item.user.profile.lastName || ''}`.trim() : 'Kullanıcı';
    const ownerInitials = ownerName.split(' ').map((s) => s[0]).filter(Boolean).slice(0, 2).join('').toUpperCase();
    const conditionLabel = ({ NEW: 'Sıfır', LIKE_NEW: 'Yeni Gibi', GOOD: 'İyi', FAIR: 'Orta', POOR: 'Kötü' })[item.condition] || item.condition;
    const swapPrefs = (item.swapFor || '').split(',').map((s) => s.trim()).filter(Boolean);

    return (
        <div className="min-h-screen bg-[#f5f1ed] pb-24 lg:pb-40">
            <div className="container mx-auto px-4 md:px-6 py-8">
                <Link to="/" className="inline-flex items-center gap-2 text-stone-400 hover:text-stone-900 transition-all group mb-6 md:mb-8">
                    <div className="p-2 bg-white rounded-lg md:rounded-xl shadow-sm group-hover:bg-[#4a2008] group-hover:text-[#FFF8E7] transition-all">
                        <ArrowLeft className="w-4 h-4" />
                    </div>
                    <span className="text-[9px] md:text-[10px] font-black tracking-widest uppercase italic font-serif">ANA SAYFAYA DÖN</span>
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                    <div className="lg:col-span-6 space-y-3 md:space-y-4">
                        <div className="relative aspect-[9/16] max-h-[85vh] lg:max-h-[700px] w-full rounded-[1.5rem] md:rounded-[2rem] overflow-hidden bg-white shadow-xl shadow-stone-900/10 group">
                            <img src={images[activeImg]} alt={item.title} className="w-full h-full object-cover" />
                            {images.length > 1 && (
                                <>
                                    <button onClick={() => setActiveImg((p) => (p - 1 + images.length) % images.length)} className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 md:p-4 bg-white/90 backdrop-blur-md rounded-xl md:rounded-2xl shadow-xl hover:bg-white transition-all active:scale-95 text-stone-900">
                                        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                                    </button>
                                    <button onClick={() => setActiveImg((p) => (p + 1) % images.length)} className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 md:p-4 bg-white/90 backdrop-blur-md rounded-xl md:rounded-2xl shadow-xl hover:bg-white transition-all active:scale-95 text-stone-900">
                                        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                                    </button>
                                </>
                            )}
                        </div>

                        {images.length > 1 && (
                            <div className="flex gap-2 md:gap-3 overflow-x-auto pb-2 no-scrollbar">
                                {images.map((img, i) => (
                                    <button key={i} onClick={() => setActiveImg(i)} className={`relative w-16 h-16 md:w-20 md:h-20 rounded-xl md:rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${activeImg === i ? 'border-[#4a2008] scale-105 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'}`}>
                                        <img src={img} className="w-full h-full object-cover" alt="" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="lg:col-span-6 space-y-6 md:space-y-8">
                        <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] border border-stone-100 p-6 md:p-8 shadow-xl space-y-6 relative">
                            <div className="space-y-3 md:space-y-4">
                                <div className="flex flex-wrap items-center gap-2">
                                    {item.tag && <span className="px-2.5 py-1 bg-stone-50 rounded-lg text-[8px] md:text-[9px] font-black text-stone-400 uppercase tracking-widest">{item.tag}</span>}
                                    {conditionLabel && <span className="px-2.5 py-1 bg-amber-50 rounded-lg text-[8px] md:text-[9px] font-black text-amber-700 uppercase tracking-widest">{conditionLabel}</span>}
                                    <span className="px-2.5 py-1 bg-stone-50 rounded-lg text-[8px] md:text-[9px] font-black text-stone-400 uppercase tracking-widest flex items-center gap-1"><Eye className="w-3 h-3" /> {item.viewCount || 0}</span>
                                </div>
                                <h1 className="text-2xl md:text-4xl font-serif font-black text-stone-900 leading-tight italic">{item.title}</h1>
                                {item.location && (
                                    <div className="flex items-center gap-2 text-stone-400">
                                        <MapPin className="w-3.5 h-3.5" />
                                        <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest">{item.location}</span>
                                    </div>
                                )}
                                {item.estimatedValue && (
                                    <div>
                                        <div className="text-[10px] md:text-xs font-black text-stone-500 uppercase tracking-widest">
                                            Tahmini değer: <span className="text-[#4a2008] text-base font-serif italic">{item.estimatedValue} ₺</span>
                                        </div>
                                        <p className="mt-1 text-[9px] md:text-[10px] text-stone-400 italic">
                                            Bu değer ilan sahibi tarafından belirlenmiştir; platform bağımsız bir fiyat tespiti yapmamaktadır.
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div className="pt-6 border-t border-stone-50 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    {item.user?.profile?.avatarUrl ? (
                                        <img 
                                            src={getFullImageUrl(item.user.profile.avatarUrl)} 
                                            alt={ownerName} 
                                            className="w-12 h-12 rounded-2xl object-cover shadow-xl"
                                        />
                                    ) : (
                                        <div className="w-12 h-12 rounded-2xl bg-stone-900 flex items-center justify-center text-white font-black italic shadow-xl">{ownerInitials}</div>
                                    )}
                                    <div>
                                        <div className="text-sm font-black text-stone-900 flex items-center gap-1.5">
                                            {ownerName}
                                        </div>
                                        <div className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">{item.user?.profile?.city || '—'}</div>
                                    </div>
                                </div>
                                <button onClick={toggleFav} disabled={acting} className={`p-3 rounded-xl transition-all ${isFavorited ? 'bg-red-50 text-red-500' : 'bg-stone-50 text-stone-400 hover:bg-red-50 hover:text-red-500'}`}>
                                    <Heart className={`w-4 h-4 ${isFavorited ? 'fill-red-500' : ''}`} />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                                <button onClick={goOffer} disabled={acting} className="bg-stone-900 text-white py-4 md:py-5 rounded-xl md:rounded-[1.5rem] font-black text-[9px] md:text-[10px] tracking-widest uppercase hover:bg-black transition-all shadow-xl flex items-center justify-center gap-2">
                                    <Zap className="w-4 h-4 text-amber-400" /> TEKLİF VER
                                </button>

                                {canChat ? (
                                    <button onClick={startMessage} disabled={acting} className="flex items-center justify-center gap-2 border-2 border-stone-100 py-4 md:py-5 rounded-xl md:rounded-[1.5rem] font-black text-[9px] md:text-[10px] tracking-widest text-stone-600 uppercase hover:bg-stone-50 transition-all">
                                        <MessageCircle className="w-4 h-4" /> MESAJ GÖNDER
                                    </button>
                                ) : (
                                    <div className="flex flex-col items-center justify-center gap-1 border-2 border-dashed border-stone-200 py-3 md:py-4 rounded-xl md:rounded-[1.5rem] text-center px-2">
                                        <span className="text-[8px] md:text-[9px] font-black text-stone-400 uppercase tracking-widest flex items-center gap-1">
                                            <MessageCircle className="w-3 h-3" /> MESAJ GÖNDER
                                        </span>
                                        <span className="text-[8px] text-stone-400 italic leading-tight">
                                            Önce takas teklifi gönderin
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {swapPrefs.length > 0 && (
                            <div className="bg-amber-50 rounded-[2.5rem] p-8 border border-amber-100/50 space-y-6">
                                <div className="flex items-center gap-2">
                                    <ArrowRight className="w-5 h-5 text-[#4a2008]" />
                                    <h3 className="text-xs font-black tracking-widest text-[#4a2008] uppercase">TAKASA AÇIK ÜRÜNLER</h3>
                                </div>
                                <div className="space-y-3">
                                    {swapPrefs.map((pref, i) => (
                                        <div key={i} className="flex items-center gap-3 bg-white/60 p-4 rounded-2xl border border-white">
                                            <CheckCircle2 className="w-4 h-4 text-[#4a2008]" />
                                            <span className="text-sm font-bold text-stone-800">{pref}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="px-2 md:px-4 space-y-3 md:space-y-4">
                            <h3 className="text-[10px] md:text-xs font-black tracking-widest text-stone-400 uppercase">İLAN AÇIKLAMASI</h3>
                            <p className="text-stone-600 font-serif leading-relaxed italic text-base md:text-lg whitespace-pre-line">{item.description || 'Açıklama bulunmuyor.'}</p>
                        </div>
                    </div>
                </div>

                {/* --- Soru & Cevap Bölümü --- */}
                <div className="mt-16 bg-white rounded-[2.5rem] border border-stone-100 p-8 md:p-12 shadow-xl">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-[#4a2008] text-white rounded-2xl shadow-lg">
                            <MessageCircle className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-serif font-black text-stone-900 italic">Soru & <span className="text-[#4a2008]">Cevap</span></h2>
                            <p className="text-xs text-stone-400 font-bold uppercase tracking-widest">İlan sahibiyle iletişim kurun</p>
                        </div>
                    </div>

                    {/* Soru Sorma Formu */}
                    {user?.id !== item.userId && (
                        <form onSubmit={handleAskQuestion} className="mb-12">
                            <div className="relative">
                                <textarea
                                    value={newQuestion}
                                    onChange={(e) => setNewQuestion(e.target.value)}
                                    placeholder="Ürün hakkında merak ettiğiniz bir şey var mı?"
                                    className="w-full bg-stone-50 border-2 border-stone-100 rounded-3xl p-6 text-stone-800 placeholder:text-stone-300 focus:border-[#4a2008]/20 focus:ring-0 transition-all resize-none min-h-[120px]"
                                />
                                <button
                                    type="submit"
                                    disabled={acting || !newQuestion.trim()}
                                    className="absolute bottom-4 right-4 bg-[#4a2008] text-white px-8 py-3 rounded-2xl font-black text-[10px] tracking-widest uppercase hover:bg-black transition-all shadow-lg disabled:opacity-50"
                                >
                                    SORU SOR
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Soruların Listesi */}
                    <div className="space-y-8">
                        {questions.length === 0 ? (
                            <div className="text-center py-12 text-stone-300 italic font-serif">
                                Bu ilan için henüz soru sorulmamış.
                            </div>
                        ) : (
                            questions.map((q) => (
                                <div key={q.id} className="space-y-4">
                                    <div className="flex gap-4 items-start">
                                        {q.user?.profile?.avatarUrl ? (
                                            <img 
                                                src={getFullImageUrl(q.user.profile.avatarUrl)} 
                                                alt={q.user.profile.firstName} 
                                                className="w-10 h-10 rounded-xl object-cover shrink-0"
                                            />
                                        ) : (
                                            <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-stone-400 font-black text-xs shrink-0">
                                                {q.user?.profile?.firstName?.[0] || 'K'}
                                            </div>
                                        )}
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-sm font-black text-stone-900">{q.user?.profile?.firstName}</span>
                                                <span className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">
                                                    {new Date(q.createdAt).toLocaleDateString('tr-TR')}
                                                </span>
                                            </div>
                                            <p className="text-stone-600 leading-relaxed">{q.question}</p>
                                        </div>
                                    </div>

                                    {/* Cevap */}
                                    {q.answer ? (
                                        <div className="ml-14 bg-amber-50/50 border border-amber-100/50 rounded-2xl p-6 flex gap-4">
                                            <div className="p-2 bg-amber-100 text-amber-700 rounded-lg h-fit">
                                                <Shield className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <div className="text-[10px] text-amber-700 font-black uppercase tracking-widest mb-1">İLAN SAHİBİNİN CEVABI</div>
                                                <p className="text-stone-800 text-sm leading-relaxed">{q.answer}</p>
                                            </div>
                                        </div>
                                    ) : (
                                        user?.id === item.userId && (
                                            <div className="ml-14 pt-2">
                                                {answeringId === q.id ? (
                                                    <div className="space-y-3">
                                                        <textarea
                                                            value={answerText}
                                                            onChange={(e) => setAnswerText(e.target.value)}
                                                            placeholder="Cevabınızı yazın..."
                                                            className="w-full bg-white border-2 border-amber-100 rounded-2xl p-4 text-sm focus:border-amber-200 focus:ring-0 transition-all resize-none"
                                                        />
                                                        <div className="flex gap-2">
                                                            <button 
                                                                onClick={() => handleAnswerQuestion(q.id)}
                                                                className="bg-amber-500 text-white px-6 py-2 rounded-xl font-black text-[10px] tracking-widest uppercase hover:bg-amber-600 transition-all"
                                                            >
                                                                CEVAPLA
                                                            </button>
                                                            <button 
                                                                onClick={() => setAnsweringId(null)}
                                                                className="text-stone-400 px-4 py-2 font-bold text-[10px] uppercase tracking-widest"
                                                            >
                                                                İPTAL
                                                            </button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <button 
                                                        onClick={() => setAnsweringId(q.id)}
                                                        className="text-amber-600 text-[10px] font-black uppercase tracking-widest hover:underline"
                                                    >
                                                        BU SORUYU CEVAPLA
                                                    </button>
                                                )
                                            }
                                            </div>
                                        )
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* --- Ürün Değerlendirmeleri --- */}
                <div className="mt-12 bg-stone-900 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />
                    <div className="flex items-center gap-4 mb-8 relative z-10">
                        <div className="p-3 bg-white/10 text-white rounded-2xl backdrop-blur-xl border border-white/10">
                            <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-serif font-black text-white italic">
                                Ürün <span style={{ color: '#FFF8E7' }}>Değerlendirmeleri</span>
                            </h2>
                            <p className="text-xs text-stone-400 font-bold uppercase tracking-widest">
                                {itemReviewCount > 0
                                    ? `${itemReviewCount} değerlendirme · Ort. ${itemReviewAvg?.toFixed(1)}/5`
                                    : 'Henüz değerlendirme yok'}
                            </p>
                        </div>
                        {itemReviewAvg !== null && (
                            <div className="ml-auto flex items-center gap-2">
                                <StarDisplay value={itemReviewAvg} size="lg" />
                                <span className="text-2xl font-serif font-black text-white">{itemReviewAvg.toFixed(1)}</span>
                            </div>
                        )}
                    </div>

                    {/* Puan verme alanı */}
                    {isAuthenticated && item?.user?.id !== user?.id && (
                        <div className="mb-8 relative z-10">
                            {!showReviewForm ? (
                                <button
                                    onClick={() => setShowReviewForm(true)}
                                    className="flex items-center gap-2 px-5 py-3 border-2 border-dashed border-amber-500/50 text-amber-400 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-amber-500/10 transition-colors"
                                >
                                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                    {myItemReview ? 'Puanını Düzenle' : 'Bu Ürünü Değerlendir'}
                                </button>
                            ) : (
                                <form onSubmit={handleSubmitReview} className="bg-white/10 border border-white/10 backdrop-blur-md rounded-2xl p-5 space-y-3">
                                    <p className="text-xs font-black uppercase tracking-widest text-stone-300">
                                        {myItemReview ? 'Puanını Güncelle' : 'Değerlendirme Yap'}
                                    </p>
                                    <StarPicker value={reviewScore} onChange={setReviewScore} />
                                    <textarea
                                        value={reviewComment}
                                        onChange={(e) => setReviewComment(e.target.value)}
                                        placeholder="Yorum ekle (isteğe bağlı)…"
                                        rows={2}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-stone-500 font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
                                    />
                                    {reviewErr && <p className="text-red-400 text-xs font-medium">{reviewErr}</p>}
                                    <div className="flex gap-2">
                                        <button
                                            type="submit"
                                            disabled={savingReview || !reviewScore}
                                            className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-stone-900 text-xs font-black uppercase tracking-widest rounded-xl hover:bg-amber-400 transition-colors disabled:opacity-50"
                                        >
                                            <Send className="w-3.5 h-3.5" />
                                            {myItemReview ? 'Güncelle' : 'Gönder'}
                                        </button>
                                        <button type="button" onClick={() => setShowReviewForm(false)} className="px-4 py-2 text-stone-400 text-xs font-black uppercase tracking-widest hover:text-white transition-colors">
                                            İptal
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    )}

                    {/* Kendi verilen puan */}
                    {myItemReview && !showReviewForm && (
                        <div className="flex items-start gap-3 bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 mb-6 relative z-10">
                            <div className="w-8 h-8 rounded-full bg-amber-500 text-stone-900 flex items-center justify-center text-xs font-black shrink-0">
                                {user?.profile?.firstName?.[0] || 'S'}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-xs font-black text-amber-400 uppercase tracking-widest">Sizin Puanınız</span>
                                    <StarDisplay value={myItemReview.score} />
                                </div>
                                {myItemReview.comment && <p className="text-sm text-stone-300 mt-1 leading-relaxed">{myItemReview.comment}</p>}
                            </div>
                        </div>
                    )}

                    {/* Review listesi */}
                    <div className="space-y-4 relative z-10">
                        {itemReviews.length === 0 ? (
                            <p className="text-stone-500 text-sm font-serif italic text-center py-6">Henüz değerlendirme yapılmamış.</p>
                        ) : (
                            <>
                                {(reviewsExpanded ? itemReviews : itemReviews.slice(0, 3)).map((r) => {
                                    const authorName = `${r.author.firstName || ''} ${r.author.lastName || ''}`.trim() || 'Kullanıcı';
                                    const dateStr = new Date(r.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' });
                                    return (
                                        <div key={r.id} className="flex items-start gap-3 py-3 border-b border-white/5 last:border-0">
                                            <div className="w-8 h-8 rounded-full overflow-hidden bg-white/10 shrink-0 flex items-center justify-center text-xs font-black text-white">
                                                {r.author.avatarUrl
                                                    ? <img src={getFullImageUrl(r.author.avatarUrl)} alt={authorName} className="w-full h-full object-cover" />
                                                    : authorName[0]?.toUpperCase()}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <span className="text-xs font-black text-stone-300">{authorName}</span>
                                                    <StarDisplay value={r.score} />
                                                    <span className="text-[10px] text-stone-500">{dateStr}</span>
                                                </div>
                                                {r.comment && <p className="text-sm text-stone-400 mt-1 leading-relaxed italic">{r.comment}</p>}
                                            </div>
                                        </div>
                                    );
                                })}
                                {itemReviews.length > 3 && (
                                    <button
                                        onClick={() => setReviewsExpanded(!reviewsExpanded)}
                                        className="flex items-center gap-1.5 text-xs font-black text-stone-500 uppercase tracking-widest hover:text-amber-400 transition-colors mt-2"
                                    >
                                        {reviewsExpanded ? <><ChevronUp className="w-3.5 h-3.5" /> Gizle</> : <><ChevronDown className="w-3.5 h-3.5" /> Tümünü Gör ({itemReviews.length})</>}
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                </div>

                {/* --- Sosyal Yorumlar Bölümü --- */}
                <div className="mt-12 bg-stone-900 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 blur-[100px] rounded-full"></div>
                    
                    <div className="flex items-center gap-4 mb-8 relative z-10">
                        <div className="p-3 bg-white/10 text-white rounded-2xl backdrop-blur-xl border border-white/10">
                            <Star className="w-6 h-6 text-amber-500" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-serif font-black text-white italic">Sosyal <span style={{ color: '#FFF8E7' }}>Yorumlar</span></h2>
                            <p className="text-xs text-stone-400 font-bold uppercase tracking-widest">Bu ilan hakkında ne düşünüyorlar?</p>
                        </div>
                    </div>

                    <form onSubmit={handleAddComment} className="mb-12 relative z-10">
                        <div className="relative group">
                            <input
                                type="text"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Görüşünüzü belirtin..."
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-6 pr-16 text-white font-serif italic text-sm outline-none focus:border-amber-500/50 transition-all font-bold focus:bg-white/10"
                            />
                            <button
                                type="submit"
                                disabled={acting || !newComment.trim()}
                                className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center text-stone-900 shadow-xl hover:scale-110 active:scale-95 transition-all disabled:opacity-50"
                            >
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </form>

                    <div className="space-y-6 relative z-10 max-h-[400px] overflow-y-auto pr-4 no-scrollbar">
                        {comments.length === 0 ? (
                            <div className="text-center py-12 text-stone-500 italic font-serif">
                                Henüz yorum yapılmamış.
                            </div>
                        ) : (
                            comments.map((c) => (
                                <div key={c.id} className="animate-in slide-in-from-bottom-2 duration-300">
                                    <div className="flex items-center justify-between mb-2 px-1">
                                        <div className="flex items-center gap-2">
                                            {c.user?.profile?.avatarUrl ? (
                                                <img 
                                                    src={getFullImageUrl(c.user.profile.avatarUrl)} 
                                                    alt={c.user?.profile?.firstName} 
                                                    className="w-5 h-5 rounded-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-white font-bold text-[8px] uppercase">
                                                    {(c.user?.profile?.firstName?.[0] || 'K')}
                                                </div>
                                            )}
                                            <span className="text-amber-500 font-black text-[9px] tracking-widest uppercase">@{c.user?.profile?.firstName?.toLowerCase() || 'kullanici'}</span>
                                        </div>
                                        <span className="text-[9px] text-stone-600 font-medium italic font-serif">{new Date(c.createdAt).toLocaleDateString('tr-TR')}</span>
                                    </div>
                                    <p className="text-stone-300 text-sm font-serif italic leading-relaxed bg-white/5 p-4 rounded-2xl border border-white/5">
                                        "{c.content}"
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {similar.length > 0 && (
                    <div className="mt-16 md:mt-24 space-y-8 md:space-y-10">
                        <div className="flex items-center justify-between border-b border-stone-200 pb-4 md:pb-6">
                            <h2 className="text-2xl md:text-3xl font-serif font-black text-stone-900 italic">Benzer <span className="text-[#4a2008]">İlanlar</span></h2>
                            <Link to="/kesfet" className="text-[9px] md:text-[10px] font-black tracking-widest text-stone-400 hover:text-stone-900 uppercase">TÜMÜNE GÖZ AT</Link>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                            {similar.map((it) => {
                                const fullImg = getFullImageUrl(it.images?.[0]?.imageUrl);
                                return (
                                    <Link to={`/ilan/${it.id}`} key={it.id} className="group flex flex-col bg-white rounded-[1.5rem] md:rounded-[2.5rem] p-3 md:p-4 border border-stone-100 shadow-xl hover:-translate-y-2 transition-all duration-500">
                                        <div className="relative aspect-[4/5] rounded-[1.2rem] md:rounded-[2rem] overflow-hidden mb-3 md:mb-6 bg-stone-100">
                                            <img src={fullImg} alt={it.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        </div>
                                        <div className="px-2 pb-2 space-y-3">
                                            <h3 className="text-lg md:text-xl font-serif font-black text-stone-900 group-hover:text-[#4a2008] italic uppercase tracking-tighter truncate">{it.title}</h3>
                                            <div className="flex items-center justify-between text-stone-400">
                                                <div className="flex items-center gap-1.5">
                                                    <MapPin className="w-3.5 h-3.5" />
                                                    <span className="text-[10px] font-bold uppercase tracking-widest truncate">{it.location || '—'}</span>
                                                </div>
                                                <ArrowRight className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
