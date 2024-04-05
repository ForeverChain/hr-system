// import { TFormElement } from 'a/common/types/common'
import React from 'react';
import tw from 'tailwind-styled-components';

function TextArea(props) {
    const { cols, rows, placeholder, name, onChange, required, isValid, disabled, value } = props;

    return (
        <TextField
            cols={cols ?? 10}
            rows={rows ?? 10}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            aria-label={'text-area-' + name}
            aria-required={required}
            aria-invalid={isValid}
            disabled={disabled}
            isvalid={isValid}
        />
    );
}

const TextField = tw.textarea`
    block 
    w-full 
    h-36 
    border 
    px-3 
    py-1 
    text-sm 
    focus:outline-none 
    dark:text-gray-300 
    leading-5 
    rounded-md 
    bg-gray-100 
    focus:bg-white 
    dark:focus:bg-gray-700 
    focus:border-gray-200 
    border-gray-200 
    dark:border-gray-600 
    dark:focus:border-gray-500 
    dark:bg-gray-700 
    mr-2 p-2
    ${(props) => (props.isvalid ? 'border-red' : 'border-jacarta-100')};
`;

export default TextArea;
