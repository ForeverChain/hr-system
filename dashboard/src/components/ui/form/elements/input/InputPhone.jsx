import React from 'react';
import { InputTw } from './InputText';

function InputPhone(props) {
    const { onChange, placeholder, name, required, isValid, value, width, disabled } = props;

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
            style={style}
            className={isValid ? 'input-invalid' : ''}
            disabled={disabled}
        />
    );
}

export default InputPhone;
