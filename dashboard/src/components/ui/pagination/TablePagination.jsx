import React from 'react';
import Pages from './Pages';

export default function TablePagination({ totalItems, itemsPerPage, currentPage, onPageChange }) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageChange = (page) => {
        onPageChange(page);
    };

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className='flex justify-between items-center my-4'>
            <p className='text-emerald-700 font-bold'>
                Showing {(currentPage - 1) * itemsPerPage + 1}-
                {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}
            </p>
            <ul className='flex space-x-2'>
                <li>
                    <button
                        className={`px-2 py-1 rounded-md border border-emerald-700 ${
                            currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                        }`}
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        &laquo;
                    </button>
                </li>
                <Pages
                    pageNumbers={pageNumbers}
                    handlePageChange={handlePageChange}
                    currentPage={currentPage}
                />
                <li>
                    <button
                        className={`px-2 py-1 rounded-md border border-emerald-700 ${
                            currentPage === totalPages
                                ? 'opacity-50 cursor-not-allowed'
                                : 'cursor-pointer'
                        }`}
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        &raquo;
                    </button>
                </li>
            </ul>
        </div>
    );
}
