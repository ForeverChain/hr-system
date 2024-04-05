import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Table, TableCell, TableContainer, TableFooter, TableHeader } from '@windmill/react-ui';
import useAsset from '../useAsset';
import { useAssetsCtx } from '../useAssetCtx';
import { useAssetDetailCtx } from './useAssetDetailCtx';
import AssetServices from '../AssetServices';
import { useGlobalCtx } from '@/common/global/useGlobalCtx';
import PageTitle from '@/components/ui/Typography/PageTitle';
import AssetDetailMainInfo from './AssetDetailMainInfo';
import AssetNFTListTable from './AssetNFTListTable';
import TablePagination from '@/components/ui/pagination/TablePagination';
import NotFound from '@/components/ui/table/NotFound';

export default function AssetDetail() {
    const { id } = useParams();
    const { getAssetDetail, getAssetDetailNFTList } = useAsset();
    // const { assetDetail, itemPerPage } = useAssetDetailCtx()
    const {
        assetDetail,
        assetDetailNFTList,
        assetDetailPaginationInfo,
        setAssetDetailPaginationInfo,
    } = useGlobalCtx();

    function changePage(page) {
        setAssetDetailPaginationInfo((prev) => ({ ...prev, currentPage: page }));
    }

    useEffect(() => {
        if (id) {
            getAssetDetail({ id }).then((res) => {
                if (res.message === 'success') {
                    getAssetDetailNFTList({
                        id: +res?.result?.token,
                        page: 1,
                    });
                }
            });
        }
    }, [id]);

    useEffect(() => {
        if (assetDetail) {
            getAssetDetailNFTList({
                id: +assetDetail?.token,
                page: assetDetailPaginationInfo?.currentPage,
            });
        }
    }, [assetDetailPaginationInfo?.currentPage]);

    return (
        <>
            <PageTitle>Asset Details / {id}</PageTitle>
            <AssetDetailMainInfo />
            {assetDetailNFTList?.items?.length !== 0 ? (
                <TableContainer className='mb-8'>
                    <Table>
                        <TableHeader>
                            <tr>
                                <TableCell>타입</TableCell>
                                <TableCell>TokenId</TableCell>
                                <TableCell>Owner</TableCell>
                                <TableCell>View</TableCell>
                            </tr>
                        </TableHeader>
                        <AssetNFTListTable data={assetDetailNFTList?.items} />
                    </Table>
                    <TableFooter>
                        <TablePagination
                            totalItems={assetDetailPaginationInfo?.totalElement}
                            itemsPerPage={assetDetailPaginationInfo?.itemPerPage}
                            onPageChange={changePage}
                            currentPage={assetDetailPaginationInfo?.currentPage}
                        />
                    </TableFooter>
                </TableContainer>
            ) : (
                <NotFound title='데이터 없음.' />
            )}
        </>
    );
}
