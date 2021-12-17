import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";
import cocktailsSlice from "./slices/cocktailsSlice";
import {loadFromLocalStorage, saveToLocalStorage} from "./localStorage";
import axiosApi from "../axiosApi";
import createSagaMiddleware from 'redux-saga';
import usersSlice from "./slices/usersSlice";
import {rootSagas} from "./rootSagas";


const rootReducer = combineReducers({
    'reducer': cocktailsSlice.reducer,
    'users': usersSlice.reducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedState = loadFromLocalStorage();

const sagaMiddleware = createSagaMiddleware();

const middleware = [
    thunk,
    sagaMiddleware,
];

const store = createStore(
    rootReducer,
    persistedState,
    composeEnhancers(applyMiddleware(...middleware))
);

sagaMiddleware.run(rootSagas);

store.subscribe(() => {
    saveToLocalStorage({
        users: store.getState().users,
    });
});

axiosApi.interceptors.request.use(config => {
    try {
        config.headers['Authorization'] = store.getState().users.user.token
    } catch (e) {}

    return config;
});

export default store;