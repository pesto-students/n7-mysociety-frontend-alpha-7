import { combineReducers } from "redux";
import authentication from "./authentication.reducer";
import announcement from "./announcement.reducer";
import event from "./event.reducer";
import complaint from "./complaint.reducer";
import user from "./user.reducer";
import modal from "./modal.reducer";
import gallery from "./gallery.reducer";
import { LOGOUT_USER } from "../actions/authentication.action";
import { logout } from "../../utils";

const appReducer = combineReducers({
    authentication,
    announcement,
    modal,
    event,
    gallery,
    complaint,
    user
});

const rootReducer = (state, action) => {
    if (action.type === LOGOUT_USER) {
        logout();
        return appReducer(undefined, action);
    }
    return appReducer(state, action);
};

export default rootReducer;
