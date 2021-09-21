import { SHOW_TOASTER } from "../store/actions/modal.action";
export function showSuccessMessage(dispatch, msg) {
    dispatch({
        type: SHOW_TOASTER,
        payload: {
            message: msg,
            type: "success"
        }
    });
}
export function showErrorMessage(dispatch, msg) {
    dispatch({
        type: SHOW_TOASTER,
        payload: {
            message: msg,
            type: "error"
        }
    });
}
