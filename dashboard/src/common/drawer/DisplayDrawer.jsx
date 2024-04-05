import React from 'react';
import RenderDrawer from './RenderDrawer';
import CustomDrawer from './CustomDrawer';

export const DRAWER_TYPES = {
    INCERNATION: 'INCERNATION',
    EXPLANATION: 'EXPLANATION',
    CLAIM_DETAIL: 'CLAIM_DETAIL',
};

function DisplayDrawer() {
    return (
        <CustomDrawer>
            <RenderDrawer />
        </CustomDrawer>
    );
}

export default DisplayDrawer;
