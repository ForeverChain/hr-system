import tw from 'tailwind-styled-components';

export const DrawerHeader = tw.div`
    w-full 
    relative 
    p-6 
    border-b 
    border-gray-100 
    bg-gray-50 
    dark:border-gray-700 
    dark:bg-gray-800 
    dark:text-gray-300
`;

export const DrawerRow = tw.div`
    px-6 
    pt-8 
    flex-grow 
    scrollbar-hide 
    w-full 
    max-h-full
`;

export const DrawerRowWrapper = tw.div`
    grid 
    grid-cols-6 
    gap-3 
    md:gap-5 
    xl:gap-6 
    lg:gap-6 
    mb-6
`;

export const DrawerLabel = tw.label`
    block 
    text-sm 
    text-gray-800 
    dark:text-gray-400 
    col-span-4 
    sm:col-span-2 
    font-medium 
    text-sm
`;

export const DrawerContent = tw.div`
    col-span-8 
    sm:col-span-4
`;

export const DrawerFooter = tw.div`
    fixed 
    z-10 
    bottom-0 
    w-full 
    right-0 
    py-4 
    lg:py-8 
    px-6 
    grid 
    gap-4 
    lg:gap-6 
    xl:gap-6 
    md:flex 
    xl:flex 
    bg-gray-50 
    border-t 
    border-gray-100 
    dark:border-gray-700 
    dark:bg-gray-800 
    dark:text-gray-300
`;
export const DrawerFooterContent = tw.div`
    flex-grow-0 
    md:flex-grow 
    lg:flex-grow 
    xl:flex-grow
`;
