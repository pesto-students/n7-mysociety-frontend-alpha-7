import { ActionStatus } from "../../modals/constant";

export const fetchingAnnocements = (state) =>
    state.announcement.announcementList.status === ActionStatus.busy;

export const errorInFetchingAnnocements = (state) =>
    state.announcement.announcementList.status === ActionStatus.error;

export const successInFetchingAnnocements = (state) =>
    state.announcement.announcementList.status === ActionStatus.success;

export const announcementList = (state) =>
    state.announcement?.announcementList?.data;
