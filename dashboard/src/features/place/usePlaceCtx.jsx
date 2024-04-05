import React, { createContext, useState, useContext } from 'react';

const PlaceContext = createContext({});

function PlaceProvider({ children }) {
    const [placeList, setPlaceList] = useState(null);
    const [isToggleReset, setIsToggleReset] = useState(false);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalElement: 1,
        itemsPerPage: 10,
    });

    return (
        <PlaceContext.Provider
            value={{
                placeList,
                setPlaceList,
                isToggleReset,
                setIsToggleReset,
                pagination,
                setPagination,
            }}
        >
            {children}
        </PlaceContext.Provider>
    );
}

const usePlaceCtx = () => {
    const context = useContext(PlaceContext);
    if (!context) throw new Error('usePlaceCtx must be used within a EventProvider');
    return context;
};

export { PlaceContext, PlaceProvider, usePlaceCtx };
