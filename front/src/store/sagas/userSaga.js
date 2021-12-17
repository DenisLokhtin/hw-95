import {takeEvery} from "redux-saga/effects";
import {loginUser, registerUser, registerUserFailure, registerUserSuccess, loginUserRequest} from "../actions/usersAction";
import axiosApi from "../../axiosApi";
import {historyPush} from "../actions/historyActions";
import {put} from 'redux-saga/effects';
import {toast} from "react-toastify";

export function* registerUserSaga({payload: userData}) {
    try {
        const response = yield axiosApi.post('/users', userData);
        yield put(registerUserSuccess(response.data));
        yield put(historyPush('/'));
        toast.success('Registered successful!');
    } catch (error) {
        toast.error(error.response.data.global);
        yield put(registerUserFailure(error.response.data));
    }
}

export function* loginUserSaga({payload: userData}) {
    try {
        const response = yield axiosApi.post('users/sessions', userData);
        yield put(loginUserRequest(response.data.user));
        yield put(historyPush('/'));
        toast.success('Login successful!');
    } catch (error) {
        toast.error(error.response.data.global);
    }
}

const usersSaga = [
    takeEvery(registerUser, registerUserSaga),
    takeEvery(loginUser, loginUserSaga),
];

export default usersSaga;