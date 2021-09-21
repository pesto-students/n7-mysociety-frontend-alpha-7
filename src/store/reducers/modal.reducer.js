import * as MODAL_ACTION from "../actions/modal.action";

const initialState = {
    isOpened: false,
    type: null,
    data: null,

    snackbar: {
        show: false,
        message: null
    }
};
export default function modalReducer(state = initialState, action) {
    switch (action.type) {
        case MODAL_ACTION.OPEN_MODAL:
            return {
                ...state,
                isOpened: true,
                type: action.payload.type,
                data: action.payload.data
            };

        case MODAL_ACTION.CLOSE_MODAL:
            return {
                ...state,
                isOpened: false,
                type: null,
                data: null
            };

        case MODAL_ACTION.SHOW_TOASTER: {
            return {
                ...state,
                snackbar: {
                    show: true,
                    message: action.payload?.message ?? "",
                    type: action.payload?.type
                }
            };
        }

        case MODAL_ACTION.CLOSE_TOASTER: {
            return {
                ...state,
                snackbar: {
                    show: false,
                    message: null,
                    type: null
                }
            };
        }

        default:
            return { ...state };
    }
}
