import React from 'react';
import Cookies from 'js-cookie';
import { CookieName } from '@/libs/constants';
import MainPopup from '@/common/popup/_partials/MainPopup';
import { usePopupCtx } from '@/common/popup/usePopupCtx';
import useAsset from './useAsset';
import { useAdminCtx } from '../admin/useAdminCtx';

export default function DeleteAssetPopupMany() {
    const { hidePopup, hideAllPopups, popupState } = usePopupCtx();
    const { getAllAssetList } = useAsset();

    function deleteAssetFunction(body) {
        let accessToken;
        if (Cookies.get(CookieName.TOKEN)) {
            accessToken = Cookies.get(CookieName.TOKEN);
        }
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json', // Set the appropriate content type
                authorization: accessToken ? `Bearer ${accessToken}` : null,
            },
            body: JSON.stringify(body), // Convert the data to a JSON string
        };
        fetch(`${import.meta.env.VITE_APP_API_URL}/api/assets`, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }
                // Handle successful response
                return response.json();
            })
            .then((res) => {
                if (res.message === 'success') {
                    hideAllPopups();
                    getAllAssetList({ page: 0 });
                }
            })
            .catch((error) => {
                // Handle errors
                alert('Error deleting asset');
                console.error('There was a problem with the fetch operation:', error);
            });
    }

    return (
        <MainPopup
            title='에셋 삭제'
            footerAction1={hidePopup}
            footerText1='취소'
            footerAction2={() => deleteAssetFunction({ ids: popupState?.deletingAssetList })}
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
