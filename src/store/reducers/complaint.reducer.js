import * as COMPLAINT_ACTION from "../actions/complaint.action";
import { ActionStatus } from "../../modals/constant";

const initialState = {
    complaintList: {
        status: ActionStatus.None,
        data: []
    }
};
export default function modalReducer(state = initialState, action) {
    console.log(action.type, "action type");
    switch (action.type) {
        case COMPLAINT_ACTION.GET_ALL_COMPLAINT:
            return {
                ...state,
                complaintList: {
                    status: ActionStatus.busy
                }
            };

        case COMPLAINT_ACTION.GET_ALL_COMPLAINT_SUCCESS:
            return {
                ...state,
                complaintList: {
                    status: ActionStatus.success,
                    data: action.payload
                }
            };

        case COMPLAINT_ACTION.GET_ALL_COMPLAINT_ERROR: {
            return {
                ...state,
                complaintList: {
                    status: ActionStatus.error,
                    data: null
                }
            };
        }
        default:
            return { ...state };
    }
}
