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
import { FiZoomIn } from 'react-icons/fi';
import { useNftCtx } from './useNftCtx';
import TablePagination from '@/components/ui/pagination/TablePagination';
import NftServices from './NftServices';
import useToggleDrawer from '@/common/hooks/useToggleDrawer';
import MainDrawer from '@/components/layout/drawer/MainDrawer';
import NftDrawer from './drawer/NftDrawer';

function NftsTable() {
    const { nftList, pagination, setPagination } = useNftCtx();
    // const [pagination, setPagination] = useState({
    //     currentPage: 1,
    //     totalElement: 1,
    //     itemsPerPage: 10,
    // });
    const { title, serviceId, handleModalOpen, handleUpdate, handleShow, isItInfo } =
        useToggleDrawer();

    function onPageChange(page) {
        setPagination((prev) => ({
            ...prev,
            currentPage: page,
        }));
    }
    const [selectedNft, setSelectedNft] = useState(null);

    function handleShowNftDrawer(nft) {
        if (!nft) return;
        handleShow(nft?.id);
        setSelectedNft(nft);
    }

    return (
        <TableContainer className='mb-8'>
            <MainDrawer>
                <NftDrawer id={serviceId} nft={selectedNft} />
            </MainDrawer>
            <Table>
                <TableHeader>
                    <tr>
                        <TableCell>토큰 타입</TableCell>
                        <TableCell>토큰ID</TableCell>
                        <TableCell>에셋토큰ID</TableCell>
                        <TableCell>소유자</TableCell>
                        <TableCell>View</TableCell>
                    </tr>
                </TableHeader>
                <TableBody>
                    {nftList?.items?.map((nft, idx) => (
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
                                <span className='text-sm font-medium'>{nft?.owner}</span>
                            </TableCell>
                            <TableCell>
                                <div className='p-2 cursor-pointer text-gray-400 hover:text-emerald-600'>
                                    <p
                                        data-tip
                                        data-for={nft?.id}
                                        className='text-xl'
                                        onClick={() => handleShowNftDrawer(nft)}
                                    >
                                        <FiZoomIn />
                                    </p>
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

export default NftsTable;
