import React from "react";

const Button = ({
  rowsPerPage,
  setCurrentPage,
  currentPage,
  totalPages,
  totalColumns,
}) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row justify-between items-center w-full px-5">
      <div className="w-full text-gray-600">
        Showing {rowsPerPage} data rows in {totalColumns} columns
      </div>
      <div className="flex justify-end items-center w-full mb-4 text-gray-600 space-x-4">
        <button
          className="text-blue-600 text-xs uppercase border border-gray-400 bg-transparent rounded-md py-1 px-2 flex justify-center items-center"
          onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
        >
          <label> Previous</label>
        </button>
        <span className="text-base">
          page {currentPage} of {totalPages}
        </span>
        <button
          className="text-blue-600 text-xs uppercase border border-gray-400 rounded-md py-1 px-2 flex justify-center items-center"
          onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          <label> Next</label>
        </button>
      </div>
    </div>
  );
};

export default Button;
