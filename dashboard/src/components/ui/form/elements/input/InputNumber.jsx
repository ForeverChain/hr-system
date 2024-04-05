import React from 'react';
import { InputTw } from './InputText';

function InputNumber(props) {
    const { onChange, placeholder, name, required, isValid, value, width, disabled, max } = props;

    const style = {
        width: width ? `${width}px` : '100%',
    };

    return (
        <InputTw
            type='number'
            required={required}
            onChange={onChange}
            name={name}
            value={value}
            placeholder={placeholder || ''}
            aria-label={'number-input-' + name}
            aria-invalid={isValid}
            min='0'
            max={max && max}
            step='1'
            style={style}
            className={isValid ? 'input-invalid' : ''}
            disabled={disabled}
        />
    );
}

export default InputNumber;
