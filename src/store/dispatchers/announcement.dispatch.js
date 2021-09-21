import * as ANNOUNCEMENT_ACTION from "../actions/announcement.action";
import * as MODAL_ACTION from "../actions/modal.action";
import announcementService from "../../services/announcement";
import { toaster } from "../../utils";
export function getAllAnnouncements(payload) {
    return (dispatch) => {
        dispatch({ type: ANNOUNCEMENT_ACTION.GET_ALL_ANNOUNCEMENT });
        announcementService
            .getAllAnnouncements(payload)
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: ANNOUNCEMENT_ACTION.GET_ALL_ANNOUNCEMENT_SUCCESS,
                        payload: response.data?.result
                    });
                }
            })
            .catch((error) => {
                dispatch({
                    type: ANNOUNCEMENT_ACTION.GET_ALL_ANNOUNCEMENT_ERROR
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

export function saveAnnouncement(payload) {
    return (dispatch) => {
        dispatch({ type: ANNOUNCEMENT_ACTION.SAVE_ANNOUNCEMENT });
        announcementService
            .createAnnouncement(payload)
            .then((response) => {
                if (response.status === 201 || response.status === 203) {
                    dispatch({
                        type: ANNOUNCEMENT_ACTION.SAVE_ANNOUNCEMENT_SUCCESS,
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
                        "Error in saving announcement"
                    );
                }
            })
            .catch((error) => {
                dispatch({ type: ANNOUNCEMENT_ACTION.SAVE_ANNOUNCEMENT_ERROR });
                toaster.showErrorMessage(
                    dispatch,
                    error.response?.data?.message
                );
            });
    };
}

export function deleteAnnouncement(payload) {
    return (dispatch) => {
        dispatch({ type: ANNOUNCEMENT_ACTION.DELETE_ANNOUNCEMENT });
        announcementService
            .deleteAnnouncement(payload)
            .then((response) => {
                if (response.status === 203) {
                    dispatch({
                        type: ANNOUNCEMENT_ACTION.DELETE_ANNOUNCEMENT_SUCCESS,
                        payload: response.data?.result
                    });
                    toaster.showSuccessMessage(
                        dispatch,
                        response.data?.message
                    );
                } else {
                    toaster.showErrorMessage(
                        dispatch,
                        "Error in deleting announcement"
                    );
                }
            })
            .catch((error) => {
                dispatch({
                    type: ANNOUNCEMENT_ACTION.DELETE_ANNOUNCEMENT_ERROR
                });
                toaster.showErrorMessage(
                    dispatch,
                    error.response?.data?.message
                );
            });
    };
}
