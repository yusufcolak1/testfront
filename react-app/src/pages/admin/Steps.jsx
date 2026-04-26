import React from 'react';
import CrudTable from './CrudTable';
import api from '../../lib/api';

export default function Steps() {
    return (
        <CrudTable
            title="Güvenli Takas Adımları"
            columns={[
                { key: 'order', label: '#', width: 50 },
                { key: 'title', label: 'Başlık' },
                { key: 'description', label: 'Açıklama' },
                { key: 'icon', label: 'İkon' },
                { key: 'isActive', label: 'Aktif', render: (r) => r.isActive ? '✅' : '—' },
            ]}
            fields={[
                { key: 'title', label: 'Başlık', required: true },
                { key: 'description', label: 'Açıklama', type: 'textarea', required: true },
                { key: 'icon', label: 'İkon (MessageSquare, Info, Users, Smartphone, Shield, ...)' },
                { key: 'order', label: 'Sıra', type: 'number' },
                { key: 'isActive', label: 'Aktif', type: 'checkbox' },
            ]}
            initial={{ isActive: true, order: 0, icon: 'Shield' }}
            fetch={() => api.admin.listSteps()}
            create={(d) => api.admin.createStep(d)}
            update={(id, d) => api.admin.updateStep(id, d)}
            remove={(id) => api.admin.deleteStep(id)}
        />
    );
}
