import React, { useEffect } from 'react';
import PageTitle from '@/components/ui/Typography/PageTitle';
import NftList from './NftList';
import { NftProvider } from './useNftCtx';
import NFtPageTop from './NFtPageTop';
import { FormProvider } from '@/components/ui/form/store/useFormCtx';

function NftPage() {
    return (
        <NftProvider>
            <PageTitle>Nfts</PageTitle>
            <FormProvider>
                <NFtPageTop />
            </FormProvider>
            <NftList />
        </NftProvider>
    );
}

export default NftPage;
