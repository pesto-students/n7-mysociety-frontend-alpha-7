import { combineReducers } from "redux";
import authentication from "./authentication.reducer";
import announcement from "./announcement.reducer";
import complaint from "./complaint.reducer";
import modal from "./modal.reducer";
const appReducer = combineReducers({
    authentication,
    announcement,
    complaint,
    modal
});

export default appReducer;
