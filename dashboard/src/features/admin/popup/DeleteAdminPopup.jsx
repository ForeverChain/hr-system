import React from 'react';
import MainPopup from '@/common/popup/_partials/MainPopup';
import { usePopupCtx } from '@/common/popup/usePopupCtx';
import useAdmins from '../useAdmins';

export default function DeleteAdminPopup() {
    const { hidePopup, hideAllPopups, popupState } = usePopupCtx();
    const { deleteAdmin } = useAdmins();

    function deleteUserFunction(id) {
        deleteAdmin(id)
            .then((res) => {
                if (res.message === 'success') {
                    hideAllPopups();
                }
            })
            .catch((err) => {
                alert('Error deleting user');
            });
    }

    return (
        <MainPopup
            title='관리자 삭제'
            footerAction1={hidePopup}
            footerText1='취소'
            footerAction2={() => deleteUserFunction(popupState?.deletingAdminInfo?.id)}
            footerText2='삭제'
            minWidth={500}
        >
            <div className='flex flex-col gap-1'>
                <div className='flex gap-2'>
                    <div className='min-w-[100px]'>ID</div>
                    <div>{popupState?.deletingAdminInfo?.id}</div>
                </div>
                <div className='flex gap-2'>
                    <div className='min-w-[100px]'>이름</div>
                    <div>{popupState?.deletingAdminInfo?.name}</div>
                </div>
                <div className='flex gap-2'>
                    <div className='min-w-[100px]'>이메일</div>
                    <div>{popupState?.deletingAdminInfo?.email}</div>
                </div>
                <p className=' text-red-600 text-center mt-5 text-lg font-semibold'>
                    해당 관리자를 삭제 하시겠습니까?
                </p>
            </div>
        </MainPopup>
    );
}
