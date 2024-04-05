import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

function SelectOptions(props) {
    const {
        isExpanded,
        options,
        handleExpand,
        onChangeWithoutEvent,
        name,
        setSelectedLabel,
        selectedLabel,
    } = props;

    const style = {
        position: 'absolute',
        top: '103%',
        left: '0',
        width: '100%',
        height: `${isExpanded ? 'auto' : '0'}`,
        background: 'transparent',
        display: `${isExpanded ? 'block' : 'none'}`,
        zIndex: `${isExpanded ? '9999' : '0'}`,
        marginTop: '4px',
    };

    function onClick(option) {
        const { value, label } = option;
        if (isExpanded) {
            handleExpand();
            onChangeWithoutEvent(name, value);
            setSelectedLabel(label);
        }
    }

    return (
        <SelectUl style={style}>
            {options?.map((option, idx) => {
                const isActive = selectedLabel === option.label;
                return (
                    <SelectLi
                        key={'option-' + idx}
                        onClick={() => onClick(option)}
                        isactive={isActive.toString()}
                    >
                        {option.label}
                    </SelectLi>
                );
            })}
        </SelectUl>
    );
}

const SelectUl = styled.ul`
    border: 1px solid #656565;
    border-radius: 8px;
    overflow: hidden;
`;

// SelectLi
const SelectLi = styled(motion.li)`
    display: flex;
    opacity: 0.9;
    backdrop-filter: blur(2px);
    padding: 5px;
    padding-left: 2px;
    font-size: 18px;
    color: green;
    border-bottom: 0;
    &:hover {
        color: blue;
    }
    ${({ isactive }) => isactive && ` color: orange;`}
`;

export default SelectOptions;
