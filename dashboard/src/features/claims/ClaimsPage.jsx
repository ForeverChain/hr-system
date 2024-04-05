import React from 'react';
import PageTitle from '@/components/ui/Typography/PageTitle';
import ClaimsList from './ClaimsList';
import { ClaimsProvider } from './useClaimsCtx';
import ClaimsPageTop from './ClaimsPageTop';
import { FormProvider } from '@/components/ui/form/store/useFormCtx';
import { DrawerProvider } from '@/common/drawer/useDrawerCtx';
import DisplayDrawer from '@/common/drawer/DisplayDrawer';

function ClaimsPage() {
    return (
        <ClaimsProvider>
            <DrawerProvider>
                <PageTitle>Claims</PageTitle>
                <FormProvider>
                    <DisplayDrawer />
                    <ClaimsPageTop />
                </FormProvider>
                <ClaimsList />
            </DrawerProvider>
        </ClaimsProvider>
    );
}

export default ClaimsPage;
