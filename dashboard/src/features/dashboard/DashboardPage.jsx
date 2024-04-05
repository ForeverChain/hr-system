import React from 'react';
import { AdminProvider } from '../admin/useAdminCtx';
import Dashboard from './Dashboard';

export default function DashboardPage() {
    return (
        <AdminProvider>
            <Dashboard />
        </AdminProvider>
    );
}
