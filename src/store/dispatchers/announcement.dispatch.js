import * as ANNOUNCEMENT_ACTION from "../actions/announcement.action";
import * as MODAL_ACTION from "../actions/modal.action";
import announcementService from "../../services/announcement";
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
