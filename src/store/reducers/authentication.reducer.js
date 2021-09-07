import * as AUTHENTICATION_ACTION from "../actions/authentication.action";
import { ActionStatus } from "../../models/constant";
const initialState = {
  register: ActionStatus.None,
  login: ActionStatus.None,
};
export default function authentication(state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATION_ACTION.REGISTER_USER:
      return {
        ...state,
        register: ActionStatus.busy,
      };
    case AUTHENTICATION_ACTION.REGISTER_USER_SUCCESS:
      return {
        ...state,
        register: ActionStatus.success,
      };
    case AUTHENTICATION_ACTION.REGISTER_USER_FAILURE:
      return {
        ...state,
        register: ActionStatus.error,
      };
    case AUTHENTICATION_ACTION.LOGIN_USER:
      return {
        ...state,
        login: ActionStatus.busy,
      };
    case AUTHENTICATION_ACTION.LOGIN_USER_SUCCESS:
      return {
        ...state,
        login: ActionStatus.success,
      };
    case AUTHENTICATION_ACTION.LOGIN_USER_FAILURE:
      return {
        ...state,
        login: ActionStatus.error,
      };
    default:
      return { ...state };
  }
}
