import React from 'react';

//internal import
import { PopupProvider } from '@/common/popup/usePopupCtx';
import { PlatformProvider } from './usePlatformCtx';
import Platforms from './Platforms';
import PageTitle from '@/components/ui/Typography/PageTitle';

export default function AdminsPage() {
    return (
        <PlatformProvider>
            <PopupProvider>
                <PageTitle>Platforms</PageTitle>
                <Platforms />
            </PopupProvider>
        </PlatformProvider>
    );
}
