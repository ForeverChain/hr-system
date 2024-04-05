/**
 * @createdBy Phill Anderson 2022/12/16
 */
import React, { useRef, useCallback } from 'react';
import tw from 'tailwind-styled-components';
import CloseBtn from '@/components/ui/button/CloseBtn';
import Backdrop from './Backdrop';
import { usePopupCtx } from '../usePopupCtx';
import GhostBtn from '@/components/ui/button/GhostBtn';
import Btn from '@/components/ui/button/Button';

function MainPopup({
    children,
    title,
    width,
    maxWidth,
    minWidth,
    footerAction1,
    footerAction2,
    footerText1,
    footerText2,
}) {
    const backRef = useRef(null);
    const { hidePopup } = usePopupCtx();
    const style = {
        width: `${width}px` || 'auto',
        maxWidth: `${maxWidth}px` || '80vw',
        minWidth: `${minWidth}px` || '80vw',
    };

    const closePopup = useCallback(() => {
        hidePopup();
    }, []);

    return (
        <Backdrop>
            <PopUpBox id='main-popup' ref={backRef} style={style}>
                <MainPopupHeader title={title}>
                    {title && <h1 className='font-bold text-2xl text-center w-full'>{title}</h1>}
                    {/* <CloseBtn onClick={closePopup} /> */}
                </MainPopupHeader>
                <MainPopupBody>{children}</MainPopupBody>
                <MainPopupFooter>
                    <div className='w-full flex gap-4 max-w-[300px]'>
                        {footerAction1 && footerText1 && (
                            <GhostBtn
                                className=' bg-slate-300 hover:bg-white focus:bg-white w-full rounded-md h-12'
                                onClick={() => footerAction1()}
                            >
                                {footerText1}
                            </GhostBtn>
                        )}
                        {footerAction2 && footerText2 && (
                            <Btn onClick={() => footerAction2()}>{footerText2}</Btn>
                        )}
                    </div>
                </MainPopupFooter>
            </PopUpBox>
        </Backdrop>
    );
}

export const MainPopupHeader = tw.div`
  flex
  items-center
  ${(props) => (props.title ? 'justify-between' : 'justify-end')};
  ${(props) => (props.title ? 'border-b border-gray' : 'border-none')};
  py-[1.5rem]
`;
export const PopUpBox = tw.div`
    min-w-[320px] 
    w-auto 
    z-10 
    rounded-xl 
    bg-white 
    overflow-hidden
`;

export const MainPopupBody = tw.div`
    py-[10px]
    p-8
`;

export const MainPopupFooter = tw.div`
    py-[10px]
    bg-gray-200
    p-[1rem_2rem_2rem_2rem]
    flex justify-center
`;

export default MainPopup;
