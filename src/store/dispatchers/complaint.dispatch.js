import * as COMPLAINT_ACTION from "../actions/complaint.action";
import * as MODAL_ACTION from "../actions/modal.action";
import complaintService from "../../services/complaint";
import { toaster } from "../../utils";
export function getAllComplaints(payload) {
    return (dispatch) => {
        dispatch({ type: COMPLAINT_ACTION.GET_ALL_COMPLAINT });
        complaintService
            .getAllComplaints(payload)
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: COMPLAINT_ACTION.GET_ALL_COMPLAINT_SUCCESS,
                        payload: response.data?.result
                    });
                }
            })
            .catch((error) => {
                dispatch({
                    type: COMPLAINT_ACTION.GET_ALL_COMPLAINT_ERROR
                });
                dispatch({
                    type: MODAL_ACTION.SHOW_TOASTER,
                    payload: {
                        error: error.response?.data?.message,
                        type: "error"
                    }
                });
            });
    };
}

export function saveComplaint(payload) {
    return (dispatch) => {
        dispatch({ type: COMPLAINT_ACTION.SAVE_COMPLAINT });
        complaintService
            .createComplaint(payload)
            .then((response) => {
                if (response.status === 201 || response.status === 203) {
                    dispatch({
                        type: COMPLAINT_ACTION.SAVE_COMPLAINT_SUCCESS,
                        payload: response?.data?.result
                    });
                    toaster.showSuccessMessage(
                        dispatch,
                        response.data?.message
                    );
                    dispatch({ type: MODAL_ACTION.CLOSE_MODAL });
                } else {
                    toaster.showErrorMessage(
                        dispatch,
                        "Error in saving complaint"
                    );
                }
            })
            .catch((error) => {
                dispatch({ type: COMPLAINT_ACTION.SAVE_COMPLAINT_ERROR });
                toaster.showErrorMessage(
                    dispatch,
                    error.response?.data?.message
                );
            });
    };
}

export function deleteComplaint(payload) {
    return (dispatch) => {
        dispatch({ type: COMPLAINT_ACTION.DELETE_COMPLAINT });
        complaintService
            .deleteComplaint(payload)
            .then((response) => {
                if (response.status === 203) {
                    dispatch({
                        type: COMPLAINT_ACTION.DELETE_COMPLAINT_SUCCESS,
                        payload: response.data?.result
                    });
                    toaster.showSuccessMessage(
                        dispatch,
                        response.data?.message
                    );
                } else {
                    toaster.showErrorMessage(
                        dispatch,
                        "Error in deleting complaint"
                    );
                }
            })
            .catch((error) => {
                dispatch({
                    type: COMPLAINT_ACTION.DELETE_COMPLAINT_ERROR
                });
                toaster.showErrorMessage(
                    dispatch,
                    error.response?.data?.message
                );
            });
    };
}
