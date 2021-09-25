import * as AUTHENTICATION_ACTION from "../actions/authentication.action";
import * as MODAL_ACTION from "../actions/modal.action";
import authenticationService from "../../services/authentication/authentication.service";
import { setCookie, toaster } from "../../utils";

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
                    setCookie("x-auth-token", response.headers["x-auth-token"]);
                    setCookie("society-id", response.data?.society?._id);
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
                    toaster.showSuccessMessage(dispatch, "Login success");
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
