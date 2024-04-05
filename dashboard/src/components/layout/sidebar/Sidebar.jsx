import React from 'react';
import DesktopSidebar from '@/components/layout/sidebar/DesktopSidebar';
import MobileSidebar from '@/components/layout/sidebar/MobileSidebar';

function Sidebar() {
    return (
        <>
            <DesktopSidebar />
            <MobileSidebar />
        </>
    );
}

export default Sidebar;
