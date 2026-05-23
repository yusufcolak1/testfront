import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Send, MessageSquare, Search, Loader2 } from 'lucide-react';
import api from '../lib/api';
import { useAuth } from '../contexts/AuthContext';

export default function Messages() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth();
    const [conversations, setConversations] = useState([]);
    const [activeRoomId, setActiveRoomId] = useState(searchParams.get('room') || null);
    const [activeRoom, setActiveRoom] = useState(null);
    const [messages, setMessages] = useState([]);
    const [loadingList, setLoadingList] = useState(true);
    const [loadingRoom, setLoadingRoom] = useState(false);
    const [text, setText] = useState('');
    const [sending, setSending] = useState(false);
    const [showChatMobile, setShowChatMobile] = useState(!!searchParams.get('room'));
    const scrollRef = useRef(null);
    // En son bilinen mesaj ID'sini tut — diff için
    const lastMsgIdRef = useRef(null);
    const activeRoomIdRef = useRef(activeRoomId);

    useEffect(() => { activeRoomIdRef.current = activeRoomId; }, [activeRoomId]);
    useEffect(() => { if (!isAuthenticated) navigate('/'); }, [isAuthenticated, navigate]);

    // Kullanıcı sohbet kutusunun dibinde mi?
    const isAtBottom = () => {
        const el = scrollRef.current;
        if (!el) return true;
        return el.scrollHeight - el.scrollTop - el.clientHeight < 80;
    };

    const scrollToBottom = (smooth = false) => {
        setTimeout(() => {
            if (scrollRef.current) {
                scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: smooth ? 'smooth' : 'auto' });
            }
        }, 30);
    };

    // ── İlk yükleme: loading spinner göster ─────────────────
    const loadList = useCallback(async () => {
        try {
            setLoadingList(true);
            const r = await api.getConversations();
            setConversations(r.data || []);
            if (!activeRoomIdRef.current && (r.data || []).length > 0 && window.innerWidth >= 768) {
                setActiveRoomId(r.data[0].id);
            }
        } catch (e) { console.error(e); }
        finally { setLoadingList(false); }
    }, []);

    const loadRoom = useCallback(async (id, { silent = false } = {}) => {
        try {
            if (!silent) setLoadingRoom(true);
            const r = await api.getConversation(id);
            const room = r.data;
            if (!silent) setActiveRoom(room);
            const newMsgs = room.messages || [];
            setMessages(prev => {
                if (newMsgs.length === prev.length && newMsgs[newMsgs.length - 1]?.id === prev[prev.length - 1]?.id) {
                    return prev; // hiç değişmemiş, re-render tetikleme
                }
                return newMsgs;
            });
            // Sadece yeni mesaj geldiyse ve kullanıcı dibindeyse otomatik kaydır
            const newLastId = newMsgs[newMsgs.length - 1]?.id;
            if (newLastId && newLastId !== lastMsgIdRef.current) {
                lastMsgIdRef.current = newLastId;
                if (!silent || isAtBottom()) scrollToBottom(silent);
            }
            api.markRoomRead(id).catch(() => {});
        } catch (e) { if (!silent) alert(e.message); }
        finally { if (!silent) setLoadingRoom(false); }
    }, []);

    // ── Sessiz polling: liste + açık oda ───────────────────
    const silentRefresh = useCallback(async () => {
        try {
            const r = await api.getConversations();
            setConversations(prev => {
                const newData = r.data || [];
                // Sadece gerçekten değişmişse güncelle
                const changed = newData.length !== prev.length ||
                    newData.some((c, i) => c.unread !== prev[i]?.unread || c.msg !== prev[i]?.msg);
                return changed ? newData : prev;
            });
        } catch { /* sessizce yut */ }

        const roomId = activeRoomIdRef.current;
        if (roomId) {
            await loadRoom(roomId, { silent: true });
        }
    }, [loadRoom]);

    useEffect(() => { if (isAuthenticated) loadList(); }, [isAuthenticated, loadList]);
    useEffect(() => { if (activeRoomId) loadRoom(activeRoomId); }, [activeRoomId, loadRoom]);

    // Polling — sadece sekme odaktaysa, 15 sn
    useEffect(() => {
        if (!isAuthenticated) return;
        const t = setInterval(() => {
            if (!document.hidden) silentRefresh();
        }, 15000);
        return () => clearInterval(t);
    }, [isAuthenticated, silentRefresh]);

    const send = async (e) => {
        e?.preventDefault();
        if (!text.trim() || !activeRoomId) return;
        const content = text.trim();
        setText('');
        setSending(true);
        try {
            await api.sendMessage(activeRoomId, content);
            // Mesaj gönderdikten sonra oda sessizce yenilenir (scroll zorla)
            const r = await api.getConversation(activeRoomId);
            const newMsgs = r.data?.messages || [];
            setMessages(newMsgs);
            lastMsgIdRef.current = newMsgs[newMsgs.length - 1]?.id || null;
            scrollToBottom(true);
            // Liste de sessizce
            api.getConversations().then(lr => setConversations(lr.data || [])).catch(() => {});
        } catch (e) { alert(e.message); }
        finally { setSending(false); }
    };

    const partner = activeRoom?.users?.find((u) => u.id !== user?.id);
    const partnerName = partner?.profile ? `${partner.profile.firstName} ${(partner.profile.lastName || '').charAt(0)}.` : 'Kullanıcı';
    const partnerInitials = (partner?.profile?.firstName?.[0] || 'K').toUpperCase();
    const totalUnread = conversations.reduce((s, c) => s + (c.unread || 0), 0);

    return (
        <div className="min-h-screen bg-[#f5f1ed] pb-24 md:pb-20">
            <div className="container mx-auto px-4 md:px-6 max-w-6xl">
                <div className="flex flex-row items-center justify-between pt-6 md:pt-10 mb-4 md:mb-8 border-b border-stone-200 pb-4 md:pb-8 gap-4">
                    <div className="flex items-center gap-3 md:gap-5">
                        <div className="w-8 h-8 md:w-12 md:h-12 rounded-[0.8rem] md:rounded-[1.2rem] bg-stone-900 border border-stone-800 flex items-center justify-center shadow-lg rotate-3 shrink-0">
                            <MessageSquare className="w-4 h-4 md:w-6 md:h-6 text-[#f5f1ed]" />
                        </div>
                        <div>
                            <div className="flex items-center gap-3 leading-none mb-1">
                                <h2 className="text-2xl md:text-4xl font-serif text-stone-900 tracking-tighter italic font-black leading-none">Mesajlar</h2>
                                {totalUnread > 0 && (
                                    <span className="inline-flex items-center justify-center px-2 py-0.5 bg-red-500 text-white text-[10px] font-black rounded-full leading-none">
                                        {totalUnread} okunmamış
                                    </span>
                                )}
                            </div>
                            <p className="text-[9px] md:text-xs text-stone-400 italic">{conversations.length} konuşma</p>
                        </div>
                    </div>
                </div>

                <div className="bg-[#fbfaf8] border border-stone-100 rounded-[1.5rem] md:rounded-[2.5rem] shadow-3xl overflow-hidden flex flex-col md:flex-row h-[calc(100vh-180px)] md:h-[700px] mb-10 shadow-stone-900/5">
                    {/* Sol Panel */}
                    <div className={`${showChatMobile ? 'hidden md:flex' : 'flex'} md:w-[320px] lg:w-[380px] border-r border-stone-100 flex-col bg-stone-50/30`}>
                        <div className="p-4 md:p-6 pb-2 md:pb-4">
                            <div className="relative group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-300" />
                                <input type="text" placeholder="Ara..." className="w-full bg-white border border-stone-100 py-2.5 md:py-3 pl-10 pr-4 rounded-xl text-xs outline-none shadow-sm" />
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
                            {loadingList ? (
                                <div className="text-center text-stone-400 py-8 text-xs"><Loader2 className="w-4 h-4 animate-spin mx-auto" /></div>
                            ) : conversations.length === 0 ? (
                                <div className="text-center text-stone-400 py-8 text-xs italic">Henüz konuşman yok.</div>
                            ) : conversations.map((c) => (
                                <div
                                    key={c.id}
                                    onClick={() => { setActiveRoomId(c.id); setShowChatMobile(true); }}
                                    className={`p-4 rounded-2xl flex items-center gap-4 cursor-pointer transition-all
                                        ${activeRoomId === c.id ? 'bg-white shadow-md' : 'hover:bg-white/50'}
                                        ${c.unread > 0 && activeRoomId !== c.id ? 'bg-amber-50/60' : ''}`}
                                >
                                    <div className="relative shrink-0">
                                        <div className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-stone-100 flex items-center justify-center font-serif text-base font-black text-stone-900 border-2 border-white shadow-sm">
                                            {c.initials}
                                        </div>
                                        {c.unread > 0 && activeRoomId !== c.id && (
                                            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[9px] font-black rounded-full flex items-center justify-center leading-none">
                                                {c.unread > 9 ? '9+' : c.unread}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-baseline gap-2">
                                            <h4 className={`font-serif text-sm md:text-base truncate ${c.unread > 0 && activeRoomId !== c.id ? 'text-stone-900 font-black' : 'text-stone-900'}`}>{c.user}</h4>
                                            <span className="text-[9px] text-stone-400 font-black uppercase tracking-widest shrink-0">{c.time ? new Date(c.time).toLocaleDateString('tr-TR') : ''}</span>
                                        </div>
                                        <p className={`text-[11px] truncate ${c.unread > 0 && activeRoomId !== c.id ? 'font-black text-stone-700' : 'font-medium text-stone-400'}`}>{c.msg || '—'}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sağ Panel */}
                    <div className={`${showChatMobile ? 'flex' : 'hidden md:flex'} flex-1 flex-col bg-white`}>
                        {!activeRoomId ? (
                            <div className="flex-1 flex items-center justify-center text-stone-400 text-sm italic px-6 text-center">
                                Bir konuşma seçin veya ilan detayından "Mesaj Gönder" ile sohbet başlatın.
                            </div>
                        ) : (
                            <>
                                <div className="px-4 md:px-8 py-3 md:py-5 border-b border-stone-50 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-10">
                                    <div className="flex items-center gap-2 md:gap-4 overflow-hidden">
                                        <button onClick={() => setShowChatMobile(false)} className="md:hidden p-2 -ml-1 text-stone-400 hover:text-stone-900">
                                            <Send className="w-4 h-4 rotate-180" />
                                        </button>
                                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-stone-900 flex items-center justify-center font-black text-[10px] md:text-xs text-[#f5f1ed] shrink-0">{partnerInitials}</div>
                                        <div className="truncate">
                                            <h4 className="font-serif text-base md:text-lg text-stone-900 truncate leading-none">{partnerName}</h4>
                                        </div>
                                    </div>
                                </div>

                                <div ref={scrollRef} className="flex-1 p-4 md:p-8 overflow-y-auto space-y-3 flex flex-col bg-[radial-gradient(#f9f9f9_1px,transparent_1px)] [background-size:20px_20px]">
                                    {loadingRoom ? (
                                        <div className="text-center text-stone-400 mt-8"><Loader2 className="w-5 h-5 animate-spin mx-auto" /></div>
                                    ) : messages.length === 0 ? (
                                        <div className="text-center text-stone-400 mt-8 italic text-sm">Henüz mesaj yok. İlk mesajı sen gönder!</div>
                                    ) : messages.map((m) => {
                                        const mine = m.senderId === user?.id;
                                        return (
                                            <div key={m.id} className={`flex flex-col ${mine ? 'items-end self-end' : 'items-start'} max-w-[85%] md:max-w-[70%]`}>
                                                <div className={`px-4 md:px-6 py-3 md:py-4 rounded-2xl md:rounded-3xl ${mine ? 'bg-stone-900 text-stone-100 rounded-tr-none shadow-xl' : 'bg-stone-100 text-stone-800 rounded-tl-none'}`}>
                                                    <p className="text-xs md:text-sm font-serif italic leading-relaxed whitespace-pre-line">{m.content}</p>
                                                </div>
                                                <span className={`text-[8px] md:text-[9px] text-stone-400 mt-1.5 font-black uppercase tracking-widest ${mine ? 'mr-3' : 'ml-3'}`}>
                                                    {new Date(m.createdAt).toLocaleString('tr-TR')}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>

                                <form onSubmit={send} className="p-3 md:p-6 bg-white border-t border-stone-50">
                                    <div className="flex items-center gap-2 md:gap-4">
                                        <div className="flex-1 relative">
                                            <input
                                                value={text}
                                                onChange={(e) => setText(e.target.value)}
                                                type="text"
                                                placeholder="Mesaj yaz..."
                                                className="w-full bg-stone-50 border border-stone-50 px-4 md:px-6 py-2.5 md:py-3.5 rounded-xl md:rounded-2xl outline-none focus:border-stone-200 focus:bg-white text-xs font-medium shadow-inner"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={sending || !text.trim()}
                                            className="w-10 h-10 md:w-11 md:h-11 bg-stone-900 text-[#f5f1ed] rounded-xl flex items-center justify-center hover:bg-black active:scale-95 transition-all shadow-xl shrink-0 disabled:opacity-50"
                                        >
                                            {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4 md:w-5 md:h-5" />}
                                        </button>
                                    </div>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
