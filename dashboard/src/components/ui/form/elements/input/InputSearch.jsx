import React from 'react';
import tw from 'tailwind-styled-components';

function InputSearch(props) {
    const { onChange, placeholder, name, isValid, value, onClickSearchBtn, onKeyDown } = props;
    return (
        <div className='flex justify-end'>
            <div className='relative ml-12 mr-8 hidden basis-5/12 lg:block xl:ml-[8%]'>
                <SearchInput
                    type='search'
                    placeholder={placeholder || '에셋 검색…'}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    name={name}
                    value={value || ''}
                    aria-label={'search-input-' + name}
                    aria-invalid={isValid}
                />
                <span
                    className='absolute left-0 top-0 flex h-full w-12 items-center justify-center rounded-2xl'
                    onClick={onClickSearchBtn}
                >
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                        width={24}
                        height={24}
                        className='fill-jacarta-500 h-4 w-4 dark:fill-white'
                    >
                        <path fill='none' d='M0 0h24v24H0z' />
                        <path d='M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z' />
                    </svg>
                </span>
            </div>
        </div>
    );
}

export const SearchInput = tw.input`
        text-jacarta-700 
        placeholder-jacarta-500 
        focus:ring-accent 
        border-jacarta-100 
        rounded-2xl 
        border py-[0.6875rem] 
        px-4 w-full
        pl-10 
        dark:border-transparent 
        dark:bg-white/[.15] 
        dark:text-white 
        dark:placeholder-white
        normal-case
`;

// function InputSearch(props) {
//     const { onChange, placeholder, name, isValid, value } = props
//     return (
//         <div className="flex items-center gap-5 border border-blackSoft border-opacity-10 rounded-md pl-10 py-4">
//             <BsSearch />
//             <input
//                 type="text"
//                 onChange={onChange}
//                 name={name}
//                 value={value || ''}
//                 placeholder={placeholder || ''}
//                 aria-label={'search-input-' + name}
//                 aria-invalid={isValid}
//                 className={'w-full border-none focus:outline-none focus:ring-0 bg-transparent placeholder-blackSoft'}
//             />
//         </div>
//     )
// }

export default InputSearch;
