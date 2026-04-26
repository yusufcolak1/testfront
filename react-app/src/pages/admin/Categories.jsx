import React from 'react';
import CrudTable from './CrudTable';
import api from '../../lib/api';

export default function Categories() {
    return (
        <CrudTable
            title="Kategoriler"
            columns={[
                { key: 'name', label: 'Ad' },
                { key: 'slug', label: 'Slug' },
                { key: 'icon', label: 'İkon' },
                { key: 'parentId', label: 'Üst Kategori', render: (r) => r.parentId ? r.parentId.slice(0, 8) + '…' : '—' },
            ]}
            fields={[
                { key: 'name', label: 'Ad', required: true },
                { key: 'slug', label: 'Slug', required: true },
                { key: 'description', label: 'Açıklama', type: 'textarea' },
                { key: 'icon', label: 'İkon adı (lucide-react)' },
                { key: 'parentId', label: 'Üst Kategori ID (opsiyonel)' },
            ]}
            fetch={() => api.getCategories()}
            create={(d) => api.admin.createCategory(d)}
            update={(id, d) => api.admin.updateCategory(id, d)}
            remove={(id) => api.admin.deleteCategory(id)}
        />
    );
}
