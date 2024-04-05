import React from 'react';

function UserIcon() {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            width={24}
            height={24}
            className='fill-jacarta-700 h-4 w-4 transition-colors group-hover:fill-white group-focus:fill-white dark:fill-white'
        >
            <path fill='none' d='M0 0h24v24H0z' />
            <path d='M11 14.062V20h2v-5.938c3.946.492 7 3.858 7 7.938H4a8.001 8.001 0 0 1 7-7.938zM12 13c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6z' />
        </svg>
    );
}

export default UserIcon;
