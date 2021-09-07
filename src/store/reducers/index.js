import { combineReducers } from "redux";
import authentication from "./authentication.reducer";
const appReducer = combineReducers({
  authentication,
});

export default appReducer;
