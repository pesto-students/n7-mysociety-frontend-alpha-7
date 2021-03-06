import * as EVENT_ACTION from "../actions/event.action";
import * as MODAL_ACTION from "../actions/modal.action";
import eventService from "../../services/event";
import { toaster } from "../../utils";
import { initalPaginator } from "../../modals/constant";

export function getAllEvents(payload) {
    return (dispatch) => {
        dispatch({
            type: EVENT_ACTION.GET_EVENTS,
            filterType: payload.filterType
        });
        eventService
            .getEvents(payload)
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: EVENT_ACTION.GET_EVENTS_SUCCESS,
                        payload: response.data?.result
                    });
                } else {
                    dispatch({
                        type: EVENT_ACTION.GET_EVENTS_ERROR
                    });
                }
            })
            .catch((error) => {
                dispatch({
                    type: EVENT_ACTION.GET_EVENTS_ERROR
                });
                toaster.showErrorMessage(
                    dispatch,
                    error.response?.data?.message
                );
            });
    };
}

export function addEvent(payload, filterType, societyId) {
    return (dispatch) => {
        dispatch({ type: EVENT_ACTION.ADD_EVENT });
        eventService
            .createEvent(payload)
            .then((response) => {
                if (response.status === 201 || response.status === 203) {
                    dispatch({
                        type: EVENT_ACTION.ADD_EVENT_SUCCESS,
                        payload: response?.data?.result
                    });
                    dispatch(
                        getAllEvents({
                            ...initalPaginator,
                            filterType: filterType,
                            societyId: societyId
                        })
                    );
                    toaster.showSuccessMessage(
                        dispatch,
                        response.data?.message
                    );
                    dispatch({ type: MODAL_ACTION.CLOSE_MODAL });
                } else {
                    toaster.showErrorMessage(
                        dispatch,
                        response?.response?.data?.message
                    );
                    dispatch({
                        type: EVENT_ACTION.ADD_EVENT_ERROR
                    });
                }
            })
            .catch((error) => {
                dispatch({ type: EVENT_ACTION.ADD_EVENT_ERROR });
                toaster.showErrorMessage(
                    dispatch,
                    error.response?.data?.message
                );
            });
    };
}

export function deleteEvent(payload) {
    return (dispatch) => {
        dispatch({ type: EVENT_ACTION.DELETE_EVENT });
        eventService
            .deleteEvent(payload)
            .then((response) => {
                if (response.status === 203) {
                    dispatch({
                        type: EVENT_ACTION.DELETE_EVENT_SUCCESS,
                        payload: response.data?.result
                    });
                    toaster.showSuccessMessage(
                        dispatch,
                        response.data?.message
                    );
                } else {
                    toaster.showErrorMessage(
                        dispatch,
                        "Error in deleting event"
                    );
                }
            })
            .catch((error) => {
                dispatch({
                    type: EVENT_ACTION.DELETE_EVENT_ERROR
                });
                toaster.showErrorMessage(
                    dispatch,
                    error.response?.data?.message
                );
            });
    };
}
