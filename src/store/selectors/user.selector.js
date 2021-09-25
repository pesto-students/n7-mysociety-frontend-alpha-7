import { ActionStatus } from "../../modals/constant";

export const fetchingUser = (state) =>
    state.user.userList.status === ActionStatus.busy;

export const errorInFetchingUser = (state) =>
    state.user.userList.status === ActionStatus.error;

export const successInFetchingUser = (state) =>
    state.user.userList.status === ActionStatus.success;

export const userList = (state) => state.user?.userList?.data;

export const pagerDetails = (state) => {
    const allDetails = state.user?.userList?.data;
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

export const isUserSaving = (state) =>
    state.user?.lastAdded?.status === ActionStatus.busy;

export const loading = (state) =>
    state.user?.userList.status === ActionStatus.busy ||
    state.user?.lastDeleted?.status === ActionStatus.busy;
