import React from 'react';

export default function TabHeaderBtn({ text, isActive, onclick, onKeyDown, ref }) {
    return (
        <button
            onClick={onclick}
            onKeyDown={onKeyDown}
            ref={ref}
            className={
                isActive
                    ? 'dark:border-jacarta-600 bg-accent group border-jacarta-100 font-display flex h-9 items-center rounded-lg border px-4 text-sm font-semibold transition-colors border-transparent dark:border-transparent text-white'
                    : 'dark:border-jacarta-600 dark:bg-jacarta-900 dark:hover:bg-accent group hover:bg-accent border-jacarta-100 font-display text-jacarta-500 flex h-9 items-center rounded-lg border bg-white px-4 text-sm font-semibold transition-colors hover:border-transparent hover:text-white dark:text-white dark:hover:border-transparent dark:hover:text-white'
            }
        >
            <span>{text}</span>
        </button>
    );
}
