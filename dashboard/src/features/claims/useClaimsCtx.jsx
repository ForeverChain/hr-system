import React, { createContext, useState, useContext } from 'react';

const ClaimContext = createContext({});

function ClaimsProvider({ children }) {
    const [claimList, setClaimList] = useState(null);
    const [allClaimList, setAllClaimList] = useState(null);
    const [isToggleReset, setIsToggleReset] = useState(false);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalElement: 1,
        itemsPerPage: 10,
    });
    const [claimsListQueryParams, setClaimsListQueryParams] = useState(null);

    const [allNftList, setAllNftList] = useState(null);
    const [exportEventData, setExportEventData] = useState(null);

    return (
        <ClaimContext.Provider
            value={{
                claimList,
                setClaimList,
                allClaimList,
                setAllClaimList,
                isToggleReset,
                setIsToggleReset,
                pagination,
                setPagination,
                allNftList,
                setAllNftList,
                claimsListQueryParams,
                setClaimsListQueryParams,
                exportEventData,
                setExportEventData,
            }}
        >
            {children}
        </ClaimContext.Provider>
    );
}

const useClaimsCtx = () => {
    const context = useContext(ClaimContext);
    if (!context) throw new Error('useClaimsCtx must be used within a EventProvider');
    return context;
};

export { ClaimContext, ClaimsProvider, useClaimsCtx };
