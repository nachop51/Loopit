import { combineReducers } from "redux";
import authReducer from "./authReducer";
import profileReducer from "./profileReducer";
import loopReducer from "./loopReducer";

export default combineReducers({
  auth: authReducer,
  account: profileReducer,
  loops: loopReducer,
});
