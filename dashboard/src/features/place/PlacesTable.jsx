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
import { usePlaceCtx } from './usePlaceCtx';
import TablePagination from '@/components/ui/pagination/TablePagination';
import { BtnTw, OutlineBtn, OutlineBtnTw, RedBtn } from '@/components/ui/button/Button';
import { useDrawerCtx } from '@/common/drawer/useDrawerCtx';
import { DRAWER_TYPES } from '@/common/drawer/DisplayDrawer';
import placeService from './place.service';
import { excrept } from '@/libs/utils/string';

import CustomTooltip, { Tooltip } from '@/components/ui/tooltip/CustomTooltip';

function PlacesTable() {
    const history = useHistory();
    const { placeList, pagination, setPagination, claimsListQueryParams, setPlaceList } =
        usePlaceCtx();

    async function onPageChange(page) {
        setPagination((prev) => ({
            ...prev,
            currentPage: page,
        }));
        const payLoad = {
            ...claimsListQueryParams,
            page: page - 1,
        };
        const res = await placeService.getPlaceList(payLoad);
        setPlaceList(res);
    }

    const { showDrawer } = useDrawerCtx();
    console.log('placeList', placeList);
    return (
        <TableContainer className='mb-8'>
            <Table>
                <TableHeader>
                    <tr>
                        <TableCell>Гарчиг</TableCell>
                        <TableCell>Байршил</TableCell>
                        <TableCell>Категор</TableCell>
                        <TableCell>CheckIn</TableCell>
                        <TableCell>CheckOut</TableCell>
                        <TableCell>Max Quests</TableCell>
                        <TableCell>Үйлдлүүд</TableCell>
                    </tr>
                </TableHeader>
                <TableBody>
                    {placeList?.map((place, idx) => (
                        // <TableRow key={'place-' + idx}>1</TableRow>
                        <TableRow key={'place' + idx}>
                            <TableCell>
                                <span className='text-sm'>{place.title}</span>
                            </TableCell>
                            <TableCell>
                                <span className='font-semibold uppercase text-xs'>
                                    {place?.address}
                                </span>
                            </TableCell>
                            <TableCell>
                                {place?.categories?.map((cat, idx) => (
                                    <span key={'place-cat-' + idx} className='text-sm pr-2'>
                                        {cat}
                                    </span>
                                ))}
                            </TableCell>
                            <TableCell>
                                <span className='text-sm'>{place.checkIn}</span>
                            </TableCell>
                            <TableCell>
                                <span className='text-sm font-medium'>{place?.checkOut}</span>
                            </TableCell>
                            <TableCell>
                                <span className='text-sm font-medium'>{place?.maxGuests}</span>
                            </TableCell>
                            <TableCell>
                                <div className=' flex gap-2'>
                                    <BtnTw
                                        className='h-10'
                                        onClick={() => showDrawer(DRAWER_TYPES.EXPLANATION, place)}
                                    >
                                        дэлгэрэнгүй
                                    </BtnTw>
                                    <OutlineBtnTw
                                        onClick={() => showDrawer(DRAWER_TYPES.INCERNATION, place)}
                                        className=' text-zinc-700 bg-transparent border border-gray-500'
                                    >
                                        зөвшөөрөх
                                    </OutlineBtnTw>
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

export default PlacesTable;
