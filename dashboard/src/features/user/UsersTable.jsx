import { TableBody, TableCell, TableRow } from '@windmill/react-ui';
import dayjs from 'dayjs';
import { t } from 'i18next';
import React, { useState, useContext } from 'react';
import { FiZoomIn, FiEdit, FiTrash2, FiSend } from 'react-icons/fi';
import { SidebarContext } from '@/components/layout/sidebar/SidebarContext';
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
import useUsers from './useUsers';
// internal imports

function UsersTable({ customers }) {
    const { title, serviceId, handleModalOpen, handleUpdate, handleShow, isItInfo } =
        useToggleDrawer();
    const { toggleDrawer, isDrawerOpen } = useContext(SidebarContext);
    const { updateUser, getAllAdminsList } = useUsers();
    const { showPopup, setPopupState } = usePopupCtx();

    function openModal(rowInfo) {
        showPopup(POPUP_TYPES.DELETE_USER);
        setPopupState((prev) => ({ ...prev, deletingUserInfo: rowInfo }));
    }

    const [initialFormData, setInitialFormData] = useState({});

    const handleLinkClick = (id, user) => {
        // Update form data with user information
        const formData = {
            lastName: { value: user?.lastName || '', error: null },
            firstName: { value: user?.firstName || '', error: null },
            email: { value: user?.email || '', error: null },
            phoneNumber: { value: user?.phoneNumber || '', error: null },
            country: { value: user?.education[0]?.country || '', error: null },
            school: { value: user?.education[0]?.school || '', error: null },
            educationDegrees: {
                value: user?.education[0]?.educationDegrees || '',
                error: null,
            },
            educationStartDate: { value: user?.education[0]?.startDate || '', error: null },
            educationEndDate: { value: user?.education[0]?.endDate || '', error: null },
            job: { value: user?.education[0]?.job || '', error: null },
            gpa: { value: user?.education[0]?.gpa || '', error: null },
            courseName: { value: user?.courses[0]?.courseName || '', error: null },
            courseStartDate: { value: user?.courses[0]?.startDate || '', error: null },
            courseEndDate: { value: user?.courses[0]?.endDate || '', error: null },
            acquiredSkill: { value: user?.courses[0]?.acquiredSkill || '', error: null },
            companyName: { value: user?.courses[0]?.companyName || '', error: null },
            languageName: {
                value: user?.foreignLanguages[0]?.languageName || '',
                error: null,
            },
            reading: { value: user?.foreignLanguages[0]?.reading || '', error: null },
            listening: { value: user?.foreignLanguages[0]?.listening || '', error: null },
            writing: { value: user?.foreignLanguages[0]?.writing || '', error: null },
            speaking: { value: user?.foreignLanguages[0]?.speaking || '', error: null },
            company: { value: user?.workExperiences[0]?.company || '', error: null },
            role: { value: user?.workExperiences[0]?.role || '', error: null },
            workStartDate: { value: user?.workExperiences[0]?.startDate || '', error: null },
            workEndDate: { value: user?.workExperiences[0]?.endDate || '', error: null },
            quitJobReason: {
                value: user?.workExperiences[0]?.quitJobReason || '',
                error: null,
            },
        };

        const payload = new FormData();

        // Append form data to the payload
        Object.entries(formData).forEach(([key, form]) => {
            payload.append(key, form.value);
        });

        payload.append('isSelected', true);

        updateUser(id, payload)
            .then((res) => {
                if (res.message === 'success') {
                    toggleDrawer();
                    getAllAdminsList();
                }
            })
            .catch((err) => {
                console.error(err);
                // Handle errors, maybe update state to show error message to the user
            });
    };

    return (
        <>
            <MainDrawer>
                <CustomerDrawer id={serviceId} isItInfo={isItInfo} />
            </MainDrawer>

            <TableBody>
                {customers?.map((user) => (
                    <TableRow key={user._id + 'usertablerow'}>
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
                                <button className='p-2 cursor-pointer text-gray-400 hover:text-emerald-600 focus:outline-none'>
                                    <Link
                                        to={{
                                            pathname: '/interview',
                                            state: { user },
                                        }}
                                        className='p-2 cursor-pointer text-gray-400 hover:text-emerald-600 focus:outline-none'
                                        onClick={() => handleLinkClick(user._id, user)}
                                    >
                                        <Tooltip
                                            id='edit'
                                            Icon={FiSend}
                                            title={t('Edit')}
                                            bgColor='#10B981'
                                        />
                                    </Link>
                                </button>
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
