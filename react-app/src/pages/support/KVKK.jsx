import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, FileText, Lock, Eye, Book, Scale, Bell, ArrowLeft } from 'lucide-react';

export default function KVKK() {
    return (
        <div className="min-h-screen bg-[#f5f1ed] pb-24 md:pb-40">
            <div className="container mx-auto px-4 md:px-6 py-4 md:py-8">
                {/* Back Link */}
                <Link to="/" className="inline-flex items-center gap-2 text-stone-400 hover:text-stone-900 transition-all group mb-4 md:mb-8 leading-none">
                    <div className="p-1.5 md:p-2 bg-white rounded-xl shadow-sm group-hover:bg-[#4a2008] group-hover:text-white transition-all shrink-0">
                        <ArrowLeft className="w-3.5 h-3.5 md:w-4 md:h-4 shrink-0" />
                    </div>
                    <span className="text-[9px] md:text-[10px] font-black tracking-widest uppercase italic font-serif leading-none">ANA SAYFAYA DÖN</span>
                </Link>

                {/* Header Area */}
                <div className="bg-stone-50 py-8 md:py-32 px-4 md:px-6 border border-stone-100 rounded-[1.5rem] md:rounded-[3rem] text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-amber-500/5 blur-[80px] rounded-full"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-stone-900/5 blur-[120px] rounded-full"></div>

                    <div className="relative z-10 max-w-4xl mx-auto space-y-4 md:space-y-8">
                        <span className="px-5 py-2 md:px-6 md:py-2 bg-stone-900 text-white rounded-lg md:rounded-xl text-[8px] md:text-[10px] font-black tracking-widest uppercase leading-none">YASAL BİLGİLENDİRME</span>
                        <h1 className="text-3xl md:text-6xl font-serif font-black text-stone-900 italic tracking-tighter leading-snug md:leading-tight">
                            KVKK Aydınlatma <span className="text-[#4a2008]">Metni</span>
                        </h1>
                        <p className="text-stone-400 font-serif italic text-xs md:text-lg font-medium max-w-2xl mx-auto border-t border-stone-200 pt-5 md:pt-8 mt-4 md:mt-8 leading-relaxed">
                            Verileriniz, TakasOn güvencesi altındadır. Gizliliğiniz ve kişisel verilerinizin korunması bizim için sadece yasal bir zorunluluk değil, bir prensiptir.
                        </p>
                    </div>
                </div>

                <div className="container mx-auto max-w-4xl px-4 md:px-6 -mt-4 md:-mt-10 relative z-20">
                    <div className="bg-white rounded-[1.2rem] md:rounded-[3rem] border border-stone-100 p-4 md:p-12 shadow-2xl shadow-stone-900/5 space-y-6 md:space-y-16">
                        {/* Intro Section */}
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-3 md:gap-8 border-b border-stone-50 pb-4 md:pb-12 text-center md:text-left">
                            <div className="w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-stone-50 flex items-center justify-center shrink-0 text-stone-400">
                                <FileText className="w-4 h-4 md:w-8 md:h-8 shrink-0" />
                            </div>
                            <div className="space-y-1.5 md:space-y-4">
                                <h2 className="text-xl md:text-2xl font-serif font-black text-stone-900 italic leading-tight">Genel Bilgilendirme</h2>
                                <p className="text-stone-500 font-medium leading-[1.8] text-[11px] md:text-sm">
                                    6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) uyarınca, veri sorumlusu sıfatıyla TakasOn (“Platform”), kişisel verilerinizi aşağıda açıklanan kapsamda ve mevzuata uygun şekilde işleyebilecektir.
                                </p>
                            </div>
                        </div>

                        {/* Matrix Grid of Principles */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12">
                            <div className="space-y-3 md:space-y-6">
                                <div className="flex items-center justify-center md:justify-start gap-3 text-[#4a2008]">
                                    <Lock className="w-4 h-4 md:w-5 md:h-5 shrink-0" />
                                    <h3 className="text-[10px] md:text-xs font-black tracking-widest uppercase leading-none">VERİ GÜVENLİĞİ</h3>
                                </div>
                                <p className="text-stone-500 text-[11px] md:text-sm leading-relaxed font-serif italic border-l-4 border-[#4a2008]/10 pl-4 md:pl-6 text-center md:text-left">
                                    Verileriniz, son teknoloji şifreleme yöntemleri ile sunucularımızda saklanır ve yetkisiz erişimlere karşı sürekli denetlenir.
                                </p>
                            </div>
                            <div className="space-y-3 md:space-y-6">
                                <div className="flex items-center justify-center md:justify-start gap-3 text-stone-400">
                                    <Eye className="w-4 h-4 md:w-5 md:h-5 shrink-0" />
                                    <h3 className="text-[10px] md:text-xs font-black tracking-widest uppercase leading-none">ŞEFFAFLIK</h3>
                                </div>
                                <p className="text-stone-500 text-[11px] md:text-sm leading-relaxed font-serif italic border-l-4 border-stone-100 pl-4 md:pl-6 text-center md:text-left">
                                    Hangi veriyi niçin topladığımızı ve kimlerle paylaştığımızı her zaman kontrol panelinizden görüntüleyebilirsiniz.
                                </p>
                            </div>
                        </div>

                        {/* Detailed Legal Text Blocks */}
                        <div className="space-y-4 md:space-y-12">
                            <section className="space-y-3 md:space-y-6 p-4 md:p-8 bg-stone-50 rounded-[1rem] md:rounded-[2rem] border border-stone-100">
                                <h3 className="text-[15px] md:text-lg font-serif font-black text-stone-900 italic flex items-center justify-center md:justify-start gap-2.5 md:gap-3 leading-tight">
                                    <Book className="w-4 h-4 md:w-5 md:h-5 text-stone-400 shrink-0" />
                                    1. Veri Sorumlusunun Kimliği
                                </h3>
                                <p className="text-stone-500 text-[11px] md:text-sm leading-relaxed text-center md:text-left">
                                    TakasOn Platformu, KVKK uyarınca "Veri Sorumlusu" sıfatına haiz olup; iletişim bilgilerimiz sayfanın en altında yer almaktadır. Veri koruma görevlimize her zaman ulaşabilirsiniz.
                                </p>
                            </section>

                            <section className="space-y-3 md:space-y-6 px-1 md:px-4">
                                <h3 className="text-[15px] md:text-lg font-serif font-black text-stone-900 italic flex items-center justify-center md:justify-start gap-2.5 md:gap-3 border-b border-stone-100 pb-2 md:pb-4 leading-tight">
                                    2. İşleme Amaçları
                                </h3>
                                <ul className="space-y-2 md:space-y-4 list-disc pl-6 md:pl-8 text-stone-500 text-[11px] md:text-sm leading-relaxed font-medium">
                                    <li>Hizmetlerimizin sunulması ve üyelik süreçlerinin yönetilmesi</li>
                                    <li>İlan yayınlama ve mesajlaşma servislerinin güvenliğinin sağlanması</li>
                                    <li>Kullanıcı deneyiminin iyileştirilmesi ve kişiselleştirilmiş teklifler sunulması</li>
                                    <li>Yasal yükümlülüklerin yerine getirilmesi</li>
                                </ul>
                            </section>

                            <section className="space-y-3 md:space-y-6 p-4 md:p-8 bg-[#4a2008]/5 rounded-[1rem] md:rounded-[2rem] border border-[#4a2008]/10">
                                <h3 className="text-[15px] md:text-lg font-serif font-black text-stone-900 italic flex items-center justify-center md:justify-start gap-2.5 md:gap-3 leading-tight">
                                    <Bell className="w-4 h-4 md:w-5 md:h-5 text-[#4a2008] shrink-0" />
                                    Haklarınız Nelerdir?
                                </h3>
                                <p className="text-stone-500 text-[11px] md:text-sm leading-relaxed text-center md:text-left">
                                    KVKK’nın 11. maddesi uyarınca; verilerinizin işlenip işlenmediğini öğrenme, yanlış işlenmişse düzeltilmesini isteme ve verilerinizin silinmesini talep etme hakkına sahipsiniz.
                                </p>
                            </section>
                        </div>

                        <div className="pt-12 text-center text-[10px] font-black tracking-widest text-stone-300 uppercase italic">
                            SON GÜNCELLEME: 26 MART 2026
                        </div>
                    </div>

                    {/* Return Button */}
                    <div className="mt-12 text-center">
                        <Link to="/" className="px-10 py-4 border-2 border-stone-200 rounded-2xl text-[10px] font-black tracking-widest text-stone-400 hover:border-stone-900 hover:text-stone-900 transition-all uppercase inline-block">
                            ANA SAYFAYA DÖN
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
