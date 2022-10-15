import { combineReducers } from "redux";
import authReducer from "./authReducer";
import loopReducer from "./loopReducer";
import profileReducer from "./profileReducer";

export default combineReducers({
  auth: authReducer,
  loops: loopReducer,
  account: profileReducer,
});
