import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import Reducer from "./reducer";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(Reducer);

export default store;
