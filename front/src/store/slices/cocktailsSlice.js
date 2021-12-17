import {createSlice} from "@reduxjs/toolkit";

const name = 'cocktails';

const cocktailsSlice = createSlice({
    name,
    initialState: {
        cocktails: [],
        fetchLoadingCocktails: false,
    },
    reducers: {
        fetchCocktailsRequest(state, action) {
            state.fetchLoadingCocktails = true;
        },
        fetchCocktailsSuccess(state, {payload: cocktails}) {
            state.cocktails = cocktails;
            state.fetchLoadingCocktails = false;
        },
        fetchCocktailsFailure(state, action) {
            state.fetchLoadingCocktails = false;
        }
    }
});

export default cocktailsSlice;