import {takeEvery, put} from 'redux-saga/effects';
import {fetchCocktailsFailure, fetchCocktailsRequest, fetchCocktailsSuccess} from "../actions/actions";
import axiosApi from "../../axiosApi";
import {toast} from "react-toastify";

export function* actionsSagas() {
    try {
        const response = yield axiosApi.get('/cocktails', );
        yield put(fetchCocktailsRequest(response.data));
    } catch (e) {
        if (e.response.status !== 401) {
            yield put(fetchCocktailsFailure);
            toast.error('Fetch to cocktails failed');
            console.log(e)
        }
    }
}

const eventsSaga = [
    takeEvery(fetchCocktailsSuccess, actionsSagas)
];

export default eventsSaga;
