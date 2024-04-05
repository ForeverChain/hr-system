import React from 'react';
import tw from 'tailwind-styled-components';

function InputPrice(props) {
    const { onChange, placeholder, name, required, isValid, value, width, disabled, max } = props;

    const style = {
        width: width ? `${width}px` : '100%',
    };

    return (
        <InputPriceTw
            type='text'
            required={required}
            onChange={onChange}
            name={name}
            value={value}
            placeholder={placeholder || ''}
            aria-label={'number-input-' + name}
            aria-invalid={isValid}
            min='1'
            max={max && max}
            step='10000'
            style={style}
            className={isValid ? 'input-invalid' : ''}
            disabled={disabled}
        />
    );
}

const InputPriceTw = tw.input`
    w-full
    h-full
    text-end
    border-none
    p-0
    m-0
`;

export default InputPrice;
