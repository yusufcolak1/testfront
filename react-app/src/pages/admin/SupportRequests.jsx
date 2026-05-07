import React, { useEffect, useState } from 'react';
import api from '../../lib/api';
import CrudTable from './CrudTable';
import { Mail, MessageSquare, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export default function SupportRequests() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRequests = async () => {
        try {
            setLoading(true);
            const r = await api.admin.listSupportRequests();
            setRequests(r.data?.requests || []);
        } catch (e) { console.error(e); }
        finally { setLoading(false); }
    };

    useEffect(() => { fetchRequests(); }, []);

    const columns = [
        { key: 'name', label: 'Ad Soyad' },
        { key: 'email', label: 'E-posta' },
        { key: 'subject', label: 'Konu' },
        { key: 'status', label: 'Durum', render: (val) => {
            const colors = {
                'PENDING': 'bg-amber-100 text-amber-700',
                'IN_PROGRESS': 'bg-blue-100 text-blue-700',
                'RESOLVED': 'bg-green-100 text-green-700',
                'CLOSED': 'bg-stone-100 text-stone-700'
            };
            return <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${colors[val] || 'bg-stone-100'}`}>{val}</span>;
        }},
        { key: 'createdAt', label: 'Tarih', render: (val) => new Date(val).toLocaleDateString('tr-TR') }
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-serif font-black italic">Destek <span className="text-stone-400">Talepleri</span></h1>
                <button onClick={fetchRequests} className="p-2 hover:bg-stone-100 rounded-lg transition-all">
                    <Clock className="w-5 h-5 text-stone-400" />
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-stone-50 border-b border-stone-100">
                        <tr>
                            {columns.map(col => (
                                <th key={col.key} className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-stone-400">{col.label}</th>
                            ))}
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-stone-400">İşlem</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                        {requests.map(req => (
                            <tr key={req.id} className="hover:bg-stone-50/50 transition-colors">
                                {columns.map(col => (
                                    <td key={col.key} className="px-6 py-4 text-sm font-medium text-stone-600">
                                        {col.render ? col.render(req[col.key]) : req[col.key]}
                                    </td>
                                ))}
                                <td className="px-6 py-4">
                                    <button 
                                        onClick={() => alert(`Mesaj: ${req.message}`)}
                                        className="p-2 text-stone-400 hover:text-stone-900 transition-colors"
                                    >
                                        <MessageSquare className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {requests.length === 0 && !loading && (
                    <div className="p-20 text-center text-stone-400 italic">Henüz talep yok.</div>
                )}
            </div>
        </div>
    );
}
