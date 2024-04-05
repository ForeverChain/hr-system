import React, { createContext, useState, useContext } from 'react';

const AssetDetailContext = createContext({});

export function AssetDetailProvider({ children }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalElement, setTotalElement] = useState(1);
    const itemPerPage = 20;
    const [assetDetail, setAssetDetail] = useState(null);

    return (
        <AssetDetailContext.Provider
            value={{
                currentPage,
                setCurrentPage,
                totalElement,
                setTotalElement,
                itemPerPage,
                assetDetail,
                setAssetDetail,
            }}
        >
            {children}
        </AssetDetailContext.Provider>
    );
}

export const useAssetDetailCtx = () => {
    const context = useContext(AssetDetailContext);
    if (!context) throw new Error('useAssetDetailCtx must be used within an AssetDetailProvider');
    return context;
};
