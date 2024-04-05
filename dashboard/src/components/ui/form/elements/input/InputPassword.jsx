import React from 'react';
import { InputTw } from './InputText';

function InputPassword(props) {
    const { onChange, placeholder, name, value, required, isValid, className } = props;
    return (
        <InputTw
            type='password'
            required={required}
            onChange={onChange}
            name={name}
            value={value || ''}
            placeholder={placeholder || ''}
            aria-label={'email-input-' + name}
            aria-invalid={isValid}
            className={`${isValid ? 'input-invalid' : ''} ${className || ''} password-input`}
        />
    );
}

export default InputPassword;
