import * as USER_ACTION from "../actions/user.action";
import { ActionStatus } from "../../modals/constant";

const initialState = {
    userList: {
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
        case USER_ACTION.GET_ALL_USER:
            return {
                ...state,
                userList: {
                    ...state.userList,
                    status: ActionStatus.busy
                }
            };

        case USER_ACTION.GET_ALL_USER_SUCCESS:
            return {
                ...state,
                userList: {
                    status: ActionStatus.success,
                    data: action.payload
                }
            };

        case USER_ACTION.GET_ALL_USER_ERROR: {
            return {
                ...state,
                userList: {
                    status: ActionStatus.error,
                    data: null
                }
            };
        }

        case USER_ACTION.SAVE_USER:
            return {
                ...state,
                lastAdded: {
                    ...state.lastAdded,
                    status: ActionStatus.busy
                }
            };
        case USER_ACTION.SAVE_USER_SUCCESS:
            list = [...state.userList?.data?.docs];
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
                userList: {
                    ...state.userList,
                    data: {
                        ...state.userList.data,
                        docs: list,
                        totalDocs: state.userList.data?.totalDocs + 1
                    }
                },
                lastAdded: {
                    ...state.lastAdded,
                    status: ActionStatus.success,
                    data: action.payload
                }
            };
        case USER_ACTION.SAVE_USER_ERROR:
            return {
                ...state,
                lastAdded: {
                    ...state.lastAdded,
                    status: ActionStatus.error,
                    data: null
                }
            };

        case USER_ACTION.DELETE_USER:
            return {
                ...state,
                lastDeleted: {
                    ...state.lastDeleted,
                    status: ActionStatus.busy
                }
            };
        case USER_ACTION.DELETE_USER_SUCCESS:
            list = [...state.userList?.data?.docs];
            list.splice(
                list.findIndex((item) => item._id === action.payload._id),
                1
            );
            return {
                ...state,
                userList: {
                    ...state.userList,
                    data: {
                        ...state.userList.data,
                        docs: list,
                        totalDocs: state.userList.data.totalDocs - 1
                    }
                },
                lastDeleted: {
                    ...state.lastDeleted,
                    status: ActionStatus.success,
                    data: action.payload
                }
            };
        case USER_ACTION.DELETE_USER_ERROR:
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
