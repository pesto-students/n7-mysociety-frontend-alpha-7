import * as MODAL_ACTION from "../actions/modal.action";

export function closeModal() {
    return (dispatch) => {
        dispatch({ type: MODAL_ACTION.CLOSE_MODAL });
    };
}

export function openModal(type, title, data) {
    return (dispatch) => {
        dispatch({
            type: MODAL_ACTION.OPEN_MODAL,
            payload: {
                type: type,
                modalHeader: title,
                data: data
            }
        });
    };
}
