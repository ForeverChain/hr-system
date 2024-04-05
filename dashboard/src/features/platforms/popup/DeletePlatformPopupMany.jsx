import React from 'react';
import Cookies from 'js-cookie';
import MainPopup from '@/common/popup/_partials/MainPopup';
import { usePopupCtx } from '@/common/popup/usePopupCtx';
import usePlatform from '../usePlatform';
import { CookieName } from '@/libs/constants';

export default function DeletePlatformPopupMany() {
    const { hidePopup, hideAllPopups, popupState } = usePopupCtx();
    const { deletePlatformMany, getAllPlatFormList } = usePlatform();

    function deletePlatformFunction(body) {
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
        fetch(`${import.meta.env.VITE_APP_API_URL}/api/platforms`, requestOptions)
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
                    getAllPlatFormList({ page: 0 });
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
            title='플랫폼 삭제'
            footerAction1={hidePopup}
            footerText1='취소'
            footerAction2={() => deletePlatformFunction({ ids: popupState?.deletingPlatformsList })}
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
