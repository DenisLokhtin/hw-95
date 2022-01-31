import {loadFromLocalStorage, saveToLocalStorage} from "./localStorage";
import {initialState} from "./slices/usersSlice";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSagas";
import {configureStore} from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import axiosCocktail from "../axiosApi";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: rootReducer,
    middleware: [sagaMiddleware],
    devTools: true,
    preloadedState: loadFromLocalStorage(),
});

sagaMiddleware.run(rootSaga);

store.subscribe(() => {
    saveToLocalStorage({
        users: {
            ...initialState,
            user: store.getState().users.user,
        },
    });
});

axiosCocktail.interceptors.request.use((config) => {
    try {
        config.headers["Authorization"] = store.getState().users.user.token;
    } catch (e) {
        console.log(e)
    }

    return config;
});

axiosCocktail.interceptors.response.use(
    (res) => res,
    (e) => {
        if (!e.response) {
            e.response = {data: {global: "No internet"}};
        }

        throw e;
    }
);

export default store;