import { combineReducers } from "redux";
import authentication from "./authentication.reducer";
import announcement from "./announcement.reducer";
import modal from "./modal.reducer";
const appReducer = combineReducers({
    authentication,
    announcement,
    modal
});

export default appReducer;
