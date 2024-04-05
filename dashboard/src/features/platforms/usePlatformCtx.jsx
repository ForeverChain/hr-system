import React, { createContext, useState, useContext } from 'react';

const PlatformContext = createContext({});

function PlatformProvider({ children }) {
    const [platformList, setPlatformList] = useState(null);
    const [platformDetail, setPlatformDetail] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalElement, setTotalElement] = useState(1);
    const itemPerPage = 20;
    const [exportPlatformData, setExportPlatformData] = useState(null);

    return (
        <PlatformContext.Provider
            value={{
                platformList,
                setPlatformList,
                platformDetail,
                setPlatformDetail,
                currentPage,
                setCurrentPage,
                totalElement,
                setTotalElement,
                itemPerPage,
                exportPlatformData,
                setExportPlatformData,
            }}
        >
            {children}
        </PlatformContext.Provider>
    );
}

const usePlatformCtx = () => {
    const context = useContext(PlatformContext);
    if (!context) throw new Error('useAdminCtx must be used within a AdminProvider');
    return context;
};

export { PlatformContext, PlatformProvider, usePlatformCtx };
