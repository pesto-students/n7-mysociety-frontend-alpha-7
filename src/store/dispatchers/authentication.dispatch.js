import * as AUTHENTICATION_ACTION from "../actions/authentication.action";
import * as MODAL_ACTION from "../actions/modal.action";
import authenticationService from "../../services/authentication/authentication.service";
const showErrorMessage = (dispatch, msg) => {
    dispatch({
        type: MODAL_ACTION.SHOW_TOASTER,
        payload: {
            message: msg,
            type: "error"
        }
    });
};

const showSuccessMessage = (dispatch, msg) => {
    dispatch({
        type: MODAL_ACTION.SHOW_TOASTER,
        payload: {
            message: msg,
            type: "success"
        }
    });
};
export function registerUser(payload) {
    return (dispatch) => {
        dispatch({
            type: AUTHENTICATION_ACTION.REGISTER_USER,
            payload: payload
        });
        authenticationService
            .registerUser(payload)
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: AUTHENTICATION_ACTION.REGISTER_USER_SUCCESS,
                        payload: payload
                    });
                    showSuccessMessage(dispatch, "Registered Successfully");
                } else {
                    showErrorMessage(dispatch, "Error in registration");
                }
            })
            .catch((error) => {
                console.log(error.response);
                dispatch({ type: AUTHENTICATION_ACTION.REGISTER_USER_FAILURE });
                showErrorMessage(dispatch, error.response?.data?.message);
            });
    };
}

export function loginUser(payload) {
    return (dispatch) => {
        dispatch({ type: AUTHENTICATION_ACTION.LOGIN_USER });
        authenticationService
            .loginUser(payload)
            .then((response) => {
                if (response.status === 200) {
                    document.cookie = `x-auth-token=${response.headers["x-auth-token"]}`;
                    dispatch({
                        type: AUTHENTICATION_ACTION.LOGIN_USER_SUCCESS,
                        payload: response.data
                    });
                    dispatch({ type: "SET_TOKEN" });
                    showSuccessMessage(dispatch, "Logged in successfully");
                } else {
                    showErrorMessage(dispatch, "Error in login");
                }
            })
            .catch((error) => {
                dispatch({ type: AUTHENTICATION_ACTION.LOGIN_USER_FAILURE });
                showErrorMessage(dispatch, error.response?.data?.message);
            });
    };
}

export function forgetPassword(payload) {
    return (dispatch) => {
        dispatch({ type: AUTHENTICATION_ACTION.FORGET_PASSWORD });
        authenticationService
            .forgetPassword(payload)
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: AUTHENTICATION_ACTION.FORGET_PASSWORD_SUCCESS,
                        payload: response.data
                    });
                    showSuccessMessage(
                        dispatch,
                        "Reset link sent successfully to your mail."
                    );
                } else {
                    showErrorMessage(dispatch, "Error in forget password");
                }
            })
            .catch((error) => {
                dispatch({
                    type: AUTHENTICATION_ACTION.FORGET_PASSWORD_FAILURE
                });
                showErrorMessage(dispatch, error.response?.data?.message);
            });
    };
}

export function getAllSocieties() {
    return (dispatch) => {
        dispatch({ type: AUTHENTICATION_ACTION.GET_ALL_SOCIETIES });
        authenticationService
            .getAllSocietities()
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: AUTHENTICATION_ACTION.GET_ALL_SOCIETIES_SUCCESS,
                        payload: response.data?.results
                    });
                }
            })
            .catch((error) => {
                dispatch({
                    type: AUTHENTICATION_ACTION.GET_ALL_SOCIETIES_ERROR
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

export function verifySociety(payload) {
    return (dispatch) => {
        dispatch({ type: AUTHENTICATION_ACTION.VERIFY_SOCIETY });
        authenticationService
            .verifySociety(payload)
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: AUTHENTICATION_ACTION.VERIFY_SOCIETY_SUCCESS,
                        payload: response.data
                    });
                    showSuccessMessage(
                        dispatch,
                        "Society verified successfully."
                    );
                } else {
                    showErrorMessage(
                        dispatch,
                        "Facing problem in society verification, Please try again."
                    );
                }
            })
            .catch((error) => {
                dispatch({
                    type: AUTHENTICATION_ACTION.VERIFY_SOCIETY_FAILURE
                });
                showErrorMessage(dispatch, error.response?.data?.message);
            });
    };
}
export function resetPassword(payload) {
    return (dispatch) => {
        dispatch({ type: AUTHENTICATION_ACTION.RESET_PASSWORD });
        authenticationService
            .resetPassword(payload)
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: AUTHENTICATION_ACTION.RESET_PASSWORD_SUCCESS,
                        payload: response.data
                    });
                    showSuccessMessage(
                        dispatch,
                        "Password reset successfully. Try Login."
                    );
                } else {
                    showErrorMessage(
                        dispatch,
                        "Facing problem in reset password, Please try again."
                    );
                }
            })
            .catch((error) => {
                dispatch({
                    type: AUTHENTICATION_ACTION.RESET_PASSWORD_FAILURE
                });
                showErrorMessage(dispatch, error.response?.data?.message);
            });
    };
}
