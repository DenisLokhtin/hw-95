import cocktailsSlice from "../slices/cocktailsSlice";

export const {
    FetchCocktailsFailure,
    FetchCocktailsSuccess,
    FetchCocktailsRequest,
    FetchSoloCocktailRequest,
    FetchSoloCocktailFailure,
    FetchSoloCocktailSuccess,
    FetchMyCocktailsRequest,
    FetchMyCocktailsSuccess,
    FetchMyCocktailsFailure,
    PostCocktailsFailure,
    PostCocktailsRequest,
    PostCocktailsSuccess,
    DeleteCocktailsFailure,
    DeleteCocktailsRequest,
    DeleteCocktailsSuccess,
    PublishedCocktailsFailure,
    PublishedCocktailsRequest,
    PublishedCocktailsSuccess,
} = cocktailsSlice.actions;