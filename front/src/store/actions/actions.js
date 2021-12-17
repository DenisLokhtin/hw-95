import {toast} from "react-toastify";
import axiosApi from "../../axiosApi";
import cocktailsSlice from "../slices/cocktailsSlice";

export const {
    fetchCocktailsRequest,
    fetchCocktailsSuccess,
    fetchCocktailsFailure,
} = cocktailsSlice.actions;


export const createCocktail = data => {
    return async () => {
        try {
            await axiosApi.post('/cocktails', data, {'content-type': 'multipart/form-data'});
            toast.success('cocktail Created');
        } catch (e) {
            console.log(e)
        }
    };
};



