import { combineReducers } from "redux";
import authReducer from "./auth/authSlice";
import commonReducer from "./common/commonSlice";
import chatSupportReducer from "./chatSupport/chatSupportSlice";

const rootReducer = combineReducers({
  authReducer,
  commonReducer,
  chatSupportReducer,
});

export default rootReducer;
