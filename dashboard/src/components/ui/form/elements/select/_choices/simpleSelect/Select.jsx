import { Select as MainSelect } from '@windmill/react-ui';
import tw from 'tailwind-styled-components';
import { useEffect } from 'react';
import useSelect from '../../useSelect';

function Select({ name, options, defaultValue, placeholder, onChange, isReset }) {
    const selectOptions = {
        defaultValue,
        onChange,
    };

    const {
        selectRef,
        handleChange,
        isExpanded,
        selectedLabel,
        setSelectedLabel,
        handleExpand,
        handleOption,
    } = useSelect(selectOptions, isReset);

    useEffect(() => {
        setSelectedLabel('');
    }, [isReset]);
    return (
        <SelectBox
            ref={selectRef}
            role='combobox'
            aria-expanded={isExpanded}
            aria-controls={`select-options-${name}`}
            onClick={handleExpand}
        >
            <MainSelect
                aria-owns={`select-options-${name}`}
                aria-expanded={isExpanded}
                name={name}
                value={selectedLabel}
                onChange={handleChange}
                id={'select-' + name}
            >
                {!defaultValue && (
                    <option value='' disabled hidden>
                        {placeholder || 'select'}
                    </option>
                )}
                {options.map((option, idx) => (
                    <option
                        key={`select-option-${name}-${idx}`}
                        value={option.value}
                        onClick={handleOption}
                    >
                        {option.label}
                    </option>
                ))}
            </MainSelect>
        </SelectBox>
    );
}

const SelectBox = tw.div`
    w-full
    flex-grow-0 
    md:flex-grow 
    lg:flex-grow 
    xl:flex-grow
`;

export default Select;
