import { combineReducers } from "redux";
import tokens from "./authenticationReducer";
import apiCallsInProgress from "./apiStatusReducer";
import isAdmin from "./isAdminReducer";
import user from "./userReducer";
import bag from "./bagReducer"

const rootReducer = combineReducers({
    tokens,
    user,
    apiCallsInProgress,
    isAdmin,
    bag
});

export default rootReducer;
