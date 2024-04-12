import React from 'react';

//internal import
import { AdminProvider } from './useAdminCtx';
import { PopupProvider } from '@/common/popup/usePopupCtx';
import Admins from './Admins';

export default function HrPage() {
    return (
        <AdminProvider>
            <PopupProvider>
                <Admins />
            </PopupProvider>
        </AdminProvider>
    );
}
