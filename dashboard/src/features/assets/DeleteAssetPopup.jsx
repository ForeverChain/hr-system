import React from 'react';
import MainPopup from '@/common/popup/_partials/MainPopup';
import { usePopupCtx } from '@/common/popup/usePopupCtx';
import useAsset from './useAsset';

export default function DeleteAssetPopup() {
    const { hidePopup, hideAllPopups, popupState } = usePopupCtx();
    const { deleteAsset } = useAsset();

    function deleteAssetFunction(id) {
        deleteAsset(id)
            .then((res) => {
                if (res.message === 'success') {
                    hideAllPopups();
                }
            })
            .catch((err) => {
                alert('Error deleting asset');
                console.error(err);
            });
    }

    return (
        <MainPopup
            title='에셋 삭제'
            footerAction1={hidePopup}
            footerText1='취소'
            footerAction2={() => deleteAssetFunction(popupState?.deletingAssetInfo?.id)}
            footerText2='삭제'
            minWidth={500}
        >
            <div className='flex flex-col gap-1'>
                <p className=' text-red-600 text-center mt-5 text-lg font-semibold'>
                    선택된 에셋을 삭제 하시겠습니까?
                </p>
            </div>
        </MainPopup>
    );
}
