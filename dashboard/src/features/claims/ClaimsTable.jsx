import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
    Table,
    TableCell,
    TableContainer,
    TableFooter,
    TableHeader,
    TableRow,
    TableBody,
} from '@windmill/react-ui';
import { FiZoomIn } from 'react-icons/fi';
import { useClaimsCtx } from './useClaimsCtx';
import TablePagination from '@/components/ui/pagination/TablePagination';
import { BtnTw, RedBtn } from '@/components/ui/button/Button';
import { useDrawerCtx } from '@/common/drawer/useDrawerCtx';
import { DRAWER_TYPES } from '@/common/drawer/DisplayDrawer';
import ClaimsServices from './ClaimsServices';
import useClaims from '../place/useClaims';
import { excrept } from '@/libs/utils/string';

import CustomTooltip, { Tooltip } from '@/components/ui/tooltip/CustomTooltip';

function ClaimsTable() {
    const history = useHistory();
    const { claimList, pagination, setPagination, claimsListQueryParams, setClaimList } =
        useClaimsCtx();
    const { displayClaimType, displayClaimProcessStatus } = useClaims();

    async function onPageChange(page) {
        setPagination((prev) => ({
            ...prev,
            currentPage: page,
        }));
        const payLoad = {
            ...claimsListQueryParams,
            page: page - 1,
        };
        const res = await ClaimsServices.getClaimList(payLoad);
        setClaimList(res);
    }

    const { showDrawer } = useDrawerCtx();

    return (
        <TableContainer className='mb-8'>
            <Table>
                <TableHeader>
                    <tr>
                        <TableCell>에셋ID</TableCell>
                        <TableCell>신고자</TableCell>
                        <TableCell>신고유형</TableCell>
                        <TableCell>처리현황</TableCell>
                        <TableCell>신고사유</TableCell>
                        <TableCell>View</TableCell>
                        <TableCell>Actions</TableCell>
                    </tr>
                </TableHeader>
                <TableBody>
                    {claimList?.result?.content?.map((claim, idx) => (
                        <TableRow key={'claim' + idx}>
                            <TableCell>
                                <span className='font-semibold uppercase text-xs'>
                                    {claim?.asset?.id}
                                </span>
                            </TableCell>
                            <TableCell>
                                <span className='text-sm'>{claim?.reporterName}</span>
                            </TableCell>
                            <TableCell>
                                <span className='text-sm'>{displayClaimType(claim?.reason)}</span>
                            </TableCell>
                            <TableCell>
                                <span className='text-sm font-medium'>
                                    {displayClaimProcessStatus(claim?.processStatus)}
                                </span>
                            </TableCell>
                            <TableCell>
                                <span className='text-sm font-medium'>
                                    <CustomTooltip text={claim?.description || 'no description'}>
                                        <p>{excrept(claim?.description, 10) || 'no description'}</p>
                                    </CustomTooltip>
                                </span>
                            </TableCell>
                            <TableCell>
                                <div className='p-2 cursor-pointer text-gray-400 hover:text-emerald-600'>
                                    <p
                                        data-tip
                                        data-for={claim?.id}
                                        className='text-xl'
                                        onClick={() => history.push('/assets/' + claim?.asset?.id)}
                                    >
                                        <FiZoomIn />
                                    </p>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className='flex flex-col gap-2 items-center'>
                                    {claim?.processStatus === 'WAITING' ? (
                                        <>
                                            <BtnTw
                                                className='h-10'
                                                onClick={() =>
                                                    showDrawer(DRAWER_TYPES.EXPLANATION, claim)
                                                }
                                            >
                                                소명처리
                                            </BtnTw>
                                            <RedBtn
                                                onClick={() =>
                                                    showDrawer(DRAWER_TYPES.INCERNATION, claim)
                                                }
                                            >
                                                소각하기
                                            </RedBtn>
                                        </>
                                    ) : (
                                        <p>-</p>
                                    )}
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TableFooter>
                <TablePagination
                    totalItems={pagination?.totalElement}
                    itemsPerPage={pagination?.itemsPerPage}
                    onPageChange={onPageChange}
                    currentPage={pagination?.currentPage}
                />
            </TableFooter>
        </TableContainer>
    );
}

export default ClaimsTable;
