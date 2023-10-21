import { applyMiddleware, createStore } from "redux";
import rootReducer from "../reducer/index";
import thunk from "redux-thunk";

export const store = createStore(rootReducer, applyMiddleware(thunk));
