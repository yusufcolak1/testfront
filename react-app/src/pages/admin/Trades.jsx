import React from 'react';
import CrudTable from './CrudTable';
import api from '../../lib/api';

export default function Trades() {
    return (
        <CrudTable
            title="Takaslar"
            columns={[
                { key: 'sender', label: 'Gönderen', render: (r) => r.sender?.profile ? `${r.sender.profile.firstName} ${r.sender.profile.lastName}` : '—' },
                { key: 'receiver', label: 'Alıcı', render: (r) => r.receiver?.profile ? `${r.receiver.profile.firstName} ${r.receiver.profile.lastName}` : '—' },
                { key: 'items', label: 'Eşyalar', render: (r) => r.tradeItems?.map((ti) => ti.item?.title).filter(Boolean).join(' ↔ ') || '—' },
                { key: 'status', label: 'Durum' },
                { key: 'createdAt', label: 'Tarih', render: (r) => new Date(r.createdAt).toLocaleDateString('tr-TR') },
            ]}
            fields={[
                { key: 'status', label: 'Durum', type: 'select', options: [
                    { value: 'PENDING', label: 'Beklemede' },
                    { value: 'ACCEPTED', label: 'Kabul Edildi' },
                    { value: 'REJECTED', label: 'Reddedildi' },
                    { value: 'COMPLETED', label: 'Tamamlandı' },
                    { value: 'CANCELLED', label: 'İptal Edildi' },
                ] },
            ]}
            fetch={() => api.admin.listTrades()}
            update={(id, d) => api.admin.updateTrade(id, d)}
            remove={(id) => api.admin.deleteTrade(id)}
        />
    );
}
