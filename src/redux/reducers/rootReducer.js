import { combineReducers } from "redux";
import loginReducer from "../reducers/login/loginReducer";

const rootReducer = combineReducers({
  auth: loginReducer,
});

export default rootReducer;
