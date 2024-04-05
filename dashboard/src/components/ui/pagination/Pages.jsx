import React from 'react';

export default function Pages(props) {
    const { pageNumbers, handlePageChange, currentPage } = props;
    return (
        <>
            {currentPage > 2 && (
                <div className='flex items-end font-bold text-emerald-700'>. . .</div>
            )}
            {pageNumbers?.map(
                (number) =>
                    number >= currentPage - 2 &&
                    number <= currentPage + 2 && (
                        <li key={number}>
                            <button
                                className={`px-2 py-1 rounded-md border border-emerald-700 ${
                                    number === currentPage
                                        ? 'bg-emerald-700 text-white'
                                        : 'bg-white'
                                }`}
                                onClick={() => handlePageChange(number)}
                            >
                                {number}
                            </button>
                        </li>
                    ),
            )}
            {currentPage < pageNumbers.length - 2 && (
                <div className='flex items-end font-bold text-emerald-700'>. . .</div>
            )}
        </>
    );
}
