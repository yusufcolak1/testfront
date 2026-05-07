import React, { useEffect, useState, useRef } from 'react';
import { Bell, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../lib/api';

export default function NotificationBell() {
    const [items, setItems] = useState([]);
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    const load = async () => {
        try {
            const r = await api.getNotifications();
            setItems(r.data || []);
        } catch (e) { /* yut */ }
    };

    useEffect(() => {
        load();
        const t = setInterval(load, 30000);
        return () => clearInterval(t);
    }, []);

    useEffect(() => {
        const onClick = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
        document.addEventListener('mousedown', onClick);
        return () => document.removeEventListener('mousedown', onClick);
    }, []);

    const unread = items.filter((n) => !n.isRead).length;

    const markRead = async (id) => {
        try { await api.markNotificationRead(id); setItems((p) => p.map((n) => n.id === id ? { ...n, isRead: true } : n)); } catch (e) { /* yut */ }
    };
    const markAll = async () => {
        await Promise.all(items.filter((n) => !n.isRead).map((n) => api.markNotificationRead(n.id).catch(() => {})));
        load();
    };

    return (
        <div className="relative" ref={ref}>
            <button onClick={() => setOpen((p) => !p)} className="relative w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-white border border-stone-200 flex items-center justify-center hover:bg-stone-50 transition-all shadow-sm">
                <Bell className="w-4 h-4 text-stone-600" />
                {unread > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-black rounded-full flex items-center justify-center">{unread > 9 ? '9+' : unread}</span>
                )}
            </button>
            {open && (
                <div className="absolute right-0 top-full mt-2 w-80 max-w-[calc(100vw-2rem)] bg-white border border-stone-200 rounded-2xl shadow-2xl z-[9999] overflow-hidden">
                    <div className="px-4 py-3 border-b border-stone-100 flex items-center justify-between">
                        <span className="text-xs font-black uppercase tracking-widest text-stone-700">Bildirimler</span>
                        {unread > 0 && (
                            <button onClick={markAll} className="text-[10px] font-bold text-amber-700 flex items-center gap-1 hover:text-amber-900">
                                <Check className="w-3 h-3" /> Tümünü oku
                            </button>
                        )}
                    </div>
                    <div className="max-h-[400px] overflow-y-auto">
                        {items.length === 0 ? (
                            <div className="text-center py-8 text-stone-400 text-sm italic">Bildirim yok.</div>
                        ) : items.slice(0, 20).map((n) => (
                            <Link
                                key={n.id}
                                to={n.link || '#'}
                                onClick={() => { markRead(n.id); setOpen(false); }}
                                className={`block px-4 py-3 border-b border-stone-50 hover:bg-stone-50 transition-colors ${n.isRead ? '' : 'bg-amber-50/30'}`}
                            >
                                <div className="flex items-start gap-2">
                                    {!n.isRead && <span className="w-2 h-2 mt-1.5 rounded-full bg-amber-500 shrink-0" />}
                                    <div className="flex-1 min-w-0">
                                        <div className="text-xs font-bold text-stone-900 truncate">{n.title}</div>
                                        <div className="text-[11px] text-stone-500 line-clamp-2">{n.body}</div>
                                        <div className="text-[10px] text-stone-400 mt-1">{new Date(n.createdAt).toLocaleString('tr-TR')}</div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
