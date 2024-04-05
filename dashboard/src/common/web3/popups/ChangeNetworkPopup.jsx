import React from 'react';
import GlobalMainPopup from '@/common/popup/_partials/GlobalMainPopup';
import { useGlobalPopupCtx } from '@/common/popup/globalPopups/useGlobalPopupCtx';
import Button from '@/components/ui/button/Button';
import { OutlineBtn } from '@/components/ui/button/OutlineBtn';
import { Flex } from '@/components/ui/containers/flex/Flex';
import useWeb3 from '../useWeb3';

function ChangeNetworkPopup() {
    const { hideGlobalPopup } = useGlobalPopupCtx();
    const { changeNetwork } = useWeb3();

    async function handleChangeNetwork() {
        await changeNetwork();
        hideGlobalPopup();
    }
    return (
        <GlobalMainPopup title='Change network'>
            <div className='py-6'>
                <p>Are you change your network?</p>
            </div>
            <Flex justify='between' gap={2} width='100%'>
                <OutlineBtn onClick={hideGlobalPopup}>Cancel</OutlineBtn>
                <Button onClick={handleChangeNetwork}>change</Button>
            </Flex>
        </GlobalMainPopup>
    );
}

export default ChangeNetworkPopup;
