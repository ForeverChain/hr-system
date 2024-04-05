import React from 'react';

function FlatSidebarBtn({ onClick }) {
    return (
        <div className='flat-wallet flex'>
            <div className='canvas' onClick={onClick}>
                <span />
            </div>
        </div>
    );
}

export default FlatSidebarBtn;
