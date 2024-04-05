import React from 'react';

function SignOutIcon() {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            width={24}
            height={24}
            className='fill-jacarta-700 h-4 w-4 transition-colors dark:fill-white'
        >
            <path fill='none' d='M0 0h24v24H0z' />
            <path d='M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zM7 11V8l-5 4 5 4v-3h8v-2H7z' />
        </svg>
    );
}

export default SignOutIcon;
