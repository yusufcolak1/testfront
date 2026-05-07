import React from 'react';
import CrudTable from './CrudTable';
import api from '../../lib/api';

export default function HelpCategories() {
    return (
        <CrudTable
            title="Yardım Kategorileri"
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
                { key: 'icon', label: 'İkon (User, Zap, FileText, ShieldCheck, ...)' },
                { key: 'order', label: 'Sıra', type: 'number' },
                { key: 'isActive', label: 'Aktif', type: 'checkbox' },
            ]}
            initial={{ isActive: true, order: 0, icon: 'HelpCircle' }}
            fetch={() => api.admin.listHelpCategories()}
            create={(d) => api.admin.createHelpCategory(d)}
            update={(id, d) => api.admin.updateHelpCategory(id, d)}
            remove={(id) => api.admin.deleteHelpCategory(id)}
        />
    );
}
