import React from "react";
import { Typography, ChevronLeftIcon, ChevronRightIcon, IconButton } from "..";
import "./paginator.scss";
export default function Paginator({ children, pager, pageChange, loading }) {
    const pageNav = (
        <React.Fragment>
            <IconButton
                disabled={!pager.hasPrevPage}
                onClick={() => pageChange(pager.prevPage)}
            >
                <ChevronLeftIcon />
            </IconButton>
            <div className="current-page-number">
                <Typography>{pager.page}</Typography>
            </div>
            <IconButton
                disabled={!pager.hasNextPage}
                onClick={() => pageChange(pager.nextPage)}
            >
                <ChevronRightIcon />
            </IconButton>
        </React.Fragment>
    );
    const paging = (
        <div className="pagination">
            <Typography variant="subtitle1">
                Result {pager.page} of {pager.totalPages}
            </Typography>
            {pageNav}
        </div>
    );

    const noRecords = !loading ? (
        <div className="no-records-message">
            <Typography variant="h4" color="primary">
                No records found
            </Typography>
        </div>
    ) : null;

    const hasDocs = pager?.totalDocs > 0;
    return (
        <React.Fragment>
            {hasDocs ? [children, paging] : noRecords}
        </React.Fragment>
    );
}
