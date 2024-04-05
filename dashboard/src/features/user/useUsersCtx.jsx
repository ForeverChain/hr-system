import React, { createContext, useContext, useState } from 'react';

const UsersContext = createContext({});

function UsersProvider({ children }) {
    const [usersList, setUsersList] = useState(null);
    const [usersExportList, setUsersExportList] = useState(null);
    const [usersDetail, setUsersDetail] = useState(null);

    return (
        <UsersContext.Provider
            value={{
                usersList,
                setUsersList,
                usersDetail,
                setUsersDetail,
                usersExportList,
                setUsersExportList,
            }}
        >
            {children}
        </UsersContext.Provider>
    );
}

const useUsersCtx = () => {
    const context = useContext(UsersContext);
    if (!context) throw new Error('UsersContext must be used within a AdminProvider');
    return context;
};

export { UsersProvider, UsersContext, useUsersCtx };
