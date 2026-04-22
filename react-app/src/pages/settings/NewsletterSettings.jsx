import React from 'react';
import { ArrowLeft, Mail, Bell, Check, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function NewsletterSettings() {
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
                        <div className="w-12 h-12 md:w-20 md:h-20 rounded-xl md:rounded-3xl bg-amber-500 flex items-center justify-center shadow-xl shadow-amber-500/20 shrink-0">
                            <Bell className="w-5 h-5 md:w-8 md:h-8 text-stone-900" />
                        </div>
                        <div className="space-y-0.5 md:space-y-1">
                            <h1 className="text-2xl md:text-4xl font-serif font-black text-stone-900 italic leading-tight">Bildirimler</h1>
                            <p className="text-[10px] md:text-sm text-stone-500 font-serif italic">Hangi konularda e-posta almak istediğinizi seçin.</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] p-4 md:p-8 shadow-2xl shadow-stone-900/5 space-y-3 md:space-y-4">
                        {[
                            {
                                id: 'campaigns',
                                title: 'Kampanyalar',
                                description: 'Özel indirimler ve fırsatlardan haberdar olun.'
                            },
                            {
                                id: 'offers',
                                title: 'Takas Teklifleri',
                                description: 'İlanlarınıza gelen yeni teklifleri anında görün.'
                            },
                            {
                                id: 'messages',
                                title: 'Mesajlar',
                                description: 'Yeni mesaj aldığınızda e-posta ile bildirim alın.'
                            },
                            {
                                id: 'updates',
                                title: 'Sistem Güncellemeleri',
                                description: 'Platformdaki yenilikler ve güncellemeler hakkında bilgi edinin.'
                            }
                        ].map((setting) => (
                            <div key={setting.id} className="flex flex-row items-start md:items-center justify-between p-3 md:p-4 rounded-xl md:rounded-2xl border border-stone-100 hover:border-amber-500/30 hover:bg-amber-50/10 transition-colors gap-3 md:gap-4">
                                <div className="space-y-0.5 flex-1 min-w-0">
                                    <div className="text-[12px] md:text-sm font-bold text-stone-900 leading-tight">{setting.title}</div>
                                    <div className="text-[9px] md:text-xs text-stone-500 font-serif italic">{setting.description}</div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1 md:mt-0">
                                    <input type="checkbox" className="sr-only peer" defaultChecked />
                                    <div className="w-9 h-5 md:w-11 md:h-6 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-4 after:w-4 md:after:h-5 md:after:w-5 after:transition-all peer-checked:bg-amber-500 hover:after:scale-95"></div>
                                </label>
                            </div>
                        ))}

                        <div className="pt-2 md:pt-4">
                            <button className="w-full bg-stone-900 text-white rounded-xl md:rounded-[1.5rem] py-3.5 md:py-5 font-black tracking-widest uppercase hover:bg-black active:scale-95 transition-all flex items-center justify-center gap-2 md:gap-3 shadow-xl shadow-black/10 text-[9px] md:text-[10px]">
                                <Save className="w-3.5 h-3.5 md:w-4 md:h-4" /> TERCİHLERİ KAYDET
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
}
