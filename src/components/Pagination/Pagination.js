import React, { useEffect, useState } from 'react';
import './Pagination.css';

const Pagination = ({ totalPages, OnButtonHandler }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const PreviousButtonHandler = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const AfterButtonHandler = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    useEffect(() => {
        OnButtonHandler(currentPage);
    }, [currentPage]);

    const createButtons = () => {
        const buttons = [];
        for (let i = 1; i <= totalPages; i++) {
            buttons.push(
                <button
                    onClick={() => setCurrentPage(i)}
                    className={`pagination-button ${i === currentPage ? 'active' : ''}`}
                >
                    {i}
                </button>
            );
        }
        return buttons;
    };

    const buttons = createButtons();

    return (
        <div className='pagination button'>
            <button className='pagination button' onClick={PreviousButtonHandler} disabled={currentPage === 1}>
                &#8249; {/* Left Arrow */}
            </button>
            {buttons}
            <button className='pagination button' onClick={AfterButtonHandler} disabled={currentPage === totalPages}>
                &#8250; {/* Right Arrow */}
            </button>
        </div>
    );
};

export default Pagination;
