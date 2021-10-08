import moment from "moment";
export function formatDate(date, format) {
    return moment(date).format(format);
}

export function getPager(details) {
    return {
        page: details?.page,
        totalPages: details?.totalPages,
        hasNextPage: details?.hasNextPage,
        hasPrevPage: details?.hasPrevPage,
        limit: details?.limit,
        prevPage: details?.prevPage,
        nextPage: details?.nextPage,
        totalDocs: details?.totalDocs
    };
}

export function dateTimeLocal(dateString) {
    const date = new Date(dateString);
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return date.toISOString().slice(0, 16);
}
