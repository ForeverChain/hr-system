import React, { createContext, useState, useContext } from 'react';

const GlobalContext = createContext({});

function GlobalProvider({ children }) {
    const [globalItems, setGlobalItems] = useState(null);
    const [authState, setAuthState] = useState(null);
    const [isSidebar, setSidebar] = useState(false);
    const [web3Items, setWeb3Items] = useState();
    const [assetDetail, setAssetDetail] = useState(null);
    const [assetDetailNFTList, setAssetDetailNFTList] = useState(null);
    const [assetDetailPaginationInfo, setAssetDetailPaginationInfo] = useState({
        currentPage: 1,
        totalElement: 1,
        itemPerPage: 20,
    });
    const [platformList, setPlatformList] = useState();

    // pages global states:
    const [myPageState, setMyPageState] = useState(null);
    const [edittingRowInfo, setEdittingRowInfo] = useState(null);
    const [drawerSubmitLoading, setDrawerSubmitLoading] = useState(false);

    const setTokenIntoAuthState = (token) => {
        setAuthState((prev) => ({ ...prev, token }));
    };

    return (
        <GlobalContext.Provider
            value={{
                isSidebar,
                setSidebar,
                globalItems,
                setGlobalItems,
                authState,
                setAuthState,
                setTokenIntoAuthState,
                myPageState,
                setMyPageState,
                web3Items,
                setWeb3Items,
                assetDetail,
                setAssetDetail,
                assetDetailNFTList,
                setAssetDetailNFTList,
                assetDetailPaginationInfo,
                setAssetDetailPaginationInfo,
                platformList,
                setPlatformList,
                edittingRowInfo,
                setEdittingRowInfo,
                drawerSubmitLoading,
                setDrawerSubmitLoading,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}

const useGlobalCtx = () => {
    const context = useContext(GlobalContext);
    if (!context) throw new Error('useGlobalCtx must be used within a GlobalProvider');
    return context;
};

export { GlobalContext, GlobalProvider, useGlobalCtx };
