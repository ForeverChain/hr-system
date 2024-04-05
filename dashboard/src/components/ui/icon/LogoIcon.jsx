import React from 'react';
import Link from 'next/link';
import tw from 'tailwind-styled-components';

function LogoIcon() {
    return <LogoTw href='/'>Metaverse Assets</LogoTw>;
}
const LogoTw = tw(Link)`
    shrink-0
    font-bold
    text-[20px]
    text-accent
    uppercase
    dark:text-white
`;

export default LogoIcon;
