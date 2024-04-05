import React from 'react';
import MainPopup from '@/common/popup/_partials/MainPopup';
import { usePopupCtx } from '@/common/popup/usePopupCtx';
import usePlatform from '../usePlatform';

export default function DeletePlatformPopup() {
    const { hidePopup, hideAllPopups, popupState } = usePopupCtx();
    const { deletePlatformById } = usePlatform();

    function deletePlatformFunction(id) {
        deletePlatformById(id)
            .then((res) => {
                if (res.message === 'success') {
                    hideAllPopups();
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }

    return (
        <MainPopup
            title='플랫폼 삭제'
            footerAction1={hidePopup}
            footerText1='취소'
            footerAction2={() => deletePlatformFunction(popupState?.deletingPlatformInfo?.id)}
            footerText2='삭제'
            minWidth={500}
        >
            <div className='flex flex-col gap-1'>
                <p className=' text-red-600 text-center mt-5 text-lg font-semibold'>
                    선택된 플랫폼을 삭제 하시겠습니까?
                </p>
            </div>
        </MainPopup>
    );
}
