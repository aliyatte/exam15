import { createBrowserHistory } from "history";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";
import usersReducer from "./reducers/usersReducer";
import thunkMiddleware from "redux-thunk";
import { loadFromLocalStorage, localStorageMiddleware } from "./localStorage";
import placesReducer from "./reducers/placesReducer";
import mainReducer from "./reducers/mainReducer";

export const history = createBrowserHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  router: connectRouter(history),
  main: mainReducer,
  users: usersReducer,
  places: placesReducer,
});

const middleware = [
  thunkMiddleware,
  routerMiddleware(history),
  localStorageMiddleware,
];

const enhancers = composeEnhancers(applyMiddleware(...middleware));

const persistedState = loadFromLocalStorage();

const store = createStore(rootReducer, persistedState, enhancers);

export default store;