import React from 'react';
import CrudTable from './CrudTable';
import api from '../../lib/api';

export default function Users() {
    return (
        <CrudTable
            title="Kullanıcılar"
            columns={[
                { key: 'email', label: 'E-posta' },
                { key: 'name', label: 'Ad', render: (r) => r.profile ? `${r.profile.firstName} ${r.profile.lastName}` : '—' },
                { key: 'role', label: 'Rol' },
                { key: 'status', label: 'Durum' },
                { key: 'items', label: 'İlan', render: (r) => r._count?.items ?? 0 },
                { key: 'createdAt', label: 'Kayıt', render: (r) => new Date(r.createdAt).toLocaleDateString('tr-TR') },
            ]}
            fields={[
                { key: 'email', label: 'E-posta', required: true },
                { key: 'password', label: 'Şifre (yeni veya değiştir)' },
                { key: 'firstName', label: 'Ad' },
                { key: 'lastName', label: 'Soyad' },
                { key: 'role', label: 'Rol', type: 'select', options: [
                    { value: 'USER', label: 'Kullanıcı' },
                    { value: 'MODERATOR', label: 'Moderatör' },
                    { value: 'ADMIN', label: 'Admin' },
                ] },
                { key: 'status', label: 'Durum', type: 'select', options: [
                    { value: 'ACTIVE', label: 'Aktif' },
                    { value: 'SUSPENDED', label: 'Askıya Alındı' },
                    { value: 'BANNED', label: 'Banlandı' },
                ] },
            ]}
            initial={{ role: 'USER', status: 'ACTIVE' }}
            fetch={() => api.admin.listUsers()}
            create={(d) => api.admin.createUser({
                email: d.email, password: d.password, firstName: d.firstName, lastName: d.lastName, role: d.role, status: d.status,
            })}
            update={(id, d) => {
                const payload = { role: d.role, status: d.status };
                if (d.password) payload.password = d.password;
                if (d.firstName || d.lastName) payload.profile = { firstName: d.firstName, lastName: d.lastName };
                return api.admin.updateUser(id, payload);
            }}
            remove={(id) => api.admin.deleteUser(id)}
        />
    );
}
