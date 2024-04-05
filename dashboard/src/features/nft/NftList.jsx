import React, { useEffect } from 'react';
import { Card } from '@windmill/react-ui';
import NftServices from './NftServices';
import NftsTable from './NftsTable';
import { useNftCtx } from './useNftCtx';

function NftList() {
    const { setNftList, isToggleReset, pagination, setPagination, filterQueryParams } = useNftCtx();

    useEffect(() => {
        NftServices.getNftList({
            page: pagination?.currentPage,
            queryParams: filterQueryParams,
        }).then((res) => {
            setNftList(res);
            setPagination((prev) => ({
                ...prev,
                totalElement: res?.totalItems,
                itemsPerPage: res?.perPage,
            }));
        });
    }, [isToggleReset, pagination?.currentPage]);

    return (
        <Card>
            <NftsTable />
        </Card>
    );
}

export default NftList;
