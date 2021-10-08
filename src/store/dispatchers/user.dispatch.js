import * as USER_ACTION from "../actions/user.action";
import * as AUTHENTICATION_ACTION from "../actions/authentication.action";
import * as MODAL_ACTION from "../actions/modal.action";
import userService from "../../services/user";
import { toaster } from "../../utils";
export function getAllUsers(payload) {
    return (dispatch) => {
        dispatch({ type: USER_ACTION.GET_ALL_USER });
        userService
            .getAllUsers(payload)
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: USER_ACTION.GET_ALL_USER_SUCCESS,
                        payload: response.data?.result
                    });
                }
            })
            .catch((error) => {
                dispatch({
                    type: USER_ACTION.GET_ALL_USER_ERROR
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

export function saveUser(payload, userEmail = null) {
    return (dispatch) => {
        dispatch({ type: USER_ACTION.SAVE_USER });
        userService
            .createUser(payload)
            .then((response) => {
                if (response.status === 201 || response.status === 203) {
                    console.log(response, "response.data?.message");
                    dispatch({
                        type: USER_ACTION.SAVE_USER_SUCCESS,
                        payload: response?.data?.result
                    });
                    if (
                        userEmail &&
                        response?.data?.result?.email === userEmail
                    ) {
                        dispatch({
                            type: AUTHENTICATION_ACTION.UPDATE_USER_DETAILS_SUCCESS,
                            payload: response?.data?.result
                        });
                    }

                    toaster.showSuccessMessage(
                        dispatch,
                        response.data?.message
                    );
                    dispatch({ type: MODAL_ACTION.CLOSE_MODAL });
                } else {
                    toaster.showErrorMessage(dispatch, "Error in saving user");
                }
            })
            .catch((error) => {
                dispatch({ type: USER_ACTION.SAVE_USER_ERROR });
                toaster.showErrorMessage(
                    dispatch,
                    error.response?.data?.message
                );
            });
    };
}

export function saveSociety(payload) {
    return (dispatch) => {
        dispatch({ type: USER_ACTION.SAVE_SOCIETY });
        userService
            .updateSociety(payload)
            .then((response) => {
                if (response.status === 201 || response.status === 203) {
                    dispatch({
                        type: USER_ACTION.SAVE_SOCIETY_SUCCESS
                    });

                    dispatch({
                        type: AUTHENTICATION_ACTION.UPDATE_SOCIETY_DETAILS,
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
                        "Error in saving society"
                    );
                }
            })
            .catch((error) => {
                dispatch({ type: USER_ACTION.SAVE_SOCIETY_ERROR });
                toaster.showErrorMessage(
                    dispatch,
                    error.response?.data?.message
                );
            });
    };
}
