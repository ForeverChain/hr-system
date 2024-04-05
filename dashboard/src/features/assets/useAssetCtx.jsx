import React, { createContext, useState, useContext } from 'react';

const AssetsContext = createContext({});

function AssetsProvider({ children }) {
    const [assetsList, setAssetsList] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalElement, setTotalElement] = useState(1);
    const itemPerPage = 20;
    const [assetDetail, setAssetDetail] = useState();
    const [exportAssetData, setExportAssetData] = useState(null);
    const [isToggleReset, setIsToggleReset] = useState(false);

    return (
        <AssetsContext.Provider
            value={{
                assetsList,
                setAssetsList,
                currentPage,
                setCurrentPage,
                totalElement,
                setTotalElement,
                itemPerPage,
                assetDetail,
                setAssetDetail,
                exportAssetData,
                setExportAssetData,
                isToggleReset,
                setIsToggleReset,
            }}
        >
            {children}
        </AssetsContext.Provider>
    );
}

const useAssetsCtx = () => {
    const context = useContext(AssetsContext);
    if (!context) throw new Error('useAdminCtx must be used within a AdminProvider');
    return context;
};

export { AssetsContext, AssetsProvider, useAssetsCtx };
