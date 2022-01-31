import {put, takeEvery} from "redux-saga/effects";
import axiosCocktail from "../../axiosApi";
import {
    FetchCocktailsFailure,
    FetchCocktailsRequest,
    FetchCocktailsSuccess,
    FetchSoloCocktailSuccess,
    FetchSoloCocktailFailure,
    FetchSoloCocktailRequest,
    PostCocktailsFailure,
    PostCocktailsRequest,
    PostCocktailsSuccess,
    FetchMyCocktailsSuccess,
    FetchMyCocktailsFailure,
    FetchMyCocktailsRequest,
    DeleteCocktailsSuccess,
    DeleteCocktailsFailure,
    PublishedCocktailsSuccess,
    PublishedCocktailsFailure,
    DeleteCocktailsRequest,
    PublishedCocktailsRequest,
} from "../actions/cocktailsActions";

export function* fetchCocktails() {
    try {
        const response = yield axiosCocktail.get("/cocktails");
        yield put(FetchCocktailsSuccess(response.data));
    } catch (error) {
        yield put(FetchCocktailsFailure(error.response.data));
    }
}

export function* fetchSoloCocktail({payload: id}) {
    try {
        const response = yield axiosCocktail.get("/cocktails/" + id);
        yield put(FetchSoloCocktailSuccess(response.data));
    } catch (e) {
        yield put(FetchSoloCocktailFailure(e.response.data));
    }
}

export function* fetchMyCocktails() {
    try {
        const response = yield axiosCocktail.get("/cocktails/mycocktails");
        yield put(FetchMyCocktailsSuccess(response.data));
    } catch (e) {
        yield put(FetchMyCocktailsFailure(e.response.data));
    }
}

export function* postCocktail({payload: cocktailData}) {
    try {
        yield axiosCocktail.post("/cocktails", cocktailData);
        yield put(PostCocktailsSuccess());
    } catch (e) {
        yield put(PostCocktailsFailure(e.response.data));
    }
}

export function* deleteCocktail({payload: id}) {
    try {
        yield axiosCocktail.delete("/cocktails/admin/" + id);
        yield put(DeleteCocktailsSuccess());
        yield put(FetchCocktailsRequest());
        yield put(FetchMyCocktailsRequest());
    } catch (e) {
        yield put(DeleteCocktailsFailure(e.response.data));
    }
}

export function* publishedCocktail({payload: id}) {
    try {
        yield axiosCocktail.post("/cocktails/admin/" + id);
        yield put(PublishedCocktailsSuccess());
        yield put(FetchCocktailsRequest());
        yield put(FetchMyCocktailsRequest());
    } catch (e) {
        yield put(PublishedCocktailsFailure(e.response.data));
    }
}

const cocktailsSagas = [
    takeEvery(FetchCocktailsRequest, fetchCocktails),
    takeEvery(FetchMyCocktailsRequest, fetchMyCocktails),
    takeEvery(FetchSoloCocktailRequest, fetchSoloCocktail),
    takeEvery(PostCocktailsRequest, postCocktail),
    takeEvery(DeleteCocktailsRequest, deleteCocktail),
    takeEvery(PublishedCocktailsRequest, publishedCocktail),
];

export default cocktailsSagas;
