import { SHOW_TOASTER } from "../store/actions/modal.action";
const defaultErrorMessage = "Something went wrong,please try again later!";
export function showSuccessMessage(dispatch, msg) {
    dispatch({
        type: SHOW_TOASTER,
        payload: {
            message: msg ? msg : "success",
            type: "success"
        }
    });
}
export function showErrorMessage(dispatch, msg) {
    dispatch({
        type: SHOW_TOASTER,
        payload: {
            message: msg ? msg : defaultErrorMessage,
            type: "error"
        }
    });
}
