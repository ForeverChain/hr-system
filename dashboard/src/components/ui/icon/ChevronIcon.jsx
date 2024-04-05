import React from 'react';

function ChevronIcon({ className }) {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            width='24'
            height='24'
            className={`fill-jacarta-500 h-4 w-4 dark:fill-white ${className || ''}`}
        >
            <path fill='none' d='M0 0h24v24H0z' />
            <path d='M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z' />
        </svg>
    );
}

export default ChevronIcon;
