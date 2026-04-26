import React, { useEffect, useState } from 'react';
import { Save, Mail, MessageSquare, Globe, Image, Palette, RefreshCw, Send, CheckCircle2, XCircle } from 'lucide-react';
import api from '../../lib/api';

const groupMeta = {
    general: { label: 'Genel', icon: Globe },
    smtp: { label: 'SMTP (E-posta)', icon: Mail },
    sms: { label: 'SMS', icon: MessageSquare },
    cloudinary: { label: 'Cloudinary', icon: Image },
    theme: { label: 'Tema', icon: Palette },
};

export default function Settings() {
    const [settings, setSettings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeGroup, setActiveGroup] = useState('general');
    const [smtpStatus, setSmtpStatus] = useState(null);
    const [smsTo, setSmsTo] = useState('');
    const [smtpTo, setSmtpTo] = useState('');

    const load = async () => {
        try {
            setLoading(true);
            const r = await api.admin.listSettings();
            setSettings(r.data || []);
        } catch (e) { alert(e.message); }
        finally { setLoading(false); }
    };

    useEffect(() => { load(); }, []);

    const updateLocal = (key, value) => {
        setSettings((prev) => prev.map((s) => s.key === key ? { ...s, value } : s));
    };

    const saveGroup = async () => {
        try {
            setSaving(true);
            const items = settings.filter((s) => s.group === activeGroup).map((s) => ({
                key: s.key, value: String(s.value), type: s.type, group: s.group, isPublic: s.isPublic, description: s.description,
            }));
            await api.admin.bulkUpdateSettings(items);
            alert('Ayarlar kaydedildi.');
        } catch (e) { alert(e.message); }
        finally { setSaving(false); }
    };

    const verifySmtp = async () => {
        try {
            const r = await api.admin.verifySmtp();
            setSmtpStatus(r.data);
        } catch (e) { setSmtpStatus({ ok: false, message: e.message }); }
    };

    const testSmtp = async () => {
        if (!smtpTo) return alert('Test e-posta adresi gerekli');
        try {
            await api.admin.testSmtp({ to: smtpTo });
            alert('Test e-posta gönderildi (eğer SMTP yapılandırıldıysa).');
        } catch (e) { alert(e.message); }
    };

    const testSms = async () => {
        if (!smsTo) return alert('Test telefon numarası gerekli');
        try {
            const r = await api.admin.testSms({ to: smsTo });
            alert('SMS sonucu: ' + JSON.stringify(r.data));
        } catch (e) { alert(e.message); }
    };

    const groups = Array.from(new Set(settings.map((s) => s.group)));
    const visible = settings.filter((s) => s.group === activeGroup);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-black text-stone-900">Site Ayarları</h1>
                <p className="text-stone-500 text-sm mt-1">Genel/SMTP/SMS/Cloudinary/Tema yapılandırmaları</p>
            </div>

            {/* Group tabs */}
            <div className="flex flex-wrap gap-2">
                {groups.map((g) => {
                    const meta = groupMeta[g] || { label: g, icon: Globe };
                    const Icon = meta.icon;
                    return (
                        <button
                            key={g}
                            onClick={() => setActiveGroup(g)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${activeGroup === g ? 'bg-stone-900 text-amber-400' : 'bg-white text-stone-600 hover:bg-stone-50'}`}
                        >
                            <Icon className="w-4 h-4" />
                            {meta.label}
                        </button>
                    );
                })}
            </div>

            {/* Settings form */}
            <div className="bg-white rounded-2xl shadow-sm p-5 md:p-8 space-y-4">
                {loading ? (
                    <div className="text-center py-8 text-stone-400">Yükleniyor…</div>
                ) : visible.length === 0 ? (
                    <div className="text-center py-8 text-stone-400">Bu grupta ayar yok</div>
                ) : visible.map((s) => (
                    <div key={s.key} className="grid grid-cols-1 md:grid-cols-3 gap-3 py-3 border-b border-stone-100 last:border-0">
                        <div>
                            <div className="font-mono text-xs font-bold text-stone-700">{s.key}</div>
                            {s.description && <div className="text-[11px] text-stone-400 mt-0.5">{s.description}</div>}
                            <div className="text-[10px] text-stone-300 mt-0.5">type: {s.type} {s.isPublic && '· public'}</div>
                        </div>
                        <div className="md:col-span-2">
                            {s.type === 'BOOLEAN' ? (
                                <select className="w-full bg-stone-50 border border-stone-200 px-3 py-2 rounded-lg text-sm" value={String(s.value)} onChange={(e) => updateLocal(s.key, e.target.value)}>
                                    <option value="true">Evet</option>
                                    <option value="false">Hayır</option>
                                </select>
                            ) : s.key.includes('password') || s.key.includes('Secret') ? (
                                <input type="password" className="w-full bg-stone-50 border border-stone-200 px-3 py-2 rounded-lg text-sm" value={s.value} onChange={(e) => updateLocal(s.key, e.target.value)} placeholder="(boş = değiştirme)" />
                            ) : (
                                <input className="w-full bg-stone-50 border border-stone-200 px-3 py-2 rounded-lg text-sm" value={s.value} onChange={(e) => updateLocal(s.key, e.target.value)} />
                            )}
                        </div>
                    </div>
                ))}
                <div className="pt-4 flex gap-2">
                    <button onClick={saveGroup} disabled={saving} className="px-4 py-2.5 bg-stone-900 text-amber-400 rounded-xl text-xs font-bold flex items-center gap-2 disabled:opacity-50">
                        <Save className="w-4 h-4" />
                        {saving ? 'Kaydediliyor…' : 'Bu grubu kaydet'}
                    </button>
                    <button onClick={load} className="px-4 py-2.5 bg-stone-100 text-stone-700 rounded-xl text-xs font-bold flex items-center gap-2">
                        <RefreshCw className="w-4 h-4" /> Yenile
                    </button>
                </div>
            </div>

            {/* SMTP Test */}
            {activeGroup === 'smtp' && (
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 space-y-3">
                    <h3 className="font-bold text-blue-900 flex items-center gap-2"><Mail className="w-4 h-4" /> SMTP Test</h3>
                    <div className="flex flex-wrap gap-2">
                        <button onClick={verifySmtp} className="px-3 py-2 bg-white text-blue-700 rounded-lg text-xs font-bold flex items-center gap-2 border border-blue-200">
                            Bağlantıyı Doğrula
                        </button>
                        {smtpStatus && (
                            <span className={`px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-2 ${smtpStatus.ok ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {smtpStatus.ok ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                                {smtpStatus.ok ? 'Bağlantı başarılı' : (smtpStatus.message || 'Hata')}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-wrap gap-2 items-center">
                        <input type="email" placeholder="test@example.com" value={smtpTo} onChange={(e) => setSmtpTo(e.target.value)} className="flex-1 min-w-[200px] bg-white border border-blue-200 px-3 py-2 rounded-lg text-sm" />
                        <button onClick={testSmtp} className="px-3 py-2 bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center gap-2"><Send className="w-3.5 h-3.5" /> Test E-postası Gönder</button>
                    </div>
                </div>
            )}

            {/* SMS Test */}
            {activeGroup === 'sms' && (
                <div className="bg-purple-50 border border-purple-200 rounded-2xl p-5 space-y-3">
                    <h3 className="font-bold text-purple-900 flex items-center gap-2"><MessageSquare className="w-4 h-4" /> SMS Test</h3>
                    <div className="flex flex-wrap gap-2 items-center">
                        <input type="tel" placeholder="+905555555555" value={smsTo} onChange={(e) => setSmsTo(e.target.value)} className="flex-1 min-w-[200px] bg-white border border-purple-200 px-3 py-2 rounded-lg text-sm" />
                        <button onClick={testSms} className="px-3 py-2 bg-purple-700 text-white rounded-lg text-xs font-bold flex items-center gap-2"><Send className="w-3.5 h-3.5" /> Test SMS Gönder</button>
                    </div>
                    <p className="text-[11px] text-purple-700">Sağlayıcı: <strong>{settings.find((s) => s.key === 'sms.provider')?.value || '—'}</strong> (netgsm, twilio, iletimerkezi)</p>
                </div>
            )}
        </div>
    );
}
