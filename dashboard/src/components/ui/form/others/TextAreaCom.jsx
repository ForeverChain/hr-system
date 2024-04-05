import { Textarea } from '@windmill/react-ui';
import React from 'react';

function TextAreaCom({ register, name, label, placeholder, required, type, value }) {
    return (
        <>
            <Textarea
                {...register(`${name}`, {
                    required: required ? false : `${label} is required!`,
                })}
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                rows='4'
                spellCheck='false'
            />
        </>
    );
}

export default TextAreaCom;
