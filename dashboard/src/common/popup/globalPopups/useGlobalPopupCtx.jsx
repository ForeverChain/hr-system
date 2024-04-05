import React, { createContext, useState, useContext, Suspense } from 'react';
import { GLOBAL_POPUP_COMPONENTS } from './globalPopupRegistration';

const GlobalPopupCtx = createContext({});

function GlobalPopupProvider({ children }) {
    const [store, setStore] = useState({
        popupType: null,
        popupProps: [],
    });
    const { popupType, popupProps } = store;
    const [popupHistory, setPopupHistory] = useState([]);
    const [globalPopupState, setGlobalPopupState] = useState({});
    if (popupType && process.env.mode !== 'production') {
        console.info(`${popupType} нэртэй global popup харагдаж байна.`);
    }

    const showGlobalPopup = (popupType, popupProps) => {
        const updatedPopupProps = [...store.popupProps, { popupType, popupProps }];
        setStore({
            ...store,
            popupType,
            popupProps: updatedPopupProps,
        });
        const updatedHistory = [...popupHistory, popupType];
        const uniqueArray = new Set(updatedHistory);
        const uniquePopupHistory = Array.from(uniqueArray);
        setPopupHistory(uniquePopupHistory);
    };

    const hideGlobalPopup = () => {
        let currentModal = popupHistory[popupHistory.length - 1];
        const currentModalIndex = popupHistory?.indexOf(currentModal);
        let previousModal = popupHistory[currentModalIndex - 1];

        const history = [...popupHistory];
        const updatedHistory = history.length > 0 ? history.splice(0, history.length - 1) : [];
        setPopupHistory([...updatedHistory]);

        let hidePopupType = previousModal ?? null;

        const copyModalProps = [...store.popupProps];
        const updatedPopupProps = copyModalProps.filter(
            (popupProps) => popupProps.popupType !== popupType,
        );

        if (popupType === hidePopupType) {
            setStore({
                ...store,
                popupType: null,
                popupProps: [...updatedPopupProps],
            });
        } else {
            setStore({
                ...store,
                popupType: hidePopupType,
                popupProps: [...updatedPopupProps],
            });
        }
    };
    const hideAllGlobalPopups = () => {
        setStore({ ...store, popupType: null, popupProps: [] });
        setPopupHistory([]);
    };

    const renderComponent = () => {
        if (popupType) {
            const GlobalPopupComponent = GLOBAL_POPUP_COMPONENTS[popupType];
            return <GlobalPopupComponent id='global-popup' {...popupProps} />;
        }
        return null;
    };
    return (
        <GlobalPopupCtx.Provider
            value={{
                store,
                showGlobalPopup,
                hideGlobalPopup,
                hideAllGlobalPopups,
                popupHistory,
                globalPopupState,
                setGlobalPopupState,
            }}
        >
            <Suspense fallback={<div>Loading ...</div>}>{renderComponent()}</Suspense>
            {children}
        </GlobalPopupCtx.Provider>
    );
}

const useGlobalPopupCtx = () => useContext(GlobalPopupCtx);

export { GlobalPopupCtx, GlobalPopupProvider, useGlobalPopupCtx };
