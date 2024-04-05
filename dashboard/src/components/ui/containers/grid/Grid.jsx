// import { JsxChildren } from 'a/common/types/common'
import React from 'react';

function Grid(props) {
    const { children } = props;
    return <div className='auto-grid'>{children}</div>;
}

export default Grid;
