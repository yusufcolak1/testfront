import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, RefreshCw, Star, Info, ShieldCheck, Box } from 'lucide-react';
import api from '../lib/api';
import { useAuth } from '../contexts/AuthContext';
import { getFullImageUrl } from '../utils/helpers';

export default function Matches() {
    const { itemId } = useParams();
    const [matches, setMatches] = useState([]);
    const [cycles, setCycles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (!isAuthenticated) return;
        
        const fetchData = async () => {
            try {
                setLoading(true);
                // Paralel veri çekme
                const [matchesRes, cyclesRes] = await Promise.all([
                    api.getTradeMatches(itemId),
                    api.getTradeCycles(itemId)
                ]);
                
                setMatches(matchesRes.data?.matches || []);
                setCycles(cyclesRes.data?.cycles || []);
            } catch (err) {
                console.error("Veriler alınamadı:", err);
                setError(err.message || "Veriler yüklenirken bir hata oluştu.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [itemId, isAuthenticated]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#f5f1ed] flex items-center justify-center">
                <RefreshCw className="w-10 h-10 text-[#4a2008] animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#f5f1ed] flex items-center justify-center p-6">
                <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md text-center">
                    <Info className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-stone-900 mb-2">Hata Oluştu</h3>
                    <p className="text-stone-500 mb-6">{error}</p>
                    <Link to="/profil/ilanlarim" className="inline-flex items-center text-sm font-bold bg-[#4a2008] text-white px-6 py-3 rounded-xl">
                        İlanlarıma Dön
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f5f1ed] pb-32">
            {/* Header */}
            <div className="bg-white border-b border-stone-200 sticky top-0 z-30 shadow-sm">
                <div className="container mx-auto px-4 lg:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link to="/profil/ilanlarim" className="p-2 hover:bg-stone-100 rounded-full transition-colors">
                            <ArrowLeft className="w-6 h-6 text-stone-600" />
                        </Link>
                        <div>
                            <h1 className="text-xl font-bold text-stone-900 leading-tight">Akıllı Eşleşmeler</h1>
                            <p className="text-xs text-stone-500">İlanınız için potansiyel takas fırsatları</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 lg:px-8 py-8">
                {/* Information Banner */}
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8 flex gap-4 items-start shadow-sm">
                    <ShieldCheck className="w-8 h-8 text-amber-500 shrink-0" />
                    <div>
                        <h4 className="font-bold text-amber-900 mb-1">TakasMotoru™ devrede</h4>
                        <p className="text-sm text-amber-700 leading-relaxed">
                            Aşağıdaki ilanlar, sizin aradığınız kategorilerle onların aradığı kategorilerin karşılıklı olarak örtüştüğü potansiyel eşleşmelerdir.
                        </p>
                    </div>
                </div>

                {matches.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl border border-stone-100">
                        <div className="w-24 h-24 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <RefreshCw className="w-10 h-10 text-stone-300" />
                        </div>
                        <h3 className="text-2xl font-bold text-stone-900 mb-3">Henüz Eşleşme Yok</h3>
                        <p className="text-stone-500 max-w-md mx-auto mb-8">
                            İlanınıza ve tercihlerinize tam uyan bir ilan şu an için bulunamadı. Lütfen daha sonra tekrar kontrol edin.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {matches.map((match) => {
                            const matchPercentage = match._matchScore ? (match._matchScore * 100).toFixed(0) : 0;
                            const image = match.images?.[0]?.imageUrl ? getFullImageUrl(match.images[0].imageUrl) : null;
                            const userInitial = match.user?.profile?.firstName?.[0]?.toUpperCase() || 'K';

                            return (
                                <Link 
                                    to={`/ilan/${match.id}`} 
                                    key={match.id}
                                    className="bg-white rounded-3xl p-5 border border-stone-100 hover:border-[#4a2008]/30 hover:shadow-xl transition-all group flex flex-col"
                                >
                                    <div className="relative aspect-video rounded-2xl overflow-hidden bg-stone-50 mb-4 shrink-0">
                                        {image ? (
                                            <img src={image} alt={match.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <Box className="w-8 h-8 text-stone-300" />
                                            </div>
                                        )}
                                        <div className="absolute top-3 right-3 bg-[#4a2008] text-white px-3 py-1 rounded-full text-[10px] font-black tracking-widest shadow-lg flex items-center gap-1">
                                            <Star className="w-3 h-3 fill-white" />
                                            %{matchPercentage} Uyum
                                        </div>
                                    </div>

                                    <div className="flex-1 flex flex-col">
                                        <div className="flex justify-between items-start gap-4 mb-2">
                                            <h3 className="font-bold text-stone-900 text-lg leading-tight line-clamp-2 group-hover:text-[#4a2008] transition-colors">
                                                {match.title}
                                            </h3>
                                        </div>

                                        <div className="text-xs font-bold tracking-wider text-stone-400 uppercase mb-4">
                                            {match.category?.name || 'Kategori Yok'}
                                        </div>

                                        {match._breakdown && (
                                            <div className="mt-auto pt-4 border-t border-stone-100 space-y-3">
                                                <div className="space-y-1">
                                                    <div className="flex justify-between text-[9px] font-black tracking-widest uppercase text-stone-500">
                                                        <span>Fiyat Dengesi</span>
                                                        <span className={match._breakdown.fairness > 0.8 ? 'text-green-600' : 'text-amber-600'}>
                                                            {(match._breakdown.fairness * 100).toFixed(0)}%
                                                        </span>
                                                    </div>
                                                    <div className="h-1.5 w-full bg-stone-100 rounded-full overflow-hidden">
                                                        <div 
                                                            className={`h-full rounded-full ${match._breakdown.fairness > 0.8 ? 'bg-green-500' : 'bg-amber-500'}`} 
                                                            style={{ width: `${Math.min(100, Math.max(0, match._breakdown.fairness * 100))}%` }} 
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-1">
                                                    <div className="flex justify-between text-[9px] font-black tracking-widest uppercase text-stone-500">
                                                        <span>Güven Skoru</span>
                                                        <span className={match._breakdown.trust > 0.7 ? 'text-blue-600' : 'text-stone-600'}>
                                                            {(match._breakdown.trust * 100).toFixed(0)}%
                                                        </span>
                                                    </div>
                                                    <div className="h-1.5 w-full bg-stone-100 rounded-full overflow-hidden">
                                                        <div 
                                                            className={`h-full rounded-full ${match._breakdown.trust > 0.7 ? 'bg-blue-500' : 'bg-stone-400'}`} 
                                                            style={{ width: `${Math.min(100, Math.max(0, match._breakdown.trust * 100))}%` }} 
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-[#f5f1ed] text-[#4a2008] font-black flex items-center justify-center text-xs">
                                                    {userInitial}
                                                </div>
                                                <span className="text-sm font-bold text-stone-600">
                                                    {match.user?.profile?.firstName}
                                                </span>
                                            </div>
                                            <div className="w-8 h-8 rounded-full bg-stone-100 group-hover:bg-[#4a2008] flex items-center justify-center transition-colors">
                                                <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-white" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}

                {/* --- Takas Zinciri Fırsatları (3'lü Takas) --- */}
                {cycles.length > 0 && (
                    <div className="mt-16">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-2 bg-[#4a2008] text-white rounded-lg shadow-lg">
                                <RefreshCw className="w-5 h-5 animate-spin-slow" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-stone-900">Takas Zinciri Fırsatları</h2>
                                <p className="text-sm text-stone-500 italic">Birden fazla kişiyle kurulan akıllı takas zincirleri</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {cycles.map((cycle) => (
                                <div key={cycle.id} className="bg-white rounded-[2rem] p-8 border border-stone-100 shadow-xl shadow-stone-900/5 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#4a2008]/5 rounded-bl-[4rem] -mr-8 -mt-8 transition-all group-hover:bg-[#4a2008]/10" />
                                    
                                    <div className="relative space-y-6">
                                        <div className="flex items-center justify-between">
                                            <span className="bg-amber-100 text-amber-700 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">3'lü Takas Zinciri</span>
                                            <div className="flex -space-x-2">
                                                <div className="w-8 h-8 rounded-full bg-stone-900 border-2 border-white flex items-center justify-center text-white text-[10px] font-bold">Siz</div>
                                                <div className="w-8 h-8 rounded-full bg-amber-500 border-2 border-white flex items-center justify-center text-white text-[10px] font-bold">B</div>
                                                <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-white text-[10px] font-bold">C</div>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            {cycle.steps.map((step, idx) => (
                                                <div key={idx} className="flex items-center gap-4 text-sm">
                                                    <div className="shrink-0 w-6 h-6 rounded-full border-2 border-stone-200 flex items-center justify-center text-[10px] font-bold text-stone-400">
                                                        {idx + 1}
                                                    </div>
                                                    <div className="flex-1 text-stone-600">
                                                        <span className="font-bold text-stone-900">{step.from}</span>, {step.give} ürününü verir ve <span className="font-bold text-stone-900">{step.toUser}</span> tarafından {step.take} alır.
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="pt-4 flex gap-3">
                                            <button className="flex-1 bg-[#4a2008] text-white py-3 rounded-xl font-bold text-xs hover:bg-stone-800 transition-colors shadow-lg">
                                                Zinciri Başlat
                                            </button>
                                            <button className="px-4 py-3 bg-stone-100 text-stone-600 rounded-xl font-bold text-xs hover:bg-stone-200 transition-colors">
                                                Detaylar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
