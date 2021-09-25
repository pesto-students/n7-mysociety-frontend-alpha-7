import * as AUTHENTICATION_ACTION from "../actions/authentication.action";
import { ActionStatus } from "../../modals/constant";
const initialState = {
    register: {
        status: ActionStatus.None,
        data: null
    },
    login: { status: ActionStatus.None, data: null },
    societies: {
        status: ActionStatus.None,
        data: []
    }
};
export default function authentication(state = initialState, action) {
    switch (action.type) {
        case AUTHENTICATION_ACTION.REGISTER_USER:
            return {
                ...state,
                register: {
                    ...state.register,
                    status: ActionStatus.busy
                }
            };
        case AUTHENTICATION_ACTION.REGISTER_USER_SUCCESS:
            return {
                ...state,
                register: {
                    ...state.register,
                    status: ActionStatus.success,
                    data: action.payload
                }
            };
        case AUTHENTICATION_ACTION.REGISTER_USER_FAILURE:
            return {
                ...state,
                register: {
                    ...state.register,
                    status: ActionStatus.error
                }
            };
        case AUTHENTICATION_ACTION.UPDATE_USER_DETAILS:
        case AUTHENTICATION_ACTION.LOGIN_USER:
            return {
                ...state,
                login: {
                    ...state.login,
                    status: ActionStatus.busy
                }
            };
        case AUTHENTICATION_ACTION.UPDATE_USER_DETAILS_SUCCESS:
        case AUTHENTICATION_ACTION.LOGIN_USER_SUCCESS:
            return {
                ...state,
                login: {
                    ...state.login,
                    status: ActionStatus.success,
                    data: action.payload
                }
            };
        case AUTHENTICATION_ACTION.UPDATE_USER_DETAILS_ERROR:
        case AUTHENTICATION_ACTION.LOGIN_USER_FAILURE:
            return {
                ...state,
                login: {
                    ...state.login,
                    status: ActionStatus.error,
                    data: null
                }
            };
        case AUTHENTICATION_ACTION.UPDATE_SOCITY_ID:
            return {
                ...state,
                login: {
                    ...state.login,
                    data: {
                        ...state.login.data,
                        society: {
                            ...state.login.society,
                            _id: action.payload
                        }
                    }
                }
            };
        case AUTHENTICATION_ACTION.GET_ALL_SOCIETIES:
            return {
                ...state,
                societies: {
                    ...state.societies,
                    status: ActionStatus.busy
                }
            };
        case AUTHENTICATION_ACTION.GET_ALL_SOCIETIES_SUCCESS:
            return {
                ...state,
                societies: {
                    ...state.societies,
                    status: ActionStatus.success,
                    data: action.payload
                }
            };
        case AUTHENTICATION_ACTION.GET_ALL_SOCIETIES_ERROR:
            return {
                ...state,
                societies: {
                    ...state.societies,
                    status: ActionStatus.error,
                    data: null
                }
            };
        default:
            return { ...state };
    }
}
