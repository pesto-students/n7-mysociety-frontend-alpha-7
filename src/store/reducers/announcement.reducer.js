import * as ANNOUNCEMENT_ACTION from "../actions/announcement.action";
import { ActionStatus } from "../../modals/constant";

const initialState = {
    announcementList: {
        status: ActionStatus.None,
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
        case ANNOUNCEMENT_ACTION.GET_ALL_ANNOUNCEMENT:
            return {
                ...state,
                announcementList: {
                    ...state.announcementList,
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

        case ANNOUNCEMENT_ACTION.SAVE_ANNOUNCEMENT:
            return {
                ...state,
                lastAdded: {
                    ...state.lastAdded,
                    status: ActionStatus.busy
                }
            };
        case ANNOUNCEMENT_ACTION.SAVE_ANNOUNCEMENT_SUCCESS:
            list = [...state.announcementList?.data?.docs];
            const index = list.findIndex(
                (item) => item._id === action.payload._id
            );

            if (index >= 0) {
                list[index] = action.payload;
            } else {
                list.unshift(action.payload);
            }
            return {
                ...state,
                announcementList: {
                    ...state.announcementList,
                    data: {
                        ...state.announcementList.data,
                        docs: list,
                        totalDocs: state.announcementList.data?.totalDocs + 1
                    }
                },
                lastAdded: {
                    ...state.lastAdded,
                    status: ActionStatus.success,
                    data: action.payload
                }
            };
        case ANNOUNCEMENT_ACTION.SAVE_ANNOUNCEMENT_ERROR:
            return {
                ...state,
                lastAdded: {
                    ...state.lastAdded,
                    status: ActionStatus.error,
                    data: null
                }
            };

        case ANNOUNCEMENT_ACTION.DELETE_ANNOUNCEMENT:
            return {
                ...state,
                lastDeleted: {
                    ...state.lastDeleted,
                    status: ActionStatus.busy
                }
            };
        case ANNOUNCEMENT_ACTION.DELETE_ANNOUNCEMENT_SUCCESS:
            list = [...state.announcementList?.data?.docs];
            list.splice(
                list.findIndex((item) => item._id === action.payload._id),
                1
            );
            return {
                ...state,
                announcementList: {
                    ...state.announcementList,
                    data: {
                        ...state.announcementList.data,
                        docs: list,
                        totalDocs: state.announcementList.data.totalDocs - 1
                    }
                },
                lastDeleted: {
                    ...state.lastDeleted,
                    status: ActionStatus.success,
                    data: action.payload
                }
            };
        case ANNOUNCEMENT_ACTION.DELETE_ANNOUNCEMENT_ERROR:
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
