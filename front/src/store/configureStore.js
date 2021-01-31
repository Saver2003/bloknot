import thunkMiddleware from 'redux-thunk';
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {routerMiddleware, routerReducer} from 'react-router-redux';
import {createBrowserHistory} from "history";
import {saveState, loadState} from "./localStorage";

const rootReducer = combineReducers({
  routing: routerReducer
});

export const history = createBrowserHistory();

const middleware = [
  thunkMiddleware,
  routerMiddleware(history)
];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(applyMiddleware(...middleware));

const persistedState = loadState();

const store = createStore(rootReducer, persistedState, enhancers);

store.subscribe(() => {
  saveState({
    auth: store.getState().auth
  });
});

export default store;
