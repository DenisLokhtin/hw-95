import {put, takeEvery} from "redux-saga/effects";
import {facebookLoginRequest, loginFailure, loginSuccess, logoutRequest, logoutSuccess,} from "../actions/usersAction";
import axiosCocktail from "../../axiosApi";

export function* facebookLogin({payload: data}) {
    try {
        const response = yield axiosCocktail.post("/users/facebookLogin", data);
        yield put(loginSuccess(response.data.user));
        } catch (e) {
        yield put(loginFailure(e.response.data));
    }
}

export function* logout() {
    try {
        yield axiosCocktail.delete("/users/sessions");
        yield put(logoutSuccess());
    } catch (e) {
        yield put(loginFailure(e.response.data));
    }
}

const usersSagas = [

    takeEvery(facebookLoginRequest, facebookLogin),
    takeEvery(logoutRequest, logout),
];

export default usersSagas;