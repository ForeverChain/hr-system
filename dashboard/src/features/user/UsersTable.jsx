import { TableBody, TableCell, TableRow } from '@windmill/react-ui';
import dayjs from 'dayjs';
import { t } from 'i18next';
import React from 'react';
import { FiZoomIn } from 'react-icons/fi';
import { Link } from 'react-router-dom';

//internal import

import MainDrawer from '@/components/layout/drawer/MainDrawer';
import DeleteModal from '@/components/ui/modal/DeleteModal';
import useToggleDrawer from '@/common/hooks/useToggleDrawer';
import Tooltip from '@/components/ui/tooltip/Tooltip';
import CustomerDrawer from '@/features/user/drawer/CustomerDrawer';
import EditDeleteButton from '@/components/ui/table/EditDeleteButton';
import { usePopupCtx } from '@/common/popup/usePopupCtx';
import { POPUP_TYPES } from '@/common/popup/popupRegistration';

// internal imports

function UsersTable({ customers }) {
    const { title, serviceId, handleModalOpen, handleUpdate, handleShow, isItInfo } =
        useToggleDrawer();
    const { showPopup, setPopupState } = usePopupCtx();

    function openModal(rowInfo) {
        showPopup(POPUP_TYPES.DELETE_USER);
        setPopupState((prev) => ({ ...prev, deletingUserInfo: rowInfo }));
    }

    return (
        <>
            <MainDrawer>
                <CustomerDrawer id={serviceId} isItInfo={isItInfo} />
            </MainDrawer>

            <TableBody>
                {customers?.map((user) => (
                    <TableRow key={user.id + 'usertablerow'}>
                        <TableCell>
                            <span className='font-semibold uppercase text-xs'> {user?.id}</span>
                        </TableCell>
                        <TableCell>
                            <span className='text-sm'>{user?.name}</span>
                        </TableCell>
                        <TableCell>
                            <span className='text-sm'>{user?.email}</span>{' '}
                        </TableCell>
                        <TableCell>
                            <span className='text-sm font-medium'>
                                {user?.walletAddress &&
                                    user?.walletAddress?.substring(0, 18) + '...'}
                            </span>
                        </TableCell>
                        <TableCell>
                            <span className='text-sm'>
                                {dayjs(user?.createdDate).format('MMM D, YYYY')}
                            </span>
                        </TableCell>

                        <TableCell>
                            <div className='flex justify-end text-right'>
                                <div className='p-2 cursor-pointer text-gray-400 hover:text-emerald-600'>
                                    <p
                                        data-tip
                                        data-for={user?.id}
                                        className='text-xl'
                                        onClick={() => handleShow(user?.id)}
                                    >
                                        <FiZoomIn />
                                    </p>
                                </div>

                                <EditDeleteButton
                                    title={user?.name}
                                    id={user?.id}
                                    edittingRowInfo={user}
                                    handleUpdate={handleUpdate}
                                    openDeleteModal={() => openModal(user)}
                                />
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </>
    );
}

export default UsersTable;
