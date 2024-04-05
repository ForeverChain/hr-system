import React from 'react';
import Assets from './Assets';
import { AssetsProvider } from './useAssetCtx';
import { PopupProvider } from '@/common/popup/usePopupCtx';
import { FormProvider } from '@/components/ui/form/store/useFormCtx';

export default function AssetPage() {
    return (
        <>
            <AssetsProvider>
                <PopupProvider>
                    <FormProvider>
                        <Assets />
                    </FormProvider>
                </PopupProvider>
            </AssetsProvider>
        </>
    );
}
