import React from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import { LayoutDashboard, Users, Package, Tag, RefreshCw, HelpCircle, BookOpen, Crown, CreditCard, Shield, Settings, Home } from 'lucide-react';

const items = [
    { to: '/admin', end: true, icon: LayoutDashboard, label: 'Panel' },
    { to: '/admin/kullanicilar', icon: Users, label: 'Kullanıcılar' },
    { to: '/admin/ilanlar', icon: Package, label: 'İlanlar' },
    { to: '/admin/kategoriler', icon: Tag, label: 'Kategoriler' },
    { to: '/admin/takaslar', icon: RefreshCw, label: 'Takaslar' },
    { to: '/admin/sss', icon: HelpCircle, label: 'SSS' },
    { to: '/admin/yardim-kategorileri', icon: BookOpen, label: 'Yardım Kategorileri' },
    { to: '/admin/premium-avantajlar', icon: Crown, label: 'Premium Avantajlar' },
    { to: '/admin/premium-planlar', icon: CreditCard, label: 'Premium Planlar' },
    { to: '/admin/guvenli-takas-adimlari', icon: Shield, label: 'Güvenli Takas Adımları' },
    { to: '/admin/ayarlar', icon: Settings, label: 'Ayarlar (Site/SMTP/SMS)' },
];

export default function AdminLayout() {
    return (
        <div className="min-h-screen bg-stone-100">
            <div className="flex">
                <aside className="w-64 bg-stone-900 text-stone-200 min-h-[calc(100vh-6rem)] sticky top-24 hidden md:flex flex-col">
                    <div className="p-6 border-b border-stone-800">
                        <div className="flex items-center gap-2 text-amber-400 font-black uppercase tracking-widest text-sm">
                            <Shield className="w-5 h-5" /> Admin Paneli
                        </div>
                        <p className="text-[10px] text-stone-500 mt-1 italic">TakasOn yönetim merkezi</p>
                    </div>
                    <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                        {items.map((it) => (
                            <NavLink
                                key={it.to}
                                to={it.to}
                                end={it.end}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold transition-all ${
                                        isActive ? 'bg-amber-500 text-stone-900' : 'hover:bg-stone-800 text-stone-300'
                                    }`
                                }
                            >
                                <it.icon className="w-4 h-4 shrink-0" />
                                <span className="truncate">{it.label}</span>
                            </NavLink>
                        ))}
                    </nav>
                    <div className="p-3 border-t border-stone-800">
                        <Link to="/" className="flex items-center gap-2 text-xs text-stone-400 hover:text-amber-400">
                            <Home className="w-4 h-4" /> Siteye Dön
                        </Link>
                    </div>
                </aside>

                <main className="flex-1 p-4 md:p-8 max-w-full overflow-x-auto">
                    {/* Mobile menu */}
                    <div className="md:hidden mb-4 flex flex-wrap gap-1.5">
                        {items.map((it) => (
                            <NavLink
                                key={it.to}
                                to={it.to}
                                end={it.end}
                                className={({ isActive }) => `px-2.5 py-1.5 rounded-lg text-[10px] font-bold ${isActive ? 'bg-stone-900 text-amber-400' : 'bg-white text-stone-600'}`}
                            >
                                {it.label}
                            </NavLink>
                        ))}
                    </div>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
