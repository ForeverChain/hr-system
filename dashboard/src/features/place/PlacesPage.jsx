import React from 'react';
import PageTitle from '@/components/ui/Typography/PageTitle';
import ClaimsList from './PlaceList';
import { PlaceProvider } from './usePlaceCtx';
import ClaimsPageTop from './PlacePageTop';
import { FormProvider } from '@/components/ui/form/store/useFormCtx';
import { DrawerProvider } from '@/common/drawer/useDrawerCtx';
import DisplayDrawer from '@/common/drawer/DisplayDrawer';

function PlacesPage() {
    return (
        <PlaceProvider>
            <DrawerProvider>
                <PageTitle>Claims</PageTitle>
                <FormProvider>
                    <DisplayDrawer />
                    <ClaimsPageTop />
                </FormProvider>
                <ClaimsList />
            </DrawerProvider>
        </PlaceProvider>
    );
}

export default PlacesPage;
