import * as AUTHENTICATION_ACTION from "../actions/authentication.action";
import authenticationService from "../../services/authentication/authentication.service";
import { setCookie, toaster } from "../../utils";
import { showErrorMessage, showSuccessMessage } from "../../utils/toaster";
export function registerUser(payload) {
    return (dispatch) => {
        dispatch({
            type: AUTHENTICATION_ACTION.REGISTER_USER,
            payload: payload
        });
        authenticationService
            .registerUser(payload)
            .then((response) => {
                console.log(response.response);
                if (response.status === 200) {
                    dispatch({
                        type: AUTHENTICATION_ACTION.REGISTER_USER_SUCCESS,
                        payload: payload
                    });
                    showSuccessMessage(dispatch, "Registered Successfully");
                } else {
                    showErrorMessage(
                        dispatch,
                        response?.response.data?.message
                    );
                    dispatch({
                        type: AUTHENTICATION_ACTION.REGISTER_USER_FAILURE
                    });
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
                    setCookie("x-auth-token", response.headers["x-auth-token"]);
                    setCookie("society-id", response.data?.society?._id);
                    dispatch({
                        type: AUTHENTICATION_ACTION.LOGIN_USER_SUCCESS,
                        payload: response.data
                    });
                    //dispatch({ type: "SET_TOKEN" });
                    showSuccessMessage(dispatch, "Logged in successfully");
                } else {
                    showErrorMessage(
                        dispatch,
                        response?.response?.data?.message
                    );
                    dispatch({
                        type: AUTHENTICATION_ACTION.LOGIN_USER_FAILURE
                    });
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
                } else {
                    dispatch({
                        type: AUTHENTICATION_ACTION.GET_ALL_SOCIETIES_ERROR
                    });
                }
            })
            .catch((error) => {
                dispatch({
                    type: AUTHENTICATION_ACTION.GET_ALL_SOCIETIES_ERROR
                });
                showErrorMessage(dispatch, error.response?.data?.message);
            });
    };
}

export function getAllGuests() {
    return (dispatch) => {
        dispatch({ type: AUTHENTICATION_ACTION.GET_ALL_GUESTS });
        authenticationService
            .getAllGuests()
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: AUTHENTICATION_ACTION.GET_ALL_GUESTS_SUCCESS,
                        payload: response.data?.results[0]
                    });
                } else {
                    dispatch({
                        type: AUTHENTICATION_ACTION.GET_ALL_GUESTS_ERROR
                    });
                }
            })
            .catch((error) => {
                dispatch({
                    type: AUTHENTICATION_ACTION.GET_ALL_GUESTS_ERROR
                });
                showErrorMessage(dispatch, error.response?.data?.message);
            });
    };
}

export function updateSocietyId(societyId) {
    return (dispatch) => {
        dispatch({
            type: AUTHENTICATION_ACTION.UPDATE_SOCITY_ID,
            payload: societyId
        });
    };
}

export function updateLoggedInUserDetails(societyId) {
    return (dispatch) => {
        dispatch({ type: AUTHENTICATION_ACTION.UPDATE_USER_DETAILS });
        authenticationService
            .getUserDetails({ societyId })
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: AUTHENTICATION_ACTION.UPDATE_USER_DETAILS_SUCCESS,
                        payload: response?.data?.result
                    });
                } else {
                    toaster.showSuccessMessage(
                        dispatch,
                        "error in fetching user details"
                    );
                    dispatch({
                        type: AUTHENTICATION_ACTION.UPDATE_USER_DETAILS_ERROR
                    });
                }
            })
            .catch((error) => {
                toaster.showErrorMessage(
                    dispatch,
                    error?.response?.data?.message
                );
                dispatch({
                    type: AUTHENTICATION_ACTION.UPDATE_USER_DETAILS_ERROR
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
