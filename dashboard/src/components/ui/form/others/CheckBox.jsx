import React from 'react';

function CheckBox({ id, name, type, handleClick, isChecked, isDisabled }) {
    return (
        <>
            <input
                id={id}
                name={name}
                type={type}
                onChange={handleClick}
                checked={isChecked}
                disabled={isDisabled}
            />
        </>
    );
}

export default CheckBox;
