import React from "react";
import Pagination from "@mui/material/Pagination";

const PaginationComponent = ({
  totalPages,
  currentPage,
  setCurrentPage,
  defaultActiveColor = "var(--main-color)",
}) => {
  const handleChange = (event, value) => {
    setCurrentPage(value);
  };
  return (
    <>
      <style>{`
        .MuiPagination-ul li .Mui-selected {
            background: ${defaultActiveColor} !important;
            color: var(--white-color) !important;
            font-size:16px !important;
            min-width: 30px !important;
            height: 30px !important;
            font-family:"Open-Sans-semiBold" !important;
        }
        .MuiPagination-ul li button {
            color: var(--text-color-black) !important;
            font-size:16px !important;
            font-family:"Open-Sans-semiBold" !important;
        }
    `}</style>
      <div>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handleChange}
        />
      </div>
    </>
  );
};

export default PaginationComponent;
