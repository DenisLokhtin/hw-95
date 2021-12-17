import {toast} from "react-toastify";
import axiosApi from "../../axiosApi";
import cocktailsSlice from "../slices/cocktailsSlice";

export const {
    fetchCocktailsRequest,
    fetchCocktailsSuccess,
    fetchCocktailsFailure,
} = cocktailsSlice.actions;


export const createEvent = data => {
    return async () => {
        try {
            await axiosApi.post('/events', data);
            toast.success('Event Created');
        } catch (e) {
            console.log(e)
        }
    };
};



