import React, { createContext, useState, useContext } from 'react';

const DrawerCtx = createContext({});

function DrawerProvider({ children }) {
    const [drawerType, setDrawerType] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [windowDimension, setWindowDimension] = useState(window.innerWidth);
    const [drawerState, setDrawerState] = useState(null);
    function toggleDrawer() {
        setIsDrawerOpen((prev) => !prev);
    }

    function closeDrawer() {
        setIsDrawerOpen(false);
    }

    function showDrawer(drawerType, state) {
        setDrawerType(drawerType);
        toggleDrawer();
        setDrawerState(state);
    }

    return (
        <DrawerCtx.Provider
            value={{
                drawerType,
                drawerState,
                isDrawerOpen,
                setDrawerType,
                toggleDrawer,
                closeDrawer,
                windowDimension,
                setWindowDimension,
                showDrawer,
            }}
        >
            {children}
        </DrawerCtx.Provider>
    );
}

const useDrawerCtx = () => useContext(DrawerCtx);

export { DrawerProvider, useDrawerCtx };
