import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import createReducer from "./reducers";
// import adminReducer from "./reducers/product.reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(createReducer, composeEnhancers(
    applyMiddleware(thunk)
));

export default store;