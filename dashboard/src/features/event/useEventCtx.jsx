import React, { createContext, useState, useContext } from 'react';

const EventContext = createContext({});

function EventProvider({ children }) {
    const [eventList, setEventList] = useState(null);
    const [allEventList, setAllEventList] = useState(null);
    const [isToggleReset, setIsToggleReset] = useState(false);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalElement: 1,
        itemsPerPage: 10,
    });
    const [filterQueryParams, setFilterQueryParams] = useState(null);

    return (
        <EventContext.Provider
            value={{
                eventList,
                setEventList,
                allEventList,
                setAllEventList,
                isToggleReset,
                setIsToggleReset,
                pagination,
                setPagination,
                filterQueryParams,
                setFilterQueryParams,
            }}
        >
            {children}
        </EventContext.Provider>
    );
}

const useEventCtx = () => {
    const context = useContext(EventContext);
    if (!context) throw new Error('useEventCtx must be used within a EventProvider');
    return context;
};

export { EventContext, EventProvider, useEventCtx };
