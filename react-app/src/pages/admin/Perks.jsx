import React from 'react';
import CrudTable from './CrudTable';
import api from '../../lib/api';

export default function Perks() {
    return (
        <CrudTable
            title="Premium Avantajlar"
            columns={[
                { key: 'order', label: '#', width: 50 },
                { key: 'title', label: 'Başlık' },
                { key: 'value', label: 'Değer' },
                { key: 'description', label: 'Açıklama' },
                { key: 'icon', label: 'İkon' },
                { key: 'isActive', label: 'Aktif', render: (r) => r.isActive ? '✅' : '—' },
            ]}
            fields={[
                { key: 'title', label: 'Başlık', required: true },
                { key: 'value', label: 'Değer (örn. AKTİF, 3/10)' },
                { key: 'description', label: 'Açıklama', type: 'textarea', required: true },
                { key: 'icon', label: 'İkon (Zap, Rocket, ShieldCheck, Star, ...)' },
                { key: 'color', label: 'Renk class (text-amber-500)' },
                { key: 'order', label: 'Sıra', type: 'number' },
                { key: 'isActive', label: 'Aktif', type: 'checkbox' },
            ]}
            initial={{ isActive: true, order: 0, icon: 'Sparkles', color: 'text-amber-500' }}
            fetch={() => api.admin.listPerks()}
            create={(d) => api.admin.createPerk(d)}
            update={(id, d) => api.admin.updatePerk(id, d)}
            remove={(id) => api.admin.deletePerk(id)}
        />
    );
}
