import React, { FC } from 'react';

import { useAppContext } from '../context/appContext';
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import Wrapper from '../assets/wrappers/PageBtnContainer';

type PageBtnContainerProps = {};

const PageBtnContainer: FC<PageBtnContainerProps> = ({}) => {
    const { numOfPages, page, changePage } = useAppContext();

    const pages = Array.from({ length: numOfPages }, (_, index) => index + 1);

    const prevPage = () => {
        const newPage = page - 1;
        changePage(newPage < 1 ? numOfPages : newPage);
    };

    const nextPage = () => {
        const newPage = page + 1;
        changePage(newPage > numOfPages ? 1 : newPage);
    };

    return (
        <Wrapper>
            <button className="prev-btn" onClick={prevPage}>
                <HiChevronDoubleLeft />
                prev
            </button>
            <div className="btn-container">
                {pages.map((pageNumber) => {
                    return (
                        <button
                            type="button"
                            className={pageNumber === page ? 'pageBtn active' : 'pageBtn'}
                            key={pageNumber}
                            onClick={changePage.bind(null, pageNumber)}
                        >
                            {pageNumber}
                        </button>
                    );
                })}
            </div>
            <button className="next-btn" onClick={nextPage}>
                <HiChevronDoubleRight />
                next
            </button>
        </Wrapper>
    );
};

export { PageBtnContainer };
