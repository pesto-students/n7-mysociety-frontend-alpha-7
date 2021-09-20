import React from "react";
import { Typography, ChevronLeftIcon, ChevronRightIcon } from "..";
export default function Paginator({ children, totalPages, currentPage }) {
    const paging = (
        <div className="pagination">
            <Typography variant="subtitle1">
                Result {currentPage} of {totalPages}{" "}
            </Typography>
            <ChevronLeftIcon />
            {currentPage}
            <ChevronRightIcon />
        </div>
    );
    return <div>{children}</div>;
}
