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
                            <span className='font-semibold uppercase text-xs'> {user?._id}</span>
                        </TableCell>
                        <TableCell>
                            <span className='text-sm'>{user?.lastName}</span>
                        </TableCell>
                        <TableCell>
                            <span className='text-sm'>{user?.firstName}</span>
                        </TableCell>
                        <TableCell>
                            <span className='text-sm'>{user?.email}</span>{' '}
                        </TableCell>
                        <TableCell>
                            <span className='text-sm font-medium'>{user?.phoneNumber}</span>
                        </TableCell>

                        <TableCell>
                            <div className='flex justify-end text-right'>
                                <EditDeleteButton
                                    title={user?.name}
                                    id={user?._id}
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
