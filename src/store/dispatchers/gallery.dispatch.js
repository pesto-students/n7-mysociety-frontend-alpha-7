import * as GALLERY_ACTION from "../actions/gallery.action";
import * as MODAL_ACTION from "../actions/modal.action";
import gallery from "../../services/gallery";
import { toaster } from "../../utils";

export function createGallery(payload) {
    return (dispatch) => {
        dispatch({ type: GALLERY_ACTION.CREATE_GALLERY });
        gallery
            .createGallery(payload)
            .then((response) => {
                if (response.status === 201 || response.status === 203) {
                    dispatch({
                        type: GALLERY_ACTION.CREATE_GALLERY_SUCCESS,
                        payload: response.data
                    });
                    toaster.showSuccessMessage(
                        dispatch,
                        response.data?.message
                    );
                    dispatch(getGallery({ societyId: payload.societyId }));
                    dispatch({ type: MODAL_ACTION.CLOSE_MODAL });
                } else {
                    toaster.showErrorMessage(dispatch, response.data?.message);
                }
            })
            .catch((error) => {
                dispatch({
                    type: GALLERY_ACTION.CREATE_GALLERY_ERROR
                });
                toaster.showErrorMessage(
                    dispatch,
                    error.response?.data?.message
                );
            });
    };
}

export function getGallery(payload) {
    return (dispatch) => {
        dispatch({ type: GALLERY_ACTION.FETCH_GALLERY });
        gallery
            .fetchGallery(payload)
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: GALLERY_ACTION.FETCH_GALLERY_SUCCESS,
                        payload: response.data?.result
                    });
                }
                //toaster.showSuccessMessage(dispatch, response.data?.message);
            })
            .catch((error) => {
                dispatch({
                    type: GALLERY_ACTION.FETCH_GALLERY_ERROR
                });
                toaster.showErrorMessage(
                    dispatch,
                    error.response?.data?.message
                );
            });
    };
}

export function delGallery(payload) {
    return (dispatch) => {
        dispatch({ type: GALLERY_ACTION.DELETE_GALLERY });
        gallery
            .deleteGallery(payload)
            .then((response) => {
                if (response.status === 203) {
                    dispatch({
                        type: GALLERY_ACTION.DELETE_GALLERY_SUCCESS,
                        payload: response.data?.result
                    });
                    toaster.showSuccessMessage(
                        dispatch,
                        response.data?.message
                    );
                    dispatch(
                        getGallery({
                            societyId: payload.societyId
                        })
                    );
                } else {
                    toaster.showErrorMessage(dispatch, response.data?.message);
                }
            })
            .catch((error) => {
                toaster.showErrorMessage(
                    dispatch,
                    error.response.data?.message
                );
                dispatch({ type: GALLERY_ACTION.CREATE_GALLERY_ERROR });
            });
    };
}
