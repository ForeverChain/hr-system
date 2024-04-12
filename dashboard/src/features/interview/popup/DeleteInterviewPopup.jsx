import React from 'react';
import MainPopup from '@/common/popup/_partials/MainPopup';
import { usePopupCtx } from '@/common/popup/usePopupCtx';
import usePlace from '../usePlace';

export default function DeleteInterviewPopup() {
    const { hidePopup, hideAllPopups, popupState } = usePopupCtx();
    const { deleteAdmin } = usePlace();

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
    console.log('deletingUserInfo', popupState?.deletingUserInfo);
    return (
        <MainPopup
            title='Ярилцлага устгах хэсэг'
            footerAction1={hidePopup}
            footerText1='Болих'
            footerAction2={() => deleteUserFunction(popupState?.deletingUserInfo?._id)}
            footerText2='Устгах'
            minWidth={500}
        >
            <div className='flex flex-col gap-1'>
                <div className='flex gap-2'>
                    <div className='min-w-[100px]'>Нэр</div>
                    <div>{popupState?.deletingUserInfo?.candidateId?.firstName}</div>
                </div>
                <div className='flex gap-2'>
                    <div className='min-w-[100px]'>Имэйл</div>
                    <div>{popupState?.deletingUserInfo?.candidateId?.email}</div>
                </div>
                <p className=' text-red-600 text-center mt-5 text-lg font-semibold'>
                    Устгахдаа итгэлтэй байна уу?
                </p>
            </div>
        </MainPopup>
    );
}
