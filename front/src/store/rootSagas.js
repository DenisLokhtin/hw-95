import {all} from "redux-saga/effects";
import cocktailsSagas from "./sagas/cocktailsSagas";
import usersSagas from "./sagas/userSaga";

export default function* rootSaga() {
    yield all([...usersSagas, ...cocktailsSagas]);
}
