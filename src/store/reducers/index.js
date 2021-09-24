import { combineReducers } from "redux";
import authentication from "./authentication.reducer";
import announcement from "./announcement.reducer";
import event from "./event.reducer";
import modal from "./modal.reducer";
import gallery from "./gallery.reducer";
const appReducer = combineReducers({
    authentication,
    announcement,
    modal,
    event,
    gallery
});

export default appReducer;
