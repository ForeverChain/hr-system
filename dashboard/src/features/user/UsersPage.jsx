import React from 'react';

//internal import
import { UsersProvider } from './useUsersCtx';
import { PopupProvider } from '@/common/popup/usePopupCtx';
import UsersList from './UsersList';

function UsersPage() {
    return (
        <UsersProvider>
            <PopupProvider>
                <UsersList />
            </PopupProvider>
        </UsersProvider>
    );
}

export default UsersPage;
