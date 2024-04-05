import React, { useEffect, useRef, useState } from 'react';
import { FiUpload } from 'react-icons/fi';
import tw from 'tailwind-styled-components';
import { BsFileEarmarkCode, BsFileEarmarkMedical } from 'react-icons/bs';
import useExport from '@/common/export/useExport';

function ExportBtn({ data, onClick, exportHeaders, fileName }) {
    console.log('data', data);
    const ref = useRef();
    const { downloadCSV, downloadJson } = useExport(exportHeaders);
    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!ref?.current?.contains(e.target)) {
                setIsClicked(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
    }, [ref]);

    function handleClick(e) {
        e.preventDefault();
        setIsClicked((prev) => !prev);
        !isClicked && onClick();
    }

    return (
        <div className='relative w-fit' ref={ref}>
            <OutlineBtn onClick={handleClick} className=''>
                <FiUpload className='mr-2' />
                <span className='text-xs'>Export</span>
            </OutlineBtn>
            {isClicked && (
                <UploadBtnsUl>
                    <UploadBtnsLi onClick={() => downloadCSV(data, fileName)}>
                        <span className='flex items-center text-sm'>
                            <BsFileEarmarkMedical className='w-4 h-4 mr-3' aria-hidden='true' />

                            <span>Export to CSV</span>
                        </span>
                    </UploadBtnsLi>
                    <UploadBtnsLi onClick={() => downloadJson(data)}>
                        <span className='flex items-center text-sm'>
                            <BsFileEarmarkCode className='w-4 h-4 mr-3' aria-hidden='true' />
                            <span>Export to JSON</span>
                        </span>
                    </UploadBtnsLi>
                </UploadBtnsUl>
            )}
        </div>
    );
}

export const OutlineBtn = tw.button`
    border 
    flex 
    justify-center 
    items-center 
    border-gray-300 
    hover:border-emerald-400 
    hover:text-emerald-400  
    dark:text-gray-300 
    cursor-pointer 
    h-10 
    w-20 
    rounded-md 
    focus:outline-none
`;

const UploadBtnsUl = tw.ul`
    origin-top-left 
    absolute  
    w-56 
    rounded-md 
    shadow-lg 
    bg-white 
    dark:bg-gray-800 
    focus:outline-none 
    z-40
`;

const UploadBtnsLi = tw.li`
    justify-between 
    font-serif 
    font-medium 
    py-2 
    pl-4 
    transition-colors 
    duration-150 
    hover:bg-gray-100 
    text-gray-500 
    cursor-pointer
    hover:text-emerald-500 
    dark:text-gray-400 
    dark:hover:bg-gray-800 
    dark:hover:text-gray-200
`;

export default ExportBtn;
