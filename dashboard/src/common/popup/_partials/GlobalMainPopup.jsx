/**
 * @createdBy Phill Anderson 2023/10/5
 */
import React, { useRef, useCallback } from 'react';
import tw from 'tailwind-styled-components';
import CloseBtn from '@/components/ui/button/CloseBtn';
import Backdrop from './Backdrop';
import { useGlobalPopupCtx } from '../globalPopups/useGlobalPopupCtx';
import { MainPopupBody, MainPopupHeader, PopUpBox } from './MainPopup';

function GlobalMainPopup({ children, title }) {
    const backRef = useRef(null);
    const { hideGlobalPopup } = useGlobalPopupCtx();

    const closePopup = useCallback(() => {
        hideGlobalPopup();
    }, []);

    return (
        <Backdrop global={true.toString()}>
            <GlobalPopWrapper id='main-popup' ref={backRef}>
                <MainPopupHeader title={title}>
                    {title && <h3>{title}</h3>}
                    <CloseBtn onClick={closePopup} />
                </MainPopupHeader>
                <GlobalPopBody>{children}</GlobalPopBody>
            </GlobalPopWrapper>
        </Backdrop>
    );
}
const GlobalPopWrapper = tw(PopUpBox)`
    px-4
    pb-4
`;
const GlobalPopBody = tw.div`
    pb-4
`;
export default GlobalMainPopup;
