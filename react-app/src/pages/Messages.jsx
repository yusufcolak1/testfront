import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Send, MessageSquare, User, Search, MoreVertical, Paperclip, Smile, ShieldCheck } from 'lucide-react';

export default function Messages() {
    const [searchParams] = useSearchParams();
    const targetUser = searchParams.get('u');
    const [showChatMobile, setShowChatMobile] = React.useState(!!targetUser);

    const conversations = [
        { id: 1, user: 'Burak', msg: 'Gitar hala duruyor mu?', time: '14:20', unread: 2, initials: 'B', online: true },
        { id: 2, user: 'Ayşe', msg: 'Bisiklet için iPhone 11 ile takas düşünür müsün?', time: 'Dün', unread: 0, initials: 'A', online: false },
        { id: 3, user: 'Can', msg: 'Tamamdır, yarın görüşürüz.', time: '2 gün önce', unread: 0, initials: 'C', online: true },
        { id: 4, user: 'Deniz', msg: 'Konum atabilir misin?', time: 'Geçen hafta', unread: 0, initials: 'D', online: false },
    ];

    // Eğer URL'den bir kullanıcı gelmişse, onu aktif kullanıcı yap, yoksa listeden ilkini (veya Burak'ı) göster
    const activeUserName = targetUser || 'Burak';
    const activeUserInitials = activeUserName.charAt(0).toUpperCase();

    return (
        <div className="min-h-screen bg-[#f5f1ed] pb-24 md:pb-20">
            <div className="container mx-auto px-4 md:px-6 max-w-6xl">
                {/* Header Section */}
                <div className="flex flex-row items-center justify-between pt-6 md:pt-10 mb-4 md:mb-8 border-b border-stone-200 pb-4 md:pb-8 gap-4">
                    <div className="flex items-center gap-3 md:gap-5">
                        <div className="w-8 h-8 md:w-12 md:h-12 rounded-[0.8rem] md:rounded-[1.2rem] bg-stone-900 border border-stone-800 flex items-center justify-center shadow-lg rotate-3 shrink-0">
                            <MessageSquare className="w-4 h-4 md:w-6 md:h-6 text-[#f5f1ed]" />
                        </div>
                        <div>
                            <h2 className="text-2xl md:text-4xl font-serif text-stone-900 tracking-tighter leading-none mb-1">
                                Mesajlar
                            </h2>
                            <p className="text-[9px] md:text-xs text-stone-400 font-serif italic">Görüşmelerini buradan yönetebilirsin.</p>
                        </div>
                    </div>
                </div>

                <div className="bg-[#fbfaf8] border border-stone-100 rounded-[1.5rem] md:rounded-[2.5rem] shadow-3xl overflow-hidden flex flex-col md:flex-row h-[calc(100vh-180px)] md:h-[700px] mb-10 animate-fade-in shadow-stone-900/5">
                    {/* Sol Panel - Konuşma Listesi */}
                    <div className={`${showChatMobile ? 'hidden md:flex' : 'flex'} md:w-[320px] lg:w-[380px] border-r border-stone-100 flex flex-col bg-stone-50/30`}>
                        <div className="p-4 md:p-6 pb-2 md:pb-4">
                            <div className="relative group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-300 group-focus-within:text-stone-900 transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Ara..."
                                    className="w-full bg-white border border-stone-100 py-2.5 md:py-3 pl-10 pr-4 rounded-xl text-xs outline-none focus:border-stone-900 transition-all font-medium shadow-sm"
                                />
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
                            {conversations.map((c) => (
                                <div
                                    key={c.id}
                                    onClick={() => setShowChatMobile(true)}
                                    className={`p-4 rounded-2xl flex items-center gap-4 cursor-pointer transition-all border border-transparent relative group ${activeUserName === c.user ? 'bg-white shadow-md border-stone-50' : 'hover:bg-white/50'}`}
                                >
                                    <div className="relative shrink-0">
                                        <div className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-stone-100 flex items-center justify-center font-serif text-base md:text-lg font-black text-stone-900 border-2 border-white shadow-sm overflow-hidden">
                                            {c.initials}
                                        </div>
                                        {c.online && (
                                            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 md:w-3 md:h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-baseline">
                                            <h4 className="font-serif text-base text-stone-900 truncate">{c.user}</h4>
                                            <span className="text-[9px] text-stone-400 font-black uppercase tracking-widest">{c.time}</span>
                                        </div>
                                        <p className={`text-[11px] truncate font-medium flex items-center gap-1.5 ${c.unread > 0 ? 'text-stone-900 font-black' : 'text-stone-400'}`}>
                                            {c.msg}
                                        </p>
                                    </div>
                                    {c.unread > 0 && (
                                        <div className="w-5 h-5 rounded-full bg-stone-900 text-[#f5f1ed] text-[9px] flex items-center justify-center font-black">
                                            {c.unread}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sağ Panel - Aktif Konuşma */}
                    <div className={`${showChatMobile ? 'flex' : 'hidden md:flex'} flex-1 flex flex-col bg-white`}>
                        {/* Chat Header */}
                        <div className="px-4 md:px-8 py-3 md:py-5 border-b border-stone-50 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-10">
                            <div className="flex items-center gap-2 md:gap-4 overflow-hidden">
                                <button
                                    onClick={() => setShowChatMobile(false)}
                                    className="md:hidden p-2 -ml-1 text-stone-400 hover:text-stone-900 transition-colors"
                                >
                                    <Send className="w-4 h-4 rotate-180" />
                                </button>
                                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-stone-900 flex items-center justify-center font-black text-[10px] md:text-xs text-[#f5f1ed] shrink-0">{activeUserInitials}</div>
                                <div className="truncate">
                                    <div className="flex items-center gap-2 truncate">
                                        <h4 className="font-serif text-base md:text-lg text-stone-900 truncate leading-none">{activeUserName}</h4>
                                        <ShieldCheck className="w-3 h-3 text-emerald-500 shrink-0" />
                                    </div>
                                    <div className="flex items-center gap-1.5 mt-0.5 md:mt-1">
                                        <div className="w-1 h-1 rounded-full bg-emerald-500 shrink-0"></div>
                                        <span className="text-[8px] md:text-[9px] text-stone-400 font-black uppercase tracking-widest leading-none">Çevrimiçi</span>
                                    </div>
                                </div>
                            </div>
                            <button className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center hover:bg-stone-50 rounded-full transition-colors shrink-0">
                                <MoreVertical className="w-4 h-4 text-stone-300" />
                            </button>
                        </div>

                        {/* Chat Messages Area */}
                        <div className="flex-1 p-6 md:p-8 overflow-y-auto space-y-6 flex flex-col bg-[radial-gradient(#f9f9f9_1px,transparent_1px)] [background-size:20px_20px]">
                            <div className="flex justify-center">
                                <span className="px-4 py-1.5 bg-stone-50 rounded-full text-[8px] md:text-[9px] font-black tracking-widest text-stone-400 uppercase">Bugün</span>
                            </div>

                            <div className="flex flex-col items-start max-w-[85%] md:max-w-[70%] group">
                                <div className="bg-stone-100 px-4 md:px-6 py-3 md:py-4 rounded-2xl md:rounded-3xl rounded-tl-none">
                                    <p className="text-xs md:text-sm font-serif italic text-stone-800 leading-relaxed">
                                        Selamlar, gitar hala duruyor mu? Eğer duruyorsa elimdeki sıfır bağlama ile takas düşünür müsün?
                                    </p>
                                </div>
                                <span className="text-[8px] md:text-[9px] text-stone-400 mt-1.5 md:mt-2 font-black uppercase tracking-widest ml-3 md:ml-4 opacity-1 md:opacity-0 group-hover:opacity-100 transition-opacity">14:15 • Okundu</span>
                            </div>

                            <div className="flex flex-col items-end self-end max-w-[85%] md:max-w-[70%] group">
                                <div className="bg-stone-900 px-4 md:px-6 py-3 md:py-4 rounded-2xl md:rounded-3xl rounded-tr-none text-white shadow-xl shadow-stone-900/10 transition-transform">
                                    <p className="text-xs md:text-sm font-serif italic leading-relaxed text-stone-100">
                                        Selam {activeUserName}, evet gitar duruyor. Marka ve modelini iletebilir misin?
                                    </p>
                                </div>
                                <span className="text-[8px] md:text-[9px] text-stone-400 mt-1.5 md:mt-2 font-black uppercase tracking-widest mr-3 md:mr-4 opacity-1 md:opacity-0 group-hover:opacity-100 transition-opacity">14:20</span>
                            </div>
                        </div>

                        {/* Chat Input Area */}
                        <div className="p-3 md:p-6 bg-white border-t border-stone-50">
                            <div className="flex items-center gap-2 md:gap-4">
                                <button className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center text-stone-400 hover:text-stone-900 transition-colors border border-stone-100 rounded-xl md:rounded-xl hover:bg-stone-50 shrink-0">
                                    <Paperclip className="w-4 h-4 md:w-5 md:h-5" />
                                </button>
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        placeholder="Mesaj yaz..."
                                        className="w-full bg-stone-50 border border-stone-50 px-4 md:px-6 py-2.5 md:py-3.5 rounded-xl md:rounded-2xl outline-none focus:border-stone-200 focus:bg-white transition-all text-xs font-medium shadow-inner"
                                    />
                                    <button className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 text-stone-300 hover:text-[#4a2008] transition-all">
                                        <Smile className="w-5 h-5" />
                                    </button>
                                </div>
                                <button className="w-10 h-10 md:w-11 md:h-11 bg-stone-900 text-[#f5f1ed] rounded-xl flex items-center justify-center hover:bg-black hover:scale-105 active:scale-95 transition-all shadow-xl shrink-0">
                                    <Send className="w-4 h-4 md:w-5 md:h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

