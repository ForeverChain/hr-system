import React from 'react';
import { InputTw } from './InputText';

function InputDate(props) {
    const { onChange, placeholder, name, required, isValid } = props;
    return (
        <InputTw
            type='date'
            required={required}
            onChange={onChange}
            name={name}
            placeholder={placeholder || ''}
            aria-label={'date-input-' + name}
            aria-invalid={isValid}
        />
    );
}

export default InputDate;
