import * as COMPLAINT_ACTION from "../actions/complaint.action";
import { ActionStatus } from "../../modals/constant";

const initialState = {
    complaintList: {
        status: ActionStatus.None,
        currentFilter: "Pending",
        data: []
    },

    lastAdded: {
        status: ActionStatus.None,
        data: null
    },

    lastDeleted: {
        status: ActionStatus.None,
        data: null
    }
};
let list = [];
export default function modalReducer(state = initialState, action) {
    switch (action.type) {
        case COMPLAINT_ACTION.GET_ALL_COMPLAINT:
            return {
                ...state,
                complaintList: {
                    ...state.complaintList,
                    currentFilter: action.status,
                    status: ActionStatus.busy
                }
            };

        case COMPLAINT_ACTION.GET_ALL_COMPLAINT_SUCCESS:
            return {
                ...state,
                complaintList: {
                    ...state.complaintList,
                    status: ActionStatus.success,
                    data: action.payload
                }
            };

        case COMPLAINT_ACTION.GET_ALL_COMPLAINT_ERROR: {
            return {
                ...state,
                complaintList: {
                    ...state.complaintList,
                    status: ActionStatus.error,
                    data: null
                }
            };
        }

        case COMPLAINT_ACTION.SAVE_COMPLAINT:
            return {
                ...state,
                lastAdded: {
                    ...state.lastAdded,
                    status: ActionStatus.busy
                }
            };
        case COMPLAINT_ACTION.SAVE_COMPLAINT_SUCCESS:
            return {
                ...state,
                lastAdded: {
                    ...state.lastAdded,
                    status: ActionStatus.success,
                    data: action.payload
                }
            };
        case COMPLAINT_ACTION.SAVE_COMPLAINT_ERROR:
            return {
                ...state,
                lastAdded: {
                    ...state.lastAdded,
                    status: ActionStatus.error,
                    data: null
                }
            };

        case COMPLAINT_ACTION.DELETE_COMPLAINT:
            return {
                ...state,
                lastDeleted: {
                    ...state.lastDeleted,
                    status: ActionStatus.busy
                }
            };
        case COMPLAINT_ACTION.DELETE_COMPLAINT_SUCCESS:
            list = [...state.complaintList?.data?.docs];
            list.splice(
                list.findIndex((item) => item._id === action.payload._id),
                1
            );
            return {
                ...state,
                complaintList: {
                    ...state.complaintList,
                    data: {
                        ...state.complaintList.data,
                        docs: list,
                        totalDocs: state.complaintList.data.totalDocs - 1
                    }
                },
                lastDeleted: {
                    ...state.lastDeleted,
                    status: ActionStatus.success,
                    data: action.payload
                }
            };
        case COMPLAINT_ACTION.DELETE_COMPLAINT_ERROR:
            return {
                ...state,
                lastDeleted: {
                    ...state.lastDeleted,
                    status: ActionStatus.error,
                    data: null
                }
            };
        default:
            return { ...state };
    }
}
