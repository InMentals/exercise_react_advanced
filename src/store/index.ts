import { combineReducers, createStore } from "redux";
import * as reducers from "./reducer";

const rootReducer = combineReducers(reducers);

export default function configureStore() {
  const store = createStore(rootReducer);
  return store;
}
