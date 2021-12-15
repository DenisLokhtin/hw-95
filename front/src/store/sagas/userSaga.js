import {takeEvery} from "redux-saga/effects";
import {registerUser, registerUserFailure, registerUserSuccess} from "../actions/usersAction";
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

const usersSaga = [
    takeEvery(registerUser, registerUserSaga),
];

export default usersSaga;