import {
    legacy_createStore as createStore,
    applyMiddleware,
    compose,
  } from "redux";
import thunk from "redux-thunk"
import { reducers } from "./Reducers"

const initialState = {
  auth : {
    authData : JSON.parse(localStorage.getItem("userInfo"))
  }
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const Store = createStore(reducers , initialState , composeEnhancers(applyMiddleware(thunk)));

export default Store;