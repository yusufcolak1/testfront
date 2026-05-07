import React, { useState, useEffect } from 'react';
import { ArrowLeft, User, Mail, Phone, MapPin, Save, Loader2, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../lib/api';

export default function PersonalSettings() {
    const navigate = useNavigate();
    const { user, checkAuth } = useAuth();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        city: '',
        bio: '',
    });

    useEffect(() => {
        if (user?.profile) {
            setFormData({
                firstName: user.profile.firstName || '',
                lastName: user.profile.lastName || '',
                phone: user.profile.phone || '',
                city: user.profile.city || '',
                bio: user.profile.bio || '',
            });
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            const resp = await api.updateMyProfile(formData);
            if (resp.success) {
                setSuccess(true);
                await checkAuth(); // Global user state'i güncelle
                setTimeout(() => setSuccess(false), 3000);
            } else {
                setError(resp.message || 'Güncelleme başarısız');
            }
        } catch (err) {
            setError(err.message || 'Bir hata oluştu');
        } finally {
            setLoading(false);
        }
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-[#f5f1ed] pb-24 px-4 md:px-6 pt-4 md:pt-8">
            <div className="container mx-auto max-w-2xl">
                {/* Back Button */}
                <button
                    onClick={() => navigate('/profil')}
                    className="flex items-center gap-2 text-stone-400 hover:text-stone-900 transition-colors mb-6 md:mb-12 group"
                >
                    <div className="p-1.5 md:p-2 bg-white rounded-lg md:rounded-xl shadow-sm group-hover:shadow-md transition-all">
                        <ArrowLeft className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    </div>
                    <span className="text-[10px] md:text-xs font-black tracking-widest uppercase">Geri Dön</span>
                </button>

                <div className="space-y-6 md:space-y-8">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-3 md:gap-6 text-center md:text-left mb-4 md:mb-6">
                        <div className="w-12 h-12 md:w-20 md:h-20 rounded-xl md:rounded-3xl bg-amber-500 flex items-center justify-center text-xl md:text-3xl font-black text-stone-900 shadow-xl shadow-amber-500/20 shrink-0">
                            {(formData.firstName[0] || user.email[0]).toUpperCase()}
                        </div>
                        <div className="space-y-0.5 md:space-y-1">
                            <h1 className="text-2xl md:text-4xl font-serif font-black text-stone-900 italic leading-tight">Kişisel Bilgiler</h1>
                            <p className="text-[10px] md:text-sm text-stone-500 font-serif italic">Profilinizi ve iletişim bilgilerinizi güncelleyin.</p>
                        </div>
                    </div>

                    {success && (
                        <div className="bg-green-50 border border-green-100 text-green-700 px-6 py-4 rounded-3xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                            <span className="text-sm font-bold">Bilgileriniz başarıyla güncellendi!</span>
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-50 border border-red-100 text-red-700 px-6 py-4 rounded-3xl flex items-center gap-3">
                            <span className="text-sm font-bold">{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] p-4 md:p-8 shadow-2xl shadow-stone-900/5 space-y-4 md:space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            <div className="space-y-1.5 md:space-y-2">
                                <label className="text-[9px] md:text-[10px] font-black tracking-widest text-stone-400 uppercase ml-1 md:ml-2">AD</label>
                                <div className="relative">
                                    <User className="absolute left-3.5 md:left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 md:w-4 md:h-4 text-stone-300" />
                                    <input
                                        type="text"
                                        value={formData.firstName}
                                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                        className="w-full bg-stone-50 border border-stone-100 rounded-xl md:rounded-2xl py-3 md:py-4 pl-10 md:pl-12 pr-3 md:pr-4 outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/5 transition-all font-bold text-stone-900 text-[13px] md:text-base"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-1.5 md:space-y-2">
                                <label className="text-[9px] md:text-[10px] font-black tracking-widest text-stone-400 uppercase ml-1 md:ml-2">SOYAD</label>
                                <div className="relative">
                                    <User className="absolute left-3.5 md:left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 md:w-4 md:h-4 text-stone-300" />
                                    <input
                                        type="text"
                                        value={formData.lastName}
                                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                        className="w-full bg-stone-50 border border-stone-100 rounded-xl md:rounded-2xl py-3 md:py-4 pl-10 md:pl-12 pr-3 md:pr-4 outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/5 transition-all font-bold text-stone-900 text-[13px] md:text-base"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            <div className="space-y-1.5 md:space-y-2">
                                <label className="text-[9px] md:text-[10px] font-black tracking-widest text-stone-400 uppercase ml-1 md:ml-2">TELEFON</label>
                                <div className="relative">
                                    <Phone className="absolute left-3.5 md:left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 md:w-4 md:h-4 text-stone-300" />
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        placeholder="05XX XXX XX XX"
                                        className="w-full bg-stone-50 border border-stone-100 rounded-xl md:rounded-2xl py-3 md:py-4 pl-10 md:pl-12 pr-3 md:pr-4 outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/5 transition-all font-bold text-stone-900 text-[13px] md:text-base"
                                    />
                                </div>
                            </div>
                            <div className="space-y-1.5 md:space-y-2">
                                <label className="text-[9px] md:text-[10px] font-black tracking-widest text-stone-400 uppercase ml-1 md:ml-2">ŞEHİR</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3.5 md:left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 md:w-4 md:h-4 text-stone-300" />
                                    <input
                                        type="text"
                                        value={formData.city}
                                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                        className="w-full bg-stone-50 border border-stone-100 rounded-xl md:rounded-2xl py-3 md:py-4 pl-10 md:pl-12 pr-3 md:pr-4 outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/5 transition-all font-bold text-stone-900 text-[13px] md:text-base"
                                        placeholder="Şehir adı"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-1.5 md:space-y-2">
                            <label className="text-[9px] md:text-[10px] font-black tracking-widest text-stone-400 uppercase ml-1 md:ml-2">E-POSTA ADRESİ (Salt Okunur)</label>
                            <div className="relative">
                                <Mail className="absolute left-3.5 md:left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 md:w-4 md:h-4 text-stone-300" />
                                <input
                                    type="email"
                                    value={user.email}
                                    disabled
                                    className="w-full bg-stone-100 border border-stone-100 rounded-xl md:rounded-2xl py-3 md:py-4 pl-10 md:pl-12 pr-3 md:pr-4 outline-none opacity-60 font-bold text-stone-900 text-[13px] md:text-base cursor-not-allowed"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5 md:space-y-2">
                            <label className="text-[9px] md:text-[10px] font-black tracking-widest text-stone-400 uppercase ml-1 md:ml-2">BİYOĞRAFİ</label>
                            <textarea
                                value={formData.bio}
                                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                className="w-full bg-stone-50 border border-stone-100 rounded-xl md:rounded-2xl py-3 md:py-4 px-4 outline-none focus:border-amber-500 transition-all font-medium text-stone-700 text-[13px] md:text-base h-32 resize-none"
                                placeholder="Kendinizden bahsedin..."
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-stone-900 text-white rounded-xl md:rounded-[1.5rem] py-3.5 md:py-5 font-black tracking-widest uppercase hover:bg-black active:scale-95 transition-all flex items-center justify-center gap-2 md:gap-3 shadow-xl shadow-black/10 text-[9px] md:text-[10px] disabled:opacity-50"
                        >
                            {loading ? <Loader2 className="w-3.5 h-3.5 md:w-4 md:h-4 animate-spin" /> : <Save className="w-3.5 h-3.5 md:w-4 md:h-4" />}
                            BİLGİLERİ KAYDET
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
