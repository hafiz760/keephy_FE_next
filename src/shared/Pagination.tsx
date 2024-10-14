import React from 'react';
import ReactPaginate from 'react-paginate';
import BackPaginationIcon from "@/assets/icons/BackPaginationIcon"
import NextPaginationIcon from "@/assets/icons/NextPaginationIcon "

interface PaginationProps {
    pageCount: number;
    onPageChange: (selectedItem: { selected: number }) => void;
    currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ pageCount, onPageChange, currentPage }) => {

    return (
        <ReactPaginate
            previousLabel={<BackPaginationIcon />}
            nextLabel={<NextPaginationIcon />}
            previousClassName='py-2 px-3 border-r border-black'
            nextClassName='py-2 px-3 border-l border-black'
            activeLinkClassName='bg-black text-white'
            containerClassName={"flex items-center rounded-full bg-white shadow-[0px_0px_60px_30px_#00000008]"}
            pageLinkClassName="py-2 px-3"
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={(data) => onPageChange({ selected: data.selected + 1 })}
            initialPage={currentPage - 1} // Adjust to 0-based index
        />
    );
};

export default Pagination;
