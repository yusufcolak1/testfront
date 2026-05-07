import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Save, X, Check } from 'lucide-react';

/**
 * Reusable admin CRUD table.
 *
 * props:
 *  title: string
 *  columns: [{ key, label, render?: (row) => node, width? }]
 *  fields:  [{ key, label, type ('text'|'textarea'|'number'|'select'|'checkbox'), options?, required? }]
 *  fetch: () => Promise<{ data: [] }>
 *  create?: (data) => Promise
 *  update?: (id, data) => Promise
 *  remove?: (id) => Promise
 *  initial?: object (default form values)
 */
export default function CrudTable({ title, columns, fields, fetch, create, update, remove, initial = {} }) {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(null); // null | 'new' | row
    const [form, setForm] = useState(initial);
    const [error, setError] = useState(null);

    const load = async () => {
        try {
            setLoading(true); setError(null);
            const r = await fetch();
            setRows(r.data || []);
        } catch (e) { setError(e.message); }
        finally { setLoading(false); }
    };
    useEffect(() => { load(); }, []);

    const startNew = () => { setEditing('new'); setForm({ ...initial }); };
    const startEdit = (row) => { setEditing(row); setForm({ ...row }); };
    const cancel = () => { setEditing(null); setForm(initial); };

    const save = async () => {
        try {
            // Required check
            for (const f of fields) {
                if (f.required && !form[f.key] && form[f.key] !== false && form[f.key] !== 0) {
                    return alert(`${f.label} gerekli`);
                }
            }
            // Type coercion
            const payload = { ...form };
            for (const f of fields) {
                if (f.type === 'number' && payload[f.key] !== undefined && payload[f.key] !== '') {
                    payload[f.key] = Number(payload[f.key]);
                }
            }
            if (editing === 'new') await create(payload);
            else await update(editing.id, payload);
            await load();
            cancel();
        } catch (e) { alert(e.message); }
    };

    const handleDelete = async (row) => {
        if (!remove) return;
        if (!confirm('Silmek istediğinize emin misiniz?')) return;
        try { await remove(row.id); await load(); } catch (e) { alert(e.message); }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-black text-stone-900">{title}</h1>
                {create && (
                    <button onClick={startNew} className="px-3 py-2 bg-stone-900 text-amber-400 rounded-lg text-xs font-bold flex items-center gap-2">
                        <Plus className="w-4 h-4" /> Yeni Ekle
                    </button>
                )}
            </div>

            {error && <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm">{error}</div>}

            {editing && (
                <div className="bg-white border-2 border-amber-400 rounded-2xl p-4 md:p-6 space-y-3 shadow-xl">
                    <h2 className="font-bold text-stone-900">{editing === 'new' ? 'Yeni Kayıt' : 'Düzenle'}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {fields.map((f) => (
                            <FieldInput key={f.key} field={f} value={form[f.key]} onChange={(v) => setForm({ ...form, [f.key]: v })} fullWidth={f.type === 'textarea'} />
                        ))}
                    </div>
                    <div className="flex gap-2 pt-2">
                        <button onClick={save} className="px-3 py-2 bg-stone-900 text-amber-400 rounded-lg text-xs font-bold flex items-center gap-1.5"><Save className="w-3.5 h-3.5" /> Kaydet</button>
                        <button onClick={cancel} className="px-3 py-2 bg-stone-100 text-stone-700 rounded-lg text-xs font-bold flex items-center gap-1.5"><X className="w-3.5 h-3.5" /> İptal</button>
                    </div>
                </div>
            )}

            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-stone-50 border-b border-stone-200">
                            <tr>
                                {columns.map((c) => (
                                    <th key={c.key} className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest text-stone-500" style={{ width: c.width }}>{c.label}</th>
                                ))}
                                <th className="text-right px-4 py-3 text-[10px] font-black uppercase tracking-widest text-stone-500" style={{ width: 110 }}>İşlem</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100">
                            {loading ? (
                                <tr><td colSpan={columns.length + 1} className="text-center py-8 text-stone-400">Yükleniyor…</td></tr>
                            ) : rows.length === 0 ? (
                                <tr><td colSpan={columns.length + 1} className="text-center py-8 text-stone-400">Kayıt yok</td></tr>
                            ) : rows.map((row) => (
                                <tr key={row.id} className="hover:bg-stone-50">
                                    {columns.map((c) => (
                                        <td key={c.key} className="px-4 py-2.5 align-top">
                                            <div className="text-stone-800">{c.render ? c.render(row) : (row[c.key] ?? '—')}</div>
                                        </td>
                                    ))}
                                    <td className="px-4 py-2.5 text-right whitespace-nowrap">
                                        {update && (
                                            <button onClick={() => startEdit(row)} className="p-1.5 bg-stone-100 hover:bg-stone-200 rounded-lg text-stone-600 mr-1">
                                                <Edit2 className="w-3.5 h-3.5" />
                                            </button>
                                        )}
                                        {remove && (
                                            <button onClick={() => handleDelete(row)} className="p-1.5 bg-red-50 hover:bg-red-100 rounded-lg text-red-500">
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function FieldInput({ field, value, onChange, fullWidth }) {
    const cls = "w-full bg-stone-50 border border-stone-200 px-3 py-2 rounded-lg text-sm";
    const wrapperCls = fullWidth ? 'md:col-span-2' : '';
    return (
        <div className={`space-y-1 ${wrapperCls}`}>
            <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">{field.label}{field.required && ' *'}</label>
            {field.type === 'textarea' ? (
                <textarea className={`${cls} min-h-[100px]`} value={value ?? ''} onChange={(e) => onChange(e.target.value)} />
            ) : field.type === 'select' ? (
                <select className={cls} value={value ?? ''} onChange={(e) => onChange(e.target.value)}>
                    <option value="">— seçin —</option>
                    {field.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
            ) : field.type === 'checkbox' ? (
                <div className="flex items-center gap-2 py-2">
                    <input type="checkbox" checked={!!value} onChange={(e) => onChange(e.target.checked)} />
                    <span className="text-xs text-stone-600">{field.checkboxLabel || 'Aktif'}</span>
                </div>
            ) : field.type === 'number' ? (
                <input type="number" className={cls} value={value ?? ''} onChange={(e) => onChange(e.target.value)} />
            ) : (
                <input type="text" className={cls} value={value ?? ''} onChange={(e) => onChange(e.target.value)} />
            )}
        </div>
    );
}
