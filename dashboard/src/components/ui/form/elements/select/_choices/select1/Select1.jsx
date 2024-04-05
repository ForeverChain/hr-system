/**
 * @createdBy Phill Anderson 2023/6/22
 */
import React, { useState } from 'react';
import tw from 'tailwind-styled-components';
import CorrectIcon from '@/components/ui/icon/CorrectIcon';
import ChevronIcon from '@/components/ui/icon/ChevronIcon';
import useSelect from '../../useSelect';

function Select1(props) {
    const { defaultValue, onChangeWithoutEvent, options, name, width, callback } = props;

    const style = {
        width: width ? `${width}px` : '100%',
    };

    const selectOptions = {
        defaultValue,
    };
    const { selectRef, isExpanded, handleExpand, selectedLabel, setSelectedLabel } =
        useSelect(selectOptions);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            handleExpand();
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (!isExpanded) {
                handleExpand();
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (isExpanded) {
                handleExpand();
            }
        }
    };

    const [dropdownShow, setDropdownShow] = useState(false);
    const [dropdownItemActive, setDropdownItemActive] = useState(null);

    const handleDropdown = (e) => {
        e.preventDefault();
        window.addEventListener('click', (w) => {
            if (w.target.closest('.dropdown-toggle')) {
                if (dropdownShow) {
                    setDropdownShow(false);
                } else {
                    setDropdownShow(true);
                }
            } else {
                setDropdownShow(false);
            }
        });
    };

    const handleSelectOption = (e, option) => {
        e.preventDefault();
        const { value, label, id } = option;
        onChangeWithoutEvent(name, value);
        callback && callback(value === 'other' ? value : null);
        setSelectedLabel(label);
        setDropdownItemActive(id);
    };
    return (
        <SelectWrapper ref={selectRef} onKeyDown={handleKeyDown}>
            <SelectBtn onClick={handleDropdown} style={style}>
                <span className='font-display' style={{ textTransform: 'none' }}>
                    {selectedLabel || 'choose select'}
                </span>
                <ChevronIcon />
            </SelectBtn>
            <SelectOptions className={dropdownShow ? ' show' : ' hidden'}>
                {options.map((option, idx) => (
                    <Option
                        key={'select-option-' + option.label + ' ' + idx}
                        onClick={(e) => handleSelectOption(e, option)}
                    >
                        {option.label}
                        {dropdownItemActive === option.id && <CorrectIcon />}
                    </Option>
                ))}
            </SelectOptions>
        </SelectWrapper>
    );
}

const SelectWrapper = tw.div`
    relative 
    my-1 
    cursor-pointer
    hover:ring-accent/10 
    focus:ring-accent 
    dark:border-jacarta-600 
    normal-case
    dark:placeholder:text-jacarta-300 
`;

const SelectBtn = tw.button`
    w-full
    dark:bg-jacarta-700 
    dropdown-toggle 
    border-jacarta-100 
    dark:border-jacarta-600 
    inline-flex 
    w-48 
    items-center 
    justify-between 
    rounded-lg 
    border 
    bg-white 
    py-4 
    px-3 
    text-sm 
    dark:text-white
    normal-case
`;

const SelectOptions = tw.div`
    dark:bg-jacarta-800 
    z-10 
    max-w-sm 
    w-[13rem] 
    whitespace-nowrap 
    rounded-xl 
    bg-white 
    py-4 
    px-2 
    text-left 
    shadow-xl 
    absolute 
    top-full 
    right-0
    normal-case
`;
const Option = tw.button`
    dropdown-item 
    font-display 
    text-jacarta-700 
    dark:hover:bg-jacarta-600 
    hover:bg-jacarta-50 
    flex 
    w-full 
    items-center 
    justify-between 
    rounded-xl 
    px-5 
    py-2 
    text-left 
    text-sm 
    transition-colors 
    dark:text-white
    normal-case
`;

export default Select1;
