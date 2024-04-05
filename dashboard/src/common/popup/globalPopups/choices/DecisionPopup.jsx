import React from 'react';
import tw from 'tailwind-styled-components';
import { Flex } from '@/components/ui/containers/flex/Flex';
import Button from '@/components/ui/button/Button';
import { OutlineBtn } from '@/components/ui/button/OutlineBtn';
import GlobalMainPopup from '../../_partials/GlobalMainPopup';
import { useGlobalPopupCtx } from '../useGlobalPopupCtx';

function DecisionPopup() {
    const { hideAllGlobalPopups, store } = useGlobalPopupCtx();
    const title = store?.popupProps[0]?.popupProps?.title;

    async function handleOk() {
        await store?.popupProps[0]?.popupProps?.ok();
        hideAllGlobalPopups();
    }
    return (
        <GlobalMainPopup title={title}>
            <div className='d-flex flex-column gap-3 justify-evenly'>
                <Flex column align='center'>
                    <Message>{store?.popupProps[0]?.popupProps?.message}</Message>
                    <div className='flex gap-2 w-full pt-4 px-2'>
                        <OutlineBtn onClick={hideAllGlobalPopups}>취소</OutlineBtn>
                        <Button onClick={handleOk}>예</Button>
                    </div>
                </Flex>
            </div>
        </GlobalMainPopup>
    );
}

const Message = tw.p`
    mb-[10px]
`;
export default DecisionPopup;
