import { ActionStatus } from "../../modals/constant";

export const fetchingComplaint = (state) =>
    state.complaint.complaintList.status === ActionStatus.busy;

export const errorInFetchingComplaint = (state) =>
    state.complaint.complaintList.status === ActionStatus.error;

export const successInFetchingComplaint = (state) =>
    state.complaint.complaintList.status === ActionStatus.success;

export const complaintList = (state) => state.complaint?.complaintList?.data;

export const pagerDetails = (state) => {
    const allDetails = state.complaint?.complaintList?.data;
    return {
        page: allDetails.page,
        totalPages: allDetails.totalPages,
        hasNextPage: allDetails.hasNextPage,
        hasPrevPage: allDetails.hasPrevPage,
        limit: allDetails.limit,
        prevPage: allDetails.prevPage,
        nextPage: allDetails.nextPage,
        totalDocs: allDetails.totalDocs
    };
};

export const isComplaintSaving = (state) =>
    state.complaint?.lastAdded?.status === ActionStatus.busy;

export const loading = (state) =>
    state.complaint?.complaintList.status === ActionStatus.busy ||
    state.complaint?.lastDeleted?.status === ActionStatus.busy;
