import { combineReducers } from "redux";
import { userReDucer } from "./reducers/userReducer";


const rootReducer = combineReducers({
    userReducer : userReDucer
})

export {rootReducer}