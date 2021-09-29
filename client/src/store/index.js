import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleWare from 'redux-thunk';
import rootReducer from "../reducer/index"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer,undefined, composeEnhancers(applyMiddleware(thunkMiddleWare)));

export default store;