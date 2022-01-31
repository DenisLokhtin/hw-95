import {createSlice} from "@reduxjs/toolkit";

const name = "cocktails";

const cocktailsSlice = createSlice({
    name,
    initialState: {
        cocktails: [],
        cocktail: [],
        myCocktails: [],
        cocktailsLoading: false,
        cocktailsError: null,
    },
    reducers: {
        FetchCocktailsRequest: (state) => {
            state.cocktailsLoading = true;
        },
        FetchCocktailsSuccess: (state, {payload: cocktails}) => {
            state.cocktailsLoading = false;
            state.cocktails = cocktails;
        },
        FetchCocktailsFailure: (state, {payload: error}) => {
            state.cocktailsLoading = false;
            state.cocktailsError = error;
        },

        FetchSoloCocktailRequest: (state) => {
            state.cocktailsLoading = true;
        },
        FetchSoloCocktailSuccess: (state, {payload: cocktail}) => {
            state.cocktailsLoading = false;
            state.cocktail = cocktail;
        },
        FetchSoloCocktailFailure: (state, {payload: error}) => {
            state.cocktailsLoading = false;
            state.cocktailsError = error;
        },

        FetchMyCocktailsRequest: (state) => {
            state.cocktailsLoading = true;
        },
        FetchMyCocktailsSuccess: (state, {payload: myCocktails}) => {
            state.cocktailsLoading = false;
            state.myCocktails = myCocktails;
        },
        FetchMyCocktailsFailure: (state, {payload: error}) => {
            state.cocktailsLoading = false;
            state.cocktailsError = error;
        },
        PostCocktailsRequest: (state) => {
            state.cocktailsLoading = true;
        },
        PostCocktailsSuccess: (state, {payload: cocktails}) => {
            state.cocktailsLoading = false;
        },
        PostCocktailsFailure: (state, {payload: error}) => {
            state.cocktailsLoading = false;
            state.cocktailsError = error;
        },
        DeleteCocktailsRequest: (state) => {
            state.cocktailsLoading = true;
        },
        DeleteCocktailsSuccess: (state, {payload: cocktails}) => {
            state.cocktailsLoading = false;
        },
        DeleteCocktailsFailure: (state, {payload: error}) => {
            state.cocktailsLoading = false;
            state.cocktailsError = error;
        },
        PublishedCocktailsRequest: (state) => {
            state.cocktailsLoading = true;
        },
        PublishedCocktailsSuccess: (state, {payload: cocktails}) => {
            state.cocktailsLoading = false;
        },
        PublishedCocktailsFailure: (state, {payload: error}) => {
            state.cocktailsLoading = false;
            state.cocktailsError = error;
        },
    },
});

export default cocktailsSlice;