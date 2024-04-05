import { TableBody, TableCell, TableRow } from '@windmill/react-ui';
import dayjs from 'dayjs';
import React from 'react';

//internal import

import MainDrawer from '@/components/layout/drawer/MainDrawer';
import useToggleDrawer from '@/common/hooks/useToggleDrawer';
import EditDeleteButton from '@/components/ui/table/EditDeleteButton';
import AdminsDrawer from './adminsDrawer/AdminsDrawer';
import { usePopupCtx } from '@/common/popup/usePopupCtx';
import { POPUP_TYPES } from '@/common/popup/popupRegistration';

// internal imports

function AdminTable({ admins }) {
    const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();
    const { showPopup, setPopupState } = usePopupCtx();

    function openModal(rowInfo) {
        showPopup(POPUP_TYPES.DELETE_ADMIN);
        setPopupState((prev) => ({ ...prev, deletingAdminInfo: rowInfo }));
    }

    return (
        <>
            <MainDrawer>
                <AdminsDrawer id={serviceId} />
            </MainDrawer>

            <TableBody>
                {admins?.map((admin) => (
                    <TableRow key={admin.id}>
                        <TableCell>
                            <span className='font-semibold uppercase text-xs'> {admin?.id}</span>
                        </TableCell>
                        <TableCell>
                            <span className='text-sm'>{admin.name}</span>
                        </TableCell>
                        <TableCell>
                            <span className='text-sm'>{admin.email}</span>{' '}
                        </TableCell>
                        <TableCell>
                            <span className='text-sm'>
                                {dayjs(admin.createdDate).format('YYYY년 MM월 DD일')}
                            </span>
                        </TableCell>

                        <TableCell>
                            <div className='flex justify-end text-right'>
                                <EditDeleteButton
                                    title={admin.name}
                                    id={admin.id}
                                    edittingRowInfo={admin}
                                    handleUpdate={handleUpdate}
                                    openDeleteModal={() => openModal(admin)}
                                />
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </>
    );
}

export default AdminTable;
