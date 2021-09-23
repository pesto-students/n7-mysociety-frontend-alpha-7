import { combineReducers } from "redux";
import authentication from "./authentication.reducer";
import announcement from "./announcement.reducer";
import event from "./event.reducer";
import modal from "./modal.reducer";
const appReducer = combineReducers({
    authentication,
    announcement,
    modal,
    event
});

export default appReducer;
