import React from 'react';
import MainPopup from '@/common/popup/_partials/MainPopup';
import { usePopupCtx } from '@/common/popup/usePopupCtx';
import useAdmins from '../useAdmins';
import { toast } from 'react-toastify';

export default function DeleteAdminPopup() {
    const { hidePopup, hideAllPopups, popupState } = usePopupCtx();
    const { deleteAdmin } = useAdmins();
    const { getAllAdminsList } = useAdmins();

    function deleteUserFunction(id) {
        deleteAdmin(id)
            .then((res) => {
                if (res?.status === 'success') {
                    getAllAdminsList();
                    toast('Successfully', { type: 'success' });
                    hideAllPopups();
                }
            })
            .catch((err) => {
                alert('Error deleting user');
            });
    }

    return (
        <MainPopup
            title='Админ устгах'
            footerAction1={hidePopup}
            footerText1='Болих'
            footerAction2={() => deleteUserFunction(popupState?.deletingAdminInfo?._id)}
            footerText2='Устгах'
            minWidth={500}
        >
            <div className='flex flex-col gap-1'>
                <div className='flex gap-2'>
                    <div className='min-w-[100px]'>ID</div>
                    <div>{popupState?.deletingAdminInfo?._id}</div>
                </div>
                <div className='flex gap-2'>
                    <div className='min-w-[100px]'>Админ нэр</div>
                    <div>{popupState?.deletingAdminInfo?.userName}</div>
                </div>

                <p className=' text-red-600 text-center mt-5 text-lg font-semibold'>
                    Устгахдаа итгэлтэй байна уу?
                </p>
            </div>
        </MainPopup>
    );
}
