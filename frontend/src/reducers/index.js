import { combineReducers } from "redux";
import authReducer from "./authReducer";
import loopReducer from "./loopReducer";

export default combineReducers({
  auth: authReducer,
  loops: loopReducer,
});
