import React, { useState } from 'react';
import tw from 'tailwind-styled-components';

function CustomTooltip({ text, children }) {
    const [showTooltip, setShowTooltip] = useState(false);

    function handleMouseEnter() {
        setShowTooltip(true);
    }

    function handleMouseLeave() {
        setShowTooltip(false);
    }

    return (
        <TooltipContainer onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {children}
            {showTooltip && (
                <Tooltip className='tooltip'>
                    <p> {text}</p>
                </Tooltip>
            )}
        </TooltipContainer>
    );
}

const TooltipContainer = tw.div`
    relative
   
`;

export const Tooltip = tw.div`
    absolute
    max-w-[200px]
    flex
    flex-wrap
    bg-[#e5e7eb]
    p-[5px]
    rounded-md
    transition
    whitespace-normal
    z-50
`;

export default CustomTooltip;
