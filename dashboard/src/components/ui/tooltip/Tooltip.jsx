import React from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';

function Tooltip({ id, Icon, title, bgColor }) {
    return (
        <>
            <p data-tip data-for={id} className='text-xl'>
                {Icon ? <Icon /> : 'no icon'}
            </p>
            <ReactTooltip id={id} backgroundColor={bgColor}>
                <span className='text-sm font-medium'>{title}</span>
            </ReactTooltip>
        </>
    );
}

export default Tooltip;
