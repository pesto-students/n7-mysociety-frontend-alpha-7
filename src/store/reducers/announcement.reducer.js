import * as ANNOUNCEMENT_ACTION from "../actions/announcement.action";
import { ActionStatus } from "../../modals/constant";

const initialState = {
    announcementList: {
        status: ActionStatus.None,
        data: []
    }
};
export default function modalReducer(state = initialState, action) {
    switch (action.type) {
        case ANNOUNCEMENT_ACTION.GET_ALL_ANNOUNCEMENT:
            return {
                ...state,
                announcementList: {
                    status: ActionStatus.busy
                }
            };

        case ANNOUNCEMENT_ACTION.GET_ALL_ANNOUNCEMENT_SUCCESS:
            return {
                ...state,
                announcementList: {
                    status: ActionStatus.success,
                    data: action.payload
                }
            };

        case ANNOUNCEMENT_ACTION.GET_ALL_ANNOUNCEMENT_ERROR: {
            return {
                ...state,
                announcementList: {
                    status: ActionStatus.error,
                    data: null
                }
            };
        }
        default:
            return { ...state };
    }
}
