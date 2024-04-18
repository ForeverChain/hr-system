import React from 'react';
import MainPopup from '@/common/popup/_partials/MainPopup';
import { usePopupCtx } from '@/common/popup/usePopupCtx';
import useUsers from '../useUsers';
import { toast } from 'react-toastify';

export default function DeleteUserPopup() {
    const { hidePopup, hideAllPopups, popupState } = usePopupCtx();
    const { deleteUser, getAllCustomersList } = useUsers();

    function deleteUserFunction(id) {
        deleteUser(id)
            .then((res) => {
                if (res.status === 'success') {
                    toast('Successfully', { type: 'success' });
                    getAllCustomersList();
                    hideAllPopups();
                }
            })
            .catch((err) => {
                alert('Error deleting user');
            });
    }

    return (
        <MainPopup
            title='Ажил горилогч устгах хэсэг'
            footerAction1={hidePopup}
            footerText1='Болих'
            footerAction2={() => deleteUserFunction(popupState?.deletingUserInfo?._id)}
            footerText2=' Устгах'
            minWidth={500}
        >
            <div className='flex flex-col gap-1'>
                <div className='flex gap-2'>
                    <div className='min-w-[100px]'>ID</div>
                    <div>{popupState?.deletingUserInfo?._id}</div>
                </div>
                <div className='flex gap-2'>
                    <div className='min-w-[100px]'>Овог</div>
                    <div>{popupState?.deletingUserInfo?.firstName}</div>
                </div>
                <div className='flex gap-2'>
                    <div className='min-w-[100px]'>Нэр</div>
                    <div>{popupState?.deletingUserInfo?.lastName}</div>
                </div>
                <div className='flex gap-2'>
                    <div className='min-w-[100px]'>Имэйл</div>
                    <div>{popupState?.deletingUserInfo?.email}</div>
                </div>
                <p className=' text-red-600 text-center mt-5 text-lg font-semibold'>
                    Устгахдаа илтгэлтэй байна уу?
                </p>
            </div>
        </MainPopup>
    );
}
