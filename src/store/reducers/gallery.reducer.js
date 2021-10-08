import * as GALLERY_ACTION from "../actions/gallery.action";
import { ActionStatus } from "../../modals/constant";

const initialState = {
    gallery: {
        status: ActionStatus.none,
        data: []
    },
    lastAdded: {
        status: ActionStatus.none,
        data: null
    },
    lastDeleted: {
        status: ActionStatus.none,
        data: null
    }
};

const galleryReducer = (state = initialState, action) => {
    switch (action.type) {
        case GALLERY_ACTION.FETCH_GALLERY:
            return {
                ...state,
                gallery: {
                    ...state.gallery,
                    status: ActionStatus.busy
                }
            };
        case GALLERY_ACTION.FETCH_GALLERY_SUCCESS:
            return {
                ...state,
                gallery: {
                    ...state.gallery,
                    status: ActionStatus.success,
                    data: action.payload
                }
            };
        case GALLERY_ACTION.FETCH_GALLERY_ERROR:
            return {
                ...state,
                gallery: {
                    ...state.gallery,
                    status: ActionStatus.error,
                    data: []
                }
            };

        case GALLERY_ACTION.CREATE_GALLERY:
            return {
                ...state,
                lastAdded: {
                    ...state.lastAdded,
                    status: ActionStatus.busy
                }
            };
        case GALLERY_ACTION.CREATE_GALLERY_SUCCESS: {
            return {
                ...state,
                lastAdded: {
                    ...state.lastAdded,
                    status: ActionStatus.success,
                    data: action.payload
                }
            };
        }
        case GALLERY_ACTION.CREATE_GALLERY_ERROR:
            return {
                ...state,
                lastAdded: {
                    ...state.lastAdded,
                    status: ActionStatus.error
                }
            };
        case GALLERY_ACTION.DELETE_GALLERY_SUCCESS:
            return {
                ...state,
                lastAdded: {
                    ...state.lastAdded,
                    status: ActionStatus.success,
                    lastAdded: action.payload
                }
            };
        case GALLERY_ACTION.DELETE_GALLERY_ERROR:
            return {
                ...state,
                lastAdded: {
                    ...state.lastAdded,
                    status: ActionStatus.error,
                    lastAdded: null
                }
            };
        case GALLERY_ACTION.CLEAR_LAST_ADDED_STATUS:
            return {
                ...state,
                lastAdded: {
                    ...state.lastAdded,
                    status: ActionStatus.none
                }
            };

        default:
            return { ...state };
    }
};

export default galleryReducer;
