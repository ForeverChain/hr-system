import React from 'react';
import { usePopupCtx } from '../../usePopupCtx';
import GlobalMainPopup from '../../_partials/GlobalMainPopup';

function InfoPopup() {
    const { hidePopup, hideAllPopups } = usePopupCtx();
    return (
        <GlobalMainPopup title='Info popup'>
            <p className='text-pink'>ongoo awch bnaa</p>
            <div className='d-flex flex-column gap-3 justify-evenly'>
                <button onClick={() => hidePopup()}>hide this popup</button>
                <button onClick={() => hideAllPopups()}>hide all popups!!</button>
            </div>
        </GlobalMainPopup>
    );
}

export default InfoPopup;
