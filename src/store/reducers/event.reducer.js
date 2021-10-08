import { ActionStatus } from "../../modals/constant";
import * as EVENT_ACTION from "../actions/event.action";
const initialState = {
    events: {
        status: ActionStatus.none,
        currentFilter: "todays",
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
let list = [];
export default function eventReducer(state = initialState, action) {
    switch (action.type) {
        case EVENT_ACTION.GET_EVENTS:
            return {
                ...state,
                events: {
                    ...state.events,
                    currentFilter: action.filterType,
                    status: ActionStatus.busy
                }
            };
        case EVENT_ACTION.GET_EVENTS_SUCCESS:
            return {
                ...state,
                events: {
                    ...state.events,
                    data: action.payload,
                    status: ActionStatus.success
                }
            };
        case EVENT_ACTION.GET_EVENTS_ERROR:
            return {
                ...state,
                events: {
                    ...state,
                    status: ActionStatus.error
                }
            };
        case EVENT_ACTION.ADD_EVENT:
            return {
                ...state,
                lastAdded: {
                    ...state.lastAdded,
                    status: ActionStatus.busy
                }
            };
        case EVENT_ACTION.ADD_EVENT_SUCCESS:
            /* list = [...state.events?.data?.docs];
            const index = list.findIndex(
                (item) => item._id === action.payload._id
            );

            if (index >= 0) {
                list[index] = action.payload;
            } else {
                list.unshift(action.payload);
            }*/
            return {
                ...state,
                events: {
                    ...state.events,
                    data: {
                        ...state.events.data,
                        docs: list,
                        totalDocs: state.events.data?.totalDocs + 1
                    }
                },
                lastAdded: {
                    ...state.lastAdded,
                    status: ActionStatus.success,
                    data: action.payload
                }
            };
        case EVENT_ACTION.ADD_EVENT_ERROR:
            return {
                ...state,
                lastAdded: {
                    ...state.lastAdded,
                    status: ActionStatus.error,
                    data: null
                }
            };
        case EVENT_ACTION.DELETE_EVENT:
            return {
                ...state,
                lastDeleted: {
                    ...state.lastDeleted,
                    status: ActionStatus.busy
                }
            };
        case EVENT_ACTION.DELETE_EVENT_SUCCESS:
            list = [...state.events?.data?.docs];
            list.splice(
                list.findIndex((item) => item._id === action.payload._id),
                1
            );
            return {
                ...state,
                events: {
                    ...state.events,
                    data: {
                        ...state.events.data,
                        docs: list,
                        totalDocs: state.events.data.totalDocs - 1
                    }
                },
                lastDeleted: {
                    ...state.lastDeleted,
                    status: ActionStatus.success,
                    data: action.payload
                }
            };
        case EVENT_ACTION.DELETE_EVENT_ERROR:
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
