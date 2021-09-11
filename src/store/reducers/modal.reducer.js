import * as MODAL_ACTION from "../actions/modal.action";

const initialState = {
    isOpened: false,
    type: null,
    data: null
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

        default:
            return { ...state };
    }
}
