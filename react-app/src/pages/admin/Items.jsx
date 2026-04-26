import React from 'react';
import CrudTable from './CrudTable';
import api from '../../lib/api';

export default function Items() {
    return (
        <CrudTable
            title="İlanlar"
            columns={[
                { key: 'title', label: 'Başlık' },
                { key: 'category', label: 'Kategori', render: (r) => r.category?.name || '—' },
                { key: 'user', label: 'Sahip', render: (r) => r.user?.profile ? `${r.user.profile.firstName} ${r.user.profile.lastName}` : '—' },
                { key: 'condition', label: 'Durum' },
                { key: 'status', label: 'Status' },
                { key: 'isFeatured', label: 'Öne Çık', render: (r) => r.isFeatured ? '⭐' : '' },
                { key: 'isPopular', label: 'Popüler', render: (r) => r.isPopular ? '🔥' : '' },
                { key: 'viewCount', label: 'Görüntülenme' },
            ]}
            fields={[
                { key: 'title', label: 'Başlık', required: true },
                { key: 'description', label: 'Açıklama', type: 'textarea' },
                { key: 'condition', label: 'Durum', type: 'select', options: [
                    { value: 'NEW', label: 'Sıfır' },
                    { value: 'LIKE_NEW', label: 'Yeni Gibi' },
                    { value: 'GOOD', label: 'İyi' },
                    { value: 'FAIR', label: 'Orta' },
                    { value: 'POOR', label: 'Kötü' },
                ] },
                { key: 'status', label: 'Status', type: 'select', options: [
                    { value: 'ACTIVE', label: 'Aktif' },
                    { value: 'DRAFT', label: 'Taslak' },
                    { value: 'SOLD', label: 'Takasta Verildi' },
                    { value: 'ARCHIVED', label: 'Arşiv' },
                    { value: 'DELETED', label: 'Silindi' },
                ] },
                { key: 'estimatedValue', label: 'Tahmini Değer (₺)', type: 'number' },
                { key: 'location', label: 'Konum' },
                { key: 'swapFor', label: 'Takas İstenen' },
                { key: 'tag', label: 'Etiket' },
                { key: 'isFeatured', label: 'Öne Çıkar', type: 'checkbox' },
                { key: 'isPopular', label: 'Popüler', type: 'checkbox' },
            ]}
            fetch={() => api.admin.listItems()}
            update={(id, d) => api.admin.updateItem(id, d)}
            remove={(id) => api.admin.deleteItem(id)}
        />
    );
}
