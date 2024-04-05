import React, { createContext, useState, useContext } from 'react';

const NftContext = createContext({});

function NftProvider({ children }) {
    const [nftList, setNftList] = useState(null);
    const [allNftList, setAllNftList] = useState(null);
    const [isToggleReset, setIsToggleReset] = useState(false);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalElement: 1,
        itemsPerPage: 10,
    });
    const [filterQueryParams, setFilterQueryParams] = useState(null);
    return (
        <NftContext.Provider
            value={{
                nftList,
                setNftList,
                allNftList,
                setAllNftList,
                isToggleReset,
                setIsToggleReset,
                pagination,
                setPagination,
                filterQueryParams,
                setFilterQueryParams,
            }}
        >
            {children}
        </NftContext.Provider>
    );
}

const useNftCtx = () => {
    const context = useContext(NftContext);
    if (!context) throw new Error('useNftCtx must be used within a EventProvider');
    return context;
};

export { NftContext, NftProvider, useNftCtx };
