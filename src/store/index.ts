import { combineReducers, createStore } from "redux";
import * as reducers from "./reducer";
import { devToolsEnhancer } from "@redux-devtools/extension";

const rootReducer = combineReducers(reducers);

export default function configureStore(
  preloadedState: Partial<reducers.State>,
) {
  const store = createStore(
    rootReducer,
    preloadedState as never,
    devToolsEnhancer(),
  );
  return store;
}
