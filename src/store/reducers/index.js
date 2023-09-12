import {combineReducers} from "redux"
import adminReducer from "./product.reducer"
const createReducer = combineReducers({
        adminReducer,
});
export default createReducer;
