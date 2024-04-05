import React, { createContext, useState, useContext } from 'react';

const AdminContext = createContext({});

function AdminProvider({ children }) {
    const [adminsList, setAdminsList] = useState(null);
    const [adminDetail, setAdminDetail] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalElement, setTotalElement] = useState(1);
    const itemPerPage = 20;
    const [dashboardData, setDashboardData] = useState(null);

    return (
        <AdminContext.Provider
            value={{
                adminsList,
                setAdminsList,
                adminDetail,
                setAdminDetail,
                currentPage,
                setCurrentPage,
                totalElement,
                setTotalElement,
                itemPerPage,
                dashboardData,
                setDashboardData,
            }}
        >
            {children}
        </AdminContext.Provider>
    );
}

const useAdminCtx = () => {
    const context = useContext(AdminContext);
    if (!context) throw new Error('useAdminCtx must be used within a AdminProvider');
    return context;
};

export { AdminContext, AdminProvider, useAdminCtx };
