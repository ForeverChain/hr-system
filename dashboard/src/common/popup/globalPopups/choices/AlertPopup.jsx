import React from 'react';
import { Flex } from '@/components/ui/containers/flex/Flex';
import Button from '@/components/ui/button/Button';
import GlobalMainPopup from '../../_partials/GlobalMainPopup';
import { useGlobalPopupCtx } from '../useGlobalPopupCtx';

function AlertPopup() {
    const { hideGlobalPopup, store } = useGlobalPopupCtx();
    const { title } = store.popupProps[0].popupProps;
    const { message } = store.popupProps[0].popupProps;
    const { withButton } = store.popupProps[0].popupProps;
    return (
        <GlobalMainPopup title={title || null}>
            <Flex justify='center' width='100%'>
                <p>{message}</p>
            </Flex>
            {withButton && <Button onClick={hideGlobalPopup}>Ok</Button>}
        </GlobalMainPopup>
    );
}
export default AlertPopup;
