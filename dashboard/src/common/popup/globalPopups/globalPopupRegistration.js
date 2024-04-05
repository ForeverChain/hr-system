import { lazy } from 'react';

const AlertPopup = lazy(() => import('./choices/AlertPopup'));
const DecisionPopup = lazy(() => import('./choices/DecisionPopup'));
const InfoPopup = lazy(() => import('./choices/InfoPopup'));
const ChangeNetworkPopup = lazy(() => import('@/common/web3/popups/ChangeNetworkPopup'));

export const GLOBAL_POPUP_TYPES = {
    ALERT: 'ALERT',
    DECISION: 'DECISION',
    INFO: 'INFO',
    CHANGE_NETWORK: 'CHANGE_NETWORK',
};

export const GLOBAL_POPUP_COMPONENTS = {
    [GLOBAL_POPUP_TYPES.ALERT]: AlertPopup,
    [GLOBAL_POPUP_TYPES.DECISION]: DecisionPopup,
    [GLOBAL_POPUP_TYPES.INFO]: InfoPopup,
    [GLOBAL_POPUP_TYPES.CHANGE_NETWORK]: ChangeNetworkPopup,
};
