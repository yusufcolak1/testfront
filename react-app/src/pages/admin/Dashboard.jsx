import React, { useEffect, useState } from 'react';
import { Users, Package, RefreshCw, HelpCircle, Tag, Activity, Clock, MessageSquare, Crown, CheckCircle, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import api from '../../lib/api';

// ─── Özet kart ────────────────────────────────────────────────
const StatCard = ({ icon: Icon, label, value, color = 'amber', sub }) => (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-stone-100 flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl bg-${color}-100 text-${color}-600 flex items-center justify-center shrink-0`}>
            <Icon className="w-6 h-6" />
        </div>
        <div className="min-w-0">
            <div className="text-[10px] font-black uppercase tracking-widest text-stone-400 leading-none mb-1">{label}</div>
            <div className="text-2xl font-black text-stone-900 leading-none">{value ?? '—'}</div>
            {sub && <div className="text-[10px] text-stone-400 mt-1">{sub}</div>}
        </div>
    </div>
);

// ─── Mini çizgi / bar grafik ────────────────────────────────
function SparkBar({ data, color = '#f59e0b', height = 48 }) {
    if (!data || data.length === 0) return null;
    const max = Math.max(...data, 1);
    return (
        <svg width="100%" height={height} viewBox={`0 0 ${data.length * 6} ${height}`} preserveAspectRatio="none">
            {data.map((v, i) => {
                const barH = Math.max(2, (v / max) * height);
                return (
                    <rect
                        key={i}
                        x={i * 6}
                        y={height - barH}
                        width={4}
                        height={barH}
                        rx={1}
                        fill={color}
                        opacity={0.8}
                    />
                );
            })}
        </svg>
    );
}

// ─── Trend ikonu ────────────────────────────────────────────
function Trend({ today, yesterday }) {
    if (yesterday === 0 && today === 0) return <Minus className="w-3.5 h-3.5 text-stone-300" />;
    if (today > yesterday) return <TrendingUp className="w-3.5 h-3.5 text-green-500" />;
    if (today < yesterday) return <TrendingDown className="w-3.5 h-3.5 text-red-400" />;
    return <Minus className="w-3.5 h-3.5 text-stone-300" />;
}

// ─── Tam boyutlu bar grafik ──────────────────────────────────
function BarChart({ data, fields, colors, labels, height = 180 }) {
    if (!data || data.length === 0) return <div className="text-stone-400 text-xs italic py-8 text-center">Veri yok</div>;
    const allVals = data.flatMap(d => fields.map(f => d[f] || 0));
    const max = Math.max(...allVals, 1);
    const barW = Math.max(4, Math.floor(560 / data.length / fields.length) - 1);
    const groupW = barW * fields.length + 4;

    return (
        <div className="overflow-x-auto">
            <svg width={Math.max(560, data.length * (groupW + 4))} height={height + 28} style={{ display: 'block' }}>
                {/* Grid lines */}
                {[0.25, 0.5, 0.75, 1].map(p => (
                    <line key={p} x1={0} y1={height * (1 - p)} x2="100%" y2={height * (1 - p)} stroke="#f0ede8" strokeWidth={1} />
                ))}
                {data.map((d, gi) => (
                    <g key={d.date} transform={`translate(${gi * (groupW + 4) + 2}, 0)`}>
                        {fields.map((f, fi) => {
                            const val = d[f] || 0;
                            const bh = Math.max(val > 0 ? 2 : 0, (val / max) * height);
                            return (
                                <g key={f}>
                                    <rect
                                        x={fi * (barW + 1)}
                                        y={height - bh}
                                        width={barW}
                                        height={bh}
                                        rx={2}
                                        fill={colors[fi]}
                                        opacity={0.85}
                                    >
                                        <title>{labels[fi]}: {val} ({d.date})</title>
                                    </rect>
                                </g>
                            );
                        })}
                        {/* Tarih etiketi: her 5 günde bir */}
                        {gi % Math.ceil(data.length / 8) === 0 && (
                            <text x={groupW / 2} y={height + 16} textAnchor="middle" fontSize={9} fill="#a8a29e">
                                {d.date.slice(5)}
                            </text>
                        )}
                    </g>
                ))}
            </svg>
        </div>
    );
}

// ─── Ana bileşen ─────────────────────────────────────────────
export default function Dashboard() {
    const [stats, setStats] = useState({});
    const [daily, setDaily] = useState([]);
    const [days, setDays] = useState(30);
    const [loading, setLoading] = useState(true);

    const load = async (d) => {
        setLoading(true);
        try {
            const [sRes, dRes] = await Promise.all([
                api.admin.stats(),
                api.admin.dailyStats(d),
            ]);
            setStats(sRes.data || {});
            setDaily(dRes.data || []);
        } catch (e) { console.error(e); }
        finally { setLoading(false); }
    };

    useEffect(() => { load(days); }, [days]);

    // Son 2 günü karşılaştır (trend için)
    const today    = daily[daily.length - 1] || {};
    const yesterday = daily[daily.length - 2] || {};

    // Sparkbar verileri
    const spark = (field) => daily.map(d => d[field] || 0);

    // Toplam (seçili dönem)
    const total = (field) => daily.reduce((s, d) => s + (d[field] || 0), 0);

    return (
        <div className="space-y-8">
            {/* Başlık */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h1 className="text-3xl font-black text-stone-900">Yönetim Paneli</h1>
                    <p className="text-stone-500 text-sm mt-1">Genel istatistikler ve aktivite grafiği</p>
                </div>
                <div className="flex items-center gap-2 bg-white border border-stone-200 rounded-xl p-1">
                    {[7, 14, 30, 60].map(d => (
                        <button
                            key={d}
                            onClick={() => setDays(d)}
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${days === d ? 'bg-stone-900 text-amber-400' : 'text-stone-400 hover:text-stone-700'}`}
                        >
                            {d}G
                        </button>
                    ))}
                </div>
            </div>

            {/* Özet kartlar */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <StatCard icon={Users}       label="Toplam Kullanıcı"   value={stats.users}          color="amber"  />
                <StatCard icon={Package}     label="Toplam İlan"        value={stats.items}          color="blue"   />
                <StatCard icon={Activity}    label="Aktif İlan"         value={stats.activeItems}    color="green"  />
                <StatCard icon={RefreshCw}   label="Toplam Takas"       value={stats.trades}         color="purple" />
                <StatCard icon={CheckCircle} label="Tamamlanan Takas"   value={stats.completedTrades} color="green" />
                <StatCard icon={Clock}       label="Bekleyen Takas"     value={stats.pendingTrades}  color="orange" />
                <StatCard icon={Crown}       label="Premium Üye"        value={stats.premiumUsers}   color="yellow" />
                <StatCard icon={MessageSquare} label="Toplam Mesaj"     value={stats.messages}       color="pink"   />
                <StatCard icon={Tag}         label="Kategori"           value={stats.categories}     color="pink"   />
                <StatCard icon={HelpCircle}  label="SSS"                value={stats.faqs}           color="rose"   />
            </div>

            {/* Dönem özeti — mini sparkbar kartları */}
            <div>
                <h2 className="text-sm font-black text-stone-500 uppercase tracking-widest mb-3">Son {days} Günlük Özet</h2>
                {loading ? (
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="bg-white rounded-2xl border border-stone-100 p-4 h-24 animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {[
                            { field: 'newUsers',        label: 'Yeni Üye',          color: '#f59e0b', icon: Users },
                            { field: 'newItems',        label: 'Yeni İlan',         color: '#3b82f6', icon: Package },
                            { field: 'newTrades',       label: 'Yeni Teklif',       color: '#8b5cf6', icon: RefreshCw },
                            { field: 'completedTrades', label: 'Tamamlanan Takas',  color: '#22c55e', icon: CheckCircle },
                            { field: 'newMessages',     label: 'Yeni Mesaj',        color: '#ec4899', icon: MessageSquare },
                        ].map(({ field, label, color, icon: Icon }) => (
                            <div key={field} className="bg-white rounded-2xl border border-stone-100 p-4 space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">{label}</span>
                                    <Trend today={today[field] || 0} yesterday={yesterday[field] || 0} />
                                </div>
                                <div className="text-2xl font-black text-stone-900">{total(field)}</div>
                                <SparkBar data={spark(field)} color={color} />
                                <div className="text-[9px] text-stone-400">Bugün: <span className="font-black text-stone-700">{today[field] || 0}</span></div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Detay bar grafik */}
            <div className="bg-white rounded-2xl border border-stone-100 p-6 space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-3">
                    <h2 className="text-base font-black text-stone-900">Günlük Aktivite Grafiği</h2>
                    <div className="flex flex-wrap gap-3">
                        {[
                            { label: 'Yeni Üye',    color: '#f59e0b' },
                            { label: 'Yeni İlan',   color: '#3b82f6' },
                            { label: 'Takas Teklifi', color: '#8b5cf6' },
                            { label: 'Tamamlanan',  color: '#22c55e' },
                            { label: 'Mesaj',       color: '#ec4899' },
                        ].map(({ label, color }) => (
                            <span key={label} className="flex items-center gap-1.5 text-[10px] font-black text-stone-500">
                                <span className="w-3 h-3 rounded-sm" style={{ background: color }} />
                                {label}
                            </span>
                        ))}
                    </div>
                </div>
                {loading ? (
                    <div className="h-48 bg-stone-50 rounded-xl animate-pulse" />
                ) : (
                    <BarChart
                        data={daily}
                        fields={['newUsers', 'newItems', 'newTrades', 'completedTrades', 'newMessages']}
                        colors={['#f59e0b', '#3b82f6', '#8b5cf6', '#22c55e', '#ec4899']}
                        labels={['Yeni Üye', 'Yeni İlan', 'Takas Teklifi', 'Tamamlanan', 'Mesaj']}
                    />
                )}
            </div>

            {/* Son 7 gün tablo */}
            <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-stone-100">
                    <h2 className="text-base font-black text-stone-900">Son 7 Günlük Tablo</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-[10px] font-black uppercase tracking-widest text-stone-400 border-b border-stone-100">
                                <th className="text-left px-6 py-3">Tarih</th>
                                <th className="text-right px-4 py-3">Yeni Üye</th>
                                <th className="text-right px-4 py-3">Yeni İlan</th>
                                <th className="text-right px-4 py-3">Takas Teklifi</th>
                                <th className="text-right px-4 py-3">Tamamlanan</th>
                                <th className="text-right px-6 py-3">Mesaj</th>
                            </tr>
                        </thead>
                        <tbody>
                            {daily.slice(-7).reverse().map((d, i) => (
                                <tr key={d.date} className={`border-b border-stone-50 ${i === 0 ? 'bg-amber-50/50 font-bold' : 'hover:bg-stone-50'}`}>
                                    <td className="px-6 py-3 font-mono text-xs text-stone-600">
                                        {i === 0 ? <span className="inline-flex items-center gap-1.5">{d.date} <span className="text-[9px] bg-amber-500 text-stone-900 px-1.5 py-0.5 rounded font-black">BUGÜN</span></span> : d.date}
                                    </td>
                                    <td className="text-right px-4 py-3 tabular-nums">{d.newUsers}</td>
                                    <td className="text-right px-4 py-3 tabular-nums">{d.newItems}</td>
                                    <td className="text-right px-4 py-3 tabular-nums">{d.newTrades}</td>
                                    <td className="text-right px-4 py-3 tabular-nums text-green-600">{d.completedTrades}</td>
                                    <td className="text-right px-6 py-3 tabular-nums">{d.newMessages}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
