import tw from 'tailwind-styled-components';

const GhostBtn = tw.button`
    flex 
    justify-center 
    items-center 
    m-0 
    p-0 
    h-auto 
    border-0 
    outline-none 
    hover:(outline-none !important bg-none !important)
`;
export default GhostBtn;
