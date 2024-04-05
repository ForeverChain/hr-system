import React from 'react';
import tw from 'tailwind-styled-components';
import { GrFormClose } from 'react-icons/gr';

function CloseBtn({ onClick }) {
    return (
        <CloseBtnStyled className='closeBtn' onClick={onClick}>
            <GrFormClose size={24} />
        </CloseBtnStyled>
    );
}

const CloseBtnStyled = tw.button`
    flex
    justify-center
    items-center
    m-0
    p-0
    h-auto
    border-none
    outline-none
    bg-transparent
`;

export default CloseBtn;
