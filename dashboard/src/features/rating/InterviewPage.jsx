import React from 'react';
import PageTitle from '@/components/ui/Typography/PageTitle';
import ClaimsList from './PlaceList';
import { PlaceProvider } from './usePlaceCtx';
import ClaimsPageTop from './PlacePageTop';
import { FormProvider } from '@/components/ui/form/store/useFormCtx';
import { DrawerProvider } from '@/common/drawer/useDrawerCtx';
import { PopupProvider } from '@/common/popup/usePopupCtx';
import DisplayDrawer from '@/common/drawer/DisplayDrawer';

function InterviewPage() {
    return (
        <PlaceProvider>
            <PopupProvider>
                <DrawerProvider>
                    <PageTitle>Ажилчдын үнэлгээний хэсэг</PageTitle>
                    <FormProvider>
                        <DisplayDrawer />
                        <ClaimsPageTop />
                    </FormProvider>
                    <ClaimsList />
                </DrawerProvider>
            </PopupProvider>
        </PlaceProvider>
    );
}

export default InterviewPage;
