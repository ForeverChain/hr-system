import React, { useState, useContext, useEffect } from 'react';
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
import { LiaNewspaper } from 'react-icons/lia';

import { usePlaceCtx } from './usePlaceCtx';

import { BtnTw, OutlineBtn, OutlineBtnTw, RedBtn } from '@/components/ui/button/Button';
import { useDrawerCtx } from '@/common/drawer/useDrawerCtx';
import { DRAWER_TYPES } from '@/common/drawer/DisplayDrawer';
import placeService from './place.service';
import { excrept } from '@/libs/utils/string';
import EditDeleteButton from '@/components/ui/table/EditDeleteButton';
import useToggleDrawer from '@/common/hooks/useToggleDrawer';

import { usePopupCtx } from '@/common/popup/usePopupCtx';
import { POPUP_TYPES } from '@/common/popup/popupRegistration';

import Tooltip from '@/components/ui/tooltip/Tooltip';
import MainDrawer from '@/components/layout/drawer/MainDrawer';
import AdminsDrawer from './adminsDrawer/AdminsDrawer';
import { SidebarContext } from '@/components/layout/sidebar/SidebarContext';
import { useLocation } from 'react-router-dom';
import { useGlobalCtx } from '@/common/global/useGlobalCtx';
import { FcRating } from 'react-icons/fc';
import usePlace from './usePlace';
import useUsers from '../user/useUsers';

function PlacesTable() {
    const history = useHistory();
    const { title, serviceId, handleModalOpen, handleUpdate, handleShow, isItInfo } =
        useToggleDrawer();
    const { placeList, pagination, setPagination, claimsListQueryParams, setPlaceList } =
        usePlaceCtx();
    const { getAllAdminsList, getExportCustomersList, addHr } = usePlace();

    const location = useLocation();

    const { setEdittingRowInfo } = useGlobalCtx();

    const { showPopup, setPopupState } = usePopupCtx();
    const [sortBy, setSortBy] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');


    function openModal(rowInfo) {
        showPopup(POPUP_TYPES.DELETE_INTERVIEW);
        setPopupState((prev) => ({ ...prev, deletingUserInfo: rowInfo }));
    }
    const { updateUser } = useUsers();

    // useEffect(() => {
    //     // Check if location.state.user and location.state.user._id exist
    //     if (location?.state?.user && location.state?.user?._id && placeList) {
    //         const foundPlace = placeList?.find(
    //             (place) => place?.candidateId?._id === location.state.user._id,
    //         );

    //         if (foundPlace) {
    //             handleUpdate(foundPlace._id);
    //             setEdittingRowInfo(foundPlace);
    //         } else {
    //             handleUpdate();
    //         }
    //     }
    // }, [location?.state?.user?._id, placeList]);

    const scoreToText = (score) => {
        if (score === 1) {
            return 'Хангалтгүй';
        } else if (score === 2) {
            return 'Дунджаас доогуур';
        } else if (score === 3) {
            return 'Дундаж';
        } else if (score === 4) {
            return 'Сайн';
        } else if (score === 5) {
            return 'Маш сайн';
        } else {
            return ''; // Or handle any other cases if necessary
        }
    };

    function openModalInterview(rowInfo) {
        setPopupState((prev) => ({ ...prev, deletingAdminInfo: rowInfo }));
    }

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortOrder('asc');
        }
    };
    const sortedPlaces = placeList?.slice().sort((a, b) => {
        const scoreA = a?.resultId?.[0]?.rate;
        const scoreB = b?.resultId?.[0]?.rate;
        if (sortOrder === 'asc') {
            return scoreA - scoreB;
        } else {
            return scoreB - scoreA;
        }
    });
    const anketUpdate = (id) => {
        const payload = new FormData();
        payload.append('type', "completed");
        updateUser(id, payload)
    }

    const { showDrawer } = useDrawerCtx();

    const { toggleDrawer, isDrawerOpen } = useContext(SidebarContext);

    return (
        <>
            <MainDrawer>
                <AdminsDrawer id={serviceId} />
            </MainDrawer>
            <Table>
                <TableHeader>
                    <tr>
                        <TableCell>Ажил горилигчын нэр</TableCell>
                        {/* <TableCell>Ярилцлага авсан өдөр</TableCell> */}
                        <TableCell>Утас</TableCell>
                        <TableCell>Имэйл</TableCell>

                        {/* <TableCell>Ярилцлага авсан Hr</TableCell> */}
                        <TableCell className='text-right'>
                            <button onClick={() => handleSort('skills')}>
                                Үйлдэлүүд{sortBy === 'skills' && (sortOrder === 'asc' ? '▲' : '▼')}
                            </button>
                        </TableCell>
                    </tr>
                </TableHeader>

                <TableBody>
                    {sortedPlaces?.map(
                        (place) =>
                            place?.candidateId?.type === "processing" && (
                                <TableRow key={place._id}>
                                    <TableCell>
                                        <span className='font-semibold uppercase text-xs'>
                                            {' '}
                                            {place?.candidateId?.firstName}
                                        </span>
                                    </TableCell>
                                    {/* <TableCell>
                                        <span className='text-sm'>
                                            {new Date(place.date).toISOString().split('T')[0]}
                                        </span>
                                    </TableCell> */}

                                    <TableCell>
                                        <span className='text-sm'>
                                            {place?.candidateId?.phoneNumber}
                                        </span>{' '}
                                    </TableCell>
                                    <TableCell>
                                        <span className='text-sm'>{place?.candidateId?.email}</span>
                                    </TableCell>

                                    {/* <TableCell>
                                        <span className='text-sm'>{place.hr?.userName}</span>{' '}
                                    </TableCell> */}
                                    <TableCell>
                                        <div className='flex justify-end text-right'>
                                            <button
                                                className='p-2 cursor-pointer text-gray-400 hover:text-emerald-600 focus:outline-none'
                                                onClick={() => {
                                                    showPopup(POPUP_TYPES.ANKET_POPUP);
                                                    openModalInterview(place);
                                                }}
                                            >
                                                <Tooltip
                                                    id='view'
                                                    Icon={LiaNewspaper}
                                                    title='View Attribute'
                                                    bgColor='#34D399'
                                                />
                                            </button>
                                            <EditDeleteButton
                                                title={place?.name}
                                                id={place?._id}
                                                edittingRowInfo={place}
                                                handleUpdate={handleUpdate}
                                                openDeleteModal={() => openModal(place)}
                                            />

                                            <button
                                                className='p-2 cursor-pointer text-gray-400 hover:text-emerald-600 focus:outline-none'
                                                onClick={() => {
                                                    anketUpdate(place?.candidateId?._id)
                                                }}
                                            >
                                                <Tooltip
                                                    id='view'
                                                    Icon={FcRating}
                                                    title='View Attribute'
                                                    bgColor='#34D399'
                                                />
                                            </button>

                                        </div>
                                    </TableCell>
                                </TableRow>
                            ),
                    )}
                </TableBody>
            </Table>
        </>
    );
}

export default PlacesTable;
