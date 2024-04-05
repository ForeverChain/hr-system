import React from 'react';
import tw from 'tailwind-styled-components';
import { Input } from '@windmill/react-ui';

function InputText(props) {
    const { onChange, placeholder, name, required, isValid, value, readOnly } = props;
    return (
        <InputTw
            type='text'
            required={required}
            onChange={onChange}
            name={name}
            value={value || ''}
            placeholder={placeholder || ''}
            aria-label={'text-input-' + name}
            aria-invalid={isValid}
            className={isValid ? 'input-invalid' : ''}
            readOnly={readOnly}
        />
    );
}

export const InputTw = tw(Input)`
    mr-2 
    h-12 
    p-2
`;

export default InputText;
