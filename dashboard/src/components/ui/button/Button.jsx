import tw from 'tailwind-styled-components';
import { Button as WindMillBtn } from '@windmill/react-ui';
import CMButton from './CMButton';

export default function Btn({ children, onClick, fontSize, disabled, isLoading, style }) {
    const theStyle = {
        ...style,
        fontSize: fontSize && `${fontSize}px`,
        overflow: 'hidden',
        cursor: `${disabled ? 'not-allowed' : 'pointer'}`,
    };

    return (
        <>
            {isLoading ? (
                <CMButton
                    disabled={isLoading}
                    className='bg-emerald-600 rounded-md mt-4 h-12 w-full'
                    to='/dashboard'
                />
            ) : (
                <BtnTw style={theStyle} onClick={onClick} disabled={disabled}>
                    {children}
                </BtnTw>
            )}
        </>
    );
}

export const BtnTw = tw(WindMillBtn)`
    h-12 
    w-full
`;

export const RedBtn = tw(WindMillBtn)`
    h-10 
    w-full 
    bg-rose-600  
    hover:bg-rose-800 
    py-3
`;

export function OutlineBtn({ children, onClick }) {
    return (
        <OutlineBtnTw layout='outline' onClick={onClick}>
            {children}
        </OutlineBtnTw>
    );
}

export const OutlineBtnTw = tw(WindMillBtn)`
    h-10
    border
    w-full 
    text-red-500 
    hover:bg-red-50 
    hover:border-red-100 
    hover:text-red-600 
    dark:bg-gray-700 
    dark:border-gray-700 
    dark:text-gray-500 
    dark:hover:bg-gray-800 
    dark:hover:text-red-700
`;

export const RoundBtn = tw.button`
    border-jacarta-100 
    hover:bg-accent 
    focus:bg-accent 
    group 
    dark:hover:bg-accent 
    flex 
    h-10 
    w-10 
    items-center 
    justify-center 
    rounded-full 
    border 
    bg-white 
    transition-colors 
    hover:border-transparent 
    focus:border-transparent 
    dark:border-transparent 
    dark:bg-white/[.15]
`;
