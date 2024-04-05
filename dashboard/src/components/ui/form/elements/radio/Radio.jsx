// import { TFormElement } from 'a/common/types/common'
import React, { useState } from 'react';
import tw from 'tailwind-styled-components';
import { BsCheckLg } from 'react-icons/bs';

function RadioGroup({ name, options, onChange, defaultValue, checked, className }) {
    const [selectedValue, setSelectedValue] = useState(defaultValue ?? null);

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        onChange(event);
    };

    return (
        <div
            role='radiogroup'
            aria-label={name}
            aria-labelledby={`${name}-label`}
            aria-activedescendant={`${name}-radio-${options.findIndex(
                (option) => option.value === selectedValue,
            )}`}
            tabIndex={0}
            className={`flex ${className} gap-4`}
        >
            {options.map((option, idx) => {
                return (
                    <label
                        key={name + '-radio-' + idx}
                        className='relative flex items-center gap-1'
                    >
                        <RadioTw
                            type='radio'
                            name={name}
                            id={name + '-radio-' + idx}
                            value={option.value}
                            onChange={handleChange}
                            checked={option.value === selectedValue}
                            aria-checked={option.value === selectedValue}
                        />
                        <span>{option.label}</span>
                        {checked ? <BsCheckLg className='color-accent' /> : null}
                    </label>
                );
            })}
        </div>
    );
}

const RadioTw = tw.input`
    h-5 
    w-5 
    mr-1 
    rounded-full 
    border-jacarta-200 
    text-accent 
    checked:bg-accent 
    focus:ring-accent/20 
    focus:ring-offset-0 
    dark:border-jacarta-500 
    dark:bg-jacarta-600
`;

export default RadioGroup;
