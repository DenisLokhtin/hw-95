import {takeEvery, put} from 'redux-saga/effects';
import {FETCH_EVENTS, setEvents} from "../actions/actions";
import axiosApi from "../../axiosApi";
import {toast} from "react-toastify";

export function* categoriesSagas() {
    try {
        const response = yield axiosApi.get('/events', );
        yield put(setEvents(response.data));
    } catch (e) {
        if (e.response.status !== 401) {
            toast.error('Fetch to events failed');
            console.log(e)
        }
    }
}

const eventsSaga = [
    takeEvery(FETCH_EVENTS, categoriesSagas)
];

export default eventsSaga;
