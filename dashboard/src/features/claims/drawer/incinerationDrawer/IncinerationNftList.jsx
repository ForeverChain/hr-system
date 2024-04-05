import React, { useEffect, useState } from 'react';
import {
    Table,
    TableCell,
    TableContainer,
    TableFooter,
    TableHeader,
    TableRow,
    TableBody,
} from '@windmill/react-ui';
import TablePagination from '@/components/ui/pagination/TablePagination';
import EventServices from '@/features/event/EventServices';
import { useDrawerCtx } from '@/common/drawer/useDrawerCtx';
import { useClaimsCtx } from '../../useClaimsCtx';

function IncinerationNftList() {
    const { drawerState } = useDrawerCtx();
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalElement: 1,
        itemsPerPage: 10,
    });
    const [nftList, setNftList] = useState(null);
    const { setAllNftList } = useClaimsCtx();
    function onPageChange(page) {
        setPagination((prev) => ({
            ...prev,
            currentPage: page,
        }));
    }

    useEffect(() => {
        EventServices.getEventList({
            page: pagination.currentPage,
            queryParams: {
                assetTokenId: drawerState?.asset?.token,
            },
        })
            .then((res) => {
                setPagination((prev) => ({
                    ...prev,
                    currentPage: res?.page,
                    totalElement: res?.totalItems,
                    itemsPerPage: res?.perPage,
                }));
                setNftList(res?.items);
                return res;
            })
            .then(async (res) => {
                const allList = await EventServices.getEventList({
                    perPage: res?.totalItems,
                    queryParams: {
                        assetTokenId: drawerState?.asset?.token,
                    },
                });
                setAllNftList(allList);
            });
    }, []);

    return (
        <TableContainer className='mb-8'>
            <Table>
                <TableHeader>
                    <tr>
                        <TableCell>토큰 타입</TableCell>
                        <TableCell>토큰ID</TableCell>
                        <TableCell>에셋토큰ID</TableCell>
                        <TableCell>소유자</TableCell>
                    </tr>
                </TableHeader>
                <TableBody>
                    {nftList?.map((nft, idx) => (
                        <TableRow key={'nft' + idx}>
                            <TableCell>
                                <span className='font-semibold uppercase text-xs'>{nft?.type}</span>
                            </TableCell>
                            <TableCell>
                                <span className='text-sm'>{nft?.tokenId}</span>
                            </TableCell>
                            <TableCell>
                                <span className='text-sm'>{nft?.assetTokenId}</span>
                            </TableCell>
                            <TableCell>
                                <span className='text-sm font-medium'>{nft?.transaction_hash}</span>
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

export default IncinerationNftList;
