import { ActionStatus } from "../../modals/constant";

export const fetchingComplaints = (state) =>
    state.complaint.complaintList.status === ActionStatus.busy;

export const errorInFetchingComplaints = (state) =>
    state.complaint.complaintList.status === ActionStatus.error;

export const successInFetchingComplaints = (state) =>
    state.complaint.complaintList.status === ActionStatus.success;

export const complaintList = (state) => state.complaint?.complaintList?.data;
