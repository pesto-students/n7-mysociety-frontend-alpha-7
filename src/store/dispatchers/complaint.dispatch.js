import * as COMPLAINT_ACTION from "../actions/complaint.action";
import * as MODAL_ACTION from "../actions/modal.action";
import complaintService from "../../services/complaint";
export function getAllComplaints(payload) {
    return (dispatch) => {
        dispatch({ type: COMPLAINT_ACTION.GET_ALL_COMPLAINT });
        complaintService
            .getAllComplaints(payload)
            .then((response) => {
                console.log(response, "response---");
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
