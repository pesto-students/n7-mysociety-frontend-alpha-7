import { ActionStatus } from "../../modals/constant";

export const fetchingAnnocements = (state) =>
    state.announcement.announcementList.status === ActionStatus.busy;

export const errorInFetchingAnnocements = (state) =>
    state.announcement.announcementList.status === ActionStatus.error;

export const successInFetchingAnnocements = (state) =>
    state.announcement.announcementList.status === ActionStatus.success;

export const announcementList = (state) =>
    state.announcement?.announcementList?.data;

export const pagerDetails = (state) => {
    const allDetails = state.announcement?.announcementList?.data;
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

export const isAnnouncementSaving = (state) =>
    state.announcement?.lastAdded?.status === ActionStatus.busy;

export const loading = (state) =>
    state.announcement?.announcementList.status === ActionStatus.busy ||
    state.announcement?.lastDeleted?.status === ActionStatus.busy;
