import React from 'react';
import CrudTable from './CrudTable';
import api from '../../lib/api';

export default function Faqs() {
    return (
        <CrudTable
            title="Sık Sorulan Sorular"
            columns={[
                { key: 'order', label: '#', width: 50 },
                { key: 'question', label: 'Soru' },
                { key: 'category', label: 'Kategori' },
                { key: 'isActive', label: 'Aktif', render: (r) => r.isActive ? '✅' : '—' },
            ]}
            fields={[
                { key: 'question', label: 'Soru', required: true },
                { key: 'answer', label: 'Cevap', type: 'textarea', required: true },
                { key: 'category', label: 'Kategori (Genel/Premium/...)' },
                { key: 'order', label: 'Sıra', type: 'number' },
                { key: 'isActive', label: 'Aktif', type: 'checkbox' },
            ]}
            initial={{ isActive: true, order: 0 }}
            fetch={() => api.admin.listFaqs()}
            create={(d) => api.admin.createFaq(d)}
            update={(id, d) => api.admin.updateFaq(id, d)}
            remove={(id) => api.admin.deleteFaq(id)}
        />
    );
}
