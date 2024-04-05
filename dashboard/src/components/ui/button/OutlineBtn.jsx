import tw from 'tailwind-styled-components';
import { BtnTw } from './Button';

export const OutlineBtn = tw(BtnTw)`
  ${(p) => (p.width ? `w-[${p.width}px]` : 'w-full')}
  text-accent
  border
  bg-none
  cursor-pointer
  rounded-full
`;

export const OutlineBtnSmall = tw.span`
  dark:border-jacarta-600 dark:bg-jacarta-700 group dark:hover:bg-accent hover:bg-accent border-jacarta-100 inline-flex 
  items-center 
  rounded-full
  border 
  bg-white 
  px-4 
  py-2 
  hover:border-transparent hover:text-white dark:text-white dark:hover:border-transparent cursor-pointer
`;
export const OutlineMediumBtn = tw.span`
  w-full 
  py-2 
  px-5 
  border 
  text-center  
  border-jacarta-400 
  bg-white
  dark:bg-jacarta-600
  cursor-pointer
`;

export const OutlineTag = tw.label`
  flex
  text-center
  px-3
  rounded-xl
  border
  border-accent
  whitespace-nowrap
`;
