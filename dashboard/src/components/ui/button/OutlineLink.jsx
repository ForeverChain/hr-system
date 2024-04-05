import Link from 'next/link';
import React from 'react';
import tw from 'tailwind-styled-components';

function OutlineLink({ children, href, className }) {
    return (
        <OutlineAtag className={className || ''} href={href && href}>
            {children}
        </OutlineAtag>
    );
}

const OutlineAtag = tw(Link)`
    border
    border-accent
    rounded-full
    px-4
    py-2
`;

export default OutlineLink;
