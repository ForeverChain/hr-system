import React, { useEffect } from 'react';
import { Card } from '@windmill/react-ui';
import ClaimsServices from './ClaimsServices';
import ClaimsTable from './ClaimsTable';
import { useClaimsCtx } from './useClaimsCtx';

function ClaimsList() {
    const { setClaimList, isToggleReset, pagination, setPagination, claimsListQueryParams } =
        useClaimsCtx();

    useEffect(() => {
        ClaimsServices.getClaimList({
            page: pagination?.currentPage - 1,
            itemPerPage: pagination?.itemsPerPage,
            ...claimsListQueryParams,
        }).then((res) => {
            setClaimList(res);
            setPagination((prev) => ({
                ...prev,
                totalElement: res?.result?.totalElements,
            }));
        });
    }, [isToggleReset]);

    return (
        <Card>
            <ClaimsTable />
        </Card>
    );
}

export default ClaimsList;
