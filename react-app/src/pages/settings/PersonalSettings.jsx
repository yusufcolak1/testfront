import React from 'react';
import { ArrowLeft, User, Mail, Phone, MapPin, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PersonalSettings() {
    const navigate = useNavigate();

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
                            E
                        </div>
                        <div className="space-y-0.5 md:space-y-1">
                            <h1 className="text-2xl md:text-4xl font-serif font-black text-stone-900 italic leading-tight">Kişisel Bilgiler</h1>
                            <p className="text-[10px] md:text-sm text-stone-500 font-serif italic">Profilinizi ve iletişim bilgilerinizi güncelleyin.</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] p-4 md:p-8 shadow-2xl shadow-stone-900/5 space-y-4 md:space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            <div className="space-y-1.5 md:space-y-2">
                                <label className="text-[9px] md:text-[10px] font-black tracking-widest text-stone-400 uppercase ml-1 md:ml-2">AD SOYAD</label>
                                <div className="relative">
                                    <User className="absolute left-3.5 md:left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 md:w-4 md:h-4 text-stone-300" />
                                    <input
                                        type="text"
                                        defaultValue="Emre"
                                        className="w-full bg-stone-50 border border-stone-100 rounded-xl md:rounded-2xl py-3 md:py-4 pl-10 md:pl-12 pr-3 md:pr-4 outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/5 transition-all font-bold text-stone-900 text-[13px] md:text-base"
                                    />
                                </div>
                            </div>
                            <div className="space-y-1.5 md:space-y-2">
                                <label className="text-[9px] md:text-[10px] font-black tracking-widest text-stone-400 uppercase ml-1 md:ml-2">TELEFON</label>
                                <div className="relative">
                                    <Phone className="absolute left-3.5 md:left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 md:w-4 md:h-4 text-stone-300" />
                                    <input
                                        type="text"
                                        defaultValue="+90 532 000 00 00"
                                        className="w-full bg-stone-50 border border-stone-100 rounded-xl md:rounded-2xl py-3 md:py-4 pl-10 md:pl-12 pr-3 md:pr-4 outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/5 transition-all font-bold text-stone-900 text-[13px] md:text-base"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-1.5 md:space-y-2">
                            <label className="text-[9px] md:text-[10px] font-black tracking-widest text-stone-400 uppercase ml-1 md:ml-2">E-POSTA ADRESİ</label>
                            <div className="relative">
                                <Mail className="absolute left-3.5 md:left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 md:w-4 md:h-4 text-stone-300" />
                                <input
                                    type="email"
                                    defaultValue="emre@takason.com"
                                    className="w-full bg-stone-50 border border-stone-100 rounded-xl md:rounded-2xl py-3 md:py-4 pl-10 md:pl-12 pr-3 md:pr-4 outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/5 transition-all font-bold text-stone-900 text-[13px] md:text-base"
                                />
                            </div>
                        </div>

                        <button className="w-full bg-stone-900 text-white rounded-xl md:rounded-[1.5rem] py-3.5 md:py-5 font-black tracking-widest uppercase hover:bg-black active:scale-95 transition-all flex items-center justify-center gap-2 md:gap-3 shadow-xl shadow-black/10 text-[9px] md:text-[10px]">
                            <Save className="w-3.5 h-3.5 md:w-4 md:h-4" /> BİLGİLERİ KAYDET
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
