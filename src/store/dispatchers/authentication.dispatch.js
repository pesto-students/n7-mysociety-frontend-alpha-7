import * as AUTHENTICATION_ACTION from "../actions/authentication.action";
import authenticationService from "../../services/authentication/authentication.service";
export function registerUser(payload) {
  return (dispatch) => {
    dispatch({ type: AUTHENTICATION_ACTION.REGISTER_USER });
    authenticationService
      .registerUser(payload)
      .then((response) =>
        dispatch({
          type: AUTHENTICATION_ACTION.REGISTER_USER_SUCCESS,
          payload: response.data,
        })
      )
      .catch((error) =>
        dispatch({ type: AUTHENTICATION_ACTION.REGISTER_USER_FAILURE })
      );
  };
}

export function loginUser(payload) {
  return (dispatch) => {
    dispatch({ type: AUTHENTICATION_ACTION.LOGIN_USER });
    authenticationService
      .loginUser()
      .then((response) =>
        dispatch({
          type: AUTHENTICATION_ACTION.LOGIN_USER_SUCCESS,
          payload: response.data,
        })
      )
      .catch((error) =>
        dispatch({ type: AUTHENTICATION_ACTION.LOGIN_USER_FAILURE })
      );
  };
}
