import { combineReducers } from "redux";
import authentication from "./authentication.reducer";
import modal from "./modal.reducer";
const appReducer = combineReducers({
  authentication,
  modal,
});

export default appReducer;
