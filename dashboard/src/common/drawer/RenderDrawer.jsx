import React from 'react';
import { useDrawerCtx } from './useDrawerCtx';
import IncinerationDrawer from '@/features/claims/drawer/incinerationDrawer/IncinerationDrawer';
import ExplanationDrawer from '@/features/claims/drawer/ExplanationDrawer';
import { DRAWER_TYPES } from './DisplayDrawer';

function RenderDrawer() {
    const { drawerType } = useDrawerCtx();

    function renderComponent() {
        switch (drawerType) {
            case DRAWER_TYPES.INCERNATION: {
                return <IncinerationDrawer />;
            }
            case DRAWER_TYPES.EXPLANATION: {
                return <ExplanationDrawer />;
            }
            default: {
                return (
                    <div>
                        <p>Please provide Drawer component!</p>
                    </div>
                );
            }
        }
    }
    return <>{renderComponent()}</>;
}

export default RenderDrawer;
