import React from 'react';
import { PopupProvider } from '@/common/popup/usePopupCtx';
import AssetDetail from './AssetDetail';
import { AssetDetailProvider } from './useAssetDetailCtx';

export default function AssetDetailPage() {
    return (
        <>
            <AssetDetailProvider>
                <PopupProvider>
                    <AssetDetail />
                </PopupProvider>
            </AssetDetailProvider>
        </>
    );
}
