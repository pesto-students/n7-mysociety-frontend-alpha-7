import { combineReducers } from "redux";
import authentication from "./authentication.reducer";
import announcement from "./announcement.reducer";
import event from "./event.reducer";
import complaint from "./complaint.reducer";
import user from "./user.reducer";
import modal from "./modal.reducer";
const appReducer = combineReducers({
    authentication,
    announcement,
    modal,
    event,
    complaint,
    user
});

export default appReducer;
