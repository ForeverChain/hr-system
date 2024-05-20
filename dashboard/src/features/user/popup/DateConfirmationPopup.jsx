import React, { useState } from 'react';

import MainPopup from '@/common/popup/_partials/MainPopup';
import { usePopupCtx } from '@/common/popup/usePopupCtx';
import useUsers from '../useUsers';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

export default function DateConfirmationPopUp() {
    const { hidePopup, hideAllPopups, popupState } = usePopupCtx();
    const { deleteUser, getAllCustomersList } = useUsers();
    const [time, setTime] = useState('');

    const { updateUser, getAllAdminsList } = useUsers();

    let navigate = useHistory();

    function deleteUserFunction(id) {
        if (!time) {
            toast('Please select a time', { type: 'error' });
            return;
        }

        const payload = new FormData();
        payload.append('interviewTime', time);
        payload.append('type', 'processing');

        updateUser(id, payload)
            .then((res) => {
                if (res.status === 'success') {
                    toast('Successfully updated', { type: 'success' });
                    getAllCustomersList();
                    hideAllPopups();
                    navigate.push('/interview', { state: popupState?.deletingUserInfo });
                }
            })
            .catch((err) => {
                alert('Error updating user');
            });
    }

    return (
        <MainPopup
            title='Цаг тохирох хэсэг'
            footerAction1={hidePopup}
            footerText1='Болих'
            footerAction2={() => deleteUserFunction(popupState?.deletingUserInfo?._id)}
            footerText2=' Оруулах'
            minWidth={500}
        >
            <div className='flex flex-col gap-1'>
                <div className='flex flex-col gap-2 mt-4'>
                    <label htmlFor='time-input'>Time:</label>
                    <input
                        id='time-input'
                        type='time'
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className='border p-2'
                    />
                </div>
                <p className=' text-red-600 text-center mt-5 text-lg font-semibold'>
                    Оруулахдаа илтгэлтэй байна уу?
                </p>
            </div>
        </MainPopup>
    );
}
