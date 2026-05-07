import React from 'react';
import CrudTable from './CrudTable';
import api from '../../lib/api';

export default function Plans() {
    return (
        <CrudTable
            title="Premium Planlar"
            columns={[
                { key: 'order', label: '#', width: 50 },
                { key: 'name', label: 'Ad' },
                { key: 'price', label: 'Fiyat (₺)' },
                { key: 'period', label: 'Periyot' },
                { key: 'isActive', label: 'Aktif', render: (r) => r.isActive ? '✅' : '—' },
            ]}
            fields={[
                { key: 'name', label: 'Ad', required: true },
                { key: 'price', label: 'Fiyat (₺)', type: 'number', required: true },
                { key: 'period', label: 'Periyot', type: 'select', options: [
                    { value: 'MONTHLY', label: 'Aylık' },
                    { value: 'YEARLY', label: 'Yıllık' },
                ] },
                { key: 'description', label: 'Açıklama', type: 'textarea' },
                { key: 'features', label: 'Özellikler (JSON dizi: ["a","b"])', type: 'textarea' },
                { key: 'order', label: 'Sıra', type: 'number' },
                { key: 'isActive', label: 'Aktif', type: 'checkbox' },
            ]}
            initial={{ isActive: true, order: 0, period: 'MONTHLY', features: '[]' }}
            fetch={() => api.admin.listPlans()}
            create={(d) => api.admin.createPlan(d)}
            update={(id, d) => api.admin.updatePlan(id, d)}
            remove={(id) => api.admin.deletePlan(id)}
        />
    );
}
