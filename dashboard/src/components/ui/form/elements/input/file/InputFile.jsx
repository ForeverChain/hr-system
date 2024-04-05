import React from 'react';
import tw from 'tailwind-styled-components';

function InputFile(props) {
    const { name, required, onChange, isValid, id } = props;
    return (
        <InputFileStyled
            type='file'
            id={id}
            required={required}
            onChange={onChange}
            name={name}
            className={isValid ? 'border border-orange' : ''}
        />
    );
}

const InputFileStyled = tw.input`
    w-full 
    h-full 
    border-none 
    bg-transparent 
    focus:shadow-none 
    hover:shadow-none 
    cursor-pointer
`;

export default InputFile;
