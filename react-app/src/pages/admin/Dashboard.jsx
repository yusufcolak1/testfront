import React, { useEffect, useState } from 'react';
import { Users, Package, RefreshCw, HelpCircle, Tag, Activity, Clock } from 'lucide-react';
import api from '../../lib/api';

const Card = ({ icon: Icon, label, value, color = 'amber' }) => (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-stone-100 flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl bg-${color}-100 text-${color}-600 flex items-center justify-center`}>
            <Icon className="w-6 h-6" />
        </div>
        <div>
            <div className="text-[10px] font-black uppercase tracking-widest text-stone-400">{label}</div>
            <div className="text-2xl font-black text-stone-900">{value ?? '—'}</div>
        </div>
    </div>
);

export default function Dashboard() {
    const [stats, setStats] = useState({});

    useEffect(() => {
        api.admin.stats().then((r) => setStats(r.data || {})).catch(console.error);
    }, []);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-black text-stone-900">Yönetim Paneli</h1>
                <p className="text-stone-500 text-sm mt-1">Genel istatistikler</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card icon={Users} label="Kullanıcı" value={stats.users} />
                <Card icon={Package} label="İlan" value={stats.items} color="blue" />
                <Card icon={Activity} label="Aktif İlan" value={stats.activeItems} color="green" />
                <Card icon={RefreshCw} label="Takas" value={stats.trades} color="purple" />
                <Card icon={Clock} label="Bekleyen Takas" value={stats.pendingTrades} color="orange" />
                <Card icon={Tag} label="Kategori" value={stats.categories} color="pink" />
                <Card icon={HelpCircle} label="SSS" value={stats.faqs} color="rose" />
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-sm text-amber-900">
                <strong>İpucu:</strong> Sol menüden tüm site içeriklerini (kullanıcı, ilan, kategori, SSS, premium, ayarlar) yönetebilirsiniz. <em>Ayarlar</em> bölümünde SMTP ve SMS yapılandırmalarını da ayarlayabilirsiniz.
            </div>
        </div>
    );
}
